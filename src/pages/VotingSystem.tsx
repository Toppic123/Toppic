import { ArrowLeft, Users, Trophy, Shield, Zap, BarChart3, Vote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PrizeRewards from "@/components/PrizeRewards";

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

      {/* ELO System Detailed Section */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16">
        <div className="container max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-12">
              <h3 className="text-4xl md:text-5xl font-black text-[#f46464] mb-6 tracking-tight">
                SISTEMA ELO: LA CIENCIA DETRÁS DE LA VOTACIÓN
              </h3>
              <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
                Utilizamos el mismo sistema que el ajedrez profesional para clasificar fotografías de manera objetiva y justa.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl shadow-xl p-8 max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-4">¿Qué es el Sistema ELO?</h4>
                  <p className="text-gray-600 mb-4">
                    El sistema ELO es un método matemático para calcular la habilidad relativa de jugadores 
                    en juegos de dos jugadores. Lo hemos adaptado para comparar fotografías de manera objetiva.
                  </p>
                  <p className="text-gray-600">
                    Cada fotografía tiene una puntuación que sube o baja según gane o pierda comparaciones 
                    directas con otras fotos, garantizando resultados justos y precisos.
                  </p>
                </div>
                <div className="flex justify-center">
                  <div className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center">
                    <BarChart3 className="h-16 w-16 text-primary" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Prize Rewards System */}
      <div className="bg-white py-16">
        <div className="container max-w-6xl mx-auto px-4">
          <PrizeRewards />
        </div>
      </div>

      {/* Prize System Section */}
      <div className="bg-white py-16">
        <div className="container max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-12">
              <h3 className="text-4xl md:text-5xl font-black text-[#f46464] mb-6 tracking-tight">
                SISTEMA DE PREMIOS TOPPIC
              </h3>
              <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
                Gana puntos según tu posición final en cada concurso y úsalos para obtener premios exclusivos.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl p-8 text-center border-2 border-yellow-200">
                <div className="w-16 h-16 bg-yellow-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  🥇
                </div>
                <h4 className="text-2xl font-bold text-yellow-700 mb-3">1er Lugar</h4>
                <p className="text-4xl font-black text-yellow-600 mb-2">100</p>
                <p className="text-yellow-600">Puntos TOPPIC</p>
              </div>
              
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 text-center border-2 border-gray-200">
                <div className="w-16 h-16 bg-gray-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  🥈
                </div>
                <h4 className="text-2xl font-bold text-gray-700 mb-3">2do Lugar</h4>
                <p className="text-4xl font-black text-gray-600 mb-2">50</p>
                <p className="text-gray-600">Puntos TOPPIC</p>
              </div>
              
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-8 text-center border-2 border-orange-200">
                <div className="w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  🥉
                </div>
                <h4 className="text-2xl font-bold text-orange-700 mb-3">3er Lugar</h4>
                <p className="text-4xl font-black text-orange-600 mb-2">25</p>
                <p className="text-orange-600">Puntos TOPPIC</p>
              </div>
            </div>
            
            <div className="bg-blue-50 rounded-2xl p-8 mt-8 max-w-4xl mx-auto">
              <h4 className="text-xl font-bold text-blue-900 mb-4 text-center">¿Qué puedes hacer con los puntos TOPPIC?</h4>
              <div className="grid md:grid-cols-2 gap-4 text-blue-800">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">🎁</span>
                  <span>Canjear por premios exclusivos</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">⭐</span>
                  <span>Acceder a concursos premium</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">👑</span>
                  <span>Obtener insignias especiales</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">📸</span>
                  <span>Subir más fotos en cada concurso (máximo 3 en total)</span>
                </div>
              </div>
            </div>
          </motion.div>
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

    </div>
  );
};

export default VotingSystem;