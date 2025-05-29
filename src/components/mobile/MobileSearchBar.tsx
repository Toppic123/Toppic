
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, X, MapPin, Tag } from "lucide-react";

interface SearchSuggestion {
  id: string;
  text: string;
  type: "location" | "topic";
  icon: typeof MapPin | typeof Tag;
}

interface MobileSearchBarProps {
  onSearch: (query: string, filters: string[]) => void;
  onClose?: () => void;
}

const searchSuggestions: SearchSuggestion[] = [
  { id: "1", text: "Barcelona", type: "location", icon: MapPin },
  { id: "2", text: "Madrid", type: "location", icon: MapPin },
  { id: "3", text: "Valencia", type: "location", icon: MapPin },
  { id: "4", text: "Sevilla", type: "location", icon: MapPin },
  { id: "5", text: "Arquitectura", type: "topic", icon: Tag },
  { id: "6", text: "Naturaleza", type: "topic", icon: Tag },
  { id: "7", text: "Retratos", type: "topic", icon: Tag },
  { id: "8", text: "Paisajes", type: "topic", icon: Tag },
  { id: "9", text: "Flores", type: "topic", icon: Tag },
  { id: "10", text: "Playa", type: "topic", icon: Tag },
];

const MobileSearchBar = ({ onSearch, onClose }: MobileSearchBarProps) => {
  const [query, setQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const filteredSuggestions = searchSuggestions.filter(suggestion =>
    suggestion.text.toLowerCase().includes(query.toLowerCase())
  );

  const handleAddFilter = (suggestion: SearchSuggestion) => {
    if (!selectedFilters.includes(suggestion.text)) {
      const newFilters = [...selectedFilters, suggestion.text];
      setSelectedFilters(newFilters);
      onSearch(query, newFilters);
    }
    setQuery("");
    setShowSuggestions(false);
  };

  const handleRemoveFilter = (filter: string) => {
    const newFilters = selectedFilters.filter(f => f !== filter);
    setSelectedFilters(newFilters);
    onSearch(query, newFilters);
  };

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query, selectedFilters);
      setShowSuggestions(false);
    }
  };

  const handleInputFocus = () => {
    setShowSuggestions(true);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="bg-white">
      {/* Search Input */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Buscar lugares o temas..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={handleInputFocus}
              onKeyPress={handleKeyPress}
              className="pl-10 pr-4"
            />
          </div>
          {onClose && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-gray-600"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Selected Filters */}
        {selectedFilters.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {selectedFilters.map((filter) => (
              <Badge
                key={filter}
                variant="secondary"
                className="flex items-center gap-1"
              >
                {filter}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveFilter(filter)}
                  className="h-auto p-0 ml-1 hover:bg-transparent"
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* Search Suggestions */}
      {showSuggestions && (
        <div className="max-h-60 overflow-y-auto">
          {filteredSuggestions.length > 0 ? (
            <div className="p-2">
              <div className="text-xs font-medium text-gray-500 mb-2 px-2">
                Sugerencias
              </div>
              {filteredSuggestions.map((suggestion) => (
                <Button
                  key={suggestion.id}
                  variant="ghost"
                  onClick={() => handleAddFilter(suggestion)}
                  className="w-full justify-start p-2 h-auto text-left"
                >
                  <suggestion.icon className="h-4 w-4 mr-2 text-gray-400" />
                  <span>{suggestion.text}</span>
                  <Badge 
                    variant="outline" 
                    className="ml-auto text-xs"
                  >
                    {suggestion.type === "location" ? "Lugar" : "Tema"}
                  </Badge>
                </Button>
              ))}
            </div>
          ) : query.length > 0 ? (
            <div className="p-4 text-center text-gray-500">
              No se encontraron sugerencias
            </div>
          ) : (
            <div className="p-2">
              <div className="text-xs font-medium text-gray-500 mb-2 px-2">
                Búsquedas populares
              </div>
              {searchSuggestions.slice(0, 6).map((suggestion) => (
                <Button
                  key={suggestion.id}
                  variant="ghost"
                  onClick={() => handleAddFilter(suggestion)}
                  className="w-full justify-start p-2 h-auto text-left"
                >
                  <suggestion.icon className="h-4 w-4 mr-2 text-gray-400" />
                  <span>{suggestion.text}</span>
                  <Badge 
                    variant="outline" 
                    className="ml-auto text-xs"
                  >
                    {suggestion.type === "location" ? "Lugar" : "Tema"}
                  </Badge>
                </Button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MobileSearchBar;
