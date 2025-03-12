
import { useState } from "react";
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
  Trash2
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

// Mock data - would be replaced with actual API calls
const mockUsers = [
  { id: 1, name: "Ana García", email: "ana@example.com", status: "active", plan: "Premium", joinDate: "2023-05-12" },
  { id: 2, name: "Carlos Rodríguez", email: "carlos@example.com", status: "inactive", plan: "Basic", joinDate: "2023-07-21" },
  { id: 3, name: "Elena Martínez", email: "elena@example.com", status: "active", plan: "Pro", joinDate: "2023-04-02" },
  { id: 4, name: "Pablo Sánchez", email: "pablo@example.com", status: "pending", plan: "Basic", joinDate: "2023-08-15" },
];

const mockEvents = [
  { id: 101, name: "Festival de Fotografía Urbana", organizer: "Ayuntamiento de Barcelona", status: "active", participants: 57, maxVotes: 1, endDate: "2023-10-30" },
  { id: 102, name: "Concurso Nacional de Paisajes", organizer: "Asociación Fotográfica", status: "ended", participants: 132, maxVotes: 3, endDate: "2023-09-15" },
  { id: 103, name: "Retratos de Primavera", organizer: "Galería Moderna", status: "pending", participants: 0, maxVotes: 2, endDate: "2023-11-20" },
];

const mockSubscriptions = [
  { id: 1, name: "Plan Básico", price: "29.99", billing: "monthly", features: ["1 concurso/mes", "50 participantes máx.", "10 días de duración"], active: true },
  { id: 2, name: "Plan Profesional", price: "99.99", billing: "monthly", features: ["5 concursos/mes", "200 participantes máx.", "30 días de duración"], active: true },
  { id: 3, name: "Plan Empresarial", price: "199.99", billing: "monthly", features: ["Concursos ilimitados", "Participantes ilimitados", "Duración personalizable"], active: false },
  { id: 4, name: "Plan Anual Básico", price: "299.99", billing: "yearly", features: ["12 concursos/año", "50 participantes máx.", "10 días de duración"], active: true },
];

const Dashboard = () => {
  const [searchUser, setSearchUser] = useState("");
  const [searchEvent, setSearchEvent] = useState("");
  const [searchSubscription, setSearchSubscription] = useState("");

  const filteredUsers = mockUsers.filter(user => 
    user.name.toLowerCase().includes(searchUser.toLowerCase()) || 
    user.email.toLowerCase().includes(searchUser.toLowerCase())
  );

  const filteredEvents = mockEvents.filter(event => 
    event.name.toLowerCase().includes(searchEvent.toLowerCase()) || 
    event.organizer.toLowerCase().includes(searchEvent.toLowerCase())
  );

  const filteredSubscriptions = mockSubscriptions.filter(sub => 
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
              <UserPlus className="text-primary" />
              Registros Nuevos
            </CardTitle>
            <CardDescription>Últimos 30 días</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">12</p>
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
          <TabsTrigger value="events" className="flex gap-2 items-center">
            <List size={16} />
            Concursos
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
            <Button className="flex items-center gap-1">
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
                  <TableHead>Plan</TableHead>
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
                      <TableCell>{user.plan}</TableCell>
                      <TableCell>{user.joinDate}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" asChild>
                            <Link to={`/profile/${user.id}`}>
                              <Edit size={16} />
                            </Link>
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-500">
                            <UserMinus size={16} />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-4">
                      No se encontraron usuarios
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
            <Link to="/organizers">
              <Button className="flex items-center gap-1">
                <UserPlus size={16} />
                Crear Concurso
              </Button>
            </Link>
          </div>
          
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Organizador</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Participantes</TableHead>
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
                      <TableCell>{event.maxVotes}</TableCell>
                      <TableCell>{event.endDate}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" asChild>
                            <Link to={`/contests/${event.id}`}>
                              <Check size={16} />
                            </Link>
                          </Button>
                          <Button variant="outline" size="sm" className="text-amber-500">
                            <Edit size={16} />
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-500">
                            <X size={16} />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-4">
                      No se encontraron concursos
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
