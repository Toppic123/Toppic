
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Lock, Loader2, Search } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

// Import leaflet dynamically to avoid SSR issues
let L: any;

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
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const [selectedContest, setSelectedContest] = useState<(typeof mockContests)[0] | null>(null);
  const [isMapLoading, setIsMapLoading] = useState(true);
  const [isLocating, setIsLocating] = useState(false);
  const [userLocation, setUserLocation] = useState<{ lat: number, lng: number } | null>(null);
  const [nearbyContests, setNearbyContests] = useState<(typeof mockContests)>([]);
  const [leafletLoaded, setLeafletLoaded] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const loadLeaflet = async () => {
    try {
      // Dynamically import leaflet
      const leafletModule = await import('leaflet');
      L = leafletModule.default;
      
      // Fix for default markers in Leaflet
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      });
      
      setLeafletLoaded(true);
    } catch (error) {
      console.error("Error loading Leaflet:", error);
      setIsMapLoading(false);
    }
  };

  const initializeMap = () => {
    if (!mapRef.current || mapInstanceRef.current || !leafletLoaded || !L) return;

    try {
      // Initialize map centered on Spain
      const map = L.map(mapRef.current).setView([40.4168, -3.7038], 6);

      // Add OpenStreetMap tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      mapInstanceRef.current = map;
      setIsMapLoading(false);

      // Add contest markers
      addContestMarkers();
    } catch (error) {
      console.error("Error initializing map:", error);
      setIsMapLoading(false);
    }
  };

  const addContestMarkers = () => {
    if (!mapInstanceRef.current || !L) return;

    // Clear existing markers
    markersRef.current.forEach(marker => {
      mapInstanceRef.current?.removeLayer(marker);
    });
    markersRef.current = [];

    // Add markers for all contests
    mockContests.forEach(contest => {
      if (!mapInstanceRef.current) return;

      const marker = L.marker([contest.coords.lat, contest.coords.lng])
        .addTo(mapInstanceRef.current);

      const popupContent = `
        <div class="p-2">
          <h3 class="font-medium text-sm">${contest.title}</h3>
          <p class="text-xs text-gray-600 flex items-center mt-1">
            <span class="mr-1">📍</span> ${contest.location}
          </p>
          <p class="text-xs text-gray-600 mt-1">${contest.photosCount} fotos</p>
          <div class="flex items-center gap-2 mt-2">
            ${contest.isPrivate ? '<span class="bg-amber-100 text-amber-800 text-xs px-1 py-0.5 rounded flex items-center gap-1"><span>🔒</span> Privado</span>' : ''}
            ${contest.isActive ? '<span class="bg-green-100 text-green-800 text-xs px-1 py-0.5 rounded">Activo</span>' : '<span class="bg-gray-100 text-gray-800 text-xs px-1 py-0.5 rounded">Finalizado</span>'}
          </div>
        </div>
      `;

      marker.bindPopup(popupContent);
      
      marker.on('click', () => {
        setSelectedContest(contest);
      });

      markersRef.current.push(marker);
    });
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

    // Center map on user location and add user marker
    if (mapInstanceRef.current && L) {
      mapInstanceRef.current.setView([userLat, userLng], 10);
      
      // Add user location marker
      const userIcon = L.divIcon({
        className: 'custom-user-marker',
        html: '<div style="background: #4891AA; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>',
        iconSize: [20, 20],
        iconAnchor: [10, 10]
      });

      L.marker([userLat, userLng], { icon: userIcon })
        .addTo(mapInstanceRef.current)
        .bindPopup("Tu ubicación")
        .openPopup();
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
    loadLeaflet();
  }, []);

  useEffect(() => {
    if (leafletLoaded) {
      // Initialize map after Leaflet is loaded and a brief delay to ensure the container is ready
      const timer = setTimeout(() => {
        initializeMap();
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
  }, [leafletLoaded]);

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

      {/* Contenedor del mapa */}
      <div ref={mapRef} className="w-full h-full rounded-lg" />

      {/* Botón central para buscar concursos cercanos */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[1000]">
        <motion.button 
          onClick={locateUser}
          disabled={isLocating || isMapLoading}
          className="flex items-center gap-2 bg-[#FFC72C] text-black font-medium px-6 py-4 rounded-full shadow-lg hover:bg-[#FFD54F] transition-all disabled:opacity-50"
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

      {nearbyContests.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-4 left-4 right-4 bg-card/90 backdrop-blur-md p-4 rounded-lg border shadow-lg max-h-[50%] overflow-auto z-[1000]"
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
          className="absolute bottom-4 left-4 right-4 bg-card/90 backdrop-blur-md p-4 rounded-lg border shadow-lg z-[1000]"
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
