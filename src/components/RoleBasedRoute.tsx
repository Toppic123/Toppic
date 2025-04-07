
import { Navigate, Outlet } from "react-router-dom";
import { useAuth, UserRole } from "@/contexts/AuthContext";

type RoleBasedRouteProps = {
  allowedRoles: UserRole[];
  redirectTo?: string;
  children?: React.ReactNode;
};

const RoleBasedRoute = ({ 
  allowedRoles, 
  redirectTo = "/login", 
  children 
}: RoleBasedRouteProps) => {
  const { user, isLoading, userRole } = useAuth();
  
  if (isLoading) {
    // Show loading state while checking authentication
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }
  
  // If not logged in or role doesn't match, redirect
  if (!user || !userRole || !allowedRoles.includes(userRole)) {
    return <Navigate to={redirectTo} replace />;
  }
  
  // Render children or outlet
  return children ? <>{children}</> : <Outlet />;
};

export default RoleBasedRoute;
