
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Camera, Navigation, MapPin, Sparkles, Compass } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ModernSectionTitle from "./ModernSectionTitle";

const NearbyContestsSection = () => {
  const navigate = useNavigate();

  const handleViewContests = () => {
    navigate("/contests");
  };

  return (
    <section className="py-32 bg-gradient-to-b from-white via-gray-50/30 to-white dark:from-background dark:via-muted/20 dark:to-background relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 right-20 w-2 h-32 bg-gradient-to-b from-emerald-200/40 to-transparent rounded-full"></div>
        <div className="absolute bottom-32 left-16 w-32 h-2 bg-gradient-to-r from-teal-200/40 to-transparent rounded-full"></div>
      </div>

      {/* Minimal geometric decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-40 right-32 w-16 h-16 border border-emerald-200/30 rounded-full"></div>
        <Compass className="absolute bottom-40 left-20 w-8 h-8 text-emerald-300/20" />
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        {/* Modern Title with location theme */}
        <ModernSectionTitle 
          title="Concursos cerca de ti"
          subtitle="Descubre concursos de fotografía en tu área y participa desde tu ubicación actual"
          icon={Compass}
          gradient="from-emerald-600 via-teal-600 to-cyan-600"
          showSparkles={false}
        />

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
              className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-700 hover:via-teal-700 hover:to-cyan-700 text-white px-8 sm:px-12 md:px-16 py-6 sm:py-8 text-lg sm:text-xl md:text-2xl font-bold rounded-full shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-3xl border-2 border-white/20 backdrop-blur-sm relative overflow-hidden group w-full sm:w-auto max-w-sm sm:max-w-none mx-auto"
            >
              {/* Animated background overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out"></div>
              
              <Navigation className="mr-2 sm:mr-4 h-5 w-5 sm:h-6 md:h-8 sm:w-6 md:w-8 relative z-10" />
              <span className="relative z-10 text-center break-words">
                <span className="hidden sm:inline">EXPLORAR CONCURSOS CERCANOS</span>
                <span className="sm:hidden">EXPLORAR CERCA</span>
              </span>
              <motion.div
                className="ml-2 sm:ml-3 relative z-10"
                animate={{ x: [0, 8, 0] }}
                transition={{ 
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                →
              </motion.div>
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
