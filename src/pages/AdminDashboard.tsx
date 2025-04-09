
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { 
  User, Users, Camera, Flag, Settings, Award, Calendar, Plus, Trash, Edit, Eye, CheckCircle, XCircle
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";

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

// Mock data for support messages
const mockSupportMessages = [
  { 
    id: "1",
    name: "Javier Méndez",
    email: "javier@example.com",
    subject: "Problema con la subida de fotos",
    message: "No puedo subir fotos desde mi móvil. Me aparece un error cada vez que intento participar en un concurso.",
    date: new Date(2025, 3, 5),
    status: "pending"
  },
  { 
    id: "2",
    name: "Laura Fernández",
    email: "laura@example.com",
    subject: "Consulta sobre premios",
    message: "¿Cómo puedo reclamar mi premio después de ganar un concurso? No he recibido ninguna notificación.",
    date: new Date(2025, 3, 2),
    status: "resolved"
  },
  { 
    id: "3",
    name: "Miguel Ángel Rodríguez",
    email: "miguel@example.com",
    subject: "Solicitud de reembolso",
    message: "Pagué por error la suscripción premium dos veces en el mismo mes. ¿Es posible obtener un reembolso?",
    date: new Date(2025, 3, 1),
    status: "pending"
  }
];

// Contest form state type
type ContestFormData = {
  title: string;
  organizer: string;
  startDate: string;
  endDate: string;
  description: string;
  status: "active" | "pending" | "finished";
  maxParticipants: number;
  photoOwnership: boolean;
  commercialUse: boolean;
};

// Organizer form state type
type OrganizerFormData = {
  name: string;
  email: string;
  plan: "basic" | "professional" | "premium";
  status: "active" | "inactive";
};

// User form state type
type UserFormData = {
  name: string;
  email: string;
  role: "participant" | "organizer" | "admin";
};

const AdminDashboard = () => {
  const { userRole } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("contests");
  
  const [isEditContestDialogOpen, setIsEditContestDialogOpen] = useState(false);
  const [isEditOrganizerDialogOpen, setIsEditOrganizerDialogOpen] = useState(false);
  const [isEditUserDialogOpen, setIsEditUserDialogOpen] = useState(false);
  const [isViewMessageDialogOpen, setIsViewMessageDialogOpen] = useState(false);

  const [contestFormData, setContestFormData] = useState<ContestFormData>({
    title: "",
    organizer: "",
    startDate: "",
    endDate: "",
    description: "",
    status: "pending",
    maxParticipants: 100,
    photoOwnership: true,
    commercialUse: true
  });

  const [organizerFormData, setOrganizerFormData] = useState<OrganizerFormData>({
    name: "",
    email: "",
    plan: "basic",
    status: "active"
  });

  const [userFormData, setUserFormData] = useState<UserFormData>({
    name: "",
    email: "",
    role: "participant"
  });

  const [selectedMessageId, setSelectedMessageId] = useState<string | null>(null);
  const [filteredContests, setFilteredContests] = useState(mockContests);
  const [filteredOrganizers, setFilteredOrganizers] = useState(mockOrganizers);
  const [filteredUsers, setFilteredUsers] = useState(mockUsers);
  const [filteredMessages, setFilteredMessages] = useState(mockSupportMessages);
  const [searchQuery, setSearchQuery] = useState("");

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

  // Handle contest search
  const handleContestSearch = (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setFilteredContests(mockContests);
      return;
    }
    const filtered = mockContests.filter(contest => 
      contest.title.toLowerCase().includes(query.toLowerCase()) ||
      contest.organizer.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredContests(filtered);
  };

  // Handle organizer search
  const handleOrganizerSearch = (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setFilteredOrganizers(mockOrganizers);
      return;
    }
    const filtered = mockOrganizers.filter(organizer => 
      organizer.name.toLowerCase().includes(query.toLowerCase()) ||
      organizer.email.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredOrganizers(filtered);
  };

  // Handle user search
  const handleUserSearch = (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setFilteredUsers(mockUsers);
      return;
    }
    const filtered = mockUsers.filter(user => 
      user.name.toLowerCase().includes(query.toLowerCase()) ||
      user.email.toLowerCase().includes(query.toLowerCase()) ||
      user.role.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredUsers(filtered);
  };
  
  // Handle support message search
  const handleMessageSearch = (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setFilteredMessages(mockSupportMessages);
      return;
    }
    const filtered = mockSupportMessages.filter(message => 
      message.name.toLowerCase().includes(query.toLowerCase()) ||
      message.email.toLowerCase().includes(query.toLowerCase()) ||
      message.subject.toLowerCase().includes(query.toLowerCase()) ||
      message.message.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredMessages(filtered);
  };

  // Handle edit contest
  const handleEditContest = (contestId: string) => {
    const contest = mockContests.find(c => c.id === contestId);
    if (contest) {
      setContestFormData({
        title: contest.title,
        organizer: contest.organizer,
        startDate: "2024-04-15",
        endDate: "2024-05-15",
        description: "Contest description goes here...",
        status: contest.status as "active" | "pending" | "finished",
        maxParticipants: contest.participants,
        photoOwnership: true,
        commercialUse: true
      });
      setIsEditContestDialogOpen(true);
    }
  };

  // Handle save contest changes
  const handleSaveContestChanges = () => {
    setIsEditContestDialogOpen(false);
    toast({
      title: "Cambios guardados",
      description: "Los cambios en el concurso han sido guardados correctamente.",
    });
  };

  // Handle delete contest
  const handleDeleteContest = (contestId: string) => {
    toast({
      title: "Concurso eliminado",
      description: `El concurso ha sido eliminado correctamente.`,
    });
    setFilteredContests(filteredContests.filter(c => c.id !== contestId));
  };

  // Handle edit organizer
  const handleEditOrganizer = (organizerId: string) => {
    const organizer = mockOrganizers.find(o => o.id === organizerId);
    if (organizer) {
      setOrganizerFormData({
        name: organizer.name,
        email: organizer.email,
        plan: "basic",
        status: organizer.status as "active" | "inactive"
      });
      setIsEditOrganizerDialogOpen(true);
    }
  };

  // Handle save organizer changes
  const handleSaveOrganizerChanges = () => {
    setIsEditOrganizerDialogOpen(false);
    toast({
      title: "Cambios guardados",
      description: "Los cambios en el organizador han sido guardados correctamente.",
    });
  };

  // Handle edit user
  const handleEditUser = (userId: string) => {
    const user = mockUsers.find(u => u.id === userId);
    if (user) {
      setUserFormData({
        name: user.name,
        email: user.email,
        role: user.role as "participant" | "organizer" | "admin"
      });
      setIsEditUserDialogOpen(true);
    }
  };

  // Handle save user changes
  const handleSaveUserChanges = () => {
    setIsEditUserDialogOpen(false);
    toast({
      title: "Cambios guardados",
      description: "Los cambios en el usuario han sido guardados correctamente.",
    });
  };

  // Handle view support message
  const handleViewMessage = (messageId: string) => {
    setSelectedMessageId(messageId);
    setIsViewMessageDialogOpen(true);
  };

  // Handle mark support message as resolved
  const handleMarkAsResolved = (messageId: string) => {
    setFilteredMessages(filteredMessages.map(m => 
      m.id === messageId ? { ...m, status: "resolved" } : m
    ));
    toast({
      title: "Mensaje marcado como resuelto",
      description: "El mensaje de soporte ha sido marcado como resuelto.",
    });
    setIsViewMessageDialogOpen(false);
  };
  
  // Get selected message details
  const selectedMessage = mockSupportMessages.find(m => m.id === selectedMessageId);

  // Format date function
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
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
              <Award size={16} />
              <span>Soporte</span>
            </TabsTrigger>
          </TabsList>

          {/* Contests Tab */}
          <TabsContent value="contests" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Gestión de Concursos</h2>
              <Button onClick={() => {
                setContestFormData({
                  title: "",
                  organizer: "",
                  startDate: "",
                  endDate: "",
                  description: "",
                  status: "pending",
                  maxParticipants: 100,
                  photoOwnership: true,
                  commercialUse: true
                });
                setIsEditContestDialogOpen(true);
              }} className="flex items-center gap-2">
                <Plus size={16} />
                <span>Nuevo Concurso</span>
              </Button>
            </div>
            
            <div className="relative w-full mb-4">
              <Input 
                placeholder="Buscar concursos..." 
                className="w-full" 
                value={searchQuery}
                onChange={(e) => handleContestSearch(e.target.value)}
              />
            </div>
            
            {filteredContests.map(contest => (
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
                  <Button variant="outline" onClick={() => handleEditContest(contest.id)}>
                    <Edit size={16} className="mr-1" />
                    Editar
                  </Button>
                  <Button variant="destructive" onClick={() => handleDeleteContest(contest.id)}>
                    <Trash size={16} className="mr-1" />
                    Eliminar
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </TabsContent>

          {/* Organizers Tab */}
          <TabsContent value="organizers" className="space-y-4">
            <h2 className="text-xl font-semibold">Gestión de Organizadores</h2>
            
            <div className="relative w-full mb-4">
              <Input 
                placeholder="Buscar organizadores..." 
                className="w-full"
                value={searchQuery}
                onChange={(e) => handleOrganizerSearch(e.target.value)}
              />
            </div>
            
            <div className="grid gap-4">
              {filteredOrganizers.map(organizer => (
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
                    <Button 
                      variant="outline" 
                      onClick={() => handleEditOrganizer(organizer.id)}
                      className="flex items-center"
                    >
                      <Settings size={16} className="mr-2" />
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
              <Input 
                placeholder="Buscar usuarios..." 
                className="w-full"
                value={searchQuery}
                onChange={(e) => handleUserSearch(e.target.value)}
              />
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
                  {filteredUsers.map(user => (
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
                        <Button 
                          variant="ghost" 
                          onClick={() => handleEditUser(user.id)}
                          className="h-8 w-8 p-0"
                        >
                          <Edit size={16} />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>

          {/* Support Messages Tab */}
          <TabsContent value="support" className="space-y-4">
            <h2 className="text-xl font-semibold">Mensajes de Soporte</h2>
            
            <div className="relative w-full mb-4">
              <Input 
                placeholder="Buscar mensajes..." 
                className="w-full"
                value={searchQuery}
                onChange={(e) => handleMessageSearch(e.target.value)}
              />
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-muted">
                    <th className="p-3 text-left">Remitente</th>
                    <th className="p-3 text-left">Asunto</th>
                    <th className="p-3 text-left">Fecha</th>
                    <th className="p-3 text-left">Estado</th>
                    <th className="p-3 text-center">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMessages.map(message => (
                    <tr key={message.id} className="border-b hover:bg-muted/50">
                      <td className="p-3">
                        <div>
                          <p className="font-medium">{message.name}</p>
                          <p className="text-xs text-muted-foreground">{message.email}</p>
                        </div>
                      </td>
                      <td className="p-3">{message.subject}</td>
                      <td className="p-3">{formatDate(message.date)}</td>
                      <td className="p-3">
                        <Badge variant={message.status === "pending" ? "outline" : "secondary"}>
                          {message.status === "pending" ? "Pendiente" : "Resuelto"}
                        </Badge>
                      </td>
                      <td className="p-3 text-center">
                        <Button 
                          variant="ghost" 
                          onClick={() => handleViewMessage(message.id)}
                          className="h-8 w-8 p-0"
                        >
                          <Eye size={16} />
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

      {/* Edit Contest Dialog */}
      <Dialog open={isEditContestDialogOpen} onOpenChange={setIsEditContestDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{contestFormData.title ? "Editar Concurso" : "Crear Nuevo Concurso"}</DialogTitle>
            <DialogDescription>
              {contestFormData.title ? "Modifica los detalles del concurso seleccionado." : "Introduce los datos para el nuevo concurso."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label htmlFor="title">Título</Label>
                <Input
                  id="title"
                  value={contestFormData.title}
                  onChange={(e) => setContestFormData({...contestFormData, title: e.target.value})}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="organizer">Organizador</Label>
                <Select 
                  value={contestFormData.organizer}
                  onValueChange={(value) => setContestFormData({...contestFormData, organizer: value})}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Seleccionar organizador" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PictureThis">PictureThis</SelectItem>
                    <SelectItem value="FoodLens">FoodLens</SelectItem>
                    <SelectItem value="CoastalShots">CoastalShots</SelectItem>
                    <SelectItem value="NightOwl">NightOwl</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="description">Descripción</Label>
                <Textarea
                  id="description"
                  value={contestFormData.description}
                  onChange={(e) => setContestFormData({...contestFormData, description: e.target.value})}
                  className="mt-1"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="startDate">Fecha de inicio</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={contestFormData.startDate}
                    onChange={(e) => setContestFormData({...contestFormData, startDate: e.target.value})}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="endDate">Fecha de fin</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={contestFormData.endDate}
                    onChange={(e) => setContestFormData({...contestFormData, endDate: e.target.value})}
                    className="mt-1"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="status">Estado</Label>
                  <Select 
                    value={contestFormData.status}
                    onValueChange={(value: "active" | "pending" | "finished") => 
                      setContestFormData({...contestFormData, status: value})
                    }
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Seleccionar estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pendiente</SelectItem>
                      <SelectItem value="active">Activo</SelectItem>
                      <SelectItem value="finished">Finalizado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="maxParticipants">Participantes máximos</Label>
                  <Input
                    id="maxParticipants"
                    type="number"
                    value={contestFormData.maxParticipants}
                    onChange={(e) => setContestFormData({...contestFormData, maxParticipants: parseInt(e.target.value)})}
                    className="mt-1"
                  />
                </div>
              </div>
              
              <Separator className="my-2" />
              
              <h3 className="text-sm font-semibold">Configuración de propiedad y uso</h3>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="photoOwnership"
                  checked={contestFormData.photoOwnership}
                  onCheckedChange={(checked) => setContestFormData({...contestFormData, photoOwnership: checked})}
                />
                <Label htmlFor="photoOwnership">Transferir propiedad de las fotos al organizador</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="commercialUse"
                  checked={contestFormData.commercialUse}
                  onCheckedChange={(checked) => setContestFormData({...contestFormData, commercialUse: checked})}
                />
                <Label htmlFor="commercialUse">Permitir uso comercial de las fotos ganadoras</Label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditContestDialogOpen(false)}>Cancelar</Button>
            <Button onClick={handleSaveContestChanges}>Guardar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Organizer Dialog */}
      <Dialog open={isEditOrganizerDialogOpen} onOpenChange={setIsEditOrganizerDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Editar Organizador</DialogTitle>
            <DialogDescription>
              Modifica los detalles del organizador seleccionado.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div>
              <Label htmlFor="orgName">Nombre</Label>
              <Input
                id="orgName"
                value={organizerFormData.name}
                onChange={(e) => setOrganizerFormData({...organizerFormData, name: e.target.value})}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="orgEmail">Email</Label>
              <Input
                id="orgEmail"
                type="email"
                value={organizerFormData.email}
                onChange={(e) => setOrganizerFormData({...organizerFormData, email: e.target.value})}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="orgPlan">Plan</Label>
              <Select 
                value={organizerFormData.plan}
                onValueChange={(value: "basic" | "professional" | "premium") => 
                  setOrganizerFormData({...organizerFormData, plan: value})
                }
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Seleccionar plan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="basic">Basic - 29€</SelectItem>
                  <SelectItem value="professional">Professional - 79€</SelectItem>
                  <SelectItem value="premium">Premium - 149€</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="orgStatus">Estado</Label>
              <Select 
                value={organizerFormData.status}
                onValueChange={(value: "active" | "inactive") => 
                  setOrganizerFormData({...organizerFormData, status: value})
                }
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Seleccionar estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Activo</SelectItem>
                  <SelectItem value="inactive">Inactivo</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditOrganizerDialogOpen(false)}>Cancelar</Button>
            <Button onClick={handleSaveOrganizerChanges}>Guardar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog open={isEditUserDialogOpen} onOpenChange={setIsEditUserDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Editar Usuario</DialogTitle>
            <DialogDescription>
              Modifica los detalles del usuario seleccionado.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div>
              <Label htmlFor="userName">Nombre</Label>
              <Input
                id="userName"
                value={userFormData.name}
                onChange={(e) => setUserFormData({...userFormData, name: e.target.value})}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="userEmail">Email</Label>
              <Input
                id="userEmail"
                type="email"
                value={userFormData.email}
                onChange={(e) => setUserFormData({...userFormData, email: e.target.value})}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="userRole">Rol</Label>
              <Select 
                value={userFormData.role}
                onValueChange={(value: "participant" | "organizer" | "admin") => 
                  setUserFormData({...userFormData, role: value})
                }
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Seleccionar rol" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="participant">Participante</SelectItem>
                  <SelectItem value="organizer">Organizador</SelectItem>
                  <SelectItem value="admin">Administrador</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditUserDialogOpen(false)}>Cancelar</Button>
            <Button onClick={handleSaveUserChanges}>Guardar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Support Message Dialog */}
      <Dialog open={isViewMessageDialogOpen} onOpenChange={setIsViewMessageDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Mensaje de Soporte</DialogTitle>
            <DialogDescription>
              Detalles del mensaje seleccionado.
            </DialogDescription>
          </DialogHeader>
          {selectedMessage && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm text-muted-foreground">Remitente</Label>
                  <p className="font-medium">{selectedMessage.name}</p>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">Email</Label>
                  <p className="font-medium">{selectedMessage.email}</p>
                </div>
              </div>
              <div>
                <Label className="text-sm text-muted-foreground">Fecha</Label>
                <p className="font-medium">{formatDate(selectedMessage.date)}</p>
              </div>
              <div>
                <Label className="text-sm text-muted-foreground">Asunto</Label>
                <p className="font-medium">{selectedMessage.subject}</p>
              </div>
              <div>
                <Label className="text-sm text-muted-foreground">Mensaje</Label>
                <div className="mt-1 p-3 bg-muted/30 rounded-md">
                  <p>{selectedMessage.message}</p>
                </div>
              </div>
              <div className="flex items-center">
                <Label className="text-sm text-muted-foreground mr-2">Estado:</Label>
                <Badge variant={selectedMessage.status === "pending" ? "outline" : "secondary"}>
                  {selectedMessage.status === "pending" ? "Pendiente" : "Resuelto"}
                </Badge>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewMessageDialogOpen(false)}>Cerrar</Button>
            {selectedMessage && selectedMessage.status === "pending" && (
              <Button onClick={() => handleMarkAsResolved(selectedMessage.id)}>
                <CheckCircle className="h-4 w-4 mr-2" />
                Marcar como resuelto
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;
