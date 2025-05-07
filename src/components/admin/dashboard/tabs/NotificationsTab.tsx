
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Bell,
  Calendar,
  Clock,
  Send,
  Plus,
  Edit,
  Users,
  Mail,
  MessageSquare
} from "lucide-react";

const NotificationsTab = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Notification Management</h2>
      </div>
      
      <Tabs defaultValue="notifications" className="space-y-6">
        <TabsList className="grid grid-cols-3 gap-2 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <TabsTrigger value="notifications" className="text-sm">Notifications</TabsTrigger>
          <TabsTrigger value="create" className="text-sm">Create & Schedule</TabsTrigger>
          <TabsTrigger value="templates" className="text-sm">Templates & Rules</TabsTrigger>
        </TabsList>
        
        {/* Notifications Tab */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Notifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                      <SelectItem value="user">User</SelectItem>
                      <SelectItem value="content">Content</SelectItem>
                      <SelectItem value="security">Security</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select defaultValue="7days">
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="today">Today</SelectItem>
                      <SelectItem value="7days">Last 7 Days</SelectItem>
                      <SelectItem value="30days">Last 30 Days</SelectItem>
                      <SelectItem value="all">All Time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button variant="outline" className="flex items-center gap-2">
                  <Calendar size={16} />
                  <span>Schedule</span>
                </Button>
              </div>
              
              <div className="border rounded-md overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[30%]">Title</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Recipients</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Sent</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">New Feature Announcement</TableCell>
                      <TableCell>System</TableCell>
                      <TableCell>All Users</TableCell>
                      <TableCell>Sent</TableCell>
                      <TableCell>2024-01-15 14:30</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">View</Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Weekly Progress Summary</TableCell>
                      <TableCell>User</TableCell>
                      <TableCell>1,245 Users</TableCell>
                      <TableCell>Sent</TableCell>
                      <TableCell>2024-01-14 08:00</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">View</Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Upcoming Maintenance</TableCell>
                      <TableCell>System</TableCell>
                      <TableCell>All Users</TableCell>
                      <TableCell>Scheduled</TableCell>
                      <TableCell>2024-01-18 02:00</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm">View</Button>
                          <Button variant="ghost" size="sm">Edit</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Content Update Alert</TableCell>
                      <TableCell>Content</TableCell>
                      <TableCell>458 Users</TableCell>
                      <TableCell>Draft</TableCell>
                      <TableCell>-</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm">View</Button>
                          <Button variant="ghost" size="sm">Edit</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Create & Schedule Tab */}
        <TabsContent value="create">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Create New Notification</CardTitle>
              <p className="text-sm text-gray-500">Compose and schedule a notification for your users</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Notification Title</label>
                  <Input placeholder="Enter notification title" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Notification Type</label>
                    <Select defaultValue="broadcast">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="broadcast">Broadcast (All Users)</SelectItem>
                        <SelectItem value="targeted">Targeted (Specific Users)</SelectItem>
                        <SelectItem value="behavioral">Behavioral (Based on Activity)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Target Audience</label>
                    <Select defaultValue="all">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Users</SelectItem>
                        <SelectItem value="active">Active Users</SelectItem>
                        <SelectItem value="inactive">Inactive Users (7+ days)</SelectItem>
                        <SelectItem value="new">New Users ({"<"} 30 days)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Delivery Method</label>
                  <div className="flex gap-4 mt-1">
                    <div className="flex items-center gap-2">
                      <Switch id="push-notification" defaultChecked />
                      <label htmlFor="push-notification">Push Notification</label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch id="email" />
                      <label htmlFor="email">Email</label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch id="in-app" defaultChecked />
                      <label htmlFor="in-app">In-App Message</label>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Message Content</label>
                  <p className="text-xs text-gray-500 mb-1">You can use variables like {"{name}"}, {"{course}"}, etc.</p>
                  <Textarea placeholder="Enter your notification message here..." rows={4} />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Delivery Schedule</label>
                  <div className="flex items-center gap-2">
                    <Switch id="send-immediately" defaultChecked />
                    <label htmlFor="send-immediately">Send Immediately</label>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Action Button (Optional)</label>
                  <Input placeholder="e.g., View Study Plan" />
                </div>
              </div>
              
              <div className="border p-4 rounded-md bg-gray-50 dark:bg-gray-800/50">
                <h4 className="text-sm font-medium mb-3">Notification Preview</h4>
                <div className="bg-white dark:bg-gray-800 border rounded-md p-4">
                  <p className="font-medium mb-1">Your notification title will appear here</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Your message content will be displayed here...</p>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button className="flex items-center gap-2">
                  <Send size={16} />
                  <span>Send Notification</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Templates & Rules Tab */}
        <TabsContent value="templates">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">Notification Templates</CardTitle>
                  <Button className="flex items-center gap-2">
                    <Plus size={16} />
                    <span>Create Template</span>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="border rounded-md overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Template Name</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Last Modified</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Welcome Message</TableCell>
                        <TableCell>Onboarding</TableCell>
                        <TableCell>2024-01-15</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">Edit</Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Study Reminder</TableCell>
                        <TableCell>Engagement</TableCell>
                        <TableCell>2024-01-12</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">Edit</Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Progress Milestone</TableCell>
                        <TableCell>Motivation</TableCell>
                        <TableCell>2024-01-10</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">Edit</Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Emotional Support</TableCell>
                        <TableCell>Wellness</TableCell>
                        <TableCell>2024-01-08</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">Edit</Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">New Content Available</TableCell>
                        <TableCell>Content</TableCell>
                        <TableCell>2024-01-05</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">Edit</Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">Automated Notification Rules</CardTitle>
                  <Button className="flex items-center gap-2">
                    <Plus size={16} />
                    <span>Create Rule</span>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="border rounded-md p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">Inactivity Reminder</h4>
                        <div className="mt-1 space-y-1 text-sm">
                          <p><span className="text-gray-500">Trigger:</span> No app activity for 3+ days</p>
                          <p><span className="text-gray-500">Template:</span> Study Reminder</p>
                          <p><span className="text-gray-500">Audience:</span> All Users</p>
                          <p><span className="text-gray-500">Frequency:</span> Once per user</p>
                          <p><span className="text-gray-500">Channels:</span> Push, In-App</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">Edit Rule</Button>
                    </div>
                  </div>
                  
                  <div className="border rounded-md p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">Study Streak Milestone</h4>
                        <div className="mt-1 space-y-1 text-sm">
                          <p><span className="text-gray-500">Trigger:</span> User reaches 7-day study streak</p>
                          <p><span className="text-gray-500">Template:</span> Milestone Celebration</p>
                          <p><span className="text-gray-500">Audience:</span> Active Users</p>
                          <p><span className="text-gray-500">Frequency:</span> At 7, 30, 60, 90 days</p>
                          <p><span className="text-gray-500">Channels:</span> All Channels</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">Edit Rule</Button>
                    </div>
                  </div>
                  
                  <div className="border rounded-md p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">Weekly Progress Summary</h4>
                        <div className="mt-1 space-y-1 text-sm">
                          <p><span className="text-gray-500">Trigger:</span> Weekly on Monday mornings</p>
                          <p><span className="text-gray-500">Template:</span> Weekly Progress</p>
                          <p><span className="text-gray-500">Audience:</span> All Users</p>
                          <p><span className="text-gray-500">Frequency:</span> Weekly</p>
                          <p><span className="text-gray-500">Channels:</span> Email, In-App</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">Edit Rule</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NotificationsTab;
