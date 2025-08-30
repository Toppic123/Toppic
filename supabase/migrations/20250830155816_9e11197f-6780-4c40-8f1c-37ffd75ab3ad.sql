-- Fix security vulnerability in photo_comments table
-- Remove the overly permissive policy that allows anyone to view all comments
DROP POLICY IF EXISTS "Anyone can view photo comments" ON public.photo_comments;

-- Create a more secure policy that only allows viewing comments for approved contest photos
-- This prevents unauthorized access to user personal information
CREATE POLICY "Users can view comments on approved photos" 
ON public.photo_comments 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 
    FROM public.contest_photos cp 
    WHERE cp.id::text = photo_comments.photo_id 
    AND cp.status = 'approved'
  )
);