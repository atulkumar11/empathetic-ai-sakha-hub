
import React from 'react';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import AcademicAdvisor from '@/pages/dashboard/student/AcademicAdvisor';
import { useUserProfile } from '@/hooks/useUserProfile';
import { UserRole } from '@/types/user/base';

const AcademicAdvisorView = () => {
  const { userProfile, loading } = useUserProfile(UserRole.Student);

  return (
    <SharedPageLayout 
      title="Academic Advisor" 
      subtitle="Get guidance for your academic journey"
      backButtonUrl="/dashboard/student"
      showBackButton={true}
    >
      <div className="space-y-6">
        {loading || !userProfile ? (
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        ) : (
          <AcademicAdvisor userProfile={userProfile} />
        )}
      </div>
    </SharedPageLayout>
  );
};

export default AcademicAdvisorView;
