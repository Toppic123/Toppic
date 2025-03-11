
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Camera, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useToast } from "@/hooks/use-toast";

// Mock data - replace with real API data later
const mockContests = [
  {
    id: "1",
    title: "Festival de Primavera",
    location: "Barcelona",
    coords: { lat: 41.3851, lng: 2.1734 },
    photosCount: 24,
  },
  {
    id: "2",
    title: "Concurso Gastronómico",
    location: "Madrid",
    coords: { lat: 40.4168, lng: -3.7038 },
    photosCount: 38,
  },
  {
    id: "3",
    title: "Mar y Playa",
    location: "Valencia",
    coords: { lat: 39.4699, lng: -0.3763 },
    photosCount: 17,
  },
  {
    id: "4",
    title: "Vida Nocturna",
    location: "Ibiza",
    coords: { lat: 38.9067, lng: 1.4206 },
    photosCount: 42,
  },
];

const Map = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [selectedContest, setSelectedContest] = useState<(typeof mockContests)[0] | null>(null);
  const [isMapLoading, setIsMapLoading] = useState(true);
  const [mapboxToken, setMapboxToken] = useState<string>('');
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    if (!mapContainer.current) return;
    
    // If we don't have a token yet, show token input
    if (!mapboxToken) {
      setIsMapLoading(false);
      return;
    }
    
    try {
      // Initialize map with the provided token
      mapboxgl.accessToken = mapboxToken;
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/light-v11',
        center: [0, 40], // Center on Spain
        zoom: 5,
      });
      
      // Add navigation controls
      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
      
      // Add markers when map is loaded
      map.current.on('load', () => {
        setIsMapLoading(false);
        
        // Add markers for each contest
        mockContests.forEach(contest => {
          // Create a marker element
          const el = document.createElement('div');
          el.className = 'custom-marker';
          el.innerHTML = `<div class="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-camera"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>
          </div>`;
          
          // Add click event to marker
          el.addEventListener('click', () => {
            setSelectedContest(contest);
          });
          
          // Add marker to map
          new mapboxgl.Marker(el)
            .setLngLat([contest.coords.lng, contest.coords.lat])
            .addTo(map.current!);
        });
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
  }, [mapboxToken, toast]);
  
  const handleMarkerClick = (contest: typeof mockContests[0]) => {
    setSelectedContest(contest);
  };
  
  const handleTokenSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = new FormData(e.currentTarget).get('mapboxToken') as string;
    if (token) {
      setMapboxToken(token);
      localStorage.setItem('mapboxToken', token); // Save token for later use
    }
  };
  
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
      
      {!mapboxToken ? (
        <div className="absolute inset-0 flex items-center justify-center bg-muted z-10">
          <div className="w-full max-w-md p-6 bg-card rounded-lg shadow-lg">
            <h3 className="text-lg font-medium mb-4">Configuración del mapa</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Para mostrar el mapa de concursos, necesitas proporcionar un token de Mapbox.
              Puedes obtener uno gratuito en <a href="https://mapbox.com/" target="_blank" rel="noreferrer" className="text-primary underline">mapbox.com</a>.
            </p>
            <form onSubmit={handleTokenSubmit} className="space-y-4">
              <div>
                <label htmlFor="mapboxToken" className="text-sm font-medium">
                  Token público de Mapbox
                </label>
                <input
                  id="mapboxToken"
                  name="mapboxToken"
                  type="text"
                  placeholder="pk.eyJ1Ijoi..."
                  className="w-full p-2 mt-1 border rounded-md"
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Guardar y mostrar mapa
              </Button>
            </form>
          </div>
        </div>
      ) : (
        <>
          <div ref={mapContainer} className="w-full h-full" />
          
          {/* Contest info overlay when marker is clicked */}
          {selectedContest && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute bottom-4 left-4 right-4 bg-card/90 backdrop-blur-md p-4 rounded-lg border shadow-lg"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-lg">{selectedContest.title}</h3>
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
                >
                  Ver concurso
                </Button>
              </div>
            </motion.div>
          )}
        </>
      )}
    </div>
  );
};

export default Map;
