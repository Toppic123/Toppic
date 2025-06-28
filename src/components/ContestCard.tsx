
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Camera, User, ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type ContestCardProps = {
  id: string;
  title: string;
  imageUrl: string;
  location: string;
  dateStart: string;
  dateEnd: string;
  participantsCount: number;
  photosCount: number;
};

const ContestCard = ({
  id,
  title,
  imageUrl,
  location,
  participantsCount,
  photosCount,
}: ContestCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  // Default fallback image for contests
  const defaultImage = "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=400&h=225&fit=crop&auto=format";
  
  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true);
  };
  
  const handleImageLoad = () => {
    setImageLoaded(true);
    setImageError(false);
  };
  
  // Use fallback image if original fails or is empty
  const displayImage = imageError || !imageUrl || imageUrl.trim() === '' ? defaultImage : imageUrl;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="group"
    >
      <Link to={`/contests/${id}`} className="block focus:outline-none">
        <div className="overflow-hidden rounded-xl relative">
          {/* Image */}
          <div className="aspect-[16/9] bg-muted overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10 opacity-70 transition-opacity group-hover:opacity-90" />
            
            {/* Loading placeholder */}
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
                <ImageIcon className="w-12 h-12 text-gray-400" />
              </div>
            )}
            
            <img
              src={displayImage}
              alt={title}
              className={cn(
                "w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105",
                imageLoaded ? "opacity-100" : "opacity-0"
              )}
              onLoad={handleImageLoad}
              onError={handleImageError}
            />
          </div>
          
          {/* Overlay content */}
          <div className="absolute bottom-0 left-0 right-0 p-4 z-20 text-white">
            <h3 className="font-medium text-lg mb-1">{title}</h3>
            <div className="flex items-center text-xs text-white/80 mb-2">
              <MapPin className="w-3 h-3 mr-1" />
              <span>{location}</span>
            </div>
          </div>
        </div>
        
        {/* Stats */}
        <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
          <div className="flex items-center">
            <User className="w-3 h-3 mr-1" />
            <span>{participantsCount} participantes</span>
          </div>
          <div className="flex items-center">
            <Camera className="w-3 h-3 mr-1" />
            <span>{photosCount} fotos</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ContestCard;
