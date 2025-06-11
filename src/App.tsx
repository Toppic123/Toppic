
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Contests from "./pages/Contests";
import ContestDetail from "./pages/ContestDetail";
import Upload from "./pages/Upload";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import VotingRules from "./pages/VotingRules";
import ContestRules from "./pages/ContestRules";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Support from "./pages/Support";
import Organizers from "./pages/Organizers";
import NotFound from "./pages/NotFound";
import MobilePrototype from "./pages/MobilePrototype";
import GalleryPage from "./pages/GalleryPage";
import ContestGalleryPage from "./pages/ContestGalleryPage";
import GalleryManagement from "./pages/GalleryManagement";
import DashboardSettings from "./pages/DashboardSettings";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Index />} />
                <Route path="register" element={<Register />} />
                <Route path="login" element={<Login />} />
                <Route path="contests" element={<Contests />} />
                <Route path="contests/:id" element={<ContestDetail />} />
                <Route path="contests/:id/gallery" element={<ContestGalleryPage />} />
                <Route path="upload" element={<Upload />} />
                <Route path="profile" element={<Profile />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="admin" element={<AdminDashboard />} />
                <Route path="voting-rules" element={<VotingRules />} />
                <Route path="contest-rules" element={<ContestRules />} />
                <Route path="terms" element={<Terms />} />
                <Route path="privacy" element={<Privacy />} />
                <Route path="support" element={<Support />} />
                <Route path="organizers" element={<Organizers />} />
                <Route path="gallery" element={<GalleryPage />} />
                <Route path="gallery-management" element={<GalleryManagement />} />
                <Route path="dashboard-settings" element={<DashboardSettings />} />
              </Route>
              <Route path="/mobile-prototype" element={<MobilePrototype />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
