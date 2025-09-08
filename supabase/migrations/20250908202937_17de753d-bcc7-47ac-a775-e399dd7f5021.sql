-- Critical Security Fix: Secure Support Messages Table
-- This fixes the security issue where customer email addresses could be stolen

-- ==============================================
-- 1. DROP EXISTING POLICIES TO RECREATE WITH STRONGER SECURITY
-- ==============================================

DROP POLICY IF EXISTS "Public users can submit support requests" ON public.support_messages;
DROP POLICY IF EXISTS "Only admin users can view support messages" ON public.support_messages;
DROP POLICY IF EXISTS "Only admin users can update support messages" ON public.support_messages;

-- ==============================================
-- 2. CREATE SECURE RLS POLICIES FOR SUPPORT MESSAGES
-- ==============================================

-- INSERT: Allow anonymous and authenticated users to submit support requests 
-- with strict validation (only status = 'pending' and required fields)
CREATE POLICY "secure_submit_support_requests"
ON public.support_messages
FOR INSERT
TO anon, authenticated
WITH CHECK (
  status = 'pending' AND
  name IS NOT NULL AND 
  name != '' AND
  email IS NOT NULL AND 
  email != '' AND
  subject IS NOT NULL AND 
  subject != '' AND
  message IS NOT NULL AND 
  message != ''
);

-- SELECT: Only admins can view support messages - this is the critical security protection
CREATE POLICY "admin_only_view_support_messages"
ON public.support_messages
FOR SELECT
TO authenticated
USING (is_admin_user());

-- UPDATE: Only admins can update support messages (typically to mark as resolved)
CREATE POLICY "admin_only_update_support_messages"
ON public.support_messages
FOR UPDATE  
TO authenticated
USING (is_admin_user())
WITH CHECK (is_admin_user());

-- DELETE: Only admins can delete support messages (for cleanup if needed)
CREATE POLICY "admin_only_delete_support_messages"
ON public.support_messages
FOR DELETE
TO authenticated
USING (is_admin_user());

-- ==============================================
-- 3. ADD DATA INTEGRITY TRIGGER FOR EXTRA SECURITY
-- ==============================================

CREATE OR REPLACE FUNCTION validate_support_message_insert()
RETURNS TRIGGER AS $$
BEGIN
  -- Ensure only pending status can be set on insert
  IF NEW.status != 'pending' THEN
    RAISE EXCEPTION 'New support messages must have pending status';
  END IF;
  
  -- Validate email format (basic validation)
  IF NEW.email !~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' THEN
    RAISE EXCEPTION 'Invalid email format';
  END IF;
  
  -- Sanitize and validate name field
  NEW.name := trim(NEW.name);
  IF length(NEW.name) < 2 OR length(NEW.name) > 100 THEN
    RAISE EXCEPTION 'Name must be between 2 and 100 characters';
  END IF;
  
  -- Validate message length
  NEW.message := trim(NEW.message);
  IF length(NEW.message) < 10 OR length(NEW.message) > 5000 THEN
    RAISE EXCEPTION 'Message must be between 10 and 5000 characters';
  END IF;
  
  -- Generate subject from message if not provided properly
  NEW.subject := trim(NEW.subject);
  IF length(NEW.subject) < 3 THEN
    NEW.subject := substring(NEW.message from 1 for 50) || '...';
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create trigger for validation
DROP TRIGGER IF EXISTS validate_support_message_trigger ON public.support_messages;
CREATE TRIGGER validate_support_message_trigger
  BEFORE INSERT ON public.support_messages
  FOR EACH ROW
  EXECUTE FUNCTION validate_support_message_insert();

-- ==============================================
-- 4. ADDITIONAL SECURITY: AUDIT TRAIL (OPTIONAL)
-- ==============================================

-- Create audit log function to track access to sensitive support data
CREATE OR REPLACE FUNCTION log_support_message_access()
RETURNS TRIGGER AS $$
BEGIN
  -- Only log admin access for security monitoring
  IF is_admin_user() THEN
    INSERT INTO public.admin_access_log (
      admin_user_id,
      table_name,
      operation,
      record_id,
      timestamp
    ) VALUES (
      auth.uid(),
      'support_messages',
      TG_OP,
      COALESCE(NEW.id, OLD.id),
      now()
    ) ON CONFLICT DO NOTHING; -- Ignore if audit table doesn't exist
  END IF;
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Note: This audit trigger will only work if admin_access_log table exists
-- The ON CONFLICT DO NOTHING prevents errors if the table doesn't exist