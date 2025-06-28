
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

// Coordenadas precisas y actualizadas para Andorra y regiones cercanas
const getCoordinatesForLocation = (location: string) => {
  const locationMap: { [key: string]: { lat: number, lng: number } } = {
    // Andorra - Coordenadas muy precisas
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
    'arinsal': { lat: 42.5725, lng: 1.4861 },
    'pal': { lat: 42.5556, lng: 1.4889 },
    'grandvalira': { lat: 42.5444, lng: 1.6500 },
    'caldea': { lat: 42.5079, lng: 1.5346 },
    
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
    
    // Cataluña - ciudades cercanas a Andorra
    'la seu d\'urgell': { lat: 42.3586, lng: 1.4582 },
    'puigcerdà': { lat: 42.4303, lng: 1.9272 },
    'berga': { lat: 42.1006, lng: 1.8447 },
    'manresa': { lat: 41.7287, lng: 1.8308 },
    'vic': { lat: 41.9301, lng: 2.2547 },
    'ripoll': { lat: 42.1989, lng: 2.1914 },
    'camprodon': { lat: 42.3167, lng: 2.3667 },
    'olot': { lat: 42.1817, lng: 2.4889 },
    
    // Francia - ciudades cercanas a Andorra
    'toulouse': { lat: 43.6047, lng: 1.4442 },
    'perpignan': { lat: 42.6886, lng: 2.8955 },
    'foix': { lat: 42.9635, lng: 1.6053 },
    'ax-les-thermes': { lat: 42.7167, lng: 1.8333 },
    'font-romeu': { lat: 42.5000, lng: 2.0333 }
  };

  const locationKey = location.toLowerCase().trim();
  
  // Búsqueda exacta
  if (locationMap[locationKey]) {
    return locationMap[locationKey];
  }
  
  // Búsqueda parcial más específica para Andorra
  for (const [key, coords] of Object.entries(locationMap)) {
    if (locationKey.includes(key) || key.includes(locationKey)) {
      return coords;
    }
  }
  
  // Búsqueda por palabras clave mejorada
  if (locationKey.includes('andorra')) {
    return locationMap['andorra'];
  }
  
  if (locationKey.includes('barcelona') || locationKey.includes('cataluña') || locationKey.includes('catalunya')) {
    return locationMap['barcelona'];
  }
  
  if (locationKey.includes('madrid')) {
    return locationMap['madrid'];
  }
  
  // Default a España central
  return locationMap['madrid'];
};

// Convert contest data to map-compatible format
const convertContestToMapFormat = (contest: any) => {
  const coordinates = getCoordinatesForLocation(contest.location || "madrid");
  
  console.log('Converting contest to map format:', {
    title: contest.title,
    location: contest.location,
    coordinates: coordinates,
    imageUrl: contest.imageUrl,
    originalImageUrl: contest.imageUrl
  });
  
  return {
    id: contest.id,
    title: contest.title,
    location: contest.location,
    coords: coordinates,
    description: contest.description || "Descripción del concurso disponible pronto.",
    endDate: contest.endDate,
    participants: contest.participants,
    isActive: contest.status === 'active',
    prize: contest.prize || "Por determinar",
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

  // Check geolocation support on component mount
  useEffect(() => {
    console.log('Checking geolocation support...');
    if (!navigator.geolocation) {
      console.error('Geolocation is not supported by this browser');
      setGeolocationSupported(false);
      toast({
        title: "Geolocalización no disponible",
        description: "Tu navegador no soporta geolocalización",
        variant: "destructive"
      });
    } else {
      console.log('Geolocation is supported');
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

  // Función mejorada para determinar si está en Andorra con mayor precisión
  const isInAndorraRegion = (lat: number, lng: number) => {
    // Coordenadas más precisas de Andorra
    const andorraBounds = {
      north: 42.6562,
      south: 42.4297,
      east: 1.7866,
      west: 1.4135
    };
    
    return lat >= andorraBounds.south && lat <= andorraBounds.north && 
           lng >= andorraBounds.west && lng <= andorraBounds.east;
  };

  // Función mejorada para encontrar concursos cercanos con mejor soporte para Andorra
  const findNearbyContests = (userLat: number, userLng: number, maxDistance = 100) => {
    console.log('Finding nearby contests. User location:', { userLat, userLng });
    console.log('Active contests available:', activeMapContests.length);
    
    // Verificar si está en Andorra con mayor precisión
    const isInAndorra = isInAndorraRegion(userLat, userLng);
    
    if (isInAndorra) {
      console.log('Usuario confirmado en Andorra, expandiendo búsqueda y priorizando concursos locales');
      maxDistance = 250; // Expandir búsqueda considerablemente para Andorra
      toast({
        title: "¡Ubicación confirmada: Andorra! 🇦🇩",
        description: "Buscando concursos en Andorra y regiones cercanas de España y Francia...",
        duration: 4000,
      });
    }
    
    if (activeMapContests.length === 0) {
      console.warn('No active contests available');
      toast({
        title: "No hay concursos disponibles",
        description: "No hay concursos activos disponibles en este momento.",
      });
      return;
    }
    
    const nearby = activeMapContests.map(contest => {
      const distance = calculateDistance(
        userLat, 
        userLng, 
        contest.coords.lat, 
        contest.coords.lng
      );
      console.log(`Contest ${contest.title} in ${contest.location} is ${distance.toFixed(2)} km away`);
      
      // Dar prioridad a concursos en Andorra si el usuario está en Andorra
      let priorityBonus = 0;
      if (isInAndorra && contest.location.toLowerCase().includes('andorra')) {
        priorityBonus = -50; // Reducir distancia virtual para priorizar
      }
      
      return { ...contest, distance: distance + priorityBonus, realDistance: distance };
    }).filter(contest => contest.realDistance <= maxDistance)
      .sort((a, b) => a.distance - b.distance);

    console.log(`Nearby contests found within ${maxDistance}km:`, nearby.length);
    
    // Si está en Andorra, priorizar concursos de Andorra al principio
    if (isInAndorra) {
      const andorraContests = nearby.filter(contest => 
        contest.location.toLowerCase().includes('andorra')
      );
      const otherContests = nearby.filter(contest => 
        !contest.location.toLowerCase().includes('andorra')
      );
      setNearbyContests([...andorraContests, ...otherContests]);
    } else {
      setNearbyContests(nearby);
    }

    if (nearby.length === 0) {
      // Si no encuentra concursos, ampliar búsqueda considerablemente
      const expandedSearch = activeMapContests.map(contest => {
        const distance = calculateDistance(
          userLat, 
          userLng, 
          contest.coords.lat, 
          contest.coords.lng
        );
        return { ...contest, distance, realDistance: distance };
      }).filter(contest => contest.distance <= 500)
        .sort((a, b) => a.distance - b.distance)
        .slice(0, 8);
      
      console.log('Expanded search results:', expandedSearch.length);
      
      if (expandedSearch.length > 0) {
        setNearbyContests(expandedSearch);
        toast({
          title: `${expandedSearch.length} concursos encontrados`,
          description: `Los concursos más cercanos están a ${expandedSearch[0].distance.toFixed(0)} km de distancia.`,
        });
      } else {
        toast({
          title: "No se encontraron concursos cercanos",
          description: "No hay concursos activos en tu área. Prueba más tarde.",
        });
      }
    } else {
      const closestDistance = nearby[0].realDistance;
      toast({
        title: `${nearby.length} concursos cercanos encontrados`,
        description: isInAndorra 
          ? `Concursos disponibles en Andorra y alrededores. El más cercano está a ${closestDistance.toFixed(1)} km.`
          : `El más cercano está a ${closestDistance.toFixed(1)} km de distancia.`,
        duration: 4000,
      });
    }

    // Center map on user location and add user marker
    if (mapInstanceRef.current) {
      const zoomLevel = isInAndorra ? 12 : 10;
      mapInstanceRef.current.setView([userLat, userLng], zoomLevel);
      addUserLocationMarker(mapInstanceRef.current, userLat, userLng);
    }
  };

  const locateUser = () => {
    console.log('Starting enhanced geolocation process for Andorra...');
    
    if (!geolocationSupported) {
      console.error('Geolocation not supported');
      toast({
        title: "Error de geolocalización",
        description: "Tu navegador no soporta geolocalización",
        variant: "destructive"
      });
      return;
    }

    setIsLocating(true);

    // Opciones mejoradas para mejor precisión en zonas montañosas como Andorra
    const options = {
      enableHighAccuracy: true,
      timeout: 30000, // Aumentar timeout para zonas con señal débil
      maximumAge: 10000 // Reducir edad máxima para obtener ubicación más actual
    };

    console.log('Requesting high-accuracy geolocation with enhanced options:', options);

    const onSuccess = (position: GeolocationPosition) => {
      const { latitude, longitude, accuracy } = position.coords;
      console.log('Geolocation success:', { 
        latitude, 
        longitude, 
        accuracy,
        timestamp: new Date(position.timestamp)
      });
      
      // Verificar si está en Andorra con mayor precisión
      const isInAndorra = isInAndorraRegion(latitude, longitude);
      
      if (isInAndorra) {
        console.log('Usuario confirmado en territorio de Andorra');
        toast({
          title: "¡Bienvenido a Andorra! 🇦🇩",
          description: `Ubicación confirmada con precisión de ${Math.round(accuracy)} metros. Buscando concursos locales...`,
          duration: 5000,
        });
      } else {
        // Verificar si está cerca de Andorra (frontera)
        const distanceToAndorra = calculateDistance(latitude, longitude, 42.5063, 1.5218);
        if (distanceToAndorra < 50) {
          toast({
            title: "Cerca de Andorra",
            description: `Estás a ${distanceToAndorra.toFixed(1)} km de Andorra. Precisión: ${Math.round(accuracy)} metros.`,
            duration: 4000,
          });
        } else {
          toast({
            title: "Ubicación obtenida",
            description: `Precisión: ${Math.round(accuracy)} metros`,
          });
        }
      }
      
      setUserLocation({ lat: latitude, lng: longitude });
      findNearbyContests(latitude, longitude);
      setIsLocating(false);
    };

    const onError = (error: GeolocationPositionError) => {
      console.error("Enhanced geolocation error:", {
        code: error.code,
        message: error.message,
        PERMISSION_DENIED: error.PERMISSION_DENIED,
        POSITION_UNAVAILABLE: error.POSITION_UNAVAILABLE,
        TIMEOUT: error.TIMEOUT
      });
      
      setIsLocating(false);
      
      let errorMessage = "No se pudo obtener tu ubicación.";
      let errorTitle = "Error de ubicación";
      
      switch(error.code) {
        case error.PERMISSION_DENIED:
          errorTitle = "Permisos denegados";
          errorMessage = "Por favor, habilita la geolocalización en tu navegador. En Andorra es especialmente importante para encontrar concursos locales.";
          console.log('User denied geolocation permission');
          break;
        case error.POSITION_UNAVAILABLE:
          errorTitle = "Señal GPS no disponible";
          errorMessage = "En zonas montañosas como Andorra, intenta moverte a un lugar con mejor vista al cielo o cerca de una ventana.";
          console.log('Position information is unavailable - common in mountainous areas');
          break;
        case error.TIMEOUT:
          errorTitle = "Tiempo de espera agotado";
          errorMessage = "La búsqueda de ubicación tardó demasiado. En Andorra, esto puede ocurrir por la topografía montañosa. Inténtalo de nuevo.";
          console.log('Geolocation request timed out - extended timeout for mountain regions');
          break;
        default:
          errorMessage = `Error técnico: ${error.message}. Si estás en Andorra, la señal GPS puede ser intermitente.`;
          console.log('Unknown geolocation error in mountain region');
      }
      
      toast({
        title: errorTitle,
        description: errorMessage,
        variant: "destructive",
        duration: 6000,
      });
    };

    navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
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
      const timer = setTimeout(() => {
        initMap();
      }, 100);

      return () => {
        clearTimeout(timer);
        if (mapInstanceRef.current) {
          mapInstanceRef.current.remove();
          mapInstanceRef.current = null;
        }
      };
    }
  }, [leafletLoaded, contestsLoading]);

  useEffect(() => {
    if (mapInstanceRef.current && !contestsLoading) {
      addContestMarkers();
    }
  }, [realContests, contestsLoading]);

  return (
    <div className="relative w-full h-[70vh] bg-muted rounded-lg overflow-hidden shadow-lg border border-gray-200">
      {(isMapLoading || contestsLoading) && <MapLoadingState />}
      <div ref={mapRef} className="w-full h-full rounded-lg" />
      <SearchButton 
        isLocating={isLocating}
        isMapLoading={isMapLoading || contestsLoading}
        onLocateUser={locateUser}
      />
      <NearbyContestsList contests={nearbyContests} />
      <SelectedContestCard contest={selectedContest} />
    </div>
  );
};

export default Map;
