import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
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
    const { contestId, organizerEmail, cashPrizeAmount } = await req.json();

    if (!contestId || !organizerEmail || !cashPrizeAmount) {
      throw new Error("Missing required fields");
    }

    // Initialize Stripe
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2023-10-16",
    });

    // Calculate commission fee (3% + 0.30€ processing fee)
    const commissionPercentage = 0.03;
    const processingFee = 0.30;
    const commissionFee = (cashPrizeAmount * commissionPercentage) + processingFee;
    const totalAmount = cashPrizeAmount + commissionFee;

    // Check if organizer already has a Stripe customer
    const customers = await stripe.customers.list({ 
      email: organizerEmail, 
      limit: 1 
    });
    
    let customerId;
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
    }

    // Create Stripe checkout session for organizer payment
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      customer_email: customerId ? undefined : organizerEmail,
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: { 
              name: `Premio en metálico para concurso - ${cashPrizeAmount}€`,
              description: `Premio: ${cashPrizeAmount}€ + Comisión: ${commissionFee.toFixed(2)}€`
            },
            unit_amount: Math.round(totalAmount * 100), // Convert to cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${req.headers.get("origin")}/admin-dashboard?payment=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get("origin")}/admin-dashboard?payment=cancelled`,
      metadata: {
        contestId,
        cashPrizeAmount: cashPrizeAmount.toString(),
        commissionFee: commissionFee.toString(),
      }
    });

    // Record payment in organizer_payments table
    const { error: paymentError } = await supabaseService
      .from("organizer_payments")
      .insert({
        contest_id: contestId,
        organizer_email: organizerEmail,
        cash_prize_amount: cashPrizeAmount,
        commission_fee: commissionFee,
        total_amount: totalAmount,
        stripe_session_id: session.id,
        payment_status: "pending"
      });

    if (paymentError) {
      console.error("Error creating organizer payment record:", paymentError);
      throw new Error("Failed to record payment");
    }

    // Update contest with payment information
    const { error: contestError } = await supabaseService
      .from("contests")
      .update({
        cash_prize_amount: cashPrizeAmount,
        organizer_commission_fee: commissionFee,
        payment_session_id: session.id,
        payment_status: "pending"
      })
      .eq("id", contestId);

    if (contestError) {
      console.error("Error updating contest with payment info:", contestError);
      throw new Error("Failed to update contest");
    }

    return new Response(
      JSON.stringify({ 
        url: session.url,
        totalAmount,
        commissionFee 
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error creating organizer payment:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});