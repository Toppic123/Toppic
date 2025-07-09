
import { useState } from "react";
import { motion } from "framer-motion";

interface ModernStepProps {
  icon: React.ComponentType<any>;
  title: string;
  description: string;
  gradient: string;
  number: string;
  index: number;
  color: string;
}

const ModernStep = ({ 
  icon: Icon, 
  title, 
  description, 
  gradient, 
  number, 
  index,
  color 
}: ModernStepProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50, scale: 0.8 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ 
        delay: index * 0.2, 
        duration: 0.8,
        type: "spring",
        bounce: 0.3
      }}
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glow effect */}
      <div className={`absolute -inset-1 bg-gradient-to-r ${gradient} rounded-3xl blur-sm opacity-0 group-hover:opacity-30 transition-all duration-700`}></div>
      
      <div className="relative overflow-hidden rounded-3xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-white/20 dark:border-slate-700/30 shadow-2xl hover:shadow-3xl transition-all duration-700 group-hover:scale-[1.03] group-hover:-translate-y-2">
        {/* Fondo animado con gradiente */}
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-8 transition-opacity duration-700`} />
        
        {/* Mesh gradient background */}
        <div className="absolute inset-0 opacity-30">
          <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${gradient} rounded-full blur-3xl animate-pulse`} style={{ animationDelay: `${index * 0.5}s` }}></div>
          <div className={`absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr ${gradient} rounded-full blur-2xl animate-pulse`} style={{ animationDelay: `${index * 0.5 + 1}s` }}></div>
        </div>
        
        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className={`absolute top-1/4 right-1/4 w-1 h-1 bg-${color}-400 rounded-full animate-bounce opacity-40`} style={{ animationDelay: `${index * 0.3}s` }}></div>
          <div className={`absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-${color}-500 rounded-full animate-bounce opacity-60`} style={{ animationDelay: `${index * 0.3 + 0.5}s` }}></div>
        </div>
        
        <div className="relative p-8 pt-16">
          {/* Número del paso con diseño ultra moderno */}
          <div className="absolute -top-6 left-8">
            <motion.div 
              className={`w-20 h-20 bg-gradient-to-br ${gradient} rounded-3xl flex items-center justify-center text-white font-black text-2xl shadow-2xl border-4 border-white/40 backdrop-blur-sm`}
              whileHover={{ 
                scale: 1.1, 
                rotate: 5,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
              }}
              transition={{ duration: 0.3 }}
            >
              {number}
              {/* Inner glow */}
              <div className="absolute inset-2 bg-white/20 rounded-2xl"></div>
            </motion.div>
          </div>
          
          {/* Icono principal con animación mejorada */}
          <div className="flex justify-center mb-8">
            <motion.div 
              className={`w-24 h-24 bg-gradient-to-br ${gradient} rounded-3xl flex items-center justify-center shadow-2xl group-hover:shadow-3xl transition-all duration-700 border-2 border-white/40 backdrop-blur-sm`}
              animate={{ 
                rotate: isHovered ? [0, -8, 8, -4, 4, 0] : 0,
                scale: isHovered ? [1, 1.05, 1.02, 1.05, 1] : 1,
                boxShadow: isHovered 
                  ? "0 25px 50px -12px rgba(0, 0, 0, 0.4)" 
                  : "0 10px 25px -3px rgba(0, 0, 0, 0.1)"
              }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              whileHover={{
                y: -5
              }}
            >
              <Icon className="w-12 h-12 text-white drop-shadow-lg" />
              {/* Reflection effect */}
              <div className="absolute inset-3 bg-gradient-to-b from-white/30 to-transparent rounded-2xl"></div>
            </motion.div>
          </div>
          
          {/* Título con gradiente mejorado */}
          <motion.h3 
            className="text-2xl md:text-3xl font-black mb-6 text-center leading-tight"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <span className={`bg-gradient-to-r ${gradient} bg-clip-text text-transparent drop-shadow-sm`}>
              {title}
            </span>
          </motion.h3>
          
          {/* Descripción mejorada */}
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-center text-lg font-medium">
            {description}
          </p>
        </div>
        
        {/* Brillo superior mejorado */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent"></div>
        
        {/* Reflection effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-transparent rounded-3xl pointer-events-none"></div>
        
        {/* Border glow */}
        <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-700 blur-sm`}></div>
      </div>
    </motion.div>
  );
};

export default ModernStep;
