
import React, { useState } from 'react';
import { UserProfileBase as UserProfileType } from "@/types/user/base";
import { KpiData, NudgeData } from "@/hooks/useKpiTracking";
import { generateTabContents } from "@/components/dashboard/student/TabContentManager";
import DashboardTabs from "@/components/dashboard/student/DashboardTabs";
import ReturnUserRecap from "@/components/dashboard/student/ReturnUserRecap";
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { QuickAccess } from '@/components/dashboard/student/QuickAccess';

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

  // Common layout structure for all tabs
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
      
      {/* Quick Access Buttons for all pages */}
      <QuickAccess />
      
      {/* Tabs navigation */}
      {!hideTabsNav && (
        <DashboardTabs 
          activeTab={activeTab} 
          onTabChange={onTabChange} 
          tabContents={{}}
        />
      )}
      
      {/* Content area - Using custom content if provided, otherwise the generated tab content */}
      <div className="mt-4">
        {children || tabContents[activeTab] || (
          <SharedPageLayout
            title="Coming Soon"
            subtitle="This feature is under development. Check back later."
          >
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                This feature is currently being developed and will be available soon.
              </p>
            </div>
          </SharedPageLayout>
        )}
      </div>
    </div>
  );
};

export default DashboardContent;
export type { DashboardTabsProps };
