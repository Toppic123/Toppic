
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, User, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const MobileHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#4891AA] text-white border-b border-white/10">
        <div className="px-4 py-3 flex items-center justify-between">
          <Link to="/" className="text-xl font-bold">
            TOPPICS
          </Link>
          
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2"
            aria-label="Menú"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-50" onClick={() => setIsMenuOpen(false)}>
          <div 
            className="fixed top-0 right-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 ease-in-out"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-6 pt-20">
              <nav className="space-y-4">
                <Link
                  to="/contests"
                  className={cn(
                    "block py-3 px-4 rounded-lg text-lg font-medium transition-colors",
                    location.pathname === "/contests"
                      ? "bg-[#4891AA] text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Concursos
                </Link>
                
                <Link
                  to="/gallery"
                  className={cn(
                    "block py-3 px-4 rounded-lg text-lg font-medium transition-colors",
                    location.pathname === "/gallery"
                      ? "bg-[#4891AA] text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Galería
                </Link>

                {user && (
                  <>
                    <Link
                      to="/profile"
                      className={cn(
                        "block py-3 px-4 rounded-lg text-lg font-medium transition-colors",
                        location.pathname === "/profile"
                          ? "bg-[#4891AA] text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      )}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <User className="inline mr-2 w-5 h-5" />
                      Mi Perfil
                    </Link>
                    
                    <Button
                      onClick={handleSignOut}
                      variant="ghost"
                      className="w-full justify-start text-left py-3 px-4 h-auto text-lg font-medium text-gray-700 hover:bg-gray-100"
                    >
                      <LogOut className="mr-2 w-5 h-5" />
                      Cerrar Sesión
                    </Button>
                  </>
                )}

                {!user && (
                  <div className="space-y-3 pt-4">
                    <Button
                      asChild
                      className="w-full bg-[#4891AA] hover:bg-[#4891AA]/90 text-white rounded-lg py-3 text-lg font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Link to="/login">Iniciar Sesión</Link>
                    </Button>
                    
                    <Button
                      asChild
                      variant="outline"
                      className="w-full border-[#4891AA] text-[#4891AA] hover:bg-[#4891AA] hover:text-white rounded-lg py-3 text-lg font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Link to="/register">Registrarse</Link>
                    </Button>
                  </div>
                )}
              </nav>
            </div>
          </div>
        </div>
      )}
      
      {/* Spacer for fixed header */}
      <div className="h-16"></div>
    </>
  );
};

export default MobileHeader;
