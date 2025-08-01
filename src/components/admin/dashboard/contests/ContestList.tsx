
import { Contest } from "@/hooks/useContestsData";
import ContestCard from "./ContestCard";
import { useEffect } from "react";

interface ContestListProps {
  contests: Contest[];
  isLoading: boolean;
  searchQuery: string;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export const ContestList = ({ 
  contests = [], // Add default empty array
  isLoading, 
  searchQuery, 
  onEdit,
  onDelete 
}: ContestListProps) => {
  // Log contests for debugging
  useEffect(() => {
    console.log("Concursos en ContestList:", contests);
  }, [contests]);

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <p>Cargando concursos...</p>
      </div>
    );
  }
  
  // Safety check for undefined or empty contests array
  if (!contests || contests.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No se encontraron concursos{searchQuery ? " con la búsqueda actual" : ""}.</p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {contests.map(contest => {
        // Skip rendering if contest is missing critical data
        if (!contest || !contest.id) {
          console.warn("Invalid contest data found:", contest);
          return null;
        }
        
        return (
          <ContestCard 
            key={contest.id}
            contest={contest}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        );
      })}
    </div>
  );
};

export default ContestList;
