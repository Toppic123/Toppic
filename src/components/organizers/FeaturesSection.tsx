
import { motion } from "framer-motion";
import { Camera, TrendingUp, Album, Sparkles, Users, Heart } from "lucide-react";

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

  const newExperienceFeatures = [
    {
      icon: Sparkles,
      title: "Experiencia Nueva e Innovadora",
      description: "Ofrece a tus asistentes una forma completamente nueva de participar e interactuar con tu evento",
      color: "from-amber-500 to-orange-500"
    },
    {
      icon: Users,
      title: "Fotos Reales y Originales",
      description: "Captura momentos auténticos tomados por los propios asistentes desde sus perspectivas únicas",
      color: "from-rose-500 to-pink-500"
    },
    {
      icon: Heart,
      title: "Contenido Genuino",
      description: "Obtén fotografías espontáneas y naturales que reflejan la verdadera esencia de tu evento",
      color: "from-indigo-500 to-purple-500"
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
        <h2 className="text-5xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent mb-6">
          ¿POR QUÉ USAR TOPPICS EN EVENTOS?
        </h2>
        <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
          Transforma tus eventos con la plataforma de fotografía colaborativa más avanzada. 
          Una experiencia completamente nueva donde los asistentes capturan momentos únicos y auténticos.
        </p>
      </motion.div>

      {/* New Experience Highlight Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-20"
      >
        <div className="bg-gradient-to-br from-primary/10 via-blue-50 to-purple-50 rounded-3xl p-8 md:p-12 relative overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/20 to-blue-400/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-2xl" />
          
          <div className="relative z-10 text-center mb-12">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
              className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary to-blue-600 rounded-2xl mb-6 shadow-xl"
            >
              <Sparkles className="h-10 w-10 text-white" />
            </motion.div>
            
            <h3 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Una Experiencia Completamente Nueva
            </h3>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Los asistentes se convierten en los protagonistas, capturando fotos reales y originales 
              desde sus propias perspectivas. Cada imagen cuenta una historia auténtica de tu evento.
            </p>
          </div>

          {/* New Experience Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {newExperienceFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/90 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${feature.color} shadow-lg mb-4`}>
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h4 className="text-lg font-semibold mb-2 text-gray-900">{feature.title}</h4>
                <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Main Features - Enhanced 3D Card Style */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 + index * 0.1 }}
            className="group relative"
          >
            <div className="relative overflow-hidden rounded-3xl bg-white p-8 shadow-xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-3 border border-gray-100">
              {/* Enhanced background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-5 group-hover:opacity-15 transition-opacity duration-500`} />
              
              {/* Animated border effect */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Icon container with enhanced animation */}
              <div className="relative z-10 mb-6">
                <div className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${feature.color} shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                
                {/* Enhanced stats badge */}
                <div className="mt-4 inline-block">
                  <span className={`rounded-full bg-gradient-to-r ${feature.color} px-4 py-2 text-sm font-bold text-white shadow-md group-hover:shadow-lg transition-shadow duration-300`}>
                    {feature.stats}
                  </span>
                </div>
              </div>
              
              <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-primary transition-colors duration-300">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed text-base">
                {feature.description}
              </p>

              {/* Enhanced decorative elements */}
              <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-gradient-to-br from-primary/10 to-blue-500/10 group-hover:scale-150 group-hover:rotate-45 transition-all duration-700" />
              <div className="absolute -left-6 -bottom-6 h-20 w-20 rounded-full bg-gradient-to-br from-purple-400/10 to-pink-400/10 group-hover:scale-125 group-hover:-rotate-12 transition-all duration-500" />
              
              {/* New floating particles effect */}
              <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-primary/30 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity duration-300" />
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default FeaturesSection;
