
-- Create table for storing photo comments permanently
CREATE TABLE public.photo_comments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  photo_id TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT NOT NULL,
  avatar_url TEXT,
  comment_text TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.photo_comments ENABLE ROW LEVEL SECURITY;

-- Create policies for photo comments
CREATE POLICY "Anyone can view photo comments" 
  ON public.photo_comments 
  FOR SELECT 
  TO authenticated, anon 
  USING (true);

CREATE POLICY "Authenticated users can create comments" 
  ON public.photo_comments 
  FOR INSERT 
  TO authenticated 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own comments" 
  ON public.photo_comments 
  FOR UPDATE 
  TO authenticated 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own comments" 
  ON public.photo_comments 
  FOR DELETE 
  TO authenticated 
  USING (auth.uid() = user_id);

-- Add minimum participation distance field to contests table
ALTER TABLE public.contests 
ADD COLUMN minimum_distance_km INTEGER DEFAULT 0;

-- Create index for better performance
CREATE INDEX idx_photo_comments_photo_id ON public.photo_comments(photo_id);
CREATE INDEX idx_photo_comments_created_at ON public.photo_comments(created_at DESC);
