
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";

interface BatchManagementProps {
  hasSubscription: boolean;
  onCreateBatch?: () => void;
}

const BatchManagement: React.FC<BatchManagementProps> = ({ 
  hasSubscription,
  onCreateBatch
}) => {
  if (!hasSubscription) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Batch Management</CardTitle>
          <CardDescription>Create or join study batches</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 text-center">
            <p className="mb-2">You need a group subscription to create or manage batches</p>
            <Button>Upgrade to Group Plan</Button>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Batch Management</CardTitle>
        <CardDescription>Create or join study batches</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Button variant="outline" onClick={onCreateBatch} className="w-full sm:w-auto">
            <UserPlus className="mr-2 h-4 w-4" />
            Create New Batch
          </Button>
          <p className="text-sm text-muted-foreground mt-2">
            Create a new study batch and invite your friends to join. 
            Study together and benefit from shared resources and collaborative learning.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default BatchManagement;
