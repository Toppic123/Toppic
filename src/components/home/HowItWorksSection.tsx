
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
      title: "PARTICIPA",
      description: "Sube tus mejores fotografías y únete a la competencia",
      gradient: "from-blue-500 via-purple-500 to-pink-500",
      number: "01",
      color: "blue"
    },
    {
      icon: ThumbsUp,
      title: "VOTA",
      description: "Evalúa las fotografías que más te gusten",
      gradient: "from-teal-500 via-green-500 to-emerald-500",
      number: "02",
      color: "teal"
    },
    {
      icon: Award,
      title: "GANA",
      description: "Obtén premios increíbles y reconocimiento",
      gradient: "from-orange-500 via-red-500 to-pink-500",
      number: "03",
      color: "orange"
    }
  ];

  return (
    <section className="pt-16 pb-24 bg-gradient-to-br from-slate-50 to-gray-100 dark:from-slate-900 dark:to-slate-800 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-200/20 dark:bg-blue-500/10 rounded-full blur-2xl"></div>
        <div className="absolute top-3/4 right-1/4 w-40 h-40 bg-orange-200/20 dark:bg-orange-500/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-1/4 left-1/2 w-36 h-36 bg-teal-200/20 dark:bg-teal-500/10 rounded-full blur-2xl"></div>
      </div>

      <div className="container max-w-7xl mx-auto px-4 relative z-10">
        {/* Title */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-4">
            ¿Cómo funciona?
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Tres pasos simples para participar y ganar
          </p>
        </div>
        
        {/* Infographic */}
        <div className="relative flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-4">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col lg:flex-row items-center">
              {/* Step Circle */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  delay: index * 0.3, 
                  duration: 0.6,
                  ease: "easeOut"
                }}
                className="relative group"
              >
                {/* Main Circle */}
                <div className={`w-80 h-80 rounded-full bg-gradient-to-br ${step.gradient} p-1 shadow-2xl group-hover:scale-105 transition-all duration-300`}>
                  <div className="w-full h-full rounded-full bg-white dark:bg-slate-800 flex flex-col items-center justify-center p-8 relative overflow-hidden">
                    {/* Background pattern */}
                    <div className="absolute inset-0 opacity-5">
                      <div className="absolute top-4 right-4 w-16 h-16 border-2 border-current rounded-full"></div>
                      <div className="absolute bottom-4 left-4 w-12 h-12 border-2 border-current rounded-full"></div>
                    </div>
                    
                    {/* Step number */}
                    <div className={`text-4xl font-black bg-gradient-to-r ${step.gradient} bg-clip-text text-transparent mb-6`}>
                      {step.number}
                    </div>
                    
                    {/* Icon */}
                    <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center mb-6 shadow-xl`}>
                      <step.icon className="w-10 h-10 text-white" />
                    </div>
                    
                    {/* Title */}
                    <h3 className={`text-2xl font-black mb-4 text-center bg-gradient-to-r ${step.gradient} bg-clip-text text-transparent`}>
                      {step.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-slate-700 dark:text-slate-300 text-center text-base leading-relaxed font-medium px-2">
                      {step.description}
                    </p>
                  </div>
                </div>
              </motion.div>
              
              {/* Arrow connector (only show between steps) */}
              {index < steps.length - 1 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.3 + 0.2, duration: 0.5 }}
                  className="hidden lg:flex items-center mx-8"
                >
                  <div className={`w-24 h-2 bg-gradient-to-r ${step.gradient} rounded-full relative`}>
                    <div className="absolute -right-2 top-1/2 transform -translate-y-1/2">
                      <div className={`w-6 h-6 bg-gradient-to-r ${step.gradient} rounded-full flex items-center justify-center shadow-lg`}>
                        <div className="w-0 h-0 border-l-2 border-r-2 border-b-2 border-white border-l-transparent border-r-transparent transform rotate-90"></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
