-- Fix critical security vulnerability in payment_orders table
-- Remove the overly permissive policy that allows public access to all payment data

-- Drop the dangerous "System can manage orders" policy
DROP POLICY IF EXISTS "System can manage orders" ON public.payment_orders;

-- Create secure policies that only allow users to access their own payment data
CREATE POLICY "Users can insert their own orders" ON public.payment_orders
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own orders" ON public.payment_orders
FOR UPDATE 
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Note: The existing "Users can view their own orders" SELECT policy is already secure
-- Edge functions will use service role key to bypass RLS for system operations