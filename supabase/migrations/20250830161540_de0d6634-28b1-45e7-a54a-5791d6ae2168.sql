-- Create user_roles table for managing user roles
CREATE TABLE IF NOT EXISTS public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('participant', 'organizer', 'admin')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Enable RLS
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own role"
ON public.user_roles 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all roles"
ON public.user_roles 
FOR ALL
USING (is_admin_user())
WITH CHECK (is_admin_user());

-- Insert default role for admin user
INSERT INTO public.user_roles (user_id, role) 
SELECT id, 'admin' 
FROM auth.users 
WHERE email = 'pisillo@gmail.com'
ON CONFLICT (user_id) DO UPDATE SET role = 'admin';

-- Create trigger to update updated_at
CREATE OR REPLACE FUNCTION public.update_user_roles_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_user_roles_updated_at
BEFORE UPDATE ON public.user_roles
FOR EACH ROW
EXECUTE FUNCTION public.update_user_roles_updated_at();