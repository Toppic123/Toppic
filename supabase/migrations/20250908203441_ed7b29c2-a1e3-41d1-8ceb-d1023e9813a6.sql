-- Critical Security Fixes: Implement Comprehensive RLS Policy Updates
-- This migration addresses all identified critical security vulnerabilities

-- ==============================================
-- 1. SECURE FEATURED GALLERY MANAGEMENT
-- ==============================================

-- Drop overly permissive policy and replace with secure admin-only policies
DROP POLICY IF EXISTS "Anyone can manage featured gallery" ON public.featured_gallery;

-- Create secure policies for featured gallery
CREATE POLICY "admin_only_insert_featured_gallery"
ON public.featured_gallery
FOR INSERT
TO authenticated
WITH CHECK (is_admin_user());

CREATE POLICY "admin_only_update_featured_gallery"
ON public.featured_gallery
FOR UPDATE
TO authenticated
USING (is_admin_user())
WITH CHECK (is_admin_user());

CREATE POLICY "admin_only_delete_featured_gallery"
ON public.featured_gallery
FOR DELETE
TO authenticated
USING (is_admin_user());

-- Keep public view access for active featured photos
CREATE POLICY "public_view_active_featured_gallery"
ON public.featured_gallery
FOR SELECT
USING (is_active = true);

-- ==============================================
-- 2. SECURE SYSTEM ACCESS POLICIES
-- ==============================================

-- Fix user_points table - replace overly permissive update policy
DROP POLICY IF EXISTS "System can update points" ON public.user_points;

CREATE POLICY "secure_system_update_points"
ON public.user_points
FOR UPDATE
TO authenticated
USING (
  -- Only allow updates by admin or service role for system operations
  is_admin_user() OR auth.role() = 'service_role'
)
WITH CHECK (
  is_admin_user() OR auth.role() = 'service_role'
);

-- Fix prize_awards table - ensure only verified processes can create awards
DROP POLICY IF EXISTS "System can manage prize awards" ON public.prize_awards;

CREATE POLICY "secure_system_insert_prize_awards"
ON public.prize_awards
FOR INSERT
TO authenticated
WITH CHECK (
  -- Only admin or service role can create prize awards
  is_admin_user() OR auth.role() = 'service_role'
);

CREATE POLICY "secure_system_update_prize_awards"
ON public.prize_awards
FOR UPDATE
TO authenticated
USING (is_admin_user() OR auth.role() = 'service_role')
WITH CHECK (is_admin_user() OR auth.role() = 'service_role');

CREATE POLICY "secure_system_delete_prize_awards"
ON public.prize_awards
FOR DELETE
TO authenticated
USING (is_admin_user());

-- Keep existing user view policy for prize_awards
-- Users can still view their own prize awards

-- Fix ai_photo_analysis table - restrict to authenticated system processes
DROP POLICY IF EXISTS "Anyone can insert ai analysis" ON public.ai_photo_analysis;
DROP POLICY IF EXISTS "Anyone can view ai analysis" ON public.ai_photo_analysis;

CREATE POLICY "secure_system_insert_ai_analysis"
ON public.ai_photo_analysis
FOR INSERT
TO authenticated
WITH CHECK (
  -- Only admin or service role can insert AI analysis
  is_admin_user() OR auth.role() = 'service_role'
);

CREATE POLICY "secure_view_ai_analysis"
ON public.ai_photo_analysis
FOR SELECT
TO authenticated
USING (
  -- Admins can view all, users can view analysis for their own photos
  is_admin_user() OR 
  EXISTS (
    SELECT 1 FROM contest_photos cp 
    WHERE cp.id = ai_photo_analysis.photo_id 
    AND cp.user_id = auth.uid()
  )
);

-- ==============================================
-- 3. STRENGTHEN ORGANIZER PAYMENT SECURITY
-- ==============================================

-- Update organizer payments policies for stricter access control
DROP POLICY IF EXISTS "Organizers can view own payments and admins can view all" ON public.organizer_payments;

CREATE POLICY "secure_organizer_view_own_payments"
ON public.organizer_payments
FOR SELECT
TO authenticated
USING (
  -- Organizers can only view their own payments, admins can view all
  (auth.email() = organizer_email AND auth.role() = 'authenticated') OR 
  is_admin_user()
);

-- Ensure only verified processes can update payment status
DROP POLICY IF EXISTS "System and admins can update payments" ON public.organizer_payments;

CREATE POLICY "secure_system_update_organizer_payments"
ON public.organizer_payments
FOR UPDATE
TO authenticated
USING (
  is_admin_user() OR 
  (auth.role() = 'service_role' AND auth.email() = organizer_email)
)
WITH CHECK (
  is_admin_user() OR 
  (auth.role() = 'service_role' AND auth.email() = organizer_email)
);

-- ==============================================
-- 4. SECURE LOCATIONS TABLE
-- ==============================================

-- Replace overly permissive location access
DROP POLICY IF EXISTS "Allow full access to locations" ON public.locations;

CREATE POLICY "public_view_locations"
ON public.locations
FOR SELECT
USING (true);

CREATE POLICY "admin_manage_locations"
ON public.locations
FOR ALL
TO authenticated
USING (is_admin_user())
WITH CHECK (is_admin_user());

-- ==============================================
-- 5. ADD USER VOTING SECURITY ENHANCEMENTS
-- ==============================================

-- Create function to validate vote limits
CREATE OR REPLACE FUNCTION public.validate_user_vote_limits(p_user_id uuid, p_contest_id uuid)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  current_votes INTEGER := 0;
  current_daily_votes INTEGER := 0;
  vote_limit INTEGER := 50;
  daily_limit INTEGER := 10;
BEGIN
  -- Get current vote counts
  SELECT 
    COALESCE(votes_cast, 0),
    CASE 
      WHEN last_vote_date = CURRENT_DATE THEN COALESCE(daily_votes_cast, 0)
      ELSE 0
    END
  INTO current_votes, current_daily_votes
  FROM user_votes
  WHERE user_id = p_user_id AND contest_id = p_contest_id;
  
  -- Return true if user can vote
  RETURN (current_votes < vote_limit AND current_daily_votes < daily_limit);
END;
$$;

-- ==============================================
-- 6. AUDIT LOGGING ENHANCEMENTS
-- ==============================================

-- Create admin access log table for security monitoring
CREATE TABLE IF NOT EXISTS public.admin_access_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_user_id uuid NOT NULL,
  table_name text NOT NULL,
  operation text NOT NULL,
  record_id uuid,
  timestamp timestamptz NOT NULL DEFAULT now(),
  ip_address inet,
  user_agent text
);

-- Enable RLS on audit log
ALTER TABLE public.admin_access_log ENABLE ROW LEVEL SECURITY;

-- Only admins can view audit logs
CREATE POLICY "admin_only_view_audit_log"
ON public.admin_access_log
FOR SELECT
TO authenticated
USING (is_admin_user());

-- System can insert audit logs
CREATE POLICY "system_insert_audit_log"
ON public.admin_access_log
FOR INSERT
TO authenticated
WITH CHECK (is_admin_user() OR auth.role() = 'service_role');

-- ==============================================
-- 7. CREATE SECURITY MONITORING FUNCTIONS
-- ==============================================

-- Function to log critical security events
CREATE OR REPLACE FUNCTION public.log_security_event(
  event_type text,
  event_description text,
  affected_table text DEFAULT NULL,
  affected_record_id uuid DEFAULT NULL
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO admin_access_log (
    admin_user_id,
    table_name,
    operation,
    record_id,
    timestamp
  ) VALUES (
    COALESCE(auth.uid(), '00000000-0000-0000-0000-000000000000'::uuid),
    COALESCE(affected_table, 'security_event'),
    event_type || ': ' || event_description,
    affected_record_id,
    now()
  );
END;
$$;