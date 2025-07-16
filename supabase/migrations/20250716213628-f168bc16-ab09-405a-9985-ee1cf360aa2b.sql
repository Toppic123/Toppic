-- Create table to track user votes per contest
CREATE TABLE public.user_votes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  contest_id UUID NOT NULL REFERENCES public.contests(id) ON DELETE CASCADE,
  votes_cast INTEGER NOT NULL DEFAULT 0,
  daily_votes_cast INTEGER NOT NULL DEFAULT 0,
  last_vote_date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, contest_id)
);

-- Enable Row Level Security
ALTER TABLE public.user_votes ENABLE ROW LEVEL SECURITY;

-- Create policies for user votes
CREATE POLICY "Users can view their own votes" 
ON public.user_votes 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own vote records" 
ON public.user_votes 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own vote records" 
ON public.user_votes 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_user_votes_updated_at
BEFORE UPDATE ON public.user_votes
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to increment user votes
CREATE OR REPLACE FUNCTION public.increment_user_votes(p_user_id UUID, p_contest_id UUID)
RETURNS TABLE(votes_remaining INTEGER, daily_votes_remaining INTEGER) AS $$
DECLARE
  current_votes INTEGER;
  current_daily_votes INTEGER;
  vote_limit INTEGER := 50; -- Total votes per contest
  daily_limit INTEGER := 10; -- Daily votes limit
BEGIN
  -- Insert or update user votes record
  INSERT INTO public.user_votes (user_id, contest_id, votes_cast, daily_votes_cast, last_vote_date)
  VALUES (p_user_id, p_contest_id, 1, 1, CURRENT_DATE)
  ON CONFLICT (user_id, contest_id) 
  DO UPDATE SET 
    votes_cast = CASE 
      WHEN user_votes.votes_cast < vote_limit THEN user_votes.votes_cast + 1
      ELSE user_votes.votes_cast
    END,
    daily_votes_cast = CASE 
      WHEN user_votes.last_vote_date = CURRENT_DATE THEN 
        CASE 
          WHEN user_votes.daily_votes_cast < daily_limit THEN user_votes.daily_votes_cast + 1
          ELSE user_votes.daily_votes_cast
        END
      ELSE 1
    END,
    last_vote_date = CURRENT_DATE,
    updated_at = now()
  RETURNING user_votes.votes_cast, user_votes.daily_votes_cast INTO current_votes, current_daily_votes;
  
  -- Return remaining votes
  RETURN QUERY SELECT 
    (vote_limit - current_votes) as votes_remaining,
    (daily_limit - current_daily_votes) as daily_votes_remaining;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to get user vote status
CREATE OR REPLACE FUNCTION public.get_user_vote_status(p_user_id UUID, p_contest_id UUID)
RETURNS TABLE(votes_remaining INTEGER, daily_votes_remaining INTEGER, can_vote BOOLEAN) AS $$
DECLARE
  current_votes INTEGER := 0;
  current_daily_votes INTEGER := 0;
  vote_limit INTEGER := 50;
  daily_limit INTEGER := 10;
BEGIN
  -- Get current vote counts
  SELECT 
    COALESCE(uv.votes_cast, 0),
    CASE 
      WHEN uv.last_vote_date = CURRENT_DATE THEN COALESCE(uv.daily_votes_cast, 0)
      ELSE 0
    END
  INTO current_votes, current_daily_votes
  FROM public.user_votes uv
  WHERE uv.user_id = p_user_id AND uv.contest_id = p_contest_id;
  
  -- Return vote status
  RETURN QUERY SELECT 
    (vote_limit - current_votes) as votes_remaining,
    (daily_limit - current_daily_votes) as daily_votes_remaining,
    (current_votes < vote_limit AND current_daily_votes < daily_limit) as can_vote;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;