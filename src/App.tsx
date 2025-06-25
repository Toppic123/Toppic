
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { lazy, Suspense } from "react";
import NotFound from "./pages/NotFound";

// Lazy load pages for better performance
const Index = lazy(() => import("./pages/Index"));
const Contests = lazy(() => import("./pages/Contests"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Profile = lazy(() => import("./pages/Profile"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const Upload = lazy(() => import("./pages/Upload"));
const ContestDetail = lazy(() => import("./pages/ContestDetail"));
const ContestGalleryPage = lazy(() => import("./pages/ContestGalleryPage"));
const GalleryPage = lazy(() => import("./pages/GalleryPage"));
const VotingSystem = lazy(() => import("./pages/VotingSystem"));
const VotingRulesPage = lazy(() => import("./pages/VotingRulesPage"));
const ContestRules = lazy(() => import("./pages/ContestRules"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const Support = lazy(() => import("./pages/Support"));
const Organizers = lazy(() => import("./pages/Organizers"));
const MobilePrototype = lazy(() => import("./pages/MobilePrototype"));

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Suspense fallback={
              <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
              </div>
            }>
              <Routes>
                {/* Main Routes */}
                <Route path="/" element={<Index />} />
                <Route path="/contests" element={<Contests />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/upload" element={<Upload />} />
                
                {/* Contest Routes */}
                <Route path="/contest/:id" element={<ContestDetail />} />
                <Route path="/contest/:id/gallery" element={<ContestGalleryPage />} />
                
                {/* Gallery Routes */}
                <Route path="/gallery" element={<GalleryPage />} />
                
                {/* Voting Routes */}
                <Route path="/voting" element={<VotingSystem />} />
                <Route path="/voting-rules" element={<VotingRulesPage />} />
                
                {/* Info Pages */}
                <Route path="/contest-rules" element={<ContestRules />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/support" element={<Support />} />
                <Route path="/organizers" element={<Organizers />} />
                
                {/* Mobile App Route */}
                <Route path="/mobile" element={<MobilePrototype />} />
                
                {/* 404 Route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
