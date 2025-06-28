
import { User } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface ClickableUserProfileProps {
  photographer: string;
  photographerAvatar?: string;
  size?: "sm" | "md" | "lg";
  showAvatar?: boolean;
}

const ClickableUserProfile = ({ 
  photographer, 
  photographerAvatar, 
  size = "md",
  showAvatar = true 
}: ClickableUserProfileProps) => {
  const sizeClasses = {
    sm: {
      avatar: "w-6 h-6",
      text: "text-sm"
    },
    md: {
      avatar: "w-8 h-8", 
      text: "text-base"
    },
    lg: {
      avatar: "w-10 h-10",
      text: "text-lg"
    }
  };

  const currentSize = sizeClasses[size];

  // Create a proper profile URL slug from the photographer name
  const createProfileSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '') // Remove special characters except spaces and hyphens
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
      .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
  };

  const profileSlug = createProfileSlug(photographer);

  return (
    <Link to={`/profile/${profileSlug}`}>
      <motion.div 
        className="flex items-center space-x-2 hover:bg-gray-100 rounded-lg p-1 transition-colors cursor-pointer"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {showAvatar && (
          <>
            {photographerAvatar ? (
              <img
                src={photographerAvatar}
                alt={photographer}
                className={`${currentSize.avatar} rounded-full object-cover`}
              />
            ) : (
              <div className={`${currentSize.avatar} rounded-full bg-primary/10 flex items-center justify-center`}>
                <User className="w-4 h-4" />
              </div>
            )}
          </>
        )}
        <span className={`${currentSize.text} font-medium text-primary hover:text-primary/80 transition-colors`}>
          {photographer}
        </span>
      </motion.div>
    </Link>
  );
};

export default ClickableUserProfile;
