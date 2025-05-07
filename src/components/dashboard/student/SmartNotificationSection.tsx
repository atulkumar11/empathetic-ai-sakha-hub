
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Bell, 
  Calendar, 
  CheckCircle, 
  Clock, 
  MessageSquare, 
  Book, 
  AlertCircle, 
  Smartphone,
  Mail,
  PhoneCall
} from "lucide-react";

export const SmartNotificationSection = () => {
  const [activeTab, setActiveTab] = useState("upcoming");
  
  const notifications = {
    upcoming: [
      {
        id: 1,
        title: "Physics Test Tomorrow",
        description: "Your scheduled test on 'Electromagnetism' is tomorrow at 10:00 AM",
        time: "Tomorrow, 10:00 AM",
        type: "exam",
        delivered: ["app", "email", "sms"]
      },
      {
        id: 2,
        title: "Study Reminder: Organic Chemistry",
        description: "As per your study plan, it's time to review Aldehydes and Ketones",
        time: "Today, 4:30 PM",
        type: "study",
        delivered: ["app", "whatsapp"]
      },
      {
        id: 3,
        title: "Live Session with Dr. Sharma",
        description: "Your booked session on 'JEE Advanced Physics' starts in 2 hours",
        time: "Today, 7:00 PM",
        type: "session",
        delivered: ["app", "email", "sms", "whatsapp"]
      },
      {
        id: 4,
        title: "Weekly Progress Review",
        description: "Let's review your study progress for the week and adjust your plan",
        time: "Sunday, 11:00 AM",
        type: "progress",
        delivered: ["app"]
      }
    ],
    past: [
      {
        id: 5,
        title: "Biology Quiz Completed",
        description: "You scored 85% on your Cell Biology quiz. Great progress!",
        time: "Yesterday, 3:45 PM",
        type: "result",
        delivered: ["app", "email"]
      },
      {
        id: 6,
        title: "Missed Study Session",
        description: "You missed your scheduled study session on Calculus",
        time: "Yesterday, 9:00 AM",
        type: "missed",
        delivered: ["app", "whatsapp"]
      },
      {
        id: 7,
        title: "New Forum Discussion",
        description: "A new discussion on 'Integration Techniques' was created that matches your interests",
        time: "2 days ago",
        type: "forum",
        delivered: ["app"]
      }
    ]
  };

  const notificationPreferences = [
    {
      category: "Study Plan Reminders",
      description: "Notifications about upcoming study sessions and topics",
      app: true,
      email: true,
      sms: false,
      whatsapp: true
    },
    {
      category: "Test & Quiz Alerts",
      description: "Reminders about scheduled tests and quizzes",
      app: true,
      email: true,
      sms: true,
      whatsapp: true
    },
    {
      category: "Progress Reports",
      description: "Weekly and monthly progress summaries",
      app: true,
      email: true,
      sms: false,
      whatsapp: false
    },
    {
      category: "Forum Activity",
      description: "Updates on discussions you're participating in",
      app: true,
      email: false,
      sms: false,
      whatsapp: false
    },
    {
      category: "Tutor Sessions",
      description: "Reminders about upcoming tutor sessions",
      app: true,
      email: true,
      sms: true,
      whatsapp: true
    }
  ];

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "exam": return <AlertCircle className="text-red-500" />;
      case "study": return <Book className="text-blue-500" />;
      case "session": return <PhoneCall className="text-violet-500" />;
      case "progress": return <CheckCircle className="text-green-500" />;
      case "result": return <CheckCircle className="text-green-500" />;
      case "missed": return <Clock className="text-amber-500" />;
      case "forum": return <MessageSquare className="text-blue-500" />;
      default: return <Bell className="text-gray-500" />;
    }
  };

  const getDeliveryIcon = (method: string) => {
    switch (method) {
      case "app": return <Bell size={14} />;
      case "email": return <Mail size={14} />;
      case "sms": return <Smartphone size={14} />;
      case "whatsapp": return <MessageSquare size={14} />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Smart Notifications</h2>
        <p className="text-muted-foreground">
          Manage your study reminders and stay on track with timely notifications
        </p>
      </div>

      <Tabs defaultValue="upcoming" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="past">Past Notifications</TabsTrigger>
          <TabsTrigger value="settings">Notification Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="mt-6">
          <div className="space-y-4">
            {notifications.upcoming.map((notification) => (
              <Card key={notification.id} className="hover:shadow-sm transition-all">
                <CardHeader className="pb-2 flex flex-row items-start space-x-4">
                  <div className="mt-1 bg-violet-100 p-2 rounded-full">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="space-y-1">
                    <CardTitle className="text-base">{notification.title}</CardTitle>
                    <CardDescription>{notification.description}</CardDescription>
                  </div>
                </CardHeader>
                <CardFooter className="pt-2 flex justify-between items-center">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-1" />
                    {notification.time}
                  </div>
                  <div className="flex space-x-2">
                    {notification.delivered.map(method => (
                      <Badge key={method} variant="outline" className="bg-violet-50 text-violet-700">
                        {getDeliveryIcon(method)}
                      </Badge>
                    ))}
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="past" className="mt-6">
          <div className="space-y-4">
            {notifications.past.map((notification) => (
              <Card key={notification.id} className="hover:shadow-sm transition-all bg-muted/30">
                <CardHeader className="pb-2 flex flex-row items-start space-x-4">
                  <div className="mt-1 bg-gray-100 p-2 rounded-full">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="space-y-1">
                    <CardTitle className="text-base">{notification.title}</CardTitle>
                    <CardDescription>{notification.description}</CardDescription>
                  </div>
                </CardHeader>
                <CardFooter className="pt-2 flex justify-between items-center">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 mr-1" />
                    {notification.time}
                  </div>
                  <div className="flex space-x-2">
                    {notification.delivered.map(method => (
                      <Badge key={method} variant="outline" className="bg-gray-100 text-gray-500">
                        {getDeliveryIcon(method)}
                      </Badge>
                    ))}
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="settings" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Choose how and when you want to receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {notificationPreferences.map((pref, index) => (
                  <div key={index} className="rounded-lg border p-4">
                    <h4 className="text-sm font-medium">{pref.category}</h4>
                    <p className="text-sm text-muted-foreground mb-4">{pref.description}</p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      <div className="flex items-center justify-between space-x-2">
                        <div className="flex items-center space-x-2">
                          <Bell className="h-4 w-4" />
                          <span className="text-sm">App</span>
                        </div>
                        <Switch defaultChecked={pref.app} />
                      </div>
                      <div className="flex items-center justify-between space-x-2">
                        <div className="flex items-center space-x-2">
                          <Mail className="h-4 w-4" />
                          <span className="text-sm">Email</span>
                        </div>
                        <Switch defaultChecked={pref.email} />
                      </div>
                      <div className="flex items-center justify-between space-x-2">
                        <div className="flex items-center space-x-2">
                          <Smartphone className="h-4 w-4" />
                          <span className="text-sm">SMS</span>
                        </div>
                        <Switch defaultChecked={pref.sms} />
                      </div>
                      <div className="flex items-center justify-between space-x-2">
                        <div className="flex items-center space-x-2">
                          <MessageSquare className="h-4 w-4" />
                          <span className="text-sm">WhatsApp</span>
                        </div>
                        <Switch defaultChecked={pref.whatsapp} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Reset to Default</Button>
              <Button className="bg-gradient-to-r from-violet-500 to-purple-600">Save Preferences</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
