
import { MapPin, Users, Image as ImageIcon, Calendar, Trophy } from "lucide-react";
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
  console.log('🎯 ContestGrid rendering with contests:', contests.length);
  
  // Log image information for debugging
  contests.forEach((contest, index) => {
    console.log(`🏆 ContestGrid #${index + 1}: "${contest.title}"`);
    console.log(`   - imageUrl: "${contest.imageUrl || 'NO IMAGE'}"`);
    console.log(`   - hasImage: ${!!contest.imageUrl}`);
    console.log(`   - isActive: ${contest.isActive}`);
  });

  // Safety check for empty contests array
  if (!contests || contests.length === 0) {
    console.log('⚠️ ContestGrid: No contests to display');
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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {contests.map((contest, index) => {
        // Skip rendering if contest is missing critical data
        if (!contest || !contest.id || !contest.title) {
          console.warn("❌ Invalid contest data found:", contest);
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

        // IMPROVED: Better image URL handling with multiple fallbacks
        const fallbackImage = "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=400&h=225&fit=crop";
        let processedImageUrl = fallbackImage;
        
        console.log(`🖼️ Processing image for "${contest.title}":`, {
          originalImageUrl: contest.imageUrl,
          hasImageUrl: !!contest.imageUrl,
          imageUrlLength: contest.imageUrl?.length || 0
        });
        
        if (contest.imageUrl && contest.imageUrl.trim() !== '') {
          processedImageUrl = contest.imageUrl;
          console.log(`✅ Using contest image for "${contest.title}":`, processedImageUrl);
        } else {
          console.log(`❌ No image found for contest "${contest.title}", using fallback:`, processedImageUrl);
        }
        
        // Clean the contest title to remove "FOTOGRAFIA" words
        const cleanedTitle = cleanContestTitle(contest.title);
        
        // Calculate days remaining
        const daysRemaining = getDaysRemaining(contest.dateEnd);
        
        return (
          <motion.div
            key={contest.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="group"
          >
            <Link to={`/contests/${contest.id}`} className="block">
              <Card className="overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 group-hover:scale-[1.02] bg-white">
                {/* Contest Image - Increased height for larger cards */}
                <div className="relative aspect-[4/2.5] overflow-hidden bg-gray-100">
                  <img
                    src={processedImageUrl}
                    alt={cleanedTitle}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    onError={(e) => {
                      console.error(`❌ Error loading image for contest "${contest.title}":`, processedImageUrl);
                      console.log(`🔄 Falling back to default image for "${contest.title}"`);
                      const target = e.target as HTMLImageElement;
                      target.src = fallbackImage;
                    }}
                    onLoad={() => {
                      console.log(`✅ Image loaded successfully for contest "${contest.title}":`, processedImageUrl);
                    }}
                  />
                  
                  {/* Status Badge */}
                  <div className="absolute top-4 left-4">
                    <Badge
                      variant={contest.isActive ? "default" : "secondary"}
                      className={`text-sm font-semibold px-3 py-1 ${
                        contest.isActive 
                          ? "bg-green-500 hover:bg-green-600 text-white" 
                          : "bg-gray-500 text-white"
                      }`}
                    >
                      {contest.isActive ? "ACTIVO" : "FINALIZADO"}
                    </Badge>
                  </div>

                  {/* Distance Badge */}
                  {distance !== null && (
                    <div className="absolute top-4 right-4">
                      <Badge 
                        variant="secondary" 
                        className="text-sm bg-black/70 text-white border-none px-3 py-1"
                      >
                        <MapPin className="h-4 w-4 mr-1" />
                        {distance.toFixed(1)} km
                      </Badge>
                    </div>
                  )}

                  {/* Days Remaining */}
                  {contest.isActive && daysRemaining > 0 && (
                    <div className="absolute bottom-4 right-4">
                      <Badge className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-3 py-1">
                        <Calendar className="h-4 w-4 mr-1" />
                        {daysRemaining}d
                      </Badge>
                    </div>
                  )}
                </div>

                {/* Contest Info - Increased padding for larger cards */}
                <CardContent className="p-6 space-y-4">
                  {/* Title */}
                  <h3 className="font-semibold text-lg leading-tight text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {cleanedTitle}
                  </h3>

                  {/* Location */}
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span className="truncate">{contest.location}</span>
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
