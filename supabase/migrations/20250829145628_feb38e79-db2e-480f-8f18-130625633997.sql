-- Fix critical security vulnerability in organizers table
-- Remove public access to sensitive business contact information

-- Drop the dangerous "Allow full access to organizers" policy
DROP POLICY IF EXISTS "Allow full access to organizers" ON public.organizers;

-- Create secure policies for organizer data access

-- Allow admins to manage all organizer data (using existing is_admin_user function)
CREATE POLICY "Admins can manage organizers" ON public.organizers
FOR ALL 
USING (public.is_admin_user())
WITH CHECK (public.is_admin_user());

-- Allow organizers to view and update their own data only
CREATE POLICY "Organizers can view their own data" ON public.organizers
FOR SELECT 
USING (auth.email() = email);

CREATE POLICY "Organizers can update their own data" ON public.organizers
FOR UPDATE 
USING (auth.email() = email)
WITH CHECK (auth.email() = email);

-- Allow authenticated users to create organizer profiles (for registration)
CREATE POLICY "Authenticated users can create organizer profiles" ON public.organizers
FOR INSERT 
TO authenticated
WITH CHECK (auth.email() = email);

-- Note: No public SELECT policy - organizer data is now private