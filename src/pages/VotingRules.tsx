
import { ArrowLeft, Users, Clock, Trophy, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const VotingRules = () => {
  const rules = [
    {
      icon: Users,
      title: "Voto democrático",
      description: "Cada usuario registrado puede votar una vez por concurso. Tu voto cuenta igual que el de todos los demás participantes."
    },
    {
      icon: Clock,
      title: "Período de votación",
      description: "La votación comienza cuando se publican las fotos y termina en la fecha límite del concurso. No se pueden cambiar los votos una vez emitidos."
    },
    {
      icon: Trophy,
      title: "Criterios de evaluación",
      description: "Vota por las fotos que consideres más creativas, técnicamente mejores o que mejor representen el tema del concurso."
    },
    {
      icon: Shield,
      title: "Fair play",
      description: "Está prohibido crear múltiples cuentas para votar. Los votos fraudulentos serán detectados y eliminados automáticamente."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="mr-3"
            >
              <Link to="/contests">
                <ArrowLeft className="h-5 w-5 mr-2" />
                Volver
              </Link>
            </Button>
            <h1 className="text-2xl font-bold text-gray-900">Reglas de Votación</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Sistema de Votación</h2>
          <p className="text-xl text-gray-600">
            Conoce cómo funciona nuestro sistema de votación transparente y justo
          </p>
        </div>

        {/* Rules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {rules.map((rule, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <rule.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-900">{rule.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{rule.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Voting Process */}
        <Card className="border-0 shadow-lg">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold mb-6 text-center text-gray-900">Proceso de Votación</h3>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">
                  1
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-2">Explora las fotos</h4>
                  <p className="text-gray-600">Navega por todas las fotos participantes en el concurso. Tómate tu tiempo para apreciar cada una.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">
                  2
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-2">Selecciona tu favorita</h4>
                  <p className="text-gray-600">Haz clic en el corazón de la foto que más te guste. Solo puedes votar una vez por concurso.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">
                  3
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-2">Confirma tu voto</h4>
                  <p className="text-gray-600">Una vez que votes, tu elección quedará registrada. No podrás cambiar tu voto después.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">
                  4
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-2">Espera los resultados</h4>
                  <p className="text-gray-600">Al finalizar el período de votación, se anunciarán los ganadores basándose en el número total de votos.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Additional Information */}
        <div className="mt-12 bg-blue-50 rounded-lg p-8">
          <h3 className="text-xl font-bold mb-4 text-gray-900">Información Adicional</h3>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start space-x-2">
              <span className="text-primary">•</span>
              <span>Los votos son anónimos y no se muestran públicamente quién votó por cada foto.</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-primary">•</span>
              <span>Puedes comentar en las fotos sin necesidad de votar por ellas.</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-primary">•</span>
              <span>El sistema detecta automáticamente comportamientos sospechosos como votos múltiples o cuentas falsas.</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-primary">•</span>
              <span>Los organizadores del concurso no pueden influir en el resultado de la votación.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default VotingRules;
