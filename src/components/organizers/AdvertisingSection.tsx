import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Smartphone, Monitor, Target, TrendingUp } from "lucide-react";

const AdvertisingSection = () => {
  const advertisingFeatures = [
    {
      icon: <Monitor className="h-6 w-6" />,
      title: "Banners en Plataforma Web",
      description: "Tu marca se muestra en la página principal y en las páginas de concursos",
      reach: "Hasta 10,000 visitas mensuales"
    },
    {
      icon: <Smartphone className="h-6 w-6" />,
      title: "Publicidad en App Móvil",
      description: "Banners integrados en la experiencia de votación y navegación",
      reach: "Más de 5,000 usuarios activos"
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: "Publicidad Segmentada",
      description: "Llega a usuarios interesados en fotografía y eventos culturales",
      reach: "Audiencia altamente segmentada"
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Métricas y Análisis",
      description: "Reportes detallados de impresiones y interacciones",
      reach: "Analytics en tiempo real"
    }
  ];


  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="mb-20"
    >
      <div className="text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-4xl md:text-5xl font-black text-[#f46464] mb-4 tracking-tight"
        >
          POSIBILIDADES DE PUBLICIDAD
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-lg text-muted-foreground max-w-3xl mx-auto"
        >
          Amplifica el alcance de tu marca con nuestras opciones publicitarias integradas. 
          Conecta con una audiencia apasionada por la fotografía y los eventos culturales.
        </motion.p>
      </div>

      {/* Advertising Features */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
      >
        {advertisingFeatures.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 + index * 0.1 }}
          >
            <Card className="h-full hover:shadow-lg transition-shadow bg-white border-[#f46464]/30 hover:border-[#f46464] hover:bg-[#f46464]/5">
              <CardHeader className="text-center bg-[#f46464] text-white">
                <div className="mx-auto mb-3 p-3 bg-white/20 rounded-full w-fit text-white">
                  {feature.icon}
                </div>
                <CardTitle className="text-lg text-white">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center bg-white">
                <CardDescription className="mb-3 text-gray-600">
                  {feature.description}
                </CardDescription>
                <Badge className="text-xs bg-[#f46464] text-white">
                  {feature.reach}
                </Badge>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

    </motion.section>
  );
};

export default AdvertisingSection;