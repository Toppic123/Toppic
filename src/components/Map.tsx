import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Lock, Loader2, Search } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

declare global {
  interface Window {
    google?: any;
  }
}

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

const activeContests = mockContests.filter(contest => contest.isActive);

interface MapProps {
  showMustardButton?: boolean;
}

const Map = ({ showMustardButton = false }: MapProps) => {
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
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  // Función para cargar el script de Google Maps
  const loadGoogleMapsScript = () => {
    if (window.google) {
      setIsScriptLoaded(true);
      return; // Ya está cargado
    }

    if (document.querySelector('script[src*="maps.googleapis.com/maps/api"]')) {
      return; // Script ya en proceso de carga
    }

    const apiKey = "AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8"; // Usar la misma key que está en el iframe
    
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.defer = true;
    
    script.onload = () => {
      setIsScriptLoaded(true);
      setIsMapLoading(false);
    };
    
    script.onerror = () => {
      console.error("Failed to load Google Maps API");
      setMapError("No se pudo cargar la API de Google Maps. Se está mostrando una versión simplificada.");
      setIsMapLoading(false);
    };
    
    document.head.appendChild(script);
  };

  const findNearbyContests = (userLat: number, userLng: number, maxDistance = 500) => {
    const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
      const R = 6371;
      const dLat = (lat2 - lat1) * Math.PI / 180;
      const dLon = (lon2 - lon1) * Math.PI / 180;
      const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
        Math.sin(dLon/2) * Math.sin(dLon/2); 
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
      const d = R * c;
      return d;
    };

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

    createGoogleMapsURL(userLat, userLng, nearby);
  };

  const createGoogleMapsURL = (userLat: number, userLng: number, contests: typeof nearbyContests) => {
    let url = `https://www.google.com/maps/search/?api=1&query=${userLat},${userLng}`;
    setGoogleMapURL(url);
    setIsMapLoading(false);
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

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lng: longitude });

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

  const openInGoogleMaps = () => {
    window.open(googleMapURL, '_blank');
  };

  useEffect(() => {
    setIsMapLoading(true);

    const defaultLocation = {
      lat: 40.4168,
      lng: -3.7038
    };

    // Intentar cargar el script si no está cargado
    loadGoogleMapsScript();

    const url = `https://www.google.com/maps/search/?api=1&query=${defaultLocation.lat},${defaultLocation.lng}`;
    setGoogleMapURL(url);

    const timer = setTimeout(() => {
      if (isMapLoading) {
        setIsMapLoading(false);
      }
    }, 3000); // Si después de 3 segundos sigue cargando, mostrar el mapa de todos modos

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="relative w-full h-[70vh] bg-muted rounded-lg overflow-hidden shadow-lg border border-gray-200">
      {/* Mostrar estado de carga */}
      {isMapLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted z-10">
          <div className="flex flex-col items-center">
            <MapPin className="w-8 h-8 text-primary animate-pulse" />
            <p className="mt-4 text-muted-foreground">Cargando mapa...</p>
          </div>
        </div>
      )}

      {/* Mostrar mensaje de error */}
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

      {/* Contenedor del mapa */}
      {!isMapLoading && !mapError && (
        <div className="w-full h-full">
          <iframe
            title="Google Maps"
            width="100%"
            height="100%"
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${userLocation ? `${userLocation.lat},${userLocation.lng}` : 'Spain'}`}
            className="rounded-lg shadow-inner"
            allowFullScreen
          ></iframe>
        </div>
      )}

      {/* Botón central para buscar concursos cercanos */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
        <motion.button 
          onClick={locateUser}
          disabled={isLocating || isMapLoading || !!mapError}
          className="flex items-center gap-2 bg-[#FFC72C] text-black font-medium px-6 py-4 rounded-full shadow-lg hover:bg-[#FFD54F] transition-all"
          whileHover={{ scale: 1.05 }}
          animate={{
            boxShadow: ["0px 4px 12px rgba(0,0,0,0.1)", "0px 8px 24px rgba(0,0,0,0.15)", "0px 4px 12px rgba(0,0,0,0.1)"],
          }}
          transition={{
            repeat: Infinity,
            repeatType: "reverse",
            duration: 2
          }}
        >
          {isLocating ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Localizando...</span>
            </>
          ) : (
            <>
              <Search className="w-5 h-5" />
              <span>CONCURSOS CERCANOS</span>
            </>
          )}
        </motion.button>
      </div>

      {userLocation && (
        <div className="absolute bottom-4 right-4 z-10">
          <Button
            onClick={openInGoogleMaps}
            className="flex items-center gap-2 bg-white text-black hover:bg-gray-100 shadow-md mt-2"
          >
            <span>Abrir en Google Maps</span>
          </Button>
        </div>
      )}

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

      <style>
        {`
        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(245, 215, 66, 0.7);
          }
          70% {
            box-shadow: 0 0 0 10px rgba(245, 215, 66, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(245, 215, 66, 0);
          }
        }

        .pulse-animation {
          animation: pulse 2s infinite;
        }
        `}
      </style>
    </div>
  );
};

export default Map;
