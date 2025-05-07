
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import { 
  Bell, Lock, Globe, ShieldAlert, Users, MessageSquare, Download,
  CheckCircle, Smartphone, Mail, PanelLeft, Eye, Trash2, Loader2
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";

const SettingsPage = () => {
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);
  
  // Settings state
  const [settings, setSettings] = useState({
    language: "en",
    theme: "system",
    fontScale: [1],
    notificationsEnabled: true,
    emailNotifications: true,
    smsNotifications: false,
    studyReminders: true,
    resultNotifications: true,
    newContentNotifications: true,
    newFeaturesNotifications: true,
    profileVisibility: "public",
    allowPeerRanking: true,
    shareProgress: true,
    highContrastMode: false,
    autoplayVideos: true,
    showPeerRankings: true
  });
  
  // Privacy options
  const privacyOptions = [
    { id: "profile", title: "Public Profile", description: "Allow others to see your profile" },
    { id: "progress", title: "Share Progress", description: "Let peers see your academic progress" },
    { id: "ranking", title: "Peer Ranking", description: "Include your results in peer rankings" },
    { id: "activity", title: "Learning Activity", description: "Show your active study status" },
  ];
  
  const linkedAccounts = [
    { id: "parent", name: "Parent/Guardian", email: "parent@example.com", connected: true },
    { id: "teacher", name: "Teacher Account", email: "", connected: false },
  ];
  
  const handleNotificationToggle = (key: string) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };
  
  const handlePrivacyToggle = (key: string) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
    
    toast({
      title: "Privacy Setting Updated",
      description: `Privacy preference has been changed.`
    });
  };
  
  const handleLanguageChange = (value: string) => {
    setSettings(prev => ({
      ...prev,
      language: value
    }));
    
    toast({
      title: "Language Updated",
      description: `Language preference set to ${getLanguageName(value)}`
    });
  };
  
  const handleThemeChange = (value: string) => {
    setSettings(prev => ({
      ...prev,
      theme: value
    }));
    
    toast({
      title: "Theme Updated",
      description: `Theme preference set to ${value.charAt(0).toUpperCase() + value.slice(1)}`
    });
  };
  
  const handleFontScaleChange = (values: number[]) => {
    setSettings(prev => ({
      ...prev,
      fontScale: values
    }));
  };
  
  const handleSaveSettings = () => {
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      toast({
        title: "Settings Saved",
        description: "Your preferences have been updated successfully."
      });
    }, 1000);
  };
  
  const handleDeleteAccount = () => {
    toast({
      title: "Account Deletion Requested",
      description: "Please check your email for further instructions.",
      variant: "destructive"
    });
  };
  
  const handleSubmitFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Feedback Submitted",
      description: "Thank you for your feedback!"
    });
  };
  
  const getLanguageName = (code: string) => {
    const languages: Record<string, string> = {
      en: "English",
      hi: "Hindi",
      ta: "Tamil",
      te: "Telugu",
      kn: "Kannada",
      ml: "Malayalam",
      mr: "Marathi",
      bn: "Bengali",
      gu: "Gujarati"
    };
    
    return languages[code] || code;
  };
  
  return (
    <div className="space-y-6 pb-8">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Manage your account preferences and application settings
        </p>
      </div>
      
      <Tabs defaultValue="account">
        <TabsList className="grid w-full grid-cols-5 mb-6">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
          <TabsTrigger value="accessibility">Accessibility</TabsTrigger>
          <TabsTrigger value="help">Help & Support</TabsTrigger>
        </TabsList>
        
        <TabsContent value="account" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5" />
                <span>Password & Authentication</span>
              </CardTitle>
              <CardDescription>
                Update your password and security settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input id="current-password" type="password" />
                </div>
                <div></div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input id="confirm-password" type="password" />
                </div>
              </div>
              <Button className="mt-2">Change Password</Button>
              
              <Separator className="my-6" />
              
              <div>
                <h3 className="text-lg font-medium mb-4">Linked Accounts</h3>
                <div className="space-y-4">
                  {linkedAccounts.map(account => (
                    <div key={account.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-blue-500" />
                        <div>
                          <p className="font-medium">{account.name}</p>
                          <p className="text-xs text-gray-500">{account.email || "Not connected"}</p>
                        </div>
                      </div>
                      <Button variant={account.connected ? "outline" : "default"} size="sm">
                        {account.connected ? "Disconnect" : "Connect"}
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                <span>Language & Region</span>
              </CardTitle>
              <CardDescription>
                Select your preferred language and regional settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select value={settings.language} onValueChange={handleLanguageChange}>
                    <SelectTrigger id="language">
                      <SelectValue placeholder="Select Language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="hi">Hindi</SelectItem>
                      <SelectItem value="ta">Tamil</SelectItem>
                      <SelectItem value="te">Telugu</SelectItem>
                      <SelectItem value="kn">Kannada</SelectItem>
                      <SelectItem value="ml">Malayalam</SelectItem>
                      <SelectItem value="mr">Marathi</SelectItem>
                      <SelectItem value="bn">Bengali</SelectItem>
                      <SelectItem value="gu">Gujarati</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-destructive flex items-center gap-2">
                <Trash2 className="h-5 w-5" />
                <span>Delete Account</span>
              </CardTitle>
              <CardDescription>
                Permanently delete your account and all associated data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Alert variant="destructive">
                <AlertTitle>Warning</AlertTitle>
                <AlertDescription>
                  This action cannot be undone. All your data, including progress, materials, and preferences will be permanently deleted.
                </AlertDescription>
              </Alert>
              <Button variant="destructive" className="mt-4" onClick={handleDeleteAccount}>
                Delete My Account
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                <span>Notification Settings</span>
              </CardTitle>
              <CardDescription>
                Control which notifications you receive and how
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="notifications" className="text-base">Enable Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive updates about your learning progress and activities
                  </p>
                </div>
                <Switch
                  id="notifications"
                  checked={settings.notificationsEnabled}
                  onCheckedChange={() => handleNotificationToggle('notificationsEnabled')}
                />
              </div>
              
              <Separator />
              
              <div className="space-y-3">
                <h3 className="font-medium">Notification Channels</h3>
                <div className="grid gap-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <Label htmlFor="email-notifications">Email</Label>
                    </div>
                    <Switch
                      id="email-notifications"
                      checked={settings.emailNotifications}
                      onCheckedChange={() => handleNotificationToggle('emailNotifications')}
                      disabled={!settings.notificationsEnabled}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Smartphone className="h-4 w-4 text-muted-foreground" />
                      <Label htmlFor="sms-notifications">SMS</Label>
                    </div>
                    <Switch
                      id="sms-notifications"
                      checked={settings.smsNotifications}
                      onCheckedChange={() => handleNotificationToggle('smsNotifications')}
                      disabled={!settings.notificationsEnabled}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Bell className="h-4 w-4 text-muted-foreground" />
                      <Label htmlFor="app-notifications">In-App</Label>
                    </div>
                    <Switch
                      id="app-notifications"
                      checked={true}
                      disabled={true} // Always enabled
                    />
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-3">
                <h3 className="font-medium">Notification Types</h3>
                <div className="grid gap-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="study-reminders" className="mb-1 block">Study Reminders</Label>
                      <p className="text-sm text-muted-foreground">Get reminded of your study schedule</p>
                    </div>
                    <Switch
                      id="study-reminders"
                      checked={settings.studyReminders}
                      onCheckedChange={() => handleNotificationToggle('studyReminders')}
                      disabled={!settings.notificationsEnabled}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="result-notifications" className="mb-1 block">Exam Results</Label>
                      <p className="text-sm text-muted-foreground">Get notified when your results are available</p>
                    </div>
                    <Switch
                      id="result-notifications"
                      checked={settings.resultNotifications}
                      onCheckedChange={() => handleNotificationToggle('resultNotifications')}
                      disabled={!settings.notificationsEnabled}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="content-notifications" className="mb-1 block">New Content</Label>
                      <p className="text-sm text-muted-foreground">Get notified when new study materials are added</p>
                    </div>
                    <Switch
                      id="content-notifications"
                      checked={settings.newContentNotifications}
                      onCheckedChange={() => handleNotificationToggle('newContentNotifications')}
                      disabled={!settings.notificationsEnabled}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="features-notifications" className="mb-1 block">New Features</Label>
                      <p className="text-sm text-muted-foreground">Get notified about platform updates</p>
                    </div>
                    <Switch
                      id="features-notifications"
                      checked={settings.newFeaturesNotifications}
                      onCheckedChange={() => handleNotificationToggle('newFeaturesNotifications')}
                      disabled={!settings.notificationsEnabled}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="privacy" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShieldAlert className="h-5 w-5" />
                <span>Privacy Settings</span>
              </CardTitle>
              <CardDescription>
                Control who can see your information and how your data is used
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-medium mb-4">Profile Visibility</h3>
                
                <RadioGroup defaultValue={settings.profileVisibility} className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="public" id="profile-public" />
                    <Label htmlFor="profile-public" className="font-normal">
                      Public <span className="text-sm text-muted-foreground">- Visible to all users</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="peers" id="profile-peers" />
                    <Label htmlFor="profile-peers" className="font-normal">
                      Peers Only <span className="text-sm text-muted-foreground">- Only visible to students in your group</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="private" id="profile-private" />
                    <Label htmlFor="profile-private" className="font-normal">
                      Private <span className="text-sm text-muted-foreground">- Only visible to you and administrators</span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              
              <Separator />
              
              <div className="space-y-3">
                <h3 className="font-medium">Visibility Options</h3>
                <div className="grid gap-4">
                  {privacyOptions.map(option => (
                    <div key={option.id} className="flex items-center justify-between">
                      <div>
                        <Label htmlFor={`privacy-${option.id}`} className="mb-1 block">{option.title}</Label>
                        <p className="text-sm text-muted-foreground">{option.description}</p>
                      </div>
                      <Switch
                        id={`privacy-${option.id}`}
                        checked={settings[option.id as keyof typeof settings] as boolean || false}
                        onCheckedChange={() => handlePrivacyToggle(option.id)}
                      />
                    </div>
                  ))}
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="font-medium mb-3">Data Usage</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="analytics-consent" className="mb-1 block">Analytics</Label>
                      <p className="text-sm text-muted-foreground">Allow anonymous usage data collection to improve our services</p>
                    </div>
                    <Switch id="analytics-consent" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="personalization-consent" className="mb-1 block">Personalization</Label>
                      <p className="text-sm text-muted-foreground">Allow your learning patterns to personalize recommendations</p>
                    </div>
                    <Switch id="personalization-consent" defaultChecked />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="accessibility" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                <span>Accessibility Settings</span>
              </CardTitle>
              <CardDescription>
                Customize the interface to meet your needs
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-medium mb-2">Theme</h3>
                <RadioGroup defaultValue={settings.theme} className="grid grid-cols-3 gap-4" onValueChange={handleThemeChange}>
                  <div className="flex flex-col items-center gap-2">
                    <div className="border-2 rounded-md p-2 w-20 h-20 cursor-pointer hover:border-primary flex flex-col justify-between bg-white">
                      <div className="w-full h-3 bg-gray-200 rounded"></div>
                      <div className="w-full h-8 bg-gray-100 rounded"></div>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="light" id="theme-light" />
                      <Label htmlFor="theme-light">Light</Label>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-center gap-2">
                    <div className="border-2 rounded-md p-2 w-20 h-20 cursor-pointer hover:border-primary flex flex-col justify-between bg-gray-900">
                      <div className="w-full h-3 bg-gray-600 rounded"></div>
                      <div className="w-full h-8 bg-gray-700 rounded"></div>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="dark" id="theme-dark" />
                      <Label htmlFor="theme-dark">Dark</Label>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-center gap-2">
                    <div className="border-2 rounded-md p-2 w-20 h-20 cursor-pointer hover:border-primary flex flex-col justify-between bg-gradient-to-br from-white to-gray-900">
                      <div className="w-full h-3 bg-gradient-to-r from-gray-200 to-gray-600 rounded"></div>
                      <div className="w-full h-8 bg-gradient-to-r from-gray-100 to-gray-700 rounded"></div>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="system" id="theme-system" />
                      <Label htmlFor="theme-system">System</Label>
                    </div>
                  </div>
                </RadioGroup>
              </div>
              
              <Separator />
              
              <div>
                <div className="flex items-center justify-between mb-4">
                  <Label htmlFor="font-scale">Font Size</Label>
                  <span className="text-sm text-muted-foreground">
                    {settings.fontScale[0]}x
                  </span>
                </div>
                <Slider
                  id="font-scale"
                  min={0.8}
                  max={1.5}
                  step={0.1}
                  value={settings.fontScale}
                  onValueChange={handleFontScaleChange}
                  className="mb-6"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="high-contrast">High Contrast Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    Increase contrast for better visibility
                  </p>
                </div>
                <Switch
                  id="high-contrast"
                  checked={settings.highContrastMode}
                  onCheckedChange={() => handleNotificationToggle('highContrastMode')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="autoplay">Autoplay Videos</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically play videos when loaded
                  </p>
                </div>
                <Switch
                  id="autoplay"
                  checked={settings.autoplayVideos}
                  onCheckedChange={() => handleNotificationToggle('autoplayVideos')}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="help" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                <span>Help & Support</span>
              </CardTitle>
              <CardDescription>
                Get help or provide feedback about Sakha AI
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button className="flex items-center justify-start gap-2" variant="outline">
                  <MessageSquare className="h-5 w-5" />
                  Contact Support
                </Button>
                
                <Button className="flex items-center justify-start gap-2" variant="outline">
                  <Download className="h-5 w-5" />
                  Download User Guide
                </Button>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="font-medium mb-4">Send Feedback</h3>
                <form onSubmit={handleSubmitFeedback} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="feedback-category">Category</Label>
                    <Select defaultValue="suggestion">
                      <SelectTrigger id="feedback-category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="suggestion">Suggestion</SelectItem>
                        <SelectItem value="bug">Bug Report</SelectItem>
                        <SelectItem value="content">Content Issue</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="feedback-message">Message</Label>
                    <Input id="feedback-message" placeholder="Your feedback..." />
                  </div>
                  <Button type="submit">Submit Feedback</Button>
                </form>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="flex justify-end gap-4">
        <Button variant="ghost" onClick={() => window.history.back()}>
          Cancel
        </Button>
        <Button onClick={handleSaveSettings} disabled={isSaving}>
          {isSaving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <CheckCircle className="mr-2 h-4 w-4" />
              Save Settings
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default SettingsPage;
