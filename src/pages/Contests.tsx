import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Grid3X3, Map } from "lucide-react";

import ContestFilters from "@/components/contests/ContestFilters";
import ContestGrid from "@/components/contests/ContestGrid";
import ContestMapView, { ViewToggleButton } from "@/components/contests/ContestMapView";
import ContestHeroSection from "@/components/contests/ContestHeroSection";
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
  const [isPremium, setIsPremium] = useState(false);
  
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
      plan: contest.plan || 'basic',
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
      isPremium,
      totalContests: transformedContests.length 
    });
    
    let filtered = [...transformedContests];
    
    // Filter by contest status (active or finished) - default to active only
    if (contestStatus !== "all") {
      const isActive = contestStatus === "active";
      filtered = filtered.filter(contest => contest.isActive === isActive);
    }
    
    // Filter by premium contests
    if (isPremium) {
      filtered = filtered.filter(contest => contest.plan === 'premium');
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
  }, [transformedContests, searchQuery, activeCategory, activeLocation, userLocation, contestStatus, isPremium]);
  
  // Clear all filters
  const clearFilters = () => {
    setSearchQuery("");
    setActiveCategory("all");
    setActiveLocation("all");
    setContestStatus("active");
    setIsPremium(false);
  };

  if (isLoading) {
    return (
      <div className="pt-24 pb-16 min-h-screen">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="flex justify-center items-center min-h-[400px]">
            <p className="text-lg text-muted-foreground">Cargando concursos...</p>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen">
      {/* Contest Hero Section */}
      <ContestHeroSection />
      
      <div className="pt-16 pb-16">
        <div className="container max-w-7xl mx-auto px-4">
          {/* Search and filters */}
          <div className="mb-8">
            <ContestFilters
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
              activeLocation={activeLocation}
              setActiveLocation={setActiveLocation}
              contestStatus={contestStatus}
              setContestStatus={setContestStatus}
              isPremium={isPremium}
              setIsPremium={setIsPremium}
              categories={categories}
              locations={locations}
              clearFilters={clearFilters}
            />
          </div>
          
          {/* Modern View mode tabs */}
          <Tabs defaultValue="grid" value={viewMode} onValueChange={setViewMode} className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <span className="text-lg font-medium text-gray-700">
                  {displayedContests.length} concursos encontrados
                </span>
              </div>
              
              {/* Redesigned View Toggle */}
              <div className="relative">
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden"
                >
                  <TabsList className="grid w-full grid-cols-2 bg-gray-50 p-2 h-16 gap-2">
                    <TabsTrigger 
                      value="grid" 
                      className={`
                        relative px-8 py-3 rounded-xl font-bold text-sm transition-all duration-300 group
                        ${viewMode === "grid" 
                          ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg transform scale-105" 
                          : "text-gray-600 hover:text-gray-800 hover:bg-white/80"
                        }
                      `}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`
                          p-2 rounded-lg transition-all duration-300
                          ${viewMode === "grid" 
                            ? "bg-white/20" 
                            : "bg-gray-100 group-hover:bg-gray-200"
                          }
                        `}>
                          <Grid3X3 className={`w-4 h-4 ${viewMode === "grid" ? "text-white" : ""}`} />
                        </div>
                        <span className={viewMode === "grid" ? "text-white" : ""}>LISTA</span>
                      </div>
                      {viewMode === "grid" && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl -z-10"
                          initial={false}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        />
                      )}
                    </TabsTrigger>
                    
                    <TabsTrigger 
                      value="map"
                      className={`
                        relative px-8 py-3 rounded-xl font-bold text-sm transition-all duration-300 group
                        ${viewMode === "map" 
                          ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg transform scale-105" 
                          : "text-gray-600 hover:text-gray-800 hover:bg-white/80"
                        }
                      `}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`
                          p-2 rounded-lg transition-all duration-300 transform
                          ${viewMode === "map" 
                            ? "bg-white/20 shadow-lg" 
                            : "bg-gray-100 group-hover:bg-gray-200 hover:shadow-md hover:scale-105"
                          }
                        `}>
                          <Map className={`w-4 h-4 ${viewMode === "map" ? "text-white" : ""}`} />
                        </div>
                        <span className={`${viewMode === "map" ? "text-white font-semibold" : "font-medium"}`}>MAPA</span>
                      </div>
                      {viewMode === "map" && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl -z-10 shadow-xl ring-2 ring-emerald-400/50"
                          initial={false}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        />
                      )}
                    </TabsTrigger>
                  </TabsList>
                </motion.div>
                
                {/* Floating badge indicator */}
                <motion.div
                  className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center shadow-lg"
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <span className="text-xs font-bold text-white">✨</span>
                </motion.div>
              </div>
            </div>
            
            <Separator className="my-6 bg-gradient-to-r from-transparent via-gray-300 to-transparent h-px" />
            
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
        </div>
      </div>
    </div>
  );
};

export default Contests;
