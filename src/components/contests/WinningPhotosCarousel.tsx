
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
      <div className="w-full h-screen bg-gradient-to-br from-gray-50 to-gray-100 animate-pulse">
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
    <div className="w-full h-screen relative overflow-hidden">
      <Carousel className="w-full h-full" opts={{ loop: true }}>
        <CarouselContent className="h-full -ml-0">
          {winningPhotos.map((photo, index) => (
            <CarouselItem key={photo.id} className="pl-0 basis-full h-full">
              {/* Full Screen Card */}
              <div className="relative w-full h-full group">
                {/* Background Image */}
                <div className="absolute inset-0">
                  <img 
                    src={photo.imageUrl || photo.image_url}
                    alt={cleanContestTitle(photo.title)}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                    onError={(e) => {
                      e.currentTarget.src = "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1200&h=400&fit=crop";
                    }}
                  />
                  {/* Lighter gradient overlay for better image visibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-900/10 to-blue-900/10" />
                </div>
                
                {/* Floating Award Badge */}
                <div className="absolute top-8 right-8 z-20">
                  <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-4 rounded-2xl shadow-xl border-2 border-white/30 backdrop-blur-sm">
                    <Star className="h-8 w-8 text-white fill-current drop-shadow-lg" />
                  </div>
                </div>
                
                {/* Content positioned at bottom */}
                <div className="absolute inset-0 flex items-end p-12 z-10">
                  <div className="w-full max-w-4xl">
                    {/* Semi-transparent background with reduced opacity */}
                    <div className="bg-black/30 backdrop-blur-md rounded-3xl p-10 border border-white/10 shadow-2xl">
                      {/* Title */}
                      <h3 className="text-white font-black text-5xl md:text-7xl mb-6 leading-tight drop-shadow-lg">
                        {cleanContestTitle(photo.title)}
                      </h3>
                      
                      {/* Header with trophy icon */}
                      <div className="flex items-center mb-8">
                        <Trophy className="h-8 w-8 text-yellow-400 mr-4" />
                        <h2 className="text-3xl font-bold text-yellow-400">
                          Foto Ganadora
                        </h2>
                      </div>
                      
                      {/* Photographer Info */}
                      <div className="flex items-center mb-8">
                        <div className="bg-white/20 rounded-full p-1 mr-6 border border-white/30">
                          <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-2xl">
                              {(photo.photographer || photo.photographer_name || 'A')[0].toUpperCase()}
                            </span>
                          </div>
                        </div>
                        <div>
                          <p className="text-white/90 text-2xl font-semibold">
                            {photo.photographer || photo.photographer_name}
                          </p>
                          <p className="text-white/70 text-lg">Fotógrafo Ganador</p>
                        </div>
                      </div>
                      
                      {/* Stats and Badge */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-6">
                          <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0 px-6 py-3 text-xl font-bold shadow-lg">
                            🏆 GANADOR
                          </Badge>
                          <div className="flex items-center bg-white/20 rounded-full px-6 py-3 border border-white/30">
                            <Heart className="w-6 h-6 text-pink-400 fill-current mr-3" />
                            <span className="text-white font-semibold text-xl">{photo.likes || 0}</span>
                          </div>
                        </div>
                        
                        {/* Decorative Elements */}
                        <div className="hidden md:flex items-center space-x-3">
                          <div className="w-4 h-4 bg-yellow-400 rounded-full animate-pulse"></div>
                          <div className="w-3 h-3 bg-orange-400 rounded-full animate-pulse delay-100"></div>
                          <div className="w-4 h-4 bg-red-400 rounded-full animate-pulse delay-200"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Decorative corner elements */}
                <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-white/5 to-transparent rounded-br-3xl"></div>
                <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-white/5 to-transparent rounded-tl-3xl"></div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        
        {/* Enhanced Navigation */}
        <CarouselPrevious className="left-12 h-16 w-16 bg-white/90 backdrop-blur-md border-2 border-white/50 shadow-xl hover:bg-white hover:scale-110 transition-all duration-300" />
        <CarouselNext className="right-12 h-16 w-16 bg-white/90 backdrop-blur-md border-2 border-white/50 shadow-xl hover:bg-white hover:scale-110 transition-all duration-300" />
      </Carousel>
    </div>
  );
};

export default WinningPhotosCarousel;
