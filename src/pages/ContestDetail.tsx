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
  Upload
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import PhotoCard from "@/components/PhotoCard";
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
  prizesDescription: "El ganador recibirá un kit de fotografía profesional valorado en 500€ y la oportunidad de exponer su trabajo en la galería central durante el festival.",
  rules: [
    "Las fotografías deben ser tomadas dentro del área del festival.",
    "Solo se permite una fotografía por participante.",
    "Las imágenes deben ser originales y tomadas durante el evento.",
    "No se permiten ediciones excesivas ni manipulaciones que alteren la realidad de la imagen.",
    "Al participar, aceptas que tu fotografía ganadora pueda ser utilizada por los organizadores con fines promocionales."
  ],
  organizer: {
    name: "Asociación Cultural Fotográfica",
    logo: "https://placehold.co/200x200"
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
                        <PhotoCard
                          key={photo.id}
                          {...photo}
                          onVote={handleVote}
                          onReport={handleReport}
                          userVoted={votedPhotoId === photo.id}
                        />
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
                          </div>
                        </div>
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
    </div>
  );
};

export default ContestDetail;

