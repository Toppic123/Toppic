
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";
import UserNotAvailable from "./UserNotAvailable";

interface ClickableUserProfileProps {
  photographer: string;
  photographerAvatar?: string;
  size?: "sm" | "md" | "lg";
  showAvatar?: boolean;
  className?: string;
}

const ClickableUserProfile = ({ 
  photographer, 
  photographerAvatar, 
  size = "sm",
  showAvatar = true,
  className = ""
}: ClickableUserProfileProps) => {
  const navigate = useNavigate();
  const [profileError, setProfileError] = useState(false);

  const sizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg"
  };

  const avatarSizes = {
    sm: "h-6 w-6",
    md: "h-8 w-8", 
    lg: "h-10 w-10"
  };

  // Check if this is a system/admin created photo or non-existent user
  const isSystemUser = !photographer || 
                      photographer === 'Anónimo' || 
                      photographer === 'Admin' || 
                      photographer === 'Sistema' ||
                      photographer.includes('@admin') ||
                      profileError;

  const handleProfileClick = async () => {
    if (isSystemUser) {
      // Don't navigate, just show that user is not available
      return;
    }

    try {
      // In a real app, you might want to check if the user exists first
      // For now, we'll assume navigation works unless we know it's a system user
      navigate(`/profile/${encodeURIComponent(photographer)}`);
    } catch (error) {
      console.error('Error navigating to profile:', error);
      setProfileError(true);
    }
  };

  if (isSystemUser) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        {showAvatar && (
          <Avatar className={avatarSizes[size]}>
            <AvatarFallback className="bg-gray-200">
              <User className="h-3 w-3 text-gray-400" />
            </AvatarFallback>
          </Avatar>
        )}
        <UserNotAvailable 
          size={size} 
          showIcon={false}
          message="Usuario no disponible"
          className={sizeClasses[size]}
        />
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {showAvatar && (
        <Avatar className={avatarSizes[size]}>
          <AvatarImage src={photographerAvatar} alt={photographer} />
          <AvatarFallback>
            <User className="h-3 w-3" />
          </AvatarFallback>
        </Avatar>
      )}
      <Button
        variant="link"
        className={`p-0 h-auto font-medium hover:underline ${sizeClasses[size]}`}
        onClick={handleProfileClick}
      >
        {photographer}
      </Button>
    </div>
  );
};

export default ClickableUserProfile;
