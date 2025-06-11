
import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ContestAdBannerProps {
  className?: string;
}

const ContestAdBanner = ({ className = "" }: ContestAdBannerProps) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className={`relative bg-gradient-to-r from-blue-500 to-purple-600 p-4 ${className}`}>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsVisible(false)}
        className="absolute top-2 right-2 text-white hover:bg-white/20 h-6 w-6 p-0"
      >
        <X className="h-4 w-4" />
      </Button>
      
      <div className="flex items-center space-x-3">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
            <span className="text-white text-xl">📷</span>
          </div>
        </div>
        
        <div className="flex-1 text-white">
          <h3 className="font-semibold text-sm">¡Mejora tu fotografía!</h3>
          <p className="text-xs opacity-90">Descubre los mejores cursos y equipos</p>
        </div>
        
        <Button 
          size="sm" 
          className="bg-white text-blue-600 hover:bg-gray-100 text-xs px-3 py-1"
        >
          Ver más
        </Button>
      </div>
    </div>
  );
};

export default ContestAdBanner;
