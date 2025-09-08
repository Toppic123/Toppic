-- Fix security vulnerability in contest_banners and featured_contests tables
-- Restrict management operations to admin users only

-- Fix contest_banners table policies
DROP POLICY IF EXISTS "Authenticated users can manage banners" ON public.contest_banners;

-- Anyone can view active banners (keep existing policy)
-- CREATE POLICY "Anyone can view active banners" already exists

-- Only admins can insert banners
CREATE POLICY "Only admins can insert banners" 
ON public.contest_banners 
FOR INSERT 
WITH CHECK (is_admin_user());

-- Only admins can update banners
CREATE POLICY "Only admins can update banners" 
ON public.contest_banners 
FOR UPDATE 
USING (is_admin_user()) 
WITH CHECK (is_admin_user());

-- Only admins can delete banners
CREATE POLICY "Only admins can delete banners" 
ON public.contest_banners 
FOR DELETE 
USING (is_admin_user());

-- Fix featured_contests table policies
DROP POLICY IF EXISTS "Authenticated users can delete featured contests" ON public.featured_contests;
DROP POLICY IF EXISTS "Authenticated users can insert featured contests" ON public.featured_contests;
DROP POLICY IF EXISTS "Authenticated users can update featured contests" ON public.featured_contests;

-- Anyone can view active featured contests (keep existing policy)
-- CREATE POLICY "Anyone can view active featured contests" already exists

-- Only admins can insert featured contests
CREATE POLICY "Only admins can insert featured contests" 
ON public.featured_contests 
FOR INSERT 
WITH CHECK (is_admin_user());

-- Only admins can update featured contests
CREATE POLICY "Only admins can update featured contests" 
ON public.featured_contests 
FOR UPDATE 
USING (is_admin_user()) 
WITH CHECK (is_admin_user());

-- Only admins can delete featured contests
CREATE POLICY "Only admins can delete featured contests" 
ON public.featured_contests 
FOR DELETE 
USING (is_admin_user());