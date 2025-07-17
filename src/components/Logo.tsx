
import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  variant?: 'default' | 'small' | 'large';
}

const Logo: React.FC<LogoProps> = ({ 
  variant = 'default'
}) => {
  const size = 
    variant === 'small' ? 'h-8 w-8' : 
    variant === 'large' ? 'h-16 w-16' : 
    'h-12 w-12';  // Increased default size
  
  const textSize = 
    variant === 'small' ? 'text-lg' : 
    variant === 'large' ? 'text-3xl' : 
    'text-2xl';
  
  return (
    <Link to="/" className="flex items-center gap-2">
      <img 
        src="/lovable-uploads/e24b365f-9171-4e3a-9573-1dfae2e79a5c.png" 
        alt="TOPPIC Logo" 
        className={`${size} transition-transform hover:scale-105`}
      />
      <span className={`${textSize} font-bold text-primary`}>TOPPIC</span>
    </Link>
  );
};

export default Logo;
