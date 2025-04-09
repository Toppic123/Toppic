
import { useState } from "react";
import { Camera, Plus, Trash, Edit } from "lucide-react";
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

// Mock data for contests
const mockContests = [
  { id: "1", title: "Festival de Primavera", status: "active", organizer: "PictureThis", participants: 24 },
  { id: "2", title: "Concurso Gastronómico", status: "active", organizer: "FoodLens", participants: 38 },
  { id: "3", title: "Mar y Playa", status: "finished", organizer: "CoastalShots", participants: 17 },
  { id: "4", title: "Vida Nocturna", status: "pending", organizer: "NightOwl", participants: 5 },
];

type ContestFormProps = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  contestFormData: ContestFormData;
  setContestFormData: React.Dispatch<React.SetStateAction<ContestFormData>>;
  handleSaveChanges: () => void;
};

// Contest form state type
export type ContestFormData = {
  title: string;
  organizer: string;
  startDate: string;
  endDate: string;
  photoDeadline: string; // Added photo deadline
  description: string;
  status: "active" | "pending" | "finished";
  maxParticipants: number;
  photoOwnership: boolean;
  commercialUse: boolean;
};

export const ContestManagement = () => {
  const { toast } = useToast();
  const [contests, setContests] = useState(mockContests);
  const [filteredContests, setFilteredContests] = useState(mockContests);
  const [searchQuery, setSearchQuery] = useState("");
  const [isEditContestDialogOpen, setIsEditContestDialogOpen] = useState(false);
  const [contestFormData, setContestFormData] = useState<ContestFormData>({
    title: "",
    organizer: "",
    startDate: "",
    endDate: "",
    photoDeadline: "", // Added photo deadline
    description: "",
    status: "pending",
    maxParticipants: 100,
    photoOwnership: true,
    commercialUse: true
  });

  // Handle contest search
  const handleContestSearch = (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setFilteredContests(contests);
      return;
    }
    const filtered = contests.filter(contest => 
      contest.title.toLowerCase().includes(query.toLowerCase()) ||
      contest.organizer.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredContests(filtered);
  };

  // Handle edit contest
  const handleEditContest = (contestId: string) => {
    const contest = contests.find(c => c.id === contestId);
    if (contest) {
      setContestFormData({
        title: contest.title,
        organizer: contest.organizer,
        startDate: "2024-04-15",
        endDate: "2024-05-15",
        photoDeadline: "2024-05-10", // Added photo deadline
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
    if (contestFormData.title && contestFormData.organizer) {
      // Get the next ID for new contests
      const nextId = String(Math.max(...contests.map(c => parseInt(c.id))) + 1);
      
      // If editing an existing contest, update it; otherwise add a new one
      const updatedContests = [...contests];
      const existingIndex = updatedContests.findIndex(c => c.title === contestFormData.title);
      
      if (existingIndex >= 0) {
        // Update existing contest
        updatedContests[existingIndex] = {
          ...updatedContests[existingIndex],
          title: contestFormData.title,
          organizer: contestFormData.organizer,
          status: contestFormData.status,
          participants: contestFormData.maxParticipants
        };
      } else {
        // Add new contest
        updatedContests.push({
          id: nextId,
          title: contestFormData.title,
          organizer: contestFormData.organizer,
          status: contestFormData.status,
          participants: contestFormData.maxParticipants
        });
      }
      
      // Update state
      setContests(updatedContests);
      setFilteredContests(updatedContests);
      
      toast({
        title: "Cambios guardados",
        description: `El concurso "${contestFormData.title}" ha sido ${existingIndex >= 0 ? 'actualizado' : 'creado'} correctamente.`,
      });
    } else {
      toast({
        title: "Error al guardar",
        description: "El título y el organizador son campos obligatorios.",
        variant: "destructive",
      });
    }
    
    setIsEditContestDialogOpen(false);
  };

  // Handle delete contest
  const handleDeleteContest = (contestId: string) => {
    toast({
      title: "Concurso eliminado",
      description: `El concurso ha sido eliminado correctamente.`,
    });
    const updatedContests = contests.filter(c => c.id !== contestId);
    setContests(updatedContests);
    setFilteredContests(updatedContests);
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Gestión de Concursos</h2>
        <Button onClick={() => {
          setContestFormData({
            title: "",
            organizer: "",
            startDate: "",
            endDate: "",
            photoDeadline: "", // Added photo deadline
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
                <Camera size={16} className="text-muted-foreground" />
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

      <ContestFormDialog 
        isOpen={isEditContestDialogOpen}
        setIsOpen={setIsEditContestDialogOpen}
        contestFormData={contestFormData}
        setContestFormData={setContestFormData}
        handleSaveChanges={handleSaveContestChanges}
      />
    </>
  );
};

// Contest form dialog component
const ContestFormDialog = ({ 
  isOpen, 
  setIsOpen, 
  contestFormData, 
  setContestFormData, 
  handleSaveChanges 
}: ContestFormProps) => {
  // Import necessary UI components
  const { 
    Dialog, DialogContent, DialogDescription, DialogFooter, 
    DialogHeader, DialogTitle
  } = require("@/components/ui/dialog");
  const { Label } = require("@/components/ui/label");
  const { Textarea } = require("@/components/ui/textarea");
  const { 
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
  } = require("@/components/ui/select");
  const { Separator } = require("@/components/ui/separator");
  const { Switch } = require("@/components/ui/switch");
  const { Button } = require("@/components/ui/button");
  const { Input } = require("@/components/ui/input");

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                <Label htmlFor="photoDeadline">Fecha límite de fotos</Label>
                <Input
                  id="photoDeadline"
                  type="date"
                  value={contestFormData.photoDeadline}
                  onChange={(e) => setContestFormData({...contestFormData, photoDeadline: e.target.value})}
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
            <p className="text-sm text-muted-foreground italic">
              Al activar esta opción, los participantes aceptan que las fotos ganadoras puedan ser utilizadas con fines comerciales
              y otorgan su consentimiento de derechos de imagen para aparecer en ellas.
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>Cancelar</Button>
          <Button onClick={handleSaveChanges}>Guardar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ContestManagement;
