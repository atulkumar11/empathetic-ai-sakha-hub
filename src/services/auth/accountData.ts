
import { AuthUser } from './authService';

// Mock user accounts for development
const mockAccounts = [
  {
    email: 'student@example.com',
    password: 'password123',
    user: {
      id: 'user_1',
      name: 'John Student',
      email: 'student@example.com',
      phoneNumber: '+919876543210',
      role: 'student',
      token: 'mock_student_token',
      permissions: []
    }
  },
  {
    email: 'admin@example.com',
    password: 'admin123',
    user: {
      id: 'admin_1',
      name: 'Admin User',
      email: 'admin@example.com',
      phoneNumber: '+919876543211',
      role: 'admin',
      token: 'mock_admin_token',
      permissions: ['all']
    }
  }
];

/**
 * Validates user credentials against mock accounts
 * @param email User email
 * @param password User password
 * @returns AuthUser object if credentials are valid, null otherwise
 */
export const validateCredentials = (email: string, password: string): AuthUser | null => {
  const account = mockAccounts.find(
    acc => acc.email.toLowerCase() === email.toLowerCase() && acc.password === password
  );
  
  return account ? account.user : null;
};
