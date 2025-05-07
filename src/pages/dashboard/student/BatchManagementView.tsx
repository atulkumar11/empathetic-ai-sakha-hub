
import React from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const BatchManagementView: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <MainLayout>
      <div className="container py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Batch Management</h1>
          <Button onClick={() => navigate('/dashboard/student/profile')}>
            Back to Profile
          </Button>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Your Study Batch</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Manage your study batch, view member progress, and invite new members.
            </p>
            <p className="text-muted-foreground">
              This page is being enhanced with additional batch management functionality.
            </p>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default BatchManagementView;
