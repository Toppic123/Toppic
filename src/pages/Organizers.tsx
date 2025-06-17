
import { motion } from "framer-motion";
import { useState } from "react";
import PricingPlans, { PricingPlan } from "@/components/PricingPlans";
import { useNavigate } from "react-router-dom";
import FeaturesSection from "@/components/organizers/FeaturesSection";
import RegistrationCTASection from "@/components/organizers/RegistrationCTASection";
import StatsSection from "@/components/organizers/StatsSection";
import RegistrationDialog from "@/components/organizers/RegistrationDialog";

const Organizers = () => {
  const navigate = useNavigate();
  const [showRegistrationDialog, setShowRegistrationDialog] = useState(false);

  const handlePlanSelection = (plan: PricingPlan) => {
    setShowRegistrationDialog(true);
  };

  const handleCustomPlanRequest = () => {
    navigate("/support");
  };

  const customPlans: PricingPlan[] = [
    {
      name: "Básico",
      price: "149€",
      description: "Ideal para eventos pequeños y locales",
      features: [
        "Hasta 300 participantes",
        "1 concurso fotográfico",
        "Publicidad básica en la app",
        "Derechos sobre 1 foto ganadora"
      ],
      buttonText: "SELECCIONAR PLAN",
      buttonVariant: "outline"
    },
    {
      name: "Profesional",
      price: "199€",
      description: "Perfecto para eventos medianos y empresas",
      features: [
        "Hasta 1000 participantes",
        "1 concurso fotográfico",
        "Publicidad destacada en la app",
        "Derechos sobre las 3 mejores fotos de cada concurso",
        "Banner promocional en la app"
      ],
      recommended: true,
      buttonText: "SELECCIONAR PLAN",
      buttonVariant: "default"
    },
    {
      name: "Premium",
      price: "249€",
      description: "Para grandes eventos y marcas reconocidas",
      features: [
        "Participantes ilimitados",
        "1 concurso fotográfico",
        "Publicidad premium en toda la app",
        "Derechos sobre las 5 mejores fotos",
        "Banner destacado en página principal",
        "Notificaciones push personalizadas"
      ],
      buttonText: "SELECCIONAR PLAN",
      buttonVariant: "secondary"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-24 pb-16"
    >
      <div className="container max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            ORGANIZADORES
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Únete a nuestra plataforma como organizador profesional y crea experiencias fotográficas únicas
          </p>
        </div>

        {/* Features Section */}
        <FeaturesSection />

        {/* Pricing Plans Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-20"
        >
          <PricingPlans plans={customPlans} onSelectPlan={handlePlanSelection} onCustomPlanRequest={handleCustomPlanRequest} />
        </motion.div>

        {/* Registration CTA Section */}
        <RegistrationCTASection onRegisterClick={() => setShowRegistrationDialog(true)} />

        {/* Stats Section */}
        <StatsSection />

        {/* Registration Dialog */}
        <RegistrationDialog 
          open={showRegistrationDialog} 
          onOpenChange={setShowRegistrationDialog}
        />
      </div>
    </motion.div>
  );
};

export default Organizers;
