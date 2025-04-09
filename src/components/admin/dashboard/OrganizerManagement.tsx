
import { useState } from "react";
import { Flag, Calendar, Settings } from "lucide-react";
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { 
  Dialog, DialogContent, DialogDescription, DialogFooter, 
  DialogHeader, DialogTitle
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select";

// Mock data for organizers
const mockOrganizers = [
  { id: "1", name: "PictureThis", email: "contact@picturethis.com", contests: 3, status: "active" },
  { id: "2", name: "FoodLens", email: "hello@foodlens.com", contests: 2, status: "active" },
  { id: "3", name: "CoastalShots", email: "info@coastalshots.com", contests: 1, status: "inactive" },
  { id: "4", name: "NightOwl", email: "support@nightowl.com", contests: 1, status: "active" },
];

// Organizer form state type
export type OrganizerFormData = {
  name: string;
  email: string;
  plan: "basic" | "professional" | "premium";
  status: "active" | "inactive";
};

const OrganizerManagement = () => {
  const { toast } = useToast();
  const [filteredOrganizers, setFilteredOrganizers] = useState(mockOrganizers);
  const [searchQuery, setSearchQuery] = useState("");
  const [isEditOrganizerDialogOpen, setIsEditOrganizerDialogOpen] = useState(false);
  const [organizerFormData, setOrganizerFormData] = useState<OrganizerFormData>({
    name: "",
    email: "",
    plan: "basic",
    status: "active"
  });

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

  return (
    <>
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
    </>
  );
};

export default OrganizerManagement;
