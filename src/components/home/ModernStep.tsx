
import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight, Sparkles } from "lucide-react";

interface ModernStepProps {
  icon: React.ComponentType<any>;
  title: string;
  description: string;
  gradient: string;
  number: string;
  index: number;
}

const ModernStep = ({ 
  icon: Icon, 
  title, 
  description, 
  gradient, 
  number, 
  index 
}: ModernStepProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.6 }}
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-xl hover:shadow-2xl transition-all duration-500 group-hover:scale-[1.02] group-hover:-translate-y-1">
        {/* Fondo animado con gradiente */}
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
        
        {/* Decoraciones geométricas */}
        <div className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-br from-primary/10 to-blue-500/10 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-700"></div>
        <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-xl group-hover:scale-110 transition-transform duration-500"></div>
        
        <div className="relative p-8 pt-12">
          {/* Número del paso con diseño moderno */}
          <div className="absolute -top-4 left-8">
            <div className={`w-16 h-16 bg-gradient-to-br ${gradient} rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg border-4 border-white/60 backdrop-blur-sm group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
              {number}
            </div>
          </div>
          
          {/* Icono principal con animación */}
          <div className="flex justify-center mb-6">
            <motion.div 
              className={`w-20 h-20 bg-gradient-to-br ${gradient} rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-all duration-500 border-2 border-white/30`}
              animate={{ 
                rotate: isHovered ? [0, -5, 5, 0] : 0,
                scale: isHovered ? 1.05 : 1 
              }}
              transition={{ duration: 0.6 }}
            >
              <Icon className="w-10 h-10 text-white" />
            </motion.div>
          </div>
          
          {/* Título con gradiente */}
          <h3 className="text-2xl md:text-3xl font-bold mb-4 text-center">
            <span className={`bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
              {title}
            </span>
          </h3>
          
          {/* Descripción */}
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-center mb-6 text-lg">
            {description}
          </p>
          
          {/* Botón de acción con animación */}
          <div className="flex justify-center">
            <motion.button
              className={`group/btn flex items-center bg-gradient-to-r ${gradient} text-white px-6 py-3 rounded-xl font-semibold hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl`}
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Comenzar</span>
              <ChevronRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
            </motion.button>
          </div>
        </div>
        
        {/* Brillo superior */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
      </div>
    </motion.div>
  );
};

export default ModernStep;
