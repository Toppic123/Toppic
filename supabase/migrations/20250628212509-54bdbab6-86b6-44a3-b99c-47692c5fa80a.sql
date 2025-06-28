
-- Verificar y actualizar la estructura de la tabla contests para el campo prize
-- Asegurar que el campo prize esté configurado correctamente
UPDATE contests SET prize = COALESCE(prize, '') WHERE prize IS NULL;

-- Verificar que no hay problemas con la tabla contest_photos
-- Asegurar que las eliminaciones funcionen correctamente
