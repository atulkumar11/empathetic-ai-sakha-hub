
import React, { useState } from "react";
import { SharedPageLayout } from "@/components/dashboard/student/SharedPageLayout";
import { useUserProfile } from "@/hooks/useUserProfile";
import { UserRole } from "@/types/user/base";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { ProfileOverview } from "@/components/profile/ProfileOverview";
import { SubscriptionPanel } from "@/components/profile/SubscriptionPanel";
import { BatchManagementPanel } from "@/components/profile/BatchManagementPanel";
import { PaymentMethodsPanel } from "@/components/profile/PaymentMethodsPanel";
import { ProfileSettingsPanel } from "@/components/profile/ProfileSettingsPanel";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import LoadingScreen from "@/components/common/LoadingScreen";
import { CreateBatchDialog } from "@/components/profile/CreateBatchDialog";
import type { BatchCreationData } from "@/types/user/batch";

const EnhancedProfilePage = () => {
  const { userProfile, loading, updateUserProfile } = useUserProfile(UserRole.Student);
  const [activeTab, setActiveTab] = useState("overview");
  const [isBatchDialogOpen, setIsBatchDialogOpen] = useState(false);
  const { toast } = useToast();

  if (loading || !userProfile) {
    return <LoadingScreen />;
  }

  const handleCreateBatch = (batchData: BatchCreationData) => {
    // In a real app, this would send the batch creation request to the backend
    toast({
      title: "Batch Created",
      description: `Your batch "${batchData.batchName}" has been created successfully!`,
    });
    setIsBatchDialogOpen(false);
  };

  const handleUpdateProfile = (updates: Partial<typeof userProfile>) => {
    // In a real app, this would update the backend as well
    updateUserProfile(updates);
    toast({
      title: "Profile Updated",
      description: "Your profile information has been updated successfully",
    });
  };

  // Check if the user can create a batch
  const canCreateBatch = () => {
    if (!userProfile.subscription) return false;
    
    const { planType } = userProfile.subscription;
    return planType.includes('group') || planType.includes('batch') && !userProfile.batch;
  };

  // Check if the user is a batch leader
  const isBatchLeader = () => {
    return userProfile.isBatchLeader || false;
  };

  return (
    <SharedPageLayout
      title="My Profile"
      subtitle="Manage your personal information, subscription, and batch settings"
      showBackButton
      backButtonUrl="/dashboard/student"
    >
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <Card>
          <TabsList className="grid grid-cols-5 w-full">
            <TabsTrigger value="overview">Profile</TabsTrigger>
            <TabsTrigger value="subscription">Subscription</TabsTrigger>
            <TabsTrigger value="batch">
              {userProfile.batch ? "Manage Batch" : "Batch Management"}
            </TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <ProfileOverview 
              userProfile={userProfile}
              onUpdateProfile={handleUpdateProfile}
            />
          </TabsContent>

          <TabsContent value="subscription">
            <SubscriptionPanel
              subscription={userProfile.subscription}
            />
          </TabsContent>

          <TabsContent value="batch">
            <BatchManagementPanel
              userProfile={userProfile}
              onCreateBatch={() => setIsBatchDialogOpen(true)}
              canCreateBatch={canCreateBatch()}
              isBatchLeader={isBatchLeader()}
            />
          </TabsContent>

          <TabsContent value="billing">
            <PaymentMethodsPanel
              paymentMethods={userProfile.paymentMethods || []}
              billingHistory={userProfile.billingHistory || []}
            />
          </TabsContent>

          <TabsContent value="settings">
            <ProfileSettingsPanel
              userProfile={userProfile}
              onUpdateProfile={handleUpdateProfile}
            />
          </TabsContent>
        </Card>
      </Tabs>

      <CreateBatchDialog
        open={isBatchDialogOpen}
        onClose={() => setIsBatchDialogOpen(false)}
        onCreateBatch={handleCreateBatch}
        memberLimit={userProfile.subscription?.memberLimit || 5}
      />
    </SharedPageLayout>
  );
};

export default EnhancedProfilePage;
