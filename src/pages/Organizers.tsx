
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
        "Derechos sobre la foto ganadora"
      ],
      buttonText: "SELECCIONAR PLAN",
      buttonVariant: "outline"
    },
    {
      name: "Profesional",
      price: "149€",
      description: "Perfecto para eventos medianos y empresas",
      features: [
        "Hasta 500 participantes",
        "Publicidad en app",
        "Derechos sobre las 3 mejores fotos"
      ],
      recommended: true,
      buttonText: "SELECCIONAR PLAN",
      buttonVariant: "default"
    },
    {
      name: "Premium",
      price: "299€",
      description: "Para grandes eventos y marcas reconocidas",
      features: [
        "Participantes ilimitados",
        "Publicidad en app",
        "Derechos sobre las 5 mejores fotos"
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
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-[#f46464] mb-4 tracking-tight">NUESTROS PLANES</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Elige el plan que mejor se adapte a tus necesidades, con las tarifas a continuación
            </p>
          </div>
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
