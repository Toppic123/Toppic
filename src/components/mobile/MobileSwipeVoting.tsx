import { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Home, RotateCcw, ThumbsUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useContestPhotos } from "@/hooks/useContestPhotos";
import { useContestsData } from "@/hooks/useContestsData";

interface MobileSwipeVotingProps {
  onNavigate: (screen: 'contests' | 'home') => void;
  contestId?: string;
}

interface VotingPhoto {
  id: string;
  image: string;
  photographer: string;
  title: string;
  contest: string;
  votes: number;
}

const MobileSwipeVoting = ({ onNavigate, contestId }: MobileSwipeVotingProps) => {
  const { toast } = useToast();
  const [currentPairIndex, setCurrentPairIndex] = useState(0);
  const [votes, setVotes] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState<'top' | 'bottom' | 'right' | null>(null);
  const [swipeDistance, setSwipeDistance] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [votedPhoto, setVotedPhoto] = useState<string | null>(null);
  const startY = useRef(0);
  const startX = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Fetch real photos and contest data - use the first active contest if no contestId provided
  const { contests, isLoading: contestsLoading } = useContestsData();
  
  // Get the contest ID to use - either provided or first active contest
  const activeContestId = contestId || contests.find(c => c.status === 'active')?.id;
  
  const { approvedPhotos, isLoading: photosLoading, votePhoto } = useContestPhotos(activeContestId);

  console.log('MobileSwipeVoting - contestId:', contestId);
  console.log('MobileSwipeVoting - activeContestId:', activeContestId);
  console.log('MobileSwipeVoting - approvedPhotos:', approvedPhotos);

  // Convert contest photos to voting format
  const votingPhotos: VotingPhoto[] = approvedPhotos.map((photo) => ({
    id: photo.id,
    image: photo.image_url,
    photographer: photo.photographer_name,
    title: photo.description || "Sin título",
    contest: contests.find(c => c.id === activeContestId)?.title || "Concurso",
    votes: photo.votes
  }));

  const createPhotoPairs = () => {
    const pairs = [];
    for (let i = 0; i < votingPhotos.length - 1; i += 2) {
      if (votingPhotos[i + 1]) {
        pairs.push([votingPhotos[i], votingPhotos[i + 1]]);
      }
    }
    return pairs;
  };

  const photoPairs = createPhotoPairs();
  const currentPair = photoPairs[currentPairIndex];

  const handleVote = useCallback(async (selectedPhoto: VotingPhoto, direction: 'top' | 'bottom' | 'right') => {
    if (!activeContestId) return;
    
    setVotedPhoto(selectedPhoto.id);
    setSwipeDirection(direction);
    
    // Vote on the selected photo using the real voting function
    try {
      await votePhoto(selectedPhoto.id);
    } catch (error) {
      console.error('Error voting photo:', error);
    }
    
    setTimeout(() => {
      toast({
        title: "Voto registrado",
        description: `Has elegido "${selectedPhoto.title}" de ${selectedPhoto.photographer}`
      });
      
      setVotes(votes + 1);
      setSwipeDirection(null);
      setSwipeDistance(0);
      setVotedPhoto(null);
      
      if (currentPairIndex < photoPairs.length - 1) {
        setCurrentPairIndex(currentPairIndex + 1);
      } else {
        setCurrentPairIndex(0);
        toast({
          title: "¡Votación completada!",
          description: `Has votado ${votes + 1} comparaciones. Gracias por participar.`
        });
      }
    }, 800);
  }, [currentPairIndex, photoPairs.length, votes, toast, votePhoto, activeContestId]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setIsDragging(true);
    startY.current = e.touches[0].clientY;
    startX.current = e.touches[0].clientX;
    setSwipeDirection(null);
    setSwipeDistance(0);
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging) return;
    
    const currentY = e.touches[0].clientY;
    const currentX = e.touches[0].clientX;
    const deltaY = currentY - startY.current;
    const deltaX = currentX - startX.current;
    const maxSwipe = 150;
    
    // Determine if it's a horizontal or vertical swipe
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      // Horizontal swipe (right swipe for voting)
      if (deltaX > 20) {
        setSwipeDirection('right');
        setSwipeDistance(Math.min(Math.abs(deltaX), maxSwipe));
      } else {
        setSwipeDirection(null);
        setSwipeDistance(0);
      }
    } else {
      // Vertical swipe (existing functionality)
      const normalizedDistance = Math.min(Math.abs(deltaY), maxSwipe);
      setSwipeDistance(normalizedDistance);
      
      if (deltaY > 20) {
        setSwipeDirection('bottom');
      } else if (deltaY < -20) {
        setSwipeDirection('top');
      } else {
        setSwipeDirection(null);
      }
    }
  }, [isDragging]);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (!isDragging) return;
    
    const currentY = e.changedTouches[0].clientY;
    const currentX = e.changedTouches[0].clientX;
    const deltaY = currentY - startY.current;
    const deltaX = currentX - startX.current;
    const threshold = 80;
    
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > threshold && currentPair) {
      // Right swipe - vote for the currently focused photo (top photo by default)
      if (deltaX > 0) {
        handleVote(currentPair[0], 'right');
      }
    } else if (Math.abs(deltaY) > threshold && currentPair) {
      if (deltaY > 0) {
        // Deslizó hacia abajo - vota por la foto inferior
        handleVote(currentPair[1], 'bottom');
      } else {
        // Deslizó hacia arriba - vota por la foto superior
        handleVote(currentPair[0], 'top');
      }
    } else {
      // No se completó el deslizamiento, resetear
      setSwipeDirection(null);
      setSwipeDistance(0);
    }
    
    setIsDragging(false);
  }, [isDragging, currentPair, handleVote]);

  const handlePhotoClick = useCallback((photo: VotingPhoto, side: 'top' | 'bottom') => {
    if (!isDragging) {
      handleVote(photo, side);
    }
  }, [isDragging, handleVote]);

  // Show loading state
  if (photosLoading || contestsLoading) {
    return (
      <div className="h-full bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-500">Cargando fotos del concurso...</p>
        </div>
      </div>
    );
  }

  // Show message if no active contest found
  if (!activeContestId) {
    return (
      <div className="h-full bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-4">No hay concursos activos disponibles</p>
          <Button onClick={() => onNavigate('contests')}>
            Volver a concursos
          </Button>
        </div>
      </div>
    );
  }

  // Show message if no photos or not enough photos for voting
  if (!currentPair || votingPhotos.length < 2) {
    return (
      <div className="h-full bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-4">
            {votingPhotos.length === 0 
              ? "No hay fotos disponibles para votar en este concurso" 
              : "Se necesitan al menos 2 fotos para poder votar"
            }
          </p>
          <Button onClick={() => onNavigate('contests')}>
            Volver a concursos
          </Button>
        </div>
      </div>
    );
  }

  const getSwipeIndicatorOpacity = (side: 'top' | 'bottom' | 'right') => {
    if (swipeDirection === side) {
      return Math.min(swipeDistance / 100, 1);
    }
    return 0;
  };

  const currentContest = contests.find(c => c.id === activeContestId);

  return (
    <div className="h-full bg-black overflow-hidden relative">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-20 bg-gradient-to-b from-black/70 to-transparent">
        <div className="flex items-center justify-between p-4 text-white">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onNavigate('contests')}
            className="text-white hover:bg-white/20 p-2"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="text-center">
            <h1 className="text-lg font-semibold">Votación Comparativa</h1>
            <p className="text-sm opacity-80">
              {currentContest?.title || "Concurso"} • {votes} votos • {currentPairIndex + 1}/{photoPairs.length}
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onNavigate('home')}
            className="text-white hover:bg-white/20 p-2"
          >
            <Home className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Right Swipe Indicator - Overlay on entire container */}
      <div 
        className="absolute inset-0 bg-green-500/40 z-15 flex items-center justify-center transition-opacity duration-200"
        style={{ 
          opacity: swipeDirection === 'right' ? getSwipeIndicatorOpacity('right') : 0
        }}
      >
        <div className="bg-green-500 rounded-full p-8 animate-pulse">
          <ThumbsUp className="h-12 w-12 text-white fill-white" />
        </div>
      </div>

      {/* Photos Container - Vertical Layout */}
      <div 
        ref={containerRef}
        className="flex flex-col h-full pt-20 pb-32"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Top Photo - 50% height */}
        <div className="h-1/2 relative overflow-hidden flex items-center justify-center" onClick={() => handlePhotoClick(currentPair[0], 'top')}>
          {/* Vote Indicator for Top Photo */}
          <div 
            className="absolute inset-0 bg-green-500/40 z-10 flex items-center justify-center transition-opacity duration-200"
            style={{ 
              opacity: swipeDirection === 'top' ? getSwipeIndicatorOpacity('top') : 
                      (votedPhoto === currentPair[0].id ? 1 : 0)
            }}
          >
            <div className="bg-green-500 rounded-full p-6 animate-pulse">
              <ThumbsUp className="h-10 w-10 text-white fill-white" />
            </div>
          </div>
          
          <img
            src={currentPair[0].image}
            alt={currentPair[0].title}
            className="w-full h-full object-cover"
            draggable={false}
          />
          
          <div className="absolute bottom-4 left-4 right-4 z-20 text-white">
            <Badge className="mb-2 text-xs bg-white/20 text-white border-white/30">
              {currentPair[0].contest}
            </Badge>
            <h3 className="text-sm font-semibold mb-1">{currentPair[0].title}</h3>
            <p className="text-xs opacity-90">por {currentPair[0].photographer}</p>
            <div className="text-xs opacity-75 mt-1">
              Votos: {currentPair[0].votes}
            </div>
          </div>
        </div>

        {/* Horizontal Divider */}
        <div className="h-1 bg-white/30 flex-shrink-0"></div>

        {/* Bottom Photo - 50% height */}
        <div className="h-1/2 relative overflow-hidden flex items-center justify-center" onClick={() => handlePhotoClick(currentPair[1], 'bottom')}>
          {/* Vote Indicator for Bottom Photo */}
          <div 
            className="absolute inset-0 bg-green-500/40 z-10 flex items-center justify-center transition-opacity duration-200"
            style={{ 
              opacity: swipeDirection === 'bottom' ? getSwipeIndicatorOpacity('bottom') : 
                      (votedPhoto === currentPair[1].id ? 1 : 0)
            }}
          >
            <div className="bg-green-500 rounded-full p-6 animate-pulse">
              <ThumbsUp className="h-10 w-10 text-white fill-white" />
            </div>
          </div>
          
          <img
            src={currentPair[1].image}
            alt={currentPair[1].title}
            className="w-full h-full object-cover"
            draggable={false}
          />
          
          <div className="absolute bottom-4 left-4 right-4 z-20 text-white">
            <Badge className="mb-2 text-xs bg-white/20 text-white border-white/30">
              {currentPair[1].contest}
            </Badge>
            <h3 className="text-sm font-semibold mb-1">{currentPair[1].title}</h3>
            <p className="text-xs opacity-90">por {currentPair[1].photographer}</p>
            <div className="text-xs opacity-75 mt-1">
              Votos: {currentPair[1].votes}
            </div>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
        <div className="text-center space-y-3">
          <p className="text-lg font-medium">¿Cuál te gusta más?</p>
          <p className="text-sm opacity-80">
            Toca una foto, desliza hacia arriba/abajo o desliza hacia la derecha para votar
          </p>
          
          {/* Visual Swipe Indicators */}
          <div className="flex justify-center items-center space-y-4 mt-4 flex-col">
            <div className="text-center">
              <div className="text-xs opacity-60">↑ Desliza o toca</div>
              <div className="text-xs opacity-60">Foto superior</div>
            </div>
            <div className="text-center">
              <div className="text-xs opacity-60">→ Desliza derecha</div>
              <div className="text-xs opacity-60">Votar por la mejor</div>
            </div>
            <div className="text-center">
              <div className="text-xs opacity-60">Toca o desliza ↓</div>
              <div className="text-xs opacity-60">Foto inferior</div>
            </div>
          </div>
          
          {/* Reset Button */}
          <div className="flex justify-center mt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSwipeDirection(null);
                setSwipeDistance(0);
              }}
              className="bg-white/10 border-white/30 text-white hover:bg-white/20"
            >
              <RotateCcw className="h-4 w-4 mr-1" />
              Reiniciar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileSwipeVoting;
