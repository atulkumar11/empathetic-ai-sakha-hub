
import React from "react";

const LoadingState = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[80vh]">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-t-purple-600 border-purple-200 rounded-full animate-spin mx-auto mb-6"></div>
        <h2 className="text-2xl font-medium text-gray-800 dark:text-gray-200">Loading dashboard data...</h2>
        <p className="text-gray-500 dark:text-gray-400 mt-2">Please wait while we fetch the latest information</p>
      </div>
    </div>
  );
};

export default LoadingState;
