import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (message: string, data?: any) => {
  console.log(`[verify-organizer-payment] ${message}`, data ? JSON.stringify(data, null, 2) : '');
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Create Supabase service client
  const supabaseService = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    { auth: { persistSession: false } }
  );

  try {
    logStep("Starting payment verification");
    
    const { sessionId } = await req.json();
    
    if (!sessionId) {
      throw new Error("Session ID is required");
    }

    logStep("Received session ID", { sessionId });

    // Initialize Stripe
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2023-10-16",
    });

    // Retrieve the checkout session
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    logStep("Retrieved Stripe session", { 
      id: session.id, 
      payment_status: session.payment_status,
      metadata: session.metadata 
    });

    if (session.payment_status !== 'paid') {
      throw new Error('Payment not completed');
    }

    // Find the organizer payment record
    const { data: payment, error: paymentFetchError } = await supabaseService
      .from("organizer_payments")
      .select("*")
      .eq("stripe_session_id", sessionId)
      .single();

    if (paymentFetchError || !payment) {
      logStep("Payment record not found", { error: paymentFetchError });
      throw new Error("Payment record not found");
    }

    logStep("Found payment record", payment);

    // Check if already processed
    if (payment.payment_status === 'completed') {
      logStep("Payment already processed");
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: "Payment already processed",
          contestId: payment.contest_id 
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200,
        }
      );
    }

    // Update organizer payment status
    const { error: updatePaymentError } = await supabaseService
      .from("organizer_payments")
      .update({
        payment_status: "completed",
        paid_at: new Date().toISOString()
      })
      .eq("id", payment.id);

    if (updatePaymentError) {
      logStep("Failed to update payment status", { error: updatePaymentError });
      throw new Error("Failed to update payment status");
    }

    // Update contest payment status and activate contest if needed
    const { error: updateContestError } = await supabaseService
      .from("contests")
      .update({
        payment_status: "completed",
        status: "active" // Activate the contest once payment is completed
      })
      .eq("id", payment.contest_id);

    if (updateContestError) {
      logStep("Failed to update contest status", { error: updateContestError });
      throw new Error("Failed to update contest status");
    }

    logStep("Payment verification completed successfully");

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Payment verified and contest activated",
        contestId: payment.contest_id,
        amountPaid: payment.total_amount
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    logStep("Error in payment verification", { error: error.message });
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});