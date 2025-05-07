
import React from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { BarChart, PieChart, LineChart, TrendingUp, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const AnalyticsPage = () => {
  const { toast } = useToast();

  const showToast = () => {
    toast({
      title: "Analytics Feature",
      description: "This feature is currently under development."
    });
  };

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Track detailed metrics about student engagement and platform usage
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">User Engagement</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold">89.2%</div>
              <div className="p-2 bg-green-100 rounded-full text-green-600">
                <TrendingUp size={20} />
              </div>
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              +2.5% from last week
            </div>
            <div className="mt-4 h-32 bg-gray-100 dark:bg-gray-800 rounded flex items-center justify-center">
              <LineChart className="text-gray-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold">1,482</div>
              <div className="p-2 bg-blue-100 rounded-full text-blue-600">
                <Users size={20} />
              </div>
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              +32 new students this week
            </div>
            <div className="mt-4 h-32 bg-gray-100 dark:bg-gray-800 rounded flex items-center justify-center">
              <BarChart className="text-gray-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Popular Exam Types</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold">CAT (42%)</div>
              <div className="p-2 bg-purple-100 rounded-full text-purple-600">
                <PieChart size={20} />
              </div>
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              Based on 2,384 active study plans
            </div>
            <div className="mt-4 h-32 bg-gray-100 dark:bg-gray-800 rounded flex items-center justify-center">
              <PieChart className="text-gray-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Detailed Analytics Dashboard</CardTitle>
          </CardHeader>
          <CardContent className="h-96 flex flex-col items-center justify-center">
            <div className="text-center space-y-4">
              <div className="inline-flex h-16 w-16 rounded-full bg-blue-100 items-center justify-center">
                <BarChart size={32} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-medium">Advanced Analytics Module</h3>
              <p className="text-muted-foreground max-w-md">
                The comprehensive analytics dashboard is currently under development.
                Soon you'll be able to track detailed metrics, create custom reports,
                and analyze student performance trends.
              </p>
              <Button 
                className="mt-4 px-4 py-2 rounded-md bg-primary text-white"
                onClick={showToast}
              >
                Show Preview
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AnalyticsPage;
