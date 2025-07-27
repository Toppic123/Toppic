
import { useParams, Navigate, useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Trophy, Users, Camera, ArrowLeft, Upload, AlertCircle, Clock, ChevronLeft, ChevronRight, X, Vote, Building2 } from "lucide-react";
import { useContestsData } from "@/hooks/useContestsData";
import { useContestPhotos } from "@/hooks/useContestPhotos";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import PhotoCard from "@/components/PhotoCard";
import PhotoComments from "@/components/PhotoComments";
import SocialShareButtons from "@/components/SocialShareButtons";
import ClickableUserProfile from "@/components/ClickableUserProfile";
import VotingComparison from "@/components/VotingComparison";
import ContestBannerDisplay from "@/components/contests/ContestBannerDisplay";
import { useAuth } from "@/contexts/AuthContext";

const ContestDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { contests, isLoading } = useContestsData();
  const { user } = useAuth();
  
  // Navigation state for photo gallery and voting
  const [selectedPhoto, setSelectedPhoto] = useState<any>(null);
  const [showVoting, setShowVoting] = useState(false);
  
  // Fetch real photos from the database
  const { approvedPhotos, isLoading: photosLoading } = useContestPhotos(id);

  // Navigation functions for gallery
  const getCurrentPhotoIndex = useCallback(() => {
    if (!selectedPhoto) return -1;
    const index = approvedPhotos.findIndex(photo => photo.id === selectedPhoto.id);
    console.log('getCurrentPhotoIndex:', index, 'selectedPhoto id:', selectedPhoto?.id, 'total photos:', approvedPhotos.length);
    return index;
  }, [selectedPhoto, approvedPhotos]);

  const navigateToPhoto = useCallback((direction: 'prev' | 'next') => {
    console.log('navigateToPhoto called with direction:', direction);
    const currentIndex = getCurrentPhotoIndex();
    if (currentIndex === -1) {
      console.log('Current index is -1, cannot navigate');
      return;
    }

    let nextIndex;
    if (direction === 'prev') {
      nextIndex = currentIndex === 0 ? approvedPhotos.length - 1 : currentIndex - 1;
    } else {
      nextIndex = currentIndex === approvedPhotos.length - 1 ? 0 : currentIndex + 1;
    }
    
    console.log('Navigating from index', currentIndex, 'to index', nextIndex);
    console.log('Next photo:', approvedPhotos[nextIndex]);
    setSelectedPhoto(approvedPhotos[nextIndex]);
  }, [getCurrentPhotoIndex, approvedPhotos]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!selectedPhoto) return;
      
      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault();
          navigateToPhoto('prev');
          break;
        case 'ArrowRight':
          event.preventDefault();
          navigateToPhoto('next');
          break;
        case 'Escape':
          event.preventDefault();
          setSelectedPhoto(null);
          break;
      }
    };

    if (selectedPhoto) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedPhoto, navigateToPhoto]);

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

  // Check if contest has ended
  const contestEndDate = new Date(contest.endDate);
  const now = new Date();
  const hasEnded = contestEndDate < now || contest.status !== 'active';

  const handleUploadPhoto = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    
    if (hasEnded) {
      // Show a toast or message instead of navigating
      return;
    }
    
    // Navigate to upload page with contest context
    navigate("/upload", { state: { contestId: id, contestTitle: contest.title } });
  };

  const handleStartVoting = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    setShowVoting(true);
  };

  if (showVoting) {
    return (
      <VotingComparison
        contestId={id!}
        photos={approvedPhotos}
        onBack={() => setShowVoting(false)}
        onVoteComplete={() => {
          // Refresh photos or handle vote completion
        }}
      />
    );
  }

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
            <Badge className="mb-2" variant={contest.isActive && !hasEnded ? "default" : "secondary"}>
              {hasEnded ? "Finalizado" : contest.isActive ? "Activo" : "Pendiente"}
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{contest.title}</h1>
          </div>
        </div>
      </div>

      {/* Contest Ended Notice */}
      {hasEnded && (
        <div className="container mx-auto px-4 py-4">
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium text-amber-800 mb-1">
                  Concurso finalizado
                </h3>
                <p className="text-sm text-amber-700">
                  Este concurso terminó el {contestEndDate.toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })} y ya no acepta nuevas participaciones.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

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
                    {hasEnded ? 0 : Math.max(0, Math.ceil((contestEndDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)))}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {hasEnded ? "Finalizado" : "Días restantes"}
                  </p>
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
                <div className="flex gap-3">
                  {user && approvedPhotos.length >= 2 && (
                    <Button onClick={handleStartVoting} className="flex items-center gap-2">
                      <Vote className="h-4 w-4" />
                      Votar
                    </Button>
                  )}
                  {!hasEnded ? (
                    <Button onClick={handleUploadPhoto} className="flex items-center gap-2">
                      <Upload className="h-4 w-4" />
                      Subir foto
                    </Button>
                  ) : (
                    <Button disabled className="flex items-center gap-2" variant="secondary">
                      <Clock className="h-4 w-4" />
                      Concurso finalizado
                    </Button>
                  )}
                </div>
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
                      <div 
                        className="aspect-[3/4] bg-muted overflow-hidden rounded-xl relative group cursor-pointer"
                        onClick={() => setSelectedPhoto(photo)}
                      >
                        <img
                          src={photo.image_url}
                          alt={`Photo by ${photo.photographer_name}`}
                          className="w-full h-full object-cover transition-opacity duration-700"
                        />
                      </div>
                      
                      {/* Photo info section */}
                      <div className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-sm text-gray-900">{photo.photographer_name}</h4>
                            {photo.description && (
                              <p className="text-xs text-gray-600 mt-1 line-clamp-2">{photo.description}</p>
                            )}
                          </div>
                          <div className="text-xs text-gray-500 flex items-center gap-1">
                            <span>🗳️</span>
                            <span>{photo.votes} votos</span>
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
                    {hasEnded ? "Este concurso no recibió participaciones" : "Aún no hay fotos en este concurso"}
                  </p>
                  {!hasEnded && (
                    <Button onClick={handleUploadPhoto} className="flex items-center gap-2">
                      <Upload className="h-4 w-4" />
                      Sé el primero en participar
                    </Button>
                  )}
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
                  <Building2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Organizador</p>
                    <p className="text-sm text-muted-foreground">{contest.organizer}</p>
                  </div>
                </div>
                {/* Premio - Destacado visualmente */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-lg p-4 shadow-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-full">
                      <p className="font-bold text-green-800 text-lg">💰 Premio</p>
                      <p className="text-base font-bold text-green-900 break-words mt-1">
                        {contest.prize && contest.prize.trim() !== '' ? contest.prize : "Por determinar"}
                      </p>
                    </div>
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

            {/* Contest Banners - Display after basic rules */}
            <ContestBannerDisplay 
              contestId={id}
              bannerType="sidebar"
              className="mt-6"
            />

          </div>
        </div>
      </div>

      {/* Photo Navigation Dialog */}
      <Dialog 
        open={selectedPhoto !== null} 
        onOpenChange={(open) => !open && setSelectedPhoto(null)}
      >
        <DialogContent className="sm:max-w-6xl h-[90vh] max-h-[900px] flex flex-col p-0 gap-0">
          {selectedPhoto && (
            <>
              <div className="flex items-center justify-between px-4 py-3 border-b">
                <div className="flex flex-col items-start">
                  <h3 className="text-base font-medium">{selectedPhoto.photographer_name}</h3>
                  {selectedPhoto.description && (
                    <p className="text-sm text-muted-foreground mt-1">{selectedPhoto.description}</p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <SocialShareButtons 
                    url={window.location.href}
                    title={`Foto de ${selectedPhoto.photographer_name}`}
                    imageUrl={selectedPhoto.image_url}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setSelectedPhoto(null)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="flex-1 overflow-hidden grid grid-cols-1 md:grid-cols-5 h-full min-h-0">
                <div className="col-span-3 bg-black flex items-center justify-center overflow-hidden relative">
                  <img 
                    src={selectedPhoto.image_url} 
                    alt={`Foto de ${selectedPhoto.photographer_name}`}
                    className="max-w-full max-h-full object-contain"
                  />
                  
                  {/* Navigation Buttons */}
                  {approvedPhotos.length > 1 && (
                    <>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70 hover:text-white rounded-full"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigateToPhoto('prev');
                        }}
                      >
                        <ChevronLeft className="h-6 w-6" />
                      </Button>
                      
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70 hover:text-white rounded-full"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigateToPhoto('next');
                        }}
                      >
                        <ChevronRight className="h-6 w-6" />
                      </Button>
                    </>
                  )}
                  
                  {/* Photo Counter */}
                  {approvedPhotos.length > 1 && (
                    <div className="absolute top-4 right-4 bg-black/50 text-white px-2 py-1 rounded text-sm">
                      {getCurrentPhotoIndex() + 1} / {approvedPhotos.length}
                    </div>
                  )}
                </div>
                
                <div className="col-span-2 flex flex-col border-l">
                  <div className="p-4 border-b">
                    <ClickableUserProfile
                      photographer={selectedPhoto.photographer_name}
                      photographerAvatar={selectedPhoto.photographer_avatar}
                      size="md"
                    />
                    <div className="mt-3">
                      <span className="text-sm text-muted-foreground">
                        {selectedPhoto.votes} votos
                      </span>
                    </div>
                  </div>
                  <PhotoComments photoId={selectedPhoto.id} isEmbedded={true} />
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default ContestDetail;
