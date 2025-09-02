-- Fix security vulnerability in organizer_payments table
-- Replace overly permissive RLS policies with secure ones

-- Drop existing insecure policies
DROP POLICY IF EXISTS "Allow organizers to view their payments" ON public.organizer_payments;
DROP POLICY IF EXISTS "Allow system to manage payments" ON public.organizer_payments;

-- Create secure policies

-- 1. Organizers can only view their own payments + Admins can view all
CREATE POLICY "Organizers can view own payments and admins can view all" 
ON public.organizer_payments 
FOR SELECT 
USING (
  auth.email() = organizer_email OR is_admin_user()
);

-- 2. Only admins and system functions can insert payments
CREATE POLICY "System and admins can insert payments" 
ON public.organizer_payments 
FOR INSERT 
WITH CHECK (
  is_admin_user() OR auth.role() = 'service_role'
);

-- 3. Only admins and system functions can update payments
CREATE POLICY "System and admins can update payments" 
ON public.organizer_payments 
FOR UPDATE 
USING (
  is_admin_user() OR auth.role() = 'service_role'
) 
WITH CHECK (
  is_admin_user() OR auth.role() = 'service_role'
);

-- 4. Only admins can delete payments
CREATE POLICY "Only admins can delete payments" 
ON public.organizer_payments 
FOR DELETE 
USING (is_admin_user());