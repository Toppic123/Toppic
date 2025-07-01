
import { useState } from "react";
import { User } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OrganizersList from "./OrganizersList";

const OrganizerManagement = () => {
  const [activeTab, setActiveTab] = useState("list");

  return (
    <>
      <Tabs defaultValue="list" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-1 mb-8">
          <TabsTrigger value="list" className="flex items-center gap-2">
            <User size={16} />
            <span>Organizadores</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="list" className="space-y-4">
          <OrganizersList />
        </TabsContent>
      </Tabs>
    </>
  );
};

export default OrganizerManagement;
