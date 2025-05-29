
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
          <h1 className="text-2xl font-bold">SnapContest</h1>
          <p className="text-white/80 text-sm">Compite con tus mejores fotos</p>
        </div>

        {/* Features */}
        <div className="space-y-4 mb-8">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <Trophy className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-medium">Concursos locales</h3>
              <p className="text-white/70 text-sm">Participa en tu ciudad</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-medium">Comunidad</h3>
              <p className="text-white/70 text-sm">Conecta con fotógrafos</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <Star className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-medium">Premios</h3>
              <p className="text-white/70 text-sm">Gana reconocimiento</p>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="space-y-3">
          <Button 
            onClick={() => onNavigate('register')}
            className="w-full bg-white text-blue-600 hover:bg-gray-100 font-medium py-3"
          >
            Crear cuenta
          </Button>
          <Button 
            onClick={() => onNavigate('login')}
            variant="outline" 
            className="w-full border-white text-white hover:bg-white/10 font-medium py-3"
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
