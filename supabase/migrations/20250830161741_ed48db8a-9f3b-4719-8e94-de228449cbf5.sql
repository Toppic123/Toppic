-- Fix security warnings by adding SECURITY DEFINER SET search_path to critical functions

-- Update existing functions to include proper search_path
CREATE OR REPLACE FUNCTION public.is_admin_user()
RETURNS BOOLEAN
LANGUAGE SQL
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT EXISTS (
    SELECT 1 
    FROM auth.users 
    WHERE id = auth.uid() 
    AND email IN ('pisillo@gmail.com')
  );
$$;

CREATE OR REPLACE FUNCTION public.add_prize_money(p_user_id uuid, p_amount numeric, p_contest_id uuid, p_description text DEFAULT 'Prize money earned'::text)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
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
$$;

CREATE OR REPLACE FUNCTION public.add_points_to_user(p_user_id uuid, p_amount integer, p_transaction_type text, p_description text DEFAULT NULL::text, p_order_id uuid DEFAULT NULL::uuid)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
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
$$;