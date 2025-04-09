
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy } from "lucide-react";

interface Contest {
  id: number;
  title: string;
  date: Date;
  photos: string[];
  isWinner: boolean;
}

interface ContestsListProps {
  contests: Contest[];
}

const ContestsList = ({ contests }: ContestsListProps) => {
  return (
    <div className="space-y-4">
      {contests.map((contest) => (
        <Card key={contest.id}>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">{contest.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {contest.date.toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
              {contest.isWinner && (
                <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">
                  <Trophy className="h-3 w-3 mr-1" /> Ganador
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {contest.photos.map((photo, i) => (
                <img
                  key={i}
                  src={photo}
                  alt={`Foto ${i + 1} del concurso ${contest.id}`}
                  className="w-20 h-14 object-cover rounded"
                />
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ContestsList;
