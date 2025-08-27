-- Create a function to check if current user is admin
CREATE OR REPLACE FUNCTION public.is_admin_user()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1 
    FROM auth.users 
    WHERE id = auth.uid() 
    AND email IN ('pisillo@gmail.com')
  );
$$;

-- Update the support_messages SELECT policy to only allow admin users
DROP POLICY IF EXISTS "Only authenticated users can view support messages" ON public.support_messages;

CREATE POLICY "Only admin users can view support messages" 
ON public.support_messages 
FOR SELECT 
USING (public.is_admin_user());

-- Update the support_messages UPDATE policy to only allow admin users  
DROP POLICY IF EXISTS "Authenticated users can update support messages" ON public.support_messages;

CREATE POLICY "Only admin users can update support messages" 
ON public.support_messages 
FOR UPDATE 
USING (public.is_admin_user()) 
WITH CHECK (public.is_admin_user());