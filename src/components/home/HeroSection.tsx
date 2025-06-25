
import { Button } from "@/components/ui/button";
import { Trophy, Star, Users, MapPin, Camera } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 text-white py-24 px-4 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.1\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"2\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
      
      <div className="container mx-auto text-center relative z-10">
        <div className="mb-8">
          <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 mb-6">
            <Trophy className="h-5 w-5 mr-2 text-yellow-300" />
            <span className="text-sm font-medium">Plataforma de concursos fotográficos</span>
          </div>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
          TopPics
        </h1>
        
        <p className="text-xl md:text-2xl mb-8 text-cyan-100 max-w-3xl mx-auto leading-relaxed">
          Compite, vota y descubre las mejores fotografías en concursos temáticos. 
          Únete a nuestra comunidad de fotógrafos y demuestra tu talento.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Link to="/contests">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-cyan-50 font-semibold px-8 py-4 text-lg transition-all duration-200 transform hover:scale-105">
              <Camera className="mr-2 h-5 w-5" />
              Explorar Concursos
            </Button>
          </Link>
          <Link to="/mobile">
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-semibold px-8 py-4 text-lg transition-all duration-200 transform hover:scale-105"
            >
              📱 APP
            </Button>
          </Link>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Users className="h-6 w-6 mr-2 text-cyan-300" />
              <span className="text-3xl font-bold">1,234</span>
            </div>
            <p className="text-cyan-200">Fotógrafos activos</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Camera className="h-6 w-6 mr-2 text-cyan-300" />
              <span className="text-3xl font-bold">5,678</span>
            </div>
            <p className="text-cyan-200">Fotos subidas</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Star className="h-6 w-6 mr-2 text-cyan-300" />
              <span className="text-3xl font-bold">890</span>
            </div>
            <p className="text-cyan-200">Concursos realizados</p>
          </div>
        </div>
      </div>
      
      {/* Floating elements */}
      <div className="absolute top-20 left-10 opacity-20">
        <Camera className="h-16 w-16 text-white animate-float" />
      </div>
      <div className="absolute bottom-20 right-10 opacity-20">
        <Trophy className="h-12 w-12 text-yellow-300 animate-float" style={{ animationDelay: '1s' }} />
      </div>
    </section>
  );
};

export default HeroSection;
