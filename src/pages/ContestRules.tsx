
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Star, Trophy, Camera } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ContestRules = () => {
  const navigate = useNavigate();

  return (
    <div className="pt-24 pb-16">
      <div className="container max-w-4xl mx-auto px-4">
        <div className="flex items-center mb-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="text-gray-600 hover:bg-gray-100 p-2 mr-4"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-3xl font-bold">Reglas del Concurso</h1>
        </div>

        <div className="space-y-8">
          {/* Reglas Generales */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-lg p-6 shadow-sm border"
          >
            <h2 className="text-2xl font-semibold mb-6 flex items-center">
              <Camera className="w-6 h-6 mr-2 text-primary" />
              Reglas de Participación
            </h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Requisitos de las Fotografías</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>Las fotografías deben ser originales y de tu autoría</li>
                  <li>Formato JPG o PNG, tamaño máximo 25MB</li>
                  <li>Resolución mínima: 1920x1080 píxeles</li>
                  <li>No se permiten marcas de agua visibles</li>
                  <li>Las fotos deben tomarse dentro del área y período del concurso</li>
                  <li>Usuarios gratuitos: 1 foto por concurso. Usuarios PREMIUM: hasta 3 fotos por concurso</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Contenido Prohibido</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>Contenido ofensivo, discriminatorio o inapropiado</li>
                  <li>Fotografías que violen la privacidad de terceros</li>
                  <li>Imágenes con derechos de autor de terceros</li>
                  <li>Contenido comercial o promocional no autorizado</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Derechos y Uso</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>Mantienes los derechos de autor de tus fotografías</li>
                  <li>Otorgas licencia para mostrar tu trabajo en la plataforma</li>
                  <li>Las fotografías ganadoras pueden ser utilizadas para promoción</li>
                  <li>Siempre se creditará al autor original</li>
                </ul>
              </div>
            </div>
          </motion.section>

          {/* Sistema de Votación */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-lg p-6 shadow-sm border"
          >
            <h2 className="text-2xl font-semibold mb-6 flex items-center">
              <Star className="w-6 h-6 mr-2 text-primary" />
              Sistema de Votación
            </h2>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Cómo Funciona la Votación</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>Utilizamos un sistema de votación comparativa por pares</li>
                  <li>Se te mostrarán dos fotografías lado a lado</li>
                  <li>Debes elegir cuál te gusta más de las dos</li>
                  <li>Cada comparación ayuda a determinar el ranking final</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Algoritmo ELO</h3>
                <p className="text-gray-700 mb-2">
                  Utilizamos el sistema de puntuación ELO, similar al usado en ajedrez y deportes:
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>Cada fotografía comienza con una puntuación base</li>
                  <li>Ganar contra una foto con alta puntuación da más puntos</li>
                  <li>Perder contra una foto con baja puntuación resta más puntos</li>
                  <li>El sistema se equilibra automáticamente con más votaciones</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Proceso de Votación</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>La votación comienza automáticamente al finalizar el período de subida</li>
                  <li>Todos los usuarios registrados pueden votar</li>
                  <li>No puedes votar por tus propias fotografías</li>
                  <li>Cada usuario puede realizar múltiples comparaciones</li>
                  <li>Los resultados se actualizan en tiempo real</li>
                </ul>
              </div>
            </div>
          </motion.section>

          {/* Premios */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white rounded-lg p-6 shadow-sm border"
          >
            <h2 className="text-2xl font-semibold mb-6 flex items-center">
              <Trophy className="w-6 h-6 mr-2 text-primary" />
              Premios y Reconocimientos
            </h2>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Criterios de Selección</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>Los ganadores se determinan por la puntuación ELO final</li>
                  <li>Se consideran la creatividad, técnica y relevancia al tema</li>
                  <li>Un jurado especializado puede revisar los resultados finales</li>
                  <li>Se verificará el cumplimiento de todas las reglas</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Proceso de Selección</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>Primera fase: Votación pública por pares</li>
                  <li>Segunda fase: Revisión técnica y de cumplimiento</li>
                  <li>Tercera fase: Selección final y verificación</li>
                  <li>Los resultados se anuncian en la fecha especificada</li>
                </ul>
              </div>
            </div>
          </motion.section>

          <div className="flex justify-center pt-6">
            <Button onClick={() => navigate(-1)} className="bg-primary hover:bg-primary/90">
              Volver al Concurso
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContestRules;
