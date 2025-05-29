
import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, MapPin, Calendar, Users, Trophy } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const MobileContests = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data for contests
  const contests = [
    {
      id: 1,
      title: "Paisajes Urbanos Madrid",
      location: "Madrid, España",
      startDate: "2024-06-01",
      endDate: "2024-06-30",
      participants: 156,
      prize: "€500",
      status: "active",
      image: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
    },
    {
      id: 2,
      title: "Retratos Callejeros",
      location: "Barcelona, España", 
      startDate: "2024-06-15",
      endDate: "2024-07-15",
      participants: 89,
      prize: "€300",
      status: "active",
      image: "https://images.unsplash.com/photo-1494790108755-2616c120e87f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
    },
    {
      id: 3,
      title: "Naturaleza Salvaje",
      location: "Valencia, España",
      startDate: "2024-07-01",
      endDate: "2024-07-31",
      participants: 234,
      prize: "€750",
      status: "soon",
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
    },
    {
      id: 4,
      title: "Arquitectura Moderna",
      location: "Sevilla, España",
      startDate: "2024-05-01",
      endDate: "2024-05-31",
      participants: 67,
      prize: "€400",
      status: "finished",
      image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
    }
  ];

  const filteredContests = contests.filter(contest =>
    contest.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contest.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500 text-white">Activo</Badge>;
      case "soon":
        return <Badge className="bg-blue-500 text-white">Próximamente</Badge>;
      case "finished":
        return <Badge className="bg-gray-500 text-white">Finalizado</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">
      <div className="max-w-lg mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Concursos Fotográficos
        </h1>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Buscar concursos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Contest List */}
        <div className="space-y-4">
          {filteredContests.map((contest) => (
            <Link key={contest.id} to={`/contests/${contest.id}`}>
              <Card className="overflow-hidden hover:shadow-md transition-shadow">
                <div className="relative h-48">
                  <img
                    src={contest.image}
                    alt={contest.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder.svg";
                    }}
                  />
                  <div className="absolute top-3 right-3">
                    {getStatusBadge(contest.status)}
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-bold text-lg mb-2">{contest.title}</h3>
                  
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2" />
                      {contest.location}
                    </div>
                    
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      {new Date(contest.startDate).toLocaleDateString()} - {new Date(contest.endDate).toLocaleDateString()}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-2" />
                        {contest.participants} participantes
                      </div>
                      <div className="flex items-center text-[#4891AA] font-semibold">
                        <Trophy className="h-4 w-4 mr-1" />
                        {contest.prize}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {filteredContests.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No se encontraron concursos.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileContests;
