
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Loader2, ShieldCheck } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface StudentLoginFormProps {
  activeTab: string;
}

const StudentLoginForm: React.FC<StudentLoginFormProps> = ({ activeTab }) => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { toast } = useToast();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  // Check for saved credentials when component mounts
  useEffect(() => {
    const savedEmail = localStorage.getItem("prepzr_remembered_email");
    if (savedEmail) {
      setCredentials(prev => ({ ...prev, email: savedEmail }));
      setRememberMe(true);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
    if (loginError) setLoginError(null);
  };

  const validateForm = () => {
    if (!credentials.email) {
      setLoginError("Email is required");
      return false;
    }
    if (!credentials.password) {
      setLoginError("Password is required");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    setLoginError(null);
    
    try {
      // In a real app, this would validate credentials against a backend
      console.log("Attempting to log in with:", credentials.email);
      
      const user = await login(credentials.email, credentials.password);
      
      if (user) {
        // Handle remember me functionality
        if (rememberMe) {
          localStorage.setItem("prepzr_remembered_email", credentials.email);
        } else {
          localStorage.removeItem("prepzr_remembered_email");
        }
        
        toast({
          title: "Login successful",
          description: "Welcome back to Prepzr"
        });
        
        // Update login count and last activity in userData
        const userData = localStorage.getItem("userData");
        if (userData) {
          try {
            const parsedData = JSON.parse(userData);
            const loginCount = parsedData.loginCount ? parseInt(parsedData.loginCount) + 1 : 1;
            const lastActivity = {
              type: "login",
              description: "last session",
              timestamp: new Date().toISOString()
            };
            
            localStorage.setItem("userData", JSON.stringify({
              ...parsedData,
              loginCount,
              lastActivity,
              lastLogin: new Date().toISOString()
            }));
            
            // Always direct to the pending activities screen first
            navigate("/dashboard/student/today");
          } catch (error) {
            console.error("Error updating user data:", error);
            navigate("/dashboard/student/today");
          }
        } else {
          navigate("/dashboard/student/today");
        }
      } else {
        setLoginError("Invalid email or password");
      }
    } catch (error) {
      console.error("Login error:", error);
      setLoginError("An unexpected error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = () => {
    setCredentials({
      email: "demo@prepzr.com",
      password: "demo123"
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {loginError && (
        <Alert variant="destructive">
          <AlertDescription>{loginError}</AlertDescription>
        </Alert>
      )}
      
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="your.email@example.com"
          value={credentials.email}
          onChange={handleChange}
          className={loginError && !credentials.email ? "border-red-500" : ""}
          autoComplete="email"
          required
        />
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password">Password</Label>
          <Button
            type="button"
            variant="link"
            className="p-0 h-auto text-xs"
            onClick={() => {
              toast({
                title: "Password Reset",
                description: "Password reset functionality will be available soon."
              });
            }}
          >
            Forgot password?
          </Button>
        </div>
        <Input
          id="password"
          name="password"
          type="password"
          value={credentials.password}
          onChange={handleChange}
          className={loginError && !credentials.password ? "border-red-500" : ""}
          autoComplete="current-password"
          required
        />
      </div>
      
      <div className="flex items-center space-x-2">
        <Checkbox 
          id="remember" 
          checked={rememberMe}
          onCheckedChange={(checked) => setRememberMe(!!checked)}
        />
        <Label htmlFor="remember" className="text-sm">Remember me</Label>
      </div>
      
      <div className="space-y-2">
        <Button 
          type="submit" 
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700" 
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Logging in...
            </>
          ) : (
            <>
              <ShieldCheck className="mr-2 h-4 w-4" />
              Login
            </>
          )}
        </Button>
        
        <Button 
          type="button" 
          variant="outline" 
          className="w-full mt-2" 
          onClick={handleDemoLogin}
        >
          Use Demo Account
        </Button>
      </div>
      
      <div className="text-center text-sm">
        <span className="text-gray-500">Don't have an account? </span>
        <Button variant="link" className="p-0 h-auto" onClick={() => navigate("/signup")}>
          Sign up
        </Button>
      </div>
    </form>
  );
};

export default StudentLoginForm;
