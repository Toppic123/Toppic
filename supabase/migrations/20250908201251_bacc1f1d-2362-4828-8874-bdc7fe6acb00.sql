-- Critical Security Fixes - Fixed Policy Names

-- ==============================================
-- 1. CRITICAL: Fix Contest Photos RLS Policies
-- ==============================================

-- First, get all existing policy names and drop them
DO $$ 
DECLARE
    policy_record RECORD;
BEGIN
    -- Drop all existing policies on contest_photos
    FOR policy_record IN 
        SELECT policyname 
        FROM pg_policies 
        WHERE tablename = 'contest_photos' 
        AND schemaname = 'public'
    LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON public.contest_photos', policy_record.policyname);
    END LOOP;
END $$;

-- Create secure RLS policies for contest_photos with unique names
CREATE POLICY "secure_view_approved_contest_photos"
ON public.contest_photos
FOR SELECT
TO authenticated
USING (status = 'approved');

CREATE POLICY "secure_create_own_contest_photos"
ON public.contest_photos  
FOR INSERT
TO authenticated
WITH CHECK (
  auth.uid() = user_id 
  AND user_id IS NOT NULL
);

CREATE POLICY "secure_update_own_pending_photos"
ON public.contest_photos
FOR UPDATE  
TO authenticated
USING (auth.uid() = user_id AND status = 'pending')
WITH CHECK (auth.uid() = user_id AND status = 'pending');

CREATE POLICY "secure_delete_own_pending_photos"
ON public.contest_photos
FOR DELETE
TO authenticated
USING (auth.uid() = user_id AND status = 'pending');

-- Admin policies for contest photo management
CREATE POLICY "admin_view_all_contest_photos"
ON public.contest_photos
FOR SELECT
TO authenticated
USING (is_admin_user());

CREATE POLICY "admin_update_any_contest_photo"  
ON public.contest_photos
FOR UPDATE
TO authenticated
USING (is_admin_user())
WITH CHECK (is_admin_user());

CREATE POLICY "admin_delete_any_contest_photo"
ON public.contest_photos  
FOR DELETE
TO authenticated
USING (is_admin_user());

-- ==============================================
-- 2. HIGH PRIORITY: Restrict Organizer Registration  
-- ==============================================

-- Drop existing organizer policies
DO $$ 
DECLARE
    policy_record RECORD;
BEGIN
    FOR policy_record IN 
        SELECT policyname 
        FROM pg_policies 
        WHERE tablename = 'organizers' 
        AND schemaname = 'public'
        AND policyname LIKE '%create%'
    LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON public.organizers', policy_record.policyname);
    END LOOP;
END $$;

-- Only admins can create organizer profiles
CREATE POLICY "admin_only_create_organizers"
ON public.organizers
FOR INSERT  
TO authenticated
WITH CHECK (is_admin_user());

-- ==============================================
-- 3. DATA INTEGRITY: User Association Constraints
-- ==============================================

-- Add a constraint to prevent null user_id in new contest photos
CREATE OR REPLACE FUNCTION prevent_null_user_id_in_contest_photos()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.user_id IS NULL THEN
    RAISE EXCEPTION 'user_id cannot be null for contest photos';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Drop trigger if exists and recreate
DROP TRIGGER IF EXISTS ensure_contest_photo_user_id ON public.contest_photos;
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