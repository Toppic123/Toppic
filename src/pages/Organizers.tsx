
import { motion } from "framer-motion";
import { useState } from "react";
import PricingPlans, { PricingPlan } from "@/components/PricingPlans";
import { useNavigate } from "react-router-dom";
import FeaturesSection from "@/components/organizers/FeaturesSection";
import RegistrationDialog from "@/components/organizers/RegistrationDialog";
import AdvertisingSection from "@/components/organizers/AdvertisingSection";

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
      price: "69€",
      description: "Ideal para eventos pequeños y locales",
      features: [
        "Hasta 100 participantes",
        "1 concurso fotográfico",
        "Derechos sobre 1 foto ganadora"
      ],
      buttonText: "SELECCIONAR PLAN",
      buttonVariant: "outline"
    },
    {
      name: "Profesional",
      price: "119€",
      description: "Perfecto para eventos medianos y empresas",
      features: [
        "Hasta 500 participantes",
        "1 concurso fotográfico",
        "Publicidad en la app (banners en el concurso)",
        "Derechos sobre las 3 mejores fotos de cada concurso"
      ],
      recommended: true,
      buttonText: "SELECCIONAR PLAN",
      buttonVariant: "default"
    },
    {
      name: "Premium",
      price: "189€",
      description: "Para grandes eventos y marcas reconocidas",
      features: [
        "Participantes ilimitados",
        "1 concurso fotográfico",
        "Publicidad en la app",
        "Derechos sobre las 3 mejores fotos"
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
        {/* Features Section */}
        <FeaturesSection />

        {/* Advertising Section */}
        <AdvertisingSection />

        {/* Pricing Plans Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-20"
        >
          <PricingPlans plans={customPlans} onSelectPlan={handlePlanSelection} onCustomPlanRequest={handleCustomPlanRequest} />
        </motion.div>

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
