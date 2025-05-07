
import React, { useState } from 'react';
import { UserProfileType } from "@/types/user";
import { KpiData, NudgeData } from "@/hooks/useKpiTracking";
import { generateTabContents } from "@/components/dashboard/student/TabContentManager";
import DashboardTabs from "@/components/dashboard/student/DashboardTabs";
import ReturnUserRecap from "@/components/dashboard/student/ReturnUserRecap";
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';

interface DashboardTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  tabContents?: Record<string, React.ReactNode>;
}

interface DashboardContentProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  userProfile: UserProfileType;
  kpis: KpiData[];
  nudges: NudgeData[];
  markNudgeAsRead: (id: string) => void;
  features: any[];
  showWelcomeTour: boolean;
  handleSkipTour: () => void;
  handleCompleteTour: () => void;
  hideTabsNav: boolean;
  lastActivity?: { type: string; description: string } | null;
  suggestedNextAction?: string | null;
  children?: React.ReactNode;
}

const DashboardContent = ({
  activeTab,
  onTabChange,
  userProfile,
  kpis,
  nudges,
  markNudgeAsRead,
  features,
  showWelcomeTour,
  handleSkipTour,
  handleCompleteTour,
  hideTabsNav,
  lastActivity,
  suggestedNextAction,
  children
}: DashboardContentProps) => {
  // State to track whether the returning user recap has been closed
  const [showReturnRecap, setShowReturnRecap] = useState(
    Boolean(userProfile.loginCount && userProfile.loginCount > 1 && lastActivity)
  );

  // Generate tab contents once
  const tabContents = generateTabContents({
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
  });
  
  // Handle closing the recap
  const handleCloseRecap = () => {
    setShowReturnRecap(false);
  };

  // Tab metadata for titles and subtitles
  const tabTitles = {
    "overview": "Dashboard Overview",
    "today": "Today's Plan",
    "academic": "Academic Advisor",
    "concepts": "Concept Cards",
    "flashcards": "Flashcards",
    "practice-exam": "Practice Exams",
    "notifications": "Notifications"
  };

  const tabSubtitles = {
    "overview": "Your personalized learning dashboard",
    "today": "Your personalized daily study schedule",
    "academic": "Get guidance for your academic journey",
    "concepts": "Master key concepts and fundamentals",
    "flashcards": "Review and memorize with smart flashcards",
    "practice-exam": "Test your knowledge and track progress",
    "notifications": "Stay updated with important alerts"
  };

  return (
    <div className="h-full flex flex-col">
      {/* Returning User Recap - Show for users with login count > 1 */}
      {showReturnRecap && !showWelcomeTour && (
        <ReturnUserRecap
          userName={userProfile.name}
          lastLoginDate={lastActivity?.description || "recently"}
          suggestedNextTasks={suggestedNextAction ? [suggestedNextAction] : undefined}
          onClose={handleCloseRecap}
          loginCount={userProfile.loginCount}
        />
      )}
      
      {/* Tabs navigation */}
      {!hideTabsNav && (
        <DashboardTabs 
          activeTab={activeTab} 
          onTabChange={onTabChange} 
          tabContents={{}}
        />
      )}
      
      {/* Content area */}
      <div className="mt-4">
        {children || (
          <SharedPageLayout
            title={tabTitles[activeTab as keyof typeof tabTitles] || "Coming Soon"}
            subtitle={tabSubtitles[activeTab as keyof typeof tabSubtitles] || "This feature is under development"}
          >
            {tabContents[activeTab] || (
              <div className="text-center py-8">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Coming Soon</h3>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  This feature is under development. Check back later.
                </p>
              </div>
            )}
          </SharedPageLayout>
        )}
      </div>
    </div>
  );
};

export default DashboardContent;
export type { DashboardTabsProps };
