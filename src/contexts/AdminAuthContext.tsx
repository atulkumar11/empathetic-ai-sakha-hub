
import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AdminAuthContextProps {
  isAuthenticated: boolean;
  user: AdminUser | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AdminAuthContext = createContext<AdminAuthContextProps>({
  isAuthenticated: false,
  user: null,
  login: async () => {},
  logout: () => {}
});

export const useAdminAuth = () => useContext(AdminAuthContext);

interface AdminAuthProviderProps {
  children: ReactNode;
}

export const AdminAuthProvider = ({ children }: AdminAuthProviderProps) => {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const checkAuth = () => {
      // For development purposes, always authenticated
      if (process.env.NODE_ENV === 'development') {
        setUser({
          id: '1',
          name: 'Admin User',
          email: 'admin@example.com',
          role: 'admin'
        });
      }
      setLoading(false);
    };
    
    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    // Mock login
    setUser({
      id: '1',
      name: 'Admin User',
      email: email,
      role: 'admin'
    });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AdminAuthContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        login,
        logout
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};
