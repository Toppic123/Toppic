
import { useState } from "react";
import { Search, X, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

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
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  return (
    <div className="mb-8">
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <div className="relative flex-grow">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Buscar por título o ubicación..."
            className="pl-12 h-14 text-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground hover:text-foreground"
              onClick={() => setSearchQuery("")}
              aria-label="Clear search"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>
        
        <Sheet open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="lg" className="h-14 px-6">
              <Filter className="mr-2 h-5 w-5" />
              FILTROS
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Filtros de Concursos</SheetTitle>
              <SheetDescription>
                Filtra los concursos según tus preferencias
              </SheetDescription>
            </SheetHeader>
            
            <div className="mt-6 space-y-6">
              {/* Contest status filter */}
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-3">Estado</h3>
                <div className="flex flex-col gap-2">
                  <Button
                    variant={contestStatus === "all" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setContestStatus("all")}
                    className="justify-start"
                  >
                    Todos
                  </Button>
                  <Button
                    variant={contestStatus === "active" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setContestStatus("active")}
                    className="justify-start"
                  >
                    Activos
                  </Button>
                  <Button
                    variant={contestStatus === "finished" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setContestStatus("finished")}
                    className="justify-start"
                  >
                    Finalizados
                  </Button>
                </div>
              </div>
              
              {/* Category filter */}
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-3">Categoría</h3>
                <div className="flex flex-col gap-2">
                  {categories.map((category) => (
                    <Button
                      key={category.id}
                      variant={activeCategory === category.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => setActiveCategory(category.id)}
                      className="justify-start"
                    >
                      {category.name}
                    </Button>
                  ))}
                </div>
              </div>
              
              {/* Location filter */}
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-3">Ubicación</h3>
                <div className="flex flex-col gap-2">
                  {locations.map((location) => (
                    <Button
                      key={location.id}
                      variant={activeLocation === location.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => setActiveLocation(location.id)}
                      className="justify-start"
                    >
                      {location.name}
                    </Button>
                  ))}
                </div>
              </div>
              
              {(searchQuery || activeCategory !== "all" || activeLocation !== "all" || contestStatus !== "all") && (
                <Button
                  variant="outline"
                  onClick={() => {
                    clearFilters();
                    setIsFiltersOpen(false);
                  }}
                  className="w-full"
                >
                  <X className="mr-2 h-4 w-4" />
                  Limpiar filtros
                </Button>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default ContestFilters;
