
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Mail, Lock, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/auth/AuthContext";

interface TutorLoginFormProps {
  activeTab: string;
}

const TutorLoginForm: React.FC<TutorLoginFormProps> = ({ activeTab }) => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!identifier || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }
    
    setLoading(true);
    
    try {
      const success = await login(identifier, password);
      
      if (success) {
        toast({
          title: "Tutor login successful",
          description: "Redirecting to tutor dashboard",
        });
        navigate("/dashboard/student");
      } else {
        throw new Error("Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Login failed",
        description: "Invalid credentials, please try again",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <form onSubmit={handleLogin} className="space-y-6">
      <div className="space-y-4">
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <Input 
            type="email" 
            placeholder="Email address"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <Input 
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="remember-me-tutor"
            name="remember-me-tutor"
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />
          <label htmlFor="remember-me-tutor" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
            Remember me
          </label>
        </div>
        <div className="text-sm">
          <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">
            Forgot password?
          </a>
        </div>
      </div>
      
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Signing In...
          </>
        ) : (
          "Sign In"
        )}
      </Button>
    </form>
  );
};

export default TutorLoginForm;
