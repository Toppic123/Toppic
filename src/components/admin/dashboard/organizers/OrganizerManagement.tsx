
import { useState } from "react";
import { User, Image } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { BannerUploader } from "../banners";
import OrganizersList from "./OrganizersList";
import { BannerType } from "../banners/BannerSizeRequirements";

const OrganizerManagement = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("list");

  // Handle banner upload
  const handleBannerUpload = (type: BannerType, file: File) => {
    toast({
      title: "Banner guardado",
      description: `El banner ha sido guardado correctamente y estará disponible para su uso.`,
    });
  };

  return (
    <>
      <Tabs defaultValue="list" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 mb-8">
          <TabsTrigger value="list" className="flex items-center gap-2">
            <User size={16} />
            <span>Organizadores</span>
          </TabsTrigger>
          <TabsTrigger value="banners" className="flex items-center gap-2">
            <Image size={16} />
            <span>Banners Publicitarios</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="list" className="space-y-4">
          <OrganizersList />
        </TabsContent>
        
        <TabsContent value="banners" className="space-y-4">
          <BannerUploader onBannerUpload={handleBannerUpload} />
        </TabsContent>
      </Tabs>
    </>
  );
};

export default OrganizerManagement;
