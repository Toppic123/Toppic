import { useState, useEffect } from "react";
import { User, Plus, Trash, Edit, X } from "lucide-react";
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import OrganizerCard from "./OrganizerCard";
import { supabase } from "@/integrations/supabase/client";

// Mock data for organizers - we'll simulate persistence with localStorage
export const mockOrganizers = [
  { id: "1", name: "PictureThis", email: "contact@picturethis.com", plan: "pro", activeContests: 3, totalContests: 8 },
  { id: "2", name: "FoodLens", email: "hello@foodlens.org", plan: "basic", activeContests: 1, totalContests: 2 },
  { id: "3", name: "CoastalShots", email: "info@coastalshots.net", plan: "premium", activeContests: 5, totalContests: 12 },
];

export interface Organizer {
  id: string;
  name: string;
  email: string;
  plan: string;
  activeContests: number;
  totalContests: number;
}

interface OrganizersListProps {
  onAddOrganizer?: () => void;
}

// Helper to persist organizers in localStorage (simulating a backend)
const saveOrganizersToStorage = (organizers: Organizer[]) => {
  try {
    localStorage.setItem('app_organizers', JSON.stringify(organizers));
  } catch (error) {
    console.error('Error saving organizers to localStorage:', error);
  }
};

// Helper to load organizers from localStorage
const loadOrganizersFromStorage = (): Organizer[] => {
  try {
    const storedOrganizers = localStorage.getItem('app_organizers');
    return storedOrganizers ? JSON.parse(storedOrganizers) : mockOrganizers;
  } catch (error) {
    console.error('Error loading organizers from localStorage:', error);
    return mockOrganizers;
  }
};

const OrganizersList = ({ onAddOrganizer }: OrganizersListProps) => {
  const { toast } = useToast();
  const [organizers, setOrganizers] = useState<Organizer[]>([]);
  const [filteredOrganizers, setFilteredOrganizers] = useState<Organizer[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingOrganizer, setEditingOrganizer] = useState<Organizer | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    plan: "basic"
  });
  const [isLoading, setIsLoading] = useState(true);

  // Load organizers on component mount
  useEffect(() => {
    fetchOrganizers();
  }, []);

  // Fetch organizers from Supabase
  const fetchOrganizers = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('organizers')
        .select('*');
      
      if (error) {
        console.error('Error fetching organizers:', error);
        throw error;
      }
      
      if (data && data.length > 0) {
        const formattedOrganizers = data.map(org => ({
          id: org.id,
          name: org.name,
          email: org.email,
          plan: org.plan,
          activeContests: org.active_contests || 0,
          totalContests: org.total_contests || 0
        }));
        
        setOrganizers(formattedOrganizers);
        setFilteredOrganizers(formattedOrganizers);
      } else {
        // Use mock data if no organizers found
        setOrganizers(mockOrganizers);
        setFilteredOrganizers(mockOrganizers);
      }
    } catch (error) {
      console.error('Error loading organizers:', error);
      // Fall back to mock data on error
      setOrganizers(mockOrganizers);
      setFilteredOrganizers(mockOrganizers);
      toast({
        title: "Error al cargar organizadores",
        description: "Se están usando datos de ejemplo.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle organizer search
  const handleOrganizerSearch = (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setFilteredOrganizers(organizers);
      return;
    }
    const filtered = organizers.filter(organizer => 
      organizer.name.toLowerCase().includes(query.toLowerCase()) ||
      organizer.email.toLowerCase().includes(query.toLowerCase()) ||
      organizer.plan.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredOrganizers(filtered);
  };

  // Reset form data
  const resetFormData = () => {
    setFormData({
      name: "",
      email: "",
      plan: "basic"
    });
    setEditingOrganizer(null);
  };

  // Open dialog for adding new organizer
  const handleOpenAddDialog = () => {
    resetFormData();
    setIsDialogOpen(true);
  };

  // Open dialog for editing organizer
  const handleEditOrganizer = (organizer: Organizer) => {
    setEditingOrganizer(organizer);
    setFormData({
      name: organizer.name,
      email: organizer.email,
      plan: organizer.plan
    });
    setIsDialogOpen(true);
  };

  // Handle delete organizer
  const handleDeleteOrganizer = async (organizerId: string) => {
    try {
      // Delete from Supabase if it's a UUID
      if (organizerId.includes('-')) {
        const { error } = await supabase
          .from('organizers')
          .delete()
          .eq('id', organizerId);
        
        if (error) throw error;
      }
      
      const updatedOrganizers = organizers.filter(o => o.id !== organizerId);
      setOrganizers(updatedOrganizers);
      setFilteredOrganizers(filterOrganizers(updatedOrganizers, searchQuery));
      
      toast({
        title: "Organizador eliminado",
        description: `El organizador ha sido eliminado correctamente.`,
      });
    } catch (error) {
      console.error('Error deleting organizer:', error);
      toast({
        title: "Error al eliminar",
        description: "No se pudo eliminar el organizador.",
        variant: "destructive"
      });
    }
  };

  // Filter organizers based on search query
  const filterOrganizers = (orgList: Organizer[], query: string) => {
    if (!query.trim()) return orgList;
    
    return orgList.filter(organizer => 
      organizer.name.toLowerCase().includes(query.toLowerCase()) ||
      organizer.email.toLowerCase().includes(query.toLowerCase()) ||
      organizer.plan.toLowerCase().includes(query.toLowerCase())
    );
  };

  // Handle save organizer
  const handleSaveOrganizer = async () => {
    if (!formData.name || !formData.email) {
      toast({
        title: "Error",
        description: "Nombre y email son campos obligatorios",
        variant: "destructive"
      });
      return;
    }

    try {
      if (editingOrganizer) {
        // Update existing organizer
        const { error } = await supabase
          .from('organizers')
          .update({
            name: formData.name,
            email: formData.email,
            plan: formData.plan
          })
          .eq('id', editingOrganizer.id);
        
        if (error) throw error;
        
        const updatedOrganizers = organizers.map(org => 
          org.id === editingOrganizer.id 
            ? { 
                ...org, 
                name: formData.name, 
                email: formData.email, 
                plan: formData.plan 
              } 
            : org
        );
        
        setOrganizers(updatedOrganizers);
        setFilteredOrganizers(filterOrganizers(updatedOrganizers, searchQuery));
        
        toast({
          title: "Organizador actualizado",
          description: `El organizador "${formData.name}" ha sido actualizado correctamente.`,
        });
      } else {
        // Add new organizer
        const { data, error } = await supabase
          .from('organizers')
          .insert({
            name: formData.name,
            email: formData.email,
            plan: formData.plan,
            active_contests: 0,
            total_contests: 0
          })
          .select();
        
        if (error) throw error;
        
        if (data && data.length > 0) {
          const newOrganizer: Organizer = {
            id: data[0].id,
            name: formData.name,
            email: formData.email,
            plan: formData.plan,
            activeContests: 0,
            totalContests: 0
          };
          
          const updatedOrganizers = [...organizers, newOrganizer];
          setOrganizers(updatedOrganizers);
          setFilteredOrganizers(filterOrganizers(updatedOrganizers, searchQuery));
        }
        
        toast({
          title: "Organizador añadido",
          description: `El organizador "${formData.name}" ha sido añadido correctamente.`,
        });
      }
      
      setIsDialogOpen(false);
      resetFormData();
    } catch (error) {
      console.error('Error saving organizer:', error);
      toast({
        title: "Error",
        description: "No se pudo guardar el organizador.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Gestión de Organizadores</h2>
        <Button className="flex items-center gap-2" onClick={handleOpenAddDialog}>
          <Plus size={16} />
          <span>Nuevo Organizador</span>
        </Button>
      </div>
      
      <div className="relative w-full mb-4">
        <Input 
          placeholder="Buscar organizadores..." 
          className="w-full"
          value={searchQuery}
          onChange={(e) => handleOrganizerSearch(e.target.value)}
        />
      </div>
      
      {isLoading ? (
        <div className="text-center py-8 border rounded-md bg-muted/50">
          <p className="text-muted-foreground">Cargando organizadores...</p>
        </div>
      ) : filteredOrganizers.length === 0 ? (
        <div className="text-center py-8 border rounded-md bg-muted/50">
          <p className="text-muted-foreground">No se encontraron organizadores</p>
        </div>
      ) : (
        filteredOrganizers.map(organizer => (
          <OrganizerCard 
            key={organizer.id} 
            organizer={organizer} 
            onDelete={handleDeleteOrganizer}
            onEdit={() => handleEditOrganizer(organizer)}
          />
        ))
      )}

      {/* Add/Edit Organizer Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{editingOrganizer ? "Editar Organizador" : "Añadir Nuevo Organizador"}</DialogTitle>
            <DialogDescription>
              {editingOrganizer 
                ? "Modifica los datos del organizador seleccionado." 
                : "Introduce los datos para el nuevo organizador."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label htmlFor="name">Nombre</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="plan">Plan</Label>
                <Select 
                  value={formData.plan}
                  onValueChange={(value) => setFormData({...formData, plan: value})}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Seleccionar plan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basic">Básico</SelectItem>
                    <SelectItem value="pro">Pro</SelectItem>
                    <SelectItem value="premium">Premium</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancelar</Button>
            <Button onClick={handleSaveOrganizer}>Guardar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OrganizersList;
