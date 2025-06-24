
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Home, Search, Upload, Vote, User } from "lucide-react";
import MobileHome from "@/components/mobile/MobileHome";
import MobileContests from "@/components/mobile/MobileContests";
import MobileUpload from "@/components/mobile/MobileUpload";
import MobileEloVoting from "@/components/mobile/MobileEloVoting";
import MobileProfile from "@/components/mobile/MobileProfile";
import MobileVoting from "@/components/mobile/MobileVoting";
import MobileGalleryHome from "@/components/mobile/MobileGalleryHome";
import MobileSimpleLogin from "@/components/mobile/MobileSimpleLogin";

type Screen = 'home' | 'contests' | 'upload' | 'vote' | 'profile' | 'voting' | 'gallery' | 'login';

const MobilePrototype = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');

  const handleNavigate = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <MobileHome onNavigate={handleNavigate} />;
      case 'contests':
        return <MobileContests onNavigate={handleNavigate} />;
      case 'upload':
        return <MobileUpload onNavigate={handleNavigate} />;
      case 'vote':
        return <MobileEloVoting onNavigate={handleNavigate} />;
      case 'profile':
        return <MobileProfile onNavigate={handleNavigate} />;
      case 'voting':
        return <MobileVoting onNavigate={handleNavigate} />;
      case 'gallery':
        return <MobileGalleryHome onNavigate={handleNavigate} />;
      case 'login':
        return <MobileSimpleLogin onNavigate={handleNavigate} />;
      default:
        return <MobileHome onNavigate={handleNavigate} />;
    }
  };

  const isActiveScreen = (screen: Screen) => currentScreen === screen;

  return (
    <div className="max-w-sm mx-auto h-screen bg-white shadow-xl relative">
      {/* Screen Content */}
      <div className="h-full pb-16">
        {renderScreen()}
      </div>

      {/* Bottom Navigation */}
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-2">
        <div className="flex justify-around">
          <Button
            variant={isActiveScreen('home') ? 'default' : 'ghost'}
            size="sm"
            onClick={() => handleNavigate('home')}
            className={`flex flex-col items-center h-12 px-3 ${
              isActiveScreen('home') 
                ? 'bg-blue-600 text-white hover:bg-blue-700' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Home size={18} />
            <span className="text-xs mt-1">Inicio</span>
          </Button>

          <Button
            variant={isActiveScreen('contests') ? 'default' : 'ghost'}
            size="sm"
            onClick={() => handleNavigate('contests')}
            className={`flex flex-col items-center h-12 px-3 ${
              isActiveScreen('contests') 
                ? 'bg-blue-600 text-white hover:bg-blue-700' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Search size={18} />
            <span className="text-xs mt-1">Explorar</span>
          </Button>

          <Button
            variant={isActiveScreen('upload') ? 'default' : 'ghost'}
            size="sm"
            onClick={() => handleNavigate('upload')}
            className={`flex flex-col items-center h-12 px-3 ${
              isActiveScreen('upload') 
                ? 'bg-blue-600 text-white hover:bg-blue-700' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Upload size={18} />
            <span className="text-xs mt-1">Subir</span>
          </Button>

          <Button
            variant={isActiveScreen('vote') ? 'default' : 'ghost'}
            size="sm"
            onClick={() => handleNavigate('vote')}
            className={`flex flex-col items-center h-12 px-3 ${
              isActiveScreen('vote') 
                ? 'bg-blue-600 text-white hover:bg-blue-700' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Vote size={18} />
            <span className="text-xs mt-1">Votar</span>
          </Button>

          <Button
            variant={isActiveScreen('profile') ? 'default' : 'ghost'}
            size="sm"
            onClick={() => handleNavigate('profile')}
            className={`flex flex-col items-center h-12 px-3 ${
              isActiveScreen('profile') 
                ? 'bg-blue-600 text-white hover:bg-blue-700' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <User size={18} />
            <span className="text-xs mt-1">Perfil</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MobilePrototype;
