
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Building, Plus } from "lucide-react";

interface RegistrationCTASectionProps {
  onRegisterClick: () => void;
}

const RegistrationCTASection = ({ onRegisterClick }: RegistrationCTASectionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7 }}
      className="text-center mb-20"
    >
      <div className="bg-gradient-to-br from-[#f46464]/10 via-orange-50 to-red-50 rounded-3xl p-12 max-w-4xl mx-auto border border-[#f46464]/20 shadow-lg">
        <Building className="h-16 w-16 text-[#f46464] mx-auto mb-6" />
        <h2 className="text-3xl font-bold mb-4">¿Quieres organizar concursos?</h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          Conecta con miles de fotógrafos apasionados y crea concursos que inspiren
        </p>
        
        <Button 
          size="lg" 
          className="text-lg px-12 py-6 rounded-full bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-700 shadow-xl"
          onClick={onRegisterClick}
        >
          <Plus className="h-5 w-5 mr-2" />
          Registrarse como Organizador
        </Button>
      </div>
    </motion.div>
  );
};

export default RegistrationCTASection;
