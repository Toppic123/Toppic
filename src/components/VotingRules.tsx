
import { motion } from "framer-motion";
import { CheckCircle, Image, Award, Users, Gift, Brain } from "lucide-react";
import { cn } from "@/lib/utils";

interface VoterReward {
  enabled: boolean;
  description: string;
}

interface VotingRulesProps {
  aiPreSelection?: boolean;
  finalUserVoting?: boolean;
  maxPhotos?: number;
  voterReward?: VoterReward;
  className?: string;
}

const VotingRules = ({
  aiPreSelection = true,
  finalUserVoting = true,
  maxPhotos = 50,
  voterReward = { enabled: false, description: "" },
  className
}: VotingRulesProps) => {
  
  // Define the steps in the voting process
  const steps = [
    {
      title: "Análisis de calidad de imagen",
      icon: Image,
      description: "Detecta y descarta fotos borrosas, mal iluminadas o de baja resolución.",
      enabled: aiPreSelection
    },
    {
      title: "Algoritmo de clasificación",
      icon: Brain,
      description: "Utiliza técnicas como Elo Rating o TrueSkill para comparar y clasificar fotografías.",
      enabled: aiPreSelection
    },
    {
      title: "Selección final",
      icon: CheckCircle,
      description: `Obtiene las ${maxPhotos} mejores fotografías para la fase de votación.`,
      enabled: aiPreSelection
    },
    {
      title: "Votación de usuarios",
      icon: Users,
      description: "Los usuarios registrados pueden votar por sus fotos favoritas durante el período de votación.",
      enabled: finalUserVoting
    },
    {
      title: "Premiación",
      icon: Award,
      description: "Las fotos con mayor puntuación son declaradas ganadoras y reciben los premios del concurso.",
      enabled: true
    },
    {
      title: "Recompensas para votantes",
      icon: Gift,
      description: voterReward.description || "Los votantes pueden recibir recompensas por participar activamente en la votación.",
      enabled: voterReward.enabled
    }
  ];
  
  return (
    <div className={cn("space-y-8", className)}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {steps.filter(step => step.enabled).map((step, index) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="bg-white p-6 rounded-lg border shadow-sm"
          >
            <div className="flex items-start">
              <div className="mr-4 bg-primary/10 p-2 rounded-full">
                <step.icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-lg mb-2">{index + 1}. {step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      {aiPreSelection && (
        <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg">
          <h4 className="font-medium flex items-center text-blue-700">
            <Brain className="h-5 w-5 mr-2" />
            Inteligencia Artificial en la preselección
          </h4>
          <p className="mt-2 text-blue-600 text-sm">
            Nuestra IA avanzada evalúa aspectos técnicos de cada fotografía como nitidez, exposición, 
            composición y calidad general para garantizar que solo las mejores fotos lleguen a la fase de votación.
            Este proceso es totalmente imparcial y se basa únicamente en criterios objetivos de calidad fotográfica.
          </p>
        </div>
      )}
    </div>
  );
};

export default VotingRules;
