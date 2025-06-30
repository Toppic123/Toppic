
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Camera, MapPin, Trophy, Calendar, User } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useContestsData } from "@/hooks/useContestsData";

const ContestHeroSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { contests } = useContestsData();
  
  // Get active contests for display - use their cover images
  const activeContests = contests.filter(contest => contest.isActive).slice(0, 3);
  
  // Use contest cover images directly
  const heroData = activeContests.map((contest) => {
    const daysRemaining = Math.ceil((new Date(contest.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    
    return {
      id: contest.id,
      imageUrl: contest.imageUrl || "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800&h=600&fit=crop",
      contestName: contest.title,
      location: contest.location,
      prize: contest.prize || "€500",
      photographerName: contest.organizer || "Organizador",
      daysRemaining: Math.max(0, daysRemaining),
      contestId: contest.id
    };
  });

  useEffect(() => {
    if (heroData.length > 1) {
      const interval = setInterval(() => {
        setActiveIndex((current) => (current + 1) % heroData.length);
      }, 6000);
      return () => clearInterval(interval);
    }
  }, [heroData.length]);

  if (!heroData.length) {
    return (
      <section className="relative h-[60vh] bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="text-center text-white">
          <Camera className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p className="text-xl">Cargando concursos...</p>
        </div>
      </section>
    );
  }

  const currentItem = heroData[activeIndex];

  return (
    <section className="relative h-[60vh] overflow-hidden bg-gray-900">
      {/* Background Images */}
      <div className="absolute inset-0 z-0">
        {heroData.map((item, index) => (
          <div 
            key={item.id}
            className={cn(
              "absolute inset-0 transition-opacity duration-1000",
              activeIndex === index ? "opacity-100" : "opacity-0"
            )}
          >
            <img 
              src={item.imageUrl} 
              alt={`Imagen de portada del concurso ${item.contestName}`}
              className="absolute w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800&h=600&fit=crop";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/60" />
          </div>
        ))}
      </div>
      
      {/* Content */}
      <div className="relative z-10 container max-w-7xl mx-auto h-full flex items-end px-4 pb-12">
        <motion.div 
          key={activeIndex}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-4xl"
        >
          {/* Contest Info Card */}
          <div className="bg-black/30 backdrop-blur-md rounded-2xl p-8 border border-white/10">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              {/* Main Info */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <Badge 
                    variant="secondary" 
                    className="bg-white/20 text-white border-white/30 hover:bg-white/30"
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    {currentItem.daysRemaining > 0 ? `${currentItem.daysRemaining} días restantes` : 'Finalizado'}
                  </Badge>
                  <Badge 
                    variant="secondary" 
                    className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0"
                  >
                    <Trophy className="w-4 h-4 mr-2" />
                    {currentItem.prize}
                  </Badge>
                </div>
                
                <h1 className="text-3xl lg:text-4xl font-bold mb-3 text-white leading-tight">
                  {currentItem.contestName}
                </h1>
                
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex items-center text-white/90">
                    <MapPin className="w-5 h-5 mr-2" />
                    <span className="text-lg">{currentItem.location}</span>
                  </div>
                  <div className="flex items-center text-white/90">
                    <User className="w-5 h-5 mr-2" />
                    <span className="text-lg">Organizado por {currentItem.photographerName}</span>
                  </div>
                </div>
              </div>
              
              {/* Action Button */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  asChild 
                  size="lg" 
                  className="bg-white text-gray-900 hover:bg-white/90 font-bold px-8 py-4 rounded-full text-lg h-auto"
                >
                  <Link to={`/contests/${currentItem.contestId}`}>
                    <Camera className="mr-3 h-5 w-5" />
                    Ver Concurso
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Pagination Dots */}
      {heroData.length > 1 && (
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10">
          <div className="flex gap-3">
            {heroData.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={cn(
                  "w-3 h-3 rounded-full transition-all duration-300",
                  activeIndex === index 
                    ? "bg-white shadow-lg scale-125" 
                    : "bg-white/40 hover:bg-white/60"
                )}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default ContestHeroSection;
