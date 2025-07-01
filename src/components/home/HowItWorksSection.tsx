
import { motion } from "framer-motion";
import { Upload, ThumbsUp, Award, Zap } from "lucide-react";
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
      {/* Background Pattern - unified */}
      <div className="absolute inset-0 opacity-4">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-green-400 to-blue-400 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-128 h-128 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-br from-teal-400/30 to-blue-400/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container max-w-7xl mx-auto px-4 relative z-10">
        {/* Modern Title - unified style without DESTACADO badge */}
        <ModernSectionTitle 
          title={texts.howItWorks}
          subtitle="Proceso simple y efectivo en 3 pasos para participar en concursos de fotografía"
          icon={Zap}
          gradient="from-green-600 via-teal-600 to-blue-600"
          showSparkles={false}
        />
        
        {/* Steps - unified spacing */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          {steps.map((step, index) => (
            <ModernStep key={index} {...step} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
