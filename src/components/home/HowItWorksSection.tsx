
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
      gradient: "from-blue-500 via-cyan-500 to-teal-500",
      number: "01",
      color: "blue"
    },
    {
      icon: ThumbsUp,
      title: texts.vote,
      description: texts.voteDesc,
      gradient: "from-purple-500 via-pink-500 to-rose-500",
      number: "02",
      color: "purple"
    },
    {
      icon: Award,
      title: texts.win,
      description: texts.winDesc,
      gradient: "from-amber-500 via-orange-500 to-red-500",
      number: "03",
      color: "amber"
    }
  ];

  return (
    <section className="py-32 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 relative overflow-hidden">
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-blue-400/20 via-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-tr from-cyan-400/20 via-teal-400/20 to-green-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-indigo-400/20 to-purple-400/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Floating geometric elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-3 h-3 bg-blue-400/40 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute top-2/3 left-1/6 w-2 h-2 bg-purple-400/40 rounded-full animate-bounce" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute bottom-1/4 right-1/6 w-4 h-4 bg-pink-400/40 rounded-full animate-bounce" style={{ animationDelay: '2.5s' }}></div>
        <Zap className="absolute top-1/3 left-1/4 w-6 h-6 text-amber-400/30 animate-pulse" style={{ animationDelay: '1s' }} />
        <Lightbulb className="absolute bottom-1/3 right-1/3 w-5 h-5 text-blue-400/30 animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container max-w-7xl mx-auto px-4 relative z-10">
        {/* Modern Title with process theme */}
        <ModernSectionTitle 
          title={texts.howItWorks}
          subtitle="Proceso simple y efectivo en 3 pasos para participar en concursos de fotografía"
          icon={Lightbulb}
          gradient="from-blue-600 via-purple-600 to-pink-600"
          showSparkles={false}
        />
        
        {/* Steps with connecting lines */}
        <div className="relative">
          {/* Connecting lines */}
          <div className="hidden lg:block absolute top-32 left-1/2 transform -translate-x-1/2 w-full max-w-4xl">
            <div className="relative h-1">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-200 via-purple-200 to-amber-200 dark:from-blue-800 dark:via-purple-800 dark:to-amber-800 rounded-full"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-amber-400 rounded-full animate-pulse opacity-60"></div>
            </div>
            
            {/* Connection nodes */}
            <div className="absolute top-1/2 transform -translate-y-1/2 flex justify-between w-full px-16">
              <div className="w-4 h-4 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full shadow-lg"></div>
              <div className="w-4 h-4 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full shadow-lg"></div>
              <div className="w-4 h-4 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full shadow-lg"></div>
            </div>
          </div>
          
          {/* Steps grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16 relative z-10">
            {steps.map((step, index) => (
              <ModernStep key={index} {...step} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
