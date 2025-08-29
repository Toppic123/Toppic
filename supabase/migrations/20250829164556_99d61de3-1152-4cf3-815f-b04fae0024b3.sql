-- Admin RLS policies to allow managing user wallets from admin panel
-- 1) user_wallets: admins can SELECT/UPDATE/INSERT any wallet
CREATE POLICY "Admins can view all wallets"
ON public.user_wallets
FOR SELECT
USING (is_admin_user());

CREATE POLICY "Admins can update any wallet"
ON public.user_wallets
FOR UPDATE
USING (is_admin_user());

CREATE POLICY "Admins can insert wallets"
ON public.user_wallets
FOR INSERT
WITH CHECK (is_admin_user());

-- 2) wallet_transactions: admins can SELECT/INSERT any transaction (immutable updates not allowed)
CREATE POLICY "Admins can view all wallet transactions"
ON public.wallet_transactions
FOR SELECT
USING (is_admin_user());

CREATE POLICY "Admins can insert wallet transactions"
ON public.wallet_transactions
FOR INSERT
WITH CHECK (is_admin_user());

-- 3) user_points: admins can SELECT all users' points (updates already allowed by system policy)
CREATE POLICY "Admins can view all user points"
ON public.user_points
FOR SELECT
USING (is_admin_user());