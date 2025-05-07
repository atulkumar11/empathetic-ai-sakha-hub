
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { Check, Loader2, Eye, EyeOff } from 'lucide-react';
import PrepzrLogo from '@/components/common/PrepzrLogo';
import { useAdminAuth } from '@/contexts/auth/AdminAuthContext';

const AdminLogin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { adminLogin, adminLoginError } = useAdminAuth();
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!credentials.email || !credentials.password) {
      toast({
        title: 'Required fields',
        description: 'Please enter both email and password',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    try {
      const loginSuccess = await adminLogin(credentials.email, credentials.password);
      
      if (loginSuccess) {
        setLoginSuccess(true);
        toast({
          title: 'Login successful',
          description: 'Welcome to the admin dashboard',
        });
        
        // Wait a moment to show the success animation
        setTimeout(() => {
          navigate('/admin/dashboard');
        }, 1000);
      } else {
        toast({
          title: 'Login failed',
          description: adminLoginError || 'Invalid admin credentials. Email must contain "admin".',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Admin login error:', error);
      toast({
        title: 'Login error',
        description: 'An error occurred during login. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-fill demo credentials for easier testing
  const handleDemoLogin = () => {
    setCredentials({
      email: 'admin@prepzr.com',
      password: 'admin123'
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-md w-full">
        <div className="text-center mb-6">
          <PrepzrLogo width={180} height="auto" className="mx-auto" />
          <h1 className="mt-4 text-3xl font-bold">Admin Portal</h1>
          <p className="text-gray-600 mt-1">Access the system administration tools</p>
        </div>

        <Card className="shadow-lg border-gray-200">
          <CardHeader className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white">
            <CardTitle className="text-xl font-medium">Admin Authentication</CardTitle>
          </CardHeader>
          
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4 pt-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="admin@example.com"
                  value={credentials.email}
                  onChange={handleChange}
                  disabled={isLoading || loginSuccess}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={credentials.password}
                    onChange={handleChange}
                    disabled={isLoading || loginSuccess}
                    className="pr-10"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={togglePasswordVisibility}
                    disabled={isLoading || loginSuccess}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </Button>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading || loginSuccess}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Authenticating...
                  </>
                ) : loginSuccess ? (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Authenticated
                  </>
                ) : (
                  'Sign In to Admin Portal'
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

              <div className="rounded-md bg-blue-50 p-3">
                <div className="text-sm text-blue-700 font-medium mb-1">Demo Account</div>
                <div className="text-xs text-gray-600">
                  <p>For demo purposes, any email containing "admin" will work</p>
                  <p>Example: admin@prepzr.com / any password (min 3 chars)</p>
                </div>
              </div>
            </CardContent>
          </form>

          <Separator />

          <CardFooter className="flex justify-between pt-4">
            <Button variant="ghost" size="sm" onClick={() => navigate('/')}>
              Return to Home
            </Button>
            <Button variant="outline" size="sm" onClick={() => navigate('/login')}>
              Student Login
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default AdminLogin;
