
import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { User, Flag, ThumbsUp, ThumbsDown, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import SocialShareButtons from "@/components/SocialShareButtons";
import ReportPhotoDialog from "@/components/ReportPhotoDialog";
import ClickableUserProfile from "@/components/ClickableUserProfile";
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";

type PhotoCardProps = {
  id: string;
  imageUrl: string;
  photographer: string;
  photographerAvatar?: string;
  mode?: "grid" | "swipe";
  onVote?: (id: string, vote: boolean) => void;
  onReport?: (id: string) => void;
  onShare?: (id: string) => void;
  expanded?: boolean;
};

const PhotoCard = ({
  id,
  imageUrl,
  photographer,
  photographerAvatar,
  mode = "grid",
  onVote,
  onReport,
  onShare,
  expanded = false,
}: PhotoCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [direction, setDirection] = useState<number>(0);
  const [lastTap, setLastTap] = useState<number>(0);
  const [showPhotoDialog, setShowPhotoDialog] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.3 });
  const { toast } = useToast();
  
  const handleTapOrClick = () => {
    if (mode === "grid") {
      setShowPhotoDialog(true);
    }
    const now = Date.now();
    setLastTap(now);
  };
  
  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (navigator.share) {
      navigator.share({
        title: `Photo by ${photographer}`,
        text: `Check out this amazing photo by ${photographer}`,
        url: window.location.href
      }).catch(err => {
        console.error('Error sharing:', err);
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied",
        description: "Photo link copied to clipboard"
      });
    }
    
    onShare?.(id);
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
          <div className="flex items-center space-x-2 pointer-events-auto">
            <ClickableUserProfile
              photographer={photographer}
              photographerAvatar={photographerAvatar}
              size="sm"
            />
          </div>
          
          <div className="flex items-center justify-end mt-2">
            <div className="flex space-x-2">
              <button
                onClick={handleShare}
                className="text-white/80 hover:text-white transition-colors"
                aria-label="Share photo"
              >
                <Share2 className="w-4 h-4" />
              </button>
              <ReportPhotoDialog 
                photoId={id}
                trigger={
                  <button
                    className="text-white/80 hover:text-white transition-colors"
                    aria-label="Report photo"
                  >
                    <Flag className="w-4 h-4" />
                  </button>
                }
              />
            </div>
          </div>
        </div>
      </motion.div>
    );
  }
  
  return (
    <>
      <motion.div
        ref={cardRef}
        className="contest-card"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div 
          className="aspect-[3/4] bg-muted overflow-hidden rounded-xl relative group cursor-pointer"
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
        </div>
        
        <div className="p-2">
          <ClickableUserProfile
            photographer={photographer}
            photographerAvatar={photographerAvatar}
            size="sm"
          />
        </div>
      </motion.div>

      {/* Photo Detail Dialog */}
      <Dialog open={showPhotoDialog} onOpenChange={setShowPhotoDialog}>
        <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-hidden p-0">
          <div className="relative w-full h-full bg-black flex flex-col">
            <DialogClose className="absolute top-2 right-2 z-10 rounded-full bg-black/60 p-2 text-white hover:bg-black/80" />
            
            <div className="flex-1 overflow-hidden flex items-center justify-center p-4">
              <img 
                src={imageUrl} 
                alt={`Foto de ${photographer}`} 
                className="max-h-full max-w-full object-contain"
              />
            </div>
            
            <div className="bg-white w-full p-4 flex justify-between items-center">
              <div className="flex flex-col">
                <span className="text-sm text-muted-foreground mb-1">Fotógrafo:</span>
                <ClickableUserProfile
                  photographer={photographer}
                  photographerAvatar={photographerAvatar}
                  size="md"
                />
              </div>
              
              <div className="flex items-center gap-2">
                <SocialShareButtons 
                  url={window.location.href}
                  title={`Photo by ${photographer}`}
                  imageUrl={imageUrl}
                />
                <ReportPhotoDialog photoId={id} />
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PhotoCard;
