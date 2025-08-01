-- Update the award_contest_prizes function to give 25 points for 3rd place instead of 15
CREATE OR REPLACE FUNCTION public.award_contest_prizes(contest_id_param uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
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
    
    -- Award 3rd place (25 points - updated from 15 points)
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