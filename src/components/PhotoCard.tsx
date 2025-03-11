import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { User, Heart, Flag, ThumbsUp, ThumbsDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

type PhotoCardProps = {
  id: string;
  imageUrl: string;
  photographer: string;
  photographerAvatar?: string;
  votes: number;
  mode?: "grid" | "swipe";
  onVote?: (id: string, vote: boolean) => void;
  onReport?: (id: string) => void;
  userVoted?: boolean;
};

const PhotoCard = ({
  id,
  imageUrl,
  photographer,
  photographerAvatar,
  votes,
  mode = "grid",
  onVote,
  onReport,
  userVoted = false,
}: PhotoCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [direction, setDirection] = useState<number>(0);
  const [isVoted, setIsVoted] = useState<boolean>(userVoted);
  const [localVotes, setLocalVotes] = useState<number>(votes);
  const [lastTap, setLastTap] = useState<number>(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.3 });
  const { toast } = useToast();
  
  const handleTapOrClick = () => {
    const now = Date.now();
    const DOUBLE_TAP_DELAY = 300;
    
    if (now - lastTap < DOUBLE_TAP_DELAY) {
      handleVoteToggle();
    }
    
    setLastTap(now);
  };
  
  const handleVoteToggle = () => {
    if (isVoted) {
      toast({
        title: "Ya has votado esta foto",
        description: "Solo puedes votar una foto por concurso",
      });
      return;
    }
    
    setIsVoted(true);
    setLocalVotes(prev => prev + 1);
    
    onVote?.(id, true);
    
    toast({
      title: "Voto registrado",
      description: "Has votado a favor de esta foto",
    });
  };
  
  useEffect(() => {
    if (mode !== "swipe" || !cardRef.current) return;
    
    let startX = 0;
    let startY = 0;
    
    const handleTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    };
    
    const handleTouchMove = (e: TouchEvent) => {
      if (!startX || !startY) return;
      
      const currentX = e.touches[0].clientX;
      const currentY = e.touches[0].clientY;
      
      const diffX = startX - currentX;
      const diffY = startY - currentY;
      
      if (Math.abs(diffY) > Math.abs(diffX)) {
        const direction = diffY > 0 ? -1 : 1;
        setDirection(direction);
      }
    };
    
    const handleTouchEnd = () => {
      if (direction === 1) {
        onVote?.(id, true);
      } else if (direction === -1) {
        onVote?.(id, false);
      }
      
      setDirection(0);
      startX = 0;
      startY = 0;
    };
    
    const element = cardRef.current;
    element.addEventListener("touchstart", handleTouchStart);
    element.addEventListener("touchmove", handleTouchMove);
    element.addEventListener("touchend", handleTouchEnd);
    
    return () => {
      element.removeEventListener("touchstart", handleTouchStart);
      element.removeEventListener("touchmove", handleTouchMove);
      element.removeEventListener("touchend", handleTouchEnd);
    };
  }, [id, mode, direction, onVote]);

  if (mode === "swipe") {
    return (
      <motion.div
        ref={cardRef}
        className="relative w-full max-w-md mx-auto aspect-[3/4] rounded-2xl overflow-hidden shadow-xl"
        animate={{
          y: direction * 20,
          opacity: direction !== 0 ? 0.8 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <div className="absolute inset-0 bg-black/40 z-10" />
        <img
          src={imageUrl}
          alt={`Photo by ${photographer}`}
          className={cn(
            "absolute inset-0 w-full h-full object-cover transition-opacity duration-700",
            imageLoaded ? "opacity-100" : "opacity-0"
          )}
          onLoad={() => setImageLoaded(true)}
          onClick={handleTapOrClick}
        />
        
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
          {direction === 1 && (
            <div className="bg-green-500/80 text-white rounded-full p-4">
              <ThumbsUp className="h-12 w-12" />
            </div>
          )}
          {direction === -1 && (
            <div className="bg-red-500/80 text-white rounded-full p-4">
              <ThumbsDown className="h-12 w-12" />
            </div>
          )}
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-white z-10">
          <div className="flex items-center space-x-2">
            {photographerAvatar ? (
              <img
                src={photographerAvatar}
                alt={photographer}
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                <User className="w-4 h-4" />
              </div>
            )}
            <span className="font-medium">{photographer}</span>
          </div>
          
          <div className="flex items-center justify-between mt-2">
            <button 
              className="flex items-center space-x-1 group"
              onClick={handleVoteToggle}
              aria-label="Vote for this photo"
            >
              <Heart className={`w-4 h-4 ${isVoted ? "text-red-500 fill-red-500" : "text-red-500"} transition-colors`} />
              <span className="text-sm">{localVotes}</span>
            </button>
            <button
              onClick={() => onReport?.(id)}
              className="text-white/80 hover:text-white transition-colors"
              aria-label="Report photo"
            >
              <Flag className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>
    );
  }
  
  return (
    <motion.div
      ref={cardRef}
      className="contest-card"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <div 
        className="aspect-[3/4] bg-muted overflow-hidden rounded-xl relative"
        onClick={handleTapOrClick}
      >
        <img
          src={imageUrl}
          alt={`Photo by ${photographer}`}
          className={cn(
            "contest-card-image",
            imageLoaded ? "opacity-100" : "opacity-0"
          )}
          onLoad={() => setImageLoaded(true)}
        />
        {isVoted && (
          <div className="absolute top-2 right-2 bg-primary/90 text-white p-1.5 rounded-full">
            <Heart className="w-4 h-4 fill-white" />
          </div>
        )}
      </div>
      
      <div className="p-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {photographerAvatar ? (
              <img
                src={photographerAvatar}
                alt={photographer}
                className="w-6 h-6 rounded-full object-cover"
              />
            ) : (
              <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="w-3 h-3" />
              </div>
            )}
            <span className="text-sm font-medium">{photographer}</span>
          </div>
          
          <button 
            className="flex items-center space-x-1 group"
            onClick={handleVoteToggle}
            aria-label="Vote for this photo"
          >
            <Heart className={`w-4 h-4 ${isVoted ? "text-red-500 fill-red-500" : "text-red-500"} transition-colors`} />
            <span className="text-xs text-muted-foreground">{localVotes}</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default PhotoCard;
