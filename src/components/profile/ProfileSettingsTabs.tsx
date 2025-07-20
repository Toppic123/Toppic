
import { useState } from "react";
import { UserCog, MessageCircle, BellRing, PaintBucket, Shield, Wallet } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfileSettings from "./settings/ProfileSettings";
import SocialSettings from "./settings/SocialSettings";
import NotificationSettings from "./settings/NotificationSettings";
import AppearanceSettings from "./settings/AppearanceSettings";
import AccountSettings from "./settings/AccountSettings";
import UserWallet from "./UserWallet";
import { useProfile } from "@/hooks/useProfile";

interface ProfileSettingsTabsProps {
  userData?: {
    name: string;
    email: string;
    bio: string;
    website: string;
    username: string;
  };
  onDeleteAccount: () => void;
}

const ProfileSettingsTabs = ({ userData, onDeleteAccount }: ProfileSettingsTabsProps) => {
  const { profile } = useProfile();

  return (
    <Tabs defaultValue="profile">
      <TabsList className="mb-6">
        <TabsTrigger value="profile">
          <UserCog className="h-4 w-4 mr-2" />
          Perfil
        </TabsTrigger>
        <TabsTrigger value="social">
          <MessageCircle className="h-4 w-4 mr-2" />
          Social
        </TabsTrigger>
        <TabsTrigger value="notifications">
          <BellRing className="h-4 w-4 mr-2" />
          Notificaciones
        </TabsTrigger>
        <TabsTrigger value="appearance">
          <PaintBucket className="h-4 w-4 mr-2" />
          Apariencia
        </TabsTrigger>
        <TabsTrigger value="account">
          <Shield className="h-4 w-4 mr-2" />
          Cuenta
        </TabsTrigger>
        <TabsTrigger value="wallet">
          <Wallet className="h-4 w-4 mr-2" />
          Cartera
        </TabsTrigger>
      </TabsList>

      <TabsContent value="profile" className="space-y-4">
        <ProfileSettings initialData={userData} />
      </TabsContent>

      <TabsContent value="social" className="space-y-4">
        <SocialSettings />
      </TabsContent>

      <TabsContent value="notifications" className="space-y-4">
        <NotificationSettings />
      </TabsContent>

      <TabsContent value="appearance" className="space-y-4">
        <AppearanceSettings />
      </TabsContent>

      <TabsContent value="account" className="space-y-4">
        <AccountSettings onDeleteAccount={onDeleteAccount} />
      </TabsContent>

      <TabsContent value="wallet" className="space-y-4">
        <UserWallet />
      </TabsContent>
    </Tabs>
  );
};

export default ProfileSettingsTabs;
