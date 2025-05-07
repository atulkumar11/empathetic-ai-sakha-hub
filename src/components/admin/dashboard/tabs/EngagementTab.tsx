
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Activity,
  Calendar,
  Clock,
  Download,
  Target,
  Users,
  MessageSquare,
  BarChart2,
  Bell,
  Send,
  Plus
} from "lucide-react";

const EngagementTab = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Engagement & Feedback</h2>
        <Button variant="outline" className="flex items-center gap-2">
          <Download size={16} />
          <span>Export Data</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium">Active Users</h3>
              <Badge className="bg-blue-100 text-blue-800">+5% from last week</Badge>
            </div>
            <div className="flex items-end gap-2">
              <span className="text-3xl font-bold">1,245</span>
              <span className="text-sm text-gray-500">users</span>
            </div>
            <div className="h-10 bg-blue-50 dark:bg-blue-900/20 rounded-md mt-3 flex items-end">
              <div className="bg-blue-500 h-6 w-8 rounded-sm"></div>
              <div className="bg-blue-500 h-4 w-8 rounded-sm"></div>
              <div className="bg-blue-500 h-8 w-8 rounded-sm"></div>
              <div className="bg-blue-500 h-5 w-8 rounded-sm"></div>
              <div className="bg-blue-500 h-7 w-8 rounded-sm"></div>
              <div className="bg-blue-500 h-10 w-8 rounded-sm"></div>
              <div className="bg-blue-500 h-3 w-8 rounded-sm"></div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium">Avg. Session Time</h3>
              <Badge className="bg-green-100 text-green-800">+2m from last week</Badge>
            </div>
            <div className="flex items-end gap-2">
              <span className="text-3xl font-bold">24m 32s</span>
            </div>
            <div className="flex items-center justify-between mt-3">
              <span className="text-xs text-gray-500">Last week: 22m 15s</span>
              <Button variant="ghost" size="sm" className="flex items-center gap-1 h-7 text-xs">
                <Clock size={12} />
                <span>Details</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium">Sessions Today</h3>
              <Badge className="bg-purple-100 text-purple-800">+12% from yesterday</Badge>
            </div>
            <div className="flex items-end gap-2">
              <span className="text-3xl font-bold">3,856</span>
            </div>
            <div className="flex items-center justify-between mt-3">
              <span className="text-xs text-gray-500">Yesterday: 3,442</span>
              <Button variant="ghost" size="sm" className="flex items-center gap-1 h-7 text-xs">
                <Activity size={12} />
                <span>Live View</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium">Retention Rate</h3>
              <Badge className="bg-amber-100 text-amber-800">+3% from last month</Badge>
            </div>
            <div className="flex items-end gap-2">
              <span className="text-3xl font-bold">78%</span>
            </div>
            <div className="flex items-center justify-between mt-3">
              <span className="text-xs text-gray-500">30-day rolling average</span>
              <Button variant="ghost" size="sm" className="flex items-center gap-1 h-7 text-xs">
                <Target size={12} />
                <span>Analysis</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="feedback" className="space-y-6">
        <TabsList className="grid grid-cols-2 md:grid-cols-3 gap-2 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <TabsTrigger value="feedback" className="text-sm">User Feedback</TabsTrigger>
          <TabsTrigger value="mood" className="text-sm">Emotion Analytics</TabsTrigger>
          <TabsTrigger value="notifications" className="text-sm">Notification Management</TabsTrigger>
        </TabsList>
        
        {/* User Feedback Tab */}
        <TabsContent value="feedback">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">User Feedback</CardTitle>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <Download size={14} />
                    <span>Export</span>
                  </Button>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="feature">Feature</SelectItem>
                      <SelectItem value="bug">Bug</SelectItem>
                      <SelectItem value="suggestion">Suggestion</SelectItem>
                      <SelectItem value="experience">Experience</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <BarChart2 size={16} />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="border-t">
                <div className="divide-y">
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <span className="font-medium">John Smith</span>
                        <span className="text-gray-500 mx-2">•</span>
                        <span className="text-sm text-gray-500">Feature</span>
                      </div>
                      <span className="text-sm text-gray-500">2024-01-15</span>
                    </div>
                    <p className="mb-2">The flashcards feature is amazing! Would love to see more interactive elements.</p>
                    <div className="flex justify-between items-center">
                      <Badge className="bg-green-100 text-green-800">Positive</Badge>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">Respond</Button>
                        <Button variant="ghost" size="sm">Mark as Reviewed</Button>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <span className="font-medium">Emma Watson</span>
                        <span className="text-gray-500 mx-2">•</span>
                        <span className="text-sm text-gray-500">Bug</span>
                      </div>
                      <span className="text-sm text-gray-500">2024-01-12</span>
                    </div>
                    <p className="mb-2">The study plan calendar doesn't sync correctly with my personal calendar.</p>
                    <div className="flex justify-between items-center">
                      <Badge className="bg-red-100 text-red-800">Negative</Badge>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">Respond</Button>
                        <Button variant="ghost" size="sm">Mark as Reviewed</Button>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <span className="font-medium">Olivia Brown</span>
                        <span className="text-gray-500 mx-2">•</span>
                        <span className="text-sm text-gray-500">Suggestion</span>
                      </div>
                      <span className="text-sm text-gray-500">2024-01-10</span>
                    </div>
                    <p className="mb-2">It would be great if we could customize the AI tutor's personality.</p>
                    <div className="flex justify-between items-center">
                      <Badge className="bg-gray-100 text-gray-800">Neutral</Badge>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">Respond</Button>
                        <Button variant="ghost" size="sm">Mark as Reviewed</Button>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <span className="font-medium">James Wilson</span>
                        <span className="text-gray-500 mx-2">•</span>
                        <span className="text-sm text-gray-500">Experience</span>
                      </div>
                      <span className="text-sm text-gray-500">2024-01-08</span>
                    </div>
                    <p className="mb-2">The emotional support messages really helped me during exam week!</p>
                    <div className="flex justify-between items-center">
                      <Badge className="bg-green-100 text-green-800">Very Positive</Badge>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">Respond</Button>
                        <Button variant="ghost" size="sm">Mark as Reviewed</Button>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <span className="font-medium">Ava Garcia</span>
                        <span className="text-gray-500 mx-2">•</span>
                        <span className="text-sm text-gray-500">Bug</span>
                      </div>
                      <span className="text-sm text-gray-500">2024-01-05</span>
                    </div>
                    <p className="mb-2">Sometimes the AI doesn't recognize my questions correctly.</p>
                    <div className="flex justify-between items-center">
                      <Badge className="bg-red-100 text-red-800">Negative</Badge>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">Respond</Button>
                        <Button variant="ghost" size="sm">Mark as Reviewed</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-2 flex justify-between items-center">
                <span className="text-sm text-gray-500">Showing 5 of 42 feedback items</span>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Previous</Button>
                  <Button variant="outline" size="sm">Next</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Emotion Analytics Tab */}
        <TabsContent value="mood">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Mood Impact on Learning</CardTitle>
                <p className="text-sm text-gray-500">Correlation between emotional state and performance</p>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gray-100 dark:bg-gray-800 rounded-md flex items-center justify-center mb-4">
                  <span className="text-gray-500">Mood-Performance Correlation Chart Placeholder</span>
                </div>
                <div className="flex justify-end">
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <Download size={14} />
                    <span>Export Data</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Emotional Learning Trends</CardTitle>
                <p className="text-sm text-gray-500">Monthly trends in student emotional states</p>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gray-100 dark:bg-gray-800 rounded-md flex items-center justify-center mb-4">
                  <span className="text-gray-500">Emotional Learning Trends Chart Placeholder</span>
                </div>
                <div className="flex justify-end">
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <Calendar size={14} />
                    <span>Change Timeframe</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Notification Management Tab */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Notification Management</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="create">
                <TabsList className="mb-4">
                  <TabsTrigger value="create">Create & Schedule</TabsTrigger>
                  <TabsTrigger value="templates">Templates & Rules</TabsTrigger>
                </TabsList>
                
                <TabsContent value="create">
                  <div className="space-y-4">
                    <h3 className="text-base font-medium">Create New Notification</h3>
                    <p className="text-sm text-gray-500">Compose and schedule a notification for your users</p>
                    
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
                  </div>
                </TabsContent>
                
                <TabsContent value="templates">
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="text-base font-medium">Notification Templates</h3>
                        <Button variant="outline" size="sm" className="flex items-center gap-2">
                          <Plus size={14} />
                          <span>Create Template</span>
                        </Button>
                      </div>
                      
                      <div className="border rounded-md overflow-hidden">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Template Name</TableHead>
                              <TableHead>Type</TableHead>
                              <TableHead>Last Modified</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            <TableRow>
                              <TableCell className="font-medium">Welcome Message</TableCell>
                              <TableCell>Onboarding</TableCell>
                              <TableCell>2024-01-15</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">Study Reminder</TableCell>
                              <TableCell>Engagement</TableCell>
                              <TableCell>2024-01-12</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">Progress Milestone</TableCell>
                              <TableCell>Motivation</TableCell>
                              <TableCell>2024-01-10</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">Emotional Support</TableCell>
                              <TableCell>Wellness</TableCell>
                              <TableCell>2024-01-08</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">New Content Available</TableCell>
                              <TableCell>Content</TableCell>
                              <TableCell>2024-01-05</TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="text-base font-medium">Automated Notification Rules</h3>
                      </div>
                      
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
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EngagementTab;
