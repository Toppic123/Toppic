
import { Trash, Edit } from "lucide-react";
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Organizer } from "./OrganizersList";

interface OrganizerCardProps {
  organizer: Organizer;
  onDelete: (id: string) => void;
  onEdit: () => void;
}

const OrganizerCard = ({ organizer, onDelete, onEdit }: OrganizerCardProps) => {
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
        <Button variant="outline" onClick={onEdit}>
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

export default OrganizerCard;
