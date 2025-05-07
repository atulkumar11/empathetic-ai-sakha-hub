
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children?: React.ReactNode;
  redirectTo?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  redirectTo = '/login' 
}) => {
  const { user, loading } = useAuth();

  // Show loading spinner while checking auth
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // For development, temporarily allow access without authentication
  if (process.env.NODE_ENV === 'development') {
    return children ? <>{children}</> : <Outlet />;
  }

  // If not authenticated, redirect to login
  if (!user) {
    return <Navigate to={redirectTo} replace />;
  }

  // If authenticated, render children or outlet
  return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoute;
