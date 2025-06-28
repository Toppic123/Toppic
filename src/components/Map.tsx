
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

// Coordenadas mejoradas con mayor precisión para España y Andorra
const getCoordinatesForLocation = (location: string) => {
  const locationMap: { [key: string]: { lat: number, lng: number } } = {
    // España - ciudades principales
    'madrid': { lat: 40.4168, lng: -3.7038 },
    'barcelona': { lat: 41.3851, lng: 2.1734 },
    'valencia': { lat: 39.4699, lng: -0.3763 },
    'sevilla': { lat: 37.3891, lng: -5.9845 },
    'bilbao': { lat: 43.2627, lng: -2.9253 },
    'zaragoza': { lat: 41.6488, lng: -0.8891 },
    'málaga': { lat: 36.7213, lng: -4.4213 },
    'palma': { lat: 39.5696, lng: 2.6502 },
    'palma de mallorca': { lat: 39.5696, lng: 2.6502 },
    'las palmas': { lat: 28.1248, lng: -15.4300 },
    'santander': { lat: 43.4623, lng: -3.8099 },
    'córdoba': { lat: 37.8882, lng: -4.7794 },
    'valladolid': { lat: 41.6523, lng: -4.7245 },
    'vigo': { lat: 42.2328, lng: -8.7226 },
    'gijón': { lat: 43.5322, lng: -5.6611 },
    
    // Andorra - ubicaciones específicas con coordenadas precisas
    'andorra': { lat: 42.5063, lng: 1.5218 },
    'andorra la vella': { lat: 42.5063, lng: 1.5218 },
    'escaldes-engordany': { lat: 42.5079, lng: 1.5346 },
    'escaldes': { lat: 42.5079, lng: 1.5346 },
    'encamp': { lat: 42.5313, lng: 1.5839 },
    'la massana': { lat: 42.5456, lng: 1.5149 },
    'ordino': { lat: 42.5563, lng: 1.5331 },
    'sant julià de lòria': { lat: 42.4639, lng: 1.4913 },
    'sant julia de loria': { lat: 42.4639, lng: 1.4913 },
    'canillo': { lat: 42.5676, lng: 1.5976 },
    'pas de la casa': { lat: 42.5428, lng: 1.7333 },
    'soldeu': { lat: 42.5761, lng: 1.6703 },
    'el tarter': { lat: 42.5683, lng: 1.6558 },
    
    // Cataluña - ciudades cercanas a Andorra
    'la seu d\'urgell': { lat: 42.3586, lng: 1.4582 },
    'puigcerdà': { lat: 42.4303, lng: 1.9272 },
    'berga': { lat: 42.1006, lng: 1.8447 },
    'manresa': { lat: 41.7287, lng: 1.8308 },
    'vic': { lat: 41.9301, lng: 2.2547 },
    
    // Francia - ciudades cercanas
    'toulouse': { lat: 43.6047, lng: 1.4442 },
    'perpignan': { lat: 42.6886, lng: 2.8955 },
    'foix': { lat: 42.9635, lng: 1.6053 }
  };

  const locationKey = location.toLowerCase().trim();
  
  console.log('Buscando coordenadas mejoradas para ubicación:', locationKey);
  
  // Búsqueda exacta
  if (locationMap[locationKey]) {
    console.log('Coordenadas exactas encontradas:', locationMap[locationKey]);
    return locationMap[locationKey];
  }
  
  // Búsqueda parcial mejorada
  for (const [key, coords] of Object.entries(locationMap)) {
    if (locationKey.includes(key) || key.includes(locationKey)) {
      console.log('Coordenadas encontradas por coincidencia parcial:', coords, 'para', key);
      return coords;
    }
  }
  
  // Búsqueda por palabras clave
  if (locationKey.includes('andorra')) {
    console.log('Detectado Andorra, usando coordenadas centrales');
    return locationMap['andorra'];
  }
  
  if (locationKey.includes('barcelona') || locationKey.includes('cataluña') || locationKey.includes('catalunya')) {
    console.log('Detectado Barcelona/Cataluña');
    return locationMap['barcelona'];
  }
  
  if (locationKey.includes('madrid')) {
    console.log('Detectado Madrid');
    return locationMap['madrid'];
  }
  
  // Default mejorado
  console.log('Ubicación no encontrada, usando Madrid por defecto con coordenadas precisas');
  return locationMap['madrid'];
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
  const [geolocationSupported, setGeolocationSupported] = useState(true);
  const { toast } = useToast();
  
  // Get real contests data from Supabase
  const { contests: realContests, isLoading: contestsLoading } = useContestsData();

  // Convert real contests to map format
  const mapContests = realContests.map(convertContestToMapFormat);
  const activeMapContests = mapContests.filter(contest => contest.isActive);

  console.log("Contests from database:", realContests);
  console.log("Converted map contests:", mapContests);

  // Check geolocation support on component mount
  useEffect(() => {
    if (!navigator.geolocation) {
      setGeolocationSupported(false);
      console.error("Geolocation is not supported by this browser");
      toast({
        title: "Geolocalización no disponible",
        description: "Tu navegador no soporta geolocalización",
        variant: "destructive"
      });
    }
  }, []);

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

  // Función mejorada para encontrar concursos cercanos
  const findNearbyContests = (userLat: number, userLng: number, maxDistance = 100) => {
    console.log('Buscando concursos cerca de:', userLat, userLng, 'con distancia máxima de', maxDistance, 'km');
    
    const nearby = activeMapContests.map(contest => {
      const distance = calculateDistance(
        userLat, 
        userLng, 
        contest.coords.lat, 
        contest.coords.lng
      );
      console.log('Distancia al concurso', contest.title, ':', distance.toFixed(2), 'km');
      return { ...contest, distance };
    }).filter(contest => contest.distance <= maxDistance)
      .sort((a, b) => a.distance - b.distance); // Ordenar por distancia

    console.log('Concursos cercanos encontrados:', nearby.length);
    setNearbyContests(nearby);

    if (nearby.length === 0) {
      // Si no encuentra concursos en 100km, ampliar búsqueda
      const expandedSearch = activeMapContests.map(contest => {
        const distance = calculateDistance(
          userLat, 
          userLng, 
          contest.coords.lat, 
          contest.coords.lng
        );
        return { ...contest, distance };
      }).filter(contest => contest.distance <= 500)
        .sort((a, b) => a.distance - b.distance)
        .slice(0, 5); // Máximo 5 concursos
      
      if (expandedSearch.length > 0) {
        setNearbyContests(expandedSearch);
        toast({
          title: `${expandedSearch.length} concursos encontrados`,
          description: `Los concursos más cercanos están a ${expandedSearch[0].distance.toFixed(0)} km de distancia.`,
        });
      } else {
        toast({
          title: "No se encontraron concursos cercanos",
          description: "No hay concursos activos en tu área. Prueba a ampliar la búsqueda.",
        });
      }
    } else {
      toast({
        title: `${nearby.length} concursos cercanos`,
        description: `El más cercano está a ${nearby[0].distance.toFixed(1)} km de distancia.`,
      });
    }

    // Center map on user location and add user marker
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView([userLat, userLng], 10);
      addUserLocationMarker(mapInstanceRef.current, userLat, userLng);
    }
  };

  const locateUser = () => {
    if (!geolocationSupported) {
      toast({
        title: "Error de geolocalización",
        description: "Tu navegador no soporta geolocalización",
        variant: "destructive"
      });
      return;
    }

    setIsLocating(true);
    console.log("Iniciando geolocalización...");

    const options = {
      enableHighAccuracy: true,
      timeout: 20000, // Aumentado a 20 segundos
      maximumAge: 30000 // Cache por 30 segundos
    };

    const onSuccess = (position: GeolocationPosition) => {
      const { latitude, longitude, accuracy } = position.coords;
      console.log('Ubicación obtenida exitosamente:', {
        latitude,
        longitude,
        accuracy: `${accuracy} metros`,
        timestamp: new Date(position.timestamp).toLocaleString()
      });
      
      setUserLocation({ lat: latitude, lng: longitude });
      findNearbyContests(latitude, longitude);
      setIsLocating(false);
      
      toast({
        title: "Ubicación obtenida",
        description: `Precisión: ${Math.round(accuracy)} metros`,
      });
    };

    const onError = (error: GeolocationPositionError) => {
      console.error("Error de geolocalización:", error);
      setIsLocating(false);
      
      let errorMessage = "No se pudo obtener tu ubicación.";
      let errorTitle = "Error de ubicación";
      
      switch(error.code) {
        case error.PERMISSION_DENIED:
          errorTitle = "Permisos denegados";
          errorMessage = "Has denegado el acceso a tu ubicación. Por favor, habilita la geolocalización en tu navegador y recarga la página.";
          break;
        case error.POSITION_UNAVAILABLE:
          errorTitle = "Ubicación no disponible";
          errorMessage = "No se puede determinar tu ubicación. Verifica que el GPS esté activado y tengas buena señal.";
          break;
        case error.TIMEOUT:
          errorTitle = "Tiempo agotado";
          errorMessage = "La búsqueda de ubicación ha tardado demasiado. Inténtalo de nuevo.";
          break;
        default:
          errorMessage = `Error desconocido: ${error.message}`;
      }
      
      toast({
        title: errorTitle,
        description: errorMessage,
        variant: "destructive"
      });
    };

    // Intentar obtener la posición
    try {
      navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
    } catch (err) {
      console.error("Error al llamar getCurrentPosition:", err);
      setIsLocating(false);
      toast({
        title: "Error crítico",
        description: "No se pudo inicializar la geolocalización",
        variant: "destructive"
      });
    }
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
