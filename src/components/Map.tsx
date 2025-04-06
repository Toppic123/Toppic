
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import MapView from "@/components/MapView";

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

const Map = () => {
  const [selectedContest, setSelectedContest] = useState<(typeof mockContests)[0] | null>(null);
  const [nearbyContests, setNearbyContests] = useState<(typeof mockContests)>([]);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Convert mockContests to MapView marker format
  const markers = mockContests.map(contest => ({
    id: contest.id,
    lat: contest.coords.lat,
    lng: contest.coords.lng,
    title: contest.title
  }));
  
  const handleMapLoaded = (map: any) => {
    // Set nearby contests based on user location
    setNearbyContests(mockContests);
    
    // Add click listeners to markers
    if (map && map.markers) {
      map.markers.forEach((marker: any, index: number) => {
        marker.addListener('click', () => {
          setSelectedContest(mockContests[index]);
        });
      });
    }
  };
  
  return (
    <div className="relative w-full h-[70vh] bg-muted rounded-lg overflow-hidden">
      <MapView
        markers={markers}
        height="70vh"
        onMapLoaded={handleMapLoaded}
      />
      
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
              <div className="flex items-center text-sm text-muted-foreground mt-1">
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
