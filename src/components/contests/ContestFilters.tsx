import { useState } from "react";
import { Search, Filter, X, MapPin, Tag, Calendar, Crown, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ContestFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  activeLocation: string;
  setActiveLocation: (location: string) => void;
  contestStatus: "all" | "active" | "finished";
  setContestStatus: (status: "all" | "active" | "finished") => void;
  isPremium: boolean;
  setIsPremium: (isPremium: boolean) => void;
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
  isPremium,
  setIsPremium,
  categories,
  locations,
  clearFilters
}: ContestFiltersProps) => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  
  const activeFiltersCount = [
    activeCategory !== "all",
    activeLocation !== "all",
    contestStatus !== "active",
    isPremium
  ].filter(Boolean).length;
  
  const statusOptions = [
    { value: "active", label: "Activos", icon: Calendar },
    { value: "finished", label: "Finalizados", icon: Calendar },
    { value: "all", label: "Todos", icon: Calendar }
  ];
  
  return (
    <div className="space-y-6 mb-8">
      {/* Enhanced Search Bar with Better Contrast */}
      <div className="relative max-w-3xl mx-auto">
        <div className="relative group">
          {/* Enhanced gradient background with more opacity */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-200/60 via-purple-100/60 to-pink-200/60 rounded-2xl blur-lg opacity-80 group-hover:opacity-100 transition-all duration-500"></div>
          
          {/* Main search container with stronger definition */}
          <div className="relative bg-white rounded-2xl border-2 border-gray-200 shadow-2xl hover:shadow-3xl hover:border-blue-300 transition-all duration-300 backdrop-blur-sm">
            {/* Enhanced search icon with better contrast */}
            <div className="absolute left-6 top-1/2 transform -translate-y-1/2 z-10">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-700 rounded-full flex items-center justify-center shadow-xl border-2 border-white">
                <Search className="w-6 h-6 text-white" />
              </div>
            </div>
            
            {/* Input field with enhanced styling */}
            <Input
              type="text"
              placeholder="Busca por nombre o ubicación"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-24 pr-16 py-8 text-lg font-medium border-0 bg-white/95 rounded-2xl placeholder:text-gray-500 focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 shadow-inner"
            />
            
            {/* Enhanced clear button */}
            {searchQuery && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 h-10 w-10 p-0 rounded-full hover:bg-red-50 hover:text-red-600 transition-all duration-200 border border-gray-200 hover:border-red-300"
              >
                <X className="h-5 w-5" />
              </Button>
            )}
            
            {/* Inner shadow for depth */}
            <div className="absolute inset-0 rounded-2xl shadow-inner pointer-events-none"></div>
          </div>
          
          {/* Enhanced decorative elements */}
          <div className="absolute -top-2 -right-2 w-5 h-5 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-pulse shadow-lg border-2 border-white"></div>
          <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-gradient-to-r from-pink-400 to-rose-500 rounded-full animate-pulse delay-1000 shadow-lg border-2 border-white"></div>
          
          {/* Additional accent line */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full opacity-60"></div>
        </div>
      </div>
      
      {/* Enhanced filters button and active filters */}
      <div className="flex items-center justify-center gap-4 flex-wrap">
        <Button 
          onClick={() => setShowFilters(!showFilters)}
          className="relative px-8 py-4 rounded-full border-2 border-transparent transition-all duration-300 shadow-lg hover:shadow-xl text-white"
          style={{ backgroundColor: '#f46464' }}
        >
          <Filter className="mr-3 h-5 w-5" />
          <span className="font-semibold">FILTROS</span>
          {activeFiltersCount > 0 && (
            <Badge className="ml-3 h-6 w-6 p-0 text-xs bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0 shadow-lg animate-pulse">
              {activeFiltersCount}
            </Badge>
          )}
          <ChevronDown className={cn("ml-2 h-4 w-4 transition-transform duration-200", showFilters && "rotate-180")} />
        </Button>
        
        {/* Enhanced active filter badges */}
        {activeCategory !== "all" && (
          <Badge variant="secondary" className="px-4 py-2 rounded-full border-2 border-gray-200 bg-white shadow-md">
            {activeCategory}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setActiveCategory("all")}
              className="ml-2 h-4 w-4 p-0 hover:bg-red-100 hover:text-red-600 rounded-full"
            >
              <X className="h-3 w-3" />
            </Button>
          </Badge>
        )}
        
        {activeLocation !== "all" && (
          <Badge variant="secondary" className="px-4 py-2 rounded-full border-2 border-gray-200 bg-white shadow-md">
            {activeLocation}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setActiveLocation("all")}
              className="ml-2 h-4 w-4 p-0 hover:bg-red-100 hover:text-red-600 rounded-full"
            >
              <X className="h-3 w-3" />
            </Button>
          </Badge>
        )}
        
        {contestStatus !== "active" && (
          <Badge variant="secondary" className="px-4 py-2 rounded-full border-2 border-gray-200 bg-white shadow-md">
            {contestStatus === "all" ? "Todos" : "Finalizados"}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setContestStatus("active")}
              className="ml-2 h-4 w-4 p-0 hover:bg-red-100 hover:text-red-600 rounded-full"
            >
              <X className="h-3 w-3" />
            </Button>
          </Badge>
        )}
        
        {isPremium && (
          <Badge variant="secondary" className="px-4 py-2 rounded-full border-2 border-gray-200 bg-white shadow-md">
            <Crown className="mr-1 h-3 w-3" />
            Premium
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsPremium(false)}
              className="ml-2 h-4 w-4 p-0 hover:bg-red-100 hover:text-red-600 rounded-full"
            >
              <X className="h-3 w-3" />
            </Button>
          </Badge>
        )}
      </div>

      {/* Horizontal Filters - New expandable section */}
      {showFilters && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-2xl border-2 border-gray-200 shadow-lg p-6 mt-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Estado del concurso */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" />
                <h3 className="font-semibold text-sm">Estado</h3>
              </div>
              <div className="space-y-2">
                {statusOptions.map((option) => (
                  <Button
                    key={option.value}
                    variant={contestStatus === option.value ? "default" : "outline"}
                    onClick={() => setContestStatus(option.value as any)}
                    size="sm"
                    className={cn(
                      "w-full justify-start text-xs h-8",
                      contestStatus === option.value 
                        ? "bg-primary text-primary-foreground" 
                        : "border-gray-200 hover:border-primary/50"
                    )}
                  >
                    <option.icon className="mr-2 h-3 w-3" />
                    {option.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Categorías */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Tag className="h-4 w-4 text-primary" />
                <h3 className="font-semibold text-sm">Categoría</h3>
              </div>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                <Button
                  variant={activeCategory === "all" ? "default" : "outline"}
                  onClick={() => setActiveCategory("all")}
                  size="sm"
                  className={cn(
                    "w-full justify-start text-xs h-8",
                    activeCategory === "all" 
                      ? "bg-primary text-primary-foreground" 
                      : "border-gray-200 hover:border-primary/50"
                  )}
                >
                  Todas
                </Button>
                {categories.slice(1, 4).map((category) => (
                  <Button
                    key={category}
                    variant={activeCategory === category ? "default" : "outline"}
                    onClick={() => setActiveCategory(category)}
                    size="sm"
                    className={cn(
                      "w-full justify-start text-xs h-8 capitalize",
                      activeCategory === category 
                        ? "bg-primary text-primary-foreground" 
                        : "border-gray-200 hover:border-primary/50"
                    )}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            {/* Tipo de concurso */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Crown className="h-4 w-4 text-primary" />
                <h3 className="font-semibold text-sm">Tipo</h3>
              </div>
              <div className="space-y-2">
                <Button
                  variant={!isPremium ? "default" : "outline"}
                  onClick={() => setIsPremium(false)}
                  size="sm"
                  className={cn(
                    "w-full justify-start text-xs h-8",
                    !isPremium 
                      ? "bg-primary text-primary-foreground" 
                      : "border-gray-200 hover:border-primary/50"
                  )}
                >
                  Todos
                </Button>
                <Button
                  variant={isPremium ? "default" : "outline"}
                  onClick={() => setIsPremium(true)}
                  size="sm"
                  className={cn(
                    "w-full justify-start text-xs h-8",
                    isPremium 
                      ? "bg-primary text-primary-foreground" 
                      : "border-gray-200 hover:border-primary/50"
                  )}
                >
                  <Crown className="mr-2 h-3 w-3" />
                  Premium
                </Button>
              </div>
            </div>

            {/* Ubicaciones */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <h3 className="font-semibold text-sm">Ubicación</h3>
              </div>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                <Button
                  variant={activeLocation === "all" ? "default" : "outline"}
                  onClick={() => setActiveLocation("all")}
                  size="sm"
                  className={cn(
                    "w-full justify-start text-xs h-8",
                    activeLocation === "all" 
                      ? "bg-primary text-primary-foreground" 
                      : "border-gray-200 hover:border-primary/50"
                  )}
                >
                  Todas
                </Button>
                {locations.slice(1, 4).map((location) => (
                  <Button
                    key={location}
                    variant={activeLocation === location ? "default" : "outline"}
                    onClick={() => setActiveLocation(location)}
                    size="sm"
                    className={cn(
                      "w-full justify-start text-xs h-8",
                      activeLocation === location 
                        ? "bg-primary text-primary-foreground" 
                        : "border-gray-200 hover:border-primary/50"
                    )}
                  >
                    {location}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Clear filters button */}
          {activeFiltersCount > 0 && (
            <div className="mt-4 pt-4 border-t border-gray-200 flex justify-center">
              <Button
                variant="outline"
                onClick={() => {
                  clearFilters();
                  setShowFilters(false);
                }}
                size="sm"
                className="border-2 border-gray-300 hover:border-red-400 hover:bg-red-50 hover:text-red-600"
              >
                <X className="mr-2 h-4 w-4" />
                Limpiar filtros
              </Button>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default ContestFilters;
