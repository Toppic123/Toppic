
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Camera, Image, Settings } from "lucide-react";
import BannerManagement from "./banners/BannerManagement";

interface OrganizerDashboardProps {
  organizerId: string;
  organizerName: string;
  subscriptionLevel?: "basic" | "standard" | "premium";
}

const OrganizerDashboard = ({ 
  organizerId, 
  organizerName, 
  subscriptionLevel = "standard" 
}: OrganizerDashboardProps) => {
  const [activeTab, setActiveTab] = useState("contests");

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Panel de {organizerName}</h1>
          <p className="text-muted-foreground max-w-2xl">
            Gestiona tus concursos y opciones de publicidad
          </p>
        </div>
      </div>

      <Tabs defaultValue="contests" value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger value="contests" className="flex items-center gap-2">
            <Camera size={16} />
            <span>Mis Concursos</span>
          </TabsTrigger>
          <TabsTrigger value="banners" className="flex items-center gap-2">
            <Image size={16} />
            <span>Banners Publicitarios</span>
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings size={16} />
            <span>Configuración</span>
          </TabsTrigger>
        </TabsList>

        {/* Contests Tab */}
        <TabsContent value="contests" className="space-y-4">
          <div className="rounded-lg border p-6">
            <h2 className="text-xl font-semibold mb-4">Mis Concursos</h2>
            <p>Contenido de gestión de concursos para organizadores.</p>
            {/* Here we would integrate the contest management component for organizers */}
          </div>
        </TabsContent>

        {/* Banners Tab */}
        <TabsContent value="banners" className="space-y-4">
          <div className="rounded-lg border p-6">
            <BannerManagement 
              subscriptionLevel={subscriptionLevel} 
              isAdmin={false} 
              organizerId={organizerId} 
            />
          </div>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-4">
          <div className="rounded-lg border p-6">
            <h2 className="text-xl font-semibold mb-4">Configuración</h2>
            <p>Ajustes de la cuenta del organizador.</p>
            {/* Settings content here */}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OrganizerDashboard;
