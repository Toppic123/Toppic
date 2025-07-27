
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Camera, Navigation, MapPin, Sparkles, Compass } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ModernSectionTitle from "./ModernSectionTitle";
import { useIsMobile } from "@/hooks/use-mobile";

const NearbyContestsSection = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const handleViewContests = () => {
    navigate("/contests");
  };

  return (
    <section className="pt-16 pb-16 bg-gradient-to-b from-white via-gray-50/30 to-white dark:from-background dark:via-muted/20 dark:to-background relative overflow-hidden">
      {/* Enhanced Background Pattern with Abstract Lines */}
      <div className="absolute inset-0 opacity-30">
        {/* Abstract subtle lines */}
        <div className="absolute top-10 left-1/4 w-px h-64 bg-gradient-to-b from-transparent via-emerald-200/30 to-transparent rotate-12"></div>
        <div className="absolute top-32 right-1/3 w-px h-48 bg-gradient-to-b from-transparent via-teal-200/25 to-transparent -rotate-6"></div>
        <div className="absolute bottom-20 left-1/3 w-px h-56 bg-gradient-to-b from-transparent via-cyan-200/30 to-transparent rotate-45"></div>
        <div className="absolute top-1/2 right-1/4 w-px h-40 bg-gradient-to-b from-transparent via-emerald-200/20 to-transparent -rotate-12"></div>
        
        {/* Horizontal subtle lines */}
        <div className="absolute top-24 left-0 w-48 h-px bg-gradient-to-r from-transparent via-teal-200/25 to-transparent"></div>
        <div className="absolute bottom-40 right-0 w-64 h-px bg-gradient-to-l from-transparent via-emerald-200/20 to-transparent"></div>
        <div className="absolute top-2/3 left-1/5 w-32 h-px bg-gradient-to-r from-transparent via-cyan-200/30 to-transparent"></div>
        
        {/* Diagonal abstract lines */}
        <div className="absolute top-16 right-16 w-24 h-px bg-gradient-to-r from-transparent via-emerald-200/25 to-transparent rotate-45 origin-left"></div>
        <div className="absolute bottom-24 left-20 w-40 h-px bg-gradient-to-r from-transparent via-teal-200/20 to-transparent -rotate-30 origin-left"></div>
        
        <div className="absolute top-20 right-20 w-2 h-32 bg-gradient-to-b from-emerald-200/40 to-transparent rounded-full"></div>
        <div className="absolute bottom-32 left-16 w-32 h-2 bg-gradient-to-r from-teal-200/40 to-transparent rounded-full"></div>
        
        {/* Additional decorative elements on the sides */}
        <div className="absolute top-1/4 left-8 w-24 h-24 border-2 border-emerald-200/20 rounded-full"></div>
        <div className="absolute top-1/2 right-12 w-32 h-32 border border-teal-200/20 rounded-full"></div>
        <div className="absolute bottom-1/4 left-12 w-20 h-20 border-2 border-cyan-200/20 rounded-full"></div>
        
        {/* Floating icons */}
        <Camera className="absolute top-1/3 left-24 w-6 h-6 text-emerald-300/25" />
        <MapPin className="absolute top-2/3 right-20 w-5 h-5 text-teal-300/25" />
        <Sparkles className="absolute bottom-1/3 left-32 w-4 h-4 text-cyan-300/25" />
      </div>

      {/* Minimal geometric decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-40 right-32 w-16 h-16 border border-emerald-200/30 rounded-full"></div>
        <Compass className="absolute bottom-40 left-20 w-8 h-8 text-emerald-300/20" />
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        {/* Modern Title with location theme */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-[#f46464] mb-6 tracking-tight">
            CONCURSOS CERCA DE TI
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Descubre concursos de fotografía en tu área y participa desde tu ubicación actual
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          {/* Enhanced CTA Button with location theme */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="px-4 mb-16"
          >
            <Button
              size="lg"
              onClick={handleViewContests}
              className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-700 hover:via-teal-700 hover:to-cyan-700 text-white w-80 h-80 text-lg sm:text-xl md:text-2xl font-bold rounded-full shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-3xl border-2 border-white/20 backdrop-blur-sm relative overflow-hidden group mx-auto flex items-center justify-center"
            >
              {/* Animated background overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out"></div>
              
              <div className="relative z-10 flex flex-col items-center justify-center text-center">
                <Navigation className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 mb-4" />
                <div className="text-center leading-tight">
                  <div className="hidden sm:block">EXPLORAR<br/>CONCURSOS<br/>CERCANOS</div>
                  <div className="sm:hidden">CONCURSOS<br/>CERCANOS</div>
                </div>
                <motion.div
                  className="mt-4"
                  animate={{ x: [0, 8, 0] }}
                  transition={{ 
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  →
                </motion.div>
              </div>
            </Button>
          </motion.div>

          {/* Enhanced Decorative Elements with location theme */}
          <div className="flex justify-center gap-4">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.4, 0.8, 0.4]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default NearbyContestsSection;
