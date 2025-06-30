
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
      <div className="w-full h-96 bg-gradient-to-br from-gray-50 to-gray-100 animate-pulse rounded-2xl mb-8 border border-gray-200">
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="w-12 h-12 bg-gray-300 rounded-full mx-auto mb-4 animate-pulse"></div>
            <p className="text-gray-500 font-medium">Cargando fotos ganadoras...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!winningPhotos || winningPhotos.length === 0) {
    return null;
  }

  return (
    <div className="mb-12 -mx-4">
      {/* Enhanced Header */}
      <div className="flex items-center justify-center mb-8 px-4">
        <div className="flex items-center bg-gradient-to-r from-yellow-50 to-orange-50 px-6 py-3 rounded-full border border-yellow-200 shadow-sm">
          <Trophy className="h-6 w-6 text-yellow-600 mr-3" />
          <h2 className="text-2xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
            Fotos Ganadoras
          </h2>
          <div className="ml-3 flex">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
          </div>
        </div>
      </div>
      
      <Carousel className="w-full" opts={{ loop: true }}>
        <CarouselContent className="-ml-0">
          {winningPhotos.map((photo, index) => (
            <CarouselItem key={photo.id} className="pl-0 basis-full">
              {/* Modern Card Design */}
              <div className="relative w-full h-[500px] mx-4 rounded-3xl overflow-hidden group shadow-2xl border border-white/20">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0">
                  <img 
                    src={photo.imageUrl || photo.image_url}
                    alt={cleanContestTitle(photo.title)}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                    onError={(e) => {
                      e.currentTarget.src = "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1200&h=400&fit=crop";
                    }}
                  />
                  {/* Multi-layer gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-blue-900/20" />
                </div>
                
                {/* Floating Award Badge */}
                <div className="absolute top-6 right-6 z-20">
                  <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-3 rounded-2xl shadow-xl border-2 border-white/30 backdrop-blur-sm">
                    <Star className="h-6 w-6 text-white fill-current drop-shadow-lg" />
                  </div>
                </div>
                
                {/* Content Card */}
                <div className="absolute inset-0 flex items-end p-8 z-10">
                  <div className="w-full">
                    {/* Glass Card Background */}
                    <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 shadow-2xl">
                      {/* Title */}
                      <h3 className="text-white font-black text-4xl md:text-5xl mb-4 leading-tight drop-shadow-lg">
                        {cleanContestTitle(photo.title)}
                      </h3>
                      
                      {/* Photographer Info */}
                      <div className="flex items-center mb-6">
                        <div className="bg-white/20 rounded-full p-1 mr-4 border border-white/30">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-lg">
                              {(photo.photographer || photo.photographer_name || 'A')[0].toUpperCase()}
                            </span>
                          </div>
                        </div>
                        <div>
                          <p className="text-white/90 text-lg font-semibold">
                            {photo.photographer || photo.photographer_name}
                          </p>
                          <p className="text-white/70 text-sm">Fotógrafo Ganador</p>
                        </div>
                      </div>
                      
                      {/* Stats and Badge */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0 px-4 py-2 text-base font-bold shadow-lg">
                            🏆 GANADOR
                          </Badge>
                          <div className="flex items-center bg-white/20 rounded-full px-4 py-2 border border-white/30">
                            <Heart className="w-5 h-5 text-pink-400 fill-current mr-2" />
                            <span className="text-white font-semibold text-lg">{photo.likes || 0}</span>
                          </div>
                        </div>
                        
                        {/* Decorative Elements */}
                        <div className="hidden md:flex items-center space-x-2">
                          <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
                          <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse delay-100"></div>
                          <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse delay-200"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Decorative corner elements */}
                <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-white/10 to-transparent rounded-br-3xl"></div>
                <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-white/10 to-transparent rounded-tl-3xl"></div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        
        {/* Enhanced Navigation */}
        <CarouselPrevious className="left-8 h-14 w-14 bg-white/90 backdrop-blur-md border-2 border-white/50 shadow-xl hover:bg-white hover:scale-110 transition-all duration-300" />
        <CarouselNext className="right-8 h-14 w-14 bg-white/90 backdrop-blur-md border-2 border-white/50 shadow-xl hover:bg-white hover:scale-110 transition-all duration-300" />
      </Carousel>
    </div>
  );
};

export default WinningPhotosCarousel;
