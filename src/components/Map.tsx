
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

// Default Mapbox token - this should be replaced with a proper token in production
// This is a placeholder token to make the map work without user input
const DEFAULT_MAPBOX_TOKEN = 'pk.eyJ1IjoicGl4b25haXIiLCJhIjoiY2xuM28zYTBnMDIxajJpcG5lZDNrZzY0dyJ9.ZjsrZ01oWLc-nttT5KIMLQ';

const Map = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [selectedContest, setSelectedContest] = useState<(typeof mockContests)[0] | null>(null);
  const [isMapLoading, setIsMapLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    if (!mapContainer.current) return;
    
    try {
      // Initialize map with the default token
      mapboxgl.accessToken = DEFAULT_MAPBOX_TOKEN;
      
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
  }, [toast]);
  
  const handleMarkerClick = (contest: typeof mockContests[0]) => {
    setSelectedContest(contest);
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
    </div>
  );
};

export default Map;
