
import { useState, useEffect, memo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  User, 
  LogIn, 
  Menu, 
  X, 
  Award, 
  PlusCircle,
  Building,
  HelpCircle,
  LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { PointsDisplay } from "@/components/PointsDisplay";
import { PointsPurchaseDialog } from "@/components/PointsPurchaseDialog";

// Use memo for better performance
const MobileMenu = memo(({ 
  isOpen, 
  onClose, 
  navItems, 
  user, 
  onSignOut, 
  isScrolled 
}: any) => {
  if (!isOpen) return null;
  
  return (
    <div
      className="md:hidden fixed inset-0 z-40 bg-background/95 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="h-full max-w-sm w-full bg-background border-r border-border p-6 shadow-lg"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-8">
          <div className="text-2xl font-bold text-primary">TOPPIC</div>
          <button
            className="text-muted-foreground"
            onClick={onClose}
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <nav className="flex flex-col space-y-4">
          {navItems.map((item: any) => (
            <Link
              key={item.name}
              to={item.path}
              className={cn(
                "flex items-center py-2 text-lg font-bold uppercase transition-colors",
                location.pathname === item.path
                  ? "text-primary"
                  : "text-muted-foreground hover:text-primary",
              )}
            >
              {item.name}
            </Link>
          ))}

          <Link
            to="/support"
            className="flex items-center py-2 text-lg font-bold uppercase text-muted-foreground hover:text-primary transition-colors"
          >
            <span>CONTACTO</span>
          </Link>
          
          {user ? (
            <>
              <Button asChild size="sm" className="w-full justify-start rounded-full bg-primary text-primary-foreground hover:bg-primary/90 mt-4 text-lg font-bold">
                <Link to="/upload">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  <span>SUBIR FOTO</span>
                </Link>
              </Button>
              <Button 
                onClick={onSignOut}
                variant="ghost" 
                size="sm"
                className="w-full justify-start text-muted-foreground hover:text-primary mt-2 font-bold"
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>CERRAR SESIÓN</span>
              </Button>
            </>
          ) : (
            <Button 
              asChild 
              size="sm"  
              className="w-full justify-start rounded-full bg-primary text-primary-foreground hover:bg-primary/90 mt-4 text-lg font-bold"
            >
              <Link to="/login">
                <LogIn className="mr-2 h-4 w-4" />
                <span>INICIAR SESIÓN</span>
              </Link>
            </Button>
          )}
        </nav>
      </div>
    </div>
  );
});

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showPointsPurchase, setShowPointsPurchase] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  
  // Change header style on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  // Close mobile menu when changing routes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };
  
  const navItems = [
    { name: "CONCURSOS", path: "/contests", icon: Award },
    { name: "ORGANIZADORES", path: "/organizers", icon: Building },
    ...(user ? [{ name: "PERFIL", path: "/profile", icon: User }] : []),
  ];
  
  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 py-3 transition-all duration-300 border-b",
        isScrolled 
          ? "bg-white/95 backdrop-blur-sm border-border/40 shadow-sm"
          : "bg-transparent border-transparent"
      )}
    >
      <div className="container max-w-7xl mx-auto px-4 flex items-center justify-between">
        {/* Project name instead of Logo */}
        <Link to="/" className="flex items-center gap-2">
          <h1 className="text-2xl font-bold tracking-tight transition-transform hover:scale-105 text-primary">
            TOPPIC
          </h1>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={cn(
                "flex items-center text-lg font-bold uppercase transition-colors tracking-wide",
                isScrolled
                  ? (location.pathname === item.path
                    ? "text-primary"
                    : "text-muted-foreground hover:text-primary")
                  : "text-white hover:text-white/80"
              )}
            >
              {item.name}
            </Link>
          ))}

          {/* Support Button */}
          <Button asChild variant="ghost" size="sm" className={cn(
            "uppercase tracking-wide font-bold text-lg",
            isScrolled 
              ? "text-muted-foreground hover:text-primary hover:bg-transparent"
              : "text-white hover:text-white/80 hover:bg-transparent"
          )}>
            <Link to="/support">
            <span>CONTACTO</span>
            </Link>
          </Button>
          
          {user ? (
            <>
              <PointsDisplay 
                variant="compact" 
                onPurchaseClick={() => setShowPointsPurchase(true)} 
              />
              <Button asChild size="sm" className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 uppercase text-xl font-bold px-6 py-3">
                <Link to="/upload">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  <span>SUBIR FOTO</span>
                </Link>
              </Button>
              <Button 
                onClick={handleSignOut}
                variant="ghost" 
                size="sm" 
                className={cn(
                  "rounded-full uppercase font-bold",
                  isScrolled 
                    ? "text-muted-foreground hover:text-primary hover:bg-transparent" 
                    : "text-white hover:text-white/80 hover:bg-transparent"
                )}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>CERRAR SESIÓN</span>
              </Button>
            </>
          ) : (
            <Button 
              asChild 
              size="sm" 
              className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 uppercase text-xl font-bold px-6 py-3"
            >
              <Link to="/login">
                <LogIn className="mr-2 h-4 w-4" />
                <span>INICIAR SESIÓN</span>
              </Link>
            </Button>
          )}
        </nav>
        
        {/* Mobile Menu Button */}
        <button
          className={cn(
            "md:hidden",
            isScrolled ? "text-primary" : "text-white"
          )}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>
      
      {/* Mobile Menu - Now using a memo component */}
      <MobileMenu 
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        navItems={navItems}
        user={user}
        onSignOut={handleSignOut}
        isScrolled={isScrolled}
      />
      
      {/* Points Purchase Dialog */}
      <PointsPurchaseDialog 
        isOpen={showPointsPurchase}
        onOpenChange={setShowPointsPurchase}
      />
    </header>
  );
};

export default Header;
