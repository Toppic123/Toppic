
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface ModernSectionTitleProps {
  title: string;
  subtitle?: string;
  icon?: React.ComponentType<any>;
  gradient?: string;
  showSparkles?: boolean;
}

const ModernSectionTitle = ({ 
  title, 
  subtitle, 
  icon: Icon, 
  gradient = "from-primary to-blue-600",
  showSparkles = true 
}: ModernSectionTitleProps) => {
  return (
    <div className="text-center mb-16 relative">
      {/* Decoración de fondo */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-32 bg-gradient-to-r from-primary/5 via-blue-500/5 to-purple-500/5 rounded-full blur-3xl"></div>
      </div>
      
      {/* Badge superior con icono - solo si showSparkles es true */}
      {showSparkles && (Icon || showSparkles) && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-center mb-6"
        >
          <div className="flex items-center bg-gradient-to-r from-primary/10 to-blue-600/10 rounded-full px-6 py-3 border border-primary/20 backdrop-blur-sm">
            {Icon ? (
              <Icon className="w-6 h-6 text-primary mr-3" />
            ) : (
              <Sparkles className="w-6 h-6 text-primary mr-3 animate-pulse" />
            )}
            <span className="text-primary font-bold text-lg">Destacado</span>
          </div>
        </motion.div>
      )}
      
      {/* Título principal */}
      <motion.h2 
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-5xl md:text-7xl font-black mb-6 tracking-tight relative"
      >
        <span className={`bg-gradient-to-r ${gradient} bg-clip-text text-transparent relative`}>
          {title}
          {/* Efecto de brillo */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
            initial={{ x: '-100%', opacity: 0 }}
            whileInView={{ x: '200%', opacity: [0, 1, 0] }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.5 }}
          />
        </span>
      </motion.h2>
      
      {/* Línea decorativa animada */}
      <motion.div 
        initial={{ opacity: 0, width: 0 }}
        whileInView={{ opacity: 1, width: 120 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className={`h-1.5 bg-gradient-to-r ${gradient} rounded-full mx-auto mb-6 relative overflow-hidden`}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"
          animate={{ x: [-100, 200] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>
      
      {/* Subtítulo */}
      {subtitle && (
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed font-medium"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
};

export default ModernSectionTitle;
