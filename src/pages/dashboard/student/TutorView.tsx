
import React, { useState, useEffect } from 'react';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import AIChatTutor from '@/pages/dashboard/student/AIChatTutor';
import { UserProfileType } from '@/types/user/base';

// Mock user profile for demonstration
const mockUserProfile: UserProfileType = {
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

const TutorView = () => {
  const [userProfile, setUserProfile] = useState<UserProfileType>(mockUserProfile);

  // In a real app, you would fetch the user profile from an API or context
  useEffect(() => {
    // Simulate fetching user data
    const userData = localStorage.getItem("userData");
    if (userData) {
      try {
        const parsedData = JSON.parse(userData);
        if (parsedData) {
          setUserProfile({
            ...mockUserProfile,
            ...parsedData,
            name: parsedData.name || mockUserProfile.name,
            examPreparation: parsedData.examPreparation || mockUserProfile.examPreparation
          });
        }
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

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
      
      <AIChatTutor userProfile={userProfile} />
    </SharedPageLayout>
  );
};

export default TutorView;
