import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, Smartphone, Monitor, Target, Image as ImageIcon, TrendingUp } from "lucide-react";

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

  const bannerExamples = [
    {
      position: "Header Principal",
      size: "1200x300px",
      description: "Banner prominente en la parte superior de la página principal",
      visibility: "Máxima visibilidad",
      type: "web"
    },
    {
      position: "Sidebar Concursos",
      size: "300x250px", 
      description: "Banner lateral en las páginas de concursos individuales",
      visibility: "Alta visibilidad",
      type: "web"
    },
    {
      position: "Banner Móvil",
      size: "320x100px",
      description: "Banner adaptativo en la aplicación móvil",
      visibility: "Engagement directo",
      type: "mobile"
    },
    {
      position: "Interstitial",
      size: "Full Screen",
      description: "Anuncio de pantalla completa entre votaciones",
      visibility: "Impacto máximo",
      type: "mobile"
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
          className="text-3xl font-bold text-foreground mb-4"
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

      {/* Banner Examples */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
        className="mb-12"
      >
        <h3 className="text-2xl font-bold text-center mb-8">Ejemplos de Posiciones Publicitarias</h3>
        
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {bannerExamples.map((example, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.1 + index * 0.1 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    {example.type === 'web' ? 
                      <Monitor className="h-5 w-5 text-primary" /> : 
                      <Smartphone className="h-5 w-5 text-primary" />
                    }
                    <CardTitle className="text-lg">{example.position}</CardTitle>
                    <Badge variant={example.type === 'web' ? 'default' : 'secondary'}>
                      {example.type === 'web' ? 'Web' : 'Móvil'}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      <strong>Tamaño:</strong> {example.size}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {example.description}
                    </p>
                    <Badge variant="outline" className="text-xs">
                      <Eye className="h-3 w-3 mr-1" />
                      {example.visibility}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Visual Example */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.3 }}
        className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg p-8"
      >
        <h3 className="text-xl font-bold text-center mb-6">Ejemplo Visual de Banner en Concurso</h3>
        
        <div className="max-w-4xl mx-auto">
          {/* Mock Contest Page */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Header with banner */}
            <div className="bg-gradient-to-r from-primary to-primary-foreground h-20 flex items-center justify-center">
              <div className="text-white text-sm font-medium flex items-center gap-2">
                <ImageIcon className="h-4 w-4" />
                TU MARCA AQUÍ - Banner Principal (1200x300px)
              </div>
            </div>
            
            {/* Contest content mockup */}
            <div className="p-6">
              <div className="flex gap-6">
                {/* Main content */}
                <div className="flex-1">
                  <h4 className="text-lg font-semibold mb-4">Concurso de Fotografía Urbana</h4>
                  <div className="grid grid-cols-3 gap-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
                        <ImageIcon className="h-8 w-8 text-gray-400" />
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Sidebar with banner */}
                <div className="w-72">
                  <div className="bg-gradient-to-br from-secondary to-secondary/80 rounded-lg p-4 mb-4 text-center text-white">
                    <ImageIcon className="h-6 w-6 mx-auto mb-2" />
                    <div className="text-xs font-medium">TU MARCA</div>
                    <div className="text-xs opacity-80">Banner Lateral (300x250px)</div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Mobile banner preview */}
            <div className="border-t p-4 bg-gray-50">
              <div className="text-center text-sm text-muted-foreground mb-3">
                Vista móvil - Banner adaptativo
              </div>
              <div className="max-w-sm mx-auto bg-gradient-to-r from-accent to-accent/80 rounded-lg p-3 text-center text-white">
                <div className="flex items-center justify-center gap-2">
                  <Smartphone className="h-4 w-4" />
                  <span className="text-sm font-medium">TU MARCA - Banner Móvil (320x100px)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default AdvertisingSection;