
import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Camera, Building } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface UserRoleSwitchProps {
  initialRole?: "participant" | "organizer";
  onRoleChange?: (role: "participant" | "organizer") => void;
  showInProfile?: boolean; // New prop to control visibility in Profile
}

const UserRoleSwitch = ({ 
  initialRole = "participant", 
  onRoleChange,
  showInProfile = false // Default to not showing in profile
}: UserRoleSwitchProps) => {
  const [role, setRole] = useState<"participant" | "organizer">(initialRole);
  const { toast } = useToast();

  // If we're in Profile and should hide this component, return null
  if (showInProfile === false && window.location.pathname.includes("/profile")) {
    return null;
  }

  const handleRoleChange = (newRole: "participant" | "organizer") => {
    if (newRole !== role) {
      setRole(newRole);
      
      toast({
        title: `Switched to ${newRole === "participant" ? "Participant" : "Organizer"} mode`,
        description: newRole === "participant" 
          ? "You can now participate in contests and vote for photos." 
          : "You can now create and manage contests."
      });
      
      if (onRoleChange) {
        onRoleChange(newRole);
      }
    }
  };

  return (
    <div className="mb-6">
      <p className="text-sm text-muted-foreground mb-2">Select your role:</p>
      <Tabs defaultValue={role} className="w-full" onValueChange={(value) => handleRoleChange(value as "participant" | "organizer")}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="participant">
            <Camera className="h-4 w-4 mr-2" />
            <span>Participant</span>
          </TabsTrigger>
          <TabsTrigger value="organizer">
            <Building className="h-4 w-4 mr-2" />
            <span>Organizer</span>
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <div className="mt-2 text-xs text-muted-foreground">
        {role === "participant" ? 
          "As a participant, you can join contests, upload photos, and vote for other entries." :
          "As an organizer, you can create and manage photo contests."
        }
      </div>
    </div>
  );
};

export default UserRoleSwitch;
