
import { ArrowLeft, Users, Shield, Zap, BarChart3, Brain, CheckCircle, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const VotingRulesPage = () => {
  const votingFeatures = [
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
              <h1 className="text-3xl font-bold text-gray-900">Sistema de votación único</h1>
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
              Sistema de votación único
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8 leading-relaxed">
              Nuestro sistema combina tecnología avanzada con principios democráticos 
              para garantizar que las mejores fotografías sean reconocidas de manera justa y transparente.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Features Grid - Tecnología de Vanguardia */}
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

      {/* ELO Algorithm Explanation */}
      <div className="bg-gradient-to-br from-gray-50 to-white py-20">
        <div className="container max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50">
              <CardContent className="p-10">
                <div className="flex items-start space-x-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                    <Brain className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold mb-4 text-gray-900">
                      Sistema ELO: La Ciencia Detrás de la Votación
                    </h4>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      Utilizamos el sistema de puntuación ELO, similar al usado en ajedrez y deportes profesionales. 
                      Este algoritmo matemático garantiza rankings justos y precisos:
                    </p>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Cada fotografía comienza con una puntuación base equilibrada</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Ganar contra una foto con alta puntuación otorga más puntos</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>El sistema se auto-equilibra con más votaciones para mayor precisión</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Resultados completamente objetivos basados en preferencias reales</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Prize System Section */}
      <div className="bg-white py-20">
        <div className="container max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-16">
              <h3 className="text-4xl md:text-5xl font-black text-[#f46464] mb-6 tracking-tight">
                SISTEMA DE PREMIOS TOPPIC
              </h3>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                Gana puntos según tu posición final en cada concurso y úsalos para obtener premios exclusivos.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12">
              <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl p-8 text-center border-2 border-yellow-200">
                <div className="w-16 h-16 bg-yellow-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  🥇
                </div>
                <h4 className="text-2xl font-bold text-yellow-700 mb-3">1er Lugar</h4>
                <p className="text-4xl font-black text-yellow-600 mb-2">50</p>
                <p className="text-yellow-600">Puntos TOPPIC</p>
              </div>
              
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 text-center border-2 border-gray-200">
                <div className="w-16 h-16 bg-gray-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  🥈
                </div>
                <h4 className="text-2xl font-bold text-gray-700 mb-3">2do Lugar</h4>
                <p className="text-4xl font-black text-gray-600 mb-2">25</p>
                <p className="text-gray-600">Puntos TOPPIC</p>
              </div>
              
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-8 text-center border-2 border-orange-200">
                <div className="w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  🥉
                </div>
                <h4 className="text-2xl font-bold text-orange-700 mb-3">3er Lugar</h4>
                <p className="text-4xl font-black text-orange-600 mb-2">15</p>
                <p className="text-orange-600">Puntos TOPPIC</p>
              </div>
            </div>
            
            <div className="bg-blue-50 rounded-2xl p-8 max-w-4xl mx-auto">
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
    </div>
  );
};

export default VotingRulesPage;
