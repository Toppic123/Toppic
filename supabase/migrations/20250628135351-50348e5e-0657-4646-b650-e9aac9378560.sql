
-- Actualizar las políticas RLS para contest_photos para permitir inserción sin autenticación
DROP POLICY IF EXISTS "Anyone can insert contest photos" ON public.contest_photos;
DROP POLICY IF EXISTS "Anyone can update contest photos" ON public.contest_photos;

-- Crear políticas más permisivas para contest_photos
CREATE POLICY "Allow insert contest photos" ON public.contest_photos
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow update contest photos" ON public.contest_photos
  FOR UPDATE USING (true);

-- Asegurar que las políticas de storage también sean permisivas
DROP POLICY IF EXISTS "Anyone can upload contest photos" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can view contest photos" ON storage.objects;

CREATE POLICY "Allow upload contest photos" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'contest-photos');

CREATE POLICY "Allow update contest photos storage" ON storage.objects
  FOR UPDATE USING (bucket_id = 'contest-photos');

CREATE POLICY "Allow view contest photos storage" ON storage.objects
  FOR SELECT USING (bucket_id = 'contest-photos');
