import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  MapPin, 
  Calendar, 
  Clock, 
  Users, 
  Camera, 
  Award, 
  Info, 
  Flag, 
  AlertTriangle,
  ArrowLeft,
  Upload,
  Share2,
  ImageIcon,
  Heart,
  Vote
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import PhotoCard from "@/components/PhotoCard";
import PhotoComments from "@/components/PhotoComments";
import { useToast } from "@/hooks/use-toast";
import SocialShareButtons from "@/components/SocialShareButtons";
import { useAuth } from "@/contexts/AuthContext";
import ContestAdBanner from "@/components/contests/ContestAdBanner";
import { useContestPhotos } from "@/hooks/useContestPhotos";

const contestData = {
  id: "1",
  title: "Festival de Fotografía Urbana",
  description: "Captura la esencia de la ciudad y sus habitantes en este concurso especializado en fotografía urbana. Buscamos miradas únicas que revelen la vida cotidiana desde perspectivas innovadoras.",
  imageUrl: "https://images.unsplash.com/photo-1514565131-fce0801e5785?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2532&q=80",
  location: "Barcelona",
  dateStart: "2023-06-15T10:00:00",
  dateEnd: "2023-06-30T20:00:00",
  participantsCount: 124,
  photosCount: 348,
  status: "active",
  maxVotes: 1,
  prizesDescription: "El ganador recibirá un kit de fotografía profesional valorado en 500€ y la oportunidad de exponer su trabajo en la galería central durante el festival.",
  rules: [
    "Las fotografías deben ser tomadas dentro del área del festival.",
    "Solo se permite una fotografía por participante.",
    "Las imágenes deben ser originales y tomadas durante el evento.",
    "No se permiten ediciones excesivas ni manipulaciones que alteren la realidad de la imagen.",
    "Al participar, aceptas que tu fotografía ganadora pueda ser utilizada por los organizadores con fines promocionales.",
    "No se aceptan imágenes creadas por inteligencia artificial.",
    "No se aceptan imágenes que no sean tomadas por el usuario que las suba.",
    "Las fotografías pueden ser tomadas con teléfonos móviles o cámaras fotográficas.",
    "Los organizadores indican en las bases si las fotos pueden haber sido editadas."
  ],
  organizer: {
    name: "Asociación Cultural Fotográfica",
    logo: "https://placehold.co/200x200"
  },
  reward: {
    forAll: true,
    description: "Todos los participantes recibirán un descuento del 15% en la tienda de fotografía oficial del festival."
  },
  voterReward: {
    enabled: true,
    description: "Un votante será seleccionado al azar para recibir una entrada VIP para el próximo festival."
  },
  votingSystem: {
    aiPreSelection: true,
    finalUserVoting: true,
    maxPhotos: 50
  },
  maxDistance: 1
};

const photosData = [
  {
    id: "p1",
    imageUrl: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    photographer: "María López",
    photographerAvatar: "https://randomuser.me/api/portraits/women/44.jpg",
    votes: 237
  },
  {
    id: "p2",
    imageUrl: "https://images.unsplash.com/photo-1517837025078-d0f7268421e0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    photographer: "Juan García",
    photographerAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
    votes: 185
  },
  {
    id: "p3",
    imageUrl: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    photographer: "Ana Rodríguez",
    photographerAvatar: "https://randomuser.me/api/portraits/women/68.jpg",
    votes: 156
  },
  {
    id: "p4",
    imageUrl: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2064&q=80",
    photographer: "Carlos Martínez",
    votes: 132
  },
  {
    id: "p5",
    imageUrl: "https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80",
    photographer: "Laura Sánchez",
    photographerAvatar: "https://randomuser.me/api/portraits/women/15.jpg",
    votes: 121
  },
  {
    id: "p6",
    imageUrl: "https://images.unsplash.com/photo-1520052205864-92d242b3a76b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
    photographer: "David Torres",
    photographerAvatar: "https://randomuser.me/api/portraits/men/54.jpg",
    votes: 98
  }
];

const ContestDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [contest, setContest] = useState(contestData);
  const { photos, isLoading: photosLoading, votePhoto } = useContestPhotos(id);
  const [activeTab, setActiveTab] = useState("photos");
  const [selectedPhoto, setSelectedPhoto] = useState<any>(null);
  const [viewPhotoMode, setViewPhotoMode] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number, lng: number } | null>(null);
  const [isInRange, setIsInRange] = useState(false);
  const [showOutOfRangeDialog, setShowOutOfRangeDialog] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();
  
  useEffect(() => {
    console.log(`Fetching contest with id: ${id}`);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userPos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setUserLocation(userPos);
          
          if (contest.location) {
            const contestCoords = { lat: 41.3851, lng: 2.1734 };
            const distance = calculateDistance(
              userPos.lat,
              userPos.lng,
              contestCoords.lat,
              contestCoords.lng
            );
            setIsInRange(distance <= contest.maxDistance);
          }
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    }
  }, [id, contest.location, contest.maxDistance]);
  
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371;
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1); 
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2); 
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    const d = R * c;
    return d;
  };
  
  const deg2rad = (deg: number) => {
    return deg * (Math.PI/180);
  };
  
  const getTimeRemaining = () => {
    const now = new Date();
    const end = new Date(contest.dateEnd);
    const diffMs = end.getTime() - now.getTime();
    
    if (diffMs <= 0) return "Concurso finalizado";
    
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (diffDays > 0) {
      return `${diffDays} ${diffDays === 1 ? 'día' : 'días'} y ${diffHours} ${diffHours === 1 ? 'hora' : 'horas'}`;
    } else {
      return `${diffHours} ${diffHours === 1 ? 'hora' : 'horas'}`;
    }
  };
  
  const handleReport = (photoId: string) => {
    toast({
      title: "Foto reportada",
      description: "Gracias por ayudar a mantener la comunidad segura",
    });
  };
  
  const handleShare = (photo: any) => {
    setSelectedPhoto(photo);
  };
  
  const handleViewPhoto = (photo: any, mode: string) => {
    setSelectedPhoto(photo);
    setViewPhotoMode(mode);
  };
  
  const openGoogleMaps = () => {
    const locationQuery = encodeURIComponent(contest.location);
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${locationQuery}`;
    window.open(googleMapsUrl, '_blank');
  };
  
  const handleParticipateClick = () => {
    if (!isInRange && contest.status === "active") {
      setShowOutOfRangeDialog(true);
    } else if (isInRange && contest.status === "active") {
      navigate(`/upload/${id}`);
    }
  };
  
  const handleVoteClick = () => {
    // Navigate to mobile prototype voting interface for this contest
    navigate('/mobile-prototype');
    
    toast({
      title: "Iniciando votación",
      description: "Te llevamos a la interfaz de votación comparativa",
    });
  };
  
  const handleVote = async (photoId: string) => {
    if (!user) {
      toast({
        title: "Inicia sesión para votar",
        description: "Necesitas una cuenta para votar por las fotografías.",
        variant: "destructive",
      });
      return;
    }
    
    await votePhoto(photoId);
  };
  
  return (
    <div className="pt-24 pb-16">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <Link
            to="/contests"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a concursos
          </Link>
          
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-3">
              <div className="relative aspect-[16/9] rounded-xl overflow-hidden mb-6">
                <img
                  src={contest.imageUrl}
                  alt={contest.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Añadir banner publicitario aquí */}
              <ContestAdBanner position="top" contestId={id} />
              
              <h1 className="text-3xl font-bold mb-4">{contest.title}</h1>
              
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center text-sm">
                  <MapPin className="w-4 h-4 mr-2 text-muted-foreground" />
                  <span>{contest.location}</span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="ml-1 p-1 h-auto"
                    onClick={openGoogleMaps}
                  >
                    <span className="text-xs underline">Ver en Google Maps</span>
                  </Button>
                </div>
                <div className="flex items-center text-sm">
                  <Calendar className="w-4 h-4 mr-2 text-muted-foreground" />
                  <span>
                    {new Date(contest.dateStart).toLocaleDateString('es-ES', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </span>
                </div>
                <div className="flex items-center text-sm">
                  <Clock className="w-4 h-4 mr-2 text-muted-foreground" />
                  <span>Termina en {getTimeRemaining()}</span>
                </div>
              </div>
              
              <p className="text-muted-foreground mb-8">
                {contest.description}
              </p>
              
              {isInRange && contest.status === "active" && (
                <Alert className="mb-6 bg-green-50 border-green-200">
                  <div className="flex items-center">
                    <Camera className="h-4 w-4 text-green-600 mr-2" />
                    <AlertDescription className="text-green-700">
                      ¡Estás dentro del rango permitido para participar en este concurso!
                    </AlertDescription>
                  </div>
                </Alert>
              )}
              
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="w-full justify-start mb-4">
                  <TabsTrigger value="photos">Fotografías</TabsTrigger>
                  <TabsTrigger value="info">Información</TabsTrigger>
                  <TabsTrigger value="rules">Reglas</TabsTrigger>
                </TabsList>
                
                <TabsContent value="photos">
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-xl font-bold">Fotografías participantes</h3>
                      <div className="flex gap-3">
                        <Button 
                          variant="outline"
                          onClick={handleVoteClick}
                          className="bg-purple-50 text-purple-600 border-purple-200 hover:bg-purple-100"
                        >
                          <Vote className="mr-2 h-4 w-4" />
                          Votar
                        </Button>
                        <Button 
                          asChild 
                          variant={isInRange && contest.status === "active" ? "default" : "outline"}
                          disabled={!isInRange || contest.status !== "active"}
                        >
                          <Link to={`/upload/${id}`}>
                            <Upload className="mr-2 h-4 w-4" />
                            Subir foto
                          </Link>
                        </Button>
                      </div>
                    </div>
                    
                    {photosLoading ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                        {[...Array(6)].map((_, i) => (
                          <div key={i} className="animate-pulse">
                            <div className="bg-gray-200 aspect-[3/4] rounded-xl mb-2"></div>
                            <div className="bg-gray-200 h-4 rounded mb-1"></div>
                            <div className="bg-gray-200 h-3 rounded w-2/3"></div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                        {photos.map((photo) => (
                          <div key={photo.id} className="relative group">
                            <div className="cursor-pointer" onClick={() => handleViewPhoto(photo, 'view')}>
                              <PhotoCard
                                id={photo.id}
                                imageUrl={photo.image_url}
                                photographer={photo.photographer_name}
                                photographerAvatar={photo.photographer_avatar}
                                onReport={handleReport}
                              />
                            </div>
                            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                              <div className="bg-black/70 text-white px-2 py-1 rounded text-sm">
                                {photo.votes} votos
                              </div>
                              <div className="flex gap-2">
                                <Button 
                                  variant="outline"
                                  size="sm"
                                  className="bg-white/80 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity"
                                  onClick={() => handleVote(photo.id)}
                                  disabled={!user}
                                >
                                  <Heart size={16} />
                                </Button>
                                <Button 
                                  variant="outline"
                                  size="sm"
                                  className="bg-white/80 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity"
                                  onClick={() => handleShare(photo)}
                                >
                                  <Share2 size={16} />
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="info">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-bold mb-2">Sobre el concurso</h3>
                      <p className="text-muted-foreground">{contest.description}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-bold mb-2">Premios</h3>
                      <div className="bg-muted/30 p-4 rounded-xl">
                        <div className="flex items-start space-x-4">
                          <Award className="w-6 h-6 text-amber-500 mt-1" />
                          <div>
                            <p>{contest.prizesDescription}</p>
                            
                            {contest.reward?.forAll && (
                              <div className="mt-2 text-sm text-muted-foreground border-t pt-2 border-dashed border-muted">
                                <p className="font-medium mb-1">Recompensa para todos los participantes:</p>
                                <p>{contest.reward.description}</p>
                              </div>
                            )}
                            
                            {contest.voterReward?.enabled && (
                              <div className="mt-2 text-sm text-muted-foreground border-t pt-2 border-dashed border-muted">
                                <p className="font-medium mb-1">Recompensa para votantes:</p>
                                <p>{contest.voterReward.description}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-bold mb-2">Sistema de votación</h3>
                      <div className="bg-muted/30 p-4 rounded-xl space-y-2">
                        <div className="flex items-start gap-3">
                          <div className="bg-primary/10 text-primary rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                            1
                          </div>
                          <div>
                            <p className="font-medium">Fase de preselección con IA</p>
                            <p className="text-sm text-muted-foreground">
                              La inteligencia artificial filtra las fotos para seleccionar las mejores {contest.votingSystem.maxPhotos} basándose en calidad y composición.
                            </p>
                          </div>
                        </div>
                        
                        {contest.votingSystem.finalUserVoting && (
                          <div className="flex items-start gap-3">
                            <div className="bg-primary/10 text-primary rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                              2
                            </div>
                            <div>
                              <p className="font-medium">Sistema de votación por comparación</p>
                              <p className="text-sm text-muted-foreground">
                                Los usuarios comparan pares de fotografías y seleccionan la que consideran mejor. Este método permite una evaluación más objetiva, ya que cada foto se evalúa múltiples veces en diferentes combinaciones.
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-bold mb-2">Organizador</h3>
                      <div className="flex items-center space-x-4">
                        <img
                          src={contest.organizer.logo}
                          alt={contest.organizer.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                          <p className="font-medium">{contest.organizer.name}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="rules">
                  <div>
                    <h3 className="text-xl font-bold mb-4">Reglas del concurso</h3>
                    
                    <Alert className="mb-6">
                      <Info className="h-4 w-4" />
                      <AlertDescription>
                        Al participar en este concurso, aceptas las siguientes reglas y condiciones.
                      </AlertDescription>
                    </Alert>
                    
                    <ul className="space-y-4">
                      {contest.rules.map((rule, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-sm flex-shrink-0">
                            {index + 1}
                          </span>
                          <span>{rule}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Separator className="my-6" />
                    
                    <div>
                      <h4 className="font-bold mb-2">Reportar contenido inapropiado</h4>
                      <p className="text-sm text-muted-foreground mb-4">
                        Si encuentras fotografías inapropiadas o que no cumplen con las reglas, por favor repórtalas.
                      </p>
                      <Button variant="outline" size="sm">
                        <Flag className="mr-2 h-4 w-4" />
                        Reportar problema
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            
            <div className="lg:col-span-2">
              <div className="bg-card rounded-xl border shadow-sm p-6 sticky top-24">
                {/* Añadir banner publicitario en la barra lateral */}
                <ContestAdBanner position="sidebar" contestId={id} />
                
                <h3 className="text-xl font-bold mb-4">Resumen del concurso</h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Estado</span>
                    <span className="font-medium">
                      {contest.status === "active" && "Activo"}
                      {contest.status === "voting" && "En votación"}
                      {contest.status === "finished" && "Finalizado"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Participantes</span>
                    <span className="font-medium">{contest.participantsCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Fotografías</span>
                    <span className="font-medium">{contest.photosCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Votos por usuario</span>
                    <span className="font-medium">{contest.maxVotes}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Fecha inicio</span>
                    <span className="font-medium">
                      {new Date(contest.dateStart).toLocaleDateString('es-ES')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Fecha fin</span>
                    <span className="font-medium">
                      {new Date(contest.dateEnd).toLocaleDateString('es-ES')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Fin votaciones</span>
                    <span className="font-medium">
                      {new Date(contest.dateEnd).toLocaleDateString('es-ES')}
                    </span>
                  </div>
                  
                  {contest.votingSystem && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Fotos preseleccionadas</span>
                      <span className="font-medium">{contest.votingSystem.maxPhotos}</span>
                    </div>
                  )}
                </div>
                
                <Alert className="mb-6">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    Las fotografías deben tomarse dentro de un radio de {contest.maxDistance}km del evento.
                  </AlertDescription>
                </Alert>
                
                <div className="space-y-4">
                  <Button 
                    className="w-full"
                    onClick={handleParticipateClick}
                    disabled={contest.status !== "active"}
                  >
                    <Camera className="mr-2 h-4 w-4" />
                    {contest.status !== "active" 
                      ? "Concurso finalizado" 
                      : "Participar"
                    }
                  </Button>
                  
                  <Button 
                    variant="outline"
                    className="w-full bg-purple-50 text-purple-600 border-purple-200 hover:bg-purple-100"
                    onClick={handleVoteClick}
                  >
                    <Vote className="mr-2 h-4 w-4" />
                    Votar fotografías
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Share Dialog */}
      <Dialog open={!!selectedPhoto && !viewPhotoMode} onOpenChange={(open) => !open && setSelectedPhoto(null)}>
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
              
              <SocialShareButtons 
                url={window.location.href} 
                title={`Mira esta increíble foto de ${selectedPhoto.photographer} en el concurso "${contest.title}"!`}
                imageUrl={selectedPhoto.imageUrl}
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
      
      {/* Out of Range Dialog */}
      <Dialog open={showOutOfRangeDialog} onOpenChange={setShowOutOfRangeDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Fuera de rango permitido</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p>
              No puedes participar en este concurso porque te encuentras fuera del rango permitido.
            </p>
            <p>
              Este concurso requiere que estés dentro de un radio de {contest.maxDistance} km del lugar del evento.
            </p>
            <p className="text-sm text-muted-foreground">
              Las coordenadas geográficas son necesarias para verificar tu ubicación y asegurar que las fotografías se tomen en el lugar del evento.
            </p>
            <Button 
              onClick={() => setShowOutOfRangeDialog(false)} 
              className="w-full"
            >
              Entendido
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* View Photo Dialog */}
      <Dialog open={!!selectedPhoto && viewPhotoMode === 'view'} onOpenChange={(open) => {
        if (!open) {
          setSelectedPhoto(null);
          setViewPhotoMode(null);
        }
      }}>
        <DialogContent className="sm:max-w-3xl h-[80vh] max-h-[800px] flex flex-col p-0 gap-0">
          <DialogHeader className="px-4 py-2 border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={selectedPhoto?.photographerAvatar} alt={selectedPhoto?.photographer} />
                  <AvatarFallback>
                    <ImageIcon className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <DialogTitle className="text-base">Foto de {selectedPhoto?.photographer}</DialogTitle>
              </div>
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => handleShare(selectedPhoto)}
                >
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </DialogHeader>
          
          <div className="flex-1 overflow-hidden grid grid-cols-1 md:grid-cols-5 h-full">
            <div className="col-span-3 bg-black flex items-center justify-center overflow-hidden">
              <img 
                src={selectedPhoto?.imageUrl} 
                alt={`Foto de ${selectedPhoto?.photographer}`}
                className="max-w-full max-h-full object-contain"
              />
            </div>
            
            <div className="col-span-2 flex flex-col border-l">
              <PhotoComments photoId={selectedPhoto?.id} isEmbedded={true} />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ContestDetail;
