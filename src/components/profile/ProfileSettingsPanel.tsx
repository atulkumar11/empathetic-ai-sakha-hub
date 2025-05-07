
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { UserProfileType } from "@/types/user/base";
import { 
  Bell, 
  Key, 
  Lock, 
  Settings, 
  Smartphone, 
  Shield, 
  Download, 
  Trash2 
} from "lucide-react";
import { 
  Switch
} from "@/components/ui/switch";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface ProfileSettingsPanelProps {
  userProfile: UserProfileType;
  onUpdateProfile: (updates: Partial<UserProfileType>) => void;
}

export function ProfileSettingsPanel({
  userProfile,
  onUpdateProfile
}: ProfileSettingsPanelProps) {
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = React.useState(false);

  // Handle notification preferences
  const handleToggleNotification = (key: string, value: boolean) => {
    if (userProfile.preferences) {
      onUpdateProfile({
        preferences: {
          ...userProfile.preferences,
          [key]: value
        }
      });
    } else {
      onUpdateProfile({
        preferences: {
          [key]: value
        }
      });
    }
  };

  // Handle password change
  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we would verify the current password and update with the new one
    setIsPasswordDialogOpen(false);
  };

  // Handle account deletion
  const handleDeleteAccount = () => {
    console.log("Account deletion requested");
    // In a real app, this would send a request to delete the account
  };

  // Handle data export
  const handleExportData = () => {
    console.log("Data export requested");
    // In a real app, this would generate and download the user's data
  };

  const isDarkMode = userProfile.preferences?.darkMode || false;
  const emailNotifications = userProfile.preferences?.emailNotifications || true;
  const studyReminders = userProfile.preferences?.studyReminders || true;

  return (
    <div className="space-y-6">
      {/* Security */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center">
            <Lock className="mr-2 h-5 w-5 text-muted-foreground" />
            <CardTitle>Security</CardTitle>
          </div>
          <CardDescription>
            Manage your password and security settings
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-2 space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="font-medium">Password</div>
              <div className="text-sm text-muted-foreground">
                Change your password regularly to keep your account secure
              </div>
            </div>
            <Dialog open={isPasswordDialogOpen} onOpenChange={setIsPasswordDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">Change Password</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Change Password</DialogTitle>
                  <DialogDescription>
                    Enter your current password and a new password.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleChangePassword} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                  <DialogFooter>
                    <Button type="submit">Update Password</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="font-medium">Two-Factor Authentication</div>
              <div className="text-sm text-muted-foreground">
                Add an extra layer of security to your account
              </div>
            </div>
            <Button variant="outline">
              <Smartphone className="mr-2 h-4 w-4" /> Setup 2FA
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center">
            <Bell className="mr-2 h-5 w-5 text-muted-foreground" />
            <CardTitle>Notifications</CardTitle>
          </div>
          <CardDescription>
            Manage how you receive notifications and alerts
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-2">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="font-medium">Email Notifications</div>
                <div className="text-sm text-muted-foreground">
                  Receive important updates via email
                </div>
              </div>
              <Switch 
                checked={emailNotifications} 
                onCheckedChange={(checked) => handleToggleNotification('emailNotifications', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="font-medium">Study Reminders</div>
                <div className="text-sm text-muted-foreground">
                  Get notifications for daily study plans
                </div>
              </div>
              <Switch 
                checked={studyReminders} 
                onCheckedChange={(checked) => handleToggleNotification('studyReminders', checked)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Appearance */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center">
            <Settings className="mr-2 h-5 w-5 text-muted-foreground" />
            <CardTitle>Appearance</CardTitle>
          </div>
          <CardDescription>
            Customize your app experience
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-2">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="font-medium">Dark Mode</div>
              <div className="text-sm text-muted-foreground">
                Use dark theme for better night time viewing
              </div>
            </div>
            <Switch 
              checked={isDarkMode} 
              onCheckedChange={(checked) => handleToggleNotification('darkMode', checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Advanced Settings */}
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="advanced-settings">
          <AccordionTrigger className="text-lg font-semibold">
            Advanced Settings
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pt-2">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center">
                  <Shield className="mr-2 h-5 w-5 text-muted-foreground" />
                  <CardTitle className="text-base">Privacy</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 pb-2">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Data Export</div>
                    <div className="text-sm text-muted-foreground">
                      Download all your data in machine-readable format
                    </div>
                  </div>
                  <Button variant="outline" onClick={handleExportData}>
                    <Download className="mr-2 h-4 w-4" /> Export
                  </Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Delete Account</div>
                    <div className="text-sm text-muted-foreground">
                      Permanently delete your account and all associated data
                    </div>
                  </div>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                        <Trash2 className="mr-2 h-4 w-4" /> Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete your
                          account and remove all your data from our servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction 
                          onClick={handleDeleteAccount}
                          className="bg-red-600 hover:bg-red-700 text-white"
                        >
                          Delete Account
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardContent>
            </Card>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
