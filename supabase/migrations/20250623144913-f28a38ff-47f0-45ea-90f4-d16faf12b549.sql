
-- Check if photo_reports table exists, if not create it
CREATE TABLE IF NOT EXISTS public.photo_reports (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  photo_id UUID NOT NULL,
  reported_by_user_id UUID REFERENCES auth.users(id),
  reason TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  reviewed_at TIMESTAMP WITH TIME ZONE,
  reviewed_by_admin_id UUID REFERENCES auth.users(id)
);

-- Enable RLS on photo_reports if not already enabled
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'photo_reports' 
    AND policyname = 'Users can create photo reports'
  ) THEN
    ALTER TABLE public.photo_reports ENABLE ROW LEVEL SECURITY;
    
    CREATE POLICY "Users can create photo reports" 
      ON public.photo_reports 
      FOR INSERT 
      TO authenticated
      WITH CHECK (auth.uid() = reported_by_user_id);

    CREATE POLICY "Users can view their own reports" 
      ON public.photo_reports 
      FOR SELECT 
      TO authenticated
      USING (auth.uid() = reported_by_user_id);
  END IF;
END $$;

-- Check if featured_contests table exists, if not create it
CREATE TABLE IF NOT EXISTS public.featured_contests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  contest_id UUID NOT NULL REFERENCES public.contests(id) ON DELETE CASCADE,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS and create policy for featured_contests if not already exists
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'featured_contests' 
    AND policyname = 'Anyone can view featured contests'
  ) THEN
    ALTER TABLE public.featured_contests ENABLE ROW LEVEL SECURITY;
    
    CREATE POLICY "Anyone can view featured contests" 
      ON public.featured_contests 
      FOR SELECT 
      TO public
      USING (is_active = true);
  END IF;
END $$;

-- Add coordinates to contests table if not exists
ALTER TABLE public.contests 
ADD COLUMN IF NOT EXISTS latitude DECIMAL(10, 8),
ADD COLUMN IF NOT EXISTS longitude DECIMAL(11, 8);

-- Add contest-photos bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public) 
VALUES ('contest-photos', 'contest-photos', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage policies (simplified approach)
CREATE POLICY "Authenticated users can upload contest photos"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'contest-photos');
