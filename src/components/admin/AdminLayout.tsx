
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAdminAuth } from '@/contexts/auth/AdminAuthContext';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { adminUser, adminLogout } = useAdminAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await adminLogout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="font-bold text-xl">Admin Portal</h1>
          </div>
          <div className="flex items-center space-x-4">
            {adminUser && (
              <>
                <span className="text-sm">{adminUser.name}</span>
                <Button variant="ghost" size="sm" onClick={handleLogout}>Logout</Button>
              </>
            )}
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
