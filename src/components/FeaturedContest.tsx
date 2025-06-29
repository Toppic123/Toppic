
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, MapPin, Camera, User, ArrowRight, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

type FeaturedContestProps = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  location: string;
  dateStart: string;
  dateEnd: string;
  participantsCount: number;
  photosCount: number;
};

const FeaturedContest = ({
  id,
  title,
  description,
  imageUrl,
  location,
  dateStart,
  dateEnd,
  participantsCount,
  photosCount,
}: FeaturedContestProps) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    console.error('FeaturedContest image failed to load:', imageUrl);
    setImageError(true);
  };

  const handleImageLoad = () => {
    console.log('FeaturedContest image loaded successfully:', imageUrl);
    setImageLoaded(true);
  };
  
  // Improved image handling
  const getDisplayImage = () => {
    if (imageError || !imageUrl) {
      return "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800&h=600&fit=crop";
    }
    
    // Handle different types of URLs properly
    if (imageUrl.startsWith('blob:') || 
        imageUrl.startsWith('data:') || 
        imageUrl.startsWith('http')) {
      return imageUrl;
    }
    
    // If it contains supabase storage indicators, treat as valid
    if (imageUrl.includes('supabase') || imageUrl.includes('storage')) {
      return imageUrl;
    }
    
    // Fallback
    return "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800&h=600&fit=crop";
  };
  
  const displayImage = getDisplayImage();
  
  return (
    <div className="relative w-full min-h-[70vh] overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/95 to-transparent z-10" />
        
        {/* Background loading placeholder */}
        {!imageLoaded && !imageError && (
          <div className="w-full h-full bg-gray-200 animate-pulse flex items-center justify-center">
            <Camera className="h-16 w-16 text-gray-400" />
          </div>
        )}
        
        <img
          src={displayImage}
          alt={`${title} - imagen de fondo`}
          className={`w-full h-full object-cover scale-105 blur-sm opacity-40 transition-opacity duration-500 ${
            imageLoaded ? 'opacity-40' : 'opacity-0'
          }`}
          onError={handleImageError}
          onLoad={handleImageLoad}
          loading="eager"
        />
      </div>
      
      {/* Content */}
      <div className="relative z-10 container max-w-7xl mx-auto px-4 py-24 md:py-32 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-center max-w-4xl mx-auto"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mb-8 relative"
          >   
            {/* Main image loading placeholder */}
            {!imageLoaded && !imageError && (
              <div className="w-full max-w-4xl h-[50vh] bg-gray-200 animate-pulse rounded-2xl shadow-2xl mx-auto flex items-center justify-center">
                <Camera className="h-16 w-16 text-gray-400" />
              </div>
            )}
            
            <img
              src={displayImage}
              alt={title}
              className={`w-full max-w-4xl h-[50vh] object-cover rounded-2xl shadow-2xl mx-auto transition-opacity duration-500 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onError={handleImageError}
              onLoad={handleImageLoad}
              loading="eager"
            />
          </motion.div>
          
          <div className="flex items-center justify-center space-x-4 mb-6">
            <div className="bg-primary/10 text-primary text-sm py-1 px-3 rounded-full flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              <span>
                {new Date(dateStart).toLocaleDateString('es-ES', { 
                  day: 'numeric', month: 'long' 
                })}
              </span>
            </div>
            <div className="bg-primary/10 text-primary text-sm py-1 px-3 rounded-full flex items-center">
              <MapPin className="w-4 h-4 mr-2" />
              <span>{location}</span>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">{title}</h1>
          
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto text-balance">
            {description}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-8">
            <div className="flex items-center text-muted-foreground">
              <User className="w-5 h-5 mr-2" />
              <span>{participantsCount} participantes</span>
            </div>
            <div className="flex items-center text-muted-foreground">
              <Camera className="w-5 h-5 mr-2" />
              <span>{photosCount} fotos</span>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="rounded-full px-8 text-lg">
              <Link to={`/contests/${id}`}>
                <span>Ver concurso</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full px-8 text-lg">
              <Link to="/voting-rules">
                <FileText className="mr-2 h-4 w-4" />
                <span>REGLAS</span>
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FeaturedContest;
