
import { Link, useLocation } from "react-router-dom";
import { Home, Award, Camera, User, Image } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

const MobileFooter = () => {
  const location = useLocation();
  const { user } = useAuth();

  const navItems = [
    { name: "Inicio", path: "/", icon: Home },
    { name: "Concursos", path: "/contests", icon: Award },
    { name: "Subir", path: "/upload", icon: Camera, requireAuth: true },
    { name: "Galería", path: "/gallery", icon: Image },
    { name: "Perfil", path: user ? "/profile" : "/login", icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40">
      <div className="flex justify-around items-center py-2">
        {navItems.map((item) => {
          // Si requiere autenticación y no hay usuario, no mostrar el item
          if (item.requireAuth && !user) {
            return null;
          }

          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.name}
              to={item.path}
              className={cn(
                "flex flex-col items-center justify-center py-2 px-3 rounded-lg transition-colors min-w-0 flex-1",
                isActive
                  ? "text-[#4891AA]"
                  : "text-gray-500 hover:text-[#4891AA]"
              )}
            >
              <item.icon className={cn("w-6 h-6 mb-1", isActive && "text-[#4891AA]")} />
              <span className="text-xs font-medium truncate">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileFooter;
