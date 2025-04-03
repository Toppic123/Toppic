
import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, X, Share2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import PhotoComments from "@/components/PhotoComments";

interface WinningPhoto {
  id: number;
  imageUrl: string;
  title: string;
  photographer: string;
  photographerAvatar: string;
  likes: number;
}

interface WinningGallerySectionProps {
  photos: WinningPhoto[];
  texts: {
    winningGallery: string;
    winningGalleryDesc: string;
    viewGallery: string;
  };
}

const WinningGallerySection = ({ photos, texts }: WinningGallerySectionProps) => {
  const [selectedPhoto, setSelectedPhoto] = useState<WinningPhoto | null>(null);
  const { toast } = useToast();

  const handleSharePhoto = (photo: WinningPhoto) => {
    if (navigator.share) {
      navigator.share({
        title: `Photo by ${photo.photographer}`,
        text: `Check out this amazing photo by ${photo.photographer}`,
        url: window.location.href
      }).catch(err => {
        console.error('Error sharing:', err);
        toast({
          title: "Couldn't share",
          description: "There was an error sharing this photo."
        });
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied",
        description: "Photo link copied to clipboard"
      });
    }
  };

  return (
    <section className="py-16 px-4 bg-white">
      <div className="container max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">{texts.winningGallery}</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            {texts.winningGalleryDesc}
          </p>
        </div>
        
        <div className="grid grid-cols-3 gap-1 md:gap-1.5 mb-6">
          {photos.slice(0, 9).map((photo) => (
            <motion.div 
              key={photo.id}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.2 }}
              className="aspect-square overflow-hidden relative group max-h-[200px] md:max-h-[250px] cursor-pointer"
              onClick={() => setSelectedPhoto(photo)}
            >
              <img 
                src={photo.imageUrl} 
                alt={photo.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-2 md:p-3">
                <p className="text-white font-medium text-xs md:text-sm truncate">{photo.title}</p>
                <div className="flex items-center justify-between mt-1">
                  <div className="flex items-center">
                    <Avatar className="h-4 w-4 md:h-5 md:w-5 mr-1">
                      <AvatarImage src={photo.photographerAvatar} alt={photo.photographer} />
                      <AvatarFallback>{photo.photographer.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="text-white/90 text-xs truncate max-w-[70px]">{photo.photographer}</span>
                  </div>
                  <div className="flex items-center text-white/90">
                    <Heart className="h-3 w-3 md:h-3.5 md:w-3.5 mr-1 fill-white text-white" />
                    <span className="text-sm">{photo.likes}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center">
          <Button asChild variant="outline" className="rounded-full px-8 border-primary/80 text-primary hover:bg-primary/10">
            <Link to="/gallery">
              <span>{texts.viewGallery}</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>

      <Dialog open={!!selectedPhoto} onOpenChange={(open) => !open && setSelectedPhoto(null)}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden bg-transparent border-0 shadow-none">
          <div className="relative bg-black rounded-lg overflow-hidden">
            <DialogClose className="absolute top-2 right-2 z-50 bg-black/60 text-white rounded-full p-1.5 hover:bg-black/80">
              <X className="h-5 w-5" />
            </DialogClose>
            
            <div className="flex flex-col md:flex-row max-h-[90vh]">
              <div className="relative flex-1 flex items-center justify-center bg-black min-h-[300px] md:min-h-[400px]">
                <img 
                  src={selectedPhoto?.imageUrl} 
                  alt={selectedPhoto?.title} 
                  className="max-w-full max-h-[70vh] object-contain"
                />
              </div>
              
              <div className="w-full md:w-80 bg-white flex flex-col">
                <div className="mb-4 p-4">
                  <h3 className="text-lg font-bold">{selectedPhoto?.title}</h3>
                  <div className="flex items-center mt-2">
                    <Avatar className="h-6 w-6 mr-2">
                      <AvatarImage src={selectedPhoto?.photographerAvatar} alt={selectedPhoto?.photographer} />
                      <AvatarFallback>{selectedPhoto?.photographer?.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{selectedPhoto?.photographer}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between px-4">
                  <div className="flex items-center">
                    <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                    <span className="text-sm ml-1">{selectedPhoto?.likes} likes</span>
                  </div>
                  
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => selectedPhoto && handleSharePhoto(selectedPhoto)}
                  >
                    <Share2 className="h-4 w-4 mr-1" />
                    Share
                  </Button>
                </div>
                
                <Separator className="my-2" />
                
                {selectedPhoto && (
                  <div className="flex-1 overflow-hidden">
                    <PhotoComments photoId={selectedPhoto.id.toString()} isEmbedded={true} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default WinningGallerySection;
