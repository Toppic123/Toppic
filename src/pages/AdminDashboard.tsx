
import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { User, Users, Camera, Flag } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import ContestManagement from "@/components/admin/dashboard/ContestManagement";
import { OrganizerManagement } from "@/components/admin/dashboard/organizers";
import UserManagement from "@/components/admin/dashboard/UserManagement";
import SupportMessagesManagement from "@/components/admin/dashboard/SupportMessagesManagement";

const AdminDashboard = () => {
  const { userRole } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Check if user is admin
  useEffect(() => {
    if (userRole !== "admin") {
      toast({
        title: "Acceso denegado",
        description: "No tienes permisos para ver esta página",
        variant: "destructive",
      });
      navigate("/dashboard");
    }
  }, [userRole, navigate, toast]);

  if (userRole !== "admin") {
    return <div className="flex items-center justify-center h-screen">Verificando permisos...</div>;
  }

  return (
    <div className="pt-24 pb-16">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Panel de Administración</h1>
            <p className="text-muted-foreground max-w-2xl">
              Gestiona todos los aspectos de la plataforma desde este panel centralizado.
            </p>
          </div>
        </div>

        <Tabs defaultValue="contests" className="mb-8">
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="contests" className="flex items-center gap-2">
              <Camera size={16} />
              <span>Concursos</span>
            </TabsTrigger>
            <TabsTrigger value="organizers" className="flex items-center gap-2">
              <Flag size={16} />
              <span>Organizadores</span>
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <User size={16} />
              <span>Usuarios</span>
            </TabsTrigger>
            <TabsTrigger value="support" className="flex items-center gap-2">
              <Users size={16} />
              <span>Soporte</span>
            </TabsTrigger>
          </TabsList>

          {/* Contests Tab */}
          <TabsContent value="contests" className="space-y-4">
            <ContestManagement />
          </TabsContent>

          {/* Organizers Tab */}
          <TabsContent value="organizers" className="space-y-4">
            <OrganizerManagement />
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-4">
            <UserManagement />
          </TabsContent>

          {/* Support Messages Tab */}
          <TabsContent value="support" className="space-y-4">
            <SupportMessagesManagement />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
