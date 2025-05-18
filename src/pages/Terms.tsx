
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import ProhibitedConduct from "@/components/ProhibitedConduct";

const Terms = () => {
  const [language, setLanguage] = useState<"es">("es");

  // Content in Spanish as requested
  const content = {
    title: "Términos y Condiciones",
    lastUpdated: "Última actualización",
    sections: [
      {
        title: "1. Aceptación de Términos",
        content: "Al acceder o utilizar TOPPICS, aceptas cumplir con estos Términos y Condiciones y todas las leyes y regulaciones aplicables. Si no estás de acuerdo con alguno de estos términos, no deberías usar nuestros servicios."
      },
      {
        title: "2. Cambios en los Términos",
        content: "Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios entrarán en vigor inmediatamente después de su publicación. Es tu responsabilidad revisar periódicamente estos términos."
      },
      {
        title: "3. Uso del Servicio",
        content: "TOPPICS proporciona una plataforma para participar en concursos de fotografía. Al utilizar nuestros servicios, aceptas:",
        list: [
          "No utilizar el servicio para propósitos ilegales o no autorizados",
          "No infringir derechos de propiedad intelectual",
          "No subir contenido ofensivo, difamatorio o inapropiado",
          "No intentar acceder a áreas restringidas del servicio",
          "No subir imágenes generadas por IA",
          "Solo subir imágenes que hayas tomado tú mismo y de las que poseas los derechos"
        ]
      },
      {
        title: "4. Cuentas de Usuario",
        content: "Al crear una cuenta en TOPPICS, eres responsable de:",
        list: [
          "Mantener la confidencialidad de tu contraseña",
          "Restringir el acceso a tu cuenta",
          "Todas las actividades que ocurran en tu cuenta",
          "Notificarnos inmediatamente de cualquier uso no autorizado"
        ]
      },
      {
        title: "5. Derechos de Propiedad Intelectual",
        content: "Al subir fotografías a TOPPICS, conservas tus derechos de autor, pero nos otorgas una licencia para mostrar, promocionar y utilizar tu contenido en conexión con los servicios de la plataforma. Además, otorgas a los organizadores del concurso los derechos especificados en las reglas de cada concurso."
      },
      {
        title: "6. Propiedad de Fotos y Derechos Comerciales",
        content: "Al participar en concursos en TOPPICS:",
        list: [
          "Entiendes que las fotos ganadoras pueden convertirse en propiedad del organizador del concurso si así se especifica en las reglas del concurso.",
          "Consientes que tus fotografías ganadoras sean utilizadas con fines comerciales por el organizador del concurso si así se especifica en las reglas del concurso.",
          "Confirmas que has obtenido los permisos apropiados de cualquier persona identificable que aparezca en tus fotos.",
          "Consientes aparecer en fotografías que pueden ser utilizadas con fines comerciales si eres visible en fotos ganadoras.",
          "Reconoces que los organizadores del concurso pueden optar por no reclamar la propiedad de las fotos y, en esos casos, conservas todos los derechos sobre tus imágenes."
        ]
      },
      {
        title: "7. Sistema de Votación y Selección",
        content: "El sistema de votación y selección de TOPPICS funciona de la siguiente manera:",
        list: [
          "Inicialmente, nuestra inteligencia artificial realiza un primer filtrado de fotografías basado en criterios técnicos y estéticos de calidad.",
          "Este filtrado asegura que los participantes solo vean un máximo de 50 fotografías de máxima calidad para votar.",
          "Los administradores del concurso tienen acceso a todas las fotos, incluidas las filtradas por IA, para garantizar que ninguna foto fuera eliminada incorrectamente.",
          "Los participantes votan por las fotografías que consideran mejores, determinando así los ganadores del concurso.",
          "El número de fotografías ganadoras dependerá del tipo de evento y la suscripción del organizador.",
          "Las fotografías ganadoras pasarán a ser propiedad del organizador según los términos especificados en cada concurso.",
          "Los ganadores recibirán una notificación en la aplicación y un correo electrónico con un código QR que contiene su recompensa."
        ]
      },
      {
        title: "8. Almacenamiento y Calidad de Imagen",
        content: "Para garantizar la mejor experiencia posible en la plataforma:",
        list: [
          "Las fotografías subidas se comprimen para optimizar el rendimiento de la aplicación durante la visualización y votación.",
          "Sin embargo, almacenamos la versión original de alta calidad para preservar todos los detalles de la imagen.",
          "Al final del concurso, solo se mantienen en alta calidad las fotografías ganadoras que se entregarán al organizador.",
          "Las demás fotografías se mantienen en su versión comprimida para visualización en la plataforma."
        ]
      },
      {
        title: "9. Requisitos de las Fotografías",
        content: "Respecto a las fotografías subidas a la plataforma:",
        list: [
          "Las fotografías pueden ser tomadas con teléfonos móviles o cámaras.",
          "Los organizadores del concurso especificarán en sus reglas el tipo de fotografía que están buscando.",
          "Los organizadores también indicarán en sus reglas si se permiten fotografías editadas y en qué medida.",
          "No se aceptan imágenes generadas por IA.",
          "Las fotografías deben ser tomadas por el usuario que las sube.",
          "El usuario reconoce ser el propietario de los derechos de las imágenes subidas a la plataforma."
        ]
      },
      {
        title: "10. Organizadores y Colaboradores",
        content: "Para los organizadores de concursos:",
        list: [
          "Los organizadores pueden elegir si permiten colaboradores en su concurso.",
          "Los colaboradores son empresas que pueden hacer publicidad en la aplicación a cambio de proporcionar recompensas para los participantes.",
          "La publicidad del organizador principal siempre será más destacada que la de los colaboradores.",
          "Los términos específicos de colaboración serán acordados entre el organizador y los colaboradores."
        ]
      },
      {
        title: "11. Limitación de Responsabilidad",
        content: "TOPPICS no será responsable de daños indirectos, incidentales, especiales, consecuentes o punitivos, incluida la pérdida de beneficios, derivados del uso de nuestros servicios."
      },
      {
        title: "12. Ley Aplicable",
        content: "Estos términos se regirán e interpretarán de acuerdo con las leyes del país de operación de TOPPICS, sin tener en cuenta sus principios de conflicto de leyes."
      },
      {
        title: "13. Contacto",
        content: "Si tienes preguntas sobre estos Términos y Condiciones, contáctanos en: terminos@toppics.com"
      }
    ]
  };

  return (
    <div className="pt-24 pb-16">
      <div className="container max-w-4xl mx-auto px-4">
        <motion.h1 
          className="text-3xl md:text-4xl font-bold mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {content.title}
        </motion.h1>
        
        <div className="prose prose-sm sm:prose lg:prose-lg mx-auto mb-12">
          <p>{content.lastUpdated}: {new Date().toLocaleDateString()}</p>
          
          {content.sections.map((section, index) => (
            <div key={index}>
              <h2>{section.title}</h2>
              <p>
                {section.content}
              </p>
              {section.list && (
                <ul>
                  {section.list.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
        
        <ProhibitedConduct />
      </div>
    </div>
  );
};

export default Terms;
