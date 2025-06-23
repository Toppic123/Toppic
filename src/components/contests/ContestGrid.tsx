
import { MapPin, Calendar, Users, Image as ImageIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import ContestCard from "@/components/ContestCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface ContestGridProps {
  contests: Array<{
    id: string;
    title: string;
    imageUrl: string;
    location: string;
    locationCoords: { lat: number; lng: number };
    maxDistance: number;
    dateStart: string;
    dateEnd: string;
    participantsCount: number;
    photosCount: number;
    category: string;
    isActive: boolean;
  }>;
  userLocation: { lat: number; lng: number } | null;
  calculateDistance: (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ) => number;
  clearFilters: () => void;
}

const ContestGrid = ({
  contests,
  userLocation,
  calculateDistance,
  clearFilters,
}: ContestGridProps) => {
  // Safety check for empty contests array
  if (!contests || contests.length === 0) {
    return (
      <Card className="text-center py-12">
        <CardContent className="space-y-4">
          <div className="mx-auto w-12 h-12 bg-muted rounded-full flex items-center justify-center">
            <ImageIcon className="h-6 w-6 text-muted-foreground" />
          </div>
          <div>
            <h3 className="text-lg font-medium">No se encontraron concursos</h3>
            <p className="text-muted-foreground">
              No hay concursos que coincidan con los filtros actuales.
            </p>
          </div>
          <Button variant="outline" onClick={clearFilters}>
            Limpiar filtros
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {contests.map((contest) => {
        // Skip rendering if contest is missing critical data
        if (!contest || !contest.id || !contest.title) {
          console.warn("Invalid contest data found:", contest);
          return null;
        }

        const distance = userLocation && contest.locationCoords 
          ? calculateDistance(
              userLocation.lat,
              userLocation.lng,
              contest.locationCoords.lat,
              contest.locationCoords.lng
            )
          : null;
        
        return (
          <div key={contest.id} className="relative group">
            <div className={contest.isActive ? "" : "grayscale opacity-75"}>
              <ContestCard key={contest.id} {...contest} />
              
              {/* Status and distance badges */}
              <div className="absolute top-3 left-3 flex flex-col gap-2">
                <Badge
                  variant={contest.isActive ? "default" : "secondary"}
                  className="text-xs shadow-md"
                >
                  {contest.isActive ? "Activo" : "Finalizado"}
                </Badge>
                
                {contest.category && (
                  <Badge variant="outline" className="text-xs bg-white/90 shadow-md">
                    {contest.category}
                  </Badge>
                )}
              </div>

              {/* Distance badge */}
              {distance !== null && (
                <div className="absolute top-3 right-3">
                  <Badge 
                    variant="secondary" 
                    className="text-xs bg-black/70 text-white border-none shadow-md"
                  >
                    <MapPin className="h-3 w-3 mr-1" />
                    {distance.toFixed(1)} km
                  </Badge>
                </div>
              )}

              {/* Stats overlay */}
              <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-black/70 text-white text-xs px-3 py-2 rounded-md">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        <span>{contest.participantsCount || 0}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <ImageIcon className="h-3 w-3" />
                        <span>{contest.photosCount || 0}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>
                        {new Date(contest.dateEnd).toLocaleDateString('es-ES', {
                          month: 'short',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                  </div>
                  {distance !== null && contest.maxDistance && (
                    <div className="text-xs text-gray-300 mt-1">
                      Máximo permitido: {contest.maxDistance} km
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ContestGrid;
