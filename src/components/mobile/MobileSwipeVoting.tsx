import { useState, useRef, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Home, RotateCcw, ThumbsUp, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useContestPhotos } from "@/hooks/useContestPhotos";
import { useContestsData } from "@/hooks/useContestsData";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

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
  const { user } = useAuth();
  const [currentPairIndex, setCurrentPairIndex] = useState(0);
  const [votes, setVotes] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState<'top' | 'bottom' | 'right' | null>(null);
  const [swipeDistance, setSwipeDistance] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [votedPhoto, setVotedPhoto] = useState<string | null>(null);
  const [activePhoto, setActivePhoto] = useState<'top' | 'bottom'>('top');
  const [votesRemaining, setVotesRemaining] = useState<number | null>(null);
  const [dailyVotesRemaining, setDailyVotesRemaining] = useState<number | null>(null);
  const [canVote, setCanVote] = useState(true);
  const [isLoadingVoteStatus, setIsLoadingVoteStatus] = useState(true);
  const startY = useRef(0);
  const startX = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Fetch real photos and contest data - use the first active contest if no contestId provided
  const { contests, isLoading: contestsLoading } = useContestsData();
  
  // Get the contest ID to use - either provided or first active contest
  const activeContestId = contestId || contests.find(c => c.status === 'active')?.id;
  
  const { approvedPhotos, isLoading: photosLoading, votePhoto } = useContestPhotos(activeContestId);

  // Load user vote status
  const loadVoteStatus = async () => {
    if (!user || !activeContestId) {
      setCanVote(false);
      setIsLoadingVoteStatus(false);
      return;
    }

    try {
      const { data, error } = await supabase.rpc('get_user_vote_status', {
        p_user_id: user.id,
        p_contest_id: activeContestId
      });

      if (error) {
        console.error('Error loading vote status:', error);
        return;
      }

      if (data && data.length > 0) {
        const status = data[0];
        setVotesRemaining(status.votes_remaining);
        setDailyVotesRemaining(status.daily_votes_remaining);
        setCanVote(status.can_vote);
      }
    } catch (error) {
      console.error('Error in loadVoteStatus:', error);
    } finally {
      setIsLoadingVoteStatus(false);
    }
  };

  useEffect(() => {
    loadVoteStatus();
  }, [user, activeContestId]);

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
    if (!activeContestId || !user) {
      toast({
        title: "Necesitas estar logueado",
        description: "Inicia sesión para poder votar",
        variant: "destructive",
      });
      return;
    }

    if (!canVote) {
      toast({
        title: "Límite de votos alcanzado",
        description: votesRemaining === 0 
          ? "Has alcanzado el límite total de votos para este concurso"
          : "Has alcanzado el límite diario de votos",
        variant: "destructive",
      });
      return;
    }
    
    setVotedPhoto(selectedPhoto.id);
    setSwipeDirection(direction);
    
    // Vote on the selected photo using the real voting function
    try {
      const result = await votePhoto(selectedPhoto.id, user.id);
      
      // Update vote counts from server response
      if (result && result.length > 0) {
        const voteData = result[0];
        setVotesRemaining(voteData.votes_remaining);
        setDailyVotesRemaining(voteData.daily_votes_remaining);
        setCanVote(voteData.votes_remaining > 0 && voteData.daily_votes_remaining > 0);
      }
      
      setVotes(votes + 1);
      
      // Add swipe animation for the voted photo
      setTimeout(() => {
        setSwipeDirection(null);
        setSwipeDistance(0);
        setVotedPhoto(null);
        
        if (currentPairIndex < photoPairs.length - 1) {
          setCurrentPairIndex(currentPairIndex + 1);
        } else {
          setCurrentPairIndex(0);
        }
      }, 800);
      
    } catch (error) {
      console.error('Error voting photo:', error);
      setSwipeDirection(null);
      setSwipeDistance(0);
      setVotedPhoto(null);
    }
  }, [currentPairIndex, photoPairs.length, votes, votePhoto, activeContestId, user, canVote, votesRemaining]);

  const handleTouchStart = useCallback((e: React.TouchEvent, photoSide?: 'top' | 'bottom') => {
    setIsDragging(true);
    startY.current = e.touches[0].clientY;
    startX.current = e.touches[0].clientX;
    setSwipeDirection(null);
    setSwipeDistance(0);
    if (photoSide) {
      setActivePhoto(photoSide);
    }
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging) return;
    
    const currentY = e.touches[0].clientY;
    const currentX = e.touches[0].clientX;
    const deltaY = currentY - startY.current;
    const deltaX = currentX - startX.current;
    const maxSwipe = 150;
    
    // Only allow horizontal swipe (right swipe for voting)
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX > 20) {
        setSwipeDirection('right');
        setSwipeDistance(Math.min(Math.abs(deltaX), maxSwipe));
      } else {
        setSwipeDirection(null);
        setSwipeDistance(0);
      }
    } else {
      // Disable vertical swipes
      setSwipeDirection(null);
      setSwipeDistance(0);
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
      // Right swipe - vote for the photo that was being swiped
      if (deltaX > 0) {
        const photoToVote = activePhoto === 'top' ? currentPair[0] : currentPair[1];
        handleVote(photoToVote, 'right');
      }
    } else {
      // Vertical swipes are disabled - only right swipe to vote
      setSwipeDirection(null);
      setSwipeDistance(0);
    }
    
    setIsDragging(false);
  }, [isDragging, currentPair, handleVote, activePhoto]);

  // Removed click functionality - only swipe to vote
  const handlePhotoClick = useCallback((photo: VotingPhoto, side: 'top' | 'bottom') => {
    // No action on click - only swipe to vote
  }, []);

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
            {!isLoadingVoteStatus && user && (
              <div className="flex items-center justify-center gap-3 mt-1">
                <span className="text-xs opacity-70">
                  Restantes: {votesRemaining ?? 0} total | {dailyVotesRemaining ?? 0} hoy
                </span>
                {!canVote && (
                  <AlertCircle className="h-3 w-3 text-red-400" />
                )}
              </div>
            )}
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
      >
        {/* Top Photo - 50% height */}
        <div 
          className="h-1/2 relative overflow-hidden flex items-center justify-center" 
          onTouchStart={(e) => handleTouchStart(e, 'top')}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
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
            className={`w-full h-full object-cover transition-transform duration-500 ${
              votedPhoto === currentPair[0].id && swipeDirection === 'right' 
                ? 'transform translate-x-full scale-110' 
                : ''
            }`}
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
        <div 
          className="h-1/2 relative overflow-hidden flex items-center justify-center" 
          onTouchStart={(e) => handleTouchStart(e, 'bottom')}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
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
            className={`w-full h-full object-cover transition-transform duration-500 ${
              votedPhoto === currentPair[1].id && swipeDirection === 'right' 
                ? 'transform translate-x-full scale-110' 
                : ''
            }`}
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
            Desliza hacia la derecha la foto que prefieras para votar
          </p>
          
          {/* Visual Swipe Indicators */}
          <div className="flex justify-center items-center space-y-4 mt-4 flex-col">
            <div className="text-center">
              <div className="text-xs opacity-60">→ Desliza hacia la derecha</div>
              <div className="text-xs opacity-60">para votar por esa foto</div>
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
