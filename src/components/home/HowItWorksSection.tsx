
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Upload, ThumbsUp, Award, Sparkles } from "lucide-react";
import ModernStep from "./ModernStep";
import ModernSectionTitle from "./ModernSectionTitle";

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
      icon: Upload,
      title: texts.participate,
      description: texts.participateDesc,
      gradient: "from-blue-500 to-cyan-500",
      number: "01"
    },
    {
      icon: ThumbsUp,
      title: texts.vote,
      description: texts.voteDesc,
      gradient: "from-purple-500 to-pink-500",
      number: "02"
    },
    {
      icon: Award,
      title: texts.win,
      description: texts.winDesc,
      gradient: "from-amber-500 to-orange-500",
      number: "03"
    }
  ];

  return (
    <section className="py-32 bg-gradient-to-b from-white via-gray-50/30 to-white dark:from-background dark:via-gray-950/30 dark:to-background relative overflow-hidden">
      {/* Fondo decorativo mejorado */}
      <div className="absolute inset-0 opacity-4">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-128 h-128 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-br from-amber-400 to-orange-400 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container max-w-7xl mx-auto px-4 relative z-10">
        {/* Título moderno */}
        <ModernSectionTitle 
          title={texts.howItWorks}
          subtitle="Proceso simple y efectivo en 3 pasos para participar en concursos de fotografía"
          gradient="from-gray-900 via-primary to-blue-600 dark:from-white dark:via-primary dark:to-blue-400"
        />
        
        {/* Pasos modernos */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16 mb-20">
          {steps.map((step, index) => (
            <ModernStep key={index} {...step} index={index} />
          ))}
        </div>
        
        {/* CTA mejorado */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="text-center relative"
        >
          <div className="relative inline-block">
            <Button 
              asChild 
              size="lg" 
              className="rounded-full px-16 py-8 text-xl font-black bg-gradient-to-r from-primary via-blue-600 to-purple-600 hover:from-primary/90 hover:via-blue-600/90 hover:to-purple-600/90 shadow-2xl hover:shadow-3xl transform hover:scale-105 hover:-translate-y-2 transition-all duration-500 border-4 border-white/30"
            >
              <Link to="/contests" className="flex items-center">
                <span>{texts.startNow}</span>
                <Sparkles className="ml-4 w-6 h-6 animate-pulse" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
