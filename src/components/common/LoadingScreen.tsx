
import React from 'react';
import PrepzrLogo from './PrepzrLogo';

interface LoadingScreenProps {
  message?: string;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ message = "Loading..." }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-blue-950 dark:via-gray-900 dark:to-indigo-950">
      <div className="flex flex-col items-center">
        <div className="relative">
          <PrepzrLogo width={80} height={80} />
          <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full border-4 border-t-blue-500 border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
        </div>
        
        <h1 className="mt-6 text-2xl font-bold text-blue-600 dark:text-blue-400">PREPZR</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">{message}</p>
        
        <div className="mt-8 flex items-center space-x-2">
          <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce"></div>
          <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
