
import { useState, useEffect } from 'react';
import { UserRole } from '@/types/user/base';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, we'd check for a token in localStorage
    // and make an API call to validate it
    const checkAuth = () => {
      setLoading(true);
      
      // For development, create a mock user
      setTimeout(() => {
        // Mock a logged-in user for development
        const mockUser: User = {
          id: '1',
          name: 'Test User',
          email: 'test@example.com',
          role: UserRole.Student
        };
        
        setUser(mockUser);
        setLoading(false);
      }, 500);
    };
    
    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    // Mock login functionality
    setLoading(true);
    
    return new Promise<User>((resolve, reject) => {
      setTimeout(() => {
        if (email && password) {
          const newUser: User = {
            id: '1',
            name: 'Test User',
            email: email,
            role: UserRole.Student
          };
          
          setUser(newUser);
          setLoading(false);
          resolve(newUser);
        } else {
          setLoading(false);
          reject(new Error('Invalid credentials'));
        }
      }, 1000);
    });
  };
  
  const logout = () => {
    // Mock logout
    setUser(null);
  };
  
  return {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user
  };
}
