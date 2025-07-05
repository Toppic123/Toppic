
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
    <section className="py-32 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-emerald-950/20 dark:via-teal-950/20 dark:to-cyan-950/20 relative overflow-hidden">
      {/* Enhanced Background Pattern - unique for nearby contests */}
      <div className="absolute inset-0 opacity-6">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-emerald-400 to-teal-400 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-128 h-128 bg-gradient-to-br from-cyan-400 to-blue-400 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-br from-teal-400/30 to-cyan-400/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Geometric decorations unique to this section */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-32 right-20 w-32 h-32 border-2 border-teal-200/30 rounded-full animate-spin" style={{ animationDuration: '20s' }}></div>
        <div className="absolute bottom-40 left-16 w-24 h-24 border-2 border-emerald-200/40 rounded-lg rotate-45 animate-pulse"></div>
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
                className="w-4 h-4 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full shadow-lg"
                animate={{ 
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5]
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
