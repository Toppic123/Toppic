
import { Trophy, Camera, Calendar } from "lucide-react";

type UserProfileProps = {
  username: string;
  fullName: string;
  avatarUrl?: string;
  contestsParticipated: number;
  contestsWon: number;
  photosUploaded: number;
  joinDate: string;
};

const UserProfile = ({
  username,
  fullName,
  avatarUrl,
  contestsParticipated,
  contestsWon,
  photosUploaded,
  joinDate,
}: UserProfileProps) => {
  return (
    <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
      <div className="p-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="relative">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={fullName}
                className="w-24 h-24 rounded-full object-cover border-2 border-background"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center text-2xl font-medium text-muted-foreground">
                {fullName.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          
          <div className="text-center sm:text-left">
            <h2 className="text-2xl font-bold">{fullName}</h2>
            <p className="text-muted-foreground">@{username}</p>
            
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 mt-4">
              <div className="flex items-center">
                <Trophy className="w-4 h-4 mr-2 text-amber-500" />
                <span className="text-sm">{contestsWon} ganados</span>
              </div>
              <div className="flex items-center">
                <Camera className="w-4 h-4 mr-2 text-blue-500" />
                <span className="text-sm">{photosUploaded} fotos</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2 text-green-500" />
                <span className="text-sm">Desde {new Date(joinDate).toLocaleDateString('es-ES', { year: 'numeric', month: 'long' })}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-muted/50 px-6 py-4 border-t">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Concursos participados</p>
            <p className="text-2xl font-bold">{contestsParticipated}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Concursos ganados</p>
            <p className="text-2xl font-bold">{contestsWon}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Ratio de victoria</p>
            <p className="text-2xl font-bold">
              {contestsParticipated > 0 
                ? `${Math.round((contestsWon / contestsParticipated) * 100)}%` 
                : "0%"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
