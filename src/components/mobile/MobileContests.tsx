
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Calendar, Trophy, Camera } from "lucide-react";

interface MobileContestsProps {
  onNavigate: (screen: 'upload' | 'voting') => void;
}

const mockContests = [
  {
    id: 1,
    title: "Primavera en Barcelona",
    location: "Barcelona",
    distance: "0.5 km",
    endDate: "2025-04-15",
    participants: 45,
    prize: "500€",
    image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=400"
  },
  {
    id: 2,
    title: "Arquitectura Urbana",
    location: "Madrid",
    distance: "1.2 km",
    endDate: "2025-03-30",
    participants: 32,
    prize: "300€",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400"
  },
  {
    id: 3,
    title: "Vida en la Playa",
    location: "Valencia",
    distance: "3.4 km",
    endDate: "2025-05-01",
    participants: 67,
    prize: "750€",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400"
  }
];

const MobileContests = ({ onNavigate }: MobileContestsProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="h-full bg-gray-50 overflow-y-auto">
      {/* Header */}
      <div className="bg-white px-4 py-4 border-b border-gray-200">
        <h1 className="text-xl font-semibold text-gray-900 mb-3">Concursos</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Buscar concursos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Filters */}
      <div className="px-4 py-3 bg-white border-b border-gray-200">
        <div className="flex space-x-2 overflow-x-auto">
          <Badge variant="default" className="whitespace-nowrap">Cerca de ti</Badge>
          <Badge variant="outline" className="whitespace-nowrap">Terminan pronto</Badge>
          <Badge variant="outline" className="whitespace-nowrap">Nuevos</Badge>
          <Badge variant="outline" className="whitespace-nowrap">Populares</Badge>
        </div>
      </div>

      {/* Contests List */}
      <div className="p-4 space-y-4">
        {mockContests.map((contest) => (
          <div key={contest.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="relative">
              <img 
                src={contest.image} 
                alt={contest.title}
                className="w-full h-40 object-cover"
              />
              <div className="absolute top-3 right-3">
                <Badge className="bg-green-500 text-white">Activo</Badge>
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="font-semibold text-lg text-gray-900 mb-2">{contest.title}</h3>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-gray-600 text-sm">
                  <MapPin className="h-4 w-4 mr-2" />
                  {contest.location} • {contest.distance}
                </div>
                <div className="flex items-center text-gray-600 text-sm">
                  <Calendar className="h-4 w-4 mr-2" />
                  Termina el {new Date(contest.endDate).toLocaleDateString()}
                </div>
                <div className="flex items-center text-gray-600 text-sm">
                  <Trophy className="h-4 w-4 mr-2" />
                  Premio: {contest.prize}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">{contest.participants} participantes</span>
                <div className="flex space-x-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => onNavigate('voting')}
                  >
                    Ver fotos
                  </Button>
                  <Button 
                    size="sm"
                    onClick={() => onNavigate('upload')}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Camera className="h-4 w-4 mr-1" />
                    Participar
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MobileContests;
