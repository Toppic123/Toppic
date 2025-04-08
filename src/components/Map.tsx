
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Camera, MapPin, Lock, Unlock, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

// Mock data with active and finished contests
const mockContests = [
  {
    id: "1",
    title: "Festival de Primavera",
    location: "Barcelona",
    coords: { lat: 41.3851, lng: 2.1734 },
    photosCount: 24,
    isPrivate: false,
    isActive: true,
    endDate: "2025-06-01"
  },
  {
    id: "2",
    title: "Concurso Gastronómico",
    location: "Madrid",
    coords: { lat: 40.4168, lng: -3.7038 },
    photosCount: 38,
    isPrivate: true,
    isActive: true,
    endDate: "2025-05-15"
  },
  {
    id: "3",
    title: "Mar y Playa",
    location: "Valencia",
    coords: { lat: 39.4699, lng: -0.3763 },
    photosCount: 17,
    isPrivate: false,
    isActive: false,
    endDate: "2025-01-10"
  },
  {
    id: "4",
    title: "Vida Nocturna",
    location: "Ibiza",
    coords: { lat: 38.9067, lng: 1.4206 },
    photosCount: 42,
    isPrivate: true,
    isActive: false,
    endDate: "2025-02-20"
  },
];

// Only show active contests on the map
const activeContests = mockContests.filter(contest => contest.isActive);

const Map = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [selectedContest, setSelectedContest] = useState<(typeof mockContests)[0] | null>(null);
  const [isMapLoading, setIsMapLoading] = useState(true);
  const [isLocating, setIsLocating] = useState(false);
  const [userLocation, setUserLocation] = useState<{ lat: number, lng: number } | null>(null);
  const [nearbyContests, setNearbyContests] = useState<(typeof mockContests)>([]);
  const navigate = useNavigate();
  const { toast } = useToast();
  const [mapError, setMapError] = useState<string | null>(null);
  const [googleMapURL, setGoogleMapURL] = useState<string>("");
  
  // Function to find nearby contests
  const findNearbyContests = (userLat: number, userLng: number, maxDistance = 500) => {
    // Simple distance calculation (in km)
    const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
      const R = 6371; // Radius of the earth in km
      const dLat = (lat2 - lat1) * Math.PI / 180;
      const dLon = (lon2 - lon1) * Math.PI / 180;
      const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
        Math.sin(dLon/2) * Math.sin(dLon/2); 
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
      const d = R * c; // Distance in km
      return d;
    };
    
    // Filter active contests by distance
    const nearby = activeContests.filter(contest => {
      const distance = calculateDistance(
        userLat, 
        userLng, 
        contest.coords.lat, 
        contest.coords.lng
      );
      return distance <= maxDistance;
    });
    
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
    
    // Create Google Maps URL with markers for user and nearby contests
    createGoogleMapsURL(userLat, userLng, nearby);
  };
  
  // Function to create a Google Maps URL with markers
  const createGoogleMapsURL = (userLat: number, userLng: number, contests: typeof nearbyContests) => {
    // Base Google Maps URL
    let url = `https://www.google.com/maps/search/?api=1&query=${userLat},${userLng}`;
    
    // For creating a map with multiple markers, we'd typically use the more complex URL format
    // but for simplicity, we'll just create a link that opens Google Maps centered on the user's location
    // In a real implementation, you might want to use the Google Maps JavaScript API
    
    setGoogleMapURL(url);
    setIsMapLoading(false);
  };
  
  // Function to locate the user
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
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lng: longitude });
        
        // Find nearby contests and create Google Maps URL
        findNearbyContests(latitude, longitude);
        setIsLocating(false);
      },
      (error) => {
        console.error("Error getting user location:", error);
        toast({
          title: "Error de ubicación",
          description: "No se pudo obtener tu ubicación. Por favor, verifica los permisos de tu navegador.",
          variant: "destructive"
        });
        setIsLocating(false);
      }
    );
  };
  
  // Open in Google Maps
  const openInGoogleMaps = () => {
    window.open(googleMapURL, '_blank');
  };
  
  useEffect(() => {
    // Initial loading
    setIsMapLoading(true);
    
    // Set a default center point for the map
    const defaultLocation = {
      lat: 40.4168,
      lng: -3.7038
    }; // Madrid, Spain
    
    // Create a URL for Google Maps centered on Spain
    const url = `https://www.google.com/maps/search/?api=1&query=${defaultLocation.lat},${defaultLocation.lng}`;
    setGoogleMapURL(url);
    
    // Set loading to false after a short delay
    const timer = setTimeout(() => {
      setIsMapLoading(false);
    }, 1000);
    
    return () => {
      clearTimeout(timer);
    };
  }, []);
  
  return (
    <div className="relative w-full h-[70vh] bg-muted rounded-lg overflow-hidden">
      {isMapLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted z-10">
          <div className="flex flex-col items-center">
            <MapPin className="w-8 h-8 text-primary animate-pulse" />
            <p className="mt-4 text-muted-foreground">Cargando mapa...</p>
          </div>
        </div>
      )}
      
      {mapError && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted z-10">
          <div className="flex flex-col items-center max-w-md text-center p-4">
            <MapPin className="w-8 h-8 text-destructive mb-2" />
            <p className="font-medium text-destructive">Error en el mapa</p>
            <p className="mt-2 text-muted-foreground">{mapError}</p>
            <p className="mt-4 text-sm">Verifica tu conexión a internet o prueba a recargar la página.</p>
            <Button 
              onClick={() => window.location.reload()} 
              variant="outline" 
              className="mt-4"
            >
              Recargar página
            </Button>
          </div>
        </div>
      )}
      
      {/* Google Maps placeholder with embedded iframe */}
      {!isMapLoading && !mapError && (
        <div className="w-full h-full">
          <iframe
            title="Google Maps"
            width="100%"
            height="100%"
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${userLocation ? `${userLocation.lat},${userLocation.lng}` : 'Spain'}`}
            allowFullScreen
          ></iframe>
        </div>
      )}
      
      {/* Locate me button */}
      <div className="absolute top-4 left-4 z-10">
        <Button 
          onClick={locateUser}
          disabled={isLocating || isMapLoading || !!mapError}
          className="flex items-center gap-2 bg-white text-black hover:bg-gray-100 shadow-md"
        >
          {isLocating ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Localizando...</span>
            </>
          ) : (
            <>
              <MapPin className="w-4 h-4" />
              <span>Concursos cercanos</span>
            </>
          )}
        </Button>
        
        {userLocation && (
          <Button
            onClick={openInGoogleMaps}
            className="flex items-center gap-2 bg-white text-black hover:bg-gray-100 shadow-md mt-2"
          >
            <span>Abrir en Google Maps</span>
          </Button>
        )}
      </div>
      
      {/* Contest list overlay when contests are found */}
      {nearbyContests.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-4 left-4 right-4 bg-card/90 backdrop-blur-md p-4 rounded-lg border shadow-lg max-h-[50%] overflow-auto"
        >
          <h3 className="text-lg font-medium mb-4">Concursos cercanos ({nearbyContests.length})</h3>
          <div className="space-y-3">
            {nearbyContests.map((contest) => (
              <div 
                key={contest.id} 
                className="flex justify-between items-center p-3 bg-background/80 rounded-md hover:bg-background transition-colors cursor-pointer"
                onClick={() => navigate(`/contests/${contest.id}`)}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">{contest.title}</h4>
                    {contest.isPrivate && (
                      <Badge variant="outline" className="flex items-center gap-1 border-amber-500 text-amber-700">
                        <Lock className="w-3 h-3" />
                        <span>Privado</span>
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground mt-1">
                    <MapPin className="w-3 h-3 mr-1" />
                    <span>{contest.location}</span>
                  </div>
                </div>
                <Button size="sm">
                  Ver
                </Button>
              </div>
            ))}
          </div>
        </motion.div>
      )}
      
      {/* Selected contest info overlay */}
      {selectedContest && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-4 left-4 right-4 bg-card/90 backdrop-blur-md p-4 rounded-lg border shadow-lg"
        >
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-medium text-lg">{selectedContest.title}</h3>
                {selectedContest.isPrivate && (
                  <Badge variant="outline" className="flex items-center gap-1 border-amber-500 text-amber-700">
                    <Lock className="w-3 h-3" />
                    <span>Concurso Privado</span>
                  </Badge>
                )}
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 mr-1" />
                <span>{selectedContest.location}</span>
              </div>
              <div className="mt-1 text-sm text-muted-foreground">
                <span>{selectedContest.photosCount} fotos</span>
              </div>
            </div>
            <Button
              onClick={() => navigate(`/contests/${selectedContest.id}`)}
              size="sm"
              className="bg-[#4891AA] text-white hover:bg-[#3a7a8b]"
            >
              Ver concurso
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Map;
