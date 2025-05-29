
import { motion } from "framer-motion";
import { MapPin, Filter, Search, Navigation, Camera, Clock, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const PrototypeMap = () => {
  const mockContests = [
    {
      id: 1,
      title: "Festival Primavera BCN",
      location: "Barcelona",
      lat: 41.3851,
      lng: 2.1734,
      distance: "2.3 km",
      participants: 156,
      endDate: "15 días",
      prize: "500€",
      category: "Eventos"
    },
    {
      id: 2,
      title: "Street Art Madrid",
      location: "Madrid",
      lat: 40.4168,
      lng: -3.7038,
      distance: "1.8 km",
      participants: 89,
      endDate: "8 días",
      prize: "300€",
      category: "Urbana"
    },
    {
      id: 3,
      title: "Naturaleza Valencia",
      location: "Valencia",
      lat: 39.4699,
      lng: -0.3763,
      distance: "5.2 km",
      participants: 234,
      endDate: "22 días",
      prize: "400€",
      category: "Naturaleza"
    }
  ];

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold mb-4 text-gray-900">Mapa de Concursos</h1>
        <p className="text-xl text-gray-600">Descubre concursos fotográficos cerca de tu ubicación</p>
      </motion.div>

      {/* Controles del mapa */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-lg p-4 shadow-lg mb-6"
      >
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar por ubicación o nombre del concurso..."
              className="pl-10"
            />
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="border-[#4891AA]/30 text-[#4891AA]">
              <Filter className="h-4 w-4 mr-2" />
              Filtros
            </Button>
            <Button size="sm" className="bg-[#4891AA] hover:bg-[#3a7a8b]">
              <Navigation className="h-4 w-4 mr-2" />
              Mi ubicación
            </Button>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Mapa simulado */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2"
        >
          <Card className="h-[600px] overflow-hidden">
            <div className="relative w-full h-full bg-gradient-to-br from-blue-100 to-green-100">
              {/* Mapa simulado con marcadores */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-16 w-16 text-[#4891AA] mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Vista del Mapa</h3>
                  <p className="text-gray-600 max-w-md">
                    Aquí se mostraría un mapa interactivo con la ubicación de todos los concursos disponibles.
                  </p>
                </div>
              </div>
              
              {/* Marcadores simulados */}
              <div className="absolute top-20 left-20 transform">
                <div className="bg-[#4891AA] text-white rounded-full p-2 shadow-lg animate-pulse">
                  <Camera className="h-4 w-4" />
                </div>
              </div>
              
              <div className="absolute top-40 right-32 transform">
                <div className="bg-green-500 text-white rounded-full p-2 shadow-lg animate-pulse">
                  <Camera className="h-4 w-4" />
                </div>
              </div>
              
              <div className="absolute bottom-32 left-32 transform">
                <div className="bg-amber-500 text-white rounded-full p-2 shadow-lg animate-pulse">
                  <Camera className="h-4 w-4" />
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Lista de concursos */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-4"
        >
          <div className="bg-white rounded-lg p-4 shadow-lg">
            <h3 className="text-lg font-bold mb-4">Concursos Cercanos</h3>
            <div className="space-y-3">
              {mockContests.map((contest, index) => (
                <motion.div
                  key={contest.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer group"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-bold text-sm group-hover:text-[#4891AA] transition-colors">
                      {contest.title}
                    </h4>
                    <Badge variant="outline" className="text-xs">
                      {contest.category}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-1 text-gray-600 mb-2">
                    <MapPin className="h-3 w-3" />
                    <span className="text-xs">{contest.location} • {contest.distance}</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-xs text-gray-500 mb-3">
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      <span>{contest.participants} participantes</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{contest.endDate}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-[#4891AA] font-bold text-sm">Premio: {contest.prize}</span>
                    <Button size="sm" variant="outline" className="h-6 text-xs px-3">
                      Ver detalles
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Estadísticas de la zona */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-gradient-to-r from-[#4891AA] to-blue-600 rounded-lg p-6 text-white"
          >
            <h3 className="text-lg font-bold mb-4">En tu zona</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="opacity-90">Concursos activos:</span>
                <span className="font-bold">12</span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-90">Fotógrafos cerca:</span>
                <span className="font-bold">1,247</span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-90">Fotos subidas hoy:</span>
                <span className="font-bold">89</span>
              </div>
            </div>
          </motion.div>

          {/* Filtros rápidos */}
          <div className="bg-white rounded-lg p-4 shadow-lg">
            <h3 className="text-lg font-bold mb-4">Filtros Rápidos</h3>
            <div className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start border-[#4891AA]/30 text-[#4891AA]">
                📸 Fotografía Urbana
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                🌿 Naturaleza
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                👥 Retratos
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                🎭 Eventos
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                🏛️ Arquitectura
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PrototypeMap;
