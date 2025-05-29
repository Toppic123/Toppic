
import { motion } from "framer-motion";
import { Camera, Trophy, Users, MapPin, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const PrototypeHome = () => {
  const features = [
    {
      icon: Camera,
      title: "Concursos Fotográficos",
      description: "Participa en concursos cerca de ti",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Trophy,
      title: "Gana Premios",
      description: "Compite y gana increíbles premios",
      color: "from-amber-500 to-orange-500"
    },
    {
      icon: Users,
      title: "Comunidad",
      description: "Conecta con otros fotógrafos",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: MapPin,
      title: "Geolocalizado",
      description: "Encuentra eventos cerca de ti",
      color: "from-green-500 to-emerald-500"
    }
  ];

  const mockPhotos = [
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    "https://images.unsplash.com/photo-1519125323398-675f0ddb6308",
    "https://images.unsplash.com/photo-1576377999785-cf30a129e0da",
    "https://images.unsplash.com/photo-1492684223066-81342ee5ff30"
  ];

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-[#4891AA] to-blue-600 bg-clip-text text-transparent">
          TOPPICS
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
          La plataforma de concursos fotográficos geolocalizados más innovadora
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-[#4891AA] hover:bg-[#3a7a8b] rounded-full px-8 py-6 text-lg">
            <Camera className="mr-2 h-5 w-5" />
            Explorar Concursos
          </Button>
          <Button variant="outline" size="lg" className="border-[#4891AA] text-[#4891AA] rounded-full px-8 py-6 text-lg">
            Ver Galería
          </Button>
        </div>
      </motion.div>

      {/* Features Grid */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
      >
        {features.map((feature, index) => (
          <Card key={feature.title} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6 text-center">
              <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${feature.color} flex items-center justify-center`}>
                <feature.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      {/* Mock Gallery Preview */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mb-16"
      >
        <h2 className="text-3xl font-bold text-center mb-8">Fotos Ganadoras Recientes</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {mockPhotos.map((photo, index) => (
            <div key={index} className="relative group cursor-pointer">
              <img
                src={`${photo}?auto=format&fit=crop&w=400&q=80`}
                alt={`Foto ganadora ${index + 1}`}
                className="w-full h-48 object-cover rounded-lg transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
                <div className="absolute bottom-3 left-3 text-white">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">Ganadora</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Stats Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="bg-white rounded-2xl p-8 shadow-lg"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-[#4891AA] mb-2">150+</div>
            <div className="text-gray-600">Concursos Activos</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-[#4891AA] mb-2">5K+</div>
            <div className="text-gray-600">Fotógrafos Registrados</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-[#4891AA] mb-2">25K+</div>
            <div className="text-gray-600">Fotos Subidas</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PrototypeHome;
