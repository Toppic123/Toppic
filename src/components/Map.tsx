
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Camera, MapPin, Lock, Unlock, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

// Mock data - replace with real API data later
const mockContests = [
  {
    id: "1",
    title: "Festival de Primavera",
    location: "Barcelona",
    coords: { lat: 41.3851, lng: 2.1734 },
    photosCount: 24,
    isPrivate: false
  },
  {
    id: "2",
    title: "Concurso Gastronómico",
    location: "Madrid",
    coords: { lat: 40.4168, lng: -3.7038 },
    photosCount: 38,
    isPrivate: true
  },
  {
    id: "3",
    title: "Mar y Playa",
    location: "Valencia",
    coords: { lat: 39.4699, lng: -0.3763 },
    photosCount: 17,
    isPrivate: false
  },
  {
    id: "4",
    title: "Vida Nocturna",
    location: "Ibiza",
    coords: { lat: 38.9067, lng: 1.4206 },
    photosCount: 42,
    isPrivate: true
  },
];

// Default Mapbox token - replace with your own token
const MAPBOX_TOKEN = 'pk.eyJ1IjoicGl4b25haXIiLCJhIjoiY2xuM28zYTBnMDIxajJpcG5lZDNrZzY0dyJ9.ZjsrZ01oWLc-nttT5KIMLQ';

const Map = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [selectedContest, setSelectedContest] = useState<(typeof mockContests)[0] | null>(null);
  const [isMapLoading, setIsMapLoading] = useState(true);
  const [isLocating, setIsLocating] = useState(false);
  const [userLocation, setUserLocation] = useState<{ lat: number, lng: number } | null>(null);
  const [nearbyContests, setNearbyContests] = useState<(typeof mockContests)>([]);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Function to find nearby contests
  const findNearbyContests = (userLat: number, userLng: number, maxDistance = 500) => {
    // Simple distance calculation (in km) - could be replaced with more accurate calculation
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
    
    // Filter contests by distance
    const nearby = mockContests.filter(contest => {
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
    
    // If we have nearby contests, zoom to fit them
    if (nearby.length > 0 && map.current) {
      const bounds = new mapboxgl.LngLatBounds();
      
      // Add user location to bounds
      bounds.extend([userLng, userLat]);
      
      // Add contest locations to bounds
      nearby.forEach(contest => {
        bounds.extend([contest.coords.lng, contest.coords.lat]);
      });
      
      map.current.fitBounds(bounds, { padding: 50, maxZoom: 15 });
    }
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
        
        if (map.current) {
          // Add a marker for user location
          const el = document.createElement('div');
          el.className = 'current-location-marker';
          el.innerHTML = '<div class="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center pulse-animation"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/></svg></div>';
          
          new mapboxgl.Marker(el)
            .setLngLat([longitude, latitude])
            .addTo(map.current);
          
          // Center map on user location
          map.current.flyTo({
            center: [longitude, latitude],
            zoom: 13
          });
          
          // Find nearby contests
          findNearbyContests(latitude, longitude);
        }
        
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
    if (!mapContainer.current) return;
    
    try {
      // Initialize map with the token
      mapboxgl.accessToken = MAPBOX_TOKEN;
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/light-v11',
        center: [0, 40], // Center on Spain
        zoom: 5,
      });
      
      // Add navigation controls
      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
      
      // Automatically locate user when map loads
      map.current.on('load', () => {
        setIsMapLoading(false);
        
        // Add markers for each contest
        mockContests.forEach(contest => {
          // Create a marker element
          const el = document.createElement('div');
          el.className = 'custom-marker';
          
          // Different styling for private vs public contests
          if (contest.isPrivate) {
            el.innerHTML = `<div class="w-8 h-8 bg-gray-700 text-gray-100 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-lock"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            </div>`;
          } else {
            el.innerHTML = `<div class="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-camera"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>
            </div>`;
          }
          
          // Add click event to marker
          el.addEventListener('click', () => {
            setSelectedContest(contest);
          });
          
          // Add marker to map
          new mapboxgl.Marker(el)
            .setLngLat([contest.coords.lng, contest.coords.lat])
            .addTo(map.current!);
        });
        
        // Try to automatically get user location
        setTimeout(() => {
          locateUser();
        }, 1000);
      });
      
      // Cleanup
      return () => {
        map.current?.remove();
      };
    } catch (error) {
      console.error("Error initializing map:", error);
      toast({
        title: "Error al cargar el mapa",
        description: "Por favor, verifica tu conexión o inténtalo más tarde",
        variant: "destructive"
      });
      setIsMapLoading(false);
    }
  }, [toast]);
  
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
      
      <div ref={mapContainer} className="w-full h-full" />
      
      {/* Locate me button */}
      <div className="absolute top-4 left-4 z-10">
        <Button 
          onClick={locateUser}
          disabled={isLocating}
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
      </div>
      
      {/* Contest info overlay when marker is clicked */}
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
      
      {/* Add some CSS for the pulse animation */}
      <style>{`
        .pulse-animation {
          position: relative;
        }
        .pulse-animation::after {
          content: '';
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          background-color: rgba(59, 130, 246, 0.5);
          border-radius: 50%;
          z-index: -1;
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          70% {
            transform: scale(2);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default Map;
