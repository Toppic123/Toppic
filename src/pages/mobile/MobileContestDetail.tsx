
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, MapPin, Calendar, Users, Trophy, Camera, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const MobileContestDetail = () => {
  const { id } = useParams();

  // Mock contest data - in real app this would come from an API
  const contest = {
    id: 1,
    title: "Paisajes Urbanos Madrid",
    description: "Captura la esencia de Madrid a través de sus paisajes urbanos. Desde rascacielos modernos hasta calles históricas, muestra la diversidad arquitectónica de la capital.",
    location: "Madrid, España",
    startDate: "2024-06-01",
    endDate: "2024-06-30",
    participants: 156,
    prize: "€500",
    status: "active",
    image: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    rules: [
      "Las fotos deben ser tomadas dentro de Madrid",
      "Máximo 3 fotografías por participante",
      "Formato JPG o PNG, mínimo 2MP",
      "No se permiten filtros excesivos"
    ],
    submissions: [
      {
        id: 1,
        image: "https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
        photographer: "Ana García",
        likes: 42
      },
      {
        id: 2,
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
        photographer: "Carlos López",
        likes: 38
      },
      {
        id: 3,
        image: "https://images.unsplash.com/photo-1529958030586-3aae4ca485ff?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
        photographer: "María Rodríguez",
        likes: 35
      }
    ]
  };

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
    <div className="min-h-screen bg-gray-50">
      {/* Header Image */}
      <div className="relative h-64">
        <img
          src={contest.image}
          alt={contest.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = "/placeholder.svg";
          }}
        />
        <div className="absolute inset-0 bg-black/30" />
        
        {/* Back Button */}
        <Link
          to="/contests"
          className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm rounded-full p-2 text-white"
        >
          <ArrowLeft className="h-6 w-6" />
        </Link>
        
        {/* Status Badge */}
        <div className="absolute top-4 right-4">
          {getStatusBadge(contest.status)}
        </div>
      </div>

      <div className="px-4 py-6 max-w-lg mx-auto">
        {/* Contest Info */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {contest.title}
          </h1>
          
          <div className="space-y-3 text-sm text-gray-600 mb-4">
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

          <p className="text-gray-700 leading-relaxed mb-6">
            {contest.description}
          </p>

          {/* Participate Button */}
          {contest.status === "active" && (
            <Button 
              asChild
              className="w-full bg-[#4891AA] hover:bg-[#4891AA]/90 text-white py-6 text-lg font-medium mb-6"
            >
              <Link to="/upload">
                <Camera className="mr-2 h-5 w-5" />
                Participar
              </Link>
            </Button>
          )}
        </div>

        {/* Rules */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <h3 className="font-bold text-lg mb-3">Reglas del Concurso</h3>
            <ul className="space-y-2">
              {contest.rules.map((rule, index) => (
                <li key={index} className="flex items-start">
                  <span className="w-2 h-2 bg-[#4891AA] rounded-full mt-2 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">{rule}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Submissions Gallery */}
        <div>
          <h3 className="font-bold text-lg mb-4">Participaciones Destacadas</h3>
          <div className="grid grid-cols-1 gap-4">
            {contest.submissions.map((submission) => (
              <Card key={submission.id} className="overflow-hidden">
                <div className="relative">
                  <img
                    src={submission.image}
                    alt={`Foto de ${submission.photographer}`}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder.svg";
                    }}
                  />
                </div>
                <CardContent className="p-3">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{submission.photographer}</span>
                    <div className="flex items-center text-red-500">
                      <Heart className="h-4 w-4 mr-1" />
                      {submission.likes}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileContestDetail;
