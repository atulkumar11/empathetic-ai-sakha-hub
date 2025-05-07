
import React from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Bell, Mail, Send, Clock, CheckCircle, XCircle } from "lucide-react";

const NotificationsPage = () => {
  const { toast } = useToast();

  const showToast = () => {
    toast({
      title: "Notification System",
      description: "This feature is currently under development.",
      variant: "default"
    });
  };

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Notifications Management</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Create and manage notifications for students and admins
          </p>
        </div>
        <button 
          className="px-4 py-2 rounded-md bg-primary text-white flex items-center gap-2"
          onClick={showToast}
        >
          <Send size={16} />
          <span>Send New Notification</span>
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Sent Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold">184</div>
              <div className="p-2 bg-blue-100 rounded-full text-blue-600">
                <Send size={20} />
              </div>
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              +24 from yesterday
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Scheduled</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold">12</div>
              <div className="p-2 bg-yellow-100 rounded-full text-yellow-600">
                <Clock size={20} />
              </div>
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              Next scheduled in 2 hours
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Read Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold">68%</div>
              <div className="p-2 bg-green-100 rounded-full text-green-600">
                <CheckCircle size={20} />
              </div>
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              +3% from last week
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Disabled Notifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold">42</div>
              <div className="p-2 bg-gray-100 rounded-full text-gray-600">
                <XCircle size={20} />
              </div>
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              +2 from yesterday
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Notifications</CardTitle>
            <div className="space-x-2">
              <button className="text-sm text-blue-600 hover:underline">View All</button>
              <button 
                className="px-3 py-1 text-sm rounded-md bg-primary text-white"
                onClick={showToast}
              >
                New Template
              </button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center p-4 bg-muted/50 rounded-lg">
                <div className="p-2 mr-4 bg-blue-100 rounded-full text-blue-600">
                  <Bell size={20} />
                </div>
                <div className="flex-grow">
                  <h4 className="font-medium">System Maintenance Notice</h4>
                  <p className="text-sm text-muted-foreground">Scheduled maintenance on April 15th, 2025 from 2:00 AM to 4:00 AM IST.</p>
                  <div className="flex items-center mt-1 text-xs text-muted-foreground">
                    <span>Sent to: All Users</span>
                    <span className="mx-2">•</span>
                    <span>Sent: 2 hours ago</span>
                    <span className="mx-2">•</span>
                    <span>Read rate: 48%</span>
                  </div>
                </div>
                <button 
                  className="text-sm text-blue-600 hover:underline whitespace-nowrap"
                  onClick={showToast}
                >
                  View Details
                </button>
              </div>
              
              <div className="flex items-center p-4 bg-muted/50 rounded-lg">
                <div className="p-2 mr-4 bg-green-100 rounded-full text-green-600">
                  <Mail size={20} />
                </div>
                <div className="flex-grow">
                  <h4 className="font-medium">New Study Materials Available</h4>
                  <p className="text-sm text-muted-foreground">CAT Quantitative Aptitude module has been updated with 50 new practice problems.</p>
                  <div className="flex items-center mt-1 text-xs text-muted-foreground">
                    <span>Sent to: CAT Students</span>
                    <span className="mx-2">•</span>
                    <span>Sent: 8 hours ago</span>
                    <span className="mx-2">•</span>
                    <span>Read rate: 72%</span>
                  </div>
                </div>
                <button 
                  className="text-sm text-blue-600 hover:underline whitespace-nowrap"
                  onClick={showToast}
                >
                  View Details
                </button>
              </div>
              
              <div className="flex items-center p-4 bg-muted/50 rounded-lg">
                <div className="p-2 mr-4 bg-yellow-100 rounded-full text-yellow-600">
                  <Clock size={20} />
                </div>
                <div className="flex-grow">
                  <h4 className="font-medium">Subscription Renewal Reminder</h4>
                  <p className="text-sm text-muted-foreground">Your subscription will expire in 5 days. Renew now to avoid interruption.</p>
                  <div className="flex items-center mt-1 text-xs text-muted-foreground">
                    <span>Sent to: Expiring Users</span>
                    <span className="mx-2">•</span>
                    <span>Sent: Yesterday</span>
                    <span className="mx-2">•</span>
                    <span>Read rate: 65%</span>
                  </div>
                </div>
                <button 
                  className="text-sm text-blue-600 hover:underline whitespace-nowrap"
                  onClick={showToast}
                >
                  View Details
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default NotificationsPage;
