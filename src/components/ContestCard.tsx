
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
  const [imageError, setImageError] = useState(false);
  
  // Better image handling for Supabase storage URLs
  const getDisplayImage = () => {
    if (!imageUrl || imageError) {
      return "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=400&h=225&fit=crop";
    }
    
    // If it's a blob URL or data URL, return as is
    if (imageUrl.startsWith('blob:') || imageUrl.startsWith('data:')) {
      return imageUrl;
    }
    
    // If it's a Supabase storage URL or regular URL, return as is
    if (imageUrl.startsWith('http') || imageUrl.includes('supabase')) {
      return imageUrl;
    }
    
    // Fallback
    return "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=400&h=225&fit=crop";
  };
  
  const handleImageError = () => {
    console.error('Failed to load image:', imageUrl);
    setImageError(true);
  };
  
  const displayImage = getDisplayImage();
  
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
            
            <img
              src={displayImage}
              alt={title}
              className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105"
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
