
import React from 'react';
import { Bell, Clock, Check } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';

// Mock notifications data
const notifications = [
  {
    id: '1',
    title: 'New concept card added',
    message: 'A new concept card on "Quantum Physics" has been added to your study materials.',
    date: '2 hours ago',
    read: false,
    type: 'content'
  },
  {
    id: '2',
    title: 'Study reminder',
    message: 'Your scheduled study session for Chemistry starts in 30 minutes.',
    date: '30 minutes ago',
    read: false,
    type: 'reminder'
  },
  {
    id: '3',
    title: 'Study streak milestone',
    message: "Congratulations! You've maintained a 7-day study streak.",
    date: 'Today',
    read: true,
    type: 'achievement'
  },
  {
    id: '4',
    title: 'AI Tutor suggestion',
    message: 'Based on your recent activity, we recommend reviewing the "Organic Chemistry" concept.',
    date: 'Yesterday',
    read: true,
    type: 'suggestion'
  }
];

export const NotificationsView: React.FC = () => {
  return (
    <SharedPageLayout 
      title="Notifications" 
      subtitle="Stay updated with important alerts and information"
    >
      <div className="space-y-6">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="unread">
              Unread
              <Badge variant="secondary" className="ml-2">
                {notifications.filter(n => !n.read).length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="read">Read</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            <div className="space-y-4">
              {notifications.map(notification => (
                <NotificationCard key={notification.id} notification={notification} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="unread">
            <div className="space-y-4">
              {notifications
                .filter(notification => !notification.read)
                .map(notification => (
                  <NotificationCard key={notification.id} notification={notification} />
                ))}
            </div>
          </TabsContent>
          
          <TabsContent value="read">
            <div className="space-y-4">
              {notifications
                .filter(notification => notification.read)
                .map(notification => (
                  <NotificationCard key={notification.id} notification={notification} />
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </SharedPageLayout>
  );
};

interface NotificationProps {
  notification: {
    id: string;
    title: string;
    message: string;
    date: string;
    read: boolean;
    type: string;
  };
}

const NotificationCard: React.FC<NotificationProps> = ({ notification }) => {
  const getIcon = () => {
    switch (notification.type) {
      case 'reminder':
        return <Clock className="h-5 w-5 text-blue-500" />;
      case 'achievement':
        return <Check className="h-5 w-5 text-green-500" />;
      default:
        return <Bell className="h-5 w-5 text-purple-500" />;
    }
  };

  return (
    <Card className={`border-l-4 ${notification.read ? 'border-l-gray-200' : 'border-l-blue-500'}`}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            {getIcon()}
            <CardTitle className="text-base font-medium">{notification.title}</CardTitle>
          </div>
          <Badge variant="outline" className="text-xs">
            {notification.date}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{notification.message}</p>
        <div className="flex justify-end mt-2">
          <Button variant="ghost" size="sm">
            {notification.read ? 'Mark as unread' : 'Mark as read'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationsView;
