import { motion } from "framer-motion";
import { Upload, ThumbsUp, Award, ArrowDown, Zap } from "lucide-react";
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
      description: "Comparte tus mejores fotografías",
      color: "#4F46E5", // Indigo
      lightColor: "#EEF2FF",
      number: "01"
    },
    {
      icon: ThumbsUp,
      title: "VOTA",
      description: "Evalúa las fotografías que más te gusten",
      color: "#059669", // Emerald
      lightColor: "#ECFDF5",
      number: "02"
    },
    {
      icon: Award,
      title: "GANA",
      description: "Obtén premios increíbles y reconocimiento",
      color: "#DC2626", // Red
      lightColor: "#FEF2F2",
      number: "03"
    }
  ];

  return (
    <section className="pt-16 pb-24 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 relative overflow-hidden">
      {/* Clean minimal background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-50/40 dark:bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-emerald-50/40 dark:bg-emerald-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container max-w-6xl mx-auto px-4 relative z-10">
        {/* Modern Title with process theme */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-primary mb-6 tracking-tight">
            COMO FUNCIONA
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Proceso simple en tres pasos para comenzar a participar y ganar
          </p>
        </div>
        
        {/* Process steps */}
        <div className="relative">
          {/* Desktop layout - horizontal */}
          <div className="hidden lg:block">
            {/* Connecting line */}
            <div className="absolute top-28 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-200 via-emerald-200 to-red-200 dark:from-indigo-700 dark:via-emerald-700 dark:to-red-700 z-0"></div>
            
            <div className="flex justify-between items-start relative z-10">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ 
                    delay: index * 0.2, 
                    duration: 0.6,
                    ease: "easeOut"
                  }}
                  className="flex flex-col items-center text-center max-w-sm group"
                >
                  {/* Circle container */}
                  <div className="relative mb-8">
                    {/* Main circle */}
                    <motion.div 
                      className="w-56 h-56 rounded-full flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all duration-300 relative z-10"
                      style={{ backgroundColor: step.color }}
                      whileHover={{ scale: 1.05 }}
                    >
                      {/* White inner circle */}
                      <div className="w-40 h-40 bg-white rounded-full flex items-center justify-center shadow-inner">
                        <step.icon 
                          className="w-16 h-16"
                          style={{ color: step.color }}
                        />
                      </div>
                    </motion.div>
                    
                    {/* Step number badge */}
                    <div 
                      className="absolute -top-4 -right-4 w-12 h-12 rounded-full flex items-center justify-center text-white text-lg font-bold shadow-lg z-20"
                      style={{ backgroundColor: step.color }}
                    >
                      {step.number}
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div>
                    <h3 
                      className="text-2xl font-bold mb-4"
                      style={{ color: step.color }}
                    >
                      {step.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed font-medium">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mobile layout - vertical */}
          <div className="lg:hidden space-y-12">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  delay: index * 0.2, 
                  duration: 0.6,
                  ease: "easeOut"
                }}
                className="flex items-center space-x-8 group relative"
              >
                {/* Circle container */}
                <div className="relative flex-shrink-0">
                  {/* Main circle */}
                  <motion.div 
                    className="w-32 h-32 rounded-full flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all duration-300"
                    style={{ backgroundColor: step.color }}
                    whileHover={{ scale: 1.05 }}
                  >
                    {/* White inner circle */}
                    <div className="w-22 h-22 bg-white rounded-full flex items-center justify-center">
                      <step.icon 
                        className="w-10 h-10"
                        style={{ color: step.color }}
                      />
                    </div>
                  </motion.div>
                  
                  {/* Step number badge */}
                  <div 
                    className="absolute -top-3 -right-3 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg"
                    style={{ backgroundColor: step.color }}
                  >
                    {step.number}
                  </div>
                </div>
                
                {/* Content */}
                <div className="flex-grow">
                  <h3 
                    className="text-xl font-bold mb-3"
                    style={{ color: step.color }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed font-medium">
                    {step.description}
                  </p>
                </div>

                {/* Vertical connector */}
                {index < steps.length - 1 && (
                  <div 
                    className="absolute left-16 top-36 w-0.5 h-24 bg-gradient-to-b from-current to-transparent opacity-30" 
                    style={{ color: step.color }}
                  ></div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;