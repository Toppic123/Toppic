
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
import { Calendar, Clock, MapPin, Users, Award, Camera, FileText, Image as ImageIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const [contests, setContests] = useState<any[]>([]);
  const [newContest, setNewContest] = useState({
    id: "",
    title: "",
    description: "",
    location: "",
    startDate: "",
    endDate: "",
    participants: 0,
    votes: 0,
    status: "active",
    photoType: "",
    coverImage: ""
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewContest({ ...newContest, [name]: value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setNewContest({ ...newContest, [name]: value });
  };

  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      
      reader.onloadend = () => {
        setNewContest({ 
          ...newContest, 
          coverImage: reader.result as string 
        });
      };
      
      reader.readAsDataURL(file);
    }
  };

  const handleAddContest = () => {
    const newId = `contest-${Date.now()}`;
    const contestWithId = { ...newContest, id: newId };
    
    setContests([...contests, contestWithId]);
    setNewContest({
      id: "",
      title: "",
      description: "",
      location: "",
      startDate: "",
      endDate: "",
      participants: 0,
      votes: 0,
      status: "active",
      photoType: "",
      coverImage: ""
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
                    <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
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
                          <Label htmlFor="description">Descripción del Evento</Label>
                          <Textarea
                            id="description"
                            name="description"
                            placeholder="Describe los detalles del evento y concurso..."
                            value={newContest.description}
                            onChange={handleInputChange}
                            className="min-h-32"
                          />
                        </div>
                        
                        <div className="grid w-full gap-3">
                          <Label htmlFor="photoType">Tipo de Fotografía</Label>
                          <Select 
                            name="photoType" 
                            value={newContest.photoType} 
                            onValueChange={(value) => handleSelectChange("photoType", value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Selecciona el tipo de fotografía" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="location">Lugares/Monumentos</SelectItem>
                              <SelectItem value="people">Personas/Eventos</SelectItem>
                              <SelectItem value="product">Productos/Servicios</SelectItem>
                              <SelectItem value="activity">Actividades/Actuaciones</SelectItem>
                              <SelectItem value="nature">Naturaleza/Paisajes</SelectItem>
                              <SelectItem value="other">Otro tipo</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="grid w-full gap-3">
                          <Label htmlFor="coverImage">Imagen de Portada</Label>
                          <div className="flex items-center gap-4">
                            <Input
                              id="coverImage"
                              name="coverImage"
                              type="file"
                              accept="image/*"
                              onChange={handleCoverImageChange}
                              className="flex-1"
                            />
                            {newContest.coverImage && (
                              <div className="w-16 h-16 relative rounded overflow-hidden">
                                <img 
                                  src={newContest.coverImage} 
                                  alt="Vista previa" 
                                  className="object-cover w-full h-full"
                                />
                              </div>
                            )}
                          </div>
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
                          <TableHead>Tipo</TableHead>
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
                            <TableCell className="font-medium">
                              <div className="flex items-center gap-3">
                                {contest.coverImage && (
                                  <div className="w-10 h-10 rounded overflow-hidden flex-shrink-0">
                                    <img 
                                      src={contest.coverImage} 
                                      alt={contest.title} 
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                )}
                                {!contest.coverImage && (
                                  <div className="w-10 h-10 bg-muted rounded flex items-center justify-center flex-shrink-0">
                                    <ImageIcon className="h-5 w-5 text-muted-foreground" />
                                  </div>
                                )}
                                <div>
                                  {contest.title}
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              {contest.photoType ? (
                                <>
                                  {contest.photoType === "location" && "Lugares/Monumentos"}
                                  {contest.photoType === "people" && "Personas/Eventos"}
                                  {contest.photoType === "product" && "Productos/Servicios"}
                                  {contest.photoType === "activity" && "Actividades/Actuaciones"}
                                  {contest.photoType === "nature" && "Naturaleza/Paisajes"}
                                  {contest.photoType === "other" && "Otro tipo"}
                                </>
                              ) : (
                                <span className="text-muted-foreground">No especificado</span>
                              )}
                            </TableCell>
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
