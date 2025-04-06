
import { motion } from "framer-motion";
import Map from "@/components/Map";

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
          className="mt-8"
        >
          <Map />
        </motion.div>
      </div>
    </section>
  );
};

export default NearbyContestsSection;
