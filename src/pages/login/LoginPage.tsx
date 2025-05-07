
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, Mail, Lock, Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Checkbox } from "@/components/ui/checkbox";

const LoginPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      toast({
        title: "Missing information",
        description: "Please provide both email and password.",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const success = await login(formData.email, formData.password);
      
      if (success) {
        toast({
          title: "Login successful",
          description: "Redirecting to your dashboard",
        });
        
        // Remember email if option is checked
        if (rememberMe) {
          localStorage.setItem("prepzr_remembered_email", formData.email);
        } else {
          localStorage.removeItem("prepzr_remembered_email");
        }
        
        // Check for existing user data to determine if they're returning
        const userData = localStorage.getItem("userData");
        if (userData) {
          try {
            const parsedData = JSON.parse(userData);
            const loginCount = parsedData.loginCount ? parseInt(parsedData.loginCount) + 1 : 1;
            
            localStorage.setItem("userData", JSON.stringify({
              ...parsedData,
              loginCount,
              lastLogin: new Date().toISOString()
            }));
            
            // Navigate to dashboard
            navigate("/dashboard/student");
          } catch (error) {
            console.error("Error parsing user data:", error);
            navigate("/dashboard/student");
          }
        } else {
          // If no user data exists, create it
          const newUserData = {
            name: formData.email.split('@')[0],
            email: formData.email,
            loginCount: 1,
            lastLogin: new Date().toISOString(),
            mood: 'Motivated'
          };
          localStorage.setItem("userData", JSON.stringify(newUserData));
          navigate("/dashboard/student");
        }
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid email or password. Please try again.",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  const handleDemoLogin = () => {
    setFormData({
      email: "demo@prepzr.com",
      password: "demo123"
    });
  };

  // Check for saved email on component mount
  React.useEffect(() => {
    const savedEmail = localStorage.getItem("prepzr_remembered_email");
    if (savedEmail) {
      setFormData(prev => ({ ...prev, email: savedEmail }));
      setRememberMe(true);
    }
  }, []);

  return (
    <div className="p-6 space-y-6">
      <form onSubmit={handleLogin} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
              <Mail size={16} />
            </div>
            <Input
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              type="email"
              className="pl-9 border-blue-200 focus:ring-blue-500 focus:border-blue-500"
              autoComplete="email"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="password" className="text-sm font-medium">Password</Label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
              <Lock size={16} />
            </div>
            <Input
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter your password"
              type={showPassword ? "text" : "password"}
              className="pl-9 pr-10 border-blue-200 focus:ring-blue-500 focus:border-blue-500"
              autoComplete="current-password"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="remember"
              checked={rememberMe}
              onCheckedChange={(checked) => setRememberMe(!!checked)}
            />
            <Label htmlFor="remember" className="text-sm text-gray-700">
              Remember me
            </Label>
          </div>
          
          <button
            type="button"
            className="text-sm text-blue-600 hover:text-blue-800"
            onClick={() => {
              toast({
                title: "Password Reset",
                description: "Password reset feature is coming soon."
              });
            }}
          >
            Forgot password?
          </button>
        </div>
        
        <div className="pt-2">
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-violet-600"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing In...
              </>
            ) : (
              "Sign In"
            )}
          </Button>
          
          <Button
            type="button"
            variant="outline"
            className="w-full mt-3"
            onClick={handleDemoLogin}
          >
            Use Demo Account
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
