
-- Crear bucket para contest-photos si no existe
INSERT INTO storage.buckets (id, name, public)
VALUES ('contest-photos', 'contest-photos', true)
ON CONFLICT (id) DO NOTHING;

-- Políticas para el bucket contest-photos
CREATE POLICY "Allow public uploads to contest-photos" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'contest-photos');

CREATE POLICY "Allow public access to contest-photos" ON storage.objects
FOR SELECT USING (bucket_id = 'contest-photos');

CREATE POLICY "Allow public updates to contest-photos" ON storage.objects
FOR UPDATE USING (bucket_id = 'contest-photos');

-- Asegurar que la tabla contest_photos tiene las políticas correctas
DROP POLICY IF EXISTS "Allow insert contest photos" ON public.contest_photos;
DROP POLICY IF EXISTS "Allow select contest photos" ON public.contest_photos;
DROP POLICY IF EXISTS "Allow update contest photos" ON public.contest_photos;

CREATE POLICY "Public can insert contest photos" ON public.contest_photos
FOR INSERT WITH CHECK (true);

CREATE POLICY "Public can select contest photos" ON public.contest_photos
FOR SELECT USING (true);

CREATE POLICY "Public can update contest photos" ON public.contest_photos
FOR UPDATE USING (true);
