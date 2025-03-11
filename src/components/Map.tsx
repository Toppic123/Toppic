
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Camera, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

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
  const mapRef = useRef<HTMLDivElement>(null);
  const [selectedContest, setSelectedContest] = useState<(typeof mockContests)[0] | null>(null);
  const [isMapLoading, setIsMapLoading] = useState(true);
  const navigate = useNavigate();
  
  // In a real implementation, we would integrate with Mapbox
  // For now, we'll create a mock map component
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMapLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Simulate clicking on a map marker
  const handleMarkerClick = (contest: typeof mockContests[0]) => {
    setSelectedContest(contest);
  };
  
  return (
    <div className="relative w-full h-[70vh] bg-muted rounded-lg overflow-hidden">
      {isMapLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted">
          <div className="flex flex-col items-center">
            <MapPin className="w-8 h-8 text-primary animate-pulse" />
            <p className="mt-4 text-muted-foreground">Cargando mapa...</p>
          </div>
        </div>
      )}
      
      {/* Placeholder map - this would be replaced by actual Mapbox implementation */}
      <div ref={mapRef} className="w-full h-full bg-[#f5f5f6]">
        {/* Mock map markers for demonstration */}
        {mockContests.map((contest) => (
          <motion.div
            key={contest.id}
            className="absolute cursor-pointer"
            style={{
              left: `calc(${(contest.coords.lng + 180) / 360 * 100}% - 12px)`,
              top: `calc(${(1 - (Math.log(Math.tan((contest.coords.lat * Math.PI / 180) / 2 + Math.PI / 4)) / Math.PI)) / 2 * 100}% - 12px)`,
            }}
            whileHover={{ scale: 1.2 }}
            onClick={() => handleMarkerClick(contest)}
          >
            <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center">
              <Camera className="w-3 h-3" />
            </div>
          </motion.div>
        ))}
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
