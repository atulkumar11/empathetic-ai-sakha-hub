import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, Lock, Mail, ArrowRight } from "lucide-react";
import { adminService } from "@/services/adminService";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import PrepzrLogo from "@/components/common/PrepzrLogo";

const AdminLogin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login } = useAdminAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
      // Using the mock admin service for now, will be replaced with Flask backend later
      const adminUser = await adminService.login(formData.email, formData.password);
      
      // Call the login function from AdminAuthContext
      login(adminUser);
      
      console.log("Login successful, redirecting to /admin/dashboard");
      
      // Use a small delay to ensure state is updated before redirect
      setTimeout(() => {
        navigate("/admin/dashboard", { replace: true });
      }, 100);
      
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Invalid email or password. Please try again.",
        variant: "destructive"
      });
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100/30 via-white to-violet-100/30 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2">
            <PrepzrLogo width={120} height={120} /> {/* Updated logo */}
          </Link>
          <h1 className="mt-4 text-4xl font-display font-bold gradient-text">Admin Portal</h1>
          <p className="mt-2 text-gray-600">Login to access the PREPZR administration panel</p>
        </div>
        
        <Card className="shadow-xl border-gray-200 overflow-hidden animate-fade-in">
          <CardHeader className="bg-gradient-to-r from-purple-600 to-violet-700 text-white">
            <CardTitle className="text-2xl font-semibold">Admin Sign In</CardTitle>
            <CardDescription className="text-purple-100">
              Enter your admin credentials to access the dashboard
            </CardDescription>
          </CardHeader>
          
          <form onSubmit={handleLogin}>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-4">
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
                      placeholder="Enter your admin email"
                      type="email"
                      className="pl-9 border-purple-200 focus:ring-purple-500 focus:border-purple-500"
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
                      className="pl-9 border-purple-200 focus:ring-purple-500 focus:border-purple-500 pr-10"
                    />
                    <Button 
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full"
                      onClick={() => setShowPassword(!showPassword)}
                      type="button"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </Button>
                  </div>
                </div>
                
                <Button 
                  className="w-full bg-gradient-to-r from-purple-600 to-violet-700 hover:from-purple-700 hover:to-violet-800 text-white shadow-md"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Signing in...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <span>Sign In</span>
                      <ArrowRight size={16} />
                    </div>
                  )}
                </Button>
              </div>
            </CardContent>
          </form>
          
          <CardFooter className="flex justify-center pb-6 border-t pt-6">
            <p className="text-sm text-gray-600">
              Not an admin?{" "}
              <Link to="/login" className="text-purple-600 hover:text-purple-700 font-medium hover:underline">
                Go to Student Login
              </Link>
            </p>
          </CardFooter>
        </Card>
        
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Need help? <a href="#" className="text-purple-600 hover:underline">Contact Support</a></p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
