
import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, X, Share2, ArrowRight, Instagram } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogClose, DialogHeader, DialogTitle } from "@/components/ui/dialog";
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
  const [showShareDialog, setShowShareDialog] = useState(false);
  const { toast } = useToast();

  const handleSharePhoto = (photo: WinningPhoto, platform: 'native' | 'instagram' | 'facebook' | 'twitter' | 'whatsapp' = 'native') => {
    if (!photo) return;

    let shareUrl = "";
    const pageUrl = window.location.href;
    const message = `Check out this amazing photo by ${photo.photographer}`;

    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}&quote=${encodeURIComponent(message)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(message)}`;
        break;
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodeURIComponent(message + " " + pageUrl)}`;
        break;
      case 'instagram':
        // Open Instagram share intent
        shareUrl = `https://www.instagram.com/create/story?url=${encodeURIComponent(pageUrl)}`;
        break;
      case 'native':
      default:
        if (navigator.share) {
          navigator.share({
            title: `Photo by ${photo.photographer}`,
            text: message,
            url: window.location.href
          }).catch(err => {
            console.error('Error sharing:', err);
            toast({
              title: "Couldn't share",
              description: "There was an error sharing this photo."
            });
          });
          return;
        } else {
          navigator.clipboard.writeText(window.location.href);
          toast({
            title: "Link copied",
            description: "Photo link copied to clipboard"
          });
          return;
        }
    }
    
    window.open(shareUrl, "_blank");
    toast({
      title: "Sharing photo",
      description: `Opening ${platform} to share this photo`
    });
  };

  return (
    <section className="py-16 px-4 bg-white text-black">
      <div className="container max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">{texts.winningGallery}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
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
                onError={(e) => {
                  // Display fallback for broken images
                  (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3";
                  toast({
                    title: "Image not available",
                    description: "Using a placeholder image instead"
                  });
                }}
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

      {/* Photo Detail Dialog */}
      <Dialog open={!!selectedPhoto && !showShareDialog} onOpenChange={(open) => !open && setSelectedPhoto(null)}>
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
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3";
                  }}
                />
              </div>
              
              <div className="w-full md:w-80 bg-white flex flex-col">
                <div className="mb-4 p-4">
                  <h3 className="text-lg font-bold text-black">{selectedPhoto?.title}</h3>
                  <div className="flex items-center mt-2">
                    <Avatar className="h-6 w-6 mr-2">
                      <AvatarImage src={selectedPhoto?.photographerAvatar} alt={selectedPhoto?.photographer} />
                      <AvatarFallback>{selectedPhoto?.photographer?.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-black">{selectedPhoto?.photographer}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between px-4">
                  <div className="flex items-center">
                    <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                    <span className="text-sm ml-1 text-black">{selectedPhoto?.likes} likes</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setShowShareDialog(true)}
                    >
                      <Share2 className="h-4 w-4" />
                      <span className="ml-1">Share</span>
                    </Button>
                  </div>
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

      {/* Share Dialog */}
      <Dialog open={!!selectedPhoto && showShareDialog} onOpenChange={(open) => !open && setShowShareDialog(false)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Compartir fotografía</DialogTitle>
          </DialogHeader>
          
          {selectedPhoto && (
            <div className="space-y-4">
              <div className="aspect-square rounded-md overflow-hidden">
                <img 
                  src={selectedPhoto.imageUrl} 
                  alt={`Foto de ${selectedPhoto.photographer}`}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <Button 
                  variant="outline" 
                  className="flex justify-center items-center gap-2" 
                  onClick={() => handleSharePhoto(selectedPhoto, "facebook")}
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current text-blue-600">
                    <path d="M9.19795 21.5H13.198V13.4901H16.8021L17.198 9.50977H13.198V7.5C13.198 6.94772 13.6457 6.5 14.198 6.5H17.198V2.5H14.198C11.4365 2.5 9.19795 4.73858 9.19795 7.5V9.50977H7.19795L6.80206 13.4901H9.19795V21.5Z"></path>
                  </svg>
                  Facebook
                </Button>
                <Button 
                  variant="outline" 
                  className="flex justify-center items-center gap-2"
                  onClick={() => handleSharePhoto(selectedPhoto, "twitter")}
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current text-blue-400">
                    <path d="M22.162 5.65593C21.3986 5.99362 20.589 6.2154 19.76 6.31393C20.6337 5.79136 21.2877 4.96894 21.6 3.99993C20.78 4.48793 19.881 4.82993 18.944 5.01493C18.3146 4.34151 17.4804 3.89489 16.5709 3.74451C15.6615 3.59413 14.7279 3.74842 13.9153 4.18338C13.1026 4.61834 12.4564 5.30961 12.0771 6.14972C11.6978 6.98983 11.6067 7.93171 11.818 8.82893C10.1551 8.74558 8.52883 8.31345 7.04329 7.56059C5.55774 6.80773 4.24791 5.75097 3.19799 4.45893C2.82628 5.09738 2.63095 5.82315 2.63199 6.56193C2.63199 8.01193 3.36999 9.29293 4.49199 10.0429C3.828 10.022 3.17862 9.84271 2.59799 9.51993V9.57193C2.59819 10.5376 2.93236 11.4735 3.54384 12.221C4.15532 12.9684 5.00647 13.4814 5.95299 13.6729C5.33661 13.84 4.6903 13.8646 4.06299 13.7449C4.32986 14.5762 4.85 15.3031 5.55058 15.824C6.25117 16.345 7.09712 16.6337 7.96999 16.6499C7.10247 17.3313 6.10917 17.8349 5.04687 18.1321C3.98458 18.4293 2.87412 18.5142 1.77899 18.3819C3.69069 19.6114 5.91609 20.2641 8.18899 20.2619C15.882 20.2619 20.089 13.8889 20.089 8.36193C20.089 8.18193 20.084 7.99993 20.076 7.82193C20.8949 7.23009 21.6016 6.49695 22.163 5.65693L22.162 5.65593Z"></path>
                  </svg>
                  Twitter
                </Button>
                <Button 
                  variant="outline" 
                  className="flex justify-center items-center gap-2"
                  onClick={() => handleSharePhoto(selectedPhoto, "whatsapp")}
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current text-green-500">
                    <path d="M17.507 14.307L20.308 17.108L17.507 14.307ZM3.7 22.3L6.45 21.9C7.71139 22.4172 9.0747 22.6879 10.459 22.7L10.959 22.7C17.929 22.7 21.659 16.707 21.659 10.207C21.659 7.16997 20.509 5.01997 18.507 3.01797C16.507 1.01997 14.357 -0.100029 11.307 -3.05176e-05C4.32997 -3.05176e-05 0.657975 5.99997 0.657975 12.5C0.657975 14.092 0.947975 15.625 1.50698 17.05L2.00698 18.35L0.957975 20.95L3.7 22.3Z"></path>
                    <path d="M11.55 6C11.302 6 11.108 6.193 11.109 6.442C11.109 6.69 11.303 6.883 11.551 6.883C12.486 6.886 13.389 7.256 14.06 7.926C14.733 8.596 15.103 9.496 15.106 10.428C15.106 10.676 15.3 10.869 15.548 10.869C15.796 10.869 15.989 10.675 15.989 10.428C15.986 9.248 15.518 8.119 14.687 7.289C13.856 6.458 12.73 5.992 11.55 5.999V6Z" />
                    <path d="M11.55 8.40002C11.302 8.40002 11.108 8.59302 11.109 8.84202C11.109 9.09002 11.303 9.28302 11.551 9.28302C11.964 9.28302 12.363 9.44702 12.664 9.74702C12.964 10.048 13.127 10.447 13.127 10.861C13.127 11.108 13.321 11.301 13.569 11.301C13.817 11.301 14.01 11.108 14.01 10.861C14.01 10.201 13.747 9.56702 13.277 9.09602C12.805 8.62602 12.172 8.36102 11.55 8.40002Z" />
                    <path d="M13.5 14.5L12.5 14C9.9 12.7 8.7 10.1 8.5 9.7L8.3 9.3C8.1 8.9 8.3 8.4 8.7 8.2L9.7 7.7C10.1 7.5 10.2 7 10 6.6L8.5 4.1C8.3 3.7 7.8 3.6 7.4 3.8L6.4 4.3C5.9 4.6 5.5 5 5.4 5.6C5.1 7.1 5.5 9.5 8.3 12.3C11.4 15.4 14.1 15.5 15.5 15.2C16.1 15.1 16.5 14.7 16.7 14.3L17.2 13.3C17.4 12.9 17.2 12.4 16.8 12.2L14.3 10.7C13.9 10.5 13.4 10.6 13.2 11L12.7 12C12.6 12.2 12.2 12.3 12 12.2L11.5 12C11.3 11.9 11.1 11.8 10.9 11.7L12.5 14.5C13 14.5 13.3 14.5 13.5 14.5Z" />
                  </svg>
                  WhatsApp
                </Button>
                <Button 
                  variant="outline" 
                  className="flex justify-center items-center gap-2"
                  onClick={() => handleSharePhoto(selectedPhoto, "instagram")}
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current text-pink-600">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  Instagram
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default WinningGallerySection;
