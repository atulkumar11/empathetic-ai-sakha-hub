
import React from 'react';
import MainLayout from '@/components/layouts/MainLayout';

const BacklogView: React.FC = () => {
  return (
    <MainLayout>
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-6">Backlog</h1>
        <div className="grid grid-cols-1 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <p className="text-muted-foreground">
              Your backlog of saved items and tasks will appear here.
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default BacklogView;
