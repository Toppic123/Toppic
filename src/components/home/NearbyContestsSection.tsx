
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface NearbyContestsSectionProps {
  texts: {
    nearbyContests: string;
    nearbyContestsDesc: string;
  };
}

const NearbyContestsSection = ({ texts }: NearbyContestsSectionProps) => {
  return (
    <section className="py-12 px-4 bg-white">
      <div className="container max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">{texts.nearbyContests}</h2>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="bg-muted rounded-lg overflow-hidden shadow-md mx-auto max-w-lg h-64"
        >
          <div className="relative w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/5 to-primary/10">
            <MapPin className="h-16 w-16 text-primary/30" />
            <div className="absolute inset-0 flex items-center justify-center bg-white/50 backdrop-blur-sm">
              <div className="text-center p-6">
                <p className="text-primary font-medium mb-2">Descubre concursos cerca de ti</p>
                <p className="text-sm text-muted-foreground mb-4">Utiliza el mapa para encontrar concursos en tu ubicación actual</p>
                <Button asChild size="sm" variant="outline" className="rounded-full">
                  <Link to="/contests?view=map">
                    <MapPin className="mr-2 h-3 w-3" />
                    <span>Explorar mapa</span>
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default NearbyContestsSection;
