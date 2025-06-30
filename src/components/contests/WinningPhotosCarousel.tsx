
import { useState, useEffect } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { Star, Trophy } from "lucide-react";
import { useWinningPhotos } from "@/hooks/use-winning-photos";

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

const WinningPhotosCarousel = () => {
  const { photos: winningPhotos, loading: isLoadingWinning } = useWinningPhotos();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (winningPhotos.length > 0) {
      const interval = setInterval(() => {
        setActiveIndex((current) => (current + 1) % winningPhotos.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [winningPhotos.length]);

  if (isLoadingWinning) {
    return (
      <div className="w-full h-96 bg-gray-100 animate-pulse rounded-lg mb-8">
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-500">Cargando fotos ganadoras...</p>
        </div>
      </div>
    );
  }

  if (!winningPhotos || winningPhotos.length === 0) {
    return null;
  }

  return (
    <div className="mb-8">
      <Carousel className="w-full">
        <CarouselContent>
          {winningPhotos.map((photo, index) => (
            <CarouselItem key={photo.id} className="basis-full">
              <div className="relative rounded-lg overflow-hidden shadow-lg group h-96">
                <img 
                  src={photo.imageUrl || photo.image_url}
                  alt={cleanContestTitle(photo.title)}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=400&h=256&fit=crop";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                
                {/* Star icon in top right */}
                <div className="absolute top-3 right-3">
                  <Star className="h-5 w-5 text-yellow-400 fill-current drop-shadow-lg" />
                </div>
                
                {/* Content at bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white font-semibold text-lg mb-1 truncate">
                    {cleanContestTitle(photo.title)}
                  </h3>
                  <p className="text-white/80 text-sm mb-2 truncate">
                    {photo.photographer || photo.photographer_name}
                  </p>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                      Ganadora
                    </Badge>
                    <div className="flex items-center text-white/80 text-sm">
                      <span>{photo.likes || 0} ❤️</span>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2" />
        <CarouselNext className="right-2" />
      </Carousel>
    </div>
  );
};

export default WinningPhotosCarousel;
