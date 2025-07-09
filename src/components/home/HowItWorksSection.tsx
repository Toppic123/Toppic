
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
      title: "Participa",
      description: "Sube tus fotos",
      gradient: "from-blue-500 to-blue-600",
      number: "1",
      color: "blue"
    },
    {
      icon: ThumbsUp,
      title: "Vota",
      description: "Evalúa fotografías",
      gradient: "from-purple-500 to-purple-600",
      number: "2",
      color: "purple"
    },
    {
      icon: Award,
      title: "Gana",
      description: "Obtén premios",
      gradient: "from-amber-500 to-amber-600",
      number: "3",
      color: "amber"
    }
  ];

  return (
    <section className="py-24 bg-white dark:bg-slate-900 relative overflow-hidden">
      {/* Minimal background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-blue-50/50 via-purple-50/50 to-amber-50/50 dark:from-blue-950/20 dark:via-purple-950/20 dark:to-amber-950/20 rounded-full blur-3xl"></div>
      </div>

      <div className="container max-w-6xl mx-auto px-4 relative z-10">
        {/* Simple title */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-4">
            ¿Cómo funciona?
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Tres pasos simples para participar
          </p>
        </div>
        
        {/* Steps flow */}
        <div className="relative">
          {/* Connection line */}
          <div className="hidden lg:block absolute top-24 left-1/2 transform -translate-x-1/2 w-full max-w-3xl">
            <div className="relative h-0.5 bg-gradient-to-r from-blue-200 via-purple-200 to-amber-200 dark:from-blue-800 dark:via-purple-800 dark:to-amber-800"></div>
          </div>
          
          {/* Steps */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-8">
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
