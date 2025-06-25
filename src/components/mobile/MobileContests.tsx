
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Calendar, Trophy, Camera, Filter, Map as MapIcon } from "lucide-react";
import MobileSearchBar from "./MobileSearchBar";
import MobileFilters from "./MobileFilters";
import MobileContestDetail from "./MobileContestDetail";
import Map from "@/components/Map";
import { useContestsData } from "@/hooks/useContestsData";

interface MobileContestsProps {
  onNavigate: (screen: 'upload' | 'voting' | 'vote' | 'profile') => void;
}

const MobileContests = ({ onNavigate }: MobileContestsProps) => {
  const { contests: allContests, isLoading } = useContestsData();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [showSearch, setShowSearch] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [selectedContestId, setSelectedContestId] = useState<string | null>(null);
  const [locationFilter, setLocationFilter] = useState("");
  const [themeFilter, setThemeFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const handleSearch = (query: string, filters: string[]) => {
    setSearchQuery(query);
    setActiveFilters(filters);
    console.log("Searching for:", query, "with filters:", filters);
  };

  const handleFiltersApply = (location: string, theme: string, status: string) => {
    setLocationFilter(location);
    setThemeFilter(theme);
    setStatusFilter(status);
    setShowFilters(false);
  };

  const handleContestClick = (contestId: string) => {
    setSelectedContestId(contestId);
  };

  const handleBackFromDetail = () => {
    setSelectedContestId(null);
  };

  // Convert contests to mobile format
  const mobileContests = allContests.map(contest => ({
    id: contest.id,
    title: contest.title,
    location: contest.location,
    distance: "0.5 km", // Default distance
    endDate: contest.endDate,
    participants: contest.participants,
    prize: contest.prize || "500€",
    image: contest.imageUrl || "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=400",
    topics: [contest.category],
    isActive: contest.isActive,
    proximityKm: 0.5
  }));

  const filteredContests = mobileContests
    .filter(contest => {
      const matchesQuery = contest.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          contest.location.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesFilters = activeFilters.length === 0 || 
                            activeFilters.some(filter => 
                              contest.location.toLowerCase().includes(filter.toLowerCase()) ||
                              contest.topics.some(topic => topic.toLowerCase().includes(filter.toLowerCase()))
                            );

      const matchesLocation = !locationFilter || contest.location.toLowerCase().includes(locationFilter.toLowerCase());
      const matchesTheme = !themeFilter || contest.topics.some(topic => topic.toLowerCase().includes(themeFilter.toLowerCase()));
      const matchesStatus = statusFilter === "all" || 
                           (statusFilter === "active" && contest.isActive) ||
                           (statusFilter === "finished" && !contest.isActive);
      
      return matchesQuery && matchesFilters && matchesLocation && matchesTheme && matchesStatus;
    })
    .sort((a, b) => a.proximityKm - b.proximityKm);

  if (isLoading) {
    return (
      <div className="h-full bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">Cargando concursos...</p>
      </div>
    );
  }

  if (selectedContestId) {
    return (
      <MobileContestDetail 
        contestId={selectedContestId}
        onNavigate={(screen) => {
          if (screen === 'contests') {
            handleBackFromDetail();
          } else {
            onNavigate(screen);
          }
        }}
      />
    );
  }

  if (showSearch) {
    return (
      <div className="h-full bg-white">
        <MobileSearchBar 
          onSearch={handleSearch}
          onClose={() => setShowSearch(false)}
        />
      </div>
    );
  }

  if (showFilters) {
    return (
      <div className="h-full bg-white">
        <MobileFilters 
          onApply={handleFiltersApply}
          onClose={() => setShowFilters(false)}
          initialLocation={locationFilter}
          initialTheme={themeFilter}
          initialStatus={statusFilter}
        />
      </div>
    );
  }

  if (showMap) {
    return (
      <div className="h-full bg-white">
        <div className="bg-white px-4 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowMap(false)}
              className="text-gray-600 hover:bg-gray-100 p-2"
            >
              ← Volver
            </Button>
            <h1 className="text-lg font-semibold">Mapa de Concursos</h1>
            <div></div>
          </div>
        </div>
        <div className="flex-1">
          <Map showMustardButton={true} />
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-gray-50 overflow-y-auto">
      {/* Header */}
      <div className="bg-white px-4 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-xl font-semibold text-gray-900">Concursos</h1>
        </div>
        <Button
          variant="outline"
          onClick={() => setShowSearch(true)}
          className="w-full justify-start text-gray-500"
        >
          <Search className="h-4 w-4 mr-2" />
          Buscar lugares o temas...
        </Button>
      </div>

      {/* Filters and Map Section */}
      <div className="px-4 py-3 bg-white border-b border-gray-200">
        <div className="flex space-x-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(true)}
            className="flex-1"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filtros
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowMap(true)}
            className="flex-1"
          >
            <MapIcon className="h-4 w-4 mr-2" />
            Mapa
          </Button>
        </div>
      </div>

      {/* Active Filters Display */}
      {(activeFilters.length > 0 || locationFilter || themeFilter || statusFilter !== "all") && (
        <div className="px-4 py-3 bg-white border-b border-gray-200">
          <div className="text-sm text-gray-600 mb-2">Filtros activos:</div>
          <div className="flex flex-wrap gap-2">
            {activeFilters.map((filter, index) => (
              <Badge key={index} variant="secondary">
                {filter}
              </Badge>
            ))}
            {locationFilter && (
              <Badge variant="secondary">
                Ubicación: {locationFilter}
              </Badge>
            )}
            {themeFilter && (
              <Badge variant="secondary">
                Tema: {themeFilter}
              </Badge>
            )}
            {statusFilter !== "all" && (
              <Badge variant="secondary">
                {statusFilter === "active" ? "Activos" : "Finalizados"}
              </Badge>
            )}
          </div>
        </div>
      )}

      {/* Contests List */}
      <div className="p-4 space-y-4">
        {filteredContests.length > 0 ? (
          filteredContests.map((contest, index) => (
            <div key={contest.id}>
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="relative">
                  <img 
                    src={contest.image} 
                    alt={contest.title}
                    className="w-full h-40 object-cover cursor-pointer"
                    onClick={() => handleContestClick(contest.id)}
                  />
                  <div className="absolute top-3 right-3">
                    <Badge className={contest.isActive ? "bg-green-500 text-white" : "bg-gray-500 text-white"}>
                      {contest.isActive ? "Activo" : "Finalizado"}
                    </Badge>
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 
                    className="font-semibold text-lg text-gray-900 mb-2 cursor-pointer hover:text-blue-600"
                    onClick={() => handleContestClick(contest.id)}
                  >
                    {contest.title}
                  </h3>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gray-600 text-sm">
                      <MapPin className="h-4 w-4 mr-2" />
                      {contest.location} • {contest.distance}
                    </div>
                    <div className="flex items-center text-gray-600 text-sm">
                      <Calendar className="h-4 w-4 mr-2" />
                      Termina el {new Date(contest.endDate).toLocaleDateString()}
                    </div>
                    <div className="flex items-center text-gray-600 text-sm">
                      <Trophy className="h-4 w-4 mr-2" />
                      Premio: {contest.prize}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {contest.topics.map((topic, topicIndex) => (
                      <Badge key={topicIndex} variant="outline" className="text-xs">
                        {topic}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">{contest.participants} participantes</span>
                      <Button 
                        size="sm"
                        onClick={() => onNavigate('upload')}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        <Camera className="h-4 w-4 mr-1" />
                        Participar
                      </Button>
                    </div>
                    
                    <div className="flex space-x-3">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => onNavigate('voting')}
                        className="flex-1"
                      >
                        Fotos
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => onNavigate('vote')}
                        className="flex-1 bg-purple-50 text-purple-600 border-purple-200 hover:bg-purple-100"
                      >
                        Votar
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">No se encontraron concursos que coincidan con tu búsqueda</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileContests;
