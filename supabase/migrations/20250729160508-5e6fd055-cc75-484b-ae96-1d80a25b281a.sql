-- Create table for tracking premium user extra photo uploads
CREATE TABLE IF NOT EXISTS public.premium_photo_uploads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  contest_id UUID NOT NULL,
  extra_photos_count INTEGER NOT NULL DEFAULT 0,
  points_spent INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.premium_photo_uploads ENABLE ROW LEVEL SECURITY;

-- Create policies for premium photo uploads
CREATE POLICY "Users can view their own premium uploads" 
ON public.premium_photo_uploads 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own premium uploads" 
ON public.premium_photo_uploads 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own premium uploads" 
ON public.premium_photo_uploads 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Add unique constraint to prevent duplicate entries per user per contest
ALTER TABLE public.premium_photo_uploads 
ADD CONSTRAINT unique_user_contest_upload 
UNIQUE (user_id, contest_id);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_premium_photo_uploads_updated_at
BEFORE UPDATE ON public.premium_photo_uploads
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to purchase extra photo slots
CREATE OR REPLACE FUNCTION public.purchase_extra_photo_slot(
  p_user_id UUID,
  p_contest_id UUID
) RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  current_extra_photos INTEGER := 0;
  max_extra_photos INTEGER := 3;
  points_per_photo INTEGER := 5;
  current_points INTEGER;
BEGIN
  -- Check current user points
  SELECT points INTO current_points 
  FROM public.user_points 
  WHERE user_id = p_user_id;
  
  IF current_points IS NULL OR current_points < points_per_photo THEN
    RETURN FALSE;
  END IF;
  
  -- Get current extra photos count for this contest
  SELECT extra_photos_count INTO current_extra_photos
  FROM public.premium_photo_uploads
  WHERE user_id = p_user_id AND contest_id = p_contest_id;
  
  -- Check if user has reached the limit
  IF current_extra_photos >= max_extra_photos THEN
    RETURN FALSE;
  END IF;
  
  -- Spend points
  PERFORM public.spend_user_points(
    p_user_id, 
    points_per_photo, 
    'extra_photo_slot', 
    'Compra de slot extra para foto adicional',
    p_contest_id
  );
  
  -- Update or insert premium upload record
  INSERT INTO public.premium_photo_uploads (user_id, contest_id, extra_photos_count, points_spent)
  VALUES (p_user_id, p_contest_id, 1, points_per_photo)
  ON CONFLICT (user_id, contest_id) 
  DO UPDATE SET 
    extra_photos_count = premium_photo_uploads.extra_photos_count + 1,
    points_spent = premium_photo_uploads.points_spent + points_per_photo,
    updated_at = now();
  
  RETURN TRUE;
END;
$$;

-- Create function to get user's available photo slots for a contest
CREATE OR REPLACE FUNCTION public.get_user_photo_slots(
  p_user_id UUID,
  p_contest_id UUID
) RETURNS TABLE(
  total_slots INTEGER,
  used_slots INTEGER,
  remaining_slots INTEGER,
  extra_slots_purchased INTEGER
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  base_slots INTEGER := 1; -- Base photo slot per contest
  extra_purchased INTEGER := 0;
  photos_uploaded INTEGER := 0;
BEGIN
  -- Get extra slots purchased
  SELECT COALESCE(extra_photos_count, 0) INTO extra_purchased
  FROM public.premium_photo_uploads
  WHERE user_id = p_user_id AND contest_id = p_contest_id;
  
  -- Get photos already uploaded
  SELECT COUNT(*) INTO photos_uploaded
  FROM public.contest_photos
  WHERE user_id = p_user_id AND contest_id = p_contest_id;
  
  RETURN QUERY SELECT 
    base_slots + extra_purchased AS total_slots,
    photos_uploaded AS used_slots,
    (base_slots + extra_purchased - photos_uploaded) AS remaining_slots,
    extra_purchased AS extra_slots_purchased;
END;
$$;