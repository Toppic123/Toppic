
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Camera, Navigation, MapPin, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ModernSectionTitle from "./ModernSectionTitle";

const NearbyContestsSection = () => {
  const navigate = useNavigate();

  const handleViewContests = () => {
    navigate("/contests");
  };

  return (
    <section className="py-32 bg-gradient-to-b from-white via-gray-50/30 to-white dark:from-background dark:via-gray-950/30 dark:to-background relative overflow-hidden">
      {/* Enhanced Background Pattern - unified with other sections */}
      <div className="absolute inset-0 opacity-4">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-128 h-128 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-br from-amber-400 to-orange-400 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        {/* Modern Title - unified style without DESTACADO badge */}
        <ModernSectionTitle 
          title="Concursos cerca de ti"
          subtitle="Descubre concursos de fotografía en tu área y participa desde tu ubicación actual"
          icon={MapPin}
          gradient="from-blue-600 via-purple-600 to-pink-600"
          showSparkles={false}
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          {/* Enhanced CTA Button - unified with other sections style */}
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
              className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white px-8 sm:px-12 md:px-16 py-6 sm:py-8 text-lg sm:text-xl md:text-2xl font-bold rounded-full shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-3xl border-2 border-white/20 backdrop-blur-sm relative overflow-hidden group w-full sm:w-auto max-w-sm sm:max-w-none mx-auto"
            >
              {/* Animated background overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out"></div>
              
              <Camera className="mr-2 sm:mr-4 h-5 w-5 sm:h-6 md:h-8 sm:w-6 md:w-8 relative z-10" />
              <span className="relative z-10 text-center break-words">
                <span className="hidden sm:inline">EXPLORAR CONCURSOS</span>
                <span className="sm:hidden">EXPLORAR</span>
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

          {/* Enhanced Decorative Elements - unified style */}
          <div className="flex justify-center gap-4">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="w-4 h-4 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full shadow-lg"
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
