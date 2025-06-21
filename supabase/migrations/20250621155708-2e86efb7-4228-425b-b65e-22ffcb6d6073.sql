
-- Create contest_photos table
CREATE TABLE IF NOT EXISTS public.contest_photos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  contest_id UUID NOT NULL REFERENCES public.contests(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  photographer_name TEXT NOT NULL,
  photographer_avatar TEXT,
  description TEXT,
  votes INTEGER NOT NULL DEFAULT 0,
  ai_score NUMERIC,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create featured_gallery table
CREATE TABLE IF NOT EXISTS public.featured_gallery (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  photo_id UUID NOT NULL REFERENCES public.contest_photos(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create ai_photo_analysis table
CREATE TABLE IF NOT EXISTS public.ai_photo_analysis (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  photo_id UUID NOT NULL REFERENCES public.contest_photos(id) ON DELETE CASCADE,
  ai_score NUMERIC NOT NULL,
  analysis_data JSONB,
  processed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create storage buckets for contest photos and images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
  ('contest-photos', 'contest-photos', true, 52428800, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']),
  ('contest-images', 'contest-images', true, 52428800, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif'])
ON CONFLICT (id) DO NOTHING;

-- Enable RLS on new tables
ALTER TABLE public.contest_photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.featured_gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_photo_analysis ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for contest_photos
CREATE POLICY "Anyone can view approved contest photos" ON public.contest_photos
  FOR SELECT USING (status = 'approved');

CREATE POLICY "Anyone can insert contest photos" ON public.contest_photos
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can update contest photos" ON public.contest_photos
  FOR UPDATE USING (true);

-- Create RLS policies for featured_gallery
CREATE POLICY "Anyone can view active featured photos" ON public.featured_gallery
  FOR SELECT USING (is_active = true);

CREATE POLICY "Anyone can manage featured gallery" ON public.featured_gallery
  FOR ALL USING (true);

-- Create RLS policies for ai_photo_analysis
CREATE POLICY "Anyone can view ai analysis" ON public.ai_photo_analysis
  FOR SELECT USING (true);

CREATE POLICY "Anyone can insert ai analysis" ON public.ai_photo_analysis
  FOR INSERT WITH CHECK (true);

-- Create storage policies
CREATE POLICY "Anyone can view contest photos" ON storage.objects
  FOR SELECT USING (bucket_id = 'contest-photos');

CREATE POLICY "Anyone can upload contest photos" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'contest-photos');

CREATE POLICY "Anyone can view contest images" ON storage.objects
  FOR SELECT USING (bucket_id = 'contest-images');

CREATE POLICY "Anyone can upload contest images" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'contest-images');

-- Create function to increment photo votes
CREATE OR REPLACE FUNCTION increment_photo_votes(photo_id UUID)
RETURNS void
LANGUAGE plpgsql
AS $$
BEGIN
  UPDATE public.contest_photos
  SET votes = votes + 1
  WHERE id = photo_id;
END;
$$;
