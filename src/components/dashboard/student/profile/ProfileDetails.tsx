
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { UserProfileType } from "@/types/user";
import { CreditCard, User, Upload } from "lucide-react";
import BatchManagement from "./BatchManagement";
import SubscriptionDetails from "./SubscriptionDetails";
import ImageUpload from "@/components/profile/ImageUpload";
import InvitationCodeDisplay from "@/components/subscription/batch/InvitationCodeDisplay";
import BatchInvitationInput from "@/components/subscription/BatchInvitationInput";

interface ProfileDetailsProps {
  userProfile: UserProfileType;
  onUpdateProfile?: (updates: Partial<UserProfileType>) => void;
}

const ProfileDetails: React.FC<ProfileDetailsProps> = ({
  userProfile,
  onUpdateProfile
}) => {
  const [activeTab, setActiveTab] = useState("personal");
  const navigate = useNavigate();
  const { toast } = useToast();
  const [batchInviteCode, setBatchInviteCode] = useState<string | null>(null);

  const handleUpgradeSubscription = () => {
    navigate("/dashboard/student/subscription");
  };

  const handleUploadImage = (file: File) => {
    if (!onUpdateProfile) return;
    
    // Create URL for the uploaded file (in a real app this would upload to server/CDN)
    const imageUrl = URL.createObjectURL(file);
    
    onUpdateProfile({
      ...userProfile,
      avatar: imageUrl
    });
    
    toast({
      title: "Profile image updated",
      description: "Your profile picture has been updated successfully.",
    });
  };

  const handleCreateBatch = () => {
    // Generate random invitation code
    const inviteCode = `BATCH-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    setBatchInviteCode(inviteCode);
    
    toast({
      title: "Batch Created",
      description: "Your batch has been created successfully. Share the invitation code with others to join your batch.",
    });
  };

  const handleJoinBatch = async (code: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    if (code.startsWith('BATCH-') || code.startsWith('SAKHA-')) {
      return Promise.resolve();
    }
    
    return Promise.reject(new Error("Invalid batch code"));
  };

  const renderPersonalInfo = () => {
    const personalInfo = [
      { label: "Name", value: userProfile.name },
      { label: "Email", value: userProfile.email },
      { label: "Phone", value: userProfile.phoneNumber || "Not provided" },
      { label: "Exam Preparation", value: userProfile.examPreparation || "Not specified" },
      { label: "Location", value: userProfile.location || "Not specified" },
      { label: "Grade", value: userProfile.grade || "Not specified" },
    ];

    return (
      <div className="space-y-6">
        <div className="flex flex-col items-center md:flex-row md:items-start gap-6">
          <ImageUpload
            currentImage={userProfile.avatar}
            userName={userProfile.name}
            onImageUpload={handleUploadImage}
          />
          
          <div className="flex-1">
            <h2 className="text-xl font-semibold mb-1">{userProfile.name}</h2>
            <p className="text-muted-foreground">{userProfile.email}</p>
            <div className="mt-4">
              <Button variant="outline" size="sm">
                Edit Profile
              </Button>
            </div>
          </div>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>
              Your personal details and preferences
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {personalInfo.map((item, index) => (
                <div key={index} className="grid grid-cols-3 items-center">
                  <span className="text-sm font-medium">{item.label}</span>
                  <span className="col-span-2 text-sm">{item.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <BatchManagement 
          hasSubscription={userProfile.subscription?.type === "group" || userProfile.subscription?.planType === "group"} 
          onCreateBatch={handleCreateBatch}
        />

        {batchInviteCode && (
          <Card>
            <CardHeader>
              <CardTitle>Batch Created</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Share this invitation code with others to join your batch:</p>
              <InvitationCodeDisplay inviteCode={batchInviteCode} />
            </CardContent>
          </Card>
        )}
        
        <BatchInvitationInput onJoinBatch={handleJoinBatch} />
      </div>
    );
  };

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full space-y-6">
      <TabsList className="grid grid-cols-2 w-full max-w-md">
        <TabsTrigger value="personal" className="flex gap-2 items-center">
          <User className="h-4 w-4" />
          <span>Personal</span>
        </TabsTrigger>
        <TabsTrigger value="subscription" className="flex gap-2 items-center">
          <CreditCard className="h-4 w-4" />
          <span>Subscription</span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="personal" className="space-y-6">
        {renderPersonalInfo()}
      </TabsContent>

      <TabsContent value="subscription" className="space-y-6">
        <SubscriptionDetails 
          userProfile={userProfile}
          onUpgrade={handleUpgradeSubscription}
        />
      </TabsContent>
    </Tabs>
  );
};

export default ProfileDetails;
