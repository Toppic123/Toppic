
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface OrganizerSectionProps {
  texts: {
    organizerTitle: string;
    organizerDesc: string;
    discoverPlans: string;
  };
}

const OrganizerSection = ({ texts }: OrganizerSectionProps) => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Fondo abstracto */}
      <div className="absolute inset-0 -z-10 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-primary/30 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-[#9b87f5]/30 blur-3xl"></div>
      </div>
      
      <div className="container max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight font-serif tracking-tight">
              {texts.organizerTitle}
            </h2>
            
            <div className="w-24 h-1 bg-primary mb-6 rounded"></div>
            
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              {texts.organizerDesc}
            </p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <Button asChild size="lg" className="rounded-full px-8">
                <Link to="/pricing">{texts.discoverPlans}</Link>
              </Button>
            </motion.div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-100 dark:border-gray-700">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <div className="text-4xl mb-2">🏆</div>
                  <h3 className="font-bold mb-1">Organizadores</h3>
                  <p className="text-sm text-muted-foreground">Gestiona tus concursos desde un panel intuitivo</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <div className="text-4xl mb-2">📊</div>
                  <h3 className="font-bold mb-1">Analíticas</h3>
                  <p className="text-sm text-muted-foreground">Estadísticas detalladas de participación</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <div className="text-4xl mb-2">🌍</div>
                  <h3 className="font-bold mb-1">Alcance</h3>
                  <p className="text-sm text-muted-foreground">Llega a fotógrafos de toda España</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <div className="text-4xl mb-2">💰</div>
                  <h3 className="font-bold mb-1">Rentabilidad</h3>
                  <p className="text-sm text-muted-foreground">Genera ingresos a través de los concursos</p>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-primary/10 rounded-lg border border-primary/20">
                <h4 className="font-bold mb-2 flex items-center">
                  <span className="text-xl mr-2">⭐</span> 
                  Beneficios destacados
                </h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    <span className="text-sm">Personalización completa de concursos</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    <span className="text-sm">Sistema avanzado de votación con IA</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    <span className="text-sm">Publicidad para patrocinadores</span>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Elementos decorativos */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary/10 rounded-full blur-xl"></div>
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-[#9b87f5]/20 rounded-full blur-xl"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default OrganizerSection;
