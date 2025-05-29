
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface OrganizerSectionProps {
  texts: {
    organizerTitle: string;
    organizerDesc: string;
    discoverPlans: string;
  };
}

const OrganizerSection = ({ texts }: OrganizerSectionProps) => {
  return (
    <section className="py-24 bg-gradient-to-b from-white via-primary/5 to-white dark:from-gray-950 dark:via-primary/10 dark:to-gray-950">
      <div className="container max-w-7xl mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-4xl font-bold mb-4 tracking-tight">{texts.organizerTitle}</h2>
          <div className="h-1 bg-gradient-to-r from-primary to-blue-600 rounded w-24 mb-8 mx-auto"></div>
          
          <p className="text-xl mb-8 leading-relaxed max-w-3xl mx-auto">
            {texts.organizerDesc}
          </p>
          
          <Button asChild size="lg" className="rounded-full px-8 bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-700 shadow-lg">
            <Link to="/organizers">{texts.discoverPlans}</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default OrganizerSection;
