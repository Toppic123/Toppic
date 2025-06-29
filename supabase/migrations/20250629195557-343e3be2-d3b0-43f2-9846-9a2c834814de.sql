
-- Agregar el campo de plan/tarifa a la tabla contests
ALTER TABLE public.contests 
ADD COLUMN plan text DEFAULT 'basic' CHECK (plan IN ('basic', 'professional', 'premium'));

-- Actualizar los contests existentes para que tengan un plan por defecto
UPDATE public.contests SET plan = 'basic' WHERE plan IS NULL;
