
import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorStateProps {
  title?: string;
  message?: string;
  action?: React.ReactNode;
}

const ErrorState: React.FC<ErrorStateProps> = ({ 
  title = "An error occurred", 
  message = "Something went wrong. Please try again later.", 
  action 
}) => {
  return (
    <div className="flex flex-col items-center justify-center h-64 p-6">
      <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
        <AlertCircle className="h-8 w-8 text-red-600" />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground text-center mb-6">{message}</p>
      {action && <div>{action}</div>}
    </div>
  );
};

export default ErrorState;
