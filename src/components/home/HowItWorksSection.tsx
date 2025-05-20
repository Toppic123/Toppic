
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface HowItWorksSectionProps {
  texts: {
    howItWorks: string;
    participate: string;
    participateDesc: string;
    vote: string;
    voteDesc: string;
    win: string;
    winDesc: string;
    startNow: string;
  };
}

const HowItWorksSection = ({ texts }: HowItWorksSectionProps) => {
  return (
    <section className="py-20 bg-[#f5f7fd] dark:bg-background/95">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold mb-4 tracking-tight"
          >
            {texts.howItWorks}
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, width: 0 }}
            whileInView={{ opacity: 1, width: 100 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="h-1 bg-primary rounded w-24 mb-4 mx-auto"
          ></motion.div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-gray-950 rounded-lg p-8 relative shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="absolute -top-5 -left-5 bg-primary w-10 h-10 rounded-full flex items-center justify-center text-white font-bold">
              1
            </div>
            <h3 className="text-xl font-bold mb-3">{texts.participate}</h3>
            <p className="text-muted-foreground">{texts.participateDesc}</p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-gray-950 rounded-lg p-8 relative shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="absolute -top-5 -left-5 bg-primary w-10 h-10 rounded-full flex items-center justify-center text-white font-bold">
              2
            </div>
            <h3 className="text-xl font-bold mb-3">{texts.vote}</h3>
            <p className="text-muted-foreground">{texts.voteDesc}</p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-gray-950 rounded-lg p-8 relative shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="absolute -top-5 -left-5 bg-primary w-10 h-10 rounded-full flex items-center justify-center text-white font-bold">
              3
            </div>
            <h3 className="text-xl font-bold mb-3">{texts.win}</h3>
            <p className="text-muted-foreground">{texts.winDesc}</p>
          </motion.div>
        </div>
        
        <div className="text-center">
          <Button asChild size="lg" className="rounded-full px-8">
            <Link to="/contests">{texts.startNow}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
