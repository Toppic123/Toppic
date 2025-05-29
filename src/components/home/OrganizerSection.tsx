
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Camera, Building, Users, Award, TrendingUp, Target, Eye, Gift } from "lucide-react";

interface OrganizerSectionProps {
  texts: {
    organizerTitle: string;
    organizerDesc: string;
    discoverPlans: string;
  };
}

const OrganizerSection = ({ texts }: OrganizerSectionProps) => {
  const benefits = [
    {
      icon: Camera,
      title: "Contenido auténtico",
      description: "Fotos únicas y reales de tu evento"
    },
    {
      icon: Eye,
      title: "Visibilidad de marca",
      description: "Miles de usuarios verán tu empresa"
    },
    {
      icon: TrendingUp,
      title: "Engagement efectivo",
      description: "Conexión emocional con tu audiencia"
    },
    {
      icon: Gift,
      title: "Marketing content",
      description: "Derechos sobre las mejores fotos"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-primary/5 via-blue-50/50 to-white dark:from-gray-950 dark:via-primary/10 dark:to-gray-950 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-500 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container max-w-7xl mx-auto px-4 relative">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary to-blue-600 rounded-full mb-6">
            <Building className="w-10 h-10 text-white" />
          </div>
          
          <h2 className="text-5xl font-bold mb-6 tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            {texts.organizerTitle}
          </h2>
          
          <p className="text-2xl mb-12 leading-relaxed max-w-4xl mx-auto text-gray-600">
            {texts.organizerDesc}
          </p>
          
          {/* Benefits Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-primary/20 h-full">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-blue-600/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <benefit.icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-gray-900">{benefit.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Button 
              asChild 
              size="lg" 
              className="rounded-full px-12 py-6 bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-700 shadow-xl hover:shadow-2xl transition-all duration-300 text-xl font-bold transform hover:scale-105"
            >
              <Link to="/organizers">
                <Building className="mr-3 h-6 w-6" />
                {texts.discoverPlans}
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default OrganizerSection;
