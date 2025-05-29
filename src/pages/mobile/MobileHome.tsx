
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Camera, Award, Users, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

const MobileHome = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  
  const heroImages = [
    "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  const features = [
    {
      icon: Camera,
      title: "Sube Fotos",
      description: "Comparte tus mejores capturas"
    },
    {
      icon: Award,
      title: "Compite",
      description: "Participa en concursos locales"
    },
    {
      icon: Users,
      title: "Vota",
      description: "Apoya a otros fotógrafos"
    },
    {
      icon: TrendingUp,
      title: "Gana",
      description: "Obtén reconocimiento y premios"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        <div className="absolute inset-0">
          {heroImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                activeSlide === index ? "opacity-100" : "opacity-0"
              }`}
            >
              <img
                src={image}
                alt="Hero"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = "/placeholder.svg";
                }}
              />
              <div className="absolute inset-0 bg-black/50" />
            </div>
          ))}
        </div>
        
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl font-bold mb-4 leading-tight">
              Concursos Fotográficos
            </h1>
            <p className="text-xl mb-8 opacity-90">
              Participa, vota y gana cerca de ti
            </p>
            
            <div className="space-y-4">
              <Button 
                asChild 
                size="lg" 
                className="w-full max-w-xs bg-white text-[#4891AA] hover:bg-white/90 font-bold text-lg py-6 rounded-full"
              >
                <Link to="/contests">
                  <Award className="mr-2 h-5 w-5" />
                  Ver Concursos
                </Link>
              </Button>
              
              <Button 
                asChild 
                variant="outline" 
                size="lg" 
                className="w-full max-w-xs border-white text-white hover:bg-white hover:text-[#4891AA] font-bold text-lg py-6 rounded-full"
              >
                <Link to="/register">
                  <Camera className="mr-2 h-5 w-5" />
                  Comenzar
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Slide indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
          {heroImages.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-colors ${
                activeSlide === index ? "bg-white" : "bg-white/50"
              }`}
              onClick={() => setActiveSlide(index)}
            />
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6">
        <div className="max-w-lg mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            ¿Cómo funciona?
          </h2>
          
          <div className="grid grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="text-center p-6 h-full border-2 hover:border-[#4891AA] transition-colors">
                  <CardContent className="p-0">
                    <div className="w-16 h-16 bg-[#4891AA]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <feature.icon className="h-8 w-8 text-[#4891AA]" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-[#4891AA]">
        <div className="max-w-lg mx-auto text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            ¡Únete a la comunidad!
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Descubre concursos fotográficos cerca de ti
          </p>
          
          <Button 
            asChild 
            size="lg" 
            className="w-full max-w-xs bg-white text-[#4891AA] hover:bg-white/90 font-bold text-lg py-6 rounded-full"
          >
            <Link to="/register">
              Registrarse Gratis
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default MobileHome;
