
-- Add unique constraint to ensure one photo per user per contest
ALTER TABLE contest_photos 
ADD COLUMN user_id UUID REFERENCES auth.users(id);

-- Create unique index to prevent multiple photos from same user in same contest
CREATE UNIQUE INDEX idx_contest_photos_user_contest 
ON contest_photos(contest_id, user_id) 
WHERE user_id IS NOT NULL;

-- Update existing photos to have a user_id (this will set them to NULL for now)
-- In production, you'd want to map these to actual users
UPDATE contest_photos 
SET user_id = NULL 
WHERE user_id IS NULL;
