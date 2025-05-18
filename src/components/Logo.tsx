
import React from 'react';
import { motion } from 'framer-motion';
import { Camera } from 'lucide-react';
import { Link } from 'react-router-dom';

interface LogoProps {
  variant?: 'default' | 'small' | 'large';
  animated?: boolean;
}

const Logo: React.FC<LogoProps> = ({ variant = 'default', animated = true }) => {
  const size = 
    variant === 'small' ? 'h-6 w-6' : 
    variant === 'large' ? 'h-10 w-10' : 
    'h-8 w-8';
  
  const fontSize = 
    variant === 'small' ? 'text-xl' : 
    variant === 'large' ? 'text-3xl' : 
    'text-2xl';

  return (
    <Link to="/" className="flex items-center gap-2">
      {animated ? (
        <motion.div 
          className={`flex items-center justify-center rounded-full bg-gradient-to-br from-[#4891AA] to-[#7E69AB] text-white p-1 ${size}`}
          whileHover={{ rotate: [0, -10, 10, -5, 5, 0], transition: { duration: 0.5 } }}
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
    </Link>
  );
};

export default Logo;
