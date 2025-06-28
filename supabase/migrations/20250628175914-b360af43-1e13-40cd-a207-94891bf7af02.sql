
-- Primero, eliminamos las políticas existentes si las hay
DROP POLICY IF EXISTS "Anyone can view featured contests" ON public.featured_contests;

-- Creamos las políticas correctas para la tabla featured_contests
-- Política para que cualquiera pueda ver los concursos destacados activos
CREATE POLICY "Anyone can view active featured contests" 
  ON public.featured_contests 
  FOR SELECT 
  TO public
  USING (is_active = true);

-- Política para que usuarios autenticados puedan insertar concursos destacados
CREATE POLICY "Authenticated users can insert featured contests" 
  ON public.featured_contests 
  FOR INSERT 
  TO authenticated
  WITH CHECK (true);

-- Política para que usuarios autenticados puedan actualizar concursos destacados
CREATE POLICY "Authenticated users can update featured contests" 
  ON public.featured_contests 
  FOR UPDATE 
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Política para que usuarios autenticados puedan eliminar concursos destacados
CREATE POLICY "Authenticated users can delete featured contests" 
  ON public.featured_contests 
  FOR DELETE 
  TO authenticated
  USING (true);
