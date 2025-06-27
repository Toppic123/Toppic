
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface ExpandableStepProps {
  icon: React.ComponentType<any>;
  title: string;
  description: string;
  gradient: string;
  bgPattern: string;
  number: string;
  index: number;
}

const ExpandableStep = ({ 
  icon: Icon, 
  title, 
  description, 
  gradient, 
  bgPattern, 
  number, 
  index 
}: ExpandableStepProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2, duration: 0.6 }}
      className="relative group"
    >
      <div className={`${bgPattern} rounded-3xl relative overflow-hidden border border-white/60 dark:border-gray-800/60 shadow-2xl hover:shadow-3xl transition-all duration-700 group-hover:scale-105 group-hover:-translate-y-3`}>
        {/* Enhanced floating elements */}
        <div className="absolute -top-6 -right-6 w-40 h-40 bg-white/30 dark:bg-white/20 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700"></div>
        <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-white/20 dark:bg-white/10 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700"></div>
        
        {/* Clickable header */}
        <div 
          className="p-10 pt-20 pb-6 cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {/* Large infographic step number */}
          <div className={`absolute top-6 left-6 w-20 h-20 bg-gradient-to-br ${gradient} rounded-3xl flex items-center justify-center text-white font-black text-2xl shadow-2xl border-4 border-white/60 backdrop-blur-sm z-10 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
            {number}
          </div>
          
          {/* Enhanced icon with infographic styling */}
          <div className={`w-28 h-28 bg-gradient-to-br ${gradient} rounded-full flex items-center justify-center mb-8 shadow-2xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 border-4 border-white/40`}>
            <Icon className="w-14 h-14 text-white" />
          </div>
          
          {/* Title with expand indicator */}
          <div className="flex items-center justify-between">
            <h3 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white group-hover:text-primary transition-colors duration-300 leading-tight">
              {title}
            </h3>
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className={`w-8 h-8 bg-gradient-to-br ${gradient} rounded-full flex items-center justify-center ml-4`}
            >
              <ChevronDown className="w-4 h-4 text-white" />
            </motion.div>
          </div>
        </div>

        {/* Expandable content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="px-10 pb-10">
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-xl font-medium">
                  {description}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Infographic decorative dots */}
        <div className="absolute top-4 right-4 opacity-20">
          <div className="grid grid-cols-3 gap-1">
            {[...Array(9)].map((_, i) => (
              <div key={i} className={`w-2 h-2 bg-gradient-to-br ${gradient} rounded-full`}></div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ExpandableStep;
