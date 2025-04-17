
import { Input } from "@/components/ui/input";

interface ContestSearchProps {
  searchQuery: string;
  onSearch: (query: string) => void;
}

export const ContestSearch = ({ searchQuery, onSearch }: ContestSearchProps) => {
  return (
    <div className="relative w-full mb-4">
      <Input 
        placeholder="Buscar concursos..." 
        className="w-full" 
        value={searchQuery}
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
};

export default ContestSearch;
