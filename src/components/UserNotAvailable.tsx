
import { AlertCircle, User } from "lucide-react";

interface UserNotAvailableProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  showIcon?: boolean;
  message?: string;
}

const UserNotAvailable = ({ 
  className = "", 
  size = "md", 
  showIcon = true,
  message = "Usuario no disponible"
}: UserNotAvailableProps) => {
  const sizeClasses = {
    sm: "text-xs",
    md: "text-sm", 
    lg: "text-base"
  };

  const iconSizes = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5"
  };

  return (
    <div className={`flex items-center gap-2 text-gray-500 ${sizeClasses[size]} ${className}`}>
      {showIcon && <AlertCircle className={`${iconSizes[size]} flex-shrink-0`} />}
      <span className="italic">{message}</span>
    </div>
  );
};

export default UserNotAvailable;
