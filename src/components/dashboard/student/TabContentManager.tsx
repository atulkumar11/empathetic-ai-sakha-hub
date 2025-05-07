
import React from 'react';
import { UserProfileBase } from "@/types/user/base";
import { KpiData, NudgeData } from "@/hooks/useKpiTracking";
import { useNavigate } from 'react-router-dom';

import { TodayPlanView, StudyPlanView, ConceptsView, FlashcardsView, PracticeExamsView, NotificationsView } from '@/pages/dashboard/student/TabContentViews';
import ConceptsLandingPage from '@/components/dashboard/student/concepts/ConceptsLandingPage';
import FlashcardsLandingPage from '@/components/dashboard/student/flashcards/FlashcardsLandingPage';
import PracticeExamLandingPage from '@/components/dashboard/student/practice-exam/PracticeExamLandingPage';
import NotificationsPage from '@/components/dashboard/student/notifications/NotificationsPage';

interface RedesignedTodaysPlanProps {
  userProfile: UserProfileBase;
}

const RedesignedTodaysPlan: React.FC<RedesignedTodaysPlanProps> = ({ userProfile }) => {
  // Simplified component that renders the redesigned Today's Plan
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Today's Plan for {userProfile.name}</h2>
      <p>Your personalized study schedule is ready!</p>
    </div>
  );
};

interface TabContentGeneratorProps {
  userProfile: UserProfileBase;
  kpis: KpiData[];
  nudges: NudgeData[];
  markNudgeAsRead: (id: string) => void;
  features: any[];
  showWelcomeTour: boolean;
  handleSkipTour: () => void;
  handleCompleteTour: () => void;
  lastActivity?: { type: string; description: string } | null;
  suggestedNextAction?: string | null;
}

export const generateTabContents = ({
  userProfile,
  kpis,
  nudges,
  markNudgeAsRead,
  features,
  showWelcomeTour,
  handleSkipTour,
  handleCompleteTour,
  lastActivity,
  suggestedNextAction
}: TabContentGeneratorProps) => {
  const navigate = useNavigate();

  // Pre-generated tab contents that will be used in different parts of the app
  return {
    // Home/Overview tab
    "overview": (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Dashboard Overview</h2>
        <p>Welcome back, {userProfile.name}!</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {kpis.map(kpi => (
            <div key={kpi.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
              <h3 className="font-medium">{kpi.title}</h3>
              <p className="text-2xl">{kpi.value} {kpi.unit}</p>
            </div>
          ))}
        </div>
      </div>
    ),
    
    // Today's Plan tab
    "today": <RedesignedTodaysPlan userProfile={userProfile} />,
    
    // Study Plan tab
    "study-plan": <StudyPlanView />,
    
    // Academic Advisor tab
    "academic": (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Academic Advisor</h2>
        <p>Get personalized guidance for your academic journey.</p>
      </div>
    ),
    
    // Concept Cards tab
    "concepts": <ConceptsLandingPage />,
    
    // Flashcards tab
    "flashcards": <FlashcardsLandingPage />,
    
    // Practice Exams tab
    "practice-exam": <PracticeExamLandingPage />,
    
    // Notifications tab
    "notifications": <NotificationsPage />
  };
};
