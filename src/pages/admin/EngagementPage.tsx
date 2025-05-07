
import React from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { MessageSquare, Heart, Award, Users } from "lucide-react";

const EngagementPage = () => {
  const { toast } = useToast();

  const showToast = () => {
    toast({
      title: "Engagement Feature",
      description: "This feature is currently under development.",
      variant: "default"
    });
  };

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Engagement Management</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Monitor and improve student engagement with the platform
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Daily Active Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold">842</div>
              <div className="p-2 bg-blue-100 rounded-full text-blue-600">
                <Users size={20} />
              </div>
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              +12% from yesterday
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Messages Sent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold">3,842</div>
              <div className="p-2 bg-green-100 rounded-full text-green-600">
                <MessageSquare size={20} />
              </div>
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              +320 from yesterday
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Positive Emotions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold">78%</div>
              <div className="p-2 bg-red-100 rounded-full text-red-600">
                <Heart size={20} />
              </div>
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              +5% from last week
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Streak Achievements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold">568</div>
              <div className="p-2 bg-yellow-100 rounded-full text-yellow-600">
                <Award size={20} />
              </div>
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              +48 new streaks this week
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>User Feedback Analytics</CardTitle>
          </CardHeader>
          <CardContent className="h-64 flex items-center justify-center">
            <div className="text-center">
              <div className="inline-flex h-12 w-12 rounded-full bg-blue-100 items-center justify-center mb-4">
                <MessageSquare size={24} className="text-blue-600" />
              </div>
              <h3 className="text-lg font-medium">Feedback Management Module</h3>
              <p className="text-muted-foreground max-w-md mt-2">
                View and respond to user feedback, analyze sentiment trends
              </p>
              <button 
                className="mt-4 px-4 py-2 rounded-md bg-primary text-white"
                onClick={showToast}
              >
                View Feedback
              </button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Emotion Analytics</CardTitle>
          </CardHeader>
          <CardContent className="h-64 flex items-center justify-center">
            <div className="text-center">
              <div className="inline-flex h-12 w-12 rounded-full bg-red-100 items-center justify-center mb-4">
                <Heart size={24} className="text-red-600" />
              </div>
              <h3 className="text-lg font-medium">Student Emotion Tracking</h3>
              <p className="text-muted-foreground max-w-md mt-2">
                Monitor emotional patterns to improve student wellbeing and learning experience
              </p>
              <button 
                className="mt-4 px-4 py-2 rounded-md bg-primary text-white"
                onClick={showToast}
              >
                View Analytics
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default EngagementPage;
