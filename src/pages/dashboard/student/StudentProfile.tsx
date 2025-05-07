
import React from "react";
import { UserProfileType } from "@/types/user";
import ProfileDetails from "@/components/dashboard/student/profile/ProfileDetails";
import { useUserProfile } from "@/hooks/useUserProfile";
import { UserRole } from "@/types/user/base";
import { SharedPageLayout } from "@/components/dashboard/student/SharedPageLayout";
import LoadingScreen from "@/components/common/LoadingScreen";

interface StudentProfileProps {
  userProfile?: UserProfileType;
}

const StudentProfile: React.FC<StudentProfileProps> = ({ userProfile: propUserProfile }) => {
  const { userProfile: hookUserProfile, loading } = useUserProfile(UserRole.Student);
  
  // Use the provided userProfile if available, otherwise use the one from the hook
  const userProfile = propUserProfile || hookUserProfile;
  
  if (loading || !userProfile) {
    return <LoadingScreen />;
  }
  
  const handleUpdateProfile = (updates: Partial<UserProfileType>) => {
    // In a real app, this would send the updates to the server
    console.log("Profile updates:", updates);
  };

  return (
    <SharedPageLayout
      title="My Profile"
      subtitle="Manage your personal information and preferences"
      activeTab="profile"
      showBackButton={true}
      backButtonUrl="/dashboard/student"
    >
      <ProfileDetails
        userProfile={userProfile}
        onUpdateProfile={handleUpdateProfile}
      />
    </SharedPageLayout>
  );
};

export default StudentProfile;
