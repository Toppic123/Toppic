-- Create user wallet system
CREATE TABLE public.user_wallets (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  balance DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  total_earned DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  total_withdrawn DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create withdrawal requests table
CREATE TABLE public.withdrawal_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'completed')),
  payment_method TEXT NOT NULL DEFAULT 'bank_transfer',
  payment_details JSONB,
  admin_notes TEXT,
  requested_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  processed_at TIMESTAMP WITH TIME ZONE
);

-- Create transactions table for tracking money movements
CREATE TABLE public.wallet_transactions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  transaction_type TEXT NOT NULL CHECK (transaction_type IN ('prize_won', 'withdrawal')),
  description TEXT,
  contest_id UUID,
  withdrawal_request_id UUID,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create contest banners table
CREATE TABLE public.contest_banners (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  contest_id UUID NOT NULL,
  banner_type TEXT NOT NULL CHECK (banner_type IN ('homepage', 'sidebar', 'contestPage')),
  image_url TEXT NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.user_wallets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.withdrawal_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wallet_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contest_banners ENABLE ROW LEVEL SECURITY;

-- User wallet policies
CREATE POLICY "Users can view their own wallet" 
ON public.user_wallets 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own wallet" 
ON public.user_wallets 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own wallet" 
ON public.user_wallets 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Withdrawal requests policies
CREATE POLICY "Users can view their own withdrawal requests" 
ON public.withdrawal_requests 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create withdrawal requests" 
ON public.withdrawal_requests 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Wallet transactions policies
CREATE POLICY "Users can view their own transactions" 
ON public.wallet_transactions 
FOR SELECT 
USING (auth.uid() = user_id);

-- Contest banners policies
CREATE POLICY "Anyone can view active banners" 
ON public.contest_banners 
FOR SELECT 
USING (is_active = true);

CREATE POLICY "Authenticated users can manage banners" 
ON public.contest_banners 
FOR ALL 
USING (true) 
WITH CHECK (true);

-- Create triggers for updating timestamps
CREATE TRIGGER update_user_wallets_updated_at
BEFORE UPDATE ON public.user_wallets
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_contest_banners_updated_at
BEFORE UPDATE ON public.contest_banners
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Function to add prize money to user wallet
CREATE OR REPLACE FUNCTION public.add_prize_money(
  p_user_id UUID,
  p_amount DECIMAL(10,2),
  p_contest_id UUID,
  p_description TEXT DEFAULT 'Prize money earned'
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Insert or update wallet
  INSERT INTO public.user_wallets (user_id, balance, total_earned)
  VALUES (p_user_id, p_amount, p_amount)
  ON CONFLICT (user_id) 
  DO UPDATE SET 
    balance = user_wallets.balance + p_amount,
    total_earned = user_wallets.total_earned + p_amount,
    updated_at = now();
  
  -- Record transaction
  INSERT INTO public.wallet_transactions (
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

-- Function to process withdrawal
CREATE OR REPLACE FUNCTION public.process_withdrawal(
  p_request_id UUID,
  p_amount DECIMAL(10,2),
  p_user_id UUID
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
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
$$;