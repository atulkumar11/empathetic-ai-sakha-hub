
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  Lock, 
  Globe, 
  Bell, 
  Shield, 
  Users, 
  MessageSquare,
  CheckCircle,
  Plus,
  X
} from "lucide-react";

const SettingsTabContent = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("password");

  const handleSaveSettings = () => {
    toast({
      title: "Settings saved",
      description: "Your settings have been updated successfully."
    });
  };

  const showNotImplemented = () => {
    toast({
      title: "Coming Soon",
      description: "This feature is currently under development.",
      variant: "default"
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-medium">Account Settings</h2>
      <p className="text-muted-foreground">
        Manage your account settings and preferences here.
      </p>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 md:grid-cols-6 mb-4">
          <TabsTrigger value="password" className="flex items-center gap-2">
            <Lock className="h-4 w-4" />
            <span className="hidden sm:inline">Password</span>
          </TabsTrigger>
          <TabsTrigger value="language" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            <span className="hidden sm:inline">Language</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            <span className="hidden sm:inline">Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="privacy" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span className="hidden sm:inline">Privacy</span>
          </TabsTrigger>
          <TabsTrigger value="linked" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">Linked</span>
          </TabsTrigger>
          <TabsTrigger value="support" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            <span className="hidden sm:inline">Support</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="password">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Lock className="mr-2 h-5 w-5" />
                Change Password
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="current-password" className="text-sm font-medium">Current Password</label>
                <Input id="current-password" type="password" placeholder="••••••••" />
              </div>
              <div className="space-y-2">
                <label htmlFor="new-password" className="text-sm font-medium">New Password</label>
                <Input id="new-password" type="password" placeholder="••••••••" />
              </div>
              <div className="space-y-2">
                <label htmlFor="confirm-password" className="text-sm font-medium">Confirm New Password</label>
                <Input id="confirm-password" type="password" placeholder="••••••••" />
              </div>
              <Button onClick={handleSaveSettings}>Update Password</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="language">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="mr-2 h-5 w-5" />
                Language Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="language" className="text-sm font-medium">Interface Language</label>
                <Select defaultValue="english">
                  <SelectTrigger>
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="hindi">Hindi</SelectItem>
                    <SelectItem value="tamil">Tamil</SelectItem>
                    <SelectItem value="telugu">Telugu</SelectItem>
                    <SelectItem value="marathi">Marathi</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Study Content Language</label>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-primary">English</Badge>
                  <Badge variant="outline" className="cursor-pointer hover:bg-primary/10" onClick={showNotImplemented}>Add Language</Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  *Premium members can access content in multiple languages
                </p>
              </div>
              <Button onClick={handleSaveSettings}>Save Preferences</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="mr-2 h-5 w-5" />
                Notification Preferences
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">Email Notifications</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="email-study-reminders" defaultChecked />
                      <label htmlFor="email-study-reminders" className="text-sm">Study plan reminders</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="email-performance" defaultChecked />
                      <label htmlFor="email-performance" className="text-sm">Performance updates</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="email-promotions" />
                      <label htmlFor="email-promotions" className="text-sm">Promotional messages</label>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-2">SMS Notifications</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="sms-study-reminders" defaultChecked />
                      <label htmlFor="sms-study-reminders" className="text-sm">Study plan reminders</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="sms-important-updates" />
                      <label htmlFor="sms-important-updates" className="text-sm">Important updates</label>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-2">In-App Notifications</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="app-messages" defaultChecked />
                      <label htmlFor="app-messages" className="text-sm">Chat messages</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="app-study-reminders" defaultChecked />
                      <label htmlFor="app-study-reminders" className="text-sm">Study reminders</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="app-achievements" defaultChecked />
                      <label htmlFor="app-achievements" className="text-sm">Achievements</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="app-system" defaultChecked />
                      <label htmlFor="app-system" className="text-sm">System notifications</label>
                    </div>
                  </div>
                </div>
                
                <Button onClick={handleSaveSettings} className="mt-4">Save Preferences</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="privacy">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="mr-2 h-5 w-5" />
                Privacy Settings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">Profile Visibility</h3>
                  <Select defaultValue="friends">
                    <SelectTrigger>
                      <SelectValue placeholder="Who can see your profile" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Everyone</SelectItem>
                      <SelectItem value="friends">Friends Only</SelectItem>
                      <SelectItem value="private">Private</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-2">Achievements Visibility</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="show-achievements" defaultChecked />
                      <label htmlFor="show-achievements" className="text-sm">Show achievements on profile</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="show-progress" defaultChecked />
                      <label htmlFor="show-progress" className="text-sm">Show study progress</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="show-ranking" defaultChecked />
                      <label htmlFor="show-ranking" className="text-sm">Show peer ranking</label>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-2">Data Usage</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="analytics" defaultChecked />
                      <label htmlFor="analytics" className="text-sm">Allow analytics to improve platform</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="personalization" defaultChecked />
                      <label htmlFor="personalization" className="text-sm">Personalized learning experience</label>
                    </div>
                  </div>
                </div>

                <Button onClick={handleSaveSettings} className="mt-4">Save Privacy Settings</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="linked">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="mr-2 h-5 w-5" />
                Linked Accounts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-3">Parent/Guardian Dashboard Access</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
                      <div className="flex items-center space-x-3">
                        <div className="bg-blue-100 text-blue-700 p-2 rounded-full">
                          <Users size={16} />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Rohan Sharma (Parent)</p>
                          <p className="text-xs text-muted-foreground">rohan.sharma@example.com</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className="bg-green-100 text-green-700 border-green-200">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Active
                        </Badge>
                        <Button variant="ghost" size="icon" onClick={showNotImplemented}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <Button variant="outline" className="w-full flex items-center justify-center" onClick={showNotImplemented}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add New Linked Account
                    </Button>
                  </div>
                </div>

                <div className="pt-4">
                  <h3 className="text-sm font-medium mb-3">Social Accounts</h3>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full flex items-center justify-center" onClick={showNotImplemented}>
                      Connect Google Account
                    </Button>
                    <Button variant="outline" className="w-full flex items-center justify-center" onClick={showNotImplemented}>
                      Connect Microsoft Account
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="support">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare className="mr-2 h-5 w-5" />
                Support & Feedback
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">Contact Support</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Our support team is available 24/7 to help you with any questions or concerns.
                  </p>
                  <Button className="w-full md:w-auto" onClick={showNotImplemented}>
                    Contact Support
                  </Button>
                </div>

                <div className="pt-4">
                  <h3 className="text-sm font-medium mb-2">Submit Feedback</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    We're always looking to improve. Share your thoughts with us!
                  </p>
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <label htmlFor="feedback-type" className="text-sm">Feedback Type</label>
                      <Select defaultValue="suggestion">
                        <SelectTrigger id="feedback-type">
                          <SelectValue placeholder="Select feedback type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="suggestion">Suggestion</SelectItem>
                          <SelectItem value="bug">Bug Report</SelectItem>
                          <SelectItem value="content">Content Issue</SelectItem>
                          <SelectItem value="feature">Feature Request</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="feedback-message" className="text-sm">Your Message</label>
                      <textarea 
                        id="feedback-message" 
                        className="w-full min-h-[100px] p-2 rounded-md border border-input bg-background"
                        placeholder="Tell us what you think..."
                      ></textarea>
                    </div>
                    <Button onClick={showNotImplemented}>
                      Submit Feedback
                    </Button>
                  </div>
                </div>

                <div className="pt-4">
                  <h3 className="text-sm font-medium mb-2">Knowledge Base</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Browse our help center for answers to common questions.
                  </p>
                  <Button variant="outline" onClick={showNotImplemented}>
                    Visit Help Center
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsTabContent;
