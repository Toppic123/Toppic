
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Camera, 
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

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
    { name: "Contests", path: "/contests", icon: Award },
    { name: "Organizers", path: "/organizers", icon: Building },
    ...(user ? [{ name: "Profile", path: "/profile", icon: User }] : []),
  ];
  
  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 py-4 transition-all duration-300 border-b",
        isScrolled 
          ? "bg-white border-border/40"
          : "bg-transparent border-transparent"
      )}
    >
      <div className="container max-w-7xl mx-auto px-4 flex items-center justify-between">
        {/* Logo - Always visible */}
        <Link 
          to="/" 
          className="flex items-center space-x-2 z-10"
        >
          <Camera className={cn(
            "w-6 h-6",
            isScrolled ? "text-[#4891AA]" : "text-white"
          )} />
          <span className={cn(
            "font-medium text-lg",
            isScrolled ? "text-[#4891AA]" : "text-white"
          )}>Pix On Air</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={cn(
                "flex items-center text-sm font-medium transition-colors",
                isScrolled
                  ? (location.pathname === item.path
                    ? "text-[#4891AA]"
                    : "text-muted-foreground hover:text-[#4891AA]")
                  : "text-white hover:text-white/80"
              )}
            >
              <item.icon className="mr-2 w-4 h-4" />
              {item.name}
            </Link>
          ))}

          {/* Support Button */}
          <Button asChild variant="ghost" size="sm" className={cn(
            isScrolled 
              ? "text-muted-foreground hover:text-[#4891AA] hover:bg-transparent" 
              : "text-white hover:text-white/80 hover:bg-transparent"
          )}>
            <Link to="/support">
              <HelpCircle className="mr-2 h-4 w-4" />
              <span>Support</span>
            </Link>
          </Button>
          
          {user ? (
            <>
              <Button asChild size="sm" className="rounded-full bg-[#4891AA] text-white hover:bg-[#4891AA]/90">
                <Link to="/upload">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  <span>Upload photo</span>
                </Link>
              </Button>
              <Button 
                onClick={handleSignOut}
                variant="ghost" 
                size="sm" 
                className={cn(
                  "rounded-full",
                  isScrolled 
                    ? "text-muted-foreground hover:text-[#4891AA] hover:bg-transparent" 
                    : "text-white hover:text-white/80 hover:bg-transparent"
                )}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sign out</span>
              </Button>
            </>
          ) : (
            <Button 
              asChild 
              size="sm" 
              className="rounded-full bg-[#4891AA] text-white hover:bg-[#4891AA]/90"
            >
              <Link to="/login">
                <LogIn className="mr-2 h-4 w-4" />
                <span>Log in</span>
              </Link>
            </Button>
          )}
        </nav>
        
        {/* Mobile Menu Button */}
        <button
          className={cn(
            "md:hidden",
            isScrolled ? "text-[#4891AA]" : "text-white"
          )}
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
                      ? "text-[#4891AA]"
                      : "text-muted-foreground hover:text-[#4891AA]",
                  )}
                >
                  <item.icon className="mr-2 w-5 h-5" />
                  {item.name}
                </Link>
              ))}

              {/* Support Button in Mobile Menu */}
              <Link
                to="/support"
                className="flex items-center py-2 text-sm font-medium text-muted-foreground hover:text-[#4891AA] transition-colors"
              >
                <HelpCircle className="mr-2 w-5 h-5" />
                <span>Support</span>
              </Link>
              
              {user ? (
                <>
                  <Button asChild size="sm" className="w-full justify-start rounded-full bg-[#4891AA] text-white hover:bg-[#4891AA]/90">
                    <Link to="/upload">
                      <PlusCircle className="mr-2 h-4 w-4" />
                      <span>Upload photo</span>
                    </Link>
                  </Button>
                  <Button 
                    onClick={handleSignOut}
                    variant="ghost" 
                    size="sm"
                    className="w-full justify-start text-muted-foreground hover:text-[#4891AA]"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign out</span>
                  </Button>
                </>
              ) : (
                <Button 
                  asChild 
                  size="sm"  
                  className="w-full justify-start rounded-full bg-[#4891AA] text-white hover:bg-[#4891AA]/90"
                >
                  <Link to="/login">
                    <LogIn className="mr-2 h-4 w-4" />
                    <span>Log in</span>
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
