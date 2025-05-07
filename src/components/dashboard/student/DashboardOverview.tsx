
import React from 'react';
import { UserProfileBase } from '@/types/user/base';
import { KpiData } from '@/hooks/useKpiTracking';

interface DashboardOverviewProps {
  userProfile: UserProfileBase;
  kpis: KpiData[];
}

const DashboardOverview: React.FC<DashboardOverviewProps> = ({ userProfile, kpis }) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="text-sm text-muted-foreground">
          Last updated: {new Date().toLocaleString()}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi) => (
          <div key={kpi.id} className="bg-card text-card-foreground shadow rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="text-lg font-medium text-muted-foreground">{kpi.title}</div>
              {kpi.icon && <div className="text-2xl">{kpi.icon}</div>}
            </div>
            <div className="mt-2 flex items-end">
              <div className="text-3xl font-bold">{kpi.value}</div>
              {kpi.unit && <div className="ml-1 text-sm text-muted-foreground">{kpi.unit}</div>}
              {kpi.change && (
                <div className={`ml-2 text-sm ${kpi.changeType === 'positive' ? 'text-green-500' : 'text-red-500'}`}>
                  {kpi.changeType === 'positive' ? '+' : ''}{kpi.change}%
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="bg-card text-card-foreground shadow rounded-lg p-6 lg:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Progress Overview</h2>
          <div className="h-60 bg-gray-100 dark:bg-gray-800 rounded-md flex items-center justify-center">
            <p className="text-muted-foreground">Progress chart will appear here</p>
          </div>
        </div>
        
        <div className="bg-card text-card-foreground shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Upcoming Tasks</h2>
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
              <div>
                <p className="font-medium">Physics Quiz</p>
                <p className="text-sm text-muted-foreground">Due in 2 days</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
              <div>
                <p className="font-medium">Math Assignment</p>
                <p className="text-sm text-muted-foreground">Due tomorrow</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-amber-500 rounded-full mr-3"></div>
              <div>
                <p className="font-medium">Chemistry Lab</p>
                <p className="text-sm text-muted-foreground">Due in 3 days</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
