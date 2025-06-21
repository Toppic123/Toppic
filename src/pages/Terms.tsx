
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import ProhibitedConduct from "@/components/ProhibitedConduct";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle, Users, Camera, Shield } from "lucide-react";

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
        title: "6. Consentimiento de Personas Fotografiadas y Derechos de Imagen",
        content: "El participante es completamente responsable de obtener todos los consentimientos necesarios:",
        list: [
          "Para fotografías que incluyan personas identificables, el participante debe obtener consentimiento explícito de cada persona antes de subir la imagen.",
          "Para menores de edad, se requiere consentimiento de padres o tutores legales.",
          "El participante debe poder demostrar que posee estos consentimientos si se le solicita.",
          "TOPPICS no se hace responsable por el uso de imágenes sin el consentimiento adecuado.",
          "El incumplimiento de estas obligaciones puede resultar en descalificación y responsabilidad legal del participante."
        ]
      },
      {
        title: "7. Tipos de Uso de Fotografías y Consentimiento Requerido",
        content: "Distinguimos entre diferentes tipos de uso, todos los cuales requieren consentimiento de las personas fotografiadas:",
        list: [
          "**Promoción de marca:** Uso en redes sociales oficiales, sitio web corporativo, material institucional y presentaciones de la empresa organizadora.",
          "**Publicidad comercial:** Uso en campañas publicitarias pagadas, material promocional masivo, vallas publicitarias, anuncios en medios de comunicación y cualquier uso con fines lucrativos directos.",
          "**Ambos usos requieren consentimiento explícito** de las personas identificables en las fotografías, aunque el nivel de exposición y alcance difiere.",
          "Los participantes pueden optar por autorizar solo promoción de marca o ambos tipos de uso durante el proceso de consentimiento.",
          "El organizador debe respetar las limitaciones de uso especificadas por cada participante."
        ]
      },
      {
        title: "8. Propiedad de Fotos y Derechos Comerciales",
        content: "Al participar en concursos en TOPPICS:",
        list: [
          "Entiendes que las fotos ganadoras pueden convertirse en propiedad del organizador del concurso si así se especifica en las reglas del concurso.",
          "Consientes que tus fotografías ganadoras sean utilizadas según el tipo de consentimiento otorgado (promoción de marca y/o uso comercial).",
          "Confirmas que has obtenido los permisos apropiados de cualquier persona identificable que aparezca en tus fotos.",
          "Consientes aparecer en fotografías que pueden ser utilizadas según los términos especificados si eres visible en fotos ganadoras.",
          "Reconoces que los organizadores del concurso pueden optar por no reclamar la propiedad de las fotos y, en esos casos, conservas todos los derechos sobre tus imágenes."
        ]
      },
      {
        title: "9. Sistema de Votación y Selección",
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
        title: "10. Almacenamiento y Calidad de Imagen",
        content: "Para garantizar la mejor experiencia posible en la plataforma:",
        list: [
          "Las fotografías subidas se comprimen para optimizar el rendimiento de la aplicación durante la visualización y votación.",
          "Sin embargo, almacenamos la versión original de alta calidad para preservar todos los detalles de la imagen.",
          "Al final del concurso, solo se mantienen en alta calidad las fotografías ganadoras que se entregarán al organizador.",
          "Las demás fotografías se mantienen en su versión comprimida para visualización en la plataforma."
        ]
      },
      {
        title: "11. Requisitos de las Fotografías y Consentimientos",
        content: "Respecto a las fotografías subidas a la plataforma:",
        list: [
          "Las fotografías pueden ser tomadas con teléfonos móviles o cámaras.",
          "Los organizadores del concurso especificarán en sus reglas el tipo de fotografía que están buscando.",
          "Los organizadores también indicarán en sus reglas si se permiten fotografías editadas y en qué medida.",
          "No se aceptan imágenes generadas por IA.",
          "Las fotografías deben ser tomadas por el usuario que las sube.",
          "El usuario reconoce ser el propietario de los derechos de las imágenes subidas a la plataforma.",
          "**Obligatorio:** Completar los formularios de consentimiento apropiados antes de participar, especialmente para fotografías con personas identificables."
        ]
      },
      {
        title: "12. Cumplimiento del GDPR y Protección de Datos",
        content: "TOPPICS cumple con el Reglamento General de Protección de Datos (GDPR):",
        list: [
          "Todos los datos personales se procesan con base legal adecuada (consentimiento, interés legítimo, etc.).",
          "Los usuarios tienen derecho al acceso, rectificación, cancelación y oposición de sus datos.",
          "Los datos se conservan solo durante el tiempo necesario para cumplir con los fines especificados.",
          "Implementamos medidas técnicas y organizativas apropiadas para proteger los datos personales.",
          "Los usuarios pueden retirar su consentimiento en cualquier momento, aunque esto puede afectar su capacidad de participar en concursos.",
          "Para ejercer sus derechos GDPR, contacte: privacy@toppics.com"
        ]
      },
      {
        title: "13. Organizadores y Colaboradores",
        content: "Para los organizadores de concursos:",
        list: [
          "Los organizadores pueden elegir si permiten colaboradores en su concurso.",
          "Los colaboradores son empresas que pueden hacer publicidad en la aplicación a cambio de proporcionar recompensas para los participantes.",
          "La publicidad del organizador principal siempre será más destacada que la de los colaboradores.",
          "Los términos específicos de colaboración serán acordados entre el organizador y los colaboradores.",
          "Los organizadores deben respetar los tipos de consentimiento otorgados por cada participante."
        ]
      },
      {
        title: "14. Responsabilidades del Participante",
        content: "Cada participante es responsable de:",
        list: [
          "Obtener todos los consentimientos necesarios antes de subir fotografías.",
          "Guardar evidencia de los consentimientos obtenidos durante al menos 3 años.",
          "Proporcionar dicha evidencia si es requerida por TOPPICS o el organizador.",
          "Cumplir con todas las leyes aplicables de protección de datos y derechos de imagen.",
          "Notificar inmediatamente si una persona fotografiada retira su consentimiento."
        ]
      },
      {
        title: "15. Limitación de Responsabilidad",
        content: "TOPPICS no será responsable de daños indirectos, incidentales, especiales, consecuentes o punitivos, incluida la pérdida de beneficios, derivados del uso de nuestros servicios. Sin embargo, esto no limita nuestra responsabilidad por violaciones graves del GDPR o derechos fundamentales."
      },
      {
        title: "16. Ley Aplicable",
        content: "Estos términos se regirán e interpretarán de acuerdo con las leyes del país de operación de TOPPICS, sin tener en cuenta sus principios de conflicto de leyes. Para asuntos relacionados con el GDPR, se aplicará la legislación europea."
      },
      {
        title: "17. Contacto",
        content: "Si tienes preguntas sobre estos Términos y Condiciones o necesitas ejercer tus derechos GDPR, contáctanos en:",
        list: [
          "Términos generales: terminos@toppics.com",
          "Protección de datos: privacy@toppics.com",
          "Consentimientos y derechos de imagen: consent@toppics.com"
        ]
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
        
        {/* Alertas importantes sobre consentimientos */}
        <div className="mb-8 space-y-4">
          <Alert className="border-orange-200 bg-orange-50">
            <Users className="h-4 w-4" />
            <AlertTitle>Importante: Consentimiento de Personas Fotografiadas</AlertTitle>
            <AlertDescription>
              <strong>Todos los usos requieren consentimiento:</strong> Tanto la promoción de marca como la publicidad comercial 
              requieren consentimiento explícito de las personas identificables en las fotografías. 
              La diferencia está en el alcance y tipo de exposición.
            </AlertDescription>
          </Alert>

          <Alert className="border-blue-200 bg-blue-50">
            <Camera className="h-4 w-4" />
            <AlertTitle>Formularios de Consentimiento Obligatorios</AlertTitle>
            <AlertDescription>
              Antes de participar en cualquier concurso, debe completar los formularios de consentimiento apropiados, 
              especialmente para fotografías que incluyan personas identificables.
            </AlertDescription>
          </Alert>

          <Alert className="border-green-200 bg-green-50">
            <Shield className="h-4 w-4" />
            <AlertTitle>Cumplimiento GDPR</AlertTitle>
            <AlertDescription>
              Esta plataforma cumple con el GDPR. Usted tiene derechos sobre sus datos personales 
              y puede ejercerlos contactando privacy@toppics.com
            </AlertDescription>
          </Alert>
        </div>
        
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
