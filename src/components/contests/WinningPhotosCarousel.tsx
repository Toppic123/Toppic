
import { useState, useEffect } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

// High-quality concert photo for the carousel
const concertPhoto = {
  id: 1,
  imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=1200&auto=format&fit=crop",
  alt: "Concierto en vivo con multitud"
};

const WinningPhotosCarousel = () => {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 mb-8">
      <div className="relative w-full h-80 overflow-hidden rounded-xl shadow-lg">
        <Carousel className="w-full h-full" opts={{ loop: true }}>
          <CarouselContent className="h-full">
            <CarouselItem className="basis-full h-full">
              <div className="relative w-full h-full">
                <img 
                  src={concertPhoto.imageUrl}
                  alt={concertPhoto.alt}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    console.log('Error loading concert image');
                    // Fallback to another concert image if the main one fails
                    const fallbackUrl = "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1200&auto=format&fit=crop";
                    if (e.currentTarget.src !== fallbackUrl) {
                      e.currentTarget.src = fallbackUrl;
                    }
                  }}
                  onLoad={() => {
                    console.log('Concert image loaded successfully');
                  }}
                />
              </div>
            </CarouselItem>
          </CarouselContent>
          
          {/* Navigation buttons */}
          <CarouselPrevious className="left-4 h-12 w-12 bg-white/90 backdrop-blur-md border border-white/50 shadow-lg hover:bg-white hover:scale-110 transition-all duration-300" />
          <CarouselNext className="right-4 h-12 w-12 bg-white/90 backdrop-blur-md border border-white/50 shadow-lg hover:bg-white hover:scale-110 transition-all duration-300" />
        </Carousel>
      </div>
    </div>
  );
};

export default WinningPhotosCarousel;
