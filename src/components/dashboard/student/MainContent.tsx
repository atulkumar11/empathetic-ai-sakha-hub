
import React from 'react';
import { UserProfileBase } from '@/types/user/base';
import { KpiData, NudgeData } from '@/hooks/useKpiTracking';
import DashboardContent from "@/pages/dashboard/student/DashboardContent";

interface MainContentProps {
  hideTabsNav: boolean;
  activeTab: string;
  userProfile: UserProfileBase;
  kpis: KpiData[];
  nudges: NudgeData[];
  markNudgeAsRead: (id: string) => void;
  features: any[];
  showWelcomeTour: boolean;
  onTabChange: (tab: string) => void;
  onToggleTabsNav: () => void;
  onSkipTour: () => void;
  onCompleteTour: () => void;
  isMobile: boolean;
  lastActivity?: { type: string; description: string } | null;
  suggestedNextAction?: string | null;
}

const MainContent: React.FC<MainContentProps> = ({
  hideTabsNav,
  activeTab,
  userProfile,
  kpis,
  nudges,
  markNudgeAsRead,
  features,
  showWelcomeTour,
  onTabChange,
  onToggleTabsNav,
  onSkipTour,
  onCompleteTour,
  isMobile,
  lastActivity,
  suggestedNextAction
}) => {
  return (
    <div className="lg:col-span-9 xl:col-span-10">
      {/* Navigation toggle button for desktop */}
      {!isMobile && (
        <NavigationToggleButton 
          hideTabsNav={hideTabsNav}
          onToggleTabsNav={onToggleTabsNav}
        />
      )}
      
      {/* Main dashboard content */}
      <DashboardContent
        activeTab={activeTab}
        onTabChange={onTabChange}
        userProfile={userProfile}
        kpis={kpis}
        nudges={nudges}
        markNudgeAsRead={markNudgeAsRead}
        features={features}
        showWelcomeTour={showWelcomeTour}
        handleSkipTour={onSkipTour}
        handleCompleteTour={onCompleteTour}
        hideTabsNav={hideTabsNav || isMobile}
        lastActivity={lastActivity}
        suggestedNextAction={suggestedNextAction}
      />
    </div>
  );
};

export default MainContent;

// Import at the top to avoid circular dependency
import NavigationToggleButton from '@/components/dashboard/student/NavigationToggleButton';
