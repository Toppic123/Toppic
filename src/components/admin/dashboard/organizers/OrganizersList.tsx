
import { useState } from "react";
import { User, Plus, Trash, Edit } from "lucide-react";
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

// Mock data for organizers - we'll move this to a separate file in the future
export const mockOrganizers = [
  { id: "1", name: "PictureThis", email: "contact@picturethis.com", plan: "pro", activeContests: 3, totalContests: 8 },
  { id: "2", name: "FoodLens", email: "hello@foodlens.org", plan: "basic", activeContests: 1, totalContests: 2 },
  { id: "3", name: "CoastalShots", email: "info@coastalshots.net", plan: "premium", activeContests: 5, totalContests: 12 },
];

interface OrganizersListProps {
  onAddOrganizer?: () => void;
}

const OrganizersList = ({ onAddOrganizer }: OrganizersListProps) => {
  const { toast } = useToast();
  const [filteredOrganizers, setFilteredOrganizers] = useState(mockOrganizers);
  const [searchQuery, setSearchQuery] = useState("");

  // Handle organizer search
  const handleOrganizerSearch = (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setFilteredOrganizers(mockOrganizers);
      return;
    }
    const filtered = mockOrganizers.filter(organizer => 
      organizer.name.toLowerCase().includes(query.toLowerCase()) ||
      organizer.email.toLowerCase().includes(query.toLowerCase()) ||
      organizer.plan.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredOrganizers(filtered);
  };

  // Handle delete organizer
  const handleDeleteOrganizer = (organizerId: string) => {
    toast({
      title: "Organizador eliminado",
      description: `El organizador ha sido eliminado correctamente.`,
    });
    setFilteredOrganizers(filteredOrganizers.filter(o => o.id !== organizerId));
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Gestión de Organizadores</h2>
        <Button className="flex items-center gap-2" onClick={onAddOrganizer}>
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
      
      {filteredOrganizers.map(organizer => (
        <OrganizerCard 
          key={organizer.id} 
          organizer={organizer} 
          onDelete={handleDeleteOrganizer}
        />
      ))}
    </div>
  );
};

interface OrganizerCardProps {
  organizer: {
    id: string;
    name: string;
    email: string;
    plan: string;
    activeContests: number;
    totalContests: number;
  };
  onDelete: (id: string) => void;
}

const OrganizerCard = ({ organizer, onDelete }: OrganizerCardProps) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{organizer.name}</CardTitle>
            <CardDescription>{organizer.email}</CardDescription>
          </div>
          <div className={`px-3 py-1 rounded-full text-sm font-medium ${
            organizer.plan === 'basic' ? 'bg-gray-100 text-gray-800' :
            organizer.plan === 'pro' ? 'bg-blue-100 text-blue-800' :
            'bg-purple-100 text-purple-800'
          }`}>
            {organizer.plan === 'basic' ? 'Básico' : 
              organizer.plan === 'pro' ? 'Pro' : 'Premium'}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4">
          <div>
            <span className="font-medium">{organizer.activeContests}</span> concursos activos
          </div>
          <div>
            <span className="font-medium">{organizer.totalContests}</span> concursos totales
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button variant="outline">
          <Edit size={16} className="mr-1" />
          Editar
        </Button>
        <Button variant="destructive" onClick={() => onDelete(organizer.id)}>
          <Trash size={16} className="mr-1" />
          Eliminar
        </Button>
      </CardFooter>
    </Card>
  );
};

export default OrganizersList;
