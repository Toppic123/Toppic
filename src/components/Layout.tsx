
import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "./Header";
import { useLocation } from "react-router-dom";

const Layout = () => {
  const location = useLocation();
  
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
      <footer className="py-6 px-6 text-center text-sm text-muted-foreground border-t">
        <div className="max-w-7xl mx-auto">
          <p>© {new Date().getFullYear()} Snap Contest Hub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
