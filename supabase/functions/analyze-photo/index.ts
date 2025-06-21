
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
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { photoId, imageUrl } = await req.json()

    if (!photoId || !imageUrl) {
      return new Response(
        JSON.stringify({ error: 'Missing photoId or imageUrl' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    // Simulate AI analysis - in a real implementation, you would:
    // 1. Download the image from the URL
    // 2. Send it to an AI service (OpenAI Vision, Google Cloud Vision, etc.)
    // 3. Get quality scores, detect objects, check for inappropriate content
    
    // For now, we'll generate a random score and mock analysis
    const aiScore = Math.random() * 100;
    const analysisData = {
      composition_score: Math.random() * 100,
      technical_quality: Math.random() * 100,
      creativity_score: Math.random() * 100,
      overall_score: aiScore,
      detected_objects: ['urban', 'architecture', 'people'],
      is_appropriate: true,
      feedback: 'Good composition and lighting. Well-framed subject matter.',
    }

    // Store AI analysis results
    const { error: insertError } = await supabaseClient
      .from('ai_photo_analysis')
      .insert({
        photo_id: photoId,
        ai_score: aiScore,
        analysis_data: analysisData,
        processed_at: new Date().toISOString()
      })

    if (insertError) {
      console.error('Error inserting AI analysis:', insertError)
      throw insertError
    }

    // Update the photo with AI score
    const { error: updateError } = await supabaseClient
      .from('contest_photos')
      .update({ 
        ai_score: aiScore,
        status: aiScore > 50 ? 'approved' : 'rejected' // Auto-approve high-scoring photos
      })
      .eq('id', photoId)

    if (updateError) {
      console.error('Error updating photo:', updateError)
      throw updateError
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        aiScore,
        status: aiScore > 50 ? 'approved' : 'rejected',
        analysis: analysisData
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error in analyze-photo function:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})
