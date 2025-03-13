
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const Privacy = () => {
  const [language, setLanguage] = useState<"es" | "en">("es");

  useEffect(() => {
    // Detectar el idioma basado en la localización del navegador
    const userLanguage = navigator.language || navigator.languages[0];
    const isSpanish = /^es\b/.test(userLanguage) || 
                     ["ES", "MX", "AR", "CO", "PE", "CL", "EC", "GT", "CU", 
                      "BO", "DO", "HN", "PY", "SV", "NI", "CR", "PA", "UY", "VE"].includes(
                        userLanguage.split("-")[1]?.toUpperCase() || ""
                      );
    
    setLanguage(isSpanish ? "es" : "en");
  }, []);

  // Contenido localizado
  const content = {
    es: {
      title: "Política de Privacidad",
      lastUpdated: "Última actualización",
      sections: [
        {
          title: "1. Información que Recopilamos",
          content: "En Snap Contest, nos tomamos muy en serio tu privacidad. Recopilamos información personal cuando te registras en nuestra plataforma, participas en concursos fotográficos o interactúas con nuestros servicios. Esta información puede incluir:",
          list: [
            "Nombre y datos de contacto",
            "Información de perfil y fotografías",
            "Datos de geolocalización al subir fotos",
            "Información de uso y analítica"
          ]
        },
        {
          title: "2. Cómo Utilizamos Tu Información",
          content: "Utilizamos la información recopilada para:",
          list: [
            "Proporcionar, mantener y mejorar nuestros servicios",
            "Procesar tus participaciones en concursos fotográficos",
            "Contactarte sobre actualizaciones, novedades o promociones",
            "Prevenir actividades fraudulentas o ilegales"
          ]
        },
        {
          title: "3. Compartiendo Tu Información",
          content: "No vendemos tu información personal a terceros. Podemos compartir información con:",
          list: [
            "Organizadores de concursos en los que participas",
            "Proveedores de servicios que nos ayudan a operar la plataforma",
            "Autoridades cuando la ley lo requiera"
          ]
        },
        {
          title: "4. Tus Derechos",
          content: "Dependiendo de tu ubicación, puedes tener ciertos derechos con respecto a tus datos personales, como:",
          list: [
            "Acceder y obtener una copia de tus datos",
            "Rectificar datos inexactos",
            "Solicitar la eliminación de tus datos",
            "Oponerte al procesamiento de tus datos",
            "Retirar tu consentimiento en cualquier momento"
          ]
        },
        {
          title: "5. Seguridad",
          content: "Implementamos medidas de seguridad razonables para proteger tus datos personales contra pérdida, acceso no autorizado, divulgación, alteración o destrucción."
        },
        {
          title: "6. Cambios a Esta Política",
          content: "Podemos actualizar esta política de privacidad ocasionalmente para reflejar cambios en nuestras prácticas o por otros motivos operativos, legales o regulatorios. Te notificaremos sobre cualquier cambio material."
        },
        {
          title: "7. Contáctanos",
          content: "Si tienes preguntas sobre esta política de privacidad o nuestras prácticas de datos, contáctanos en: privacy@snapcontest.com"
        }
      ]
    },
    en: {
      title: "Privacy Policy",
      lastUpdated: "Last updated",
      sections: [
        {
          title: "1. Information We Collect",
          content: "At Snap Contest, we take your privacy very seriously. We collect personal information when you register on our platform, participate in photo contests, or interact with our services. This information may include:",
          list: [
            "Name and contact information",
            "Profile information and photos",
            "Geolocation data when uploading photos",
            "Usage and analytics information"
          ]
        },
        {
          title: "2. How We Use Your Information",
          content: "We use the collected information to:",
          list: [
            "Provide, maintain, and improve our services",
            "Process your participation in photo contests",
            "Contact you about updates, news, or promotions",
            "Prevent fraudulent or illegal activities"
          ]
        },
        {
          title: "3. Sharing Your Information",
          content: "We do not sell your personal information to third parties. We may share information with:",
          list: [
            "Organizers of contests you participate in",
            "Service providers who help us operate the platform",
            "Authorities when required by law"
          ]
        },
        {
          title: "4. Your Rights",
          content: "Depending on your location, you may have certain rights regarding your personal data, such as:",
          list: [
            "Access and obtain a copy of your data",
            "Rectify inaccurate data",
            "Request deletion of your data",
            "Object to the processing of your data",
            "Withdraw your consent at any time"
          ]
        },
        {
          title: "5. Security",
          content: "We implement reasonable security measures to protect your personal data against loss, unauthorized access, disclosure, alteration, or destruction."
        },
        {
          title: "6. Changes to This Policy",
          content: "We may update this privacy policy occasionally to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes."
        },
        {
          title: "7. Contact Us",
          content: "If you have questions about this privacy policy or our data practices, contact us at: privacy@snapcontest.com"
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

export default Privacy;
