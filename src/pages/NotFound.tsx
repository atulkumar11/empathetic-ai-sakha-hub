
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="text-center p-8 max-w-md">
        <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-6">Page Not Found</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-8">The page you are looking for doesn't exist or has been moved.</p>
        <Link to="/dashboard/student">
          <Button>Return to Dashboard</Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
