
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
    <div className="space-y-6 mb-8">
      {/* Modern Search Bar */}
      <div className="relative max-w-3xl mx-auto">
        <div className="relative group">
          {/* Gradient background container */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-100 via-purple-50 to-pink-100 rounded-2xl blur-xl opacity-70 group-hover:opacity-100 transition-all duration-500"></div>
          
          {/* Main search container */}
          <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300">
            {/* Search icon with animated background */}
            <div className="absolute left-6 top-1/2 transform -translate-y-1/2 z-10">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                <Search className="w-5 h-5 text-white" />
              </div>
            </div>
            
            {/* Input field */}
            <Input
              type="text"
              placeholder="Descubre concursos increíbles... busca por nombre o ubicación"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-20 pr-16 py-8 text-lg font-medium border-0 bg-transparent rounded-2xl placeholder:text-gray-400 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            
            {/* Clear button */}
            {searchQuery && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 h-10 w-10 p-0 rounded-full hover:bg-gray-100 transition-all duration-200"
              >
                <X className="h-5 w-5 text-gray-500" />
              </Button>
            )}
          </div>
          
          {/* Decorative elements */}
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full animate-pulse"></div>
          <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-pink-400 rounded-full animate-pulse delay-1000"></div>
        </div>
        
        {/* Search suggestions hint */}
        <div className="text-center mt-4">
          <p className="text-sm text-gray-500">
            💡 Busca por ejemplo: "Barcelona", "Naturaleza", "Retrato"
          </p>
        </div>
      </div>
      
      {/* Filters button and active filters */}
      <div className="flex items-center justify-center gap-4 flex-wrap">
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="relative px-8 py-4 rounded-full border-2 border-gray-200 hover:border-blue-400 hover:bg-blue-50 transition-all duration-300 shadow-md hover:shadow-lg">
              <Filter className="mr-3 h-5 w-5" />
              <span className="font-semibold">FILTROS</span>
              {activeFiltersCount > 0 && (
                <Badge className="ml-3 h-6 w-6 p-0 text-xs bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0">
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
          <Badge variant="secondary" className="px-4 py-2 rounded-full">
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
          <Badge variant="secondary" className="px-4 py-2 rounded-full">
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
          <Badge variant="secondary" className="px-4 py-2 rounded-full">
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
