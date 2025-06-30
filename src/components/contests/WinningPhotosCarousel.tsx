
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
    <div className="mb-8 -mx-4">
      <div className="flex items-center mb-4 px-4">
        <Trophy className="h-6 w-6 text-yellow-500 mr-2" />
        <h2 className="text-2xl font-bold text-gray-900">Fotos Ganadoras</h2>
      </div>
      
      <Carousel className="w-full" opts={{ loop: true }}>
        <CarouselContent className="-ml-0">
          {winningPhotos.map((photo, index) => (
            <CarouselItem key={photo.id} className="pl-0 basis-full">
              <div className="relative w-full h-96 overflow-hidden group">
                <img 
                  src={photo.imageUrl || photo.image_url}
                  alt={cleanContestTitle(photo.title)}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1200&h=400&fit=crop";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                {/* Star icon in top right */}
                <div className="absolute top-6 right-6">
                  <Star className="h-8 w-8 text-yellow-400 fill-current drop-shadow-lg" />
                </div>
                
                {/* Content centered */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center max-w-4xl px-8">
                    <h3 className="text-white font-bold text-4xl md:text-6xl mb-4 leading-tight">
                      {cleanContestTitle(photo.title)}
                    </h3>
                    <p className="text-white/90 text-xl md:text-2xl mb-6 font-medium">
                      Por {photo.photographer || photo.photographer_name}
                    </p>
                    <div className="flex items-center justify-center gap-4">
                      <Badge variant="secondary" className="bg-white/20 text-white border-white/30 text-lg px-4 py-2">
                        ⭐ Foto Ganadora
                      </Badge>
                      <div className="flex items-center text-white/90 text-lg">
                        <span>{photo.likes || 0} ❤️</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-6 h-12 w-12" />
        <CarouselNext className="right-6 h-12 w-12" />
      </Carousel>
    </div>
  );
};

export default WinningPhotosCarousel;
