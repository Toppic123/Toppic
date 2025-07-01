
import { useParams, Navigate, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Trophy, Users, Camera, ArrowLeft, Upload } from "lucide-react";
import { useContestsData } from "@/hooks/useContestsData";
import { useContestPhotos } from "@/hooks/useContestPhotos";
import PhotoCard from "@/components/PhotoCard";
import { useAuth } from "@/contexts/AuthContext";

const ContestDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { contests, isLoading } = useContestsData();
  const { user } = useAuth();
  
  // Fetch real photos from the database and use voting functionality
  const { approvedPhotos, isLoading: photosLoading, votePhoto } = useContestPhotos(id);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Cargando concurso...</p>
        </div>
      </div>
    );
  }

  const contest = contests.find(c => c.id === id);

  if (!contest) {
    return <Navigate to="/contests" replace />;
  }

  const handleUploadPhoto = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    // Navigate to upload page with contest context
    navigate("/upload", { state: { contestId: id, contestTitle: contest.title } });
  };

  const handleVotePhoto = async (photoId: string, isUpvote: boolean) => {
    if (!user) {
      navigate("/login");
      return;
    }
    await votePhoto(photoId);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gray-50"
    >
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <Button
            variant="ghost"
            onClick={() => navigate("/contests")}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver a concursos
          </Button>
        </div>
      </div>

      {/* Contest Hero */}
      <div className="relative h-80 md:h-96 overflow-hidden">
        <img
          src={contest.imageUrl}
          alt={contest.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="container mx-auto">
            <Badge className="mb-2" variant={contest.isActive ? "default" : "secondary"}>
              {contest.isActive ? "Activo" : "Finalizado"}
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{contest.title}</h1>
          </div>
        </div>
      </div>

      {/* Contest Info */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Contest Stats - Using REAL photos count */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Información del concurso</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                  <Users className="h-8 w-8 text-primary mx-auto mb-2" />
                  <p className="text-2xl font-bold">{contest.participants}</p>
                  <p className="text-sm text-muted-foreground">Participantes</p>
                </div>
                <div className="text-center">
                  <Camera className="h-8 w-8 text-primary mx-auto mb-2" />
                  <p className="text-2xl font-bold">{approvedPhotos.length}</p>
                  <p className="text-sm text-muted-foreground">Fotos</p>
                </div>
                <div className="text-center">
                  <Calendar className="h-8 w-8 text-primary mx-auto mb-2" />
                  <p className="text-2xl font-bold">
                    {Math.ceil((new Date(contest.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))}
                  </p>
                  <p className="text-sm text-muted-foreground">Días restantes</p>
                </div>
              </div>
              
              {/* Contest Description */}
              {contest.description && (
                <div className="border-t pt-4">
                  <h3 className="font-semibold mb-2">Descripción</h3>
                  <p className="text-muted-foreground">{contest.description}</p>
                </div>
              )}
            </div>

            {/* Photo Gallery - Using REAL photos from database */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Fotos del concurso</h2>
                <Button onClick={handleUploadPhoto} className="flex items-center gap-2">
                  <Upload className="h-4 w-4" />
                  Subir foto
                </Button>
              </div>
              
              {photosLoading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                  <p className="text-muted-foreground">Cargando fotos...</p>
                </div>
              ) : approvedPhotos.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {approvedPhotos.map((photo) => (
                    <div key={photo.id} className="group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                      <PhotoCard
                        id={photo.id}
                        imageUrl={photo.image_url}
                        photographer={photo.photographer_name}
                        photographerAvatar={photo.photographer_avatar}
                        mode="grid"
                        onVote={handleVotePhoto}
                      />
                      
                      {/* Photo info section */}
                      <div className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-sm text-gray-900">{photo.photographer_name}</h4>
                            {photo.description && (
                              <p className="text-xs text-gray-600 mt-1 line-clamp-2">{photo.description}</p>
                            )}
                          </div>
                          <div className="text-xs text-gray-500">
                            {photo.votes} votos
                          </div>
                        </div>
                        
                        {/* Login prompt for non-authenticated users */}
                        {!user && (
                          <div className="mt-3 pt-3 border-t border-gray-100">
                            <Button
                              size="sm"
                              variant="ghost"
                              className="w-full text-xs text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                              onClick={() => navigate("/login")}
                            >
                              Inicia sesión para votar
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Camera className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-4">
                    Aún no hay fotos en este concurso
                  </p>
                  <Button onClick={handleUploadPhoto} className="flex items-center gap-2">
                    <Upload className="h-4 w-4" />
                    Sé el primero en participar
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contest Details */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-semibold text-lg mb-4">Detalles</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Ubicación</p>
                    <p className="text-sm text-muted-foreground">{contest.location}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Fecha límite</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(contest.endDate).toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Trophy className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Organizador</p>
                    <p className="text-sm text-muted-foreground">{contest.organizer}</p>
                  </div>
                </div>
                {/* Premio - Sección mejorada con mejor manejo de datos */}
                <div className="flex items-start gap-3 bg-primary/5 rounded-lg p-3">
                  <Trophy className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div className="w-full">
                    <p className="font-medium text-primary">Premio</p>
                    <p className="text-sm font-bold text-primary break-words">
                      {contest.prize && contest.prize.trim() !== '' ? contest.prize : "Por determinar"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Rules */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-semibold text-lg mb-4">Reglas básicas</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Solo fotos originales tomadas por el participante</li>
                <li>• Máximo 3 fotos por participante</li>
                <li>• Fotos deben ser tomadas en la ubicación especificada</li>
                <li>• No se permiten ediciones excesivas</li>
                <li>• Respeta las normas de la comunidad</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ContestDetail;
