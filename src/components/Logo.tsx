
import React from 'react';
import { Camera } from 'lucide-react';
import { Link } from 'react-router-dom';

interface LogoProps {
  variant?: 'default' | 'small' | 'large';
}

const Logo: React.FC<LogoProps> = ({ 
  variant = 'default'
}) => {
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
      <img 
        src="/lovable-uploads/e24b365f-9171-4e3a-9573-1dfae2e79a5c.png" 
        alt="TOPPICS Logo" 
        className={size}
      />
    </Link>
  );
};

export default Logo;
