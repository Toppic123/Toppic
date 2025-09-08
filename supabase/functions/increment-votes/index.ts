
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    // Create authenticated client using the user's JWT
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization') ?? '' },
        },
      }
    )

    // Verify user is authenticated
    const { data: { user }, error: authError } = await supabaseClient.auth.getUser()
    if (authError || !user) {
      console.error('Authentication failed:', authError)
      return new Response(
        JSON.stringify({ error: 'Authentication required' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 401 }
      )
    }

    const { photoId, contestId } = await req.json()

    if (!photoId || !contestId) {
      return new Response(
        JSON.stringify({ error: 'Missing photoId or contestId' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    // Validate user can vote using the secure function
    const { data: voteStatus, error: voteError } = await supabaseClient
      .rpc('get_user_vote_status', { 
        p_user_id: user.id, 
        p_contest_id: contestId 
      })

    if (voteError) {
      console.error('Error checking vote status:', voteError)
      return new Response(
        JSON.stringify({ error: 'Failed to validate voting eligibility' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      )
    }

    if (!voteStatus?.[0]?.can_vote) {
      return new Response(
        JSON.stringify({ 
          error: 'Voting limit exceeded',
          votesRemaining: voteStatus?.[0]?.votes_remaining || 0,
          dailyVotesRemaining: voteStatus?.[0]?.daily_votes_remaining || 0
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 429 }
      )
    }

    // Create service role client for system operations
    const serviceClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Increment vote count and update user vote tracking
    const { data: voteResult, error: incrementError } = await serviceClient
      .rpc('increment_user_votes', {
        p_user_id: user.id,
        p_contest_id: contestId
      })

    if (incrementError) {
      console.error('Error updating vote tracking:', incrementError)
      return new Response(
        JSON.stringify({ error: 'Failed to record vote' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      )
    }

    // Increment photo votes
    const { data, error } = await serviceClient
      .from('contest_photos')
      .update({ votes: serviceClient.raw('votes + 1') })
      .eq('id', photoId)
      .select()
      .single()

    if (error) {
      console.error('Error incrementing photo votes:', error)
      throw error
    }

    console.log(`Vote recorded - User: ${user.id}, Photo: ${photoId}, Contest: ${contestId}`)

    return new Response(
      JSON.stringify({ 
        success: true, 
        newVoteCount: data.votes,
        votesRemaining: voteResult?.[0]?.votes_remaining || 0,
        dailyVotesRemaining: voteResult?.[0]?.daily_votes_remaining || 0
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error in increment-votes function:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})
