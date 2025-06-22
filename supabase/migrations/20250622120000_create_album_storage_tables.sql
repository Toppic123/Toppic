
-- Create album storage management tables
CREATE TABLE public.album_storage (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  contest_id UUID NOT NULL REFERENCES public.contests(id) ON DELETE CASCADE,
  organizer_plan TEXT NOT NULL DEFAULT 'basic',
  storage_expires_at TIMESTAMPTZ NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  renewal_price_cents INTEGER NOT NULL, -- 10-20€ depending on plan
  auto_renewal_enabled BOOLEAN NOT NULL DEFAULT false,
  stripe_subscription_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create notifications log table
CREATE TABLE public.album_storage_notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  album_storage_id UUID NOT NULL REFERENCES public.album_storage(id) ON DELETE CASCADE,
  notification_type TEXT NOT NULL, -- '30_days', '7_days', 'expired'
  sent_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  email_sent_to TEXT NOT NULL
);

-- Enable RLS
ALTER TABLE public.album_storage ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.album_storage_notifications ENABLE ROW LEVEL SECURITY;

-- RLS policies for album storage
CREATE POLICY "select_album_storage" ON public.album_storage
  FOR SELECT
  USING (true);

CREATE POLICY "insert_album_storage" ON public.album_storage
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "update_album_storage" ON public.album_storage
  FOR UPDATE
  USING (true);

-- RLS policies for notifications
CREATE POLICY "select_album_notifications" ON public.album_storage_notifications
  FOR SELECT
  USING (true);

CREATE POLICY "insert_album_notifications" ON public.album_storage_notifications
  FOR INSERT
  WITH CHECK (true);

-- Function to calculate renewal price based on plan
CREATE OR REPLACE FUNCTION public.get_renewal_price_for_plan(plan_name TEXT)
RETURNS INTEGER
LANGUAGE plpgsql
AS $$
BEGIN
  CASE plan_name
    WHEN 'basic' THEN RETURN 1000; -- 10€
    WHEN 'professional' THEN RETURN 1500; -- 15€
    WHEN 'premium' THEN RETURN 2000; -- 20€
    ELSE RETURN 1000; -- Default to basic
  END CASE;
END;
$$;

-- Function to create album storage entry when contest is created
CREATE OR REPLACE FUNCTION public.create_album_storage_for_contest()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
DECLARE
  organizer_plan_name TEXT := 'basic';
  renewal_price INTEGER;
BEGIN
  -- Try to get organizer plan from organizers table
  SELECT plan INTO organizer_plan_name
  FROM public.organizers
  WHERE name = NEW.organizer
  LIMIT 1;
  
  -- If no plan found, default to basic
  IF organizer_plan_name IS NULL THEN
    organizer_plan_name := 'basic';
  END IF;
  
  -- Get renewal price for the plan
  renewal_price := public.get_renewal_price_for_plan(organizer_plan_name);
  
  -- Create album storage entry with 1 year expiration
  INSERT INTO public.album_storage (
    contest_id,
    organizer_plan,
    storage_expires_at,
    renewal_price_cents
  ) VALUES (
    NEW.id,
    organizer_plan_name,
    NOW() + INTERVAL '1 year',
    renewal_price
  );
  
  RETURN NEW;
END;
$$;

-- Create trigger to automatically create album storage when contest is created
CREATE TRIGGER create_album_storage_trigger
  AFTER INSERT ON public.contests
  FOR EACH ROW
  EXECUTE FUNCTION public.create_album_storage_for_contest();
