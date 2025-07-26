
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const Privacy = () => {
  const [language, setLanguage] = useState<"es">("es");

  // Content in Spanish as requested
  const content = {
    title: "Política de Privacidad",
    lastUpdated: "Última actualización",
    introduction: "En TOPPIC, respetamos tu privacidad y estamos comprometidos a proteger tus datos personales. Esta Política de Privacidad te informará sobre cómo cuidamos tus datos personales cuando visitas nuestra web y te contará acerca de tus derechos de privacidad y cómo la ley te protege.",
    sections: [
      {
        title: "1. Qué Datos Recopilamos",
        content: "Podemos recopilar, utilizar, almacenar y transferir diferentes tipos de datos personales sobre ti que hemos agrupado de la siguiente manera:",
        list: [
          "Datos de Identidad incluyen nombre, apellido, nombre de usuario o identificador similar.",
          "Datos de Contacto incluyen dirección de correo electrónico y números de teléfono.",
          "Datos Técnicos incluyen dirección de protocolo de internet (IP), tus datos de inicio de sesión, tipo y versión del navegador, configuración de zona horaria y ubicación, tipos y versiones de complementos del navegador, sistema operativo y plataforma, y otras tecnologías en los dispositivos que utilizas para acceder a este sitio web.",
          "Datos de Perfil incluyen tu nombre de usuario y contraseña, tus intereses, preferencias, comentarios y respuestas a encuestas.",
          "Datos de Uso incluyen información sobre cómo utilizas nuestro sitio web, productos y servicios.",
          "Datos de Marketing y Comunicaciones incluyen tus preferencias para recibir marketing de nosotros y terceros y tus preferencias de comunicación."
        ]
      },
      {
        title: "2. Cómo Recopilamos tus Datos",
        content: "Utilizamos diferentes métodos para recopilar datos de y sobre ti, incluyendo a través de:",
        list: [
          "Interacciones directas: Puedes proporcionarnos tus Datos de Identidad y Contacto completando formularios o correspondiendo con nosotros por correo postal, teléfono, correo electrónico o de otra manera.",
          "Tecnologías o interacciones automatizadas: A medida que interactúas con nuestro sitio web, recopilaremos automáticamente Datos Técnicos sobre tu equipo, acciones de navegación y patrones. Recopilamos estos datos personales utilizando cookies, registros de servidor y otras tecnologías similares.",
          "Terceros o fuentes públicamente disponibles: Recibiremos datos personales sobre ti de varios terceros y fuentes públicas."
        ]
      },
      {
        title: "3. Cómo Utilizamos tus Datos",
        content: "Solo utilizaremos tus datos personales cuando la ley nos lo permita. Más comúnmente, utilizaremos tus datos personales en las siguientes circunstancias:",
        list: [
          "Cuando necesitamos ejecutar el contrato que estamos a punto de celebrar o hemos celebrado contigo.",
          "Cuando sea necesario para nuestros intereses legítimos (o los de un tercero) y tus intereses y derechos fundamentales no anulen esos intereses.",
          "Cuando necesitamos cumplir con una obligación legal."
        ],
        subcontent: "En general, no nos basamos en el consentimiento como base legal para procesar tus datos personales, aunque obtendremos tu consentimiento antes de enviar comunicaciones de marketing directo de terceros por correo electrónico o mensaje de texto. Tienes derecho a retirar el consentimiento al marketing en cualquier momento poniéndote en contacto con nosotros."
      },
      {
        title: "4. Seguridad de Datos",
        content: "Hemos implementado medidas de seguridad apropiadas para prevenir que tus datos personales se pierdan accidentalmente, se utilicen o accedan de manera no autorizada, se alteren o se divulguen. Además, limitamos el acceso a tus datos personales a aquellos empleados, agentes, contratistas y otros terceros que tienen una necesidad comercial de conocerlos. Solo procesarán tus datos personales según nuestras instrucciones y están sujetos a un deber de confidencialidad.",
        subcontent: "Hemos implementado procedimientos para tratar con cualquier sospecha de violación de datos personales y te notificaremos a ti y a cualquier regulador aplicable de una violación donde estemos legalmente obligados a hacerlo."
      },
      {
        title: "5. Retención de Datos",
        content: "Solo conservaremos tus datos personales durante el tiempo que sea razonablemente necesario para cumplir con los fines para los que los recopilamos, incluidos los fines de satisfacer cualquier requisito legal, regulatorio, fiscal, contable o de informe. Podemos conservar tus datos personales por un período más largo en caso de una queja o si creemos razonablemente que existe la posibilidad de litigio con respecto a nuestra relación contigo."
      },
      {
        title: "6. Tus Derechos Legales",
        content: "En determinadas circunstancias, tienes derechos bajo las leyes de protección de datos en relación con tus datos personales incluyendo el derecho a:",
        list: [
          "Solicitar acceso a tus datos personales.",
          "Solicitar corrección de tus datos personales.",
          "Solicitar eliminación de tus datos personales.",
          "Oponerte al procesamiento de tus datos personales.",
          "Solicitar restricción del procesamiento de tus datos personales.",
          "Solicitar la transferencia de tus datos personales.",
          "Derecho a retirar el consentimiento."
        ],
        subcontent: "No tendrás que pagar una tarifa para acceder a tus datos personales (o para ejercer cualquiera de los otros derechos). Sin embargo, podemos cobrar una tarifa razonable si tu solicitud es claramente infundada, repetitiva o excesiva. Alternativamente, podríamos negarnos a cumplir con tu solicitud en estas circunstancias."
      },
      {
        title: "7. Enlaces de Terceros",
        content: "Este sitio web puede incluir enlaces a sitios web, complementos y aplicaciones de terceros. Hacer clic en esos enlaces o habilitar esas conexiones puede permitir a terceros recopilar o compartir datos sobre ti. No controlamos estos sitios web de terceros y no somos responsables de sus declaraciones de privacidad. Cuando abandones nuestro sitio web, te recomendamos que leas la política de privacidad de cada sitio web que visites."
      },
      {
        title: "8. Cookies",
        content: "Puedes configurar tu navegador para rechazar todas o algunas cookies del navegador, o para alertarte cuando los sitios web establecen o acceden a cookies. Si desactivas o rechazas las cookies, ten en cuenta que algunas partes de este sitio web pueden volverse inaccesibles o no funcionar correctamente."
      },
      {
        title: "9. Cambios en la Política de Privacidad",
        content: "Podemos actualizar nuestra Política de Privacidad de vez en cuando. Te notificaremos cualquier cambio publicando la nueva Política de Privacidad en esta página y actualizando la fecha de 'Última Actualización' en la parte superior de esta Política de Privacidad. Se te aconseja revisar esta Política de Privacidad periódicamente para cualquier cambio."
      },
      {
        title: "10. Derechos de Imagen y Uso de Fotografías",
        content: "Respecto al tratamiento de imágenes con personas y derechos de imagen:",
        list: [
          "**Uso editorial:** Las fotografías pueden ser utilizadas para fines informativos, educativos o periodísticos conforme a la legislación vigente sobre libertad de información.",
          "**Uso comercial:** Para fines publicitarios o promocionales se requiere consentimiento explícito por escrito de las personas identificables.",
          "**Fotografías ganadoras:** Al participar en concursos, consientes que puedes aparecer en fotografías que sean utilizadas según los términos especificados.",
          "**Recomendación de privacidad:** Para proteger la privacidad, se prefieren fotografías temáticas sin personas identificables para uso comercial.",
          "Los datos de imagen se procesan con base en el interés legítimo para uso editorial y con consentimiento explícito para uso comercial."
        ]
      },
      {
        title: "11. Sistema de Puntos y Pagos",
        content: "En relación con nuestro sistema de puntos premium y procesamiento de pagos:",
        list: [
          "**Datos de pago:** Utilizamos Stripe como procesador de pagos seguro. No almacenamos información de tarjetas de crédito en nuestros servidores.",
          "**Transacciones de puntos:** Registramos todas las transacciones de compra y gasto de puntos para transparencia y gestión de cuenta.",
          "**Datos de facturación:** Almacenamos información necesaria para facturación e historial de compras (nombre, email, transacciones).",
          "**Retiros:** Para procesar retiros de ganancias, podemos requerir información adicional de verificación de identidad según normativas financieras.",
          "**Seguridad financiera:** Implementamos medidas adicionales de seguridad para proteger transacciones y datos financieros.",
          "**Retención de datos financieros:** Los registros de transacciones se conservan según requerimientos legales de contabilidad y normativas fiscales."
        ]
      },
      {
        title: "12. Contáctanos",
        content: "Si tienes alguna pregunta sobre esta Política de Privacidad, por favor contáctanos en:",
        list: [
          "Privacidad general: privacidad@toppic.com",
          "Derechos de imagen: derechos@toppic.com",
          "Pagos y facturación: pagos@toppic.com"
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
        
        <div className="prose prose-sm sm:prose lg:prose-lg mx-auto">
          <p>{content.lastUpdated}: {new Date().toLocaleDateString()}</p>
          <p>{content.introduction}</p>
          
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
              {section.subcontent && <p>{section.subcontent}</p>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Privacy;
