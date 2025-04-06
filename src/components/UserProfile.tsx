
import { useState } from "react";
import { Trophy, Camera, Calendar, Bell } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

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
  const [notificationPreferences, setNotificationPreferences] = useState({
    nearbyContests: true,
    photoComments: true,
    contestsWon: true,
    rewards: true,
  });

  const handleNotificationChange = (key: keyof typeof notificationPreferences) => {
    setNotificationPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

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
                <span className="text-sm">{contestsWon} won</span>
              </div>
              <div className="flex items-center">
                <Camera className="w-4 h-4 mr-2 text-blue-500" />
                <span className="text-sm">{photosUploaded} photos</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2 text-green-500" />
                <span className="text-sm">Since {new Date(joinDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-muted/50 px-6 py-4 border-t">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Contests participated</p>
            <p className="text-2xl font-bold">{contestsParticipated}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Contests won</p>
            <p className="text-2xl font-bold">{contestsWon}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Win ratio</p>
            <p className="text-2xl font-bold">
              {contestsParticipated > 0 
                ? `${Math.round((contestsWon / contestsParticipated) * 100)}%` 
                : "0%"}
            </p>
          </div>
        </div>
      </div>

      <div className="p-6 border-t">
        <div className="flex items-center mb-4">
          <Bell className="w-5 h-5 mr-2 text-primary" />
          <h3 className="text-lg font-medium">Notification Preferences</h3>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label 
              htmlFor="nearby-contests"
              className={cn(
                "cursor-pointer flex-1",
                notificationPreferences.nearbyContests ? "text-foreground" : "text-muted-foreground"
              )}
            >
              Nearby contests
            </Label>
            <Switch
              id="nearby-contests"
              checked={notificationPreferences.nearbyContests}
              onCheckedChange={() => handleNotificationChange("nearbyContests")}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label 
              htmlFor="photo-comments"
              className={cn(
                "cursor-pointer flex-1",
                notificationPreferences.photoComments ? "text-foreground" : "text-muted-foreground"
              )}
            >
              Photo comments
            </Label>
            <Switch
              id="photo-comments"
              checked={notificationPreferences.photoComments}
              onCheckedChange={() => handleNotificationChange("photoComments")}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label 
              htmlFor="contests-won"
              className={cn(
                "cursor-pointer flex-1",
                notificationPreferences.contestsWon ? "text-foreground" : "text-muted-foreground"
              )}
            >
              Contests won
            </Label>
            <Switch
              id="contests-won"
              checked={notificationPreferences.contestsWon}
              onCheckedChange={() => handleNotificationChange("contestsWon")}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label 
              htmlFor="rewards"
              className={cn(
                "cursor-pointer flex-1",
                notificationPreferences.rewards ? "text-foreground" : "text-muted-foreground"
              )}
            >
              Rewards received
            </Label>
            <Switch
              id="rewards"
              checked={notificationPreferences.rewards}
              onCheckedChange={() => handleNotificationChange("rewards")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
