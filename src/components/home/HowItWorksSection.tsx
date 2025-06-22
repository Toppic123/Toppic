
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Camera, Users, Trophy, Sparkles, Upload, ThumbsUp, Award } from "lucide-react";

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
      bgPattern: "bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 to-cyan-950/30",
      accentColor: "blue",
      number: "01"
    },
    {
      icon: ThumbsUp,
      title: texts.vote,
      description: texts.voteDesc,
      gradient: "from-purple-500 to-pink-500",
      bgPattern: "bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 to-pink-950/30",
      accentColor: "purple",
      number: "02"
    },
    {
      icon: Award,
      title: texts.win,
      description: texts.winDesc,
      gradient: "from-amber-500 to-orange-500",
      bgPattern: "bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 to-orange-950/30",
      accentColor: "amber",
      number: "03"
    }
  ];

  return (
    <section className="py-32 bg-gradient-to-b from-white via-gray-50/50 to-white dark:from-background dark:via-gray-950/50 dark:to-background relative overflow-hidden">
      {/* Enhanced infographic background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-128 h-128 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-br from-amber-400 to-orange-400 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container max-w-7xl mx-auto px-4 relative z-10">
        {/* Infographic header */}
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center mb-8"
          >
            <div className="flex items-center bg-gradient-to-r from-primary/10 to-blue-600/10 rounded-full px-8 py-4 border border-primary/20">
              <Sparkles className="w-7 h-7 text-primary mr-4 animate-pulse" />
              <span className="text-primary font-bold text-xl">Proceso Simple en 3 Pasos</span>
            </div>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-6xl md:text-8xl font-black mb-8 tracking-tight"
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
            className="text-2xl md:text-3xl text-muted-foreground max-w-5xl mx-auto leading-relaxed font-medium"
          >
            Únete a nuestra comunidad de fotógrafos y participa en concursos emocionantes
          </motion.p>
        </div>
        
        {/* Infographic steps without arrow icons */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-20 mb-20">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.3, duration: 0.8 }}
                className="relative group"
              >
                {/* Infographic card with enhanced styling */}
                <div className={`${step.bgPattern} rounded-3xl p-10 pt-20 pb-12 relative overflow-hidden border border-white/60 dark:border-gray-800/60 shadow-2xl hover:shadow-3xl transition-all duration-700 group-hover:scale-105 group-hover:-translate-y-3`}>
                  {/* Enhanced floating elements */}
                  <div className="absolute -top-6 -right-6 w-40 h-40 bg-white/30 dark:bg-white/20 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700"></div>
                  <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-white/20 dark:bg-white/10 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700"></div>
                  
                  {/* Large infographic step number */}
                  <div className={`absolute top-6 left-6 w-20 h-20 bg-gradient-to-br ${step.gradient} rounded-3xl flex items-center justify-center text-white font-black text-2xl shadow-2xl border-4 border-white/60 backdrop-blur-sm z-10 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                    {step.number}
                  </div>
                  
                  {/* Enhanced icon with infographic styling */}
                  <div className={`w-28 h-28 bg-gradient-to-br ${step.gradient} rounded-full flex items-center justify-center mb-8 shadow-2xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 border-4 border-white/40`}>
                    <Icon className="w-14 h-14 text-white" />
                  </div>
                  
                  {/* Enhanced content with infographic typography */}
                  <h3 className="text-3xl md:text-4xl font-black mb-6 text-gray-900 dark:text-white group-hover:text-primary transition-colors duration-300 leading-tight">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-xl font-medium">
                    {step.description}
                  </p>
                  
                  {/* Infographic decorative dots */}
                  <div className="absolute top-4 right-4 opacity-20">
                    <div className="grid grid-cols-3 gap-1">
                      {[...Array(9)].map((_, i) => (
                        <div key={i} className={`w-2 h-2 bg-gradient-to-br ${step.gradient} rounded-full`}></div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
        
        {/* Enhanced CTA with infographic styling */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1.2 }}
          className="text-center relative"
        >
          <div className="relative inline-block">
            <Button 
              asChild 
              size="lg" 
              className="rounded-full px-20 py-10 text-2xl font-black bg-gradient-to-r from-primary via-blue-600 to-purple-600 hover:from-primary/90 hover:via-blue-600/90 hover:to-purple-600/90 shadow-2xl hover:shadow-3xl transform hover:scale-105 hover:-translate-y-2 transition-all duration-500 border-4 border-white/30"
            >
              <Link to="/contests" className="flex items-center">
                <span>{texts.startNow}</span>
                <Sparkles className="ml-4 w-8 h-8 animate-pulse" />
              </Link>
            </Button>
            
            {/* Enhanced floating elements around button with infographic style */}
            <div className="absolute -z-10">
              <div className="w-6 h-6 bg-primary/40 rounded-full absolute -top-6 -left-6 animate-bounce"></div>
              <div className="w-4 h-4 bg-blue-500/40 rounded-full absolute -bottom-4 -right-8 animate-bounce" style={{ animationDelay: '0.5s' }}></div>
              <div className="w-3 h-3 bg-purple-500/40 rounded-full absolute top-4 -right-4 animate-bounce" style={{ animationDelay: '1s' }}></div>
              <div className="w-5 h-5 bg-amber-500/40 rounded-full absolute -bottom-2 -left-4 animate-bounce" style={{ animationDelay: '1.5s' }}></div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
