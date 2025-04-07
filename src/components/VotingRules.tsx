
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
      title: "Image Quality Analysis",
      icon: Image,
      description: "Detects and discards blurry, poorly lit, or low-resolution photos.",
      enabled: aiPreSelection
    },
    {
      title: "Ranking Algorithm",
      icon: Brain,
      description: "Uses techniques like Elo Rating or TrueSkill to compare and rank photographs.",
      enabled: aiPreSelection
    },
    {
      title: "Comparison Voting",
      icon: Users,
      description: "Users compare and vote between pairs of photographs to determine the best ones.",
      enabled: finalUserVoting
    },
    {
      title: "Awards",
      icon: Award,
      description: "Photos with the highest scores are declared winners and receive contest prizes.",
      enabled: true
    },
    {
      title: "Voter Rewards",
      icon: Gift,
      description: voterReward.description || "Voters may receive rewards for actively participating in the voting process.",
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
            AI in Pre-selection
          </h4>
          <p className="mt-2 text-blue-600 text-sm">
            Our advanced AI evaluates technical aspects of each photograph such as sharpness, exposure, 
            composition, and overall quality to ensure only the best photos reach the voting phase.
            This process is completely impartial and based solely on objective photographic quality criteria.
          </p>
        </div>
      )}
    </div>
  );
};

export default VotingRules;
