
import { motion } from "framer-motion";
import { ArrowLeft, Vote, Shield, Award, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const VotingRules = () => {
  const navigate = useNavigate();

  const rules = [
    {
      icon: Users,
      title: "Participación Democrática",
      description: "Todos los usuarios registrados pueden votar en los concursos activos."
    },
    {
      icon: Vote,
      title: "Un Voto por Usuario",
      description: "Cada usuario puede votar una sola vez por concurso para mantener la equidad."
    },
    {
      icon: Shield,
      title: "Votación Anónima",
      description: "Los votos son completamente anónimos para garantizar decisiones imparciales."
    },
    {
      icon: Award,
      title: "Resultados Transparentes",
      description: "Los resultados se publican automáticamente al finalizar el período de votación."
    }
  ];

  const votingSystemInfo = [
    {
      title: "¿Cómo funciona el sistema de votación?",
      content: "Nuestro sistema utiliza inteligencia artificial para garantizar votos justos y prevenir manipulaciones. Cada voto es verificado y validado automáticamente."
    },
    {
      title: "¿Cuándo puedo votar?",
      content: "Puedes votar desde el momento en que se publican las fotos hasta la fecha límite del concurso. El período de votación se muestra claramente en cada concurso."
    },
    {
      title: "¿Puedo cambiar mi voto?",
      content: "No, una vez emitido tu voto, no puede ser modificado. Esto garantiza la integridad del proceso de votación."
    }
  ];

  return (
    <div className="pt-24 pb-16 min-h-screen bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-6 text-primary hover:text-primary/80"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver
          </Button>

          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 text-primary">Reglas de Votación</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Conoce las reglas y el funcionamiento de nuestro sistema de votación
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {rules.map((rule, index) => (
              <motion.div
                key={rule.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <rule.icon className="w-6 h-6 text-primary" />
                      </div>
                      <CardTitle className="text-lg">{rule.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {rule.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold mb-8 text-center">Sistema de Votación</h2>
            <div className="space-y-6">
              {votingSystemInfo.map((info, index) => (
                <Card key={info.title} className="hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-xl text-primary">{info.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-base text-muted-foreground">{info.content}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center"
          >
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-3 text-primary">¿Tienes dudas sobre la votación?</h3>
                <p className="text-muted-foreground mb-4">
                  Si tienes alguna pregunta sobre el proceso de votación, no dudes en contactarnos.
                </p>
                <Button asChild className="bg-primary hover:bg-primary/90">
                  <a href="/support">Contactar Soporte</a>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default VotingRules;
