
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { MapPin, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Contest } from './contestData';

interface NearbyContestsListProps {
  contests: Contest[];
}

const NearbyContestsList = ({ contests }: NearbyContestsListProps) => {
  const navigate = useNavigate();

  if (contests.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="absolute bottom-4 left-4 right-4 bg-card/90 backdrop-blur-md p-4 rounded-lg border shadow-lg max-h-[50%] overflow-auto z-[1000]"
    >
      <h3 className="text-lg font-medium mb-4">Concursos cercanos ({contests.length})</h3>
      <div className="space-y-3">
        {contests.map((contest) => (
          <div 
            key={contest.id} 
            className="flex justify-between items-center p-3 bg-background/80 rounded-md hover:bg-background transition-colors cursor-pointer"
            onClick={() => navigate(`/contests/${contest.id}`)}
          >
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-medium">{contest.title}</h4>
                {contest.isPrivate && (
                  <Badge variant="outline" className="flex items-center gap-1 border-amber-500 text-amber-700">
                    <Lock className="w-3 h-3" />
                    <span>Privado</span>
                  </Badge>
                )}
              </div>
              <div className="flex items-center text-xs text-muted-foreground mt-1">
                <MapPin className="w-3 h-3 mr-1" />
                <span>{contest.location}</span>
              </div>
            </div>
            <Button size="sm">
              Ver
            </Button>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default NearbyContestsList;
