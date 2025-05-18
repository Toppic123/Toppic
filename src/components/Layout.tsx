
import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Header from "./Header";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const Layout = () => {
  const location = useLocation();
  const [language, setLanguage] = useState<"es">("es");

  // Footer texts (Now in Spanish as requested)
  const footerTexts = {
    rights: "© TOPPICS. Todos los derechos reservados.",
    privacy: "Política de Privacidad",
    terms: "Términos y Condiciones",
    votingSystem: "Sistema de Votación"
  };
  
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <motion.main 
        key={location.pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="flex-grow"
      >
        <Outlet />
      </motion.main>
      <footer className="py-6 px-6 border-t">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              {footerTexts.rights} {new Date().getFullYear()}
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                {footerTexts.privacy}
              </Link>
              <Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                {footerTexts.terms}
              </Link>
              <Link to="/voting-system" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                {footerTexts.votingSystem}
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
