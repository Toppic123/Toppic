-- Create prize_awards table to track prize distributions
CREATE TABLE public.prize_awards (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  contest_id UUID NOT NULL,
  position INTEGER NOT NULL CHECK (position IN (1, 2, 3)),
  points_awarded INTEGER NOT NULL,
  email_sent BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on prize_awards
ALTER TABLE public.prize_awards ENABLE ROW LEVEL SECURITY;

-- Create policies for prize_awards
CREATE POLICY "Users can view their own prize awards" 
ON public.prize_awards 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "System can manage prize awards" 
ON public.prize_awards 
FOR ALL
USING (true)
WITH CHECK (true);

-- Create function to award prizes when contest ends
CREATE OR REPLACE FUNCTION public.award_contest_prizes(contest_id_param UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  contest_plan TEXT;
  winner_record RECORD;
  second_place_record RECORD;
  third_place_record RECORD;
BEGIN
  -- Get contest plan
  SELECT plan INTO contest_plan 
  FROM contests 
  WHERE id = contest_id_param;
  
  -- Get top 3 photos by votes
  SELECT cp.user_id, cp.photographer_name, cp.votes
  INTO winner_record
  FROM contest_photos cp
  WHERE cp.contest_id = contest_id_param 
    AND cp.status = 'approved'
  ORDER BY cp.votes DESC
  LIMIT 1;
  
  -- Award 1st place (50 points for all contest types)
  IF winner_record.user_id IS NOT NULL THEN
    -- Add points to user
    INSERT INTO point_transactions (user_id, amount, contest_id, transaction_type, description)
    VALUES (
      winner_record.user_id, 
      50, 
      contest_id_param, 
      'contest_winner_prize', 
      'Premio por 1º lugar en concurso'
    );
    
    -- Update user points
    INSERT INTO user_points (user_id, points)
    VALUES (winner_record.user_id, 50)
    ON CONFLICT (user_id) 
    DO UPDATE SET 
      points = user_points.points + 50,
      updated_at = now();
    
    -- Record prize award
    INSERT INTO prize_awards (user_id, contest_id, position, points_awarded)
    VALUES (winner_record.user_id, contest_id_param, 1, 50);
  END IF;
  
  -- For Professional and Premium plans, award 2nd and 3rd place
  IF contest_plan IN ('professional', 'premium') THEN
    -- Get 2nd place
    SELECT cp.user_id, cp.photographer_name, cp.votes
    INTO second_place_record
    FROM contest_photos cp
    WHERE cp.contest_id = contest_id_param 
      AND cp.status = 'approved'
      AND cp.user_id != winner_record.user_id
    ORDER BY cp.votes DESC
    LIMIT 1;
    
    -- Award 2nd place (25 points)
    IF second_place_record.user_id IS NOT NULL THEN
      INSERT INTO point_transactions (user_id, amount, contest_id, transaction_type, description)
      VALUES (
        second_place_record.user_id, 
        25, 
        contest_id_param, 
        'contest_runner_up_prize', 
        'Premio por 2º lugar en concurso'
      );
      
      INSERT INTO user_points (user_id, points)
      VALUES (second_place_record.user_id, 25)
      ON CONFLICT (user_id) 
      DO UPDATE SET 
        points = user_points.points + 25,
        updated_at = now();
      
      INSERT INTO prize_awards (user_id, contest_id, position, points_awarded)
      VALUES (second_place_record.user_id, contest_id_param, 2, 25);
    END IF;
    
    -- Get 3rd place
    SELECT cp.user_id, cp.photographer_name, cp.votes
    INTO third_place_record
    FROM contest_photos cp
    WHERE cp.contest_id = contest_id_param 
      AND cp.status = 'approved'
      AND cp.user_id NOT IN (winner_record.user_id, second_place_record.user_id)
    ORDER BY cp.votes DESC
    LIMIT 1;
    
    -- Award 3rd place (25 points)
    IF third_place_record.user_id IS NOT NULL THEN
      INSERT INTO point_transactions (user_id, amount, contest_id, transaction_type, description)
      VALUES (
        third_place_record.user_id, 
        25, 
        contest_id_param, 
        'contest_runner_up_prize', 
        'Premio por 3º lugar en concurso'
      );
      
      INSERT INTO user_points (user_id, points)
      VALUES (third_place_record.user_id, 25)
      ON CONFLICT (user_id) 
      DO UPDATE SET 
        points = user_points.points + 25,
        updated_at = now();
      
      INSERT INTO prize_awards (user_id, contest_id, position, points_awarded)
      VALUES (third_place_record.user_id, contest_id_param, 3, 25);
    END IF;
  END IF;
END;
$$;

-- Create trigger to update updated_at on prize_awards
CREATE OR REPLACE FUNCTION public.update_prize_awards_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_prize_awards_updated_at
  BEFORE UPDATE ON public.prize_awards
  FOR EACH ROW
  EXECUTE FUNCTION public.update_prize_awards_updated_at();