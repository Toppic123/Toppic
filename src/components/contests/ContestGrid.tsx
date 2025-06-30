
import { MapPin, Users, Image as ImageIcon, Calendar, Trophy, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

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

// Function to clean contest titles by removing "FOTOGRAFIA" and similar words
const cleanContestTitle = (title: string): string => {
  if (!title) return 'Sin título';
  
  // Remove "FOTOGRAFIA", "FOTOGRAFÍA", "DE FOTOGRAFIA", etc. (case insensitive)
  const cleanedTitle = title
    .replace(/\b(de\s+)?fotograf[íi]a\b/gi, '')
    .replace(/\s+/g, ' ') // Replace multiple spaces with single space
    .trim();
  
  return cleanedTitle || 'Sin título';
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', { 
    day: 'numeric', 
    month: 'short' 
  });
};

const getDaysRemaining = (endDate: string) => {
  const end = new Date(endDate);
  const now = new Date();
  const diffTime = end.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return Math.max(0, diffDays);
};

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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
      {contests.map((contest, index) => {
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

        // Validate and process image URL
        const processedImageUrl = contest.imageUrl || "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=400&h=225&fit=crop";
        
        // Clean the contest title to remove "FOTOGRAFIA" words
        const cleanedTitle = cleanContestTitle(contest.title);
        
        // Calculate days remaining
        const daysRemaining = getDaysRemaining(contest.dateEnd);
        
        return (
          <motion.div
            key={contest.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="group"
          >
            <Link to={`/contests/${contest.id}`} className="block">
              <Card className="overflow-hidden border border-gray-200 hover:border-gray-300 transition-all duration-200 group-hover:shadow-lg bg-white">
                {/* Contest Image */}
                <div className="relative aspect-[16/10] overflow-hidden bg-gray-50">
                  <img
                    src={processedImageUrl}
                    alt={cleanedTitle}
                    className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=400&h=225&fit=crop";
                    }}
                  />
                  
                  {/* Top badges */}
                  <div className="absolute top-2 left-2 right-2 flex justify-between items-start">
                    <Badge
                      variant="secondary"
                      className={`text-xs font-medium ${
                        contest.isActive 
                          ? "bg-green-100 text-green-700 border-green-200" 
                          : "bg-gray-100 text-gray-600 border-gray-200"
                      }`}
                    >
                      {contest.isActive ? "ACTIVO" : "FINALIZADO"}
                    </Badge>

                    {distance !== null && (
                      <Badge 
                        variant="secondary" 
                        className="text-xs bg-black/60 text-white border-none backdrop-blur-sm"
                      >
                        <MapPin className="h-3 w-3 mr-1" />
                        {distance.toFixed(0)}km
                      </Badge>
                    )}
                  </div>

                  {/* Time remaining badge */}
                  {contest.isActive && daysRemaining > 0 && (
                    <div className="absolute bottom-2 right-2">
                      <Badge className="bg-orange-500 hover:bg-orange-600 text-white text-xs font-medium">
                        <Clock className="h-3 w-3 mr-1" />
                        {daysRemaining}d
                      </Badge>
                    </div>
                  )}
                </div>

                {/* Contest Content */}
                <CardContent className="p-3 space-y-2">
                  {/* Title */}
                  <h3 className="font-semibold text-sm leading-tight text-gray-900 line-clamp-2 min-h-[2.5rem] group-hover:text-blue-600 transition-colors">
                    {cleanedTitle}
                  </h3>

                  {/* Location */}
                  <div className="flex items-center text-xs text-gray-500">
                    <MapPin className="h-3 w-3 mr-1 flex-shrink-0" />
                    <span className="truncate">{contest.location}</span>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <div className="flex items-center">
                        <Users className="h-3 w-3 mr-1" />
                        <span>{contest.participantsCount}</span>
                      </div>
                      <div className="flex items-center">
                        <ImageIcon className="h-3 w-3 mr-1" />
                        <span>{contest.photosCount}</span>
                      </div>
                    </div>
                    
                    {contest.isActive && (
                      <div className="flex items-center text-xs text-green-600 font-medium">
                        <Trophy className="h-3 w-3 mr-1" />
                        <span>Abierto</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
};

export default ContestGrid;
