
import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const BatchManagementPage = () => {
  return (
    <AdminLayout>
      <div className="container mx-auto py-6">
        <h1 className="text-2xl font-bold mb-6">Batch Management</h1>
        <Card>
          <CardHeader>
            <CardTitle>Manage Student Batches</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500">
              This page allows administrators to manage student batches, create new batches, assign students, and track progress.
            </p>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default BatchManagementPage;
