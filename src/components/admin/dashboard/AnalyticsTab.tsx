
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export interface AnalyticsTabProps {
  data: any;
}

const AnalyticsTab: React.FC<AnalyticsTabProps> = ({ data }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>User Registration</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data.totalUsers || 0}</div>
          <p className="text-muted-foreground">Total users registered</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Active Users</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data.activeUsers || 0}</div>
          <p className="text-muted-foreground">Users active in last 7 days</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Content Usage</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data.contentViews || 0}</div>
          <p className="text-muted-foreground">Total content views</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsTab;
