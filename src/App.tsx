
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/contexts/AuthContext";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import Contests from "./pages/Contests";
import Upload from "./pages/Upload";
import Profile from "./pages/Profile";
import ContestDetail from "./pages/ContestDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Support from "./pages/Support";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import VotingRules from "./pages/VotingRules";
import Organizers from "./pages/Organizers";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import ContestRules from "./pages/ContestRules";
import GalleryPage from "./pages/GalleryPage";
import MobilePrototype from "./pages/MobilePrototype";
import NotFound from "./pages/NotFound";
import RoleBasedRoute from "./components/RoleBasedRoute";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <TooltipProvider>
          <AuthProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route index element={<Index />} />
                  <Route path="contests" element={<Contests />} />
                  <Route path="contests/:id" element={<ContestDetail />} />
                  <Route path="contests/:id/rules" element={<ContestRules />} />
                  <Route path="upload" element={<Upload />} />
                  <Route path="profile" element={<Profile />} />
                  <Route path="login" element={<Login />} />
                  <Route path="register" element={<Register />} />
                  <Route path="support" element={<Support />} />
                  <Route path="terms" element={<Terms />} />
                  <Route path="privacy" element={<Privacy />} />
                  <Route path="voting-rules" element={<VotingRules />} />
                  <Route path="organizers" element={<Organizers />} />
                  <Route path="gallery" element={<GalleryPage />} />
                  <Route 
                    path="dashboard" 
                    element={
                      <RoleBasedRoute allowedRoles={['organizer', 'admin']}>
                        <Dashboard />
                      </RoleBasedRoute>
                    } 
                  />
                  <Route 
                    path="admin" 
                    element={
                      <RoleBasedRoute allowedRoles={['admin']}>
                        <AdminDashboard />
                      </RoleBasedRoute>
                    } 
                  />
                  <Route path="mobile-prototype" element={<MobilePrototype />} />
                  <Route path="*" element={<NotFound />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </AuthProvider>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
