
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, Users, Server, CreditCard, Activity } from "lucide-react";
import type { AdminDashboardStats } from '@/types/admin';

interface DashboardStatsProps {
  stats: AdminDashboardStats;
}

const DashboardStatsComponent: React.FC<DashboardStatsProps> = ({ stats }) => {
  const {
    totalUsers,
    activeUsers,
    totalRevenue,
    newUsersToday,
    dailyActiveUsers
  } = stats;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalUsers.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">
            +{(newUsersToday / totalUsers * 100).toFixed(1)}% from last 24h
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Users</CardTitle>
          <Activity className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{activeUsers.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">
            {(activeUsers / totalUsers * 100).toFixed(1)}% of total users
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          <CreditCard className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">₹{totalRevenue.toLocaleString()}</div>
          <div className="flex items-center pt-1">
            <ArrowUpRight className="h-3 w-3 text-green-500" />
            <span className="text-xs text-green-500 ml-1">+12.5%</span>
            <span className="text-xs text-muted-foreground ml-2">from last month</span>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Server Status</CardTitle>
          <Server className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">Operational</div>
          <div className="flex items-center space-x-2 pt-1">
            <div className="h-2 w-2 rounded-full bg-green-500" />
            <span className="text-xs text-muted-foreground">All systems normal</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardStatsComponent;
