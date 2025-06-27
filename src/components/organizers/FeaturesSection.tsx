
import { motion } from "framer-motion";
import { Camera, TrendingUp, Album } from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: Camera,
      title: "Ahorra dinero",
      description: "No necesitas contratar fotógrafos, quédate con las mejores fotos de los asistentes",
      color: "from-blue-500 to-cyan-500",
      stats: "80% menos costo"
    },
    {
      icon: TrendingUp,
      title: "Visibilidad Máxima",
      description: "Promociona tu marca y eventos a nivel nacional e internacional",
      color: "from-green-500 to-emerald-500",
      stats: "+200% alcance"
    },
    {
      icon: Album,
      title: "Álbumes de Fotos",
      description: "Las fotos de los eventos podrán consultarse en cualquier momento para siempre",
      color: "from-purple-500 to-pink-500",
      stats: "Acceso ilimitado"
    }
  ];

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center mb-16"
      >
        <h2 className="text-5xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent mb-4">
          ¿POR QUÉ USAR TOPPICS EN EVENTOS?
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Transforma tus eventos con la plataforma de fotografía colaborativa más avanzada
        </p>
      </motion.div>

      {/* Main Features - 3D Card Style */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            className="group relative"
          >
            <div className="relative overflow-hidden rounded-3xl bg-white p-8 shadow-xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
              {/* Background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-5 group-hover:opacity-10 transition-opacity duration-500`} />
              
              {/* Icon container with animated background */}
              <div className="relative z-10 mb-6">
                <div className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${feature.color} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                
                {/* Stats badge */}
                <div className="mt-4 inline-block">
                  <span className={`rounded-full bg-gradient-to-r ${feature.color} px-3 py-1 text-sm font-semibold text-white`}>
                    {feature.stats}
                  </span>
                </div>
              </div>
              
              <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-primary transition-colors duration-300">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>

              {/* Decorative elements */}
              <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-br from-primary/10 to-blue-500/10 group-hover:scale-150 transition-transform duration-700" />
              <div className="absolute -left-4 -bottom-4 h-16 w-16 rounded-full bg-gradient-to-br from-purple-400/10 to-pink-400/10 group-hover:scale-125 transition-transform duration-500" />
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default FeaturesSection;
