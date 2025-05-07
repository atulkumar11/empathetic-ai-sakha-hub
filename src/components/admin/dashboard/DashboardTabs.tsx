
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SystemLog } from '@/types/admin';

// Import components
import Overview from './Overview';
import UsersManagement from './UsersManagement';
import ContentManagement from './ContentManagement';
import SystemLogs from './SystemLogs';
import SubscriptionPlans from './SubscriptionPlans';
import FeatureManager from '../features/FeatureManager';
import DatabaseExplorer from '../database/DatabaseExplorer';
import ApiEndpoints from '../api/ApiEndpoints';

interface DashboardTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const DashboardTabs: React.FC<DashboardTabsProps> = ({ activeTab, onTabChange }) => {
  // Mock system logs data
  const logs: SystemLog[] = [
    { id: '1', timestamp: new Date().toISOString(), level: 'info', message: 'User login successful', source: 'auth' },
    { id: '2', timestamp: new Date().toISOString(), level: 'error', message: 'Database connection failed', source: 'database' },
    { id: '3', timestamp: new Date().toISOString(), level: 'warning', message: 'API rate limit exceeded', source: 'api' },
  ];

  return (
    <Tabs 
      value={activeTab} 
      onValueChange={onTabChange}
      className="w-full"
    >
      <TabsList className="grid w-full grid-cols-8">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="users">Users</TabsTrigger>
        <TabsTrigger value="content">Content</TabsTrigger>
        <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
        <TabsTrigger value="features">Features</TabsTrigger>
        <TabsTrigger value="database">Database</TabsTrigger>
        <TabsTrigger value="api">API</TabsTrigger>
        <TabsTrigger value="logs">Logs</TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="space-y-4 mt-4">
        <Overview />
      </TabsContent>
      
      <TabsContent value="users" className="space-y-4 mt-4">
        <UsersManagement />
      </TabsContent>
      
      <TabsContent value="content" className="space-y-4 mt-4">
        <ContentManagement />
      </TabsContent>
      
      <TabsContent value="subscriptions" className="space-y-4 mt-4">
        <SubscriptionPlans />
      </TabsContent>
      
      <TabsContent value="features" className="space-y-4 mt-4">
        <FeatureManager />
      </TabsContent>
      
      <TabsContent value="database" className="space-y-4 mt-4">
        <DatabaseExplorer />
      </TabsContent>
      
      <TabsContent value="api" className="space-y-4 mt-4">
        <ApiEndpoints />
      </TabsContent>
      
      <TabsContent value="logs" className="space-y-4 mt-4">
        <SystemLogs logs={logs} />
      </TabsContent>
    </Tabs>
  );
};

export default DashboardTabs;
