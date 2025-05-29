
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Home, Search, Camera, Vote, User, X } from "lucide-react";
import { Button } from "@/components/ui/button";

// Import mobile screens
import MobileHome from "@/components/mobile/MobileHome";
import MobileRegister from "@/components/mobile/MobileRegister";
import MobileLogin from "@/components/mobile/MobileLogin";
import MobileContests from "@/components/mobile/MobileContests";
import MobileUpload from "@/components/mobile/MobileUpload";
import MobileVoting from "@/components/mobile/MobileVoting";
import MobileProfile from "@/components/mobile/MobileProfile";
import MobileSwipeVoting from "@/components/mobile/MobileSwipeVoting";

type MobileScreen = 'home' | 'register' | 'login' | 'contests' | 'upload' | 'voting' | 'vote' | 'profile';

const MobilePrototype = () => {
  const [currentScreen, setCurrentScreen] = useState<MobileScreen>('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleNavigation = (screen: MobileScreen) => {
    setCurrentScreen(screen);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentScreen('contests');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentScreen('home');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <MobileHome onNavigate={handleNavigation} />;
      case 'register':
        return <MobileRegister onNavigate={handleNavigation} />;
      case 'login':
        return <MobileLogin onNavigate={handleNavigation} onLogin={handleLogin} />;
      case 'contests':
        return <MobileContests onNavigate={handleNavigation} />;
      case 'upload':
        return <MobileUpload onNavigate={handleNavigation} />;
      case 'voting':
        return <MobileVoting onNavigate={handleNavigation} />;
      case 'vote':
        return <MobileSwipeVoting onNavigate={handleNavigation} />;
      case 'profile':
        return <MobileProfile onNavigate={handleNavigation} onLogout={handleLogout} />;
      default:
        return <MobileHome onNavigate={handleNavigation} />;
    }
  };

  const showBottomNav = isLoggedIn && !['home', 'register', 'login', 'vote'].includes(currentScreen);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      {/* Prototype Info Banner */}
      <div className="fixed top-4 left-4 right-4 z-50">
        <div className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg flex items-center justify-between">
          <span className="text-sm font-medium">📱 Prototipo Interactivo - App Móvil</span>
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-blue-700 h-6 w-6 p-0"
            onClick={() => window.history.back()}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Mobile Device Frame */}
      <div className="relative">
        <div className="w-[375px] h-[812px] bg-black rounded-[3rem] p-2 shadow-2xl">
          {/* Screen */}
          <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden relative">
            {/* Status Bar */}
            <div className="h-11 bg-white flex items-center justify-between px-6 text-black text-sm font-medium">
              <span>9:41</span>
              <div className="flex items-center space-x-1">
                <div className="w-4 h-2 border border-black rounded-sm">
                  <div className="w-2 h-1 bg-black rounded-sm mt-0.5 ml-0.5"></div>
                </div>
              </div>
            </div>

            {/* Screen Content */}
            <div className="flex-1 h-[calc(100%-44px)] relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentScreen}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="h-full"
                >
                  {renderScreen()}
                </motion.div>
              </AnimatePresence>

              {/* Bottom Navigation */}
              {showBottomNav && (
                <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 safe-area-pb">
                  <div className="flex items-center justify-around py-2 px-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`flex flex-col items-center p-2 ${currentScreen === 'home' ? 'text-blue-600' : 'text-gray-500'}`}
                      onClick={() => handleNavigation('home')}
                    >
                      <Home className="h-5 w-5 mb-1" />
                      <span className="text-xs">Inicio</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`flex flex-col items-center p-2 ${currentScreen === 'contests' ? 'text-blue-600' : 'text-gray-500'}`}
                      onClick={() => handleNavigation('contests')}
                    >
                      <Search className="h-5 w-5 mb-1" />
                      <span className="text-xs">Concursos</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`flex flex-col items-center p-2 ${currentScreen === 'upload' ? 'text-blue-600' : 'text-gray-500'}`}
                      onClick={() => handleNavigation('upload')}
                    >
                      <Camera className="h-5 w-5 mb-1" />
                      <span className="text-xs">Subir</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`flex flex-col items-center p-2 ${currentScreen === 'voting' ? 'text-blue-600' : 'text-gray-500'}`}
                      onClick={() => handleNavigation('voting')}
                    >
                      <Vote className="h-5 w-5 mb-1" />
                      <span className="text-xs">Votar</span>
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobilePrototype;
