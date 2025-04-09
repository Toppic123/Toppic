
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const DashboardSettings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Show toast and redirect to profile page immediately
    toast({
      title: "Redirigiendo al perfil",
      description: "La configuración ahora está disponible en tu perfil de usuario.",
    });
    
    // Redirect to profile page
    navigate("/profile");
  }, [navigate, toast]);

  return null; // No need to render anything as we're redirecting immediately
};

export default DashboardSettings;
