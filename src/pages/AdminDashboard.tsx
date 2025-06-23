
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Trophy, MessageSquare, Star, Flag, Image } from "lucide-react";
import ContestManagement from "@/components/admin/dashboard/ContestManagement";
import { OrganizerManagement } from "@/components/admin/dashboard/organizers";
import UserManagement from "@/components/admin/dashboard/UserManagement";
import SupportMessagesManagement from "@/components/admin/dashboard/SupportMessagesManagement";
import BannerManagement from "@/components/dashboard/banners/BannerManagement";
import GalleryManager from "@/components/admin/GalleryManager";
import PhotoReportsManagement from "@/components/admin/dashboard/PhotoReportsManagement";
import FeaturedContestsManagement from "@/components/admin/dashboard/FeaturedContestsManagement";
import FeaturedGalleryManagement from "@/components/admin/dashboard/FeaturedGalleryManagement";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("contests");

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container max-w-7xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Panel de Administración</h1>
          <p className="text-muted-foreground">
            Gestiona concursos, usuarios y configuraciones de la plataforma
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-9">
            <TabsTrigger value="contests" className="flex items-center gap-2">
              <Trophy className="h-4 w-4" />
              <span className="hidden sm:inline">Concursos</span>
            </TabsTrigger>
            <TabsTrigger value="featured" className="flex items-center gap-2">
              <Star className="h-4 w-4" />
              <span className="hidden sm:inline">Destacados</span>
            </TabsTrigger>
            <TabsTrigger value="featured-gallery" className="flex items-center gap-2">
              <Image className="h-4 w-4" />
              <span className="hidden sm:inline">Galería</span>
            </TabsTrigger>
            <TabsTrigger value="organizers" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Organizadores</span>
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Usuarios</span>
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center gap-2">
              <Flag className="h-4 w-4" />
              <span className="hidden sm:inline">Reportes</span>
            </TabsTrigger>
            <TabsTrigger value="gallery" className="flex items-center gap-2">
              <Image className="h-4 w-4" />
              <span className="hidden sm:inline">Fotos</span>
            </TabsTrigger>
            <TabsTrigger value="support" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              <span className="hidden sm:inline">Soporte</span>
            </TabsTrigger>
            <TabsTrigger value="banners" className="flex items-center gap-2">
              <Image className="h-4 w-4" />
              <span className="hidden sm:inline">Banners</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="contests" className="mt-6">
            <ContestManagement />
          </TabsContent>

          <TabsContent value="featured" className="mt-6">
            <FeaturedContestsManagement />
          </TabsContent>

          <TabsContent value="featured-gallery" className="mt-6">
            <FeaturedGalleryManagement />
          </TabsContent>

          <TabsContent value="organizers" className="mt-6">
            <OrganizerManagement />
          </TabsContent>

          <TabsContent value="users" className="mt-6">
            <UserManagement />
          </TabsContent>

          <TabsContent value="reports" className="mt-6">
            <PhotoReportsManagement />
          </TabsContent>

          <TabsContent value="gallery" className="mt-6">
            <GalleryManager />
          </TabsContent>

          <TabsContent value="support" className="mt-6">
            <SupportMessagesManagement />
          </TabsContent>

          <TabsContent value="banners" className="mt-6">
            <BannerManagement />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
