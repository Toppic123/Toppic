
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Camera, Building, ChartBar, Award } from "lucide-react";

interface OrganizerSectionProps {
  texts: {
    organizerTitle: string;
    organizerDesc: string;
    discoverPlans: string;
  };
}

const OrganizerSection = ({ texts }: OrganizerSectionProps) => {
  return (
    <section className="py-24 bg-gradient-to-b from-white via-primary/5 to-white dark:from-gray-950 dark:via-primary/10 dark:to-gray-950">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/2"
          >
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3" 
                alt="Personas disfrutando en un evento cultural" 
                className="rounded-xl w-full object-cover shadow-2xl"
              />
              {/* Floating call-to-action box with improved design */}
              <div className="absolute -bottom-8 -right-8 bg-gradient-to-r from-primary via-blue-600 to-purple-600 p-8 rounded-2xl text-white font-medium shadow-2xl border border-white/20 backdrop-blur-sm min-w-[240px] transform hover:scale-105 transition-transform">
                <p className="text-2xl font-bold mb-2">¡Impulsa tu marca!</p>
                <span className="text-lg text-blue-100">Crece con nosotros</span>
                {/* Decorative elements */}
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full animate-pulse"></div>
                <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-pink-400 rounded-full"></div>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/2 text-center lg:text-left"
          >
            <h2 className="text-4xl font-bold mb-4 tracking-tight">{texts.organizerTitle}</h2>
            <div className="h-1 bg-gradient-to-r from-primary to-blue-600 rounded w-24 mb-8 mx-auto lg:mx-0"></div>
            
            <p className="text-xl mb-8 leading-relaxed">
              Crea concursos fotográficos para tus eventos o promociona tu negocio con la mejor plataforma para concursos fotográficos geolocalizados.
            </p>
            
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="flex flex-col items-center lg:items-start">
                <div className="bg-primary/10 p-3 rounded-lg mb-3">
                  <Camera className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-medium mb-1">Contenido único</h3>
                <p className="text-sm text-muted-foreground">Obtén fotos auténticas</p>
              </div>
              
              <div className="flex flex-col items-center lg:items-start">
                <div className="bg-primary/10 p-3 rounded-lg mb-3">
                  <Building className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-medium mb-1">Visibilidad</h3>
                <p className="text-sm text-muted-foreground">Promociona tu marca</p>
              </div>
              
              <div className="flex flex-col items-center lg:items-start">
                <div className="bg-primary/10 p-3 rounded-lg mb-3">
                  <ChartBar className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-medium mb-1">Engagement</h3>
                <p className="text-sm text-muted-foreground">Conecta con tu público</p>
              </div>
              
              <div className="flex flex-col items-center lg:items-start">
                <div className="bg-primary/10 p-3 rounded-lg mb-3">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-medium mb-1">Marketing</h3>
                <p className="text-sm text-muted-foreground">Contenido para campañas</p>
              </div>
            </div>
            
            <Button asChild size="lg" className="rounded-full px-8 bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-700 shadow-lg">
              <Link to="/organizers">{texts.discoverPlans}</Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default OrganizerSection;
