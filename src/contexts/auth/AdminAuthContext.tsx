
import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserRole } from '@/types/user/base';

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AdminAuthContextProps {
  isAdminAuthenticated: boolean;
  isAdminLoading: boolean;
  adminUser: AdminUser | null;
  adminLogin: (email: string, password: string) => Promise<boolean>;
  adminLogout: () => Promise<void>;
  adminLoginError: string | null;
}

// Create the context with a default value
const AdminAuthContext = createContext<AdminAuthContextProps>({
  isAdminAuthenticated: false,
  isAdminLoading: true,
  adminUser: null,
  adminLogin: async () => false,
  adminLogout: async () => {},
  adminLoginError: null,
});

// AdminAuthProvider props
interface AdminAuthProviderProps {
  children: React.ReactNode;
}

// AdminAuthProvider component
export const AdminAuthProvider: React.FC<AdminAuthProviderProps> = ({ children }) => {
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [isAdminLoading, setIsAdminLoading] = useState(true);
  const [adminLoginError, setAdminLoginError] = useState<string | null>(null);

  // Check for existing admin user in localStorage on component mount
  useEffect(() => {
    const checkAuth = () => {
      setIsAdminLoading(true);
      
      // Check if admin token exists in localStorage
      const token = localStorage.getItem('adminToken');
      const userJson = localStorage.getItem('adminUser');
      
      if (token && userJson) {
        try {
          const parsedUser = JSON.parse(userJson) as AdminUser;
          setAdminUser(parsedUser);
        } catch (error) {
          console.error('Error parsing admin user:', error);
        }
      }
      
      setIsAdminLoading(false);
    };
    
    checkAuth();
  }, []);

  // Admin login function
  const adminLogin = async (email: string, password: string): Promise<boolean> => {
    setIsAdminLoading(true);
    setAdminLoginError(null);
    
    try {
      // For demo, we'll simulate a login
      // In a real app, this would call an API
      if (email.includes('admin') && password.length >= 3) {
        const adminUser: AdminUser = {
          id: `admin_${Date.now()}`,
          name: "Admin User",
          email,
          role: "admin"
        };
        
        // Store token in localStorage
        const mockToken = `admin_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
        localStorage.setItem("adminToken", mockToken);
        localStorage.setItem("adminUser", JSON.stringify(adminUser));
        
        setAdminUser(adminUser);
        setIsAdminLoading(false);
        return true;
      } else {
        setAdminLoginError("Invalid admin credentials. Email must contain 'admin'.");
        setIsAdminLoading(false);
        return false;
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred during login';
      setAdminLoginError(errorMessage);
      setIsAdminLoading(false);
      return false;
    }
  };

  // Admin logout function
  const adminLogout = async (): Promise<void> => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    setAdminUser(null);
  };
  
  return (
    <AdminAuthContext.Provider
      value={{
        isAdminAuthenticated: !!adminUser,
        isAdminLoading,
        adminUser,
        adminLogin,
        adminLogout,
        adminLoginError,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

// Custom hook to use the admin auth context
export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};
