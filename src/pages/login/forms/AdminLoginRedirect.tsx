
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const AdminLoginRedirect: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="space-y-4">
      <p className="text-sm text-center text-gray-500 dark:text-gray-400">
        Admin login is available on a separate page for enhanced security.
      </p>
      <Button 
        className="w-full" 
        onClick={() => navigate('/admin/login')}
      >
        Go to Admin Login
      </Button>
    </div>
  );
};

export default AdminLoginRedirect;
