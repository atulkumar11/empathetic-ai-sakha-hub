
import { AuthUser } from '@/services/auth/authService';

export interface AuthContextProps {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  adminLogin: (email: string, password: string) => Promise<boolean>;
  register: (
    name: string,
    email: string,
    phoneNumber: string,
    password: string,
    role?: string
  ) => Promise<boolean>;
  logout: () => Promise<void>;
}
