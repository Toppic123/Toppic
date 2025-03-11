
import { motion } from "framer-motion";
import { ArrowRight, Map as MapIcon, Camera, Award, Music, Trophy, Landmark } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import FeaturedContest from "@/components/FeaturedContest";
import ContestCard from "@/components/ContestCard";
import Map from "@/components/Map";

// Mock data for featured contest
const featuredContest = {
  id: "1",
  title: "Festival de Música Rock",
  description: "Captura los mejores momentos del festival más importante del año. Buscamos fotos que transmitan la energía, emoción y ambiente único de este evento musical.",
  imageUrl: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2532&q=80",
  location: "Madrid",
  dateStart: "2023-06-15",
  dateEnd: "2023-06-30",
  participantsCount: 124,
  photosCount: 348,
};

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
  return (
    <div className="pt-16">
      {/* Hero Section with Featured Contest */}
      <FeaturedContest {...featuredContest} />
      
      {/* Popular Contests Section */}
      <section className="py-16 px-4">
        <div className="container max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Concursos populares</h2>
              <p className="text-muted-foreground max-w-2xl">
                Descubre los concursos más populares en este momento y participa con tus mejores fotografías.
              </p>
            </div>
            <Button asChild variant="ghost" className="mt-4 md:mt-0">
              <Link to="/contests">
                <span>Ver todos</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularContests.map((contest) => (
              <ContestCard key={contest.id} {...contest} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Event Types Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Fotografía cualquier tipo de evento</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Desde eventos musicales y competiciones deportivas hasta monumentos históricos y plazas emblemáticas.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-card border rounded-xl p-6 text-center hover:shadow-md transition-all">
              <div className="w-12 h-12 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Music className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-bold text-lg mb-2">Eventos Musicales</h3>
              <p className="text-muted-foreground text-sm">Conciertos, festivales y actuaciones en vivo</p>
            </div>
            
            <div className="bg-card border rounded-xl p-6 text-center hover:shadow-md transition-all">
              <div className="w-12 h-12 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Trophy className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-bold text-lg mb-2">Eventos Deportivos</h3>
              <p className="text-muted-foreground text-sm">Competiciones, carreras y torneos</p>
            </div>
            
            <div className="bg-card border rounded-xl p-6 text-center hover:shadow-md transition-all">
              <div className="w-12 h-12 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Landmark className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-bold text-lg mb-2">Lugares Turísticos</h3>
              <p className="text-muted-foreground text-sm">Monumentos, plazas y atracciones</p>
            </div>
            
            <div className="bg-card border rounded-xl p-6 text-center hover:shadow-md transition-all">
              <div className="w-12 h-12 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Camera className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-bold text-lg mb-2">Concursos Temáticos</h3>
              <p className="text-muted-foreground text-sm">Gastronomía, naturaleza y arte</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Map Section */}
      <section className="py-16 px-4">
        <div className="container max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Concursos cerca de ti</h2>
              <p className="text-muted-foreground max-w-2xl">
                Explora el mapa para encontrar concursos en tu área y participar fácilmente.
              </p>
            </div>
          </div>
          
          <Map />
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-16 px-4">
        <div className="container max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">¿Cómo funciona?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true, amount: 0.3 }}
              className="bg-card p-6 rounded-xl border"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Camera className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">1. Participa</h3>
              <p className="text-muted-foreground">
                Regístrate y sube tus mejores fotos a los concursos activos cerca de tu ubicación.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true, amount: 0.3 }}
              className="bg-card p-6 rounded-xl border"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <MapIcon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">2. Vota</h3>
              <p className="text-muted-foreground">
                Explora las fotos de otros participantes y vota por tus favoritas utilizando nuestro sistema de votación.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true, amount: 0.3 }}
              className="bg-card p-6 rounded-xl border"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">3. Gana</h3>
              <p className="text-muted-foreground">
                Los ganadores reciben recompensas especiales y reconocimiento por parte de los organizadores.
              </p>
            </motion.div>
          </div>
          
          <div className="text-center mt-12">
            <Button asChild size="lg" className="rounded-full px-8">
              <Link to="/register">
                <span>Empieza ahora</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Organizer Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container max-w-7xl mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">¿Eres organizador o colaborador?</h2>
            <p className="text-muted-foreground mb-8">
              Crea concursos fotográficos para tus eventos o promociona tu negocio con la mejor plataforma para
              concursos de fotografía geolocalizada.
            </p>
            <Button asChild size="lg">
              <Link to="/organizers">
                <Building className="mr-2 h-5 w-5" />
                <span>Descubre nuestros planes</span>
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
