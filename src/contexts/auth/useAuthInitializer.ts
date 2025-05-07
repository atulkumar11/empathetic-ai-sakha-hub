
import { useState, useEffect } from 'react';
import authService, { AuthUser } from '@/services/auth/authService';

export const useAuthInitializer = () => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      setIsLoading(true);

      try {
        // Initialize auth service
        authService.initializeAuth();
        
        // Check if there's a current user
        const currentUser = authService.getCurrentUser();
        
        if (currentUser) {
          // Verify if token is still valid
          const isValid = await authService.verifyToken();
          
          if (isValid) {
            setUser(currentUser);
          } else {
            // Token invalid, clear auth data
            authService.clearAuthData();
            setUser(null);
          }
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error('Error initializing auth:', err);
        authService.clearAuthData();
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  return { user, setUser, isLoading, setIsLoading };
};
