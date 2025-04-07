
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { 
  User, Users, Camera, Flag, Settings, Award, Calendar, Plus 
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";

// Mock data for contests
const mockContests = [
  { id: "1", title: "Festival de Primavera", status: "active", organizer: "PictureThis", participants: 24 },
  { id: "2", title: "Concurso Gastronómico", status: "active", organizer: "FoodLens", participants: 38 },
  { id: "3", title: "Mar y Playa", status: "finished", organizer: "CoastalShots", participants: 17 },
  { id: "4", title: "Vida Nocturna", status: "pending", organizer: "NightOwl", participants: 5 },
];

// Mock data for organizers
const mockOrganizers = [
  { id: "1", name: "PictureThis", email: "contact@picturethis.com", contests: 3, status: "active" },
  { id: "2", name: "FoodLens", email: "hello@foodlens.com", contests: 2, status: "active" },
  { id: "3", name: "CoastalShots", email: "info@coastalshots.com", contests: 1, status: "inactive" },
  { id: "4", name: "NightOwl", email: "support@nightowl.com", contests: 1, status: "active" },
];

// Mock data for users
const mockUsers = [
  { id: "1", name: "Ana García", email: "ana@example.com", role: "participant", photos: 12 },
  { id: "2", name: "Juan López", email: "juan@example.com", role: "participant", photos: 8 },
  { id: "3", name: "María Torres", email: "maria@example.com", role: "organizer", photos: 0 },
  { id: "4", name: "Carlos Ruiz", email: "carlos@example.com", role: "participant", photos: 5 },
];

const AdminDashboard = () => {
  const { userRole } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("contests");

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

  // Handle create new contest
  const handleCreateContest = () => {
    toast({
      title: "Función en desarrollo",
      description: "La creación de concursos estará disponible próximamente",
    });
  };

  // Handle edit contest
  const handleEditContest = (contestId: string) => {
    toast({
      title: "Función en desarrollo",
      description: `Editando concurso ${contestId}`,
    });
  };

  // Handle delete contest
  const handleDeleteContest = (contestId: string) => {
    toast({
      title: "Función en desarrollo",
      description: `Eliminando concurso ${contestId}`,
    });
  };

  // Handle edit organizer
  const handleEditOrganizer = (organizerId: string) => {
    toast({
      title: "Función en desarrollo",
      description: `Editando organizador ${organizerId}`,
    });
  };

  // Handle edit user
  const handleEditUser = (userId: string) => {
    toast({
      title: "Función en desarrollo",
      description: `Editando usuario ${userId}`,
    });
  };

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

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid grid-cols-3 mb-8">
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
          </TabsList>

          {/* Contests Tab */}
          <TabsContent value="contests" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Gestión de Concursos</h2>
              <Button onClick={handleCreateContest} className="flex items-center gap-2">
                <Plus size={16} />
                <span>Nuevo Concurso</span>
              </Button>
            </div>
            
            <div className="relative w-full mb-4">
              <Input placeholder="Buscar concursos..." className="w-full" />
            </div>
            
            {mockContests.map(contest => (
              <Card key={contest.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{contest.title}</CardTitle>
                      <CardDescription>Organizado por: {contest.organizer}</CardDescription>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                      contest.status === 'active' ? 'bg-green-100 text-green-800' :
                      contest.status === 'finished' ? 'bg-gray-100 text-gray-800' :
                      'bg-amber-100 text-amber-800'
                    }`}>
                      {contest.status === 'active' ? 'Activo' : 
                       contest.status === 'finished' ? 'Finalizado' : 'Pendiente'}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Users size={16} className="text-muted-foreground" />
                      <span>{contest.participants} participantes</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => handleEditContest(contest.id)}>Editar</Button>
                  <Button variant="destructive" onClick={() => handleDeleteContest(contest.id)}>Eliminar</Button>
                </CardFooter>
              </Card>
            ))}
          </TabsContent>

          {/* Organizers Tab */}
          <TabsContent value="organizers" className="space-y-4">
            <h2 className="text-xl font-semibold">Gestión de Organizadores</h2>
            
            <div className="relative w-full mb-4">
              <Input placeholder="Buscar organizadores..." className="w-full" />
            </div>
            
            <div className="grid gap-4">
              {mockOrganizers.map(organizer => (
                <Card key={organizer.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{organizer.name}</CardTitle>
                        <CardDescription>{organizer.email}</CardDescription>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                        organizer.status === 'active' ? 'bg-green-100 text-green-800' : 
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {organizer.status === 'active' ? 'Activo' : 'Inactivo'}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-muted-foreground" />
                      <span>{organizer.contests} concursos</span>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button variant="outline" onClick={() => handleEditOrganizer(organizer.id)}>
                      Gestionar
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-4">
            <h2 className="text-xl font-semibold">Gestión de Usuarios</h2>
            
            <div className="relative w-full mb-4">
              <Input placeholder="Buscar usuarios..." className="w-full" />
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-muted">
                    <th className="p-3 text-left">Nombre</th>
                    <th className="p-3 text-left">Email</th>
                    <th className="p-3 text-left">Rol</th>
                    <th className="p-3 text-right">Fotos</th>
                    <th className="p-3 text-center">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {mockUsers.map(user => (
                    <tr key={user.id} className="border-b hover:bg-muted/50">
                      <td className="p-3">{user.name}</td>
                      <td className="p-3">{user.email}</td>
                      <td className="p-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          user.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                          user.role === 'organizer' ? 'bg-blue-100 text-blue-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="p-3 text-right">{user.photos}</td>
                      <td className="p-3 text-center">
                        <Button variant="ghost" onClick={() => handleEditUser(user.id)}>
                          <Settings size={16} />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
