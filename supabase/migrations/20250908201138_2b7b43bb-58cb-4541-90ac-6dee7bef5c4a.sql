-- Critical Security Fixes for Contest Photos, Organizers, and Database Functions

-- ==============================================
-- 1. CRITICAL: Fix Contest Photos RLS Policies
-- ==============================================

-- Drop all existing overly permissive policies
DROP POLICY IF EXISTS "Allow delete contest photos" ON public.contest_photos;
DROP POLICY IF EXISTS "Public can insert contest photos" ON public.contest_photos; 
DROP POLICY IF EXISTS "Public can select contest photos" ON public.contest_photos;
DROP POLICY IF EXISTS "Public can update contest photos" ON public.contest_photos;
DROP POLICY IF EXISTS "Anyone can view approved contest photos" ON public.contest_photos;

-- Create secure RLS policies for contest_photos
CREATE POLICY "Authenticated users can view approved contest photos"
ON public.contest_photos
FOR SELECT
TO authenticated
USING (status = 'approved');

CREATE POLICY "Users can create their own contest photos"
ON public.contest_photos  
FOR INSERT
TO authenticated
WITH CHECK (
  auth.uid() = user_id 
  AND user_id IS NOT NULL
);

CREATE POLICY "Users can update their own pending contest photos"
ON public.contest_photos
FOR UPDATE  
TO authenticated
USING (auth.uid() = user_id AND status = 'pending')
WITH CHECK (auth.uid() = user_id AND status = 'pending');

CREATE POLICY "Users can delete their own pending contest photos"
ON public.contest_photos
FOR DELETE
TO authenticated
USING (auth.uid() = user_id AND status = 'pending');

-- Admin policies for contest photo management
CREATE POLICY "Admins can view all contest photos"
ON public.contest_photos
FOR SELECT
TO authenticated
USING (is_admin_user());

CREATE POLICY "Admins can update any contest photo"  
ON public.contest_photos
FOR UPDATE
TO authenticated
USING (is_admin_user())
WITH CHECK (is_admin_user());

CREATE POLICY "Admins can delete any contest photo"
ON public.contest_photos  
FOR DELETE
TO authenticated
USING (is_admin_user());

-- ==============================================
-- 2. HIGH PRIORITY: Restrict Organizer Registration  
-- ==============================================

-- Drop the public organizer creation policy
DROP POLICY IF EXISTS "Authenticated users can create organizer profiles" ON public.organizers;

-- Only admins can create organizer profiles
CREATE POLICY "Only admins can create organizer profiles"
ON public.organizers
FOR INSERT  
TO authenticated
WITH CHECK (is_admin_user());

-- ==============================================
-- 3. DATA INTEGRITY: User Association Constraints
-- ==============================================

-- Make user_id NOT NULL for new contest photos (existing data preserved)
-- First, update any existing null user_id records to a system user or mark for cleanup
-- For this migration, we'll just add the constraint for future inserts

-- Add a constraint to prevent null user_id in new contest photos
-- This will be enforced at the database level
CREATE OR REPLACE FUNCTION prevent_null_user_id_in_contest_photos()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.user_id IS NULL THEN
    RAISE EXCEPTION 'user_id cannot be null for contest photos';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER ensure_contest_photo_user_id
  BEFORE INSERT OR UPDATE ON public.contest_photos
  FOR EACH ROW
  EXECUTE FUNCTION prevent_null_user_id_in_contest_photos();

-- ==============================================
-- 4. SECURITY: Harden Database Functions
-- ==============================================

-- Update all functions to use secure search_path
CREATE OR REPLACE FUNCTION public.is_admin_user()
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  SELECT EXISTS (
    SELECT 1 
    FROM auth.users 
    WHERE id = auth.uid() 
    AND email IN ('pisillo@gmail.com')
  );
$function$;

CREATE OR REPLACE FUNCTION public.increment_photo_votes(photo_id uuid)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  UPDATE public.contest_photos
  SET votes = votes + 1
  WHERE id = photo_id;
END;
$function$;

CREATE OR REPLACE FUNCTION public.get_user_points(p_user_id uuid)
 RETURNS integer
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  user_points_balance INTEGER;
BEGIN
  SELECT points INTO user_points_balance
  FROM public.user_points
  WHERE user_id = p_user_id;
  
  RETURN COALESCE(user_points_balance, 0);
END;
$function$;

CREATE OR REPLACE FUNCTION public.spend_user_points(p_user_id uuid, p_amount integer, p_transaction_type text, p_description text DEFAULT NULL::text, p_contest_id uuid DEFAULT NULL::uuid)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  current_points INTEGER;
BEGIN
  -- Check if user has enough points
  SELECT points INTO current_points 
  FROM public.user_points 
  WHERE user_id = p_user_id;
  
  IF current_points IS NULL OR current_points < p_amount THEN
    RETURN FALSE;
  END IF;
  
  -- Update user points
  UPDATE public.user_points 
  SET 
    points = points - p_amount,
    updated_at = now()
  WHERE user_id = p_user_id;
  
  -- Record transaction
  INSERT INTO public.point_transactions (
    user_id, 
    amount, 
    transaction_type, 
    description,
    contest_id
  )
  VALUES (p_user_id, -p_amount, p_transaction_type, p_description, p_contest_id);
  
  RETURN TRUE;
END;
$function$;

-- ==============================================
-- 5. ADDITIONAL SECURITY: Add Rate Limiting Table
-- ==============================================

CREATE TABLE IF NOT EXISTS public.user_action_limits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  action_type text NOT NULL,
  action_count integer NOT NULL DEFAULT 1,
  window_start timestamp with time zone NOT NULL DEFAULT now(),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE(user_id, action_type, window_start)
);

-- Enable RLS on the rate limiting table
ALTER TABLE public.user_action_limits ENABLE ROW LEVEL SECURITY;

-- Users can only see their own rate limiting data
CREATE POLICY "Users can view their own action limits"
ON public.user_action_limits
FOR SELECT
TO authenticated  
USING (auth.uid() = user_id);

-- System can manage rate limits
CREATE POLICY "System can manage action limits"
ON public.user_action_limits
FOR ALL
TO authenticated
USING (is_admin_user())
WITH CHECK (is_admin_user());