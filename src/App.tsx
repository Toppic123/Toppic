
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import DashboardSettings from "./pages/DashboardSettings";
import NotFound from "./pages/NotFound";
import Contests from "./pages/Contests";
import ContestDetail from "./pages/ContestDetail";
import Upload from "./pages/Upload";
import GalleryPage from "./pages/GalleryPage";
import GalleryManagement from "./pages/GalleryManagement";
import Organizers from "./pages/Organizers";
import Support from "./pages/Support";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import VotingSystem from "./pages/VotingSystem";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { usePushNotification } from "@/components/PushNotification";

// Create React Query client
const queryClient = new QueryClient();

function App() {
  const { NotificationsRenderer } = usePushNotification();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light">
        <Router>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/settings" element={<DashboardSettings />} />
              <Route path="/contests" element={<Contests />} />
              <Route path="/contests/:id" element={<ContestDetail />} />
              <Route path="/upload" element={<Upload />} />
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="/gallery/manage" element={<GalleryManagement />} />
              <Route path="/organizers" element={<Organizers />} />
              <Route path="/support" element={<Support />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/voting-system" element={<VotingSystem />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
          
          {/* Global notification system */}
          <NotificationsRenderer />
          
          {/* Toast notifications */}
          <Toaster />
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
