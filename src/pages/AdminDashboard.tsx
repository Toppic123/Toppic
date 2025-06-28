
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import UserManagement from "@/components/admin/dashboard/UserManagement";
import ContestManagement from "@/components/admin/dashboard/ContestManagement";
import PhotoReportsManagement from "@/components/admin/dashboard/PhotoReportsManagement";
import SupportMessagesManagement from "@/components/admin/dashboard/SupportMessagesManagement";
import FeaturedContestsManagement from "@/components/admin/dashboard/FeaturedContestsManagement";
import FeaturedGalleryManagement from "@/components/admin/dashboard/FeaturedGalleryManagement";
import { BannerManagement } from "@/components/dashboard/banners/BannerManagement";

const AdminDashboard = () => {
  const { user, userRole } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");

  // Redirect if not admin
  if (!user || userRole !== 'admin') {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Panel de Administración</h1>
        <p className="text-muted-foreground">Gestiona usuarios, concursos y contenido de la plataforma</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-7">
          <TabsTrigger value="overview">Resumen</TabsTrigger>
          <TabsTrigger value="contests">Concursos</TabsTrigger>
          <TabsTrigger value="featured-contests">Destacados</TabsTrigger>
          <TabsTrigger value="featured-gallery">Galería</TabsTrigger>
          <TabsTrigger value="users">Usuarios</TabsTrigger>
          <TabsTrigger value="reports">Reportes</TabsTrigger>
          <TabsTrigger value="support">Soporte</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Usuarios</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,234</div>
                <p className="text-xs text-muted-foreground">+10% desde el mes pasado</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Concursos Activos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">23</div>
                <p className="text-xs text-muted-foreground">+2 nuevos esta semana</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Fotos Subidas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5,678</div>
                <p className="text-xs text-muted-foreground">+15% esta semana</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Reportes Pendientes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">Requieren atención</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="contests">
          <ContestManagement />
        </TabsContent>

        <TabsContent value="featured-contests">
          <FeaturedContestsManagement />
        </TabsContent>

        <TabsContent value="featured-gallery">
          <FeaturedGalleryManagement />
        </TabsContent>

        <TabsContent value="users">
          <UserManagement />
        </TabsContent>

        <TabsContent value="reports">
          <PhotoReportsManagement />
        </TabsContent>

        <TabsContent value="support">
          <SupportMessagesManagement />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
