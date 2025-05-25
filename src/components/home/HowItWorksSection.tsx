
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Camera, Users, Trophy, Sparkles } from "lucide-react";

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
      bgPattern: "bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 to-cyan-950/30"
    },
    {
      icon: Users,
      title: texts.vote,
      description: texts.voteDesc,
      gradient: "from-purple-500 to-pink-500",
      bgPattern: "bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 to-pink-950/30"
    },
    {
      icon: Trophy,
      title: texts.win,
      description: texts.winDesc,
      gradient: "from-amber-500 to-orange-500",
      bgPattern: "bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 to-orange-950/30"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-white via-gray-50/50 to-white dark:from-background dark:via-gray-950/50 dark:to-background relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-400 rounded-full blur-3xl"></div>
      </div>

      <div className="container max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center mb-6"
          >
            <Sparkles className="w-8 h-8 text-primary mr-3" />
            <span className="text-primary font-semibold text-lg">Proceso Simple</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl font-bold mb-6 tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent"
          >
            {texts.howItWorks}
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
          >
            Únete a nuestra comunidad de fotógrafos y participa en concursos emocionantes
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative group"
              >
                {/* Connection line for desktop */}
                {index < 2 && (
                  <div className="hidden lg:block absolute top-20 -right-6 w-12 h-0.5 bg-gradient-to-r from-gray-300 to-transparent dark:from-gray-600"></div>
                )}
                
                <div className={`${step.bgPattern} rounded-3xl p-8 pt-12 pb-8 relative overflow-hidden border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500 group-hover:scale-105`}>
                  {/* Floating elements */}
                  <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
                  <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
                  
                  {/* Step number - FIXED: Proper positioning within container */}
                  <div className={`absolute top-3 left-3 w-12 h-12 bg-gradient-to-br ${step.gradient} rounded-full flex items-center justify-center text-white font-bold text-lg shadow-2xl border-3 border-white/40 backdrop-blur-sm z-10`}>
                    {index + 1}
                  </div>
                  
                  {/* Icon */}
                  <div className={`w-16 h-16 bg-gradient-to-br ${step.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                    {step.description}
                  </p>
                  
                  {/* Decorative arrow */}
                  <div className="absolute bottom-4 right-4 opacity-20 group-hover:opacity-40 transition-opacity duration-300">
                    <div className={`w-8 h-8 bg-gradient-to-br ${step.gradient} rounded-lg`}></div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <Button 
            asChild 
            size="lg" 
            className="rounded-full px-12 py-6 text-lg font-semibold bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
          >
            <Link to="/contests" className="flex items-center">
              <span>{texts.startNow}</span>
              <Sparkles className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
