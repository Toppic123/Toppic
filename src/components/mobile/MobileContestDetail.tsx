
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, Calendar, Trophy, Users, Camera, Vote, Share2 } from "lucide-react";
import { useContestsData } from "@/hooks/useContestsData";
import SocialShareButtons from "@/components/SocialShareButtons";

interface MobileContestDetailProps {
  contestId: string;
  onNavigate: (screen: 'contests' | 'upload' | 'voting' | 'vote') => void;
}

const MobileContestDetail = ({ contestId, onNavigate }: MobileContestDetailProps) => {
  const { contests, isLoading } = useContestsData();
  const [contest, setContest] = useState<any>(null);

  useEffect(() => {
    if (contests.length > 0) {
      const foundContest = contests.find(c => c.id === contestId);
      if (foundContest) {
        setContest(foundContest);
      }
    }
  }, [contests, contestId]);

  if (isLoading) {
    return (
      <div className="h-full bg-white flex items-center justify-center">
        <p className="text-gray-500">Cargando información del concurso...</p>
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
            <Badge className={contest.isActive ? "bg-green-500 text-white" : "bg-gray-500 text-white"}>
              {contest.isActive ? "Activo" : "Finalizado"}
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
              <div className="flex items-center text-gray-600">
                <Trophy className="h-5 w-5 mr-3" />
                <span>Premio: {contest.prize}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Users className="h-5 w-5 mr-3" />
                <span>{contest.participants} participantes</span>
              </div>
            </div>
          </div>

          {/* Organizer Info */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Organizador</h3>
            <p className="text-gray-600">{contest.organizer}</p>
          </div>

          {/* Contest Rules */}
          <div className="bg-blue-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Reglas del Concurso</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Las fotos deben ser originales y de tu autoría</li>
              <li>• Solo se permite una foto por participante</li>
              <li>• La foto debe estar relacionada con el tema del concurso</li>
              <li>• No se permiten ediciones excesivas</li>
              <li>• Las fotos deben cumplir con las normas de la comunidad</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pb-6">
            <Button 
              onClick={() => onNavigate('upload')}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
            >
              <Camera className="h-5 w-5 mr-2" />
              Participar en el Concurso
            </Button>
            
            <div className="grid grid-cols-2 gap-3">
              <Button 
                onClick={() => onNavigate('voting')}
                variant="outline"
                className="py-3"
              >
                Ver Fotos
              </Button>
              <Button 
                onClick={() => onNavigate('vote')}
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
