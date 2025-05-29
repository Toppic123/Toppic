
import { motion } from "framer-motion";
import { Calendar, MapPin, Users, Trophy, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const PrototypeContests = () => {
  const mockContests = [
    {
      id: 1,
      title: "Festival de Primavera Barcelona",
      location: "Barcelona, España",
      startDate: "15 Mar 2024",
      endDate: "15 Abr 2024",
      participants: 234,
      prize: "500€",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
      status: "Activo",
      category: "Naturaleza"
    },
    {
      id: 2,
      title: "Street Photography Madrid",
      location: "Madrid, España",
      startDate: "1 Abr 2024",
      endDate: "30 Abr 2024",
      participants: 187,
      prize: "300€",
      image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308",
      status: "Activo",
      category: "Urbana"
    },
    {
      id: 3,
      title: "Retratos Humanos Valencia",
      location: "Valencia, España",
      startDate: "10 Mar 2024",
      endDate: "10 Abr 2024",
      participants: 156,
      prize: "400€",
      image: "https://images.unsplash.com/photo-1576377999785-cf30a129e0da",
      status: "Finalizando",
      category: "Retrato"
    },
    {
      id: 4,
      title: "Arquitectura Moderna Bilbao",
      location: "Bilbao, España",
      startDate: "5 Abr 2024",
      endDate: "5 May 2024",
      participants: 98,
      prize: "350€",
      image: "https://images.unsplash.com/photo-1493397212122-2b85dda8106b",
      status: "Próximamente",
      category: "Arquitectura"
    }
  ];

  const categories = ["Todos", "Naturaleza", "Urbana", "Retrato", "Arquitectura", "Eventos"];

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold mb-4 text-gray-900">Concursos Fotográficos</h1>
        <p className="text-xl text-gray-600">Descubre y participa en concursos cerca de ti</p>
      </motion.div>

      {/* Filtros de categorías */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-wrap justify-center gap-2 mb-8"
      >
        {categories.map((category, index) => (
          <Button
            key={category}
            variant={index === 0 ? "default" : "outline"}
            size="sm"
            className={index === 0 ? "bg-[#4891AA] hover:bg-[#3a7a8b]" : "border-[#4891AA]/30 text-[#4891AA] hover:bg-[#4891AA]/10"}
          >
            {category}
          </Button>
        ))}
      </motion.div>

      {/* Grid de concursos */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {mockContests.map((contest, index) => (
          <motion.div
            key={contest.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
          >
            <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={`${contest.image}?auto=format&fit=crop&w=600&q=80`}
                  alt={contest.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3">
                  <Badge
                    variant={contest.status === "Activo" ? "default" : contest.status === "Finalizando" ? "destructive" : "secondary"}
                    className={contest.status === "Activo" ? "bg-green-500" : ""}
                  >
                    {contest.status}
                  </Badge>
                </div>
                <div className="absolute top-3 right-3">
                  <Badge variant="secondary" className="bg-white/90 text-gray-700">
                    {contest.category}
                  </Badge>
                </div>
              </div>
              
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2 group-hover:text-[#4891AA] transition-colors">
                  {contest.title}
                </h3>
                
                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm">{contest.location}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm">{contest.startDate} - {contest.endDate}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Users className="h-4 w-4" />
                      <span className="text-sm">{contest.participants} participantes</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-[#4891AA] font-bold">
                      <Trophy className="h-4 w-4" />
                      <span className="text-sm">{contest.prize}</span>
                    </div>
                  </div>
                </div>
                
                <Button className="w-full bg-[#4891AA] hover:bg-[#3a7a8b]">
                  Ver Detalles
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Sección de estadísticas */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-16 bg-gradient-to-r from-[#4891AA] to-blue-600 rounded-2xl p-8 text-white text-center"
      >
        <h2 className="text-3xl font-bold mb-6">¿Listo para participar?</h2>
        <p className="text-xl mb-8 opacity-90">
          Únete a miles de fotógrafos y compite por increíbles premios
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="text-3xl font-bold mb-2">150+</div>
            <div className="opacity-90">Concursos Activos</div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-2">€50K+</div>
            <div className="opacity-90">En Premios</div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-2">5K+</div>
            <div className="opacity-90">Fotógrafos</div>
          </div>
        </div>
        <Button size="lg" variant="secondary" className="bg-white text-[#4891AA] hover:bg-gray-100">
          Comenzar Ahora
        </Button>
      </motion.div>
    </div>
  );
};

export default PrototypeContests;
