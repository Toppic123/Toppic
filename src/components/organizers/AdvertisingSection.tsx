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
          className="text-4xl font-bold text-foreground mb-4"
        >
          Posibilidades de Publicidad
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
            <Card className="h-full hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto mb-3 p-3 bg-primary/10 rounded-full w-fit">
                  {feature.icon}
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="mb-3">
                  {feature.description}
                </CardDescription>
                <Badge variant="secondary" className="text-xs">
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