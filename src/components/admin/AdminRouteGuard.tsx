
import React from 'react';
import { Navigate } from 'react-router-dom';
import authService from '@/services/auth/authService';
import LoadingScreen from '@/components/common/LoadingScreen';

interface AdminRouteGuardProps {
  children: React.ReactNode;
}

const AdminRouteGuard: React.FC<AdminRouteGuardProps> = ({ children }) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [isAdmin, setIsAdmin] = React.useState(false);

  React.useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true);
      
      try {
        // Check if user is authenticated
        const isAuthenticated = await authService.verifyToken();
        
        if (isAuthenticated) {
          // Check if user has admin role
          const hasAdminRole = authService.isAdmin();
          setIsAdmin(hasAdminRole);
        } else {
          setIsAdmin(false);
        }
      } catch (error) {
        console.error("Error verifying admin access:", error);
        setIsAdmin(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
};

export default AdminRouteGuard;
