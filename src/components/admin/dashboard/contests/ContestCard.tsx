
import { Camera, Edit, Trash } from "lucide-react";
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Contest } from "@/hooks/useContestsData";

interface ContestCardProps {
  contest: Contest;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export const ContestCard = ({ contest, onEdit, onDelete }: ContestCardProps) => {
  // Safety check for invalid contest data
  if (!contest || !contest.id) {
    console.warn("Invalid contest data provided to ContestCard:", contest);
    return null;
  }

  return (
    <Card key={contest.id}>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{contest.title || 'Sin título'}</CardTitle>
            <CardDescription>Organizado por: {contest.organizer || 'Desconocido'}</CardDescription>
          </div>
          <div className="flex flex-col gap-2">
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${
              contest.status === 'active' ? 'bg-green-100 text-green-800' :
              contest.status === 'finished' ? 'bg-gray-100 text-gray-800' :
              'bg-amber-100 text-amber-800'
            }`}>
              {contest.status === 'active' ? 'Activo' : 
                contest.status === 'finished' ? 'Finalizado' : 'Pendiente'}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Camera size={16} className="text-muted-foreground" />
            <span>{contest.participants || 0} participantes</span>
          </div>
        </div>
        {contest.location && (
          <p className="text-sm text-muted-foreground mt-2">📍 {contest.location}</p>
        )}
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button variant="outline" onClick={() => onEdit(contest.id)}>
          <Edit size={16} className="mr-1" />
          Editar
        </Button>
        <Button variant="destructive" onClick={() => onDelete(contest.id)}>
          <Trash size={16} className="mr-1" />
          Eliminar
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ContestCard;
