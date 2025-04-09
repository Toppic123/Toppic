
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const DashboardSettings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    toast({
      title: "Redirigiendo al perfil",
      description: "La configuración ahora está disponible en tu perfil de usuario.",
    });
    
    // Redirect to profile page
    navigate("/profile");
  }, [navigate, toast]);

  return (
    <div className="container py-10 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Redirigiendo...</h1>
        <p className="text-muted-foreground">La página de configuración ha sido integrada en el perfil de usuario.</p>
      </div>
    </div>
  );
};

export default DashboardSettings;
