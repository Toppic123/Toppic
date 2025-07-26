import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Helper logging function for enhanced debugging
const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[VERIFY-PAYMENT] ${step}${detailsStr}`);
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Create service client for database operations
  const supabaseService = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    { auth: { persistSession: false } }
  );

  try {
    logStep("Function started");

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) throw new Error("STRIPE_SECRET_KEY is not set");

    // Parse request body
    const { sessionId } = await req.json();
    if (!sessionId) throw new Error("Session ID is required");

    logStep("Verifying session", { sessionId });

    // Initialize Stripe
    const stripe = new Stripe(stripeKey, {
      apiVersion: "2023-10-16",
    });

    // Retrieve the checkout session
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    logStep("Session retrieved", { 
      sessionId: session.id, 
      paymentStatus: session.payment_status,
      status: session.status 
    });

    if (session.payment_status !== "paid") {
      return new Response(JSON.stringify({ 
        verified: false, 
        status: session.payment_status 
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    // Get the payment order from our database
    const { data: order, error: orderError } = await supabaseService
      .from("payment_orders")
      .select("*")
      .eq("stripe_session_id", sessionId)
      .single();

    if (orderError || !order) {
      logStep("Order not found", { error: orderError });
      throw new Error("Payment order not found");
    }

    // Check if already processed
    if (order.status === "completed") {
      logStep("Order already processed");
      return new Response(JSON.stringify({ 
        verified: true, 
        alreadyProcessed: true,
        pointsAwarded: order.points_purchased
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    // Award points to user
    const { error: pointsError } = await supabaseService.rpc("add_points_to_user", {
      p_user_id: order.user_id,
      p_amount: order.points_purchased,
      p_transaction_type: "purchase",
      p_description: `Compra de ${order.points_purchased} puntos`,
      p_order_id: order.id
    });

    if (pointsError) {
      logStep("Error awarding points", { error: pointsError });
      throw new Error(`Failed to award points: ${pointsError.message}`);
    }

    // Update order status
    const { error: updateError } = await supabaseService
      .from("payment_orders")
      .update({ 
        status: "completed",
        completed_at: new Date().toISOString()
      })
      .eq("id", order.id);

    if (updateError) {
      logStep("Error updating order", { error: updateError });
      throw new Error(`Failed to update order: ${updateError.message}`);
    }

    logStep("Payment verified and points awarded", { 
      pointsAwarded: order.points_purchased,
      userId: order.user_id 
    });

    return new Response(JSON.stringify({ 
      verified: true, 
      pointsAwarded: order.points_purchased
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR in verify-payment", { message: errorMessage });
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});