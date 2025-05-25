
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Rocket, Sparkles, TrendingUp } from "lucide-react";

interface OrganizerSectionProps {
  texts: {
    organizerTitle: string;
    organizerDesc: string;
    discoverPlans: string;
  };
}

const OrganizerSection = ({ texts }: OrganizerSectionProps) => {
  return (
    <section className="py-20 bg-white dark:bg-gray-950">
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
                className="rounded-xl w-full object-cover"
              />
              {/* MODERNIZED: New call-to-action box with better design */}
              <div className="absolute -bottom-8 -right-8 bg-gradient-to-r from-primary via-blue-600 to-purple-600 p-6 rounded-2xl text-white font-medium shadow-2xl border border-white/20 backdrop-blur-sm min-w-[200px]">
                <div className="flex items-center mb-2">
                  <Rocket className="w-6 h-6 mr-2 text-yellow-300" />
                  <Sparkles className="w-4 h-4 text-yellow-300" />
                </div>
                <p className="text-lg font-bold mb-1">¡Impulsa tu marca!</p>
                <div className="flex items-center">
                  <TrendingUp className="w-4 h-4 mr-1 text-green-300" />
                  <span className="text-sm text-blue-100">Crece con nosotros</span>
                </div>
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
            className="lg:w-1/2"
          >
            <h2 className="text-4xl font-bold mb-4 tracking-tight">{texts.organizerTitle}</h2>
            <div className="h-1 bg-primary rounded w-24 mb-8"></div>
            
            <p className="text-muted-foreground text-lg mb-8">{texts.organizerDesc}</p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <div className="bg-primary/10 p-2 rounded-full mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Aumenta la visibilidad</h3>
                  <p className="text-muted-foreground">Llega a miles de fotógrafos interesados en mostrar su talento.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-primary/10 p-2 rounded-full mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Contenido generado por usuarios</h3>
                  <p className="text-muted-foreground">Recibe fotos auténticas y de alta calidad para tus campañas.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-primary/10 p-2 rounded-full mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Engagement efectivo</h3>
                  <p className="text-muted-foreground">Genera una conexión emocional con tu audiencia mediante la participación.</p>
                </div>
              </div>
            </div>
            
            <Button asChild size="lg" className="rounded-full px-8">
              <Link to="/organizers">{texts.discoverPlans}</Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default OrganizerSection;
