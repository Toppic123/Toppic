-- Fix critical security vulnerability in point_transactions table
-- Replace overly permissive INSERT policy with secure restrictions

-- Drop the insecure policy that allows anyone to insert transactions
DROP POLICY IF EXISTS "System can insert transactions" ON public.point_transactions;

-- Create secure INSERT policy that only allows system processes and admins
CREATE POLICY "secure_system_insert_point_transactions" 
ON public.point_transactions 
FOR INSERT 
WITH CHECK (
  -- Only allow service role (system processes) or admin users
  is_admin_user() OR auth.role() = 'service_role'
);

-- Ensure the policy is properly named and documented
COMMENT ON POLICY "secure_system_insert_point_transactions" ON public.point_transactions IS 
'Restricts point transaction creation to authenticated system processes and admin users only. Prevents fraudulent point manipulation by regular users.';