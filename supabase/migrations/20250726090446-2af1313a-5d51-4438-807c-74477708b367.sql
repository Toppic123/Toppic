-- Update function security settings for better security
CREATE OR REPLACE FUNCTION public.add_points_to_user(
  p_user_id UUID,
  p_amount INTEGER,
  p_transaction_type TEXT,
  p_description TEXT DEFAULT NULL,
  p_order_id UUID DEFAULT NULL
) 
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Insert or update user points
  INSERT INTO public.user_points (user_id, points)
  VALUES (p_user_id, p_amount)
  ON CONFLICT (user_id) 
  DO UPDATE SET 
    points = user_points.points + p_amount,
    updated_at = now();
  
  -- Record transaction
  INSERT INTO public.point_transactions (
    user_id, 
    amount, 
    transaction_type, 
    description,
    order_id
  )
  VALUES (p_user_id, p_amount, p_transaction_type, p_description, p_order_id);
  
  RETURN TRUE;
END;
$$;

CREATE OR REPLACE FUNCTION public.spend_user_points(
  p_user_id UUID,
  p_amount INTEGER,
  p_transaction_type TEXT,
  p_description TEXT DEFAULT NULL,
  p_contest_id UUID DEFAULT NULL
) 
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  current_points INTEGER;
BEGIN
  -- Check if user has enough points
  SELECT points INTO current_points 
  FROM public.user_points 
  WHERE user_id = p_user_id;
  
  IF current_points IS NULL OR current_points < p_amount THEN
    RETURN FALSE;
  END IF;
  
  -- Update user points
  UPDATE public.user_points 
  SET 
    points = points - p_amount,
    updated_at = now()
  WHERE user_id = p_user_id;
  
  -- Record transaction
  INSERT INTO public.point_transactions (
    user_id, 
    amount, 
    transaction_type, 
    description,
    contest_id
  )
  VALUES (p_user_id, -p_amount, p_transaction_type, p_description, p_contest_id);
  
  RETURN TRUE;
END;
$$;

CREATE OR REPLACE FUNCTION public.get_user_points(p_user_id UUID)
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  user_points_balance INTEGER;
BEGIN
  SELECT points INTO user_points_balance
  FROM public.user_points
  WHERE user_id = p_user_id;
  
  RETURN COALESCE(user_points_balance, 0);
END;
$$;