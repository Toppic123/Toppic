
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
    <section className="py-20 bg-white dark:bg-gray-950">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/2"
          >
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3" 
                alt="Personas disfrutando en un evento cultural" 
                className="rounded-xl w-full object-cover"
              />
              {/* Simplified call-to-action box */}
              <div className="absolute -bottom-8 -right-8 bg-gradient-to-r from-primary via-blue-600 to-purple-600 p-8 rounded-2xl text-white font-medium shadow-2xl border border-white/20 backdrop-blur-sm min-w-[240px]">
                <p className="text-2xl font-bold mb-2">¡Impulsa tu marca!</p>
                <span className="text-lg text-blue-100">Crece con nosotros</span>
                {/* Decorative elements */}
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full animate-pulse"></div>
                <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-pink-400 rounded-full"></div>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/2 text-center lg:text-left"
          >
            <h2 className="text-4xl font-bold mb-4 tracking-tight">{texts.organizerTitle}</h2>
            <div className="h-1 bg-primary rounded w-24 mb-8 mx-auto lg:mx-0"></div>
            
            <div className="bg-gradient-to-r from-primary via-blue-600 to-purple-600 bg-clip-text text-transparent mb-8">
              <p className="text-2xl font-bold mb-2">¡Impulsa tu marca!</p>
              <span className="text-lg">Crece con nosotros</span>
            </div>
            
            <Button asChild size="lg" className="rounded-full px-8">
              <Link to="/organizers">{texts.discoverPlans}</Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default OrganizerSection;
