
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const Terms = () => {
  const [language, setLanguage] = useState<"en">("en");

  useEffect(() => {
    // Detect language based on browser's locale
    const userLanguage = navigator.language || navigator.languages[0];
    const isSpanish = /^es\b/.test(userLanguage) || 
                     ["ES", "MX", "AR", "CO", "PE", "CL", "EC", "GT", "CU", 
                      "BO", "DO", "HN", "PY", "SV", "NI", "CR", "PA", "UY", "VE"].includes(
                        userLanguage.split("-")[1]?.toUpperCase() || ""
                      );
    
    // Always default to English as per the user's instruction
    setLanguage("en");
  }, []);

  // Localized content
  const content = {
    es: {
      title: "Términos y Condiciones",
      lastUpdated: "Última actualización",
      sections: [
        {
          title: "1. Aceptación de Términos",
          content: "Al acceder o utilizar Snap Contest, aceptas cumplir con estos Términos y Condiciones y todas las leyes y regulaciones aplicables. Si no estás de acuerdo con alguno de estos términos, no debes utilizar nuestros servicios."
        },
        {
          title: "2. Cambios en los Términos",
          content: "Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios entrarán en vigor inmediatamente después de su publicación. Es tu responsabilidad revisar periódicamente estos términos."
        },
        {
          title: "3. Uso del Servicio",
          content: "Snap Contest proporciona una plataforma para participar en concursos fotográficos. Al utilizar nuestros servicios, aceptas:",
          list: [
            "No utilizar el servicio para fines ilegales o no autorizados",
            "No infringir los derechos de propiedad intelectual",
            "No subir contenido ofensivo, difamatorio o inapropiado",
            "No intentar acceder a áreas restringidas del servicio"
          ]
        },
        {
          title: "4. Cuentas de Usuario",
          content: "Al crear una cuenta en Snap Contest, eres responsable de:",
          list: [
            "Mantener la confidencialidad de tu contraseña",
            "Restringir el acceso a tu cuenta",
            "Todas las actividades que ocurran bajo tu cuenta",
            "Notificarnos inmediatamente sobre cualquier uso no autorizado"
          ]
        },
        {
          title: "5. Derechos de Propiedad Intelectual",
          content: "Al subir fotografías a Snap Contest, mantienes tus derechos de autor, pero nos otorgas una licencia para mostrar, promocionar y utilizar tu contenido en relación con los servicios de la plataforma. Además, otorgas a los organizadores del concurso los derechos especificados en las bases de cada concurso."
        },
        {
          title: "6. Sistema de Votación y Selección",
          content: "El sistema de votación y selección de Snap Contest funciona de la siguiente manera:",
          list: [
            "Inicialmente, nuestra inteligencia artificial realiza un primer filtrado de las fotografías según criterios de calidad técnica y estética.",
            "Este filtrado garantiza que los participantes solo vean un máximo de 100 fotografías de la más alta calidad para su votación.",
            "Los participantes votan por las fotografías que consideren mejores, determinando así los ganadores del concurso.",
            "El número de fotografías ganadoras dependerá del tipo de evento y la suscripción del organizador.",
            "Las fotografías ganadoras pasarán a ser propiedad del organizador según los términos especificados en cada concurso."
          ]
        },
        {
          title: "7. Almacenamiento y Calidad de Imágenes",
          content: "Para garantizar la mejor experiencia posible en la plataforma:",
          list: [
            "Las fotografías subidas se comprimen para optimizar el rendimiento de la aplicación durante la visualización y votación.",
            "Sin embargo, almacenamos la versión original en alta calidad para preservar todos los detalles de la imagen.",
            "Al finalizar el concurso, solo se conservan en alta calidad las fotografías ganadoras que serán entregadas al organizador.",
            "Las demás fotografías se mantienen en su versión comprimida para visualización en la plataforma."
          ]
        },
        {
          title: "8. Limitación de Responsabilidad",
          content: "Snap Contest no será responsable por daños indirectos, incidentales, especiales, consecuentes o punitivos, incluyendo pérdida de ganancias, que surjan del uso de nuestros servicios."
        },
        {
          title: "9. Ley Aplicable",
          content: "Estos términos se regirán e interpretarán de acuerdo con las leyes del país de operación de Snap Contest, sin tener en cuenta sus principios de conflicto de leyes."
        },
        {
          title: "10. Contacto",
          content: "Si tienes preguntas sobre estos Términos y Condiciones, contáctanos en: terms@snapcontest.com"
        }
      ]
    },
    en: {
      title: "Terms and Conditions",
      lastUpdated: "Last updated",
      sections: [
        {
          title: "1. Acceptance of Terms",
          content: "By accessing or using Snap Contest, you agree to comply with these Terms and Conditions and all applicable laws and regulations. If you do not agree with any of these terms, you should not use our services."
        },
        {
          title: "2. Changes to Terms",
          content: "We reserve the right to modify these terms at any time. Changes will take effect immediately after posting. It is your responsibility to periodically review these terms."
        },
        {
          title: "3. Use of Service",
          content: "Snap Contest provides a platform to participate in photo contests. By using our services, you agree to:",
          list: [
            "Not use the service for illegal or unauthorized purposes",
            "Not infringe intellectual property rights",
            "Not upload offensive, defamatory, or inappropriate content",
            "Not attempt to access restricted areas of the service"
          ]
        },
        {
          title: "4. User Accounts",
          content: "When creating an account on Snap Contest, you are responsible for:",
          list: [
            "Maintaining the confidentiality of your password",
            "Restricting access to your account",
            "All activities that occur under your account",
            "Notifying us immediately of any unauthorized use"
          ]
        },
        {
          title: "5. Intellectual Property Rights",
          content: "When uploading photographs to Snap Contest, you retain your copyright, but you grant us a license to display, promote, and use your content in connection with the platform's services. Additionally, you grant the contest organizers the rights specified in the rules of each contest."
        },
        {
          title: "6. Voting and Selection System",
          content: "The Snap Contest voting and selection system works as follows:",
          list: [
            "Initially, our artificial intelligence performs a first filtering of photographs based on technical and aesthetic quality criteria.",
            "This filtering ensures that participants only see a maximum of 100 highest-quality photographs for voting.",
            "Participants vote for the photographs they consider best, thus determining the winners of the contest.",
            "The number of winning photographs will depend on the type of event and the organizer's subscription.",
            "The winning photographs will become the property of the organizer according to the terms specified in each contest."
          ]
        },
        {
          title: "7. Image Storage and Quality",
          content: "To ensure the best possible experience on the platform:",
          list: [
            "Uploaded photographs are compressed to optimize application performance during viewing and voting.",
            "However, we store the original high-quality version to preserve all image details.",
            "At the end of the contest, only the winning photographs that will be delivered to the organizer are kept in high quality.",
            "The other photographs are maintained in their compressed version for platform visualization."
          ]
        },
        {
          title: "8. Limitation of Liability",
          content: "Snap Contest will not be liable for indirect, incidental, special, consequential, or punitive damages, including loss of profits, arising from the use of our services."
        },
        {
          title: "9. Governing Law",
          content: "These terms will be governed and interpreted in accordance with the laws of Snap Contest's country of operation, without regard to its conflict of law principles."
        },
        {
          title: "10. Contact",
          content: "If you have questions about these Terms and Conditions, contact us at: terms@snapcontest.com"
        }
      ]
    }
  };

  const t = content[language];

  return (
    <div className="pt-24 pb-16">
      <div className="container max-w-4xl mx-auto px-4">
        <motion.h1 
          className="text-3xl md:text-4xl font-bold mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {t.title}
        </motion.h1>
        
        <div className="prose prose-sm sm:prose lg:prose-lg mx-auto">
          <p>{t.lastUpdated}: {new Date().toLocaleDateString()}</p>
          
          {t.sections.map((section, index) => (
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
      </div>
    </div>
  );
};

export default Terms;
