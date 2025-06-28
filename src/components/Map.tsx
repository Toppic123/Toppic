
import { useEffect, useRef, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useContestsData } from "@/hooks/useContestsData";
import { 
  loadLeaflet, 
  initializeMap, 
  createContestMarkers, 
  calculateDistance,
  addUserLocationMarker 
} from "./map/mapUtils";
import MapLoadingState from "./map/MapLoadingState";
import SearchButton from "./map/SearchButton";
import NearbyContestsList from "./map/NearbyContestsList";
import SelectedContestCard from "./map/SelectedContestCard";

interface MapProps {
  showMustardButton?: boolean;
}

// Generate realistic coordinates based on location - Updated with better Andorra support
const getCoordinatesForLocation = (location: string) => {
  const locationMap: { [key: string]: { lat: number, lng: number } } = {
    'madrid': { lat: 40.4168, lng: -3.7038 },
    'barcelona': { lat: 41.3851, lng: 2.1734 },
    'valencia': { lat: 39.4699, lng: -0.3763 },
    'sevilla': { lat: 37.3891, lng: -5.9845 },
    'bilbao': { lat: 43.2627, lng: -2.9253 },
    'andorra la vella': { lat: 42.5063, lng: 1.5218 },
    'andorra': { lat: 42.5063, lng: 1.5218 },
    'escaldes-engordany': { lat: 42.5079, lng: 1.5346 },
    'escaldes': { lat: 42.5079, lng: 1.5346 },
    'encamp': { lat: 42.5313, lng: 1.5839 },
    'la massana': { lat: 42.5456, lng: 1.5149 },
    'ordino': { lat: 42.5563, lng: 1.5331 },
    'sant julià de lòria': { lat: 42.4639, lng: 1.4913 },
    'canillo': { lat: 42.5676, lng: 1.5976 },
    'zaragoza': { lat: 41.6488, lng: -0.8891 },
    'málaga': { lat: 36.7213, lng: -4.4213 },
    'palma': { lat: 39.5696, lng: 2.6502 }
  };

  const locationKey = location.toLowerCase().trim();
  
  console.log('Buscando coordenadas para ubicación:', locationKey);
  
  // Try to find exact match first
  if (locationMap[locationKey]) {
    console.log('Coordenadas encontradas:', locationMap[locationKey]);
    return locationMap[locationKey];
  }
  
  // Try partial matches for Andorra locations
  for (const [key, coords] of Object.entries(locationMap)) {
    if (locationKey.includes(key) || key.includes(locationKey)) {
      console.log('Coordenadas encontradas por coincidencia parcial:', coords, 'para', key);
      return coords;
    }
  }
  
  // Default to Madrid with slight randomization if location not found
  console.log('Ubicación no encontrada, usando Madrid por defecto');
  return { 
    lat: 40.4168 + (Math.random() - 0.5) * 0.1, 
    lng: -3.7038 + (Math.random() - 0.5) * 0.1 
  };
};

// Convert contest data to map-compatible format
const convertContestToMapFormat = (contest: any) => {
  const coordinates = getCoordinatesForLocation(contest.location || "madrid");
  
  console.log('Convirtiendo concurso:', contest.title, 'ubicación:', contest.location, 'coordenadas:', coordinates);
  
  return {
    id: contest.id,
    title: contest.title,
    location: contest.location,
    coords: coordinates,
    description: contest.description || "Descripción del concurso disponible pronto.",
    endDate: contest.endDate,
    participants: contest.participants,
    isActive: contest.isActive,
    prize: contest.prize || "500€",
    imageUrl: contest.imageUrl || "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=400",
    organizer: contest.organizer,
    photosCount: 0,
    isPrivate: contest.is_private || false
  };
};

const Map = ({ showMustardButton = false }: MapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const [selectedContest, setSelectedContest] = useState<any>(null);
  const [isMapLoading, setIsMapLoading] = useState(true);
  const [isLocating, setIsLocating] = useState(false);
  const [userLocation, setUserLocation] = useState<{ lat: number, lng: number } | null>(null);
  const [nearbyContests, setNearbyContests] = useState<any[]>([]);
  const [leafletLoaded, setLeafletLoaded] = useState(false);
  const { toast } = useToast();
  
  // Get real contests data from Supabase
  const { contests: realContests, isLoading: contestsLoading } = useContestsData();

  // Convert real contests to map format
  const mapContests = realContests.map(convertContestToMapFormat);
  const activeMapContests = mapContests.filter(contest => contest.isActive);

  console.log("Contests from database:", realContests);
  console.log("Converted map contests:", mapContests);

  const initMap = async () => {
    if (!mapRef.current || mapInstanceRef.current || !leafletLoaded) return;

    try {
      const map = initializeMap(mapRef.current);
      mapInstanceRef.current = map;
      setIsMapLoading(false);
      addContestMarkers();
    } catch (error) {
      console.error("Error initializing map:", error);
      setIsMapLoading(false);
    }
  };

  const addContestMarkers = () => {
    if (!mapInstanceRef.current || contestsLoading) return;

    // Clear existing markers
    markersRef.current.forEach(marker => {
      mapInstanceRef.current?.removeLayer(marker);
    });
    markersRef.current = [];

    // Add markers for real contests from database
    const markers = createContestMarkers(mapContests, mapInstanceRef.current, setSelectedContest);
    markersRef.current = markers;
  };

  const findNearbyContests = (userLat: number, userLng: number, maxDistance = 500) => {
    console.log('Buscando concursos cerca de:', userLat, userLng);
    
    const nearby = activeMapContests.filter(contest => {
      const distance = calculateDistance(
        userLat, 
        userLng, 
        contest.coords.lat, 
        contest.coords.lng
      );
      console.log('Distancia al concurso', contest.title, ':', distance, 'km');
      return distance <= maxDistance;
    });

    console.log('Concursos cercanos encontrados:', nearby.length);
    setNearbyContests(nearby);

    if (nearby.length === 0) {
      toast({
        title: "No se encontraron concursos cercanos",
        description: "No hay concursos activos en tu área. Prueba a ampliar la búsqueda.",
      });
    } else {
      toast({
        title: `${nearby.length} concursos encontrados`,
        description: "Se muestran los concursos cercanos a tu ubicación.",
      });
    }

    // Center map on user location and add user marker
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView([userLat, userLng], 10);
      addUserLocationMarker(mapInstanceRef.current, userLat, userLng);
    }
  };

  const locateUser = () => {
    setIsLocating(true);

    if (!navigator.geolocation) {
      toast({
        title: "Error de geolocalización",
        description: "Tu navegador no soporta geolocalización",
        variant: "destructive"
      });
      setIsLocating(false);
      return;
    }

    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0
    };

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        console.log('Ubicación del usuario obtenida:', latitude, longitude);
        setUserLocation({ lat: latitude, lng: longitude });
        findNearbyContests(latitude, longitude);
        setIsLocating(false);
      },
      (error) => {
        console.error("Error getting user location:", error);
        let errorMessage = "No se pudo obtener tu ubicación.";
        
        switch(error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Permisos de ubicación denegados. Por favor, habilita la ubicación en tu navegador.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Información de ubicación no disponible.";
            break;
          case error.TIMEOUT:
            errorMessage = "Tiempo de espera agotado para obtener la ubicación.";
            break;
        }
        
        toast({
          title: "Error de ubicación",
          description: errorMessage,
          variant: "destructive"
        });
        setIsLocating(false);
      },
      options
    );
  };

  useEffect(() => {
    // Add Leaflet CSS
    if (!document.querySelector('link[href*="leaflet"]')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      link.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
      link.crossOrigin = '';
      document.head.appendChild(link);
    }

    // Load Leaflet library
    loadLeaflet()
      .then(() => setLeafletLoaded(true))
      .catch(() => setIsMapLoading(false));
  }, []);

  useEffect(() => {
    if (leafletLoaded && !contestsLoading) {
      // Initialize map after Leaflet is loaded and contests are loaded
      const timer = setTimeout(() => {
        initMap();
      }, 100);

      return () => {
        clearTimeout(timer);
        // Cleanup map on unmount
        if (mapInstanceRef.current) {
          mapInstanceRef.current.remove();
          mapInstanceRef.current = null;
        }
      };
    }
  }, [leafletLoaded, contestsLoading]);

  // Re-add markers when contests data changes
  useEffect(() => {
    if (mapInstanceRef.current && !contestsLoading) {
      addContestMarkers();
    }
  }, [realContests, contestsLoading]);

  return (
    <div className="relative w-full h-[70vh] bg-muted rounded-lg overflow-hidden shadow-lg border border-gray-200">
      {/* Mostrar estado de carga */}
      {(isMapLoading || contestsLoading) && <MapLoadingState />}

      {/* Contenedor del mapa */}
      <div ref={mapRef} className="w-full h-full rounded-lg" />

      {/* Botón central para buscar concursos cercanos */}
      <SearchButton 
        isLocating={isLocating}
        isMapLoading={isMapLoading || contestsLoading}
        onLocateUser={locateUser}
      />

      {/* Lista de concursos cercanos */}
      <NearbyContestsList contests={nearbyContests} />

      {/* Tarjeta de concurso seleccionado */}
      <SelectedContestCard contest={selectedContest} />
    </div>
  );
};

export default Map;
