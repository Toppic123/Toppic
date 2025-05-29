
import { Button } from "@/components/ui/button";
import { Camera, Trophy, Users, Star } from "lucide-react";

interface MobileHomeProps {
  onNavigate: (screen: 'register' | 'login' | 'contests') => void;
}

const MobileHome = ({ onNavigate }: MobileHomeProps) => {
  return (
    <div className="h-full bg-gradient-to-br from-blue-500 to-purple-600 text-white overflow-y-auto">
      <div className="px-6 py-8">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
            <Camera className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold">TOPPICS</h1>
          <p className="text-white/80 text-sm mt-2">Participa en concursos fotográficos cerca de ti y gana premios</p>
        </div>

        {/* CTA Buttons */}
        <div className="space-y-3 mt-12">
          <Button 
            onClick={() => onNavigate('register')}
            className="w-full bg-white text-blue-600 hover:bg-gray-100 font-medium py-3 text-base"
          >
            Crear cuenta
          </Button>
          <Button 
            onClick={() => onNavigate('login')}
            variant="outline" 
            className="w-full border-white text-white hover:bg-white/10 font-medium py-3 text-base border-2"
          >
            Iniciar sesión
          </Button>
        </div>

        {/* Quick Preview */}
        <div className="mt-8 text-center">
          <Button 
            onClick={() => onNavigate('contests')}
            variant="ghost" 
            className="text-white hover:bg-white/10 underline"
          >
            Ver concursos disponibles
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MobileHome;
