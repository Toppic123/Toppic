import React, { useState } from "react";
import { MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage, AvatarUpload } from "@/components/ui/avatar";

interface ProfileHeaderProps {
  user: {
    id: string;
    username: string;
    name: string;
    bio: string;
    avatar: string;
    location: string;
    stats: {
      contests: number;
      wins: number;
      photos: number;
    };
  };
  isCurrentUser: boolean;
  profileImagePreview: string | null;
  onProfileImageSelect: (file: File) => void;
}

const ProfileHeader = ({
  user,
  isCurrentUser,
  profileImagePreview,
  onProfileImageSelect,
}: ProfileHeaderProps) => {
  // Display username if available, otherwise fall back to name
  const displayName = user.username || user.name;
  const displayHandle = user.username || user.name;
  
  return (
    <Card className="mb-8">
      <CardContent className="pt-6">
        <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
          {isCurrentUser ? (
            <AvatarUpload
              size="md"
              previewUrl={profileImagePreview || user.avatar}
              onImageSelect={onProfileImageSelect}
              className="h-24 w-24"
            />
          ) : (
            <Avatar className="h-24 w-24">
              <AvatarImage src={user.avatar} alt={displayName} />
              <AvatarFallback>{displayName.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
          )}
          
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-2xl font-bold">{displayName}</h1>
            
            <div className="flex items-center justify-center md:justify-start text-sm text-muted-foreground mb-4">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{user.location}</span>
            </div>
            
            <p className="mb-4">{user.bio}</p>
            
            <div className="flex justify-center md:justify-start space-x-6">
              <div className="text-center">
                <div className="font-medium">{user.stats.contests}</div>
                <div className="text-xs text-muted-foreground">Concursos</div>
              </div>
              <div className="text-center">
                <div className="font-medium">{user.stats.wins}</div>
                <div className="text-xs text-muted-foreground">Victorias</div>
              </div>
              <div className="text-center">
                <div className="font-medium">{user.stats.photos}</div>
                <div className="text-xs text-muted-foreground">Fotos</div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileHeader;