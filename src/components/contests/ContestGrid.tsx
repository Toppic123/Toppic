
import { MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import ContestCard from "@/components/ContestCard";

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
  if (contests.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">
          No se encontraron concursos con los filtros actuales.
        </p>
        <Button variant="link" onClick={clearFilters}>
          Limpiar filtros
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {contests.map((contest) => (
        <div key={contest.id} className="relative">
          {/* Apply grayscale filter for finished contests */}
          <div className={!contest.isActive ? "grayscale" : ""}>
            <ContestCard key={contest.id} {...contest} />
            {/* Badge to show contest status */}
            <div className="absolute top-2 left-2">
              <Badge
                variant={contest.isActive ? "default" : "secondary"}
                className="text-xs"
              >
                {contest.isActive ? "Activo" : "Finalizado"}
              </Badge>
            </div>
          </div>
          {userLocation && (
            <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full">
              <div className="flex items-center">
                <MapPin size={12} className="mr-1" />
                <span>
                  {calculateDistance(
                    userLocation.lat,
                    userLocation.lng,
                    contest.locationCoords.lat,
                    contest.locationCoords.lng
                  ).toFixed(1)}{" "}
                  km
                </span>
              </div>
              <div className="text-xs text-gray-300">
                Máx: {contest.maxDistance} km
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

import { Button } from "@/components/ui/button";

export default ContestGrid;
