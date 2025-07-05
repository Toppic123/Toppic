
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
    <section className="py-32 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-indigo-950/20 dark:via-purple-950/20 dark:to-pink-950/20 relative overflow-hidden">
      {/* Background Pattern - unique for how it works */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-128 h-128 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-br from-blue-400/30 to-purple-400/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Geometric decorations unique to this section */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-36 right-16 w-32 h-2 bg-gradient-to-r from-indigo-200/40 to-purple-200/40 rounded-full rotate-45 animate-pulse"></div>
        <div className="absolute bottom-44 left-12 w-2 h-32 bg-gradient-to-b from-purple-200/40 to-pink-200/40 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        <Lightbulb className="absolute top-1/3 left-1/5 w-10 h-10 text-indigo-300/30 animate-pulse" style={{ animationDelay: '0.5s' }} />
        <Zap className="absolute bottom-1/3 right-1/5 w-14 h-14 text-purple-300/25 animate-pulse" style={{ animationDelay: '1.5s' }} />
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
