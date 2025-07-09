
import React from 'react';
import { Link } from 'react-router-dom';
import toppicsLogo from '@/assets/toppics-logo.png';

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
        src={toppicsLogo} 
        alt="TOPPICS Modern Logo" 
        className={`${size} transition-transform hover:scale-105`}
      />
    </Link>
  );
};

export default Logo;
