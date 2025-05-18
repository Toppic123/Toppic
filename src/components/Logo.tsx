
import React from 'react';
import { motion } from 'framer-motion';
import { Camera } from 'lucide-react';
import { Link } from 'react-router-dom';

interface LogoProps {
  variant?: 'default' | 'small' | 'large';
  animated?: boolean;
  showDemo?: boolean;
}

const Logo: React.FC<LogoProps> = ({ 
  variant = 'default', 
  animated = true,
  showDemo = false 
}) => {
  const size = 
    variant === 'small' ? 'h-6 w-6' : 
    variant === 'large' ? 'h-10 w-10' : 
    'h-8 w-8';
  
  const fontSize = 
    variant === 'small' ? 'text-xl' : 
    variant === 'large' ? 'text-3xl' : 
    'text-2xl';

  const containerClass = showDemo 
    ? 'flex flex-col items-center gap-4 p-8 border border-gray-200 rounded-lg shadow-lg bg-white' 
    : '';

  const logoComponent = (
    <div className={`flex items-center gap-2 ${showDemo ? 'justify-center' : ''}`}>
      {animated ? (
        <motion.div 
          className={`flex items-center justify-center rounded-full bg-gradient-to-br from-[#4891AA] to-[#7E69AB] text-white p-1 ${size}`}
          whileHover={{ 
            rotate: [0, -10, 10, -5, 5, 0], 
            scale: 1.1,
            transition: { duration: 0.5 } 
          }}
          animate={showDemo ? {
            scale: [1, 1.05, 1],
            transition: { 
              repeat: Infinity, 
              repeatType: "reverse",
              duration: 2
            }
          } : undefined}
        >
          <Camera className="w-full h-full" strokeWidth={2.5} />
        </motion.div>
      ) : (
        <div className={`flex items-center justify-center rounded-full bg-gradient-to-br from-[#4891AA] to-[#7E69AB] text-white p-1 ${size}`}>
          <Camera className="w-full h-full" strokeWidth={2.5} />
        </div>
      )}
      <span className={`font-bold tracking-tight ${fontSize}`}>
        <span className="text-[#4891AA]">TOP</span>
        <span className="text-[#7E69AB]">PICS</span>
      </span>
    </div>
  );

  // Si estamos en modo demo, mostramos información adicional
  if (showDemo) {
    return (
      <div className={containerClass}>
        {logoComponent}
        <div className="text-center mt-2">
          <p className="text-muted-foreground text-sm">Logo actual de TOPPICS</p>
          <p className="text-xs text-gray-500 mt-1">Colores: Azul (#4891AA) y Morado (#7E69AB)</p>
        </div>
      </div>
    );
  }

  // En uso normal, enlazamos al inicio
  return (
    <Link to="/" className="flex items-center gap-2">
      {logoComponent}
    </Link>
  );
};

export default Logo;
