
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
    <section className="py-16 md:py-24 bg-gradient-to-br from-gray-900 via-black to-gray-800 relative overflow-hidden">
      {/* Dark Creative Background Elements */}
      <div className="absolute inset-0">
        {/* Animated dark gradient orbs */}
        <div className="absolute top-10 left-10 w-40 h-40 bg-gradient-to-r from-primary/20 to-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-gradient-to-r from-purple-500/15 to-pink-500/15 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-gradient-to-r from-cyan-400/10 to-blue-400/10 rounded-full blur-xl animate-pulse delay-500"></div>
        
        {/* Dark geometric pattern overlay */}
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}></div>
        </div>
        
        {/* Subtle light rays effect */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-px h-full bg-gradient-to-b from-transparent via-white/5 to-transparent"></div>
        <div className="absolute top-1/2 left-0 transform -translate-y-1/2 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
      </div>
      
      <div className="container max-w-7xl mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 md:mb-8 tracking-tight bg-gradient-to-r from-white via-gray-100 to-primary bg-clip-text text-transparent leading-tight">
            ¿Eres organizador?
          </h2>
          
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-12 md:mb-16 leading-relaxed max-w-4xl mx-auto text-gray-200 font-medium px-4">
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
              className="rounded-full px-8 sm:px-12 md:px-16 py-6 md:py-8 bg-gradient-to-r from-primary to-blue-500 hover:from-primary/90 hover:to-blue-600 shadow-2xl hover:shadow-primary/25 transition-all duration-300 text-base sm:text-lg md:text-xl lg:text-2xl font-bold transform hover:scale-105 hover:-translate-y-1 w-full sm:w-auto border border-primary/20"
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
