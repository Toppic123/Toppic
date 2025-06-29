
-- Crear política para permitir eliminación de fotos del concurso
DROP POLICY IF EXISTS "Allow delete contest photos" ON public.contest_photos;

CREATE POLICY "Allow delete contest photos" ON public.contest_photos
FOR DELETE USING (true);

-- También asegurar que las políticas de storage permitan eliminación
DROP POLICY IF EXISTS "Allow delete contest photos storage" ON storage.objects;

CREATE POLICY "Allow delete contest photos storage" ON storage.objects
FOR DELETE USING (bucket_id = 'contest-photos');
