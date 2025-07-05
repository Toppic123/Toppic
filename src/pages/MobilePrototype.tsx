
import { useState } from "react";
import MobileHome from "@/components/mobile/MobileHome";
import MobileContests from "@/components/mobile/MobileContests";
import MobileUpload from "@/components/mobile/MobileUpload";
import MobileVoting from "@/components/mobile/MobileVoting";
import MobileSwipeVoting from "@/components/mobile/MobileSwipeVoting";
import MobileProfile from "@/components/mobile/MobileProfile";
import MobileLogin from "@/components/mobile/MobileLogin";
import MobileRegister from "@/components/mobile/MobileRegister";
import MobileGalleryHome from "@/components/mobile/MobileGalleryHome";

type Screen = 'home' | 'contests' | 'upload' | 'voting' | 'vote' | 'profile' | 'login' | 'register' | 'gallery' | 'settings';

const MobilePrototype = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [currentContestId, setCurrentContestId] = useState<string | undefined>(undefined);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  console.log('MobilePrototype - currentScreen:', currentScreen);
  console.log('MobilePrototype - currentContestId:', currentContestId);

  const navigateToScreen = (screen: Screen, contestId?: string) => {
    console.log('MobilePrototype - navigating to:', screen, 'with contestId:', contestId);
    setCurrentScreen(screen);
    if (contestId) {
      setCurrentContestId(contestId);
    }
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <MobileHome onNavigate={navigateToScreen} />;
      case 'contests':
        return <MobileContests onNavigate={navigateToScreen} />;
      case 'upload':
        return <MobileUpload onNavigate={navigateToScreen} contestId={currentContestId} />;
      case 'voting':
        return <MobileVoting onNavigate={navigateToScreen} contestId={currentContestId} />;
      case 'vote':
        return <MobileSwipeVoting onNavigate={navigateToScreen} contestId={currentContestId} />;
      case 'profile':
        return <MobileProfile onNavigate={navigateToScreen} />;
      case 'login':
        return <MobileLogin onNavigate={navigateToScreen} onLogin={handleLogin} />;
      case 'register':
        return <MobileRegister onNavigate={navigateToScreen} />;
      case 'gallery':
        return <MobileGalleryHome onNavigate={navigateToScreen} />;
      case 'settings':
        return <MobileProfile onNavigate={navigateToScreen} />;
      default:
        return <MobileHome onNavigate={navigateToScreen} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-sm mx-auto bg-white min-h-screen relative overflow-hidden">
        {renderScreen()}
        
        {/* Bottom Navigation - only show on main screens */}
        {['home', 'contests', 'voting', 'profile', 'gallery'].includes(currentScreen) && (
          <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-sm bg-white border-t border-gray-200">
            <div className="flex justify-around items-center py-2">
              <button
                onClick={() => navigateToScreen('home')}
                className={`flex flex-col items-center py-2 px-3 ${
                  currentScreen === 'home' ? 'text-blue-600' : 'text-gray-600'
                }`}
              >
                <span className="text-xl mb-1">🏠</span>
                <span className="text-xs">Inicio</span>
              </button>
              <button
                onClick={() => navigateToScreen('contests')}
                className={`flex flex-col items-center py-2 px-3 ${
                  currentScreen === 'contests' ? 'text-blue-600' : 'text-gray-600'
                }`}
              >
                <span className="text-xl mb-1">🏆</span>
                <span className="text-xs">Concursos</span>
              </button>
              <button
                onClick={() => navigateToScreen('voting')}
                className={`flex flex-col items-center py-2 px-3 ${
                  currentScreen === 'voting' ? 'text-blue-600' : 'text-gray-600'
                }`}
              >
                <span className="text-xl mb-1">📸</span>
                <span className="text-xs">Fotos</span>
              </button>
              <button
                onClick={() => navigateToScreen('gallery')}
                className={`flex flex-col items-center py-2 px-3 ${
                  currentScreen === 'gallery' ? 'text-blue-600' : 'text-gray-600'
                }`}
              >
                <span className="text-xl mb-1">🖼️</span>
                <span className="text-xs">Galería</span>
              </button>
              <button
                onClick={() => navigateToScreen('profile')}
                className={`flex flex-col items-center py-2 px-3 ${
                  currentScreen === 'profile' ? 'text-blue-600' : 'text-gray-600'
                }`}
              >
                <span className="text-xl mb-1">👤</span>
                <span className="text-xs">Perfil</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MobilePrototype;
