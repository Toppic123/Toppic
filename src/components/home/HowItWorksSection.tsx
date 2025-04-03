
import { motion } from "framer-motion";
import { Camera, MapPin, Award, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

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
    <section className="py-16 px-4 bg-gray-300">
      <div className="container max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">{texts.howItWorks}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true, amount: 0.3 }}
            className="glass-card p-6 rounded-xl bg-white shadow-sm"
          >
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Camera className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">{texts.participate}</h3>
            <p className="text-muted-foreground">
              {texts.participateDesc}
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true, amount: 0.3 }}
            className="glass-card p-6 rounded-xl bg-white shadow-sm"
          >
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <MapPin className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">{texts.vote}</h3>
            <p className="text-muted-foreground">
              {texts.voteDesc}
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true, amount: 0.3 }}
            className="glass-card p-6 rounded-xl bg-white shadow-sm"
          >
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Award className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">{texts.win}</h3>
            <p className="text-muted-foreground">
              {texts.winDesc}
            </p>
          </motion.div>
        </div>
        
        <div className="text-center mt-10 space-y-4">
          <Button asChild size="lg" className="rounded-full px-8">
            <Link to="/register">
              <span>{texts.startNow}</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          
          <div>
            <Button asChild variant="outline" className="rounded-full px-8">
              <Link to="/voting-system">
                <span>Learn about our Voting System</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
