
-- Crear bucket para contest-images si no existe
INSERT INTO storage.buckets (id, name, public)
VALUES ('contest-images', 'contest-images', true)
ON CONFLICT (id) DO NOTHING;

-- Políticas para el bucket contest-images
CREATE POLICY "Allow public uploads to contest-images" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'contest-images');

CREATE POLICY "Allow public access to contest-images" ON storage.objects
FOR SELECT USING (bucket_id = 'contest-images');

CREATE POLICY "Allow public updates to contest-images" ON storage.objects
FOR UPDATE USING (bucket_id = 'contest-images');

CREATE POLICY "Allow public deletes to contest-images" ON storage.objects
FOR DELETE USING (bucket_id = 'contest-images');
