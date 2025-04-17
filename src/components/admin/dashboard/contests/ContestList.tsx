
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
      </div>
    );
  }
  
  return (
    <>
      {contests.map(contest => (
        <ContestCard 
          key={contest.id}
          contest={contest}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </>
  );
};

export default ContestList;
