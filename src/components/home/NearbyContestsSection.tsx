
import { motion } from "framer-motion";
import Map from "@/components/Map";
import { Search } from "lucide-react";

interface NearbyContestsSectionProps {
  texts: {
    nearbyContests: string;
    nearbyContestsDesc: string;
  };
}

const NearbyContestsSection = ({ texts }: NearbyContestsSectionProps) => {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="container max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">{texts.nearbyContests}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {texts.nearbyContestsDesc}
          </p>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-8 relative"
        >
          <Map showMustardButton={true} />
          
          {/* Botón animado de CONCURSOS CERCANOS */}
          <motion.div
            className="absolute bottom-8 right-8"
            initial={{ scale: 1 }}
            animate={{ 
              scale: [1, 1.05, 1],
              boxShadow: [
                "0px 4px 12px rgba(0, 0, 0, 0.1)",
                "0px 6px 16px rgba(0, 0, 0, 0.15)",
                "0px 4px 12px rgba(0, 0, 0, 0.1)"
              ]
            }}
            transition={{
              repeat: Infinity,
              repeatType: "reverse",
              duration: 1.5,
            }}
          >
            <button className="bg-[#FFC72C] text-black font-medium flex items-center justify-center gap-2 px-6 py-4 rounded-full shadow-lg hover:bg-[#FFD54F] transition-all duration-300">
              <Search className="w-5 h-5" />
              <span>CONCURSOS CERCANOS</span>
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default NearbyContestsSection;
