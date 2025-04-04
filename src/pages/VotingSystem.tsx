
import { motion } from "framer-motion";
import VotingRules from "@/components/VotingRules";

const VotingSystem = () => {
  return (
    <div className="container max-w-4xl mx-auto py-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-6">Nuestro Sistema de Votación</h1>
        <p className="text-muted-foreground mb-8">
          Utilizamos una combinación de preselección mediante IA y votación por comparación para garantizar que las mejores fotografías ganen en nuestros concursos.
          A continuación se explica en detalle cómo funciona nuestro sistema de votación.
        </p>
        
        <VotingRules 
          aiPreSelection={true} 
          finalUserVoting={true} 
          maxPhotos={50} 
          voterReward={{
            enabled: true,
            description: "Los organizadores pueden ofrecer recompensas para votantes seleccionados aleatoriamente entre quienes participaron activamente en la votación."
          }}
        />
      </motion.div>
    </div>
  );
};

export default VotingSystem;
