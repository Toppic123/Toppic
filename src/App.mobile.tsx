
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { usePushNotification } from "@/components/PushNotification";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import RoleBasedRoute from "@/components/RoleBasedRoute";

// Mobile-specific lazy loaded pages
const MobileHome = lazy(() => import("./pages/mobile/MobileHome"));
const MobileLogin = lazy(() => import("./pages/mobile/MobileLogin"));
const MobileRegister = lazy(() => import("./pages/mobile/MobileRegister"));
const MobileContests = lazy(() => import("./pages/mobile/MobileContests"));
const MobileContestDetail = lazy(() => import("./pages/mobile/MobileContestDetail"));
const MobileProfile = lazy(() => import("./pages/mobile/MobileProfile"));
const MobileUpload = lazy(() => import("./pages/mobile/MobileUpload"));
const MobileGallery = lazy(() => import("./pages/mobile/MobileGallery"));

// Mobile layout
const MobileLayout = lazy(() => import("./components/mobile/MobileLayout"));

// Create React Query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

// Protected route component for mobile
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#4891AA]">
        <div className="text-white text-lg">Cargando...</div>
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  return <>{children}</>;
};

function AppMobile() {
  const { NotificationsRenderer } = usePushNotification();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light">
        <AuthProvider>
          <Router>
            <Suspense fallback={
              <div className="flex items-center justify-center h-screen bg-[#4891AA]">
                <div className="text-white text-lg">Cargando...</div>
              </div>
            }>
              <Routes>
                <Route element={<MobileLayout />}>
                  <Route path="/" element={<MobileHome />} />
                  <Route path="/login" element={<MobileLogin />} />
                  <Route path="/register" element={<MobileRegister />} />
                  <Route path="/contests" element={<MobileContests />} />
                  <Route path="/contests/:id" element={<MobileContestDetail />} />
                  <Route path="/profile" element={
                    <ProtectedRoute>
                      <MobileProfile />
                    </ProtectedRoute>
                  } />
                  <Route path="/upload" element={
                    <RoleBasedRoute allowedRoles={['participant', 'admin']}>
                      <MobileUpload />
                    </RoleBasedRoute>
                  } />
                  <Route path="/gallery" element={<MobileGallery />} />
                  <Route path="*" element={<Navigate to="/" />} />
                </Route>
              </Routes>
            </Suspense>
            
            {/* Global notification system */}
            <NotificationsRenderer />
            
            {/* Toast notifications */}
            <Toaster />
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default AppMobile;
