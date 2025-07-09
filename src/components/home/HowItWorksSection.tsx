
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
                {/* Enhanced Main Circle with better shadows and effects */}
                <div className={`w-80 h-80 rounded-full bg-gradient-to-br ${step.gradient} p-[3px] shadow-2xl group-hover:scale-105 transition-all duration-500 ease-out relative`}>
                  {/* Outer glow effect */}
                  <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${step.gradient} opacity-20 blur-xl scale-110 group-hover:opacity-30 transition-opacity duration-500`}></div>
                  
                  {/* Inner white circle with enhanced styling */}
                  <div className="w-full h-full rounded-full bg-white dark:bg-slate-800 flex flex-col items-center justify-center p-8 relative overflow-hidden shadow-inner">
                    {/* Subtle background pattern with better opacity */}
                    <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.08]">
                      <div className={`absolute top-6 right-6 w-20 h-20 border-2 bg-gradient-to-br ${step.gradient} rounded-full opacity-30`}></div>
                      <div className={`absolute bottom-6 left-6 w-16 h-16 border-2 bg-gradient-to-br ${step.gradient} rounded-full opacity-20`}></div>
                      <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 border bg-gradient-to-br ${step.gradient} rounded-full opacity-10`}></div>
                    </div>
                    
                    {/* Enhanced step number with better typography */}
                    <div className={`text-5xl font-black bg-gradient-to-r ${step.gradient} bg-clip-text text-transparent mb-6 drop-shadow-sm`}>
                      {step.number}
                    </div>
                    
                    {/* Enhanced icon with better shadow */}
                    <div className={`w-24 h-24 rounded-3xl bg-gradient-to-br ${step.gradient} flex items-center justify-center mb-8 shadow-2xl group-hover:shadow-3xl transition-all duration-300 relative overflow-hidden`}>
                      {/* Icon shine effect */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent to-transparent rounded-3xl"></div>
                      <step.icon className="w-12 h-12 text-white relative z-10 drop-shadow-lg" />
                    </div>
                    
                    {/* Enhanced title with better spacing and effects */}
                    <h3 className={`text-3xl font-black mb-6 text-center bg-gradient-to-r ${step.gradient} bg-clip-text text-transparent drop-shadow-sm tracking-wide`}>
                      {step.title}
                    </h3>
                    
                    {/* Enhanced description with better typography */}
                    <p className="text-slate-700 dark:text-slate-300 text-center text-lg leading-relaxed font-semibold px-4 max-w-[280px]">
                      {step.description}
                    </p>
                    
                    {/* Subtle inner highlight */}
                    <div className="absolute top-0 left-1/4 w-1/2 h-1/3 bg-gradient-to-b from-white/10 to-transparent rounded-full blur-2xl"></div>
                  </div>
                </div>
              </motion.div>
              
              {/* Enhanced arrow connector with better styling */}
              {index < steps.length - 1 && (
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.3 + 0.3, duration: 0.6 }}
                  className="hidden lg:flex items-center mx-8"
                >
                  <div className={`w-32 h-3 bg-gradient-to-r ${step.gradient} rounded-full relative shadow-lg overflow-hidden`}>
                    {/* Arrow shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
                    
                    {/* Enhanced arrow head */}
                    <div className="absolute -right-3 top-1/2 transform -translate-y-1/2">
                      <div className={`w-8 h-8 bg-gradient-to-r ${step.gradient} rounded-full flex items-center justify-center shadow-xl relative overflow-hidden`}>
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent to-transparent rounded-full"></div>
                        <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-b-[6px] border-white border-l-transparent border-r-transparent transform rotate-90 relative z-10 drop-shadow-sm"></div>
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
