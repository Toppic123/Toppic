-- Fix remaining database functions security warnings by setting search_path

-- Update all remaining functions to use secure search_path
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
 RETURNS trigger
 LANGUAGE plpgsql
 SET search_path TO 'public'
AS $function$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$function$;

CREATE OR REPLACE FUNCTION public.update_user_roles_updated_at()
 RETURNS trigger
 LANGUAGE plpgsql
 SET search_path TO 'public'
AS $function$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$function$;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  INSERT INTO public.profiles (id, email, name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', NEW.email)
  );
  RETURN NEW;
END;
$function$;

CREATE OR REPLACE FUNCTION public.process_withdrawal(p_request_id uuid, p_amount numeric, p_user_id uuid)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  -- Check if user has sufficient balance
  IF (SELECT balance FROM public.user_wallets WHERE user_id = p_user_id) < p_amount THEN
    RETURN FALSE;
  END IF;
  
  -- Update wallet balance
  UPDATE public.user_wallets 
  SET 
    balance = balance - p_amount,
    total_withdrawn = total_withdrawn + p_amount,
    updated_at = now()
  WHERE user_id = p_user_id;
  
  -- Record transaction
  INSERT INTO public.wallet_transactions (
    user_id, 
    amount, 
    transaction_type, 
    description, 
    withdrawal_request_id
  )
  VALUES (p_user_id, -p_amount, 'withdrawal', 'Withdrawal processed', p_request_id);
  
  RETURN TRUE;
END;
$function$;

CREATE OR REPLACE FUNCTION public.increment_user_votes(p_user_id uuid, p_contest_id uuid)
 RETURNS TABLE(votes_remaining integer, daily_votes_remaining integer)
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
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
$function$;

CREATE OR REPLACE FUNCTION public.get_user_vote_status(p_user_id uuid, p_contest_id uuid)
 RETURNS TABLE(votes_remaining integer, daily_votes_remaining integer, can_vote boolean)
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
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
$function$;

CREATE OR REPLACE FUNCTION public.update_prize_awards_updated_at()
 RETURNS trigger
 LANGUAGE plpgsql
 SET search_path TO 'public'
AS $function$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$function$;

CREATE OR REPLACE FUNCTION public.purchase_extra_photo_slot(p_user_id uuid, p_contest_id uuid)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
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
$function$;

CREATE OR REPLACE FUNCTION public.get_user_photo_slots(p_user_id uuid, p_contest_id uuid)
 RETURNS TABLE(total_slots integer, used_slots integer, remaining_slots integer, extra_slots_purchased integer)
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
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
$function$;

CREATE OR REPLACE FUNCTION public.award_contest_prizes(contest_id_param uuid)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
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
$function$;

CREATE OR REPLACE FUNCTION public.update_organizer_payments_updated_at()
 RETURNS trigger
 LANGUAGE plpgsql
 SET search_path TO 'public'
AS $function$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$function$;

CREATE OR REPLACE FUNCTION public.add_prize_money(p_user_id uuid, p_amount numeric, p_contest_id uuid, p_description text DEFAULT 'Prize money earned'::text)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  -- Insert or update wallet
  INSERT INTO user_wallets (user_id, balance, total_earned)
  VALUES (p_user_id, p_amount, p_amount)
  ON CONFLICT (user_id) 
  DO UPDATE SET 
    balance = user_wallets.balance + p_amount,
    total_earned = user_wallets.total_earned + p_amount,
    updated_at = now();
  
  -- Record transaction
  INSERT INTO wallet_transactions (
    user_id, 
    amount, 
    transaction_type, 
    description, 
    contest_id
  )
  VALUES (p_user_id, p_amount, 'prize_won', p_description, p_contest_id);
  
  RETURN TRUE;
END;
$function$;

CREATE OR REPLACE FUNCTION public.add_points_to_user(p_user_id uuid, p_amount integer, p_transaction_type text, p_description text DEFAULT NULL::text, p_order_id uuid DEFAULT NULL::uuid)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  -- Insert or update user points
  INSERT INTO user_points (user_id, points)
  VALUES (p_user_id, p_amount)
  ON CONFLICT (user_id) 
  DO UPDATE SET 
    points = user_points.points + p_amount,
    updated_at = now();
  
  -- Record transaction
  INSERT INTO point_transactions (
    user_id, 
    amount, 
    transaction_type, 
    description,
    order_id
  )
  VALUES (p_user_id, p_amount, p_transaction_type, p_description, p_order_id);
  
  RETURN TRUE;
END;
$function$;