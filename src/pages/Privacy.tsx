
import { motion } from "framer-motion";

const Privacy = () => {
  return (
    <div className="pt-24 pb-16">
      <div className="container max-w-4xl mx-auto px-4">
        <motion.h1 
          className="text-3xl md:text-4xl font-bold mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Política de Privacidad
        </motion.h1>
        
        <div className="prose prose-sm sm:prose lg:prose-lg mx-auto">
          <p>Última actualización: {new Date().toLocaleDateString()}</p>
          
          <h2>1. Información que Recopilamos</h2>
          <p>
            En Snap Contest, nos tomamos muy en serio tu privacidad. Recopilamos información personal cuando te registras en nuestra plataforma, participas en concursos fotográficos o interactúas con nuestros servicios. Esta información puede incluir:
          </p>
          <ul>
            <li>Nombre y datos de contacto</li>
            <li>Información de perfil y fotografías</li>
            <li>Datos de geolocalización al subir fotos</li>
            <li>Información de uso y analítica</li>
          </ul>
          
          <h2>2. Cómo Utilizamos Tu Información</h2>
          <p>
            Utilizamos la información recopilada para:
          </p>
          <ul>
            <li>Proporcionar, mantener y mejorar nuestros servicios</li>
            <li>Procesar tus participaciones en concursos fotográficos</li>
            <li>Contactarte sobre actualizaciones, novedades o promociones</li>
            <li>Prevenir actividades fraudulentas o ilegales</li>
          </ul>
          
          <h2>3. Compartiendo Tu Información</h2>
          <p>
            No vendemos tu información personal a terceros. Podemos compartir información con:
          </p>
          <ul>
            <li>Organizadores de concursos en los que participas</li>
            <li>Proveedores de servicios que nos ayudan a operar la plataforma</li>
            <li>Autoridades cuando la ley lo requiera</li>
          </ul>
          
          <h2>4. Tus Derechos</h2>
          <p>
            Dependiendo de tu ubicación, puedes tener ciertos derechos con respecto a tus datos personales, como:
          </p>
          <ul>
            <li>Acceder y obtener una copia de tus datos</li>
            <li>Rectificar datos inexactos</li>
            <li>Solicitar la eliminación de tus datos</li>
            <li>Oponerte al procesamiento de tus datos</li>
            <li>Retirar tu consentimiento en cualquier momento</li>
          </ul>
          
          <h2>5. Seguridad</h2>
          <p>
            Implementamos medidas de seguridad razonables para proteger tus datos personales contra pérdida, acceso no autorizado, divulgación, alteración o destrucción.
          </p>
          
          <h2>6. Cambios a Esta Política</h2>
          <p>
            Podemos actualizar esta política de privacidad ocasionalmente para reflejar cambios en nuestras prácticas o por otros motivos operativos, legales o regulatorios. Te notificaremos sobre cualquier cambio material.
          </p>
          
          <h2>7. Contáctanos</h2>
          <p>
            Si tienes preguntas sobre esta política de privacidad o nuestras prácticas de datos, contáctanos en: <a href="mailto:privacy@snapcontest.com">privacy@snapcontest.com</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
