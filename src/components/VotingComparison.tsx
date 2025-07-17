import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, Trophy, RefreshCw, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface Photo {
  id: string;
  image_url: string;
  photographer_name: string;
  photographer_avatar?: string;
  description?: string;
  votes: number;
}

interface VotingComparisonProps {
  contestId: string;
  photos: Photo[];
  onBack: () => void;
  onVoteComplete?: () => void;
}

const VotingComparison = ({ contestId, photos, onBack, onVoteComplete }: VotingComparisonProps) => {
  const [currentPair, setCurrentPair] = useState<[Photo, Photo] | null>(null);
  const [availablePhotos, setAvailablePhotos] = useState<Photo[]>([]);
  const [votingComplete, setVotingComplete] = useState(false);
  const [votesCount, setVotesCount] = useState(0);
  const [votesRemaining, setVotesRemaining] = useState<number | null>(null);
  const [dailyVotesRemaining, setDailyVotesRemaining] = useState<number | null>(null);
  const [canVote, setCanVote] = useState(true);
  const [isLoadingVoteStatus, setIsLoadingVoteStatus] = useState(true);
  const { toast } = useToast();
  const { user } = useAuth();

  // Load user vote status
  const loadVoteStatus = async () => {
    if (!user) {
      setCanVote(false);
      setIsLoadingVoteStatus(false);
      return;
    }

    try {
      const { data, error } = await supabase.rpc('get_user_vote_status', {
        p_user_id: user.id,
        p_contest_id: contestId
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
    if (photos.length >= 2) {
      setAvailablePhotos([...photos]);
      generateNewPair([...photos]);
    }
  }, [photos]);

  useEffect(() => {
    loadVoteStatus();
  }, [user, contestId]);

  const generateNewPair = (photoList: Photo[]) => {
    if (photoList.length < 2) {
      setVotingComplete(true);
      return;
    }

    // Create a deep copy and shuffle to ensure fresh randomization each time
    const shuffled = [...photoList].sort(() => Math.random() - 0.5);
    const pair: [Photo, Photo] = [shuffled[0], shuffled[1]];
    
    // Ensure we don't show the same pair consecutively
    if (currentPair && 
        ((currentPair[0].id === pair[0].id && currentPair[1].id === pair[1].id) ||
         (currentPair[0].id === pair[1].id && currentPair[1].id === pair[0].id))) {
      // Reshuffle if we got the same pair
      const reshuffled = [...photoList].sort(() => Math.random() - 0.5);
      const newPair: [Photo, Photo] = [reshuffled[0], reshuffled[1]];
      setCurrentPair(newPair);
    } else {
      setCurrentPair(pair);
    }
  };

  const handleVote = async (winnerPhoto: Photo, loserPhoto: Photo) => {
    if (!user) {
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

    try {
      // Increment user votes in database
      const { data, error } = await supabase.rpc('increment_user_votes', {
        p_user_id: user.id,
        p_contest_id: contestId
      });

      if (error) {
        console.error('Error incrementing votes:', error);
        toast({
          title: "Error al votar",
          description: "No se pudo registrar tu voto. Inténtalo de nuevo.",
          variant: "destructive",
        });
        return;
      }

      // Increment photo votes
      const { error: photoError } = await supabase.rpc('increment_photo_votes', {
        photo_id: winnerPhoto.id
      });

      if (photoError) {
        console.error('Error incrementing photo votes:', photoError);
        toast({
          title: "Error al votar",
          description: "No se pudo registrar tu voto. Inténtalo de nuevo.",
          variant: "destructive",
        });
        return;
      }

      if (data && data.length > 0) {
        const result = data[0];
        setVotesRemaining(result.votes_remaining);
        setDailyVotesRemaining(result.daily_votes_remaining);
        setCanVote(result.votes_remaining > 0 && result.daily_votes_remaining > 0);
      }

      setVotesCount(prev => prev + 1);
      
      toast({
        title: "Voto registrado",
        description: `Has votado por la foto de ${winnerPhoto.photographer_name}`,
      });

      // Generate new pair from original photos array for better randomization
      generateNewPair([...photos]);

      onVoteComplete?.();
    } catch (error) {
      console.error('Error in handleVote:', error);
      toast({
        title: "Error al votar",
        description: "No se pudo registrar tu voto. Inténtalo de nuevo.",
        variant: "destructive",
      });
    }
  };

  const resetVoting = () => {
    setAvailablePhotos([...photos]);
    setVotingComplete(false);
    setVotesCount(0);
    generateNewPair([...photos]);
  };

  if (photos.length < 2) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <Card className="p-8 text-center max-w-md mx-auto">
          <h3 className="text-xl font-semibold mb-4">No hay suficientes fotos</h3>
          <p className="text-gray-600 mb-6">
            Se necesitan al menos 2 fotos para poder votar en este concurso.
          </p>
          <Button onClick={onBack} variant="outline">
            <ChevronLeft className="h-4 w-4 mr-2" />
            Volver
          </Button>
        </Card>
      </div>
    );
  }

  if (votingComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <Card className="p-8 text-center max-w-md mx-auto">
          <Trophy className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-4">¡Votación completada!</h3>
          <p className="text-gray-600 mb-6">
            Has realizado {votesCount} comparaciones. ¡Gracias por participar!
          </p>
          <div className="flex gap-3 justify-center">
            <Button onClick={resetVoting} variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Votar más
            </Button>
            <Button onClick={onBack}>
              <ChevronLeft className="h-4 w-4 mr-2" />
              Volver
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  if (!currentPair) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Preparando votación...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm shadow-sm border-b">
        <div className="container max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="hover:bg-primary/10"
            >
              <ChevronLeft className="h-5 w-5 mr-2" />
              Volver
            </Button>
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900">Sistema de Votación</h1>
              <p className="text-sm text-gray-600">Comparaciones realizadas: {votesCount}</p>
              {!isLoadingVoteStatus && user && (
                <div className="flex items-center justify-center gap-4 mt-2">
                  <div className="flex items-center gap-1 text-xs">
                    <span className="text-gray-500">Votos totales restantes:</span>
                    <span className={`font-medium ${votesRemaining === 0 ? 'text-red-500' : 'text-green-600'}`}>
                      {votesRemaining ?? 0}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-xs">
                    <span className="text-gray-500">Votos diarios restantes:</span>
                    <span className={`font-medium ${dailyVotesRemaining === 0 ? 'text-red-500' : 'text-green-600'}`}>
                      {dailyVotesRemaining ?? 0}
                    </span>
                  </div>
                </div>
              )}
              {!canVote && !isLoadingVoteStatus && (
                <div className="flex items-center justify-center gap-2 mt-2 text-xs text-red-600">
                  <AlertCircle className="h-3 w-3" />
                  <span>Has alcanzado el límite de votos</span>
                </div>
              )}
            </div>
            <div className="w-20"></div> {/* Spacer for balance */}
          </div>
        </div>
      </div>

      {/* Voting Interface */}
      <div className="container max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">¿Cuál prefieres?</h2>
          <p className="text-lg text-gray-600">Haz clic en la fotografía que más te guste</p>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={`${currentPair[0].id}-${currentPair[1].id}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto"
          >
            {currentPair.map((photo, index) => (
              <motion.div
                key={photo.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="cursor-pointer"
                onClick={() => handleVote(photo, currentPair[1 - index])}
              >
                <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/50">
                  <div className="aspect-[4/5] relative overflow-hidden">
                    <img
                      src={photo.image_url}
                      alt={`Foto de ${photo.photographer_name}`}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                      <div className="flex items-center space-x-3">
                        {photo.photographer_avatar && (
                          <img
                            src={photo.photographer_avatar}
                            alt={photo.photographer_name}
                            className="w-8 h-8 rounded-full border-2 border-white"
                          />
                        )}
                        <div>
                          <p className="text-white font-medium">{photo.photographer_name}</p>
                          {photo.description && (
                            <p className="text-white/80 text-sm truncate">{photo.description}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Instructions */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full shadow-sm border">
            <div className="text-sm text-gray-600">
              <span className="font-medium">Instrucciones:</span> Haz clic en la foto que prefieras para votar
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VotingComparison;