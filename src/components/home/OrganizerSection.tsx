
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
      description: "Fotos únicas y reales",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: Eye,
      title: "Visibilidad de marca", 
      description: "Miles de usuarios activos",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: TrendingUp,
      title: "Engagement efectivo",
      description: "Conexión con tu audiencia",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: Gift,
      title: "Marketing content",
      description: "Derechos sobre las fotos",
      gradient: "from-orange-500 to-red-500"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-white dark:from-gray-950 dark:to-gray-900 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-purple-400 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container max-w-7xl mx-auto px-4 relative">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-primary to-blue-600 rounded-full mb-8 shadow-2xl">
            <Building className="w-12 h-12 text-white" />
          </div>
          
          <h2 className="text-6xl font-bold mb-8 tracking-tight bg-gradient-to-r from-gray-900 via-primary to-blue-600 bg-clip-text text-transparent">
            ¿Eres organizador?
          </h2>
          
          <p className="text-2xl mb-16 leading-relaxed max-w-3xl mx-auto text-gray-600">
            Transforma tus eventos con fotografía auténtica
          </p>
          
          {/* Modern Benefits Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="group"
              >
                <div className="relative bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-transparent h-full transform hover:scale-105">
                  {/* Gradient background on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${benefit.gradient} opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity duration-500`}></div>
                  
                  <div className="relative z-10 flex flex-col items-center text-center">
                    <div className={`w-20 h-20 bg-gradient-to-br ${benefit.gradient} rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <benefit.icon className="h-10 w-10 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-gray-900">{benefit.title}</h3>
                    <p className="text-gray-600 leading-relaxed text-sm">{benefit.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            <Button 
              asChild 
              size="lg" 
              className="rounded-full px-16 py-8 bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-700 shadow-2xl hover:shadow-3xl transition-all duration-300 text-2xl font-bold transform hover:scale-105 hover:-translate-y-1"
            >
              <Link to="/organizers">
                <Building className="mr-4 h-8 w-8" />
                ORGANIZADORES
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default OrganizerSection;
