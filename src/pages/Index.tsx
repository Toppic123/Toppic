import { motion } from "framer-motion";
import { ArrowRight, Camera, Award, MapPin, Trophy, Landmark, Music } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ContestCard from "@/components/ContestCard";
import { useEffect, useState } from "react";

// Mock data for popular contests
const popularContests = [
  {
    id: "2",
    title: "Maratón de la Ciudad",
    imageUrl: "https://images.unsplash.com/photo-1530137073265-ac01e0a5ef2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2274&q=80",
    location: "Barcelona",
    dateStart: "2023-07-01",
    dateEnd: "2023-07-10",
    participantsCount: 78,
    photosCount: 215,
  },
  {
    id: "3",
    title: "Plaza Mayor - Monumentos Históricos",
    imageUrl: "https://images.unsplash.com/photo-1558370781-d6196949e317?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2274&q=80",
    location: "Salamanca",
    dateStart: "2023-07-15",
    dateEnd: "2023-07-20",
    participantsCount: 56,
    photosCount: 189,
  },
  {
    id: "4",
    title: "Festival Gastronómico",
    imageUrl: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2274&q=80",
    location: "Valencia",
    dateStart: "2023-08-01",
    dateEnd: "2023-08-10",
    participantsCount: 42,
    photosCount: 127,
  }
];

const Index = () => {
  const [language, setLanguage] = useState<"es" | "en">("es");

  useEffect(() => {
    // Detectar el idioma basado en la localización del navegador
    const userLanguage = navigator.language || navigator.languages[0];
    const isSpanish = /^es\b/.test(userLanguage) || 
                     ["ES", "MX", "AR", "CO", "PE", "CL", "EC", "GT", "CU", 
                      "BO", "DO", "HN", "PY", "SV", "NI", "CR", "PA", "UY", "VE"].includes(
                        userLanguage.split("-")[1]?.toUpperCase() || ""
                      );
    
    setLanguage(isSpanish ? "es" : "en");
  }, []);

  // Textos localizados
  const texts = {
    es: {
      discoverWorld: "Descubre el mundo a través de la fotografía",
      mainHeading: "Comparte lugares hermosos, gana concursos increíbles",
      subHeading: "Únete a una comunidad de fotógrafos compartiendo los lugares más impresionantes del mundo. Participa en concursos y obtén reconocimiento por tu talento.",
      explorePhotos: "Explorar fotos",
      uploadPhoto: "Sube tu foto",
      scrollToExplore: "Desplázate para explorar",
      featuredContest: "Concursos populares",
      seeAll: "Ver todos",
      eventTypes: "Fotografía cualquier tipo de evento",
      eventTypesDesc: "Desde eventos musicales y competiciones deportivas hasta monumentos históricos y plazas emblemáticas.",
      musicEvents: "Eventos Musicales",
      musicEventsDesc: "Conciertos, festivales y actuaciones en vivo",
      sportsEvents: "Eventos Deportivos",
      sportsEventsDesc: "Competiciones, carreras y torneos",
      touristPlaces: "Lugares Turísticos",
      touristPlacesDesc: "Monumentos, plazas y atracciones",
      thematicContests: "Concursos Temáticos",
      thematicContestsDesc: "Gastronomía, naturaleza y arte",
      nearbyContests: "Concursos cerca de ti",
      nearbyContestsDesc: "Explora el mapa para encontrar concursos en tu área y participar fácilmente.",
      howItWorks: "¿Cómo funciona?",
      participate: "1. Participa",
      participateDesc: "Regístrate y sube tus mejores fotos a los concursos activos cerca de tu ubicación.",
      vote: "2. Vota",
      voteDesc: "Explora las fotos de otros participantes y vota por tus favoritas utilizando nuestro sistema de votación.",
      win: "3. Gana",
      winDesc: "Los ganadores reciben recompensas especiales y reconocimiento por parte de los organizadores.",
      startNow: "Empieza ahora",
      organizerTitle: "¿Eres organizador?",
      organizerDesc: "Crea concursos fotográficos para tus eventos o promociona tu negocio con la mejor plataforma para concursos de fotografía geolocalizada.",
      discoverPlans: "Descubre nuestros planes",
      heroTitle: "Concursos fotográficos geolocalizados",
      heroSubtitle: "Participa, vota y gana en concursos de fotografía cerca de ti",
      heroDescription: "Descubre concursos fotográficos en cualquier parte del mundo. Sube tus mejores fotos y gana premios increíbles.",
      exploreContests: "Explorar concursos"
    },
    en: {
      discoverWorld: "Discover the world through photography",
      mainHeading: "Share beautiful places, win amazing contests",
      subHeading: "Join a community of photographers sharing the most breathtaking locations around the world. Participate in contests and get recognized for your talent.",
      explorePhotos: "Explore photos",
      uploadPhoto: "Upload your photo",
      scrollToExplore: "Scroll to explore",
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
      exploreContests: "Explore contests"
    }
  };

  const t = texts[language];

  return (
    <div className="pt-0">
      {/* Hero Section with landscape image background */}
      <section className="relative min-h-[100vh] overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 w-full h-full">
          <img 
            src="/lovable-uploads/102587e2-44d7-4fb5-a049-89e846d1154b.png" 
            alt="Landscape photography" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20" /> {/* Subtle overlay */}
        </div>
        
        <div className="relative z-20 container max-w-7xl mx-auto min-h-[100vh] flex flex-col items-start justify-center px-6 md:px-8">
          {/* Pill badge */}
          <div className="bg-white/80 backdrop-blur-sm text-black py-2 px-4 rounded-full inline-flex items-center mb-8">
            <span className="mr-2 text-blue-500">⊕</span>
            <span className="text-sm font-medium">{t.discoverWorld}</span>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-white leading-tight">
              {t.mainHeading}
            </h1>
            <p className="text-lg md:text-xl mb-10 max-w-2xl text-white/90">
              {t.subHeading}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white rounded-md px-8 py-6">
                <Link to="/contests">
                  <span>{t.explorePhotos}</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="bg-white/90 text-black hover:bg-white rounded-md px-8 py-6">
                <Link to="/upload">
                  <Camera className="mr-2 h-5 w-5" />
                  <span>{t.uploadPhoto}</span>
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/80 text-sm flex flex-col items-center">
            <span className="mb-2">{t.scrollToExplore}</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <ArrowRight className="h-5 w-5 transform rotate-90" />
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Featured Contest Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{t.featuredContest}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {language === "es" ? 
                "Descubre los concursos más populares en este momento y participa con tus mejores fotografías." : 
                "Discover the most popular contests right now and participate with your best photographs."}
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
                <span>{t.seeAll}</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Event Types Section */}
      <section className="py-16 px-4">
        <div className="container max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{t.eventTypes}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t.eventTypesDesc}
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
              <h3 className="font-bold text-lg mb-2">{t.musicEvents}</h3>
              <p className="text-muted-foreground text-sm">{t.musicEventsDesc}</p>
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
              <h3 className="font-bold text-lg mb-2">{t.sportsEvents}</h3>
              <p className="text-muted-foreground text-sm">{t.sportsEventsDesc}</p>
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
              <h3 className="font-bold text-lg mb-2">{t.touristPlaces}</h3>
              <p className="text-muted-foreground text-sm">{t.touristPlacesDesc}</p>
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
              <h3 className="font-bold text-lg mb-2">{t.thematicContests}</h3>
              <p className="text-muted-foreground text-sm">{t.thematicContestsDesc}</p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">{t.howItWorks}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true, amount: 0.3 }}
              className="glass-card p-6 rounded-xl"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Camera className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">{t.participate}</h3>
              <p className="text-muted-foreground">
                {t.participateDesc}
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true, amount: 0.3 }}
              className="glass-card p-6 rounded-xl"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">{t.vote}</h3>
              <p className="text-muted-foreground">
                {t.voteDesc}
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true, amount: 0.3 }}
              className="glass-card p-6 rounded-xl"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">{t.win}</h3>
              <p className="text-muted-foreground">
                {t.winDesc}
              </p>
            </motion.div>
          </div>
          
          <div className="text-center mt-12">
            <Button asChild size="lg" className="rounded-full px-8">
              <Link to="/register">
                <span>{t.startNow}</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Organizer Section */}
      <section className="py-16 px-4">
        <div className="container max-w-7xl mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">{t.organizerTitle}</h2>
            <p className="text-muted-foreground mb-8">
              {t.organizerDesc}
            </p>
            <Button asChild size="lg" className="rounded-full px-8">
              <Link to="/organizers">
                <span>{t.discoverPlans}</span>
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
