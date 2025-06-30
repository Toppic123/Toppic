import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Eye } from "lucide-react";

import ContestFilters from "@/components/contests/ContestFilters";
import ContestGrid from "@/components/contests/ContestGrid";
import ContestMapView, { ViewToggleButton } from "@/components/contests/ContestMapView";
import WinningPhotosCarousel from "@/components/contests/WinningPhotosCarousel";
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
  
  // Memoize transformed contests to prevent recreation on every render
  const transformedContests = useMemo(() => {
    return allContests.map(contest => ({
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
  }, [allContests]);
  
  // Extract unique categories and locations from contests - memoized
  const { categories, locations } = useMemo(() => {
    const cats = ["all", ...Array.from(new Set(allContests.map(contest => contest.category)))];
    const locs = ["all", ...Array.from(new Set(allContests.map(contest => contest.location)))];
    return { categories: cats, locations: locs };
  }, [allContests]);
  
  // Get user location for distance calculations
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log('User location obtained:', {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            accuracy: position.coords.accuracy
          });
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error("Error obteniendo ubicación:", error);
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 60000
        }
      );
    }
  }, []);
  
  // Filter contests based on search query, active category, location and status
  useEffect(() => {
    console.log('Filtering contests with:', { 
      searchQuery, 
      activeCategory, 
      activeLocation, 
      contestStatus,
      totalContests: transformedContests.length 
    });
    
    let filtered = [...transformedContests];
    
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
    
    console.log('Filtered contests:', filtered.length);
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
      <div className="min-h-screen">
        <div className="flex justify-center items-center min-h-[400px]">
          <p className="text-lg text-muted-foreground">Cargando concursos...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen">
      {/* Winning Photos Carousel - positioned at the top with proper spacing */}
      <div className="w-full bg-gradient-to-b from-gray-50 to-white py-8">
        <WinningPhotosCarousel />
      </div>
      
      {/* Main content with proper spacing */}
      <div className="container max-w-7xl mx-auto px-4 pt-8">
        {/* Search and filters */}
        <div className="mb-6">
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
        </div>
        
        {/* Enhanced View mode tabs with prominent highlighting */}
        <Tabs defaultValue="grid" value={viewMode} onValueChange={setViewMode} className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-base text-muted-foreground mr-4">
                {displayedContests.length} concursos encontrados
              </span>
            </div>
            
            {/* Enhanced TabsList with prominent styling */}
            <div className="relative">
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                className="bg-gradient-to-r from-blue-50 to-indigo-50 p-1 rounded-xl border-2 border-blue-200 shadow-lg"
              >
                <TabsList className="grid w-full grid-cols-2 bg-transparent p-1 h-12">
                  <TabsTrigger 
                    value="grid" 
                    className={`
                      relative px-6 py-2 rounded-lg font-semibold text-sm transition-all duration-300 
                      ${viewMode === "grid" 
                        ? "bg-gradient-to-r from-[#4891AA] to-[#3a7a8b] text-white shadow-lg transform scale-105" 
                        : "text-gray-600 hover:text-gray-800 hover:bg-white/50"
                      }
                    `}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    LISTA
                  </TabsTrigger>
                  <TabsTrigger 
                    value="map"
                    className={`
                      relative px-6 py-2 rounded-lg font-semibold text-sm transition-all duration-300
                      ${viewMode === "map" 
                        ? "bg-gradient-to-r from-[#4891AA] to-[#3a7a8b] text-white shadow-lg transform scale-105" 
                        : "text-gray-600 hover:text-gray-800 hover:bg-white/50"
                      }
                    `}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    MAPA
                  </TabsTrigger>
                </TabsList>
              </motion.div>
              
              {/* Visual emphasis indicator */}
              <motion.div
                className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>
          </div>
          
          <Separator className="my-4" />
          
          <TabsContent value="grid" className="mt-6">
            <div className="min-h-[400px]">
              <ContestGrid
                contests={displayedContests}
                userLocation={userLocation}
                calculateDistance={calculateDistance}
                clearFilters={clearFilters}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="map" className="mt-6">
            <div className="min-h-[600px]">
              <ContestMapView />
            </div>
          </TabsContent>
        </Tabs>

        {/* Add enhanced style for button emphasis */}
        <style>
          {`
            .grayscale {
              filter: grayscale(100%);
              transition: filter 0.3s ease;
            }
            .grayscale:hover {
              filter: grayscale(50%);
            }
            
            /* Additional emphasis for view mode buttons */
            [data-state="active"] {
              position: relative;
            }
            
            [data-state="active"]::before {
              content: '';
              position: absolute;
              top: -3px;
              left: -3px;
              right: -3px;
              bottom: -3px;
              background: linear-gradient(45deg, #4891AA, #FFD700, #4891AA);
              border-radius: 12px;
              z-index: -1;
              animation: pulse 2s infinite;
            }
          `}
        </style>
      </div>
    </div>
  );
};

export default Contests;
