import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MapPin, Camera } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NearbyContestsSection = () => {
  const [location, setLocation] = useState<string>("Madrid, España");
  const navigate = useNavigate();

  const handleViewContests = () => {
    navigate("/contests");
  };

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // In a real app, you would reverse geocode these coordinates
          setLocation("Tu ubicación actual");
        },
        () => {
          // Keep default location if geolocation fails
          setLocation("Madrid, España");
        }
      );
    }
  }, []);

  return (
    <section className="py-16 bg-gradient-to-r from-primary/10 to-secondary/10">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Concursos cerca de ti
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Descubre concursos de fotografía en tu área y participa desde tu ubicación actual
          </p>
          
          <div className="flex items-center justify-center gap-2 mb-8 text-gray-700">
            <MapPin className="h-5 w-5 text-primary" />
            <span className="font-medium">{location}</span>
          </div>

          <Button
            size="lg"
            onClick={handleViewContests}
            className="bg-primary hover:bg-primary/80 text-white px-8 py-4 text-lg font-semibold transition-colors duration-200"
          >
            <Camera className="mr-2 h-5 w-5" />
            CONCURSOS CERCA DE TI
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default NearbyContestsSection;
