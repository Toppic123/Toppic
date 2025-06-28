
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Trophy, MessageSquare, Image, Camera, Star } from "lucide-react";
import ContestManagement from "@/components/admin/dashboard/ContestManagement";
import { OrganizerManagement } from "@/components/admin/dashboard/organizers";
import UserManagement from "@/components/admin/dashboard/UserManagement";
import SupportMessagesManagement from "@/components/admin/dashboard/SupportMessagesManagement";
import BannerManagement from "@/components/dashboard/banners/BannerManagement";
import GalleryManager from "@/components/admin/GalleryManager";
import ContestPhotoManager from "@/components/admin/ContestPhotoManager";
import FeaturedContestsManagement from "@/components/admin/dashboard/FeaturedContestsManagement";
import { useToast } from "@/hooks/use-toast";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("contests");
  const { toast } = useToast();

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
          <TabsList className="grid w-full grid-cols-8 overflow-x-auto">
            <TabsTrigger value="contests" className="flex items-center gap-2 whitespace-nowrap">
              <Trophy className="h-4 w-4" />
              <span className="hidden sm:inline">Concursos</span>
            </TabsTrigger>
            <TabsTrigger value="featured" className="flex items-center gap-2 whitespace-nowrap">
              <Star className="h-4 w-4" />
              <span className="hidden sm:inline">Destacados</span>
            </TabsTrigger>
            <TabsTrigger value="contest-photos" className="flex items-center gap-2 whitespace-nowrap">
              <Camera className="h-4 w-4" />
              <span className="hidden sm:inline">Fotos</span>
            </TabsTrigger>
            <TabsTrigger value="organizers" className="flex items-center gap-2 whitespace-nowrap">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Organizadores</span>
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2 whitespace-nowrap">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Usuarios</span>
            </TabsTrigger>
            <TabsTrigger value="gallery" className="flex items-center gap-2 whitespace-nowrap">
              <Image className="h-4 w-4" />
              <span className="hidden sm:inline">Galería</span>
            </TabsTrigger>
            <TabsTrigger value="support" className="flex items-center gap-2 whitespace-nowrap">
              <MessageSquare className="h-4 w-4" />
              <span className="hidden sm:inline">Soporte</span>
            </TabsTrigger>
            <TabsTrigger value="banners" className="flex items-center gap-2 whitespace-nowrap">
              <Image className="h-4 w-4" />
              <span className="hidden sm:inline">Banners</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="contests" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Gestión de Concursos</CardTitle>
                <CardDescription>
                  Administra todos los concursos de la plataforma
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ContestManagement />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="featured" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Concursos Destacados</CardTitle>
                <CardDescription>
                  Selecciona qué concursos aparecen en "Concursos Populares" en la página principal
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FeaturedContestsManagement />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contest-photos" className="mt-6">
            <ContestPhotoManager />
          </TabsContent>

          <TabsContent value="organizers" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Gestión de Organizadores</CardTitle>
                <CardDescription>
                  Administra las cuentas de organizadores
                </CardDescription>
              </CardHeader>
              <CardContent>
                <OrganizerManagement />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Gestión de Usuarios</CardTitle>
                <CardDescription>
                  Administra las cuentas de usuarios
                </CardDescription>
              </CardHeader>
              <CardContent>
                <UserManagement />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="gallery" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Gestor de Galería</CardTitle>
                <CardDescription>
                  Administra todas las fotos de la plataforma
                </CardDescription>
              </CardHeader>
              <CardContent>
                <GalleryManager />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="support" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Mensajes de Soporte</CardTitle>
                <CardDescription>
                  Gestiona las consultas y mensajes de soporte
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SupportMessagesManagement />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="banners" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Gestión de Banners</CardTitle>
                <CardDescription>
                  Administra los banners publicitarios
                </CardDescription>
              </CardHeader>
              <CardContent>
                <BannerManagement />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
