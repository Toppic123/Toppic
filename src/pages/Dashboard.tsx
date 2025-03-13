
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { Calendar, Clock, MapPin, Users, Award, Camera, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const [contests, setContests] = useState<any[]>([]);
  const [newContest, setNewContest] = useState({
    id: "",
    title: "",
    location: "",
    startDate: "",
    endDate: "",
    participants: 0,
    votes: 0,
    status: "active"
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  // Load contests from localStorage on initial load
  useEffect(() => {
    const savedContests = localStorage.getItem("contests");
    if (savedContests) {
      setContests(JSON.parse(savedContests));
    }
  }, []);

  // Save contests to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("contests", JSON.stringify(contests));
  }, [contests]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewContest({ ...newContest, [name]: value });
  };

  const handleAddContest = () => {
    const newId = `contest-${Date.now()}`;
    const contestWithId = { ...newContest, id: newId };
    
    setContests([...contests, contestWithId]);
    setNewContest({
      id: "",
      title: "",
      location: "",
      startDate: "",
      endDate: "",
      participants: 0,
      votes: 0,
      status: "active"
    });
    
    setIsDialogOpen(false);
    
    toast({
      title: "Concurso creado",
      description: "El concurso ha sido creado exitosamente."
    });
  };

  const handleDeleteContest = (id: string) => {
    setContests(contests.filter(contest => contest.id !== id));
    
    toast({
      title: "Concurso eliminado",
      description: "El concurso ha sido eliminado exitosamente."
    });
  };

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold mb-6">Panel de Control</h1>
          
          <Tabs defaultValue="contests" className="mb-8">
            <TabsList className="mb-4">
              <TabsTrigger value="contests">Concursos</TabsTrigger>
              <TabsTrigger value="users">Usuarios</TabsTrigger>
              <TabsTrigger value="analytics">Analíticas</TabsTrigger>
            </TabsList>
            
            <TabsContent value="contests">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Gestión de Concursos</CardTitle>
                    <CardDescription>Administra todos los concursos fotográficos.</CardDescription>
                  </div>
                  
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <Button>Crear Concurso</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px]">
                      <DialogHeader>
                        <DialogTitle>Crear Nuevo Concurso</DialogTitle>
                      </DialogHeader>
                      
                      <div className="space-y-4 py-4">
                        <div className="grid w-full gap-3">
                          <Label htmlFor="title">Título del Concurso</Label>
                          <Input
                            id="title"
                            name="title"
                            placeholder="Ej: Fotografía Urbana 2023"
                            value={newContest.title}
                            onChange={handleInputChange}
                          />
                        </div>
                        
                        <div className="grid w-full gap-3">
                          <Label htmlFor="location">Ubicación</Label>
                          <Input
                            id="location"
                            name="location"
                            placeholder="Ej: Madrid, España"
                            value={newContest.location}
                            onChange={handleInputChange}
                          />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="grid w-full gap-3">
                            <Label htmlFor="startDate">Fecha de Inicio</Label>
                            <Input
                              id="startDate"
                              name="startDate"
                              type="date"
                              value={newContest.startDate}
                              onChange={handleInputChange}
                            />
                          </div>
                          
                          <div className="grid w-full gap-3">
                            <Label htmlFor="endDate">Fecha de Finalización</Label>
                            <Input
                              id="endDate"
                              name="endDate"
                              type="date"
                              value={newContest.endDate}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                      </div>
                      
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button variant="outline">Cancelar</Button>
                        </DialogClose>
                        <Button onClick={handleAddContest} disabled={!newContest.title || !newContest.location}>Crear Concurso</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardHeader>
                
                <CardContent>
                  {contests.length > 0 ? (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Concurso</TableHead>
                          <TableHead>Ubicación</TableHead>
                          <TableHead>Fechas</TableHead>
                          <TableHead>Participantes</TableHead>
                          <TableHead>Estado</TableHead>
                          <TableHead>Acciones</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {contests.map((contest) => (
                          <TableRow key={contest.id}>
                            <TableCell className="font-medium">{contest.title}</TableCell>
                            <TableCell>{contest.location}</TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                <Calendar className="h-4 w-4 mr-1" />
                                <span>{contest.startDate} - {contest.endDate}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                <Users className="h-4 w-4 mr-1" />
                                <span>{contest.participants}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                contest.status === "active" 
                                  ? "bg-green-100 text-green-800" 
                                  : "bg-yellow-100 text-yellow-800"
                              }`}>
                                {contest.status === "active" ? "Activo" : "Finalizado"}
                              </span>
                            </TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                <Button variant="outline" size="sm">Editar</Button>
                                <Button 
                                  variant="destructive" 
                                  size="sm"
                                  onClick={() => handleDeleteContest(contest.id)}
                                >
                                  Eliminar
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <div className="text-center py-10 text-muted-foreground">
                      <Camera className="w-12 h-12 mx-auto mb-3 text-muted-foreground/50" />
                      <p>No hay concursos creados todavía.</p>
                      <p className="text-sm">Para crear un concurso, haz clic en el botón "Crear Concurso".</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="users">
              <Card>
                <CardHeader>
                  <CardTitle>Gestión de Usuarios</CardTitle>
                  <CardDescription>Administra los usuarios de la plataforma.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-10 text-muted-foreground">
                    <Users className="w-12 h-12 mx-auto mb-3 text-muted-foreground/50" />
                    <p>Funcionalidad en desarrollo.</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="analytics">
              <Card>
                <CardHeader>
                  <CardTitle>Analíticas</CardTitle>
                  <CardDescription>Estadísticas y métricas de la plataforma.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-10 text-muted-foreground">
                    <FileText className="w-12 h-12 mx-auto mb-3 text-muted-foreground/50" />
                    <p>Funcionalidad en desarrollo.</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
