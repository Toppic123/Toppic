-- Harden RLS for support_messages to prevent unauthorized access while keeping public submission working

-- Ensure RLS is enabled
ALTER TABLE public.support_messages ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to avoid duplicates/conflicts
DROP POLICY IF EXISTS "Anyone can create support messages" ON public.support_messages;
DROP POLICY IF EXISTS "Only admin users can update support messages" ON public.support_messages;
DROP POLICY IF EXISTS "Only admin users can view support messages" ON public.support_messages;

-- Only admin users can view support messages
CREATE POLICY "Only admin users can view support messages"
ON public.support_messages
FOR SELECT
USING (is_admin_user());

-- Only admin users can update support messages
CREATE POLICY "Only admin users can update support messages"
ON public.support_messages
FOR UPDATE
USING (is_admin_user())
WITH CHECK (is_admin_user());

-- Public users (anon or authenticated) can submit support requests only as 'pending'
CREATE POLICY "Public users can submit support requests"
ON public.support_messages
FOR INSERT
WITH CHECK (
  auth.role() IN ('anon','authenticated')
  AND status = 'pending'
);
