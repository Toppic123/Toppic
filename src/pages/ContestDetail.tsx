import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
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
  Heart
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
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import PhotoCard from "@/components/PhotoCard";
import PhotoComments from "@/components/PhotoComments";
import { useToast } from "@/hooks/use-toast";

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
  }
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
  const [contest, setContest] = useState(contestData);
  const [photos, setPhotos] = useState(photosData);
  const [activeTab, setActiveTab] = useState("photos");
  const [votedPhotoId, setVotedPhotoId] = useState<string | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<any>(null);
  const [viewPhotoMode, setViewPhotoMode] = useState<string | null>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    console.log(`Fetching contest with id: ${id}`);
  }, [id]);
  
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
  
  const handleVote = (photoId: string, isUpvote: boolean) => {
    if (votedPhotoId) {
      if (votedPhotoId !== photoId) {
        setPhotos(prevPhotos => 
          prevPhotos.map(photo => 
            photo.id === votedPhotoId
              ? { ...photo, votes: photo.votes - 1 }
              : photo
          )
        );
        
        toast({
          title: "Voto cambiado",
          description: "Tu voto anterior ha sido eliminado",
        });
      } else {
        return;
      }
    }
    
    if (votedPhotoId !== photoId) {
      if (isUpvote) {
        setPhotos(prevPhotos => 
          prevPhotos.map(photo => 
            photo.id === photoId
              ? { ...photo, votes: photo.votes + 1 }
              : photo
          )
        );
        
        setVotedPhotoId(photoId);
        
        toast({
          title: "Voto registrado",
          description: "Has votado a favor de esta foto",
        });
      }
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
  
  const shareToSocialMedia = (platform: string) => {
    if (!selectedPhoto) return;
    
    let shareUrl = "";
    const contestUrl = `${window.location.origin}/contests/${id}`;
    const message = `¡Mira esta increíble foto de ${selectedPhoto.photographer} en el concurso "${contest.title}"!`;
    
    switch(platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(contestUrl)}&quote=${encodeURIComponent(message)}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(contestUrl)}&text=${encodeURIComponent(message)}`;
        break;
      case "whatsapp":
        shareUrl = `https://wa.me/?text=${encodeURIComponent(message + " " + contestUrl)}`;
        break;
      case "instagram":
        shareUrl = `https://www.instagram.com/create/story?url=${encodeURIComponent(contestUrl)}`;
        break;
    }
    
    window.open(shareUrl, "_blank");
    
    toast({
      title: "Compartido con éxito",
      description: `Has compartido esta foto en ${platform}`,
    });
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
              
              <h1 className="text-3xl font-bold mb-4">{contest.title}</h1>
              
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center text-sm">
                  <MapPin className="w-4 h-4 mr-2 text-muted-foreground" />
                  <span>{contest.location}</span>
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
                      <Button asChild variant="outline">
                        <Link to={`/upload/${id}`}>
                          <Upload className="mr-2 h-4 w-4" />
                          Subir foto
                        </Link>
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                      {photos.map((photo) => (
                        <div key={photo.id} className="relative group">
                          <div className="cursor-pointer" onClick={() => handleViewPhoto(photo, 'view')}>
                            <PhotoCard
                              {...photo}
                              onVote={handleVote}
                              onReport={handleReport}
                              userVoted={votedPhotoId === photo.id}
                            />
                          </div>
                          <Button 
                            variant="outline"
                            size="sm"
                            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 hover:bg-white"
                            onClick={() => handleShare(photo)}
                          >
                            <Share2 size={16} />
                          </Button>
                        </div>
                      ))}
                    </div>
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
                              <p className="font-medium">Fase de votación por comparación</p>
                              <p className="text-sm text-muted-foreground">
                                Las fotos se comparan entre sí para determinar las mejores, mediante un sistema de votación por comparación directa.
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
                    Las fotografías deben tomarse dentro de un radio de 1km del evento.
                  </AlertDescription>
                </Alert>
                
                <div className="space-y-4">
                  <Button asChild className="w-full">
                    <Link to={`/upload/${id}`}>
                      <Camera className="mr-2 h-4 w-4" />
                      Participar
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
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
              
              <div className="grid grid-cols-2 gap-4">
                <Button 
                  variant="outline" 
                  className="flex justify-center items-center gap-2" 
                  onClick={() => shareToSocialMedia("facebook")}
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current text-blue-600">
                    <path d="M9.19795 21.5H13.198V13.4901H16.8021L17.198 9.50977H13.198V7.5C13.198 6.94772 13.6457 6.5 14.198 6.5H17.198V2.5H14.198C11.4365 2.5 9.19795 4.73858 9.19795 7.5V9.50977H7.19795L6.80206 13.4901H9.19795V21.5Z"></path>
                  </svg>
                  Facebook
                </Button>
                <Button 
                  variant="outline" 
                  className="flex justify-center items-center gap-2"
                  onClick={() => shareToSocialMedia("twitter")}
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current text-blue-400">
                    <path d="M22.162 5.65593C21.3986 5.99362 20.589 6.2154 19.76 6.31393C20.6337 5.79136 21.2877 4.96894 21.6 3.99993C20.78 4.48793 19.881 4.82993 18.944 5.01493C18.3146 4.34151 17.4804 3.89489 16.5709 3.74451C15.6615 3.59413 14.7279 3.74842 13.9153 4.18338C13.1026 4.61834 12.4564 5.30961 12.0771 6.14972C11.6978 6.98983 11.6067 7.93171 11.818 8.82893C10.1551 8.74558 8.52883 8.31345 7.04329 7.56059C5.55774 6.80773 4.24791 5.75097 3.19799 4.45893C2.82628 5.09738 2.63095 5.82315 2.63199 6.56193C2.63199 8.01193 3.36999 9.29293 4.49199 10.0429C3.828 10.022 3.17862 9.84271 2.59799 9.51993V9.57193C2.59819 10.5376 2.93236 11.4735 3.54384 12.221C4.15532 12.9684 5.00647 13.4814 5.95299 13.6729C5.33661 13.84 4.6903 13.8646 4.06299 13.7449C4.32986 14.5762 4.85 15.3031 5.55058 15.824C6.25117 16.345 7.09712 16.6337 7.96999 16.6499C7.10247 17.3313 6.10917 17.8349 5.04687 18.1321C3.98458 18.4293 2.87412 18.5142 1.77899 18.3819C3.69069 19.6114 5.91609 20.2641 8.18899 20.2619C15.882 20.2619 20.089 13.8889 20.089 8.36193C20.089 8.18193 20.084 7.99993 20.076 7.82193C20.8949 7.23009 21.6016 6.49695 22.163 5.65693L22.162 5.65593Z"></path>
                  </svg>
                  Twitter
                </Button>
                <Button 
                  variant="outline" 
                  className="flex justify-center items-center gap-2"
                  onClick={() => shareToSocialMedia("whatsapp")}
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current text-green-500">
                    <path d="M17.507 14.307L20.308 17.108L17.507 14.307ZM3.7 22.3L6.45 21.9C7.71139 22.4172 9.0747 22.6879 10.459 22.7L10.959 22.7C17.929 22.7 21.659 16.707 21.659 10.207C21.659 7.16997 20.509 5.01997 18.507 3.01797C16.507 1.01997 14.357 -0.100029 11.307 -3.05176e-05C4.32997 -3.05176e-05 0.657975 5.99997 0.657975 12.5C0.657975 14.092 0.947975 15.625 1.50698 17.05L2.00698 18.35L0.957975 20.95L3.7 22.3Z"></path>
                    <path d="M11.55 6C11.302 6 11.108 6.193 11.109 6.442C11.109 6.69 11.303 6.883 11.551 6.883C12.486 6.886 13.389 7.256 14.06 7.926C14.733 8.596 15.103 9.496 15.106 10.428C15.106 10.676 15.3 10.869 15.548 10.869C15.796 10.869 15.989 10.676 15.989 10.428C15.989 9.494 15.615 8.591 14.945 7.92C14.273 7.247 13.371 6.878 12.439 6.878C12.206 6.878 12.02 6.752 11.989 6.567C11.987 6.553 11.986 6.539 11.986 6.526C11.984 6.241 11.746 6 11.46 6H11.55Z"></path>
                  </svg>
                  WhatsApp
                </Button>
                <Button 
                  variant="outline" 
                  className="flex justify-center items-center gap-2"
                  onClick={() => shareToSocialMedia("instagram")}
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current text-pink-600">
                    <path d="M12 2C14.717 2 15.056 2.01 16.122 2.06C17.187 2.11 17.912 2.277 18.55 2.525C19.21 2.779 19.766 3.123 20.322 3.678C20.8305 4.1779 21.224 4.78259 21.475 5.45C21.722 6.087 21.89 6.813 21.94 7.878C21.987 8.944 22 9.283 22 12C22 14.717 21.99 15.056 21.94 16.122C21.89 17.187 21.722 17.912 21.475 18.55C21.2247 19.2178 20.8311 19.8226 20.322 20.322C19.822 20.8303 19.2173 21.2238 18.55 21.475C17.913 21.722 17.187 21.89 16.122 21.94C15.056 21.987 14.717 22 12 22C9.283 22 8.944 21.99 7.878 21.94C6.813 21.89 6.088 21.722 5.45 21.475C4.78233 21.2245 4.17753 20.8309 3.678 20.322C3.16941 19.8222 2.77593 19.2175 2.525 18.55C2.277 17.913 2.11 17.187 2.06 16.122C2.013 15.056 2 14.717 2 12C2 9.283 2.01 8.944 2.06 7.878C2.11 6.812 2.277 6.088 2.525 5.45C2.77524 4.78218 3.1688 4.17732 3.678 3.678C4.17767 3.16923 4.78243 2.77573 5.45 2.525C6.088 2.277 6.812 2.11 7.878 2.06C8.944 2.013 9.283 2 12 2ZM12 7C10.6739 7 9.40215 7.52678 8.46447 8.46447C7.52678 9.40215 7 10.6739 7 12C7 13.3261 7.52678 14.5979 8.46447 15.5355C9.40215 16.4732 10.6739 17 12 17C13.3261 17 14.5979 16.4732 15.5355 15.5355C16.4732 14.5979 17 13.3261 17 12C17 10.6739 16.4732 9.40215 15.5355 8.46447C14.5979 7.52678 13.3261 7 12 7ZM18.5 6.75C18.5 6.41848 18.3683 6.10054 18.1339 5.86612C17.8995 5.6317 17.5815 5.5 17.25 5.5C16.9185 5.5 16.6005 5.6317 16.3661 5.86612C16.1317 6.10054 16 6.41848 16 6.75C16 7.08152 16.1317 7.39946 16.3661 7.63388C16.6005 7.8683 16.9185 8 17.25 8C17.5815 8 17.8995 7.8683 18.1339 7.63388C18.3683 7.39946 18.5 7.08152 18.5 6.75ZM12 9C12.7956 9 13.5587 9.31607 14.1213 9.87868C14.6839 10.4413 15 11.2044 15 12C15 12.7956 14.6839 13.5587 14.1213 14.1213C13.5587 14.6839 12.7956 15 12 15C11.2044 15 10.4413 14.6839 9.87868 14.1213C9.31607 13.5587 9 12.7956 9 12C9 11.2044 9.31607 10.4413 9.87868 9.87868C10.4413 9.31607 11.2044 9 12 9Z"></path>
                  </svg>
                  Instagram
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ContestDetail;
