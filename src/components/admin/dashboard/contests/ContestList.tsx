
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Contest } from "./types";
import ContestCard from "./ContestCard";

interface ContestListProps {
  contests: Contest[];
  isLoading: boolean;
  searchQuery: string;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export const ContestList = ({ 
  contests, 
  isLoading, 
  searchQuery, 
  onEdit,
  onDelete 
}: ContestListProps) => {
  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <p>Cargando concursos...</p>
      </div>
    );
  }
  
  if (contests.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No se encontraron concursos{searchQuery ? " con la búsqueda actual" : ""}.</p>
        <p className="text-sm text-muted-foreground mt-2">Crea un nuevo concurso haciendo clic en el botón "Nuevo Concurso" arriba.</p>
      </div>
    );
  }
  
  return (
    <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {contests.map(contest => (
        <ContestCard 
          key={contest.id}
          contest={contest}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default ContestList;
