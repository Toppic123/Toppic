
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
          We use a combination of AI pre-selection and comparison voting to ensure that the best photographs win in our contests.
          Below is a detailed explanation of how our voting system works.
        </p>
        
        <VotingRules 
          aiPreSelection={true} 
          finalUserVoting={true} 
          maxPhotos={50} 
          voterReward={{
            enabled: true,
            description: "Organizers can offer rewards for voters randomly selected from those who actively participated in the comparison voting."
          }}
        />
        
        <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-100">
          <h3 className="font-medium text-lg text-blue-800 mb-2">Comparison Voting System</h3>
          <p className="text-blue-700">
            In our voting system, users compare pairs of photographs and select the one they consider better. 
            This method allows for a more objective and fair evaluation of images, as each photo is evaluated multiple times 
            in different combinations. We no longer use the traditional one-vote-per-user system, but rather a ranking algorithm 
            based on successive comparisons that determines the best photographs.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default VotingSystem;
