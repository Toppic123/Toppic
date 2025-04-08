
import { useState } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ContestFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  activeLocation: string;
  setActiveLocation: (location: string) => void;
  contestStatus: "all" | "active" | "finished";
  setContestStatus: (status: "all" | "active" | "finished") => void;
  categories: Array<{ id: string; name: string }>;
  locations: Array<{ id: string; name: string }>;
  clearFilters: () => void;
}

const ContestFilters = ({
  searchQuery,
  setSearchQuery,
  activeCategory,
  setActiveCategory,
  activeLocation,
  setActiveLocation,
  contestStatus,
  setContestStatus,
  categories,
  locations,
  clearFilters,
}: ContestFiltersProps) => {
  return (
    <div className="mb-8">
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por título o ubicación..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground hover:text-foreground"
              onClick={() => setSearchQuery("")}
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        
        {(searchQuery || activeCategory !== "all" || activeLocation !== "all" || contestStatus !== "all") && (
          <Button
            variant="outline"
            size="sm"
            onClick={clearFilters}
            className="h-10"
          >
            <X className="mr-2 h-4 w-4" />
            Limpiar filtros
          </Button>
        )}
      </div>
      
      {/* Contest status filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 max-w-full">
          <p className="text-sm text-muted-foreground whitespace-nowrap">Estado:</p>
          <Button
            variant={contestStatus === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setContestStatus("all")}
            className="rounded-full whitespace-nowrap"
          >
            Todos
          </Button>
          <Button
            variant={contestStatus === "active" ? "default" : "outline"}
            size="sm"
            onClick={() => setContestStatus("active")}
            className="rounded-full whitespace-nowrap"
          >
            Activos
          </Button>
          <Button
            variant={contestStatus === "finished" ? "default" : "outline"}
            size="sm"
            onClick={() => setContestStatus("finished")}
            className="rounded-full whitespace-nowrap"
          >
            Finalizados
          </Button>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 max-w-full">
          <p className="text-sm text-muted-foreground whitespace-nowrap">Categoría:</p>
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory(category.id)}
              className="rounded-full whitespace-nowrap"
            >
              {category.name}
            </Button>
          ))}
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 max-w-full">
          <p className="text-sm text-muted-foreground whitespace-nowrap">Ubicación:</p>
          {locations.map((location) => (
            <Button
              key={location.id}
              variant={activeLocation === location.id ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveLocation(location.id)}
              className="rounded-full whitespace-nowrap"
            >
              {location.name}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContestFilters;
