
import { motion } from "framer-motion";
import { Camera, TrendingUp, Album, Sparkles, Users, Heart } from "lucide-react";

const FeaturesSection = () => {
  const allFeatures = [
    {
      icon: Sparkles,
      title: "Experiencia Nueva e Innovadora",
      description: "Ofrece a tus asistentes una forma completamente nueva de participar e interactuar con tu evento",
      color: "from-amber-500 to-orange-500",
      stats: "100% Original",
      bgPattern: "sparkles"
    },
    {
      icon: Camera,
      title: "Ahorra dinero",
      description: "No necesitas contratar fotógrafos, quédate con las mejores fotos de los asistentes",
      color: "from-blue-500 to-cyan-500",
      stats: "80% menos costo",
      bgPattern: "camera"
    },
    {
      icon: Users,
      title: "Fotos Reales y Originales",
      description: "Captura momentos auténticos tomados por los propios asistentes desde sus perspectivas únicas",
      color: "from-rose-500 to-pink-500",
      stats: "Perspectivas únicas",
      bgPattern: "users"
    },
    {
      icon: TrendingUp,
      title: "Visibilidad Máxima",
      description: "Promociona tu marca y eventos a nivel nacional e internacional",
      color: "from-green-500 to-emerald-500",
      stats: "+200% alcance",
      bgPattern: "trending"
    },
    {
      icon: Heart,
      title: "Contenido Genuino",
      description: "Obtén fotografías espontáneas y naturales que reflejan la verdadera esencia de tu evento",
      color: "from-indigo-500 to-purple-500",
      stats: "Momentos auténticos",
      bgPattern: "heart"
    },
    {
      icon: Album,
      title: "Álbumes de Fotos",
      description: "Las fotos de los eventos podrán consultarse en cualquier momento para siempre",
      color: "from-purple-500 to-pink-500",
      stats: "Acceso ilimitado",
      bgPattern: "album"
    }
  ];

  return (
    <>
      {/* Hero Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center mb-24 relative"
      >
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute top-0 right-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
        </div>
        
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mb-8"
        >
          <span className="inline-block px-6 py-3 bg-gradient-to-r from-primary/20 to-blue-500/20 text-primary font-bold rounded-full text-lg mb-6 border border-primary/20">
            ✨ Revoluciona tus Eventos
          </span>
        </motion.div>

        <h2 className="text-6xl md:text-7xl font-black bg-gradient-to-r from-primary via-blue-600 to-purple-600 bg-clip-text text-transparent mb-8 leading-tight">
          ¿POR QUÉ USAR
          <br />
          <span className="text-gradient bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
            TOPPICS?
          </span>
        </h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-2xl text-gray-600 max-w-5xl mx-auto leading-relaxed font-medium"
        >
          Transforma tus eventos con la plataforma de fotografía colaborativa más avanzada. 
          <br />
          <span className="text-primary font-bold">Una experiencia completamente nueva</span> donde los asistentes capturan momentos únicos y auténticos.
        </motion.p>
      </motion.div>

      {/* Enhanced Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-20">
        {allFeatures.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              delay: 0.4 + index * 0.15,
              duration: 0.6,
              type: "spring",
              stiffness: 100 
            }}
            className="group relative"
          >
            <div className="relative overflow-hidden rounded-3xl bg-white p-10 shadow-2xl transition-all duration-700 hover:shadow-3xl hover:-translate-y-6 border border-gray-100 h-full group-hover:border-primary/20">
              
              {/* Animated gradient background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-all duration-700`} />
              
              {/* Dynamic background pattern */}
              <div className="absolute inset-0 opacity-5 group-hover:opacity-15 transition-opacity duration-500">
                <div className={`w-full h-full bg-gradient-to-br ${feature.color}`} style={{
                  maskImage: `radial-gradient(circle at 30% 70%, transparent 20%, black 21%, black 40%, transparent 41%)`,
                  WebkitMaskImage: `radial-gradient(circle at 30% 70%, transparent 20%, black 21%, black 40%, transparent 41%)`
                }} />
              </div>
              
              {/* Main content */}
              <div className="relative z-10">
                {/* Icon with enhanced animation */}
                <div className="mb-8 flex items-center justify-between">
                  <div className={`inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br ${feature.color} shadow-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 group-hover:shadow-3xl`}>
                    <feature.icon className="h-10 w-10 text-white" />
                  </div>
                  
                  {/* Floating stats badge */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="group-hover:scale-110 transition-transform duration-300"
                  >
                    <span className={`inline-block px-4 py-2 rounded-2xl bg-gradient-to-r ${feature.color} text-white font-bold text-sm shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
                      {feature.stats}
                    </span>
                  </motion.div>
                </div>
                
                {/* Title with enhanced styling */}
                <h3 className="text-3xl font-black mb-6 text-gray-900 group-hover:text-primary transition-colors duration-500 leading-tight">
                  {feature.title}
                </h3>
                
                {/* Description with better typography */}
                <p className="text-gray-600 leading-relaxed text-lg font-medium group-hover:text-gray-700 transition-colors duration-300">
                  {feature.description}
                </p>
              </div>

              {/* Enhanced decorative elements */}
              <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gradient-to-br from-primary/10 to-blue-500/10 group-hover:scale-150 group-hover:rotate-45 transition-all duration-1000 blur-xl" />
              <div className="absolute -left-8 -bottom-8 h-32 w-32 rounded-full bg-gradient-to-br from-purple-400/10 to-pink-400/10 group-hover:scale-125 group-hover:-rotate-12 transition-all duration-700 blur-xl" />
              
              {/* Sparkle effects */}
              <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-primary/40 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity duration-500" />
              <div className="absolute bottom-1/3 left-1/3 w-1 h-1 bg-blue-500/40 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-700" />
              
              {/* Hover border glow */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Call-to-action section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="text-center mt-20 relative"
      >
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-primary/5 via-blue-500/5 to-purple-500/5 rounded-3xl blur-3xl"></div>
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 border border-gray-100 shadow-xl">
          <h3 className="text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            ¿Listo para revolucionar tus eventos?
          </h3>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Únete a cientos de organizadores que ya están creando experiencias únicas con TOPPICS
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center gap-2 px-6 py-3 bg-green-50 rounded-full">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-green-700 font-semibold">+500 eventos exitosos</span>
            </div>
            <div className="flex items-center gap-2 px-6 py-3 bg-blue-50 rounded-full">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-blue-700 font-semibold">+100 organizadores activos</span>
            </div>
            <div className="flex items-center gap-2 px-6 py-3 bg-purple-50 rounded-full">
              <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
              <span className="text-purple-700 font-semibold">98% satisfacción</span>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default FeaturesSection;
