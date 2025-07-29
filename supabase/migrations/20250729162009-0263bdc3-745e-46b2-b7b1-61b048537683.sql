-- Add cash prize support to contests table
ALTER TABLE public.contests ADD COLUMN IF NOT EXISTS cash_prize_amount NUMERIC DEFAULT 0;
ALTER TABLE public.contests ADD COLUMN IF NOT EXISTS organizer_commission_fee NUMERIC DEFAULT 0;
ALTER TABLE public.contests ADD COLUMN IF NOT EXISTS payment_session_id TEXT;
ALTER TABLE public.contests ADD COLUMN IF NOT EXISTS payment_status TEXT DEFAULT 'pending';

-- Create table for organizer payments
CREATE TABLE IF NOT EXISTS public.organizer_payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  contest_id UUID NOT NULL REFERENCES public.contests(id) ON DELETE CASCADE,
  organizer_email TEXT NOT NULL,
  cash_prize_amount NUMERIC NOT NULL,
  commission_fee NUMERIC NOT NULL,
  total_amount NUMERIC NOT NULL,
  stripe_session_id TEXT,
  payment_status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  paid_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.organizer_payments ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Allow organizers to view their payments" 
ON public.organizer_payments 
FOR SELECT 
USING (true);

CREATE POLICY "Allow system to manage payments" 
ON public.organizer_payments 
FOR ALL 
USING (true);

-- Create trigger for updated_at
CREATE OR REPLACE FUNCTION public.update_organizer_payments_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_organizer_payments_updated_at
  BEFORE UPDATE ON public.organizer_payments
  FOR EACH ROW
  EXECUTE FUNCTION public.update_organizer_payments_updated_at();