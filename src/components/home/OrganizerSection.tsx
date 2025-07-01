
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
    <section className="py-16 md:py-24 bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 relative overflow-hidden">
      {/* Modern Minimal Background Elements */}
      <div className="absolute inset-0">
        {/* Subtle geometric pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        
        {/* Floating gradient orbs - minimal and elegant */}
        <div className="absolute top-20 left-1/4 w-32 h-32 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-32 right-1/3 w-24 h-24 bg-gradient-to-r from-purple-500/8 to-pink-500/8 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-gradient-to-r from-indigo-500/6 to-blue-500/6 rounded-full blur-3xl animate-pulse delay-500"></div>
        
        {/* Minimal grid pattern */}
        <div className="absolute inset-0 opacity-3">
          <div className="w-full h-full" style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '100px 100px'
          }}></div>
        </div>
        
        {/* Subtle accent lines */}
        <div className="absolute top-0 left-1/3 w-px h-full bg-gradient-to-b from-transparent via-white/5 to-transparent"></div>
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-white/3 to-transparent"></div>
        <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/3 to-transparent"></div>
        
        {/* Modern corner accents */}
        <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-white/10 rounded-tl-lg"></div>
        <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-white/10 rounded-tr-lg"></div>
        <div className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-white/10 rounded-bl-lg"></div>
        <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-white/10 rounded-br-lg"></div>
      </div>
      
      <div className="container max-w-7xl mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          {/* Modern title with subtle glow */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 md:mb-8 tracking-tight relative">
            <span className="bg-gradient-to-r from-white via-gray-100 to-blue-200 bg-clip-text text-transparent">
              ¿Eres organizador?
            </span>
            {/* Subtle glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-blue-500/5 to-purple-500/5 blur-2xl -z-10"></div>
          </h2>
          
          {/* Refined subtitle */}
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-12 md:mb-16 leading-relaxed max-w-4xl mx-auto text-gray-300 font-medium px-4">
            OFRECE UNA EXPERIENCIA ÚNICA A LOS ASISTENTES
          </p>
          
          {/* Modern CTA button */}
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
              className="group relative rounded-full px-8 sm:px-12 md:px-16 py-6 md:py-8 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-2xl hover:shadow-blue-500/25 transition-all duration-500 text-base sm:text-lg md:text-xl lg:text-2xl font-bold transform hover:scale-105 hover:-translate-y-2 w-full sm:w-auto border border-blue-400/20 backdrop-blur-sm overflow-hidden"
            >
              <Link to="/organizers" className="flex items-center justify-center relative z-10">
                {/* Animated background overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out"></div>
                
                <Building className="mr-2 sm:mr-3 md:mr-4 h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 relative z-10" />
                <span className="break-words text-center relative z-10">CREA AQUÍ TUS CONCURSOS</span>
              </Link>
            </Button>
          </motion.div>
          
          {/* Subtle decorative elements */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="flex justify-center mt-8 gap-2"
          >
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-gradient-to-r from-blue-400/30 to-indigo-400/30 rounded-full"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: "easeInOut"
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default OrganizerSection;
