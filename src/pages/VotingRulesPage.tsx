
import { ArrowLeft, Users, Trophy, Shield, Zap, BarChart3, Vote, Clock, Award, Brain, Eye, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const VotingRulesPage = () => {
  const votingFeatures = [
    {
      icon: Users,
      title: "Votación Democrática",
      description: "Cada usuario registrado tiene un voto por concurso, garantizando un proceso justo y transparente.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Zap,
      title: "Sistema ELO",
      description: "Utilizamos algoritmos avanzados de ranking como ELO Rating para comparar y clasificar fotografías de manera objetiva.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: BarChart3,
      title: "Comparación por Pares",
      description: "Los usuarios comparan fotografías de dos en dos, creando un sistema de votación más preciso y considerado.",
      color: "from-amber-500 to-orange-500"
    },
    {
      icon: Shield,
      title: "Anti-Fraude",
      description: "Detección automática de votos fraudulentos y prevención de múltiples cuentas para mantener la integridad.",
      color: "from-green-500 to-teal-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm shadow-sm border-b">
        <div className="container max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="mr-4 hover:bg-primary/10"
            >
              <Link to="/">
                <ArrowLeft className="h-5 w-5 mr-2" />
                Volver
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Sistema de Votación</h1>
              <p className="text-gray-600 mt-1">Votación justa, transparente y moderna</p>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary/10 via-blue-50 to-purple-50 py-20">
        <div className="container max-w-6xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Votación del Futuro
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8 leading-relaxed">
              Nuestro sistema combina tecnología avanzada con principios democráticos 
              para garantizar que las mejores fotografías sean reconocidas de manera justa y transparente.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="container max-w-6xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            Tecnología de Vanguardia
          </h3>
          <p className="text-lg text-gray-600">
            Características que hacen nuestro sistema único
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {votingFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 h-full group hover:-translate-y-1">
                <CardContent className="p-8">
                  <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="text-xl font-semibold mb-4 text-gray-900">
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

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-primary via-blue-600 to-purple-600 py-20">
        <div className="container max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-4xl font-bold text-white mb-6">
              ¿Listo para Participar?
            </h3>
            <p className="text-xl text-white/90 mb-10 leading-relaxed">
              Únete a nuestra comunidad y ayuda a decidir qué fotografías merecen ser reconocidas. 
              Tu voto cuenta y hace la diferencia.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-white text-primary hover:bg-gray-50 px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Link to="/contests">
                  Comenzar a Votar
                  <Vote className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold"
              >
                <Link to="/contests">
                  Ver Concursos
                  <Award className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default VotingRulesPage;
