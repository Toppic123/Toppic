
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
        content: "Al acceder o utilizar TOPPIC, aceptas cumplir con estos Términos y Condiciones y todas las leyes y regulaciones aplicables. Si no estás de acuerdo con alguno de estos términos, no deberías usar nuestros servicios."
      },
      {
        title: "2. Cambios en los Términos",
        content: "Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios entrarán en vigor inmediatamente después de su publicación. Es tu responsabilidad revisar periódicamente estos términos."
      },
      {
        title: "3. Uso del Servicio",
        content: "TOPPIC proporciona una plataforma para participar en concursos de fotografía. Al utilizar nuestros servicios, aceptas:",
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
        content: "Al crear una cuenta en TOPPIC, eres responsable de:",
        list: [
          "Mantener la confidencialidad de tu contraseña",
          "Restringir el acceso a tu cuenta",
          "Todas las actividades que ocurran en tu cuenta",
          "Notificarnos inmediatamente de cualquier uso no autorizado"
        ]
      },
      {
        title: "5. Derechos de Propiedad Intelectual",
        content: "Al subir fotografías a TOPPIC, conservas tus derechos de autor, pero nos otorgas una licencia para mostrar, promocionar y utilizar tu contenido en conexión con los servicios de la plataforma. Además, otorgas a los organizadores del concurso los derechos especificados en las reglas de cada concurso."
      },
      {
        title: "6. Consentimiento de Personas Fotografiadas y Derechos de Imagen",
        content: "El participante es completamente responsable de obtener todos los consentimientos necesarios:",
        list: [
          "Para fotografías que incluyan personas identificables, el participante debe obtener consentimiento explícito de cada persona antes de subir la imagen.",
          "Para menores de edad, se requiere consentimiento de padres o tutores legales.",
          "El participante debe poder demostrar que posee estos consentimientos si se le solicita.",
          "TOPPIC no se hace responsable por el uso de imágenes sin el consentimiento adecuado.",
          "El incumplimiento de estas obligaciones puede resultar en descalificación y responsabilidad legal del participante."
        ]
      },
      {
        title: "7. Tipos de Uso de Fotografías y Derechos de Imagen",
        content: "Distinguimos entre diferentes tipos de uso según los derechos de imagen aplicables:",
        list: [
          "**Uso editorial:** Las fotografías ganadoras pueden ser utilizadas para fines informativos, educativos o periodísticos sin necesidad de consentimiento adicional de las personas retratadas, siempre que no dañe su imagen o reputación.",
          "**Uso comercial:** Para cualquier uso con fines lucrativos directos (publicidad, promoción de productos/servicios), se requiere consentimiento explícito por escrito de todas las personas identificables en la fotografía.",
          "**Recomendación:** Se prefieren fotografías temáticas sin personas identificables para uso comercial (paisajes, objetos, arquitectura, etc.) para evitar complicaciones legales.",
          "Los organizadores especificarán en cada concurso si las fotografías ganadoras serán utilizadas únicamente para uso editorial o también comercial.",
          "Los participantes aceptan estos términos de uso al participar en cada concurso específico."
        ]
      },
      {
        title: "8. Propiedad de Fotos y Derechos de Uso",
        content: "Al participar en concursos en TOPPIC:",
        list: [
          "Entiendes que las fotos ganadoras pueden convertirse en propiedad del organizador del concurso si así se especifica en las reglas del concurso.",
          "Las fotografías ganadoras que pasen a ser propiedad de los organizadores podrán usarse para uso editorial sin restricciones adicionales.",
          "Para uso comercial, solo se utilizarán fotografías en las que no aparezcan personas reconocibles, o aquellas para las que se haya obtenido consentimiento explícito por escrito.",
          "**Consientes aparecer en fotografías que pueden ser utilizadas según los términos especificados si eres visible en fotos ganadoras.**",
          "Reconoces que los organizadores del concurso pueden optar por no reclamar la propiedad de las fotos y, en esos casos, conservas todos los derechos sobre tus imágenes."
        ]
      },
      {
        title: "9. Sistema de Votación y Selección",
        content: "El sistema de votación y selección de TOPPIC funciona de la siguiente manera:",
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
        content: "TOPPIC cumple con el Reglamento General de Protección de Datos (GDPR):",
        list: [
          "Todos los datos personales se procesan con base legal adecuada (consentimiento, interés legítimo, etc.).",
          "Los usuarios tienen derecho al acceso, rectificación, cancelación y oposición de sus datos.",
          "Los datos se conservan solo durante el tiempo necesario para cumplir con los fines especificados.",
          "Implementamos medidas técnicas y organizativas apropiadas para proteger los datos personales.",
          "Los usuarios pueden retirar su consentimiento en cualquier momento, aunque esto puede afectar su capacidad de participar en concursos.",
          "Para ejercer sus derechos GDPR, contacte: privacy@toppic.com"
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
          "Proporcionar dicha evidencia si es requerida por TOPPIC o el organizador.",
          "Cumplir con todas las leyes aplicables de protección de datos y derechos de imagen.",
          "Notificar inmediatamente si una persona fotografiada retira su consentimiento."
        ]
      },
      {
        title: "15. Limitación de Responsabilidad",
        content: "TOPPIC no será responsable de daños indirectos, incidentales, especiales, consecuentes o punitivos, incluida la pérdida de beneficios, derivados del uso de nuestros servicios. Sin embargo, esto no limita nuestra responsabilidad por violaciones graves del GDPR o derechos fundamentales."
      },
      {
        title: "16. Ley Aplicable",
        content: "Estos términos se regirán e interpretarán de acuerdo con las leyes del país de operación de TOPPIC, sin tener en cuenta sus principios de conflicto de leyes. Para asuntos relacionados con el GDPR, se aplicará la legislación europea."
      },
      {
        title: "17. Sistema de Puntos Premium",
        content: "TOPPIC ofrece un sistema de puntos premium para acceder a concursos exclusivos:",
        list: [
          "**Compra de puntos:** Los puntos se pueden comprar mediante tarjeta de crédito a través de Stripe (1€ = 10 puntos).",
          "**Uso de puntos:** Los puntos se utilizan para participar en concursos premium con menos competencia y premios más altos.",
          "**No reembolso:** Los puntos comprados no son reembolsables, excepto en casos específicos de error técnico.",
          "**Validez:** Los puntos no tienen fecha de caducidad una vez adquiridos.",
          "**Transparencia:** Todas las transacciones de puntos quedan registradas en tu historial de cuenta."
        ]
      },
      {
        title: "18. Sistema de Ganancias y Retiros",
        content: "Para participantes que ganen premios en efectivo:",
        list: [
          "**Ganancias:** Los premios en efectivo se acreditan en tu monedero virtual dentro de la plataforma.",
          "**Retiros:** Puedes solicitar retiros de tus ganancias con un mínimo de €20.",
          "**Procesamiento:** Los retiros se procesan en 5-10 días hábiles mediante transferencia bancaria.",
          "**Verificación:** Podemos requerir verificación de identidad para retiros superiores a €100.",
          "**Comisiones:** TOPPIC no cobra comisiones por retiros, pero tu banco puede aplicar tarifas de transferencia.",
          "**Limitaciones:** Los retiros están sujetos a verificación de cumplimiento de términos y condiciones."
        ]
      },
      {
        title: "19. Política de Pagos y Facturación",
        content: "Respecto a los pagos y facturación en la plataforma:",
        list: [
          "**Procesamiento seguro:** Todos los pagos se procesan a través de Stripe con encriptación de nivel bancario.",
          "**Facturación:** Se emiten facturas automáticamente para todas las compras de puntos.",
          "**Impuestos:** Los precios incluyen todos los impuestos aplicables según tu ubicación.",
          "**Disputa de pagos:** Para disputas de pagos, contacta primero nuestro soporte. Disputas bancarias pueden resultar en suspensión de cuenta.",
          "**Política de reembolso:** Los reembolsos solo se procesan en casos de error técnico comprobado.",
          "**Historial:** Puedes acceder a tu historial completo de pagos y facturas desde tu perfil."
        ]
      },
      {
        title: "20. Contacto",
        content: "Si tienes preguntas sobre estos Términos y Condiciones o necesitas ejercer tus derechos GDPR, contáctanos en:",
        list: [
          "Términos generales: terminos@toppic.com",
          "Protección de datos: privacy@toppic.com",
          "Consentimientos y derechos de imagen: consent@toppic.com",
          "Pagos y facturación: pagos@toppic.com",
          "Soporte técnico: soporte@toppic.com"
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
              <strong>Uso editorial vs comercial:</strong> El uso editorial no requiere consentimiento adicional en lugares públicos. 
              El uso comercial requiere consentimiento explícito por escrito de personas identificables. 
              Se recomiendan fotografías temáticas sin personas para uso comercial.
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
              y puede ejercerlos contactando privacy@toppic.com
            </AlertDescription>
          </Alert>
        </div>
        
        <div className="prose prose-sm sm:prose lg:prose-lg mx-auto mb-12">
          <p>{content.lastUpdated}: {new Date().toLocaleDateString()}</p>
          
          {content.sections.map((section, index) => (
            <div key={index}>
              <h2 className="font-bold">{section.title}</h2>
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
