
import { motion } from "framer-motion";
import { Users, Trophy, Camera, Star } from "lucide-react";

const StatsSection = () => {
  const stats = [
    {
      icon: Users,
      number: "2,500+",
      label: "Organizadores Activos"
    },
    {
      icon: Trophy,
      number: "850+",
      label: "Concursos Realizados"
    },
    {
      icon: Camera,
      number: "45,000+",
      label: "Álbumes de Fotos Creados"
    },
    {
      icon: Star,
      number: "98%",
      label: "Satisfacción del Cliente"
    }
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
      className="mb-20 bg-gradient-to-r from-primary/5 to-blue-600/5 rounded-2xl p-12"
    >
      <div className="text-center mb-12">
        <h3 className="text-3xl font-bold mb-4">Nuestra Comunidad en Números</h3>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Únete a miles de organizadores que ya confían en nuestra plataforma
        </p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9 + index * 0.1 }}
            className="text-center"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
              <stat.icon className="h-8 w-8 text-primary" />
            </div>
            <div className="text-3xl font-bold text-primary mb-2">{stat.number}</div>
            <div className="text-muted-foreground">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default StatsSection;
