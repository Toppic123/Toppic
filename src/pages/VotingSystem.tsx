
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
            description: "Los organizadores pueden ofrecer recompensas para votantes seleccionados aleatoriamente entre quienes participaron activamente en la votación por comparación."
          }}
        />
        
        <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-100">
          <h3 className="font-medium text-lg text-blue-800 mb-2">Sistema de votación por comparación</h3>
          <p className="text-blue-700">
            En nuestro sistema de votación, los usuarios comparan pares de fotografías y seleccionan la que consideran mejor. 
            Este método permite una evaluación más objetiva y justa de las imágenes, ya que cada foto se evalúa múltiples veces 
            en diferentes combinaciones. Ya no utilizamos el sistema tradicional de un voto por usuario, sino un algoritmo de 
            clasificación basado en comparaciones sucesivas que determina las mejores fotografías.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default VotingSystem;
