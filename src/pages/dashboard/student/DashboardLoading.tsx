
import React from 'react';

const DashboardLoading = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100/10 via-white to-violet-100/10">
      <div className="fixed top-0 left-0 w-64 h-full bg-white border-r border-gray-200 animate-pulse"></div>
      
      <div className="md:ml-64 p-6">
        {/* Header skeleton */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-14 h-14 rounded-full bg-gray-200 animate-pulse"></div>
          <div className="space-y-2">
            <div className="h-8 w-48 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
        
        {/* KPIs skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[...Array(4)].map((_, index) => (
            <div 
              key={`kpi-${index}`} 
              className="bg-gray-200 h-24 rounded-lg animate-pulse" 
            />
          ))}
        </div>
        
        {/* Content skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="md:col-span-2">
            <div className="bg-gray-200 h-64 rounded-lg animate-pulse"></div>
          </div>
          <div className="md:col-span-1">
            <div className="bg-gray-200 h-64 rounded-lg animate-pulse"></div>
          </div>
        </div>
        
        {/* Features skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[...Array(8)].map((_, index) => (
            <div 
              key={`feature-${index}`}
              className="bg-gray-200 h-40 rounded-lg animate-pulse" 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardLoading;
