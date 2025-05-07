
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useUserProfile } from "@/hooks/useUserProfile";
import { UserRole } from "@/types/user/base";
import Header from '@/components/layout/Header';

const ProfilePage = () => {
  const { userProfile, loading, updateUserProfile } = useUserProfile(UserRole.Student);
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");

  const handleUploadImage = (file: File) => {
    try {
      // In a real app, we would upload the file to a server
      // For now, we'll use a local URL and update the user profile
      const imageUrl = URL.createObjectURL(file);
      
      if (userProfile) {
        updateUserProfile({
          ...userProfile,
          avatar: imageUrl
        });
      }
      
      toast({
        title: "Success",
        description: "Your profile image has been updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile image. Please try again.",
        variant: "destructive",
      });
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">My Profile</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Profile Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center">
                    <div className="w-32 h-32 rounded-full bg-primary/20 flex items-center justify-center text-primary text-4xl font-medium mb-4">
                      {userProfile?.name ? userProfile.name.charAt(0) : "U"}
                    </div>
                    
                    <h3 className="text-xl font-bold">{userProfile?.name || "Student"}</h3>
                    <p className="text-gray-500 mb-2">{userProfile?.email || "student@example.com"}</p>
                    
                    <div className="flex gap-2 mb-4">
                      <Badge variant="outline">{userProfile?.examPreparation || "JEE Advanced"}</Badge>
                    </div>
                    
                    <Button size="sm" className="w-full">
                      Change Profile Picture
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="lg:col-span-2">
              <Card>
                <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
                  <div className="px-6 pt-6">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="overview">Overview</TabsTrigger>
                      <TabsTrigger value="settings">Settings</TabsTrigger>
                      <TabsTrigger value="subscription">Subscription</TabsTrigger>
                    </TabsList>
                  </div>
                  
                  <TabsContent value="overview" className="p-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Personal Information</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-gray-500">Full Name</label>
                          <p>{userProfile?.name || "Student"}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">Email Address</label>
                          <p>{userProfile?.email || "student@example.com"}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">Exam Preparation</label>
                          <p>{userProfile?.examPreparation || "JEE Advanced"}</p>
                        </div>
                      </div>
                      
                      <hr className="my-4" />
                      
                      <h3 className="text-lg font-medium">Study Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-gray-500">Subjects</label>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {userProfile?.subjects?.map((subject, index) => (
                              <Badge key={index} variant="secondary">{subject}</Badge>
                            )) || (
                              <>
                                <Badge variant="secondary">Physics</Badge>
                                <Badge variant="secondary">Chemistry</Badge>
                                <Badge variant="secondary">Mathematics</Badge>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="settings" className="p-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Account Settings</h3>
                      <p className="text-muted-foreground">
                        Manage your account preferences and settings
                      </p>
                      {/* Settings content would go here */}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="subscription" className="p-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Subscription Details</h3>
                      <div className="rounded-lg bg-blue-50 dark:bg-blue-900/20 p-4 border border-blue-100 dark:border-blue-800">
                        <p className="font-medium text-blue-800 dark:text-blue-300">
                          You are currently on the Free plan
                        </p>
                        <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">
                          Upgrade to unlock premium features and get unlimited access
                        </p>
                      </div>
                      
                      <Button className="w-full">Upgrade to Premium</Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
