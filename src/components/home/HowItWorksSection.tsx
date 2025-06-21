
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Camera, Users, Trophy, Sparkles, ArrowRight } from "lucide-react";

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
      icon: Camera,
      title: texts.participate,
      description: texts.participateDesc,
      gradient: "from-blue-500 to-cyan-500",
      bgPattern: "bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 to-cyan-950/30",
      accentColor: "blue"
    },
    {
      icon: Users,
      title: texts.vote,
      description: texts.voteDesc,
      gradient: "from-purple-500 to-pink-500",
      bgPattern: "bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 to-pink-950/30",
      accentColor: "purple"
    },
    {
      icon: Trophy,
      title: texts.win,
      description: texts.winDesc,
      gradient: "from-amber-500 to-orange-500",
      bgPattern: "bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 to-orange-950/30",
      accentColor: "amber"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-white via-gray-50/50 to-white dark:from-background dark:via-gray-950/50 dark:to-background relative overflow-hidden">
      {/* Enhanced background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-128 h-128 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-br from-amber-400 to-orange-400 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center mb-6"
          >
            <div className="flex items-center bg-gradient-to-r from-primary/10 to-blue-600/10 rounded-full px-6 py-3 border border-primary/20">
              <Sparkles className="w-6 h-6 text-primary mr-3 animate-pulse" />
              <span className="text-primary font-semibold text-lg">Proceso Simple y Efectivo</span>
            </div>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-bold mb-6 tracking-tight"
          >
            <span className="bg-gradient-to-r from-gray-900 via-primary to-blue-600 dark:from-white dark:via-primary dark:to-blue-400 bg-clip-text text-transparent">
              {texts.howItWorks}
            </span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed"
          >
            Únete a nuestra comunidad de fotógrafos y participa en concursos emocionantes
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 mb-16">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                className="relative group"
              >
                {/* Enhanced connection line for desktop */}
                {index < 2 && (
                  <div className="hidden lg:block absolute top-24 -right-4 xl:-right-6 w-8 xl:w-12">
                    <ArrowRight className="w-8 h-8 xl:w-12 xl:h-12 text-gray-300 dark:text-gray-600 opacity-60" />
                  </div>
                )}
                
                <div className={`${step.bgPattern} rounded-3xl p-8 pt-16 pb-8 relative overflow-hidden border border-white/40 dark:border-gray-800/40 shadow-2xl hover:shadow-3xl transition-all duration-700 group-hover:scale-105 group-hover:-translate-y-2`}>
                  {/* Enhanced floating elements */}
                  <div className="absolute -top-4 -right-4 w-32 h-32 bg-white/20 dark:bg-white/10 rounded-full blur-2xl group-hover:scale-110 transition-transform duration-700"></div>
                  <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-white/10 dark:bg-white/5 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-700"></div>
                  
                  {/* Enhanced step number */}
                  <div className={`absolute top-4 left-4 w-14 h-14 bg-gradient-to-br ${step.gradient} rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-2xl border-4 border-white/50 backdrop-blur-sm z-10 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                    {index + 1}
                  </div>
                  
                  {/* Enhanced icon */}
                  <div className={`w-20 h-20 bg-gradient-to-br ${step.gradient} rounded-3xl flex items-center justify-center mb-6 shadow-2xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                    <Icon className="w-10 h-10 text-white" />
                  </div>
                  
                  {/* Enhanced content */}
                  <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 dark:text-white group-hover:text-primary transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                    {step.description}
                  </p>
                  
                  {/* Enhanced decorative arrow */}
                  <div className="absolute bottom-6 right-6 opacity-30 group-hover:opacity-60 transition-all duration-300 group-hover:translate-x-1">
                    <div className={`w-10 h-10 bg-gradient-to-br ${step.gradient} rounded-2xl flex items-center justify-center`}>
                      <ArrowRight className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="text-center"
        >
          <Button 
            asChild 
            size="lg" 
            className="rounded-full px-16 py-8 text-xl font-bold bg-gradient-to-r from-primary via-blue-600 to-purple-600 hover:from-primary/90 hover:via-blue-600/90 hover:to-purple-600/90 shadow-2xl hover:shadow-3xl transform hover:scale-105 hover:-translate-y-1 transition-all duration-500 border-2 border-white/20"
          >
            <Link to="/contests" className="flex items-center">
              <span>{texts.startNow}</span>
              <Sparkles className="ml-3 w-6 h-6 animate-pulse" />
            </Link>
          </Button>
          
          {/* Enhanced floating elements around button */}
          <div className="absolute -z-10 animate-pulse">
            <div className="w-4 h-4 bg-primary/30 rounded-full absolute -top-4 -left-4"></div>
            <div className="w-3 h-3 bg-blue-500/30 rounded-full absolute -bottom-2 -right-6"></div>
            <div className="w-2 h-2 bg-purple-500/30 rounded-full absolute top-2 -right-2"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
