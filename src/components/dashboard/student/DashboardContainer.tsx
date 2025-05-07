
import React from 'react';
import { UserProfileBase } from "@/types/user/base";
import { KpiData, NudgeData } from "@/hooks/useKpiTracking";
import ChatAssistant from "@/components/dashboard/ChatAssistant";
import SidebarNav from "@/components/dashboard/SidebarNav";
import StudyPlanDialog from "@/pages/dashboard/student/StudyPlanDialog";
import DashboardWrapper from '@/components/dashboard/student/DashboardWrapper';

interface DashboardContainerProps {
  userProfile: UserProfileBase;
  hideSidebar: boolean;
  hideTabsNav: boolean;
  activeTab: string;
  kpis: KpiData[];
  nudges: NudgeData[];
  markNudgeAsRead: (id: string) => void;
  features: any[];
  showWelcomeTour: boolean;
  currentTime: Date;
  showStudyPlan: boolean;
  onTabChange: (tab: string) => void;
  onViewStudyPlan: () => void;
  onToggleSidebar: () => void;
  onToggleTabsNav: () => void;
  onSkipTour: () => void;
  onCompleteTour: () => void;
  onCloseStudyPlan: () => void;
  lastActivity?: { type: string; description: string } | null;
  suggestedNextAction?: string | null;
}

const DashboardContainer: React.FC<DashboardContainerProps> = ({
  userProfile,
  hideSidebar,
  hideTabsNav,
  activeTab,
  kpis,
  nudges,
  markNudgeAsRead,
  features,
  showWelcomeTour,
  currentTime,
  showStudyPlan,
  onTabChange,
  onViewStudyPlan,
  onToggleSidebar,
  onToggleTabsNav,
  onSkipTour,
  onCompleteTour,
  onCloseStudyPlan,
  lastActivity,
  suggestedNextAction
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100/10 via-white to-violet-100/10 dark:from-sky-900/10 dark:via-gray-900 dark:to-violet-900/10">
      {/* Main sidebar navigation */}
      <SidebarNav userType="student" userName={userProfile.name} />
      
      {/* Main dashboard content */}
      <DashboardWrapper 
        userProfile={userProfile}
        hideSidebar={hideSidebar}
        hideTabsNav={hideTabsNav}
        activeTab={activeTab}
        kpis={kpis}
        nudges={nudges}
        markNudgeAsRead={markNudgeAsRead}
        features={features}
        showWelcomeTour={showWelcomeTour}
        currentTime={currentTime}
        onTabChange={onTabChange}
        onViewStudyPlan={onViewStudyPlan}
        onToggleSidebar={onToggleSidebar}
        onToggleTabsNav={onToggleTabsNav}
        onSkipTour={onSkipTour}
        onCompleteTour={onCompleteTour}
        lastActivity={lastActivity}
        suggestedNextAction={suggestedNextAction}
      />
      
      {/* Chat assistant */}
      <ChatAssistant userType="student" />
      
      {/* Study Plan Dialog */}
      {showStudyPlan && (
        <StudyPlanDialog 
          userProfile={userProfile} 
          onClose={onCloseStudyPlan} 
        />
      )}
    </div>
  );
};

export default DashboardContainer;
