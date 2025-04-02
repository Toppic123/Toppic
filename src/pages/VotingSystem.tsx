
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
        <h1 className="text-3xl font-bold mb-6">Our Voting System</h1>
        <p className="text-muted-foreground mb-8">
          We use a combination of AI preselection and user voting to ensure the best photos win in our contests. 
          Below is a detailed explanation of how our voting system works.
        </p>
        
        <VotingRules 
          aiPreSelection={true} 
          finalUserVoting={true} 
          maxPhotos={50} 
          voterReward={{
            enabled: true,
            description: "Organizers can offer rewards for voters randomly selected from those who participated in the voting."
          }}
        />
      </motion.div>
    </div>
  );
};

export default VotingSystem;
