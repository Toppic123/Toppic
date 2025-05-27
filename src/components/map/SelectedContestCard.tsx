
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { MapPin, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Contest } from './contestData';

interface SelectedContestCardProps {
  contest: Contest | null;
}

const SelectedContestCard = ({ contest }: SelectedContestCardProps) => {
  const navigate = useNavigate();

  if (!contest) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="absolute bottom-4 left-4 right-4 bg-card/90 backdrop-blur-md p-4 rounded-lg border shadow-lg z-[1000]"
    >
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-medium text-lg">{contest.title}</h3>
            {contest.isPrivate && (
              <Badge variant="outline" className="flex items-center gap-1 border-amber-500 text-amber-700">
                <Lock className="w-3 h-3" />
                <span>Concurso Privado</span>
              </Badge>
            )}
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="w-4 h-4 mr-1" />
            <span>{contest.location}</span>
          </div>
          <div className="mt-1 text-sm text-muted-foreground">
            <span>{contest.photosCount} fotos</span>
          </div>
        </div>
        <Button
          onClick={() => navigate(`/contests/${contest.id}`)}
          size="sm"
          className="bg-[#4891AA] text-white hover:bg-[#3a7a8b]"
        >
          Ver concurso
        </Button>
      </div>
    </motion.div>
  );
};

export default SelectedContestCard;
