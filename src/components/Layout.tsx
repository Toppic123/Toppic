
import { Outlet } from "react-router-dom";
import { lazy, Suspense } from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header";

// Lazy load components to improve initial loading time
const Footer = lazy(() => import("./Footer"));

const Layout = () => {
  const location = useLocation();
  
  // Footer texts (in Spanish as requested)
  const footerTexts = {
    rights: "© TOPPIC. Todos los derechos reservados.",
    privacy: "Política de Privacidad",
    terms: "Términos y Condiciones",
    votingSystem: "Sistema de Votación"
  };
  
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Suspense fallback={<div className="py-6 border-t"></div>}>
        <Footer texts={footerTexts} />
      </Suspense>
    </div>
  );
};

export default Layout;
