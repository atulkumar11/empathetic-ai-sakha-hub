
import React, { useState, useEffect } from 'react';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import AIChatTutor from '@/pages/dashboard/student/AIChatTutor';
import { UserProfileType } from '@/types/user/base';
import { useUserProfile } from '@/hooks/useUserProfile';
import { UserRole } from '@/types/user/base';

const TutorView = () => {
  const { userProfile, loading } = useUserProfile(UserRole.Student);
  const [loadedProfile, setLoadedProfile] = useState<UserProfileType | null>(null);

  // Fallback profile if needed
  const fallbackProfile: UserProfileType = {
    id: "user123",
    name: "Student",
    email: "student@example.com",
    examPreparation: "JEE Advanced",
    goals: [
      { id: "g1", title: "JEE Advanced", targetDate: "2023-04-15", progress: 65 }
    ],
    subjects: ["Physics", "Chemistry", "Mathematics"],
    recentActivity: {
      lastLogin: new Date(),
      lastStudySession: new Date(Date.now() - 86400000),
      completedTasks: 42
    }
  };

  // Use userProfile from hook or try to load from localStorage
  useEffect(() => {
    if (userProfile) {
      setLoadedProfile(userProfile);
    } else {
      // Try to load from localStorage as backup
      const userData = localStorage.getItem("userData");
      if (userData) {
        try {
          const parsedData = JSON.parse(userData);
          setLoadedProfile({
            ...fallbackProfile,
            ...parsedData,
            name: parsedData.name || fallbackProfile.name,
            examPreparation: parsedData.examGoal || fallbackProfile.examPreparation
          });
        } catch (error) {
          console.error("Error parsing user data:", error);
          setLoadedProfile(fallbackProfile);
        }
      } else {
        setLoadedProfile(fallbackProfile);
      }
    }
  }, [userProfile]);

  if (!loadedProfile && loading) {
    return (
      <SharedPageLayout 
        title="Loading..." 
        subtitle="Please wait while we load your data"
        backButtonUrl="/dashboard/student"
        showBackButton={true}
      >
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
        </div>
      </SharedPageLayout>
    );
  }

  return (
    <SharedPageLayout 
      title="24/7 AI Tutor" 
      subtitle="Get personalized learning assistance anytime you need it"
      backButtonUrl="/dashboard/student"
      showBackButton={true}
    >
      <div className="mb-6">
        <p className="text-muted-foreground">
          Our AI tutor is trained on your specific exam syllabus and can answer questions, explain concepts, 
          and help you solve problems across all subjects. Just select a subject, ask a question, and get 
          instant help with your studies.
        </p>
      </div>
      
      <AIChatTutor userProfile={loadedProfile || fallbackProfile} />
    </SharedPageLayout>
  );
};

export default TutorView;
