
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
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ 
        delay: index * 0.2, 
        duration: 0.6,
        ease: "easeOut"
      }}
      className="text-center group"
    >
      {/* Step number */}
      <div className="relative mb-8">
        <div className={`w-16 h-16 mx-auto bg-gradient-to-br ${gradient} rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg relative z-10`}>
          {number}
        </div>
        
        {/* Connecting dot on line */}
        <div className="hidden lg:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-white dark:bg-slate-800 rounded-full border-2 border-current z-20" 
             style={{ color: `rgb(var(--${color}-500))` }}>
        </div>
      </div>
      
      {/* Large icon */}
      <motion.div 
        className="mb-8"
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.3 }}
      >
        <div className={`w-24 h-24 mx-auto bg-gradient-to-br ${gradient} rounded-2xl flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all duration-300`}>
          <Icon className="w-12 h-12 text-white" />
        </div>
      </motion.div>
      
      {/* Title */}
      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
        {title}
      </h3>
      
      {/* Description */}
      <p className="text-slate-600 dark:text-slate-400 text-lg">
        {description}
      </p>
    </motion.div>
  );
};

export default ModernStep;
