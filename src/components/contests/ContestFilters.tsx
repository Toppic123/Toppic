
import { useState } from "react";
import { Search, Filter, X, MapPin, Tag, Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ContestFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  activeLocation: string;
  setActiveLocation: (location: string) => void;
  contestStatus: "all" | "active" | "finished";
  setContestStatus: (status: "all" | "active" | "finished") => void;
  categories: string[];
  locations: string[];
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
  clearFilters
}: ContestFiltersProps) => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  
  const activeFiltersCount = [
    activeCategory !== "all",
    activeLocation !== "all",
    contestStatus !== "active"
  ].filter(Boolean).length;
  
  const statusOptions = [
    { value: "active", label: "Activos", icon: Calendar },
    { value: "finished", label: "Finalizados", icon: Calendar },
    { value: "all", label: "Todos", icon: Calendar }
  ];
  
  return (
    <div className="space-y-4 mb-8">
      {/* Search bar - larger and more prominent */}
      <div className="relative max-w-2xl mx-auto">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
        <Input
          type="text"
          placeholder="Buscar concursos por nombre o ubicación..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-12 pr-4 py-6 text-lg border-2 border-border focus:border-primary rounded-xl bg-white shadow-sm"
        />
        {searchQuery && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSearchQuery("")}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
      
      {/* Filters button and active filters */}
      <div className="flex items-center justify-center gap-4 flex-wrap">
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="relative px-6 py-3 rounded-full border-2">
              <Filter className="mr-2 h-4 w-4" />
              FILTROS
              {activeFiltersCount > 0 && (
                <Badge className="ml-2 h-5 w-5 p-0 text-xs bg-primary">
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>
          </SheetTrigger>
          
          <SheetContent side="right" className="w-full sm:w-96 overflow-y-auto">
            <SheetHeader className="pb-6">
              <SheetTitle className="text-xl font-bold">Filtros de búsqueda</SheetTitle>
            </SheetHeader>
            
            <div className="space-y-6">
              {/* Estado del concurso */}
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-4">
                    <Calendar className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold text-lg">Estado</h3>
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    {statusOptions.map((option) => (
                      <Button
                        key={option.value}
                        variant={contestStatus === option.value ? "default" : "outline"}
                        onClick={() => setContestStatus(option.value as any)}
                        className={cn(
                          "justify-start h-auto p-3 rounded-lg",
                          contestStatus === option.value && "bg-primary text-primary-foreground"
                        )}
                      >
                        <option.icon className="mr-2 h-4 w-4" />
                        {option.label}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              {/* Categorías */}
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-4">
                    <Tag className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold text-lg">Categoría</h3>
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    <Button
                      variant={activeCategory === "all" ? "default" : "outline"}
                      onClick={() => setActiveCategory("all")}
                      className={cn(
                        "justify-start h-auto p-3 rounded-lg",
                        activeCategory === "all" && "bg-primary text-primary-foreground"
                      )}
                    >
                      Todas las categorías
                    </Button>
                    {categories.map((category) => (
                      <Button
                        key={category}
                        variant={activeCategory === category ? "default" : "outline"}
                        onClick={() => setActiveCategory(category)}
                        className={cn(
                          "justify-start h-auto p-3 rounded-lg capitalize",
                          activeCategory === category && "bg-primary text-primary-foreground"
                        )}
                      >
                        {category}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              {/* Ubicaciones */}
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-4">
                    <MapPin className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold text-lg">Ubicación</h3>
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    <Button
                      variant={activeLocation === "all" ? "default" : "outline"}
                      onClick={() => setActiveLocation("all")}
                      className={cn(
                        "justify-start h-auto p-3 rounded-lg",
                        activeLocation === "all" && "bg-primary text-primary-foreground"
                      )}
                    >
                      Todas las ubicaciones
                    </Button>
                    {locations.map((location) => (
                      <Button
                        key={location}
                        variant={activeLocation === location ? "default" : "outline"}
                        onClick={() => setActiveLocation(location)}
                        className={cn(
                          "justify-start h-auto p-3 rounded-lg",
                          activeLocation === location && "bg-primary text-primary-foreground"
                        )}
                      >
                        {location}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Clear filters button */}
            {activeFiltersCount > 0 && (
              <div className="mt-6 pt-4 border-t">
                <Button
                  variant="outline"
                  onClick={() => {
                    clearFilters();
                    setIsSheetOpen(false);
                  }}
                  className="w-full"
                >
                  <X className="mr-2 h-4 w-4" />
                  Limpiar filtros
                </Button>
              </div>
            )}
          </SheetContent>
        </Sheet>
        
        {/* Active filter badges */}
        {activeCategory !== "all" && (
          <Badge variant="secondary" className="px-3 py-1">
            {activeCategory}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setActiveCategory("all")}
              className="ml-2 h-4 w-4 p-0 hover:bg-transparent"
            >
              <X className="h-3 w-3" />
            </Button>
          </Badge>
        )}
        
        {activeLocation !== "all" && (
          <Badge variant="secondary" className="px-3 py-1">
            {activeLocation}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setActiveLocation("all")}
              className="ml-2 h-4 w-4 p-0 hover:bg-transparent"
            >
              <X className="h-3 w-3" />
            </Button>
          </Badge>
        )}
        
        {contestStatus !== "active" && (
          <Badge variant="secondary" className="px-3 py-1">
            {contestStatus === "all" ? "Todos" : "Finalizados"}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setContestStatus("active")}
              className="ml-2 h-4 w-4 p-0 hover:bg-transparent"
            >
              <X className="h-3 w-3" />
            </Button>
          </Badge>
        )}
      </div>
    </div>
  );
};

export default ContestFilters;
