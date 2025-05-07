
import React, { useState } from 'react';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Bell, 
  BookOpen, 
  Calendar, 
  Check, 
  Clock, 
  FileText, 
  Megaphone, 
  BarChart, 
  Award, 
  Lightbulb, 
  AlertCircle 
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'concept' | 'exam' | 'flashcard' | 'streak' | 'achievement' | 'reminder' | 'announcement' | 'system';
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
  actionText?: string;
  priority?: 'low' | 'medium' | 'high';
}

const NotificationsPage = () => {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'New Concept Available',
      message: 'Newton\'s Laws of Motion concept card is now available for you to study.',
      type: 'concept',
      timestamp: new Date(Date.now() - 1800000),
      read: false,
      actionUrl: '/dashboard/student/concepts/card/concept-1',
      actionText: 'View Concept',
      priority: 'medium'
    },
    {
      id: '2',
      title: 'Exam Reminder',
      message: 'You have a Physics mid-term mock exam scheduled for tomorrow.',
      type: 'exam',
      timestamp: new Date(Date.now() - 3600000),
      read: false,
      actionUrl: '/dashboard/student/practice-exam/exam-1/start',
      actionText: 'Start Exam',
      priority: 'high'
    },
    {
      id: '3',
      title: 'Flashcard Review Due',
      message: 'Your Chemistry Periodic Table flashcards need review today.',
      type: 'flashcard',
      timestamp: new Date(Date.now() - 86400000),
      read: true,
      actionUrl: '/dashboard/student/flashcards/deck-2/interactive',
      actionText: 'Review Now'
    },
    {
      id: '4',
      title: 'Great Progress!',
      message: 'You\'ve maintained a 5-day study streak! Keep it up!',
      type: 'streak',
      timestamp: new Date(Date.now() - 172800000),
      read: true
    },
    {
      id: '5',
      title: 'Achievement Unlocked',
      message: 'You\'ve earned the "Biology Master" badge for completing all Biology tests with over 90% accuracy.',
      type: 'achievement',
      timestamp: new Date(Date.now() - 259200000),
      read: true,
      actionUrl: '/dashboard/student/profile/achievements',
      actionText: 'View Achievements'
    },
    {
      id: '6',
      title: 'Study Reminder',
      message: 'Don\'t forget to review your Calculus notes today as scheduled in your study plan.',
      type: 'reminder',
      timestamp: new Date(Date.now() - 43200000),
      read: false,
      priority: 'medium'
    },
    {
      id: '7',
      title: 'New Feature Available',
      message: 'We\'ve added a new interactive quiz feature! Try it out now.',
      type: 'announcement',
      timestamp: new Date(Date.now() - 432000000),
      read: true,
      actionUrl: '/dashboard/student/feature-tour',
      actionText: 'Take Tour'
    },
    {
      id: '8',
      title: 'System Maintenance',
      message: 'The system will be undergoing maintenance on Sunday from 2-4 AM. Some features may be temporarily unavailable.',
      type: 'system',
      timestamp: new Date(Date.now() - 518400000),
      read: true
    }
  ]);

  const markAsRead = (id: string) => {
    setNotifications(prevNotifications =>
      prevNotifications.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prevNotifications =>
      prevNotifications.map(notification => ({ ...notification, read: true }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prevNotifications =>
      prevNotifications.filter(notification => notification.id !== id)
    );
  };

  const getFilteredNotifications = () => {
    if (activeTab === 'all') {
      return notifications;
    } else if (activeTab === 'unread') {
      return notifications.filter(notification => !notification.read);
    } else {
      return notifications.filter(notification => notification.type === activeTab);
    }
  };

  const filteredNotifications = getFilteredNotifications();

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'concept': return <BookOpen className="h-5 w-5 text-blue-500" />;
      case 'exam': return <FileText className="h-5 w-5 text-purple-500" />;
      case 'flashcard': return <Clock className="h-5 w-5 text-amber-500" />;
      case 'streak': return <BarChart className="h-5 w-5 text-green-500" />;
      case 'achievement': return <Award className="h-5 w-5 text-amber-500" />;
      case 'reminder': return <Calendar className="h-5 w-5 text-cyan-500" />;
      case 'announcement': return <Megaphone className="h-5 w-5 text-violet-500" />;
      case 'system': return <AlertCircle className="h-5 w-5 text-red-500" />;
      default: return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  const getNotificationBadge = (type: string) => {
    switch (type) {
      case 'concept': return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Concept</Badge>;
      case 'exam': return <Badge className="bg-purple-100 text-purple-800 border-purple-200">Exam</Badge>;
      case 'flashcard': return <Badge className="bg-amber-100 text-amber-800 border-amber-200">Flashcard</Badge>;
      case 'streak': return <Badge className="bg-green-100 text-green-800 border-green-200">Streak</Badge>;
      case 'achievement': return <Badge className="bg-amber-100 text-amber-800 border-amber-200">Achievement</Badge>;
      case 'reminder': return <Badge className="bg-cyan-100 text-cyan-800 border-cyan-200">Reminder</Badge>;
      case 'announcement': return <Badge className="bg-violet-100 text-violet-800 border-violet-200">Announcement</Badge>;
      case 'system': return <Badge className="bg-red-100 text-red-800 border-red-200">System</Badge>;
      default: return <Badge>Notification</Badge>;
    }
  };

  const getPriorityIndicator = (priority?: string) => {
    if (!priority) return null;
    
    switch (priority) {
      case 'high': 
        return <div className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></div>;
      case 'medium': 
        return <div className="absolute top-0 right-0 w-2 h-2 bg-amber-500 rounded-full"></div>;
      default:
        return null;
    }
  };

  return (
    <SharedPageLayout
      title="Notifications"
      subtitle="Stay updated with important alerts, reminders, and achievements"
    >
      <div className="space-y-6">
        {/* Tabs and actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full sm:w-auto">
            <TabsList>
              <TabsTrigger value="all">
                All
                <Badge variant="outline" className="ml-2 bg-gray-100 text-gray-800">
                  {notifications.length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="unread">
                Unread
                <Badge variant="outline" className="ml-2 bg-blue-100 text-blue-800">
                  {notifications.filter(n => !n.read).length}
                </Badge>
              </TabsTrigger>
            </TabsList>
          </Tabs>
          
          <Button 
            variant="outline" 
            className="w-full sm:w-auto"
            onClick={markAllAsRead}
            disabled={!notifications.some(n => !n.read)}
          >
            <Check className="h-4 w-4 mr-2" />
            Mark all as read
          </Button>
        </div>

        {/* Secondary tab bar for types */}
        <div className="overflow-x-auto">
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full flex flex-nowrap justify-start">
              <TabsTrigger value="concept" className="flex items-center whitespace-nowrap">
                <BookOpen className="h-4 w-4 mr-2" />
                Concepts
              </TabsTrigger>
              <TabsTrigger value="exam" className="flex items-center whitespace-nowrap">
                <FileText className="h-4 w-4 mr-2" />
                Exams
              </TabsTrigger>
              <TabsTrigger value="flashcard" className="flex items-center whitespace-nowrap">
                <Clock className="h-4 w-4 mr-2" />
                Flashcards
              </TabsTrigger>
              <TabsTrigger value="achievement" className="flex items-center whitespace-nowrap">
                <Award className="h-4 w-4 mr-2" />
                Achievements
              </TabsTrigger>
              <TabsTrigger value="reminder" className="flex items-center whitespace-nowrap">
                <Calendar className="h-4 w-4 mr-2" />
                Reminders
              </TabsTrigger>
              <TabsTrigger value="announcement" className="flex items-center whitespace-nowrap">
                <Megaphone className="h-4 w-4 mr-2" />
                Announcements
              </TabsTrigger>
              <TabsTrigger value="system" className="flex items-center whitespace-nowrap">
                <AlertCircle className="h-4 w-4 mr-2" />
                System
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Notification list */}
        <div className="space-y-4">
          {filteredNotifications.map((notification) => (
            <Card 
              key={notification.id} 
              className={`${
                notification.read ? 'bg-white' : 'bg-blue-50'
              } transition-colors`}
            >
              <div className="p-5">
                <div className="flex gap-4">
                  <div className="relative mt-1">
                    <div className="p-2 rounded-full bg-gray-100">
                      {getNotificationIcon(notification.type)}
                      {getPriorityIndicator(notification.priority)}
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-1">
                      <div>
                        <h3 className="font-semibold text-lg">{notification.title}</h3>
                        <div className="flex items-center gap-2 mb-2">
                          {getNotificationBadge(notification.type)}
                          <span className="text-xs text-muted-foreground">
                            {formatDistanceToNow(notification.timestamp, { addSuffix: true })}
                          </span>
                        </div>
                      </div>
                      
                      {!notification.read && (
                        <Badge variant="outline" className="h-7 sm:mt-0 w-fit bg-blue-100 text-blue-800 border-blue-200">
                          New
                        </Badge>
                      )}
                    </div>
                    
                    <p className="text-muted-foreground mb-4">
                      {notification.message}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      {notification.actionUrl && (
                        <Button size="sm" asChild>
                          <a href={notification.actionUrl}>
                            {notification.actionText || 'View Details'}
                          </a>
                        </Button>
                      )}
                      
                      {!notification.read && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => markAsRead(notification.id)}
                        >
                          <Check className="h-3.5 w-3.5 mr-1.5" />
                          Mark as read
                        </Button>
                      )}
                      
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={() => deleteNotification(notification.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
          
          {filteredNotifications.length === 0 && (
            <div className="text-center py-12">
              <div className="bg-gray-100 p-4 inline-block rounded-full mb-4">
                <Bell className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium mb-1">No notifications</h3>
              <p className="text-muted-foreground">
                {activeTab === 'all' 
                  ? "You don't have any notifications at the moment." 
                  : activeTab === 'unread' 
                    ? "You've read all your notifications." 
                    : `You don't have any ${activeTab} notifications.`}
              </p>
            </div>
          )}
        </div>
      </div>
    </SharedPageLayout>
  );
};

export default NotificationsPage;
