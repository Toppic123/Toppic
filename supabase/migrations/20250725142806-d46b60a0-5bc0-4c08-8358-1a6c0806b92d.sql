-- Create user points table to track user points balance
CREATE TABLE public.user_points (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  points INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

-- Enable RLS
ALTER TABLE public.user_points ENABLE ROW LEVEL SECURITY;

-- Create policies for user points
CREATE POLICY "Users can view their own points" 
ON public.user_points 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own points record" 
ON public.user_points 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "System can update points" 
ON public.user_points 
FOR UPDATE 
USING (true);

-- Create point transactions table to track all point movements
CREATE TABLE public.point_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  amount INTEGER NOT NULL, -- positive for earned, negative for spent
  transaction_type TEXT NOT NULL, -- 'purchase', 'contest_entry', 'contest_win', 'referral', etc.
  description TEXT,
  contest_id UUID REFERENCES public.contests(id) ON DELETE SET NULL,
  order_id UUID, -- reference to payment order if applicable
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.point_transactions ENABLE ROW LEVEL SECURITY;

-- Create policies for point transactions
CREATE POLICY "Users can view their own transactions" 
ON public.point_transactions 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "System can insert transactions" 
ON public.point_transactions 
FOR INSERT 
WITH CHECK (true);

-- Create payment orders table to track Stripe payments
CREATE TABLE public.payment_orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  stripe_session_id TEXT UNIQUE,
  amount_cents INTEGER NOT NULL, -- amount in cents (euros)
  points_purchased INTEGER NOT NULL, -- points to be awarded
  status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'completed', 'failed', 'cancelled'
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  completed_at TIMESTAMPTZ
);

-- Enable RLS
ALTER TABLE public.payment_orders ENABLE ROW LEVEL SECURITY;

-- Create policies for payment orders
CREATE POLICY "Users can view their own orders" 
ON public.payment_orders 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "System can manage orders" 
ON public.payment_orders 
FOR ALL 
USING (true) 
WITH CHECK (true);

-- Add premium contest features to contests table
ALTER TABLE public.contests ADD COLUMN IF NOT EXISTS is_premium BOOLEAN DEFAULT false;
ALTER TABLE public.contests ADD COLUMN IF NOT EXISTS points_required INTEGER DEFAULT 0;
ALTER TABLE public.contests ADD COLUMN IF NOT EXISTS max_premium_participants INTEGER;

-- Create premium contest entries table
CREATE TABLE public.premium_contest_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  contest_id UUID NOT NULL REFERENCES public.contests(id) ON DELETE CASCADE,
  points_spent INTEGER NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, contest_id)
);

-- Enable RLS
ALTER TABLE public.premium_contest_entries ENABLE ROW LEVEL SECURITY;

-- Create policies for premium contest entries
CREATE POLICY "Users can view their own entries" 
ON public.premium_contest_entries 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own entries" 
ON public.premium_contest_entries 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Create function to add points to user
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

-- Create function to spend points
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

-- Create function to get user points balance
CREATE OR REPLACE FUNCTION public.get_user_points(p_user_id UUID)
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
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

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_user_points_updated_at
BEFORE UPDATE ON public.user_points
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();