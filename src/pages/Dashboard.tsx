import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  User, 
  Users, 
  UserPlus, 
  UserMinus, 
  Check, 
  X, 
  List, 
  Settings,
  Share2,
  CreditCard,
  DollarSign,
  Edit,
  Trash2,
  Image,
  PlusCircle,
  MapPin,
  Building,
  Briefcase
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Form, FormItem, FormLabel, FormControl, FormDescription, FormMessage, FormField } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";

const initialUsers = [
  { id: 1, name: "Ana García", email: "ana@example.com", status: "active", joinDate: "2023-05-12" },
  { id: 2, name: "Carlos Rodríguez", email: "carlos@example.com", status: "inactive", joinDate: "2023-07-21" },
  { id: 3, name: "Elena Martínez", email: "elena@example.com", status: "active", joinDate: "2023-04-02" },
  { id: 4, name: "Pablo Sánchez", email: "pablo@example.com", status: "pending", joinDate: "2023-08-15" },
];

const initialOrganizers = [
  { id: 1, name: "Ayuntamiento de Barcelona", email: "eventos@bcn.cat", status: "active", type: "organizer", joinDate: "2023-03-10" },
  { id: 2, name: "Asociación Fotográfica", email: "info@asocfoto.es", status: "active", type: "organizer", joinDate: "2023-04-15" },
  { id: 3, name: "Galería Moderna", email: "contacto@galeriamoderna.com", status: "inactive", type: "organizer", joinDate: "2023-06-22" },
];

const initialCollaborators = [
  { id: 1, name: "Café Central", email: "info@cafecentral.es", status: "active", type: "collaborator", joinDate: "2023-05-05" },
  { id: 2, name: "Librería Cervantes", email: "contacto@cervantes.com", status: "active", type: "collaborator", joinDate: "2023-06-10" },
  { id: 3, name: "Hotel Plaza", email: "reservas@hotelplaza.es", status: "inactive", type: "collaborator", joinDate: "2023-07-20" },
];

const initialEvents = [
  { id: 101, name: "Festival de Fotografía Urbana", organizer: "Ayuntamiento de Barcelona", status: "active", participants: 57, maxVotes: 1, endDate: "2023-10-30", location: { lat: 41.3851, lng: 2.1734, address: "Plaza Cataluña, Barcelona" }, maxDistance: 1 },
  { id: 102, name: "Concurso Nacional de Paisajes", organizer: "Asociación Fotográfica", status: "ended", participants: 132, maxVotes: 3, endDate: "2023-09-15", location: { lat: 40.4168, lng: -3.7038, address: "Parque del Retiro, Madrid" }, maxDistance: 2 },
  { id: 103, name: "Retratos de Primavera", organizer: "Galería Moderna", status: "pending", participants: 0, maxVotes: 2, endDate: "2023-11-20", location: { lat: 39.4699, lng: -0.3763, address: "Ciudad de las Artes, Valencia" }, maxDistance: 0.5 },
];

const initialPhotos = [
  { id: 201, title: "Atardecer en la playa", photographer: "Ana García", contestId: 101, uploadDate: "2023-09-10", votes: 15 },
  { id: 202, title: "Calles de Barcelona", photographer: "Pablo Sánchez", contestId: 101, uploadDate: "2023-09-12", votes: 8 },
  { id: 203, title: "Montañas al amanecer", photographer: "Elena Martínez", contestId: 102, uploadDate: "2023-08-05", votes: 23 },
  { id: 204, title: "Retrato familiar", photographer: "Carlos Rodríguez", contestId: 103, uploadDate: "2023-10-01", votes: 0 },
];

const initialSubscriptions = [
  { id: 1, name: "Plan Básico", price: "29.99", billing: "monthly", features: ["1 concurso/mes", "50 participantes máx.", "10 días de duración"], active: true },
  { id: 2, name: "Plan Profesional", price: "99.99", billing: "monthly", features: ["5 concursos/mes", "200 participantes máx.", "30 días de duración"], active: true },
  { id: 3, name: "Plan Empresarial", price: "199.99", billing: "monthly", features: ["Concursos ilimitados", "Participantes ilimitados", "Duración personalizable"], active: false },
  { id: 4, name: "Plan Anual Básico", price: "299.99", billing: "yearly", features: ["12 concursos/año", "50 participantes máx.", "10 días de duración"], active: true },
];

const Dashboard = () => {
  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem('dashboard_users');
    return savedUsers ? JSON.parse(savedUsers) : initialUsers;
  });
  
  const [organizers, setOrganizers] = useState(() => {
    const savedOrganizers = localStorage.getItem('dashboard_organizers');
    return savedOrganizers ? JSON.parse(savedOrganizers) : initialOrganizers;
  });
  
  const [collaborators, setCollaborators] = useState(() => {
    const savedCollaborators = localStorage.getItem('dashboard_collaborators');
    return savedCollaborators ? JSON.parse(savedCollaborators) : initialCollaborators;
  });
  
  const [events, setEvents] = useState(() => {
    const savedEvents = localStorage.getItem('dashboard_events');
    return savedEvents ? JSON.parse(savedEvents) : initialEvents;
  });
  
  const [photos, setPhotos] = useState(() => {
    const savedPhotos = localStorage.getItem('dashboard_photos');
    return savedPhotos ? JSON.parse(savedPhotos) : initialPhotos;
  });
  
  const [subscriptions, setSubscriptions] = useState(() => {
    const savedSubscriptions = localStorage.getItem('dashboard_subscriptions');
    return savedSubscriptions ? JSON.parse(savedSubscriptions) : initialSubscriptions;
  });

  useEffect(() => {
    localStorage.setItem('dashboard_users', JSON.stringify(users));
    localStorage.setItem('dashboard_organizers', JSON.stringify(organizers));
    localStorage.setItem('dashboard_collaborators', JSON.stringify(collaborators));
    localStorage.setItem('dashboard_events', JSON.stringify(events));
    localStorage.setItem('dashboard_photos', JSON.stringify(photos));
    localStorage.setItem('dashboard_subscriptions', JSON.stringify(subscriptions));
  }, [users, organizers, collaborators, events, photos, subscriptions]);

  const [searchUser, setSearchUser] = useState("");
  const [searchEvent, setSearchEvent] = useState("");
  const [searchPhoto, setSearchPhoto] = useState("");
  const [searchSubscription, setSearchSubscription] = useState("");
  const [searchOrganizer, setSearchOrganizer] = useState("");
  const [searchCollaborator, setSearchCollaborator] = useState("");
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [selectedOrganizer, setSelectedOrganizer] = useState<any>(null);
  const [selectedCollaborator, setSelectedCollaborator] = useState<any>(null);
  const [isUserDialogOpen, setIsUserDialogOpen] = useState(false);
  const [isEventDialogOpen, setIsEventDialogOpen] = useState(false);
  const [isOrganizerDialogOpen, setIsOrganizerDialogOpen] = useState(false);
  const [isCollaboratorDialogOpen, setIsCollaboratorDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<{id: number, type: string} | null>(null);
  const { toast } = useToast();

  const userForm = useForm({
    defaultValues: {
      name: "",
      email: "",
      status: "active"
    }
  });

  const eventForm = useForm({
    defaultValues: {
      name: "",
      organizer: "",
      maxVotes: 1,
      endDate: "",
      location: {
        address: "",
        lat: 0,
        lng: 0
      },
      maxDistance: 1
    }
  });

  const organizerForm = useForm({
    defaultValues: {
      name: "",
      email: "",
      status: "active"
    }
  });

  const collaboratorForm = useForm({
    defaultValues: {
      name: "",
      email: "",
      status: "active"
    }
  });

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchUser.toLowerCase()) || 
    user.email.toLowerCase().includes(searchUser.toLowerCase())
  );

  const filteredOrganizers = organizers.filter(org => 
    org.name.toLowerCase().includes(searchOrganizer.toLowerCase()) || 
    org.email.toLowerCase().includes(searchOrganizer.toLowerCase())
  );

  const filteredCollaborators = collaborators.filter(collab => 
    collab.name.toLowerCase().includes(searchCollaborator.toLowerCase()) || 
    collab.email.toLowerCase().includes(searchCollaborator.toLowerCase())
  );

  const filteredEvents = events.filter(event => 
    event.name.toLowerCase().includes(searchEvent.toLowerCase()) || 
    event.organizer.toLowerCase().includes(searchEvent.toLowerCase())
  );

  const filteredPhotos = photos.filter(photo => 
    photo.title.toLowerCase().includes(searchPhoto.toLowerCase()) || 
    photo.photographer.toLowerCase().includes(searchPhoto.toLowerCase())
  );

  const filteredSubscriptions = subscriptions.filter(sub => 
    sub.name.toLowerCase().includes(searchSubscription.toLowerCase())
  );

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100";
      case "inactive":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100";
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100";
      case "ended":
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100";
      default:
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100";
    }
  };

  const handleEditUser = (user: any) => {
    setSelectedUser(user);
    userForm.reset({
      name: user.name,
      email: user.email,
      status: user.status
    });
    setIsUserDialogOpen(true);
  };

  const handleAddUser = () => {
    setSelectedUser(null);
    userForm.reset({
      name: "",
      email: "",
      status: "active"
    });
    setIsUserDialogOpen(true);
  };

  const handleEditOrganizer = (organizer: any) => {
    setSelectedOrganizer(organizer);
    organizerForm.reset({
      name: organizer.name,
      email: organizer.email,
      status: organizer.status
    });
    setIsOrganizerDialogOpen(true);
  };

  const handleAddOrganizer = () => {
    setSelectedOrganizer(null);
    organizerForm.reset({
      name: "",
      email: "",
      status: "active"
    });
    setIsOrganizerDialogOpen(true);
  };

  const handleEditCollaborator = (collaborator: any) => {
    setSelectedCollaborator(collaborator);
    collaboratorForm.reset({
      name: collaborator.name,
      email: collaborator.email,
      status: collaborator.status
    });
    setIsCollaboratorDialogOpen(true);
  };

  const handleAddCollaborator = () => {
    setSelectedCollaborator(null);
    collaboratorForm.reset({
      name: "",
      email: "",
      status: "active"
    });
    setIsCollaboratorDialogOpen(true);
  };

  const handleEditEvent = (event: any) => {
    setSelectedEvent(event);
    eventForm.reset({
      name: event.name,
      organizer: event.organizer,
      maxVotes: event.maxVotes,
      endDate: event.endDate,
      location: {
        address: event.location.address,
        lat: event.location.lat,
        lng: event.location.lng
      },
      maxDistance: event.maxDistance
    });
    setIsEventDialogOpen(true);
  };

  const handleAddEvent = () => {
    setSelectedEvent(null);
    eventForm.reset({
      name: "",
      organizer: "",
      maxVotes: 1,
      endDate: "",
      location: {
        address: "",
        lat: 0,
        lng: 0
      },
      maxDistance: 1
    });
    setIsEventDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (itemToDelete) {
      const { id, type } = itemToDelete;
      let deletedName = "";
      
      if (type === 'user') {
        const userToDelete = users.find(u => u.id === id);
        deletedName = userToDelete?.name || "";
        setUsers(users.filter(u => u.id !== id));
      } else if (type === 'organizer') {
        const organizerToDelete = organizers.find(o => o.id === id);
        deletedName = organizerToDelete?.name || "";
        setOrganizers(organizers.filter(o => o.id !== id));
      } else if (type === 'collaborator') {
        const collaboratorToDelete = collaborators.find(c => c.id === id);
        deletedName = collaboratorToDelete?.name || "";
        setCollaborators(collaborators.filter(c => c.id !== id));
      } else if (type === 'event') {
        const eventToDelete = events.find(e => e.id === id);
        deletedName = eventToDelete?.name || "";
        setEvents(events.filter(e => e.id !== id));
        setPhotos(photos.filter(p => p.contestId !== id));
      } else if (type === 'photo') {
        const photoToDelete = photos.find(p => p.id === id);
        deletedName = photoToDelete?.title || "";
        setPhotos(photos.filter(p => p.id !== id));
      }
      
      toast({
        title: `${type === 'user' ? 'Usuario' : 
                type === 'organizer' ? 'Organizador' : 
                type === 'collaborator' ? 'Colaborador' : 
                type === 'event' ? 'Concurso' : 'Foto'} eliminado`,
        description: `${deletedName} ha sido eliminado correctamente.`
      });
      
      setIsDeleteDialogOpen(false);
      setItemToDelete(null);
    }
  };

  const handleConfirmUserForm = (data: any) => {
    if (selectedUser) {
      setUsers(users.map(user => 
        user.id === selectedUser.id 
          ? { ...user, ...data }
          : user
      ));
      toast({
        title: "Usuario actualizado",
        description: `Los datos de ${data.name} han sido actualizados correctamente.`
      });
    } else {
      const newUser = {
        id: Math.max(0, ...users.map(u => u.id)) + 1,
        ...data,
        joinDate: new Date().toISOString().split('T')[0]
      };
      setUsers([...users, newUser]);
      toast({
        title: "Usuario creado",
        description: `El usuario ${data.name} ha sido creado correctamente.`
      });
    }
    setIsUserDialogOpen(false);
  };

  const handleConfirmOrganizerForm = (data: any) => {
    if (selectedOrganizer) {
      setOrganizers(organizers.map(org => 
        org.id === selectedOrganizer.id 
          ? { ...org, ...data }
          : org
      ));
      toast({
        title: "Organizador actualizado",
        description: `Los datos de ${data.name} han sido actualizados correctamente.`
      });
    } else {
      const newOrganizer = {
        id: Math.max(0, ...organizers.map(o => o.id)) + 1,
        ...data,
        type: "organizer",
        joinDate: new Date().toISOString().split('T')[0]
      };
      setOrganizers([...organizers, newOrganizer]);
      toast({
        title: "Organizador creado",
        description: `El organizador ${data.name} ha sido creado correctamente.`
      });
    }
    setIsOrganizerDialogOpen(false);
  };

  const handleConfirmCollaboratorForm = (data: any) => {
    if (selectedCollaborator) {
      setCollaborators(collaborators.map(collab => 
        collab.id === selectedCollaborator.id 
          ? { ...collab, ...data }
          : collab
      ));
      toast({
        title: "Colaborador actualizado",
        description: `Los datos de ${data.name} han sido actualizados correctamente.`
      });
    } else {
      const newCollaborator = {
        id: Math.max(0, ...collaborators.map(c => c.id)) + 1,
        ...data,
        type: "collaborator",
        joinDate: new Date().toISOString().split('T')[0]
      };
      setCollaborators([...collaborators, newCollaborator]);
      toast({
        title: "Colaborador creado",
        description: `El colaborador ${data.name} ha sido creado correctamente.`
      });
    }
    setIsCollaboratorDialogOpen(false);
  };

  const handleConfirmEventForm = (data: any) => {
    if (selectedEvent) {
      setEvents(events.map(event => 
        event.id === selectedEvent.id 
          ? { ...event, ...data, participants: event.participants }
          : event
      ));
      toast({
        title: "Concurso actualizado",
        description: `El concurso ${data.name} ha sido actualizado correctamente.`
      });
    } else {
      const newEvent = {
        id: Math.max(0, ...events.map(e => e.id)) + 1,
        ...data,
        status: "active",
        participants: 0
      };
      setEvents([...events, newEvent]);
      toast({
        title: "Concurso creado",
        description: `El concurso ${data.name} ha sido creado correctamente.`
      });
    }
    setIsEventDialogOpen(false);
  };

  const handleLocationSearch = (address: string) => {
    if (!address.trim()) {
      toast({
        title: "Error",
        description: "Por favor, introduce una dirección para buscar"
      });
      return;
    }
    
    console.log("Searching for location:", address);
    
    const mockLocation = {
      address: address,
      lat: 41.3851 + (Math.random() * 0.1 - 0.05),
      lng: 2.1734 + (Math.random() * 0.1 - 0.05)
    };
    
    eventForm.setValue("location", mockLocation);
    
    toast({
      title: "Ubicación encontrada",
      description: `Coordenadas para ${address}: Lat ${mockLocation.lat.toFixed(4)}, Lng ${mockLocation.lng.toFixed(4)}`
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto py-8 px-4 max-w-6xl"
    >
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Panel de Control</h1>
        <Button variant="outline" className="gap-1">
          <Settings size={16} />
          Configuración
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl flex items-center gap-2">
              <Users className="text-primary" />
              Usuarios
            </CardTitle>
            <CardDescription>Total de usuarios registrados</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{mockUsers.length}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl flex items-center gap-2">
              <List className="text-primary" />
              Concursos
            </CardTitle>
            <CardDescription>Total de concursos creados</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{mockEvents.length}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl flex items-center gap-2">
              <Building className="text-primary" />
              Organizadores
            </CardTitle>
            <CardDescription>Entidades activas</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{mockOrganizers.filter(o => o.status === "active").length}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl flex items-center gap-2">
              <DollarSign className="text-primary" />
              Ingresos
            </CardTitle>
            <CardDescription>Este mes</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">€1,299</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="users" className="mt-6">
        <TabsList className="mb-4 w-full sm:w-auto">
          <TabsTrigger value="users" className="flex gap-2 items-center">
            <User size={16} />
            Usuarios
          </TabsTrigger>
          <TabsTrigger value="organizers" className="flex gap-2 items-center">
            <Building size={16} />
            Organizadores
          </TabsTrigger>
          <TabsTrigger value="collaborators" className="flex gap-2 items-center">
            <Briefcase size={16} />
            Colaboradores
          </TabsTrigger>
          <TabsTrigger value="events" className="flex gap-2 items-center">
            <List size={16} />
            Concursos
          </TabsTrigger>
          <TabsTrigger value="photos" className="flex gap-2 items-center">
            <Image size={16} />
            Fotos
          </TabsTrigger>
          <TabsTrigger value="subscriptions" className="flex gap-2 items-center">
            <CreditCard size={16} />
            Suscripciones
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="users" className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="md:w-1/3">
              <Input
                placeholder="Buscar usuarios..."
                value={searchUser}
                onChange={(e) => setSearchUser(e.target.value)}
              />
            </div>
            <Button className="flex items-center gap-1" onClick={handleAddUser}>
              <UserPlus size={16} />
              Añadir Usuario
            </Button>
          </div>
          
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Fecha Registro</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${getStatusStyle(user.status)}`}>
                          {user.status === "active" ? "Activo" : 
                           user.status === "inactive" ? "Inactivo" : "Pendiente"}
                        </span>
                      </TableCell>
                      <TableCell>{user.joinDate}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" onClick={() => handleEditUser(user)}>
                            <Edit size={16} />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-red-500"
                            onClick={() => {
                              setItemToDelete({ id: user.id, type: 'user' });
                              setIsDeleteDialogOpen(true);
                            }}
                          >
                            <UserMinus size={16} />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-4">
                      No se encontraron usuarios
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        
        <TabsContent value="organizers" className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="md:w-1/3">
              <Input
                placeholder="Buscar organizadores..."
                value={searchOrganizer}
                onChange={(e) => setSearchOrganizer(e.target.value)}
              />
            </div>
            <Button className="flex items-center gap-1" onClick={handleAddOrganizer}>
              <Building size={16} />
              Añadir Organizador
            </Button>
          </div>
          
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Fecha Registro</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrganizers.length > 0 ? (
                  filteredOrganizers.map((organizer) => (
                    <TableRow key={organizer.id}>
                      <TableCell className="font-medium">{organizer.name}</TableCell>
                      <TableCell>{organizer.email}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${getStatusStyle(organizer.status)}`}>
                          {organizer.status === "active" ? "Activo" : 
                           organizer.status === "inactive" ? "Inactivo" : "Pendiente"}
                        </span>
                      </TableCell>
                      <TableCell>{organizer.joinDate}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" onClick={() => handleEditOrganizer(organizer)}>
                            <Edit size={16} />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-red-500"
                            onClick={() => {
                              setItemToDelete({ id: organizer.id, type: 'organizer' });
                              setIsDeleteDialogOpen(true);
                            }}
                          >
                            <UserMinus size={16} />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-4">
                      No se encontraron organizadores
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        
        <TabsContent value="collaborators" className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="md:w-1/3">
              <Input
                placeholder="Buscar colaboradores..."
                value={searchCollaborator}
                onChange={(e) => setSearchCollaborator(e.target.value)}
              />
            </div>
            <Button className="flex items-center gap-1" onClick={handleAddCollaborator}>
              <Briefcase size={16} />
              Añadir Colaborador
            </Button>
          </div>
          
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Fecha Registro</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCollaborators.length > 0 ? (
                  filteredCollaborators.map((collaborator) => (
                    <TableRow key={collaborator.id}>
                      <TableCell className="font-medium">{collaborator.name}</TableCell>
                      <TableCell>{collaborator.email}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${getStatusStyle(collaborator.status)}`}>
                          {collaborator.status === "active" ? "Activo" : 
                           collaborator.status === "inactive" ? "Inactivo" : "Pendiente"}
                        </span>
                      </TableCell>
                      <TableCell>{collaborator.joinDate}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" onClick={() => handleEditCollaborator(collaborator)}>
                            <Edit size={16} />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-red-500"
                            onClick={() => {
                              setItemToDelete({ id: collaborator.id, type: 'collaborator' });
                              setIsDeleteDialogOpen(true);
                            }}
                          >
                            <UserMinus size={16} />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-4">
                      No se encontraron colaboradores
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        
        <TabsContent value="events" className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="md:w-1/3">
              <Input
                placeholder="Buscar concursos..."
                value={searchEvent}
                onChange={(e) => setSearchEvent(e.target.value)}
              />
            </div>
            <Button className="flex items-center gap-1" onClick={handleAddEvent}>
              <PlusCircle size={16} />
              Crear Concurso
            </Button>
          </div>
          
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Organizador</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Participantes</TableHead>
                  <TableHead>Ubicación</TableHead>
                  <TableHead>Votos Máx.</TableHead>
                  <TableHead>Fecha Fin</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEvents.length > 0 ? (
                  filteredEvents.map((event) => (
                    <TableRow key={event.id}>
                      <TableCell className="font-medium">{event.name}</TableCell>
                      <TableCell>{event.organizer}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${getStatusStyle(event.status)}`}>
                          {event.status === "active" ? "Activo" : 
                           event.status === "ended" ? "Finalizado" : "Pendiente"}
                        </span>
                      </TableCell>
                      <TableCell>{event.participants}</TableCell>
                      <TableCell className="max-w-[150px] truncate" title={event.location.address}>
                        {event.location.address}
                      </TableCell>
                      <TableCell>{event.maxVotes}</TableCell>
                      <TableCell>{event.endDate}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" onClick={() => handleEditEvent(event)}>
                            <Edit size={16} />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-red-500"
                            onClick={() => {
                              setItemToDelete({ id: event.id, type: 'event' });
                              setIsDeleteDialogOpen(true);
                            }}
                          >
                            <X size={16} />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-4">
                      No se encontraron concursos
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        
        <TabsContent value="photos" className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="md:w-1/3">
              <Input
                placeholder="Buscar fotos..."
                value={searchPhoto}
                onChange={(e) => setSearchPhoto(e.target.value)}
              />
            </div>
          </div>
          
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Título</TableHead>
                  <TableHead>Fotógrafo</TableHead>
                  <TableHead>Concurso</TableHead>
                  <TableHead>Fecha de subida</TableHead>
                  <TableHead>Votos</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPhotos.length > 0 ? (
                  filteredPhotos.map((photo) => (
                    <TableRow key={photo.id}>
                      <TableCell className="font-medium">{photo.title}</TableCell>
                      <TableCell>{photo.photographer}</TableCell>
                      <TableCell>
                        {mockEvents.find(e => e.id === photo.contestId)?.name || "Desconocido"}
                      </TableCell>
                      <TableCell>{photo.uploadDate}</TableCell>
                      <TableCell>{photo.votes}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-amber-500"
                            asChild
                          >
                            <Link to={`/contests/${photo.contestId}`}>
                              <Check size={16} />
                            </Link>
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-red-500"
                            onClick={() => {
                              setItemToDelete({ id: photo.id, type: 'photo' });
                              setIsDeleteDialogOpen(true);
                            }}
                          >
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-4">
                      No se encontraron fotos
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        
        <TabsContent value="subscriptions" className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="md:w-1/3">
              <Input
                placeholder="Buscar planes..."
                value={searchSubscription}
                onChange={(e) => setSearchSubscription(e.target.value)}
              />
            </div>
            <Button className="flex items-center gap-1">
              <CreditCard size={16} />
              Nuevo Plan
            </Button>
          </div>
          
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre del Plan</TableHead>
                  <TableHead>Precio</TableHead>
                  <TableHead>Facturación</TableHead>
                  <TableHead>Características</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSubscriptions.length > 0 ? (
                  filteredSubscriptions.map((sub) => (
                    <TableRow key={sub.id}>
                      <TableCell className="font-medium">{sub.name}</TableCell>
                      <TableCell>€{sub.price}</TableCell>
                      <TableCell>
                        {sub.billing === "monthly" ? "Mensual" : "Anual"}
                      </TableCell>
                      <TableCell>
                        <ul className="list-disc list-inside text-xs text-muted-foreground">
                          {sub.features.map((feature, idx) => (
                            <li key={idx}>{feature}</li>
                          ))}
                        </ul>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Switch id={`sub-${sub.id}`} checked={sub.active} />
                          <Label htmlFor={`sub-${sub.id}`} className="ml-2">
                            {sub.active ? (
                              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Activo</Badge>
                            ) : (
                              <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">Inactivo</Badge>
                            )}
                          </Label>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Edit size={16} />
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-500">
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-4">
                      No se encontraron planes de suscripción
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Configuración de Pagos</CardTitle>
              <CardDescription>
                Conecta tu cuenta de Stripe para procesar pagos de suscripciones
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="stripe-key">Clave API de Stripe</Label>
                  <Input id="stripe-key" type="password" placeholder="sk_live_..." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="webhook-url">URL de Webhook</Label>
                  <Input id="webhook-url" type="text" placeholder="https://..." />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="test-mode" />
                  <Label htmlFor="test-mode">Modo de prueba</Label>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Guardar Configuración</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={isUserDialogOpen} onOpenChange={setIsUserDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{selectedUser ? "Editar Usuario" : "Crear Nuevo Usuario"}</DialogTitle>
            <DialogDescription>
              {selectedUser 
                ? "Modifica los datos del usuario seleccionado" 
                : "Introduce los datos para el nuevo usuario"}
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={userForm.handleSubmit(handleConfirmUserForm)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre completo</Label>
              <Input 
                id="name" 
                {...userForm.register("name")}
                placeholder="Nombre del usuario"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input 
                id="email" 
                type="email"
                {...userForm.register("email")}
                placeholder="correo@ejemplo.com"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="status">Estado</Label>
              <select 
                id="status"
                {...userForm.register("status")}
                className="w-full rounded-md border border-input p-2"
              >
                <option value="active">Activo</option>
                <option value="inactive">Inactivo</option>
                <option value="pending">Pendiente</option>
              </select>
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsUserDialogOpen(false)}>
                Cancelar
              </Button>
              <Button type="submit">
                {selectedUser ? "Guardar Cambios" : "Crear Usuario"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={isOrganizerDialogOpen} onOpenChange={setIsOrganizerDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{selectedOrganizer ? "Editar Organizador" : "Crear Nuevo Organizador"}</DialogTitle>
            <DialogDescription>
              {selectedOrganizer 
                ? "Modifica los datos del organizador seleccionado" 
                : "Introduce los datos para el nuevo organizador"}
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={organizerForm.handleSubmit(handleConfirmOrganizerForm)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre de la organización</Label>
              <Input 
                id="name" 
                {...organizerForm.register("name")}
                placeholder="Nombre de la organización"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input 
                id="email" 
                type="email"
                {...organizerForm.register("email")}
                placeholder="correo@ejemplo.com"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="status">Estado</Label>
              <select 
                id="status"
                {...organizerForm.register("status")}
                className="w-full rounded-md border border-input p-2"
              >
                <option value="active">Activo</option>
                <option value="inactive">Inactivo</option>
                <option value="pending">Pendiente</option>
              </select>
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsOrganizerDialogOpen(false)}>
                Cancelar
              </Button>
              <Button type="submit">
                {selectedOrganizer ? "Guardar Cambios" : "Crear Organizador"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={isCollaboratorDialogOpen} onOpenChange={setIsCollaboratorDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{selectedCollaborator ? "Editar Colaborador" : "Crear Nuevo Colaborador"}</DialogTitle>
            <DialogDescription>
              {selectedCollaborator 
                ? "Modifica los datos del colaborador seleccionado" 
                : "Introduce los datos para el nuevo colaborador"}
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={collaboratorForm.handleSubmit(handleConfirmCollaboratorForm)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre del negocio</Label>
              <Input 
                id="name" 
                {...collaboratorForm.register("name")}
                placeholder="Nombre del negocio o empresa"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input 
                id="email" 
                type="email"
                {...collaboratorForm.register("email")}
                placeholder="correo@ejemplo.com"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="status">Estado</Label>
              <select 
                id="status"
                {...collaboratorForm.register("status")}
                className="w-full rounded-md border border-input p-2"
              >
                <option value="active">Activo</option>
                <option value="inactive">Inactivo</option>
                <option value="pending">Pendiente</option>
              </select>
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsCollaboratorDialogOpen(false)}>
                Cancelar
              </Button>
              <Button type="submit">
                {selectedCollaborator ? "Guardar Cambios" : "Crear Colaborador"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={isEventDialogOpen} onOpenChange={setIsEventDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{selectedEvent ? "Editar Concurso" : "Crear Nuevo Concurso"}</DialogTitle>
            <DialogDescription>
              {selectedEvent 
                ? "Modifica los datos del concurso seleccionado" 
                : "Introduce los datos para el nuevo concurso"}
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={eventForm.handleSubmit(handleConfirmEventForm)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre del concurso</Label>
              <Input 
                id="name" 
                {...eventForm.register("name")}
                placeholder="Nombre del concurso"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="organizer">Organizador</Label>
              <select
                id="organizer"
                {...eventForm.register("organizer")}
                className="w-full rounded-md border border-input p-2"
              >
                <option value="">Seleccionar organizador...</option>
                {mockOrganizers.filter(o => o.status === "active").map(org => (
                  <option key={org.id} value={org.name}>{org.name}</option>
                ))}
              </select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="location">Ubicación</Label>
              <div className="flex gap-2">
                <Input 
                  id="location"
                  placeholder="Dirección del evento"
                  value={eventForm.watch("location.address")}
                  onChange={(e) => eventForm.setValue("location.address", e.target.value)}
                />
                <Button 
                  type="button" 
                  size="sm"
                  onClick={() => handleLocationSearch(eventForm.watch("location.address"))}
                >
                  <MapPin size={16} />
                </Button>
              </div>
              {eventForm.watch("location.lat") !== 0 && (
                <div className="text-xs text-muted-foreground mt-1">
                  Lat: {eventForm.watch("location.lat")}, Lng: {eventForm.watch("location.lng")}
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="maxDistance">Distancia máxima (km) para participar</Label>
              <Input 
                id="maxDistance" 
                type="number"
                min="0.1"
                step="0.1"
                {...eventForm.register("maxDistance", { valueAsNumber: true })}
              />
              <p className="text-xs text-muted-foreground">
                Los usuarios solo podrán subir fotos si están dentro de esta distancia del lugar del concurso.
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="maxVotes">Número máximo de votos por usuario</Label>
              <Input 
                id="maxVotes" 
                type="number"
                min="1"
                max="10"
                {...eventForm.register("maxVotes", { valueAsNumber: true })}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="endDate">Fecha de finalización</Label>
              <Input 
                id="endDate" 
                type="date"
                {...eventForm.register("endDate")}
              />
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsEventDialogOpen(false)}>
                Cancelar
              </Button>
              <Button type="submit">
                {selectedEvent ? "Guardar Cambios" : "Crear Concurso"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirmar eliminación</DialogTitle>
            <DialogDescription>
              {itemToDelete?.type === 'user' && "¿Estás seguro de que deseas eliminar este usuario? Esta acción no se puede deshacer."}
              {itemToDelete?.type === 'organizer' && "¿Estás seguro de que deseas eliminar este organizador? Esta acción no se puede deshacer."}
              {itemToDelete?.type === 'collaborator' && "¿Estás seguro de que deseas eliminar este colaborador? Esta acción no se puede deshacer."}
              {itemToDelete?.type === 'event' && "¿Estás seguro de que deseas eliminar este concurso? Se eliminarán también todas sus fotos asociadas."}
              {itemToDelete?.type === 'photo' && "¿Estás seguro de que deseas eliminar esta foto? Esta acción no se puede deshacer."}
            </DialogDescription>
          </DialogHeader>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancelar
            </Button>
            <Button 
              type="button" 
              variant="destructive" 
              onClick={handleDeleteConfirm}
            >
              Eliminar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Alert className="mt-8">
        <AlertTitle>¿Necesitas ayuda con el panel de control?</AlertTitle>
        <AlertDescription>
          Consulta nuestra guía de uso o contacta con soporte para obtener asistencia.
        </AlertDescription>
      </Alert>
    </motion.div>
  );
};

export default Dashboard;
