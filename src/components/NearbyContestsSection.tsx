
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import Map from "@/components/Map";

interface NearbyContestsSectionProps {
  texts: {
    nearbyContests: string;
    nearbyContestsDesc: string;
  };
}

const NearbyContestsSection = ({ texts }: NearbyContestsSectionProps) => {
  return (
    <section className="py-16 px-4 bg-gradient-to-b from-white to-gray-50 dark:from-background dark:to-gray-900/20">
      <div className="container max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4 text-primary">{texts.nearbyContests}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {texts.nearbyContestsDesc}
          </p>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-8 relative rounded-xl overflow-hidden shadow-lg"
        >
          <div className="absolute z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <motion.button 
              className="flex items-center justify-center bg-white hover:bg-gray-50 text-primary font-medium px-6 py-3 rounded-full shadow-lg border border-primary/20"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={{ 
                boxShadow: ["0px 0px 0px rgba(72, 145, 170, 0)", "0px 0px 15px rgba(72, 145, 170, 0.7)", "0px 0px 0px rgba(72, 145, 170, 0)"],
              }}
              transition={{
                boxShadow: {
                  repeat: Infinity,
                  duration: 2
                }
              }}
            >
              <MapPin className="w-5 h-5 mr-2" />
              <span>Concursos cercanos</span>
            </motion.button>
          </div>
          <div className="rounded-xl overflow-hidden border border-gray-200">
            <Map />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default NearbyContestsSection;
