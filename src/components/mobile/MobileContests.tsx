
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Users, Trophy, Share2 } from "lucide-react";
import { useContestsData } from "@/hooks/useContestsData";
import MobileContestDetail from "./MobileContestDetail";
import ContestBannerDisplay from "../contests/ContestBannerDisplay";

interface MobileContestsProps {
  onNavigate: (screen: 'contests' | 'upload' | 'vote' | 'voting', contestId?: string) => void;
}

// Function to clean contest titles by removing "FOTOGRAFIA" and similar words
const cleanContestTitle = (title: string): string => {
  if (!title) return 'Sin título';
  
  // Remove "FOTOGRAFIA", "FOTOGRAFÍA", "DE FOTOGRAFIA", etc. (case insensitive)
  const cleanedTitle = title
    .replace(/\b(de\s+)?fotograf[íi]a\b/gi, '')
    .replace(/\s+/g, ' ') // Replace multiple spaces with single space
    .trim();
  
  return cleanedTitle || 'Sin título';
};

const MobileContests = ({ onNavigate }: MobileContestsProps) => {
  const [selectedContest, setSelectedContest] = useState<any | null>(null);
  const { contests, isLoading } = useContestsData();
  
  console.log('MobileContests - contests:', contests);

  const handleContestClick = (contest: any) => {
    setSelectedContest(contest);
  };

  const handleShareContest = (contest: any, e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: cleanContestTitle(contest.title),
        text: contest.description,
        url: window.location.href
      });
    }
  };

  if (selectedContest) {
    return (
      <MobileContestDetail 
        contestId={selectedContest.id} 
        onNavigate={onNavigate}
      />
    );
  }

  return (
    <div className="h-full bg-gray-50 overflow-y-auto">
      {/* Header */}
      <div className="bg-white px-4 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">Concursos</h1>
          <Button
            variant="outline"
            size="sm"
            className="text-black hover:bg-gray-100 border-gray-300"
          >
            <Share2 size={16} />
          </Button>
        </div>
        <p className="text-sm text-gray-600 mt-1">
          Descubre y participa en concursos de fotografía
        </p>
      </div>


      {/* Contest List */}
      <div className="p-4">
        {isLoading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-500">Cargando concursos...</p>
          </div>
        ) : contests.length > 0 ? (
          <div className="space-y-4">
            {contests.map((contest) => (
              <div 
                key={contest.id} 
                className="bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer"
                onClick={() => handleContestClick(contest)}
              >
                {contest.imageUrl && (
                  <img 
                    src={contest.imageUrl} 
                    alt={cleanContestTitle(contest.title)}
                    className="w-full h-48 object-cover"
                  />
                )}
                
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-lg text-gray-900 flex-1 pr-2">
                      {cleanContestTitle(contest.title)}
                    </h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => handleShareContest(contest, e)}
                      className="text-black hover:bg-gray-100 p-1"
                    >
                      <Share2 size={16} />
                    </Button>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <MapPin size={14} />
                    <span>{contest.location}</span>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {contest.description}
                  </p>
                  
                  <div className="mb-3 p-2 bg-yellow-50 border border-yellow-200 rounded-md">
                    <p className="text-xs text-yellow-800">
                      ⚠️ Límite: Solo puedes subir una foto por concurso. (los usuarios PREMIUM pueden subir hasta 3 fotos por concurso)
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Users size={12} />
                        <span>{contest.participants} participantes</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span>💰</span>
                        <span>Premio: {contest.prize || "Por determinar"}</span>
                      </div>
                    </div>
                    <Badge className={contest.isActive ? "bg-green-500 text-white" : "bg-gray-500 text-white"}>
                      {contest.isActive ? "Activo" : "Finalizado"}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">No hay concursos disponibles</p>
            <Button onClick={() => onNavigate('upload')} className="bg-blue-600 hover:bg-blue-700">
              Crear primer concurso
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileContests;
