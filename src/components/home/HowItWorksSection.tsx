
import { motion } from "framer-motion";
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
  const steps = [
    {
      id: 1,
      title: texts.participate,
      description: texts.participateDesc,
      icon: "📷"
    },
    {
      id: 2,
      title: texts.vote,
      description: texts.voteDesc,
      icon: "👍"
    },
    {
      id: 3,
      title: texts.win,
      description: texts.winDesc,
      icon: "🏆"
    }
  ];
  
  return (
    <section className="py-20 bg-[#f1f5ff] dark:bg-gray-900">
      <div className="container max-w-6xl mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-4 font-serif tracking-tight">{texts.howItWorks}</h2>
          <div className="mx-auto w-24 h-1 bg-primary/60 rounded"></div>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mb-16">
          {steps.map((step, index) => (
            <motion.div 
              key={step.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative"
            >
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-6 h-full shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-3xl mb-4">
                    {step.icon}
                  </div>
                  <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center text-lg font-bold">
                    {step.id}
                  </div>
                  <h3 className="text-xl font-bold mb-3 font-serif">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Button asChild size="lg" className="px-8 rounded-full">
            <Link to="/contests">{texts.startNow}</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
