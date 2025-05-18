
import { motion } from "framer-motion";

const ElevatorPitch = () => {
  return (
    <div className="max-w-3xl mx-auto my-8 p-6 bg-white shadow-lg rounded-xl">
      <motion.h2 
        className="text-2xl font-bold mb-4 text-center text-[#4891AA]"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Elevator Pitch: TOPPICS
      </motion.h2>
      
      <motion.div
        className="space-y-4 text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <p className="font-medium text-lg">
          TOPPICS es la primera plataforma de concursos fotográficos geolocalizados que conecta a aficionados y profesionales de la fotografía con organizadores de eventos y marcas.
        </p>
        
        <p>
          Nuestra plataforma permite a los usuarios participar en concursos fotográficos basados en ubicaciones específicas, garantizando la autenticidad de las capturas mediante geolocalización. Los organizadores pueden crear concursos personalizados para promover destinos turísticos, eventos o negocios locales.
        </p>
        
        <p>
          A diferencia de otras plataformas de fotografía, TOPPICS implementa un sistema de votación por comparación respaldado por IA que elimina la subjetividad y garantiza que las mejores fotografías ganen. Esta transparencia aumenta la participación y la confianza de los usuarios.
        </p>
        
        <p>
          Nuestro modelo de negocio se basa en suscripciones para organizadores y colaboraciones con marcas, permitiendo a turoperadores, ayuntamientos, hoteles y comercios locales promocionar sus servicios mientras generan contenido visual auténtico y atractivo.
        </p>
        
        <p>
          Con TOPPICS, democratizamos la fotografía, estimulamos el turismo local y conectamos comunidades a través del poder de las imágenes geolocalizadas.
        </p>
      </motion.div>
      
      <motion.div 
        className="mt-6 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <p className="font-bold italic text-[#4891AA]">
          "Captura, comparte y gana en los lugares más impresionantes del mundo con TOPPICS."
        </p>
      </motion.div>
    </div>
  );
};

export default ElevatorPitch;
