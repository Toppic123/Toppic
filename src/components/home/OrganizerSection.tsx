
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Building } from "lucide-react";

interface OrganizerSectionProps {
  texts: {
    organizerTitle: string;
    organizerDesc: string;
    discoverPlans: string;
  };
}

const OrganizerSection = ({ texts }: OrganizerSectionProps) => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-white dark:from-gray-950 dark:to-gray-900 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-purple-400 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container max-w-7xl mx-auto px-4 relative">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 md:mb-8 tracking-tight bg-gradient-to-r from-gray-900 via-primary to-blue-600 bg-clip-text text-transparent leading-tight">
            ¿Eres organizador?
          </h2>
          
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-12 md:mb-16 leading-relaxed max-w-4xl mx-auto text-gray-700 font-medium px-4">
            OFRECE UNA EXPERIENCIA ÚNICA A LOS ASISTENTES
          </p>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="px-4"
          >
            <Button 
              asChild 
              size="lg" 
              className="rounded-full px-8 sm:px-12 md:px-16 py-6 md:py-8 bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-700 shadow-2xl hover:shadow-3xl transition-all duration-300 text-base sm:text-lg md:text-xl lg:text-2xl font-bold transform hover:scale-105 hover:-translate-y-1 w-full sm:w-auto"
            >
              <Link to="/organizers" className="flex items-center justify-center">
                <Building className="mr-2 sm:mr-3 md:mr-4 h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8" />
                <span className="break-words text-center">CREA AQUÍ TUS CONCURSOS</span>
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default OrganizerSection;
