
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, MapPin, Calendar, Filter, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import ContestCard from "@/components/ContestCard";
import Map from "@/components/Map";

// Mock data for contests
const allContests = [
  {
    id: "1",
    title: "Festival de Fotografía Urbana",
    imageUrl: "https://images.unsplash.com/photo-1514565131-fce0801e5785?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2532&q=80",
    location: "Barcelona",
    locationCoords: { lat: 41.3851, lng: 2.1734 },
    maxDistance: 1,
    dateStart: "2023-06-15",
    dateEnd: "2023-06-30",
    participantsCount: 124,
    photosCount: 348,
    category: "urbana",
  },
  {
    id: "2",
    title: "Naturaleza Salvaje",
    imageUrl: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2274&q=80",
    location: "Parque Nacional de Doñana",
    locationCoords: { lat: 37.0559, lng: -6.4408 },
    maxDistance: 2,
    dateStart: "2023-07-01",
    dateEnd: "2023-07-10",
    participantsCount: 78,
    photosCount: 215,
    category: "naturaleza",
  },
  {
    id: "3",
    title: "Gastronomía Local",
    imageUrl: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2274&q=80",
    location: "Madrid",
    locationCoords: { lat: 40.4168, lng: -3.7038 },
    maxDistance: 1,
    dateStart: "2023-07-15",
    dateEnd: "2023-07-20",
    participantsCount: 56,
    photosCount: 189,
    category: "gastronomía",
  },
  {
    id: "4",
    title: "Arquitectura Moderna",
    imageUrl: "https://images.unsplash.com/photo-1496564203457-11bb12075d90?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2276&q=80",
    location: "Valencia",
    locationCoords: { lat: 39.4699, lng: -0.3763 },
    maxDistance: 0.5,
    dateStart: "2023-08-01",
    dateEnd: "2023-08-10",
    participantsCount: 42,
    photosCount: 127,
    category: "arquitectura",
  },
  {
    id: "5",
    title: "Retratos Creativos",
    imageUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2274&q=80",
    location: "Sevilla",
    locationCoords: { lat: 37.3891, lng: -5.9845 },
    maxDistance: 1,
    dateStart: "2023-08-15",
    dateEnd: "2023-08-25",
    participantsCount: 89,
    photosCount: 203,
    category: "retratos",
  },
  {
    id: "6",
    title: "Paisajes Costeros",
    imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2273&q=80",
    location: "Málaga",
    locationCoords: { lat: 36.7213, lng: -4.4214 },
    maxDistance: 1.5,
    dateStart: "2023-09-01",
    dateEnd: "2023-09-10",
    participantsCount: 67,
    photosCount: 178,
    category: "paisajes",
  },
];

// Categories for filtering
const categories = [
  { id: "all", name: "Todos" },
  { id: "urbana", name: "Urbana" },
  { id: "naturaleza", name: "Naturaleza" },
  { id: "gastronomía", name: "Gastronomía" },
  { id: "arquitectura", name: "Arquitectura" },
  { id: "retratos", name: "Retratos" },
  { id: "paisajes", name: "Paisajes" },
];

// Locations for filtering
const locations = [
  { id: "all", name: "Todos" },
  { id: "barcelona", name: "Barcelona" },
  { id: "madrid", name: "Madrid" },
  { id: "valencia", name: "Valencia" },
  { id: "sevilla", name: "Sevilla" },
  { id: "malaga", name: "Málaga" },
];

const Contests = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeLocation, setActiveLocation] = useState("all");
  const [displayedContests, setDisplayedContests] = useState(allContests);
  const [viewMode, setViewMode] = useState("grid");
  const [userLocation, setUserLocation] = useState<{ lat: number, lng: number } | null>(null);
  
  // Get user location for distance calculations
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
  }, []);
  
  // Filter contests based on search query, active category, and location
  useEffect(() => {
    let filtered = allContests;
    
    // Filter by search query
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (contest) =>
          contest.title.toLowerCase().includes(query) ||
          contest.location.toLowerCase().includes(query)
      );
    }
    
    // Filter by category
    if (activeCategory !== "all") {
      filtered = filtered.filter((contest) => contest.category === activeCategory);
    }
    
    // Filter by location
    if (activeLocation !== "all") {
      filtered = filtered.filter((contest) => 
        contest.location.toLowerCase().includes(activeLocation.toLowerCase())
      );
    }
    
    setDisplayedContests(filtered);
  }, [searchQuery, activeCategory, activeLocation]);
  
  // Calculate distance between two coordinates in km
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1); 
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2); 
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    const d = R * c; // Distance in km
    return d;
  };
  
  const deg2rad = (deg: number) => {
    return deg * (Math.PI/180);
  };
  
  // Clear all filters
  const clearFilters = () => {
    setSearchQuery("");
    setActiveCategory("all");
    setActiveLocation("all");
  };
  
  return (
    <div className="pt-24 pb-16">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Explora concursos</h1>
            <p className="text-muted-foreground max-w-2xl">
              Descubre y participa en concursos de fotografía cerca de ti.
            </p>
          </div>
        </div>
        
        {/* Search and filters */}
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
            
            {(searchQuery || activeCategory !== "all" || activeLocation !== "all") && (
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
        
        {/* View mode tabs */}
        <Tabs defaultValue="grid" value={viewMode} onValueChange={setViewMode} className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-sm text-muted-foreground mr-4">
                {displayedContests.length} concursos encontrados
              </span>
            </div>
            <TabsList>
              <TabsTrigger value="grid">Cuadrícula</TabsTrigger>
              <TabsTrigger value="map">Mapa</TabsTrigger>
            </TabsList>
          </div>
          
          <Separator className="my-4" />
          
          <TabsContent value="grid" className="mt-6">
            {displayedContests.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayedContests.map((contest) => (
                  <div key={contest.id} className="relative">
                    <ContestCard key={contest.id} {...contest} />
                    {userLocation && (
                      <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full">
                        <div className="flex items-center">
                          <MapPin size={12} className="mr-1" />
                          <span>
                            {calculateDistance(
                              userLocation.lat,
                              userLocation.lng,
                              contest.locationCoords.lat,
                              contest.locationCoords.lng
                            ).toFixed(1)} km
                          </span>
                        </div>
                        <div className="text-xs text-gray-300">
                          Máx: {contest.maxDistance} km
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  No se encontraron concursos con los filtros actuales.
                </p>
                <Button variant="link" onClick={clearFilters}>
                  Limpiar filtros
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="map">
            <div className="mt-6">
              <Map />
              <div className="mt-4 p-4 border rounded-md bg-muted/50">
                <h3 className="text-sm font-medium mb-2">Restricciones de ubicación:</h3>
                <p className="text-sm text-muted-foreground">
                  Los participantes solo pueden subir fotos si están dentro de la distancia máxima especificada por cada concurso (indicada en la ficha del concurso).
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Contests;
