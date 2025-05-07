
import React from 'react';
import MainLayout from '@/components/layouts/MainLayout';

const TodaysPlanView: React.FC = () => {
  return (
    <MainLayout>
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-6">Today's Plan</h1>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Your Schedule for Today</h2>
              <p className="text-muted-foreground">
                Your daily plan content will appear here. This page is still being enhanced.
              </p>
            </div>
          </div>
          <div className="md:col-span-4">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Quick Progress</h3>
              <p className="text-muted-foreground">Progress tracking will appear here.</p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default TodaysPlanView;
