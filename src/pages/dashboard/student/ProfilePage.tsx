
import React, { useState } from "react";
import MainLayout from "@/components/layouts/MainLayout";
import { useUserProfile } from "@/hooks/useUserProfile";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { 
  User, Settings, CreditCard, Users, BookOpen, 
  Calendar, Bell, Shield, Edit, Mail, Phone, MapPin,
  Smile, School, CheckCircle, AlertCircle, Clock
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { UserRole } from "@/types/user/base";
import ProfileDetails from "./ProfileDetails";
import BatchManagementPanel from "@/components/profile/BatchManagementPanel";
import ProfileSubscriptionPanel from "@/components/profile/ProfileSubscriptionPanel";
import BatchCreationDialog from "@/components/profile/BatchCreationDialog";
import PaymentMethodsPanel from "@/components/profile/PaymentMethodsPanel";
import ProfileSettingsPanel from "@/components/profile/ProfileSettingsPanel";
import BillingHistoryPanel from "@/components/profile/BillingHistoryPanel";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { userProfile, loading, updateUserProfile } = useUserProfile();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  const [isBatchCreationOpen, setIsBatchCreationOpen] = useState(false);
  
  // Check if user is a batch leader or member
  const isBatchLeader = () => {
    if (!userProfile || !userProfile.subscription) return false;
    
    if (typeof userProfile.subscription === 'object') {
      return userProfile.subscription.features?.includes('batch_leader');
    }
    
    return false;
  };
  
  const isBatchMember = () => {
    if (!userProfile || !userProfile.subscription) return false;
    
    if (typeof userProfile.subscription === 'object') {
      return userProfile.subscription.features?.includes('batch_member') &&
             !userProfile.subscription.features?.includes('batch_leader');
    }
    
    return false;
  };
  
  const getCurrentSubscriptionType = () => {
    if (!userProfile || !userProfile.subscription) return 'free';
    
    if (typeof userProfile.subscription === 'object') {
      return userProfile.subscription.planType;
    }
    
    return userProfile.subscription;
  };
  
  const getSubscriptionStatus = () => {
    if (!userProfile || !userProfile.subscription) return 'inactive';
    
    if (typeof userProfile.subscription === 'object' && userProfile.subscription.isActive) {
      const expiryDate = userProfile.subscription.expiryDate;
      if (!expiryDate) return 'active';
      
      const now = new Date();
      const expiry = new Date(expiryDate);
      
      if (expiry < now) {
        return 'expired';
      }
      
      // If expiry is within 30 days, consider it "expiring soon"
      const thirtyDaysInMs = 30 * 24 * 60 * 60 * 1000;
      if (expiry.getTime() - now.getTime() < thirtyDaysInMs) {
        return 'expiring-soon';
      }
      
      return 'active';
    }
    
    return 'inactive';
  };
  
  const handleProfileImageUpload = (file: File) => {
    try {
      // In a real app, this would upload the file to a server
      const imageUrl = URL.createObjectURL(file);
      
      if (userProfile) {
        updateUserProfile({
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
  
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleProfileImageUpload(file);
    }
  };
  
  // Determine subscription plan tier badge styling
  const getSubscriptionBadgeStyle = () => {
    const subType = getCurrentSubscriptionType();
    
    switch (subType) {
      case 'premium':
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300";
      case 'pro_monthly':
      case 'pro_annual':
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
      case 'group_small':
      case 'group_medium':
      case 'group_large':
        return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300";
      case 'trial':
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }
  };
  
  const getSubscriptionStatusBadge = () => {
    const status = getSubscriptionStatus();
    
    switch (status) {
      case 'active':
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 ml-2">
            <CheckCircle className="h-3 w-3 mr-1" /> Active
          </Badge>
        );
      case 'expired':
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400 ml-2">
            <AlertCircle className="h-3 w-3 mr-1" /> Expired
          </Badge>
        );
      case 'expiring-soon':
        return (
          <Badge variant="outline" className="bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-400 ml-2">
            <Clock className="h-3 w-3 mr-1" /> Expiring Soon
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 ml-2">
            Inactive
          </Badge>
        );
    }
  };
  
  if (loading) {
    return (
      <MainLayout>
        <div className="container py-12">
          <div className="flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-gray-500 dark:text-gray-400">Loading profile...</p>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }
  
  return (
    <MainLayout>
      <div className="container py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">My Profile</h1>
          <p className="text-muted-foreground">
            Manage your profile, subscription, and learning preferences
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Sidebar */}
          <div className="lg:col-span-4 xl:col-span-3 space-y-6">
            {/* Profile Card */}
            <Card className="overflow-hidden">
              <div className="h-20 bg-gradient-to-r from-violet-500 to-purple-500"></div>
              <CardContent className="pt-0 relative">
                <div className="absolute -top-10 left-4 border-4 border-background rounded-full">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={userProfile?.avatar} alt={userProfile?.name || 'Profile'} />
                    <AvatarFallback className="text-2xl bg-primary/20">
                      {userProfile?.name?.charAt(0) || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  
                  {/* Edit button overlay with file input */}
                  <div className="absolute bottom-0 right-0 bg-primary rounded-full p-1.5 cursor-pointer">
                    <label htmlFor="avatar-upload" className="cursor-pointer">
                      <Edit className="h-3.5 w-3.5 text-white" />
                    </label>
                    <input 
                      id="avatar-upload" 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={handleFileUpload}
                    />
                  </div>
                </div>
                
                <div className="mt-12 space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-semibold">{userProfile?.name || 'Student'}</h3>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground mt-0.5">
                        <Mail className="h-3.5 w-3.5" />
                        <span>{userProfile?.email}</span>
                      </div>
                      {userProfile?.phone && (
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground mt-0.5">
                          <Phone className="h-3.5 w-3.5" />
                          <span>{userProfile.phone}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col items-end">
                      <Badge className={`capitalize ${getSubscriptionBadgeStyle()}`}>
                        {getCurrentSubscriptionType()}
                      </Badge>
                      {getSubscriptionStatusBadge()}
                    </div>
                  </div>
                  
                  <div className="pt-3 space-y-2.5">
                    {userProfile?.personalityType && (
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <Smile className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">Personality</span>
                        </div>
                        <span>{userProfile.personalityType}</span>
                      </div>
                    )}
                    
                    {userProfile?.location && (
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">Location</span>
                        </div>
                        <span>{userProfile.location}</span>
                      </div>
                    )}
                    
                    {userProfile?.goals && userProfile.goals.length > 0 && (
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <School className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">Exam Goal</span>
                        </div>
                        <span>{userProfile.goals[0].title}</span>
                      </div>
                    )}
                  </div>
                  
                  {userProfile?.goals && userProfile.goals.length > 0 && (
                    <div className="pt-2">
                      <div className="flex items-center justify-between mt-1 text-sm">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium">{userProfile.goals[0].progress}%</span>
                      </div>
                      <Progress value={userProfile.goals[0].progress} className="h-1.5 mt-1.5" />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            
            {/* Subscription Summary Card */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <CreditCard className="h-5 w-5 mr-2 text-primary" />
                  Subscription Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {userProfile?.subscription && typeof userProfile.subscription === 'object' ? (
                  <>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Plan Type</span>
                      <Badge variant="outline" className={getSubscriptionBadgeStyle()}>
                        {isBatchLeader() ? 'Batch Leader' : 
                         isBatchMember() ? 'Batch Member' : 
                         userProfile.subscription.planType || 'Free'}
                      </Badge>
                    </div>
                    
                    {userProfile.subscription.startDate && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Started On</span>
                        <span>{new Date(userProfile.subscription.startDate).toLocaleDateString()}</span>
                      </div>
                    )}
                    
                    {userProfile.subscription.expiryDate && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Valid Until</span>
                        <span>{new Date(userProfile.subscription.expiryDate).toLocaleDateString()}</span>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Status</span>
                      {getSubscriptionStatusBadge()}
                    </div>
                    
                    {getSubscriptionStatus() === 'expiring-soon' && (
                      <Button variant="default" size="sm" className="w-full mt-2">
                        Renew Subscription
                      </Button>
                    )}
                    
                    {getSubscriptionStatus() === 'expired' && (
                      <Button variant="default" size="sm" className="w-full mt-2">
                        Reactivate Plan
                      </Button>
                    )}
                    
                    {getSubscriptionStatus() === 'inactive' && (
                      <Button variant="default" size="sm" className="w-full mt-2">
                        Upgrade to Premium
                      </Button>
                    )}
                  </>
                ) : (
                  <>
                    <div className="py-3 text-center">
                      <p className="text-muted-foreground mb-3">You're currently on the free plan</p>
                      <Button variant="default" size="sm" onClick={() => setActiveTab("subscription")}>
                        Upgrade Now
                      </Button>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
            
            {/* Batch Management Quick Access */}
            {(isBatchLeader() || isBatchMember()) && (
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Users className="h-5 w-5 mr-2 text-primary" />
                    {isBatchLeader() ? 'Your Batch' : 'Your Study Group'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {isBatchLeader() ? (
                      <>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Member Count</span>
                          <Badge variant="outline">12/20</Badge>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full"
                          onClick={() => setActiveTab("batch")}
                        >
                          Manage Batch
                        </Button>
                      </>
                    ) : (
                      <>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Batch Name</span>
                          <span>JEE Champions 2025</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Leader</span>
                          <span>Rahul Sharma</span>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full"
                          onClick={() => setActiveTab("batch")}
                        >
                          View Details
                        </Button>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-8 xl:col-span-9">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <Card>
                <TabsList className="w-full border-b rounded-none grid grid-cols-5">
                  <TabsTrigger value="overview" className="flex items-center gap-1.5">
                    <User className="h-4 w-4" />
                    <span>Profile</span>
                  </TabsTrigger>
                  <TabsTrigger value="subscription" className="flex items-center gap-1.5">
                    <CreditCard className="h-4 w-4" />
                    <span>Subscription</span>
                  </TabsTrigger>
                  <TabsTrigger value="batch" className="flex items-center gap-1.5">
                    <Users className="h-4 w-4" />
                    <span>Batch</span>
                    {(isBatchLeader() || isBatchMember()) && (
                      <span className="ml-1.5 w-2 h-2 bg-blue-500 rounded-full"></span>
                    )}
                  </TabsTrigger>
                  <TabsTrigger value="billing" className="flex items-center gap-1.5">
                    <CreditCard className="h-4 w-4" />
                    <span>Billing</span>
                  </TabsTrigger>
                  <TabsTrigger value="settings" className="flex items-center gap-1.5">
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </TabsTrigger>
                </TabsList>
                
                {/* Profile Tab */}
                <TabsContent value="overview" className="p-6">
                  {userProfile && <ProfileDetails userProfile={userProfile} onUpdateProfile={updateUserProfile} />}
                </TabsContent>
                
                {/* Subscription Tab */}
                <TabsContent value="subscription" className="p-6">
                  <ProfileSubscriptionPanel 
                    currentSubscription={userProfile?.subscription} 
                    userRole={userProfile?.role || UserRole.Student}
                  />
                </TabsContent>
                
                {/* Batch Management Tab */}
                <TabsContent value="batch" className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold">
                      {isBatchLeader() ? 'Batch Management' : 'My Batch'}
                    </h2>
                    
                    {(!isBatchLeader() && !isBatchMember() && userProfile?.subscription && 
                      typeof userProfile.subscription === 'object' && 
                      (userProfile.subscription.planType === 'group_small' || 
                       userProfile.subscription.planType === 'group_medium' || 
                       userProfile.subscription.planType === 'group_large')) && (
                      <Button onClick={() => setIsBatchCreationOpen(true)}>
                        <Users className="h-4 w-4 mr-2" />
                        Create Batch
                      </Button>
                    )}
                  </div>
                  
                  {(isBatchLeader() || isBatchMember()) ? (
                    <BatchManagementPanel 
                      isLeader={isBatchLeader()} 
                      userProfile={userProfile!}
                    />
                  ) : (
                    <div className="text-center py-12">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 mb-4">
                        <Users size={28} />
                      </div>
                      <h2 className="text-xl font-bold mb-2">No Batch Membership</h2>
                      <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                        {userProfile?.subscription && 
                        typeof userProfile.subscription === 'object' && 
                        (userProfile.subscription.planType === 'group_small' || 
                         userProfile.subscription.planType === 'group_medium' || 
                         userProfile.subscription.planType === 'group_large')
                          ? "You have a group subscription! Create a batch to invite members and study together."
                          : "You're not part of any batch yet. Upgrade to a group plan to create a batch or use an invite code to join one."
                        }
                      </p>
                      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                        <Button 
                          variant="outline" 
                          onClick={() => setActiveTab("subscription")}
                        >
                          View Subscription Plans
                        </Button>
                        {userProfile?.subscription && 
                          typeof userProfile.subscription === 'object' && 
                          (userProfile.subscription.planType === 'group_small' || 
                           userProfile.subscription.planType === 'group_medium' || 
                           userProfile.subscription.planType === 'group_large') && (
                          <Button onClick={() => setIsBatchCreationOpen(true)}>
                            Create Your Batch
                          </Button>
                        )}
                      </div>
                    </div>
                  )}
                </TabsContent>
                
                {/* Billing Tab */}
                <TabsContent value="billing" className="p-6">
                  <div className="space-y-8">
                    <PaymentMethodsPanel />
                    <BillingHistoryPanel />
                  </div>
                </TabsContent>
                
                {/* Settings Tab */}
                <TabsContent value="settings" className="p-6">
                  <ProfileSettingsPanel userProfile={userProfile} />
                </TabsContent>
              </Card>
            </Tabs>
          </div>
        </div>
        
        {/* Batch Creation Dialog */}
        <BatchCreationDialog 
          open={isBatchCreationOpen} 
          onClose={() => setIsBatchCreationOpen(false)}
          maxMembers={20} // This would come from the user's subscription
        />
      </div>
    </MainLayout>
  );
};

export default ProfilePage;
