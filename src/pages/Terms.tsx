
import { motion } from "framer-motion";

const Terms = () => {
  return (
    <div className="pt-24 pb-16">
      <div className="container max-w-4xl mx-auto px-4">
        <motion.h1 
          className="text-3xl md:text-4xl font-bold mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Términos y Condiciones
        </motion.h1>
        
        <div className="prose prose-sm sm:prose lg:prose-lg mx-auto">
          <p>Última actualización: {new Date().toLocaleDateString()}</p>
          
          <h2>1. Aceptación de los Términos</h2>
          <p>
            Al acceder o utilizar Snap Contest, aceptas estar sujeto a estos Términos y Condiciones y a nuestra Política de Privacidad. Si no estás de acuerdo con alguno de estos términos, no podrás utilizar nuestros servicios.
          </p>
          
          <h2>2. Elegibilidad</h2>
          <p>
            Para utilizar nuestros servicios, debes tener al menos 18 años de edad o la mayoría de edad legal en tu jurisdicción, lo que sea mayor. Al usar nuestros servicios, confirmas que cumples con este requisito.
          </p>
          
          <h2>3. Cuentas de Usuario</h2>
          <p>
            Al crear una cuenta, debes proporcionar información precisa y completa. Eres responsable de mantener la seguridad de tu contraseña y de todas las actividades que ocurran bajo tu cuenta.
          </p>
          
          <h2>4. Concursos Fotográficos</h2>
          <p>
            Los concursos están sujetos a reglas específicas que se publicarán para cada evento. Al participar, aceptas cumplir con dichas reglas y reconoces que los organizadores y Snap Contest tienen la decisión final sobre los ganadores.
          </p>
          
          <h2>5. Contenido del Usuario</h2>
          <p>
            Al subir fotografías u otro contenido a nuestra plataforma:
          </p>
          <ul>
            <li>Garantizas que tienes todos los derechos necesarios sobre dicho contenido</li>
            <li>Otorgas a Snap Contest y a los organizadores de concursos los derechos especificados en las reglas del concurso</li>
            <li>Te comprometes a no subir contenido ilegal, ofensivo o que viole derechos de terceros</li>
          </ul>
          
          <h2>6. Propiedad Intelectual</h2>
          <p>
            Conservas tus derechos sobre las fotografías que subas, pero otorgas licencias específicas a los organizadores según lo detallado en las reglas de cada concurso. Las marcas, logotipos y contenido de Snap Contest están protegidos por derechos de autor y otras leyes de propiedad intelectual.
          </p>
          
          <h2>7. Limitación de Responsabilidad</h2>
          <p>
            Snap Contest proporciona la plataforma "tal cual" y "según disponibilidad" sin garantías de ningún tipo. No seremos responsables por daños indirectos, incidentales, especiales, consecuentes o punitivos relacionados con tu uso de nuestros servicios.
          </p>
          
          <h2>8. Indemnización</h2>
          <p>
            Aceptas indemnizar y mantener indemne a Snap Contest, sus afiliados, empleados y agentes de cualquier reclamo, demanda, pérdida o responsabilidad derivada de tu uso de nuestros servicios o violación de estos términos.
          </p>
          
          <h2>9. Modificaciones</h2>
          <p>
            Podemos modificar estos términos en cualquier momento. Las modificaciones entrarán en vigor inmediatamente después de su publicación. El uso continuado de nuestros servicios después de cualquier modificación constituye tu aceptación de los términos modificados.
          </p>
          
          <h2>10. Terminación</h2>
          <p>
            Podemos suspender o terminar tu acceso a nuestros servicios en cualquier momento y por cualquier motivo, sin previo aviso ni responsabilidad.
          </p>
          
          <h2>11. Ley Aplicable</h2>
          <p>
            Estos términos se regirán e interpretarán de acuerdo con las leyes de España, sin tener en cuenta sus conflictos de disposiciones legales.
          </p>
          
          <h2>12. Contacto</h2>
          <p>
            Si tienes preguntas sobre estos términos, contáctanos en: <a href="mailto:legal@snapcontest.com">legal@snapcontest.com</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Terms;
