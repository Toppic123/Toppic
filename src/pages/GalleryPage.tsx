import { useState, useEffect } from "react";
import { Camera, Trophy, User, Heart, Filter, Share2, X, Instagram, Flag } from "lucide-react";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogTitle, DialogHeader, DialogClose } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import PhotoComments from "@/components/PhotoComments";
import SocialShareButtons from "@/components/SocialShareButtons";
import ReportPhotoDialog from "@/components/ReportPhotoDialog";
import ClickableUserProfile from "@/components/ClickableUserProfile";

const winningPhotos = [
  {
    id: "w1",
    imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    title: "Valle del Amanecer",
    photographer: "Carlos Montoya",
    photographerAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
    contestName: "Paisajes Naturales 2023",
    likes: 542,
    date: "2023-05-15",
    category: "nature"
  },
  {
    id: "w2",
    imageUrl: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    title: "Reflejos Urbanos",
    photographer: "María Sánchez",
    photographerAvatar: "https://randomuser.me/api/portraits/women/44.jpg",
    contestName: "Fotografía Urbana",
    likes: 478,
    date: "2023-07-22",
    category: "urban"
  },
  {
    id: "w3",
    imageUrl: "https://images.unsplash.com/photo-1576377999785-cf30a129e0da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    title: "Conexión Humana",
    photographer: "Javier Rodríguez",
    photographerAvatar: "https://randomuser.me/api/portraits/men/67.jpg",
    contestName: "Retratos 2023",
    likes: 396,
    date: "2023-06-03",
    category: "portrait"
  },
  {
    id: "w4",
    imageUrl: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    title: "Concierto en el Parque",
    photographer: "Ana Martín",
    photographerAvatar: "https://randomuser.me/api/portraits/women/68.jpg",
    contestName: "Eventos Culturales",
    likes: 412,
    date: "2023-08-14",
    category: "event"
  },
  {
    id: "w5",
    imageUrl: "https://images.unsplash.com/photo-1549576490-b0b4831ef60a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    title: "El Gato Curioso",
    photographer: "Elena Torres",
    photographerAvatar: "https://randomuser.me/api/portraits/women/54.jpg",
    contestName: "Fauna Doméstica",
    likes: 521,
    date: "2023-04-30",
    category: "animal"
  },
  {
    id: "w6",
    imageUrl: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=600&auto=format&fit=crop&q=60",
    title: "Momento Especial",
    photographer: "Javier Acosta",
    photographerAvatar: "https://randomuser.me/api/portraits/men/22.jpg",
    contestName: "Celebraciones",
    likes: 387,
    date: "2023-09-05",
    category: "event"
  },
  {
    id: "w7",
    imageUrl: "https://images.unsplash.com/photo-1494783367193-149034c05e8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    title: "Cascada Secreta",
    photographer: "Laura Ruiz",
    photographerAvatar: "https://randomuser.me/api/portraits/women/15.jpg",
    contestName: "Paisajes Naturales 2023",
    likes: 489,
    date: "2023-05-28",
    category: "nature"
  },
  {
    id: "w8",
    imageUrl: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
    title: "Celebración Cultural",
    photographer: "Miguel Fernández",
    photographerAvatar: "https://randomuser.me/api/portraits/men/34.jpg",
    contestName: "Tradiciones",
    likes: 356,
    date: "2023-10-12",
    category: "event"
  }
];

const GalleryPage = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedPhoto, setSelectedPhoto] = useState<any>(null);
  const [filteredPhotos, setFilteredPhotos] = useState(winningPhotos);
  const { toast } = useToast();
  
  useEffect(() => {
    if (activeCategory === "all") {
      setFilteredPhotos(winningPhotos);
    } else {
      setFilteredPhotos(winningPhotos.filter(photo => photo.category === activeCategory));
    }
  }, [activeCategory]);
  
  const handlePhotoClick = (photo: any) => {
    setSelectedPhoto(photo);
  };
  
  const handleSharePhoto = (photo: any, platform: 'native' | 'instagram' = 'native') => {
    if (platform === 'instagram') {
      const instagramUrl = `https://www.instagram.com/create/story?url=${encodeURIComponent(window.location.href)}`;
      window.open(instagramUrl, '_blank');
      return;
    }

    if (navigator.share) {
      navigator.share({
        title: photo.title,
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };
  
  return (
    <div className="container max-w-7xl mx-auto py-24 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Galería de Ganadores</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Descubre las fotografías ganadoras de nuestros concursos. Una colección de las mejores imágenes seleccionadas por nuestra comunidad.
        </p>
      </div>
      
      <div className="flex justify-center mb-8">
        <Tabs value={activeCategory} onValueChange={setActiveCategory}>
          <TabsList className="bg-muted">
            <TabsTrigger value="all">Todas</TabsTrigger>
            <TabsTrigger value="nature">Naturaleza</TabsTrigger>
            <TabsTrigger value="urban">Urbanas</TabsTrigger>
            <TabsTrigger value="portrait">Retratos</TabsTrigger>
            <TabsTrigger value="event">Eventos</TabsTrigger>
            <TabsTrigger value="animal">Animales</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredPhotos.map((photo) => (
          <motion.div 
            key={photo.id} 
            variants={itemVariants}
            whileHover={{ y: -5 }}
            onClick={() => handlePhotoClick(photo)}
            className="cursor-pointer"
          >
            <Card className="overflow-hidden h-full">
              <div className="aspect-[4/3] overflow-hidden relative group">
                <img 
                  src={photo.imageUrl} 
                  alt={photo.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white font-medium">{photo.contestName}</p>
                </div>
                
                <div className="absolute top-2 right-2">
                  <Badge className="bg-amber-500/90 text-white border-0 flex items-center gap-1 px-3">
                    <Trophy className="h-3 w-3" />
                    Ganadora
                  </Badge>
                </div>
              </div>
              
              <CardContent className="p-4">
                <div className="mb-3">
                  <h3 className="font-medium text-lg mb-1">{photo.title}</h3>
                  <p className="text-sm text-muted-foreground">{new Date(photo.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long' })}</p>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-7 w-7">
                      <AvatarImage src={photo.photographerAvatar} alt={photo.photographer} />
                      <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{photo.photographer}</span>
                  </div>
                  
                  <div className="flex items-center text-muted-foreground">
                    <Heart className="h-4 w-4 mr-1 fill-red-500 text-red-500" />
                    <span className="text-xs">{photo.likes}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
      
      <Dialog 
        open={selectedPhoto !== null} 
        onOpenChange={(open) => !open && setSelectedPhoto(null)}
      >
        <DialogContent className="sm:max-w-5xl max-h-[95vh] overflow-hidden p-0">
          <div className="flex h-[90vh]">
            {/* Left side - Photo */}
            <div className="flex-1 bg-black flex items-center justify-center relative">
              <DialogClose className="absolute top-4 right-4 z-10 rounded-full bg-black/60 p-2 text-white hover:bg-black/80">
                <X className="h-4 w-4" />
                <span className="sr-only">Cerrar</span>
              </DialogClose>
              
              {selectedPhoto && (
                <img 
                  src={selectedPhoto.imageUrl} 
                  alt={selectedPhoto.title}
                  className="max-w-full max-h-full object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3";
                  }}
                />
              )}
            </div>
            
            {/* Right side - Information and Comments */}
            <div className="w-80 bg-white flex flex-col border-l">
              {selectedPhoto && (
                <>
                  {/* Photo Info Header */}
                  <div className="p-4 border-b">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={selectedPhoto.photographerAvatar} alt={selectedPhoto.photographer} />
                          <AvatarFallback><User className="h-5 w-5" /></AvatarFallback>
                        </Avatar>
                        <div>
                          <ClickableUserProfile 
                            photographer={selectedPhoto.photographer}
                            photographerAvatar={selectedPhoto.photographerAvatar}
                            size="sm"
                            showAvatar={false}
                          />
                          <p className="text-xs text-muted-foreground">{selectedPhoto.likes} me gusta</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <h3 className="font-medium text-lg">{selectedPhoto.title}</h3>
                      <p className="text-sm text-muted-foreground">{selectedPhoto.contestName}</p>
                    </div>
                    
                    {/* Action buttons */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <SocialShareButtons 
                          url={`${window.location.origin}/gallery/${selectedPhoto.id}`}
                          title={`${selectedPhoto.title} - ${selectedPhoto.photographer}`}
                          imageUrl={selectedPhoto.imageUrl}
                        />
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleSharePhoto(selectedPhoto, 'instagram')}
                          className="p-2"
                        >
                          <Instagram className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <ReportPhotoDialog 
                        photoId={selectedPhoto.id}
                        trigger={
                          <Button variant="ghost" size="sm" className="text-red-500 hover:bg-red-50 p-2">
                            <Flag className="h-4 w-4" />
                          </Button>
                        }
                      />
                    </div>
                  </div>
                  
                  {/* Comments Section */}
                  <div className="flex-1 overflow-hidden">
                    <PhotoComments photoId={selectedPhoto.id} isEmbedded={true} />
                  </div>
                </>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GalleryPage;
