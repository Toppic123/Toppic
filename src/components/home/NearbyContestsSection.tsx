
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import Map from "@/components/Map";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface NearbyContestsSectionProps {
  texts: {
    nearbyContests: string;
    nearbyContestsDesc: string;
  };
}

const NearbyContestsSection = ({ texts }: NearbyContestsSectionProps) => {
  const navigate = useNavigate();
  
  return (
    <section className="py-16 px-4 bg-white">
      <div className="container max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">{texts.nearbyContests}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            {texts.nearbyContestsDesc}
          </p>
          
          <Button 
            onClick={() => navigate('/contests')}
            className="rounded-full bg-[#FEF7CD] text-black hover:bg-[#F5D64E] border border-[#F5D64E]"
          >
            <Search className="mr-2 h-4 w-4" />
            <span>CONCURSOS CERCANOS</span>
          </Button>
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
