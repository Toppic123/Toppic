
import { motion } from "framer-motion";
import { Building, Users, Trophy, Target, TrendingUp, Check, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const PrototypeOrganizers = () => {
  const pricingPlans = [
    {
      name: "Básico",
      price: "€29",
      period: "/mes",
      description: "Perfecto para pequeños eventos",
      features: [
        "Hasta 2 concursos simultáneos",
        "Máximo 100 participantes",
        "Soporte por email",
        "Estadísticas básicas",
        "Galería personalizada"
      ],
      highlighted: false
    },
    {
      name: "Profesional",
      price: "€79",
      period: "/mes",
      description: "Ideal para organizadores regulares",
      features: [
        "Hasta 10 concursos simultáneos",
        "Participantes ilimitados",
        "Soporte prioritario",
        "Estadísticas avanzadas",
        "Branding personalizado",
        "API de integración",
        "Moderación automática"
      ],
      highlighted: true
    },
    {
      name: "Empresa",
      price: "€199",
      period: "/mes",
      description: "Para grandes organizaciones",
      features: [
        "Concursos ilimitados",
        "Participantes ilimitados",
        "Soporte 24/7",
        "Analytics completos",
        "White-label completo",
        "Integraciones personalizadas",
        "Account manager dedicado",
        "SLA garantizado"
      ],
      highlighted: false
    }
  ];

  const benefits = [
    {
      icon: Users,
      title: "Alcance Masivo",
      description: "Llega a miles de fotógrafos en todo el mundo"
    },
    {
      icon: Trophy,
      title: "Contenido de Calidad",
      description: "Obtén fotografías profesionales para tu marca"
    },
    {
      icon: Target,
      title: "Marketing Dirigido",
      description: "Promociona tu evento de forma efectiva"
    },
    {
      icon: TrendingUp,
      title: "Engagement Alto",
      description: "Genera interacción real con tu audiencia"
    }
  ];

  const testimonials = [
    {
      name: "Festival de Música Barcelona",
      type: "Evento Musical",
      text: "Increíble la calidad de fotos que recibimos. Más de 500 participantes capturaron momentos únicos de nuestro festival.",
      rating: 5,
      avatar: "https://randomuser.me/api/portraits/men/45.jpg"
    },
    {
      name: "Ayuntamiento de Valencia",
      type: "Institución Pública",
      text: "Perfecta herramienta para promocionar nuestros eventos culturales. La geolocalización fue clave para el éxito.",
      rating: 5,
      avatar: "https://randomuser.me/api/portraits/women/32.jpg"
    },
    {
      name: "Restaurant El Jardín",
      type: "Negocio Local",
      text: "Conseguimos un contenido visual increíble para nuestras redes sociales. Los fotógrafos capturaron la esencia de nuestro restaurante.",
      rating: 5,
      avatar: "https://randomuser.me/api/portraits/men/28.jpg"
    }
  ];

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#4891AA] to-blue-600 rounded-full mb-6">
          <Building className="w-10 h-10 text-white" />
        </div>
        
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
          ¿Eres Organizador?
        </h1>
        
        <p className="text-2xl mb-12 leading-relaxed max-w-4xl mx-auto text-gray-600">
          Crea concursos fotográficos para tus eventos y promociona tu negocio con contenido auténtico y de calidad
        </p>
      </motion.div>

      {/* Beneficios */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
      >
        {benefits.map((benefit, index) => (
          <motion.div
            key={benefit.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
            className="group"
          >
            <Card className="h-full hover:shadow-lg transition-shadow border-gray-100 hover:border-[#4891AA]/20">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-[#4891AA]/20 to-blue-600/20 rounded-2xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform">
                  <benefit.icon className="h-8 w-8 text-[#4891AA]" />
                </div>
                <h3 className="text-lg font-bold mb-3 text-gray-900">{benefit.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{benefit.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Planes de precios */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-16"
      >
        <h2 className="text-3xl font-bold text-center mb-12">Elige tu Plan</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className={`relative ${plan.highlighted ? 'scale-105' : ''}`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-[#4891AA] text-white px-4 py-1">
                    Más Popular
                  </Badge>
                </div>
              )}
              
              <Card className={`h-full ${plan.highlighted ? 'border-[#4891AA] shadow-xl' : 'border-gray-200'}`}>
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                    <p className="text-gray-600 text-sm mb-4">{plan.description}</p>
                    <div className="flex items-baseline justify-center">
                      <span className="text-4xl font-bold text-[#4891AA]">{plan.price}</span>
                      <span className="text-gray-500">{plan.period}</span>
                    </div>
                  </div>
                  
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-3">
                        <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className={`w-full ${plan.highlighted 
                      ? 'bg-[#4891AA] hover:bg-[#3a7a8b]' 
                      : 'bg-gray-900 hover:bg-gray-800'
                    }`}
                  >
                    Comenzar Plan {plan.name}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Testimonios */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mb-16"
      >
        <h2 className="text-3xl font-bold text-center mb-12">Lo que dicen nuestros clientes</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  
                  <p className="text-gray-600 mb-6 italic">"{testimonial.text}"</p>
                  
                  <div className="flex items-center gap-3">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-bold text-sm">{testimonial.name}</p>
                      <p className="text-gray-500 text-xs">{testimonial.type}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-gradient-to-r from-[#4891AA] to-blue-600 rounded-2xl p-12 text-center text-white"
      >
        <h2 className="text-4xl font-bold mb-6">¿Listo para empezar?</h2>
        <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
          Únete a cientos de organizadores que ya están creando concursos exitosos en nuestra plataforma
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" variant="secondary" className="bg-white text-[#4891AA] hover:bg-gray-100 px-8">
            Empezar Prueba Gratuita
          </Button>
          <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8">
            Solicitar Demo
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default PrototypeOrganizers;
