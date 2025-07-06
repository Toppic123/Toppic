
import { motion } from "framer-motion";
import { Upload, ThumbsUp, Award, Zap, Lightbulb } from "lucide-react";
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
      gradient: "from-green-500 to-emerald-500",
      number: "03"
    }
  ];

  return (
    <section className="py-32 bg-gradient-to-b from-white via-gray-50/30 to-white dark:from-background dark:via-muted/20 dark:to-background relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 right-20 w-32 h-2 bg-gradient-to-r from-indigo-200/40 to-transparent rounded-full"></div>
        <div className="absolute bottom-32 left-16 w-2 h-32 bg-gradient-to-b from-purple-200/40 to-transparent rounded-full"></div>
      </div>

      {/* Minimal geometric decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 right-1/4 w-10 h-10 border border-indigo-200/30 rounded-full"></div>
        <Lightbulb className="absolute bottom-1/3 left-1/5 w-8 h-8 text-indigo-300/20" />
      </div>

      <div className="container max-w-7xl mx-auto px-4 relative z-10">
        {/* Modern Title with process theme */}
        <ModernSectionTitle 
          title={texts.howItWorks}
          subtitle="Proceso simple y efectivo en 3 pasos para participar en concursos de fotografía"
          icon={Lightbulb}
          gradient="from-indigo-600 via-purple-600 to-pink-600"
          showSparkles={false}
        />
        
        {/* Steps with updated spacing */}
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
