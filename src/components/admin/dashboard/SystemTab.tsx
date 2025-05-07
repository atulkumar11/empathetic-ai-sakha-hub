
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle, CheckCircle, Server, Settings } from 'lucide-react';

const SystemTab: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">System Management</h2>
        <Button>
          <Settings className="mr-2 h-4 w-4" />
          System Settings
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Server className="mr-2 text-primary" />
              Server Status
            </CardTitle>
            <CardDescription>Current server performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>CPU Usage</span>
                <span className="font-medium">28%</span>
              </div>
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 dark:bg-green-600 rounded-full" style={{ width: '28%' }}></div>
              </div>
              
              <div className="flex justify-between text-sm mt-2">
                <span>Memory Usage</span>
                <span className="font-medium">42%</span>
              </div>
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 dark:bg-blue-600 rounded-full" style={{ width: '42%' }}></div>
              </div>
              
              <div className="flex justify-between text-sm mt-2">
                <span>Disk Usage</span>
                <span className="font-medium">65%</span>
              </div>
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 dark:bg-amber-600 rounded-full" style={{ width: '65%' }}></div>
              </div>
            </div>
            
            <Alert className="mt-4" variant="default">
              <CheckCircle className="h-4 w-4" />
              <AlertTitle>All systems operational</AlertTitle>
              <AlertDescription>
                Last checked: Today at 10:45 AM
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
        
        {/* Changed from "warning" to "default" with custom styling */}
        <Card>
          <CardHeader>
            <CardTitle>Maintenance Schedule</CardTitle>
            <CardDescription>Upcoming system maintenance</CardDescription>
          </CardHeader>
          <CardContent>
            <Alert className="mb-4 bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-800" variant="default">
              <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
              <AlertTitle className="text-amber-800 dark:text-amber-300">Scheduled Maintenance</AlertTitle>
              <AlertDescription className="text-amber-700 dark:text-amber-400">
                System will be down for maintenance on May 15, 2025 from 2:00 AM to 4:00 AM UTC.
              </AlertDescription>
            </Alert>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b pb-2">
                <span className="text-sm font-medium">Database Optimization</span>
                <span className="text-xs text-muted-foreground">May 15, 2:00 AM</span>
              </div>
              <div className="flex items-center justify-between border-b pb-2">
                <span className="text-sm font-medium">Security Patches</span>
                <span className="text-xs text-muted-foreground">May 15, 2:30 AM</span>
              </div>
              <div className="flex items-center justify-between border-b pb-2">
                <span className="text-sm font-medium">Cache Clearing</span>
                <span className="text-xs text-muted-foreground">May 15, 3:15 AM</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>System Analytics</CardTitle>
            <CardDescription>Performance over last 24 hours</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Average Response Time</span>
                <span className="text-sm font-medium">85ms</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">API Requests</span>
                  <span className="text-sm font-medium">4,289</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Error Rate</span>
                  <span className="text-sm font-medium">0.12%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Active Users</span>
                  <span className="text-sm font-medium">1,245</span>
                </div>
              </div>
            </div>
            
            <Button className="w-full">View Detailed Analytics</Button>
          </CardContent>
        </Card>
      </div>
      
      {/* Additional system management sections */}
      <Card>
        <CardHeader>
          <CardTitle>System Logs</CardTitle>
          <CardDescription>Recent system activities and errors</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 max-h-80 overflow-auto">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="border-b pb-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className={`font-medium ${i % 3 === 0 ? 'text-red-500' : ''}`}>
                    {i % 3 === 0 ? 'ERROR' : 'INFO'}: {i % 3 === 0 ? 'Failed login attempt' : 'User session started'}
                  </span>
                  <span className="text-xs text-muted-foreground">Today, {10 - i}:{Math.floor(Math.random() * 60).toString().padStart(2, '0')} AM</span>
                </div>
                <p className="text-muted-foreground mt-1">
                  {i % 3 === 0 ? 
                    'Multiple failed login attempts detected from IP 192.168.1.123' : 
                    'User session started successfully for admin@example.com'}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SystemTab;
