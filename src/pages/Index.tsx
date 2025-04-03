import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Camera, Award, MapPin, Trophy, Landmark, Music, Heart, X, Share2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ContestCard from "@/components/ContestCard";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import PhotoComments from "@/components/PhotoComments";

const heroImages = [
  {
    url: "https://images.unsplash.com/photo-1477322524744-0eece9e79640?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2400&q=80",
    category: "landscapes"
  },
  {
    url: "https://images.unsplash.com/photo-1431274172761-fca41d930114?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2400&q=80",
    category: "monuments"
  },
  {
    url: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2400&q=80",
    category: "music events"
  },
  {
    url: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2400&q=80",
    category: "sport events"
  },
  {
    url: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2400&q=80",
    category: "weddings"
  }
];

const popularContests = [
  {
    id: "2",
    title: "City Marathon",
    imageUrl: "https://images.unsplash.com/photo-1530137073265-ac01e0a5ef2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2274&q=80",
    location: "Barcelona",
    dateStart: "2023-07-01",
    dateEnd: "2023-07-10",
    participantsCount: 78,
    photosCount: 215,
  },
  {
    id: "3",
    title: "Plaza Mayor - Historical Monuments",
    imageUrl: "https://images.unsplash.com/photo-1558370781-d6196949e317?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2274&q=80",
    location: "Salamanca",
    dateStart: "2023-07-15",
    dateEnd: "2023-07-20",
    participantsCount: 56,
    photosCount: 189,
  },
  {
    id: "4",
    title: "Gastronomic Festival",
    imageUrl: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2274&q=80",
    location: "Valencia",
    dateStart: "2023-08-01",
    dateEnd: "2023-08-10",
    participantsCount: 42,
    photosCount: 127,
  }
];

const winningPhotos = [
  {
    id: 1,
    imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    title: "Valley of Dawn",
    photographer: "Carlos Montoya",
    photographerAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
    likes: 542
  },
  {
    id: 2,
    imageUrl: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    title: "Urban Reflections",
    photographer: "Maria Sanchez",
    photographerAvatar: "https://randomuser.me/api/portraits/women/44.jpg",
    likes: 478
  },
  {
    id: 3,
    imageUrl: "https://images.unsplash.com/photo-1576377999785-cf30a129e0da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    title: "Human Connection",
    photographer: "Javier Rodriguez",
    photographerAvatar: "https://randomuser.me/api/portraits/men/67.jpg",
    likes: 396
  },
  {
    id: 4,
    imageUrl: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    title: "Park Concert",
    photographer: "Ana Martin",
    photographerAvatar: "https://randomuser.me/api/portraits/women/68.jpg",
    likes: 412
  },
  {
    id: 5,
    imageUrl: "https://images.unsplash.com/photo-1549576490-b0b4831ef60a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    title: "Curious Cat",
    photographer: "Elena Torres",
    photographerAvatar: "https://randomuser.me/api/portraits/women/54.jpg",
    likes: 521
  },
  {
    id: 6,
    imageUrl: "https://images.unsplash.com/photo-1533105079780-92b9be482077?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2787&q=80",
    title: "Modern Architecture",
    photographer: "David Garcia",
    photographerAvatar: "https://randomuser.me/api/portraits/men/22.jpg",
    likes: 387
  },
  {
    id: 7,
    imageUrl: "https://images.unsplash.com/photo-1494783367193-149034c05e8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    title: "Secret Waterfall",
    photographer: "Laura Ruiz",
    photographerAvatar: "https://randomuser.me/api/portraits/women/15.jpg",
    likes: 489
  },
  {
    id: 8,
    imageUrl: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
    title: "Cultural Celebration",
    photographer: "Miguel Fernandez",
    photographerAvatar: "https://randomuser.me/api/portraits/men/34.jpg",
    likes: 356
  },
  {
    id: 9,
    imageUrl: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    title: "Mountain Sunrise",
    photographer: "Pablo Jimenez",
    photographerAvatar: "https://randomuser.me/api/portraits/men/45.jpg",
    likes: 412
  }
];

const Index = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedPhoto, setSelectedPhoto] = useState<any | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSharePhoto = (photo: any) => {
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

  const texts = {
    featuredContest: "Popular Contests",
    seeAll: "See all",
    eventTypes: "Photograph any type of event",
    eventTypesDesc: "From music events and sports competitions to historical monuments and emblematic squares.",
    musicEvents: "Music Events",
    musicEventsDesc: "Concerts, festivals and live performances",
    sportsEvents: "Sports Events",
    sportsEventsDesc: "Competitions, races and tournaments",
    touristPlaces: "Tourist Places",
    touristPlacesDesc: "Monuments, squares and attractions",
    thematicContests: "Thematic Contests",
    thematicContestsDesc: "Gastronomy, nature and art",
    nearbyContests: "Contests near you",
    nearbyContestsDesc: "Explore the map to find contests in your area and easily participate.",
    howItWorks: "How it works?",
    participate: "1. Participate",
    participateDesc: "Register and upload your best photos to active contests near your location.",
    vote: "2. Vote",
    voteDesc: "Explore photos from other participants and vote for your favorites using our voting system.",
    win: "3. Win",
    winDesc: "Winners receive special rewards and recognition from organizers.",
    startNow: "Start now",
    organizerTitle: "Are you an organizer?",
    organizerDesc: "Create photo contests for your events or promote your business with the best platform for geolocated photo contests.",
    discoverPlans: "Discover our plans",
    heroTitle: "Geolocated Photo Contests",
    heroSubtitle: "Participate, vote and win in photo contests near you",
    heroDescription: "Discover photo contests anywhere in the world. Upload your best photos and win amazing prizes.",
    exploreContests: "Explore contests",
    winningGallery: "Winning Photos Gallery",
    winningGalleryDesc: "Explore the best photos from our contests - a showcase of the finest photography talent.",
    viewGallery: "View Full Gallery"
  };

  return (
    <div className="pt-0">
      <section className="relative min-h-[90vh] overflow-hidden">
        <div className="absolute inset-0 z-0">
          {heroImages.map((image, index) => (
            <div 
              key={image.category}
              className={cn(
                "absolute inset-0 transition-opacity duration-1000",
                activeIndex === index ? "opacity-100" : "opacity-0"
              )}
            >
              <img 
                src={image.url} 
                alt={`Photography ${image.category}`}
                className="absolute w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50" />
            </div>
          ))}
        </div>
        
        <div className="relative z-10 container max-w-7xl mx-auto h-[90vh] flex items-center px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">{texts.heroTitle}</h1>
            <p className="text-xl md:text-2xl mb-6 text-white/90">{texts.heroSubtitle}</p>
            <p className="text-lg mb-8 max-w-xl text-white/80">{texts.heroDescription}</p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="rounded-full px-8 bg-white text-primary hover:bg-white/90">
                <Link to="/contests">
                  <Camera className="mr-2 h-5 w-5" />
                  <span>{texts.exploreContests}</span>
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full px-8 bg-primary/80 border-white text-white hover:bg-primary/90 hover:border-white">
                <Link to="/register">
                  <span>{texts.startNow}</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
      
      <section className="py-16 px-4 bg-white">
        <div className="container max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{texts.featuredContest}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover the most popular contests right now and participate with your best photographs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularContests.map((contest) => (
              <ContestCard key={contest.id} {...contest} />
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Button asChild variant="outline" className="rounded-full px-8">
              <Link to="/contests">
                <span>{texts.seeAll}</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      <section className="py-16 px-4 bg-gray-200">
        <div className="container max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{texts.eventTypes}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {texts.eventTypesDesc}
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="glass-card rounded-xl p-6 text-center hover:shadow-elevated transition-all duration-300"
            >
              <div className="w-12 h-12 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Music className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-bold text-lg mb-2">{texts.musicEvents}</h3>
              <p className="text-muted-foreground text-sm">{texts.musicEventsDesc}</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="glass-card rounded-xl p-6 text-center hover:shadow-elevated transition-all duration-300"
            >
              <div className="w-12 h-12 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Trophy className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-bold text-lg mb-2">{texts.sportsEvents}</h3>
              <p className="text-muted-foreground text-sm">{texts.sportsEventsDesc}</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="glass-card rounded-xl p-6 text-center hover:shadow-elevated transition-all duration-300"
            >
              <div className="w-12 h-12 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Landmark className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-bold text-lg mb-2">{texts.touristPlaces}</h3>
              <p className="text-muted-foreground text-sm">{texts.touristPlacesDesc}</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="glass-card rounded-xl p-6 text-center hover:shadow-elevated transition-all duration-300"
            >
              <div className="w-12 h-12 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Camera className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-bold text-lg mb-2">{texts.thematicContests}</h3>
              <p className="text-muted-foreground text-sm">{texts.thematicContestsDesc}</p>
            </motion.div>
          </div>
        </div>
      </section>
      
      <section className="py-16 px-4 bg-white">
        <div className="container max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">{texts.winningGallery}</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              {texts.winningGalleryDesc}
            </p>
          </div>
          
          <div className="grid grid-cols-3 gap-1 md:gap-1.5 mb-6">
            {winningPhotos.slice(0, 9).map((photo) => (
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
      
      <section className="py-16 px-4 bg-gray-200">
        <div className="container max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">{texts.howItWorks}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true, amount: 0.3 }}
              className="glass-card p-6 rounded-xl bg-white shadow-sm"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Camera className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">{texts.participate}</h3>
              <p className="text-muted-foreground">
                {texts.participateDesc}
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true, amount: 0.3 }}
              className="glass-card p-6 rounded-xl bg-white shadow-sm"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">{texts.vote}</h3>
              <p className="text-muted-foreground">
                {texts.voteDesc}
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true, amount: 0.3 }}
              className="glass-card p-6 rounded-xl bg-white shadow-sm"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">{texts.win}</h3>
              <p className="text-muted-foreground">
                {texts.winDesc}
              </p>
            </motion.div>
          </div>
          
          <div className="text-center mt-10 space-y-4">
            <Button asChild size="lg" className="rounded-full px-8">
              <Link to="/register">
                <span>{texts.startNow}</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            
            <div>
              <Button asChild variant="outline" className="rounded-full px-8">
                <Link to="/voting-system">
                  <span>Learn about our Voting System</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 px-4 bg-white">
        <div className="container max-w-7xl mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">{texts.organizerTitle}</h2>
            <p className="text-muted-foreground mb-8">
              {texts.organizerDesc}
            </p>
            <Button asChild size="lg" className="rounded-full px-8">
              <Link to="/organizers">
                <span>{texts.discoverPlans}</span>
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
