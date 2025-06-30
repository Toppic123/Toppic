
import { useState, useEffect } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { Star, Trophy, Heart } from "lucide-react";
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

  console.log('WinningPhotosCarousel - Photos loaded:', winningPhotos?.length || 0);
  console.log('WinningPhotosCarousel - Photos data:', winningPhotos);

  useEffect(() => {
    if (winningPhotos.length > 0) {
      const interval = setInterval(() => {
        setActiveIndex((current) => (current + 1) % winningPhotos.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [winningPhotos.length]);

  if (isLoadingWinning) {
    return (
      <div className="w-full h-64 bg-gradient-to-br from-gray-50 to-gray-100 animate-pulse rounded-xl">
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="w-8 h-8 bg-gray-300 rounded-full mx-auto mb-2 animate-pulse"></div>
            <p className="text-gray-500 text-sm">Cargando fotos ganadoras...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!winningPhotos || winningPhotos.length === 0) {
    console.log('No winning photos available');
    return (
      <div className="w-full h-64 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl">
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <Trophy className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500 text-sm">No hay fotos ganadoras disponibles</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-80 relative overflow-hidden rounded-xl shadow-lg mb-8">
      <Carousel className="w-full h-full" opts={{ loop: true }}>
        <CarouselContent className="h-full -ml-0">
          {winningPhotos.map((photo, index) => {
            const imageUrl = photo.imageUrl || photo.image_url;
            console.log(`Photo ${photo.id} - Image URL:`, imageUrl);
            
            return (
              <CarouselItem key={photo.id} className="pl-0 basis-full h-full">
                {/* Carousel Card */}
                <div className="relative w-full h-full group">
                  {/* Background Image */}
                  <div className="absolute inset-0">
                    <img 
                      src={imageUrl || "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1200&h=400&fit=crop"}
                      alt={cleanContestTitle(photo.title)}
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                      onError={(e) => {
                        console.log('Image error for photo:', photo.id, e);
                        e.currentTarget.src = "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1200&h=400&fit=crop";
                      }}
                      onLoad={() => {
                        console.log('Image loaded successfully for photo:', photo.id);
                      }}
                    />
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-blue-900/20" />
                  </div>
                  
                  {/* Floating Award Badge */}
                  <div className="absolute top-4 right-4 z-20">
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-3 rounded-xl shadow-lg border border-white/30 backdrop-blur-sm">
                      <Star className="h-5 w-5 text-white fill-current drop-shadow-lg" />
                    </div>
                  </div>
                  
                  {/* Content positioned at bottom */}
                  <div className="absolute inset-0 flex items-end p-6 z-10">
                    <div className="w-full">
                      {/* Semi-transparent background */}
                      <div className="bg-black/40 backdrop-blur-md rounded-2xl p-6 border border-white/10 shadow-xl">
                        {/* Header with trophy icon */}
                        <div className="flex items-center mb-4">
                          <Trophy className="h-5 w-5 text-yellow-400 mr-2" />
                          <h2 className="text-lg font-bold text-yellow-400">
                            Foto Ganadora
                          </h2>
                        </div>
                        
                        {/* Title */}
                        <h3 className="text-white font-bold text-2xl md:text-3xl mb-4 leading-tight">
                          {cleanContestTitle(photo.title)}
                        </h3>
                        
                        {/* Bottom row with photographer and stats */}
                        <div className="flex items-center justify-between">
                          {/* Photographer Info */}
                          <div className="flex items-center">
                            <div className="bg-white/20 rounded-full p-1 mr-3 border border-white/30">
                              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center">
                                <span className="text-white font-bold text-sm">
                                  {(photo.photographer || photo.photographer_name || 'A')[0].toUpperCase()}
                                </span>
                              </div>
                            </div>
                            <div>
                              <p className="text-white font-semibold">
                                {photo.photographer || photo.photographer_name}
                              </p>
                              <p className="text-white/70 text-sm">Fotógrafo</p>
                            </div>
                          </div>
                          
                          {/* Stats */}
                          <div className="flex items-center gap-4">
                            <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0 px-4 py-2 font-bold shadow-lg">
                              🏆 GANADOR
                            </Badge>
                            <div className="flex items-center bg-white/20 rounded-full px-4 py-2 border border-white/30">
                              <Heart className="w-4 h-4 text-pink-400 fill-current mr-2" />
                              <span className="text-white font-semibold">{photo.likes || 0}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        
        {/* Navigation */}
        <CarouselPrevious className="left-4 h-12 w-12 bg-white/90 backdrop-blur-md border border-white/50 shadow-lg hover:bg-white hover:scale-110 transition-all duration-300" />
        <CarouselNext className="right-4 h-12 w-12 bg-white/90 backdrop-blur-md border border-white/50 shadow-lg hover:bg-white hover:scale-110 transition-all duration-300" />
      </Carousel>
    </div>
  );
};

export default WinningPhotosCarousel;
