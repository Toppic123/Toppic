
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

import ContestFilters from "@/components/contests/ContestFilters";
import ContestGrid from "@/components/contests/ContestGrid";
import ContestMapView, { ViewToggleButton } from "@/components/contests/ContestMapView";
import { calculateDistance } from "@/utils/contestsData";
import { useContestsData } from "@/hooks/useContestsData";

const Contests = () => {
  const { contests: allContests, isLoading } = useContestsData();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeLocation, setActiveLocation] = useState("all");
  const [displayedContests, setDisplayedContests] = useState<any[]>([]);
  const [viewMode, setViewMode] = useState("grid");
  const [userLocation, setUserLocation] = useState<{ lat: number, lng: number } | null>(null);
  const [contestStatus, setContestStatus] = useState<"all" | "active" | "finished">("active");
  
  // Transform contests to match ContestGrid interface
  const transformedContests = allContests.map(contest => ({
    id: contest.id,
    title: contest.title,
    imageUrl: contest.imageUrl || `https://images.unsplash.com/photo-1583422409516-2895a77efded?w=400`,
    location: contest.location,
    locationCoords: contest.coordinates || { lat: 40.4168, lng: -3.7038 },
    maxDistance: 1, // Default max distance in km
    dateStart: contest.startDate || new Date().toISOString(),
    dateEnd: contest.endDate,
    participantsCount: contest.participants,
    photosCount: 0, // Default since it's not in the database yet
    category: contest.category,
    isActive: contest.isActive,
  }));
  
  // Extract unique categories and locations from contests
  const categories = ["all", ...Array.from(new Set(allContests.map(contest => contest.category)))];
  const locations = ["all", ...Array.from(new Set(allContests.map(contest => contest.location)))];
  
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
          console.error("Error obteniendo ubicación:", error);
        }
      );
    }
  }, []);
  
  // Filter contests based on search query, active category, location and status
  useEffect(() => {
    let filtered = transformedContests;
    
    // Filter by contest status (active or finished) - default to active only
    if (contestStatus !== "all") {
      const isActive = contestStatus === "active";
      filtered = filtered.filter(contest => contest.isActive === isActive);
    }
    
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
    
    // Sort by status - active contests first, then finished contests
    filtered = [...filtered].sort((a, b) => {
      if (a.isActive && !b.isActive) return -1;
      if (!a.isActive && b.isActive) return 1;
      return 0;
    });
    
    setDisplayedContests(filtered);
  }, [searchQuery, activeCategory, activeLocation, contestStatus, transformedContests]);
  
  // Clear all filters
  const clearFilters = () => {
    setSearchQuery("");
    setActiveCategory("all");
    setActiveLocation("all");
    setContestStatus("active");
  };

  if (isLoading) {
    return (
      <div className="pt-24 pb-16">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="flex justify-center items-center min-h-[400px]">
            <p className="text-lg text-muted-foreground">Cargando concursos...</p>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="pt-24 pb-16">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Explora concursos</h1>
            <p className="text-muted-foreground max-w-2xl text-lg">
              Descubre y participa en concursos de fotografía cerca de ti.
            </p>
          </div>
        </div>
        
        {/* Search and filters */}
        <ContestFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          activeLocation={activeLocation}
          setActiveLocation={setActiveLocation}
          contestStatus={contestStatus}
          setContestStatus={setContestStatus}
          categories={categories}
          locations={locations}
          clearFilters={clearFilters}
        />
        
        {/* View mode tabs - Both Grid and Map buttons with consistent styling */}
        <Tabs defaultValue="grid" value={viewMode} onValueChange={setViewMode} className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-base text-muted-foreground mr-4">
                {displayedContests.length} concursos encontrados
              </span>
            </div>
            <TabsList>
              <TabsTrigger 
                value="grid" 
                className={viewMode === "grid" ? "bg-[#4891AA] text-white hover:bg-[#3a7a8b]" : ""}
              >
                Lista
              </TabsTrigger>
              <TabsTrigger 
                value="map"
                className={viewMode === "map" ? "bg-[#4891AA] text-white hover:bg-[#3a7a8b]" : ""}
              >
                Mapa
              </TabsTrigger>
            </TabsList>
          </div>
          
          <Separator className="my-4" />
          
          <TabsContent value="grid" className="mt-6">
            <ContestGrid
              contests={displayedContests}
              userLocation={userLocation}
              calculateDistance={calculateDistance}
              clearFilters={clearFilters}
            />
          </TabsContent>
          
          <TabsContent value="map">
            <ContestMapView />
          </TabsContent>
        </Tabs>

        {/* Add style for grayscale effect */}
        <style>
          {`
            .grayscale {
              filter: grayscale(100%);
              transition: filter 0.3s ease;
            }
            .grayscale:hover {
              filter: grayscale(50%);
            }
          `}
        </style>
      </div>
    </div>
  );
};

export default Contests;
