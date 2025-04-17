
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ContestHeaderProps {
  onCreateNew: () => void;
}

export const ContestHeader = ({ onCreateNew }: ContestHeaderProps) => {
  return (
    <div className="flex justify-between items-center">
      <h2 className="text-xl font-semibold">Gestión de Concursos</h2>
      <Button onClick={onCreateNew} className="flex items-center gap-2">
        <Plus size={16} />
        <span>Nuevo Concurso</span>
      </Button>
    </div>
  );
};

export default ContestHeader;
