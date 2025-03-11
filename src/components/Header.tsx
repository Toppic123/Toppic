
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Camera, 
  User, 
  LogIn, 
  Menu, 
  X, 
  Map, 
  Award, 
  PlusCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
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
  
  const navItems = [
    { name: "Concursos", path: "/contests", icon: Award },
    { name: "Mapa", path: "/contests", icon: Map },
    { name: "Perfil", path: "/profile", icon: User },
  ];
  
  // Simulate logged in state (replace with actual auth check)
  const isLoggedIn = false;
  
  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 py-4 transition-all duration-300 border-b",
        isScrolled 
          ? "bg-background/80 backdrop-blur-lg border-border/40"
          : "bg-transparent border-transparent"
      )}
    >
      <div className="container max-w-7xl mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link 
          to="/" 
          className="flex items-center space-x-2 text-foreground"
        >
          <Camera className="w-6 h-6" />
          <span className="font-medium text-lg">Snap Contest</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={cn(
                "flex items-center text-sm font-medium transition-colors",
                location.pathname === item.path
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <item.icon className="mr-2 w-4 h-4" />
              {item.name}
            </Link>
          ))}
          
          {isLoggedIn ? (
            <Button asChild size="sm" className="rounded-full">
              <Link to="/upload">
                <PlusCircle className="mr-2 h-4 w-4" />
                <span>Subir foto</span>
              </Link>
            </Button>
          ) : (
            <Button asChild size="sm" variant="outline" className="rounded-full">
              <Link to="/login">
                <LogIn className="mr-2 h-4 w-4" />
                <span>Iniciar sesión</span>
              </Link>
            </Button>
          )}
        </nav>
        
        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
          className="md:hidden bg-background border-t"
        >
          <div className="container max-w-7xl mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={cn(
                    "flex items-center py-2 text-sm font-medium transition-colors",
                    location.pathname === item.path
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  <item.icon className="mr-2 w-5 h-5" />
                  {item.name}
                </Link>
              ))}
              
              {isLoggedIn ? (
                <Button asChild size="sm" className="w-full justify-start rounded-full">
                  <Link to="/upload">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    <span>Subir foto</span>
                  </Link>
                </Button>
              ) : (
                <Button asChild size="sm" variant="outline" className="w-full justify-start rounded-full">
                  <Link to="/login">
                    <LogIn className="mr-2 h-4 w-4" />
                    <span>Iniciar sesión</span>
                  </Link>
                </Button>
              )}
            </nav>
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Header;
