
import { ArrowLeft, Users, Trophy, Shield, Zap, BarChart3, Vote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const VotingSystem = () => {
  const features = [
    {
      icon: Zap,
      title: "Sistema ELO",
      description: "Utilizamos algoritmos avanzados de ranking como ELO Rating para comparar y clasificar fotografías de manera objetiva."
    },
    {
      icon: BarChart3,
      title: "Comparación por Pares",
      description: "Los usuarios comparan fotografías de dos en dos, creando un sistema de votación más preciso y considerado."
    },
    {
      icon: Shield,
      title: "Anti-Fraude",
      description: "Detección automática de votos fraudulentos y prevención de múltiples cuentas para mantener la integridad."
    },
    {
      icon: Trophy,
      title: "Resultados Transparentes",
      description: "Sistema de puntuación visible y auditable que garantiza que los mejores trabajos sean reconocidos."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="mr-3"
            >
              <Link to="/">
                <ArrowLeft className="h-5 w-5 mr-2" />
                Volver
              </Link>
            </Button>
            <h1 className="text-2xl font-bold text-gray-900">Sistema de Votación</h1>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary/10 to-purple-100 py-16">
        <div className="container max-w-6xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-black text-[#f46464] mb-6 tracking-tight">
              VOTACIÓN JUSTA Y TRANSPARENTE
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Nuestro sistema de votación combina tecnología avanzada con principios democráticos 
              para garantizar que las mejores fotografías sean reconocidas de manera justa.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="container max-w-6xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h3 className="text-4xl md:text-5xl font-black text-[#f46464] mb-6 tracking-tight">
              TECNOLOGÍA DE VANGUARDIA
            </h3>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Una experiencia de votación superior para la comunidad fotográfica
            </p>
          </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h4 className="text-xl font-semibold mb-3 text-gray-900">
                    {feature.title}
                  </h4>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-white py-16">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-4xl md:text-5xl font-black text-[#f46464] mb-6 tracking-tight">
              CÓMO FUNCIONA
            </h3>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Un proceso simple en cuatro pasos
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "Regístrate",
                description: "Crea tu cuenta gratuita para participar en las votaciones"
              },
              {
                step: "2",
                title: "Explora",
                description: "Navega por las fotografías participantes en los concursos activos"
              },
              {
                step: "3",
                title: "Compara y Vota",
                description: "Elige entre pares de fotografías usando nuestro sistema de comparación"
              },
              {
                step: "4",
                title: "Ve los Resultados",
                description: "Sigue los rankings en tiempo real y descubre a los ganadores"
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <h4 className="text-xl font-semibold mb-3 text-gray-900">
                  {step.title}
                </h4>
                <p className="text-gray-600">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-[#f46464] py-16">
        <div className="container max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
            ¿LISTO PARA PARTICIPAR?
          </h3>
          <p className="text-xl text-white/90 mb-8">
            Únete a nuestra comunidad y ayuda a decidir qué fotografías merecen ser reconocidas
          </p>
          <div className="flex justify-center">
            <Button
              asChild
              size="lg"
              className="bg-white text-[#f46464] hover:bg-gray-50 border border-white"
            >
              <Link to="/contests">
                Comenzar a Votar
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VotingSystem;
