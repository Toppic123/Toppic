
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, Calendar, Trophy, Users, Camera, Vote, Share2, Building2 } from "lucide-react";
import { useContestsData } from "@/hooks/useContestsData";
import { useContestPhotos } from "@/hooks/useContestPhotos";
import SocialShareButtons from "@/components/SocialShareButtons";
import ContestBannerDisplay from "@/components/contests/ContestBannerDisplay";

interface MobileContestDetailProps {
  contestId: string;
  onNavigate: (screen: 'contests' | 'upload' | 'voting' | 'vote', contestId?: string) => void;
}

const MobileContestDetail = ({ contestId, onNavigate }: MobileContestDetailProps) => {
  const { contests, isLoading } = useContestsData();
  const { approvedPhotos, isLoading: photosLoading } = useContestPhotos(contestId);
  const [contest, setContest] = useState<any>(null);

  console.log('MobileContestDetail - contestId:', contestId);
  console.log('MobileContestDetail - contests:', contests);
  console.log('MobileContestDetail - approvedPhotos:', approvedPhotos);

  useEffect(() => {
    if (contests.length > 0) {
      const foundContest = contests.find(c => c.id === contestId);
      console.log('MobileContestDetail - foundContest:', foundContest);
      if (foundContest) {
        setContest(foundContest);
      }
    }
  }, [contests, contestId]);

  // Check if contest has ended
  const contestEndDate = contest ? new Date(contest.endDate) : null;
  const now = new Date();
  const hasEnded = contestEndDate ? contestEndDate < now || contest.status !== 'active' : false;

  if (isLoading || photosLoading) {
    return (
      <div className="h-full bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-500">Cargando información del concurso...</p>
        </div>
      </div>
    );
  }

  if (!contest) {
    return (
      <div className="h-full bg-white flex flex-col">
        <div className="bg-blue-600 text-white px-4 py-4">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onNavigate('contests')}
              className="text-white hover:bg-blue-700 mr-3 p-2"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-lg font-semibold">Concurso no encontrado</h1>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-500">No se pudo encontrar el concurso solicitado</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-white flex flex-col">
      {/* Header */}
      <div className="bg-blue-600 text-white px-4 py-4 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onNavigate('contests')}
              className="text-white hover:bg-blue-700 mr-3 p-2"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-lg font-semibold">Detalles del Concurso</h1>
          </div>
          <SocialShareButtons 
            url={window.location.href}
            title={contest.title}
            imageUrl={contest.imageUrl}
          />
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Contest Image */}
        <div className="relative">
          <img 
            src={contest.imageUrl}
            alt={contest.title}
            className="w-full h-48 object-cover"
          />
          <div className="absolute top-3 right-3">
            <Badge className={contest.status === 'active' && !hasEnded ? "bg-green-500 text-white" : "bg-gray-500 text-white"}>
              {hasEnded ? "Finalizado" : contest.status === 'active' ? "Activo" : "Pendiente"}
            </Badge>
          </div>
        </div>

        <div className="p-4 space-y-6">
          {/* Contest Title and Basic Info */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{contest.title}</h2>
            <p className="text-gray-600 mb-4">{contest.description}</p>
            
            <div className="space-y-3">
              <div className="flex items-center text-gray-600">
                <MapPin className="h-5 w-5 mr-3" />
                <span>{contest.location}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Calendar className="h-5 w-5 mr-3" />
                <span>Termina el {new Date(contest.endDate).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center">
                <Trophy className="h-5 w-5 mr-3 text-green-600" />
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-3 py-2 rounded-lg border border-green-200 flex-1">
                  <span className="text-green-800 font-semibold">Premio: {contest.prize}</span>
                </div>
              </div>
              <div className="flex items-center text-gray-600">
                <Users className="h-5 w-5 mr-3" />
                <span>{approvedPhotos.length} fotos participantes</span>
              </div>
            </div>
          </div>

          {/* Organizer Info */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <Building2 className="h-5 w-5 mr-2 text-blue-600" />
              <h3 className="font-semibold text-gray-900">Organizador</h3>
            </div>
            <p className="text-gray-600">{contest.organizer}</p>
          </div>

          {/* Contest Rules */}
          <div className="bg-blue-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Reglas del Concurso</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Las fotos deben ser originales y de tu autoría</li>
              <li>• Usuarios gratuitos: 1 foto por concurso. Usuarios PREMIUM: hasta 3 fotos por concurso</li>
              <li>• La foto debe estar relacionada con el tema del concurso</li>
              <li>• No se permiten ediciones excesivas</li>
              <li>• Las fotos deben cumplir con las normas de la comunidad</li>
            </ul>
          </div>


          {/* Action Buttons */}
          <div className="space-y-3 pb-6">
            {!hasEnded ? (
              <Button 
                onClick={() => onNavigate('upload', contestId)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
              >
                <Camera className="h-5 w-5 mr-2" />
                Participar en el Concurso
              </Button>
            ) : (
              <Button 
                disabled
                className="w-full bg-gray-400 text-white py-3 cursor-not-allowed"
              >
                <Camera className="h-5 w-5 mr-2" />
                Concurso Finalizado
              </Button>
            )}
            
            <div className="grid grid-cols-2 gap-3">
              <Button 
                onClick={() => onNavigate('voting', contestId)}
                variant="outline"
                className="py-3"
              >
                Ver Fotos ({approvedPhotos.length})
              </Button>
              <Button 
                onClick={() => onNavigate('vote', contestId)}
                variant="outline"
                className="py-3 bg-purple-50 text-purple-600 border-purple-200 hover:bg-purple-100"
              >
                <Vote className="h-4 w-4 mr-2" />
                Votar
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileContestDetail;
