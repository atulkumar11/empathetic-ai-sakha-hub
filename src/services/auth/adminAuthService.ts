
import { AdminUser } from "@/types/user/base";

interface LoginResponse {
  success: boolean;
  data: AdminUser | null;
  message?: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

// Admin auth service with mock functions
const adminAuthService = {
  // Admin login function
  async adminLogin(credentials: LoginCredentials): Promise<LoginResponse> {
    console.log("Admin auth service: login attempt for", credentials.email);
    
    // For demo purposes, allow any email with admin in it
    if (credentials.email.includes('admin')) {
      const adminUser: AdminUser = {
        id: `admin_${Date.now()}`,
        name: "Admin User",
        email: credentials.email,
        role: "admin"
      };
      
      // Store token in localStorage
      const mockToken = `admin_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
      localStorage.setItem("adminToken", mockToken);
      localStorage.setItem("adminUser", JSON.stringify(adminUser));
      
      return {
        success: true,
        data: adminUser,
        message: "Login successful"
      };
    } else {
      return {
        success: false,
        data: null,
        message: "Invalid admin credentials. Email must contain 'admin'."
      };
    }
  },
  
  // Admin logout function
  async adminLogout(): Promise<void> {
    console.log("Admin auth service: logging out");
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
  },
  
  // Get current admin user
  async getAdminUser(): Promise<AdminUser | null> {
    const token = localStorage.getItem("adminToken");
    const userJson = localStorage.getItem("adminUser");
    
    if (!token || !userJson) {
      return null;
    }
    
    try {
      return JSON.parse(userJson) as AdminUser;
    } catch (error) {
      console.error("Error parsing admin user:", error);
      return null;
    }
  },
  
  // Check if admin is authenticated
  isAuthenticated(): boolean {
    return !!localStorage.getItem("adminToken");
  }
};

export default adminAuthService;
