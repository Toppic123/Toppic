-- Allow authenticated users to update support messages status
BEGIN;

-- Ensure RLS is enabled (it should be by default)
ALTER TABLE public.support_messages ENABLE ROW LEVEL SECURITY;

-- Create/update policy to allow authenticated users to update messages
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' 
      AND tablename = 'support_messages' 
      AND policyname = 'Authenticated users can update support messages'
  ) THEN
    CREATE POLICY "Authenticated users can update support messages"
    ON public.support_messages
    FOR UPDATE
    USING (auth.role() = 'authenticated')
    WITH CHECK (auth.role() = 'authenticated');
  END IF;
END$$;

COMMIT;