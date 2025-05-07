
import React from 'react';
import { Button } from "@/components/ui/button";
import { UserProfileBase } from "@/types/user/base";
import { KpiData, NudgeData } from "@/hooks/useKpiTracking";
import DashboardHeader from "@/pages/dashboard/student/DashboardHeader";
import SidebarNavigation from "@/pages/dashboard/student/SidebarNavigation";
import MobileNavigation from "@/pages/dashboard/student/MobileNavigation";
import SidebarToggleButton from '@/components/dashboard/student/SidebarToggleButton';
import TopNavigationControls from '@/components/dashboard/student/TopNavigationControls';
import SurroundingInfluencesSection from '@/components/dashboard/student/SurroundingInfluencesSection';
import MainContent from '@/components/dashboard/student/MainContent';
import { useIsMobile } from "@/hooks/use-mobile";

interface DashboardWrapperProps {
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
  onTabChange: (tab: string) => void;
  onViewStudyPlan: () => void;
  onToggleSidebar: () => void;
  onToggleTabsNav: () => void;
  onSkipTour: () => void;
  onCompleteTour: () => void;
  lastActivity?: { type: string; description: string } | null;
  suggestedNextAction?: string | null;
}

const DashboardWrapper: React.FC<DashboardWrapperProps> = ({
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
  onTabChange,
  onViewStudyPlan,
  onToggleSidebar,
  onToggleTabsNav,
  onSkipTour,
  onCompleteTour,
  lastActivity,
  suggestedNextAction
}) => {
  const isMobile = useIsMobile();
  const formattedTime = formatTime(currentTime);
  const formattedDate = formatDate(currentTime);
  const [influenceMeterCollapsed, setInfluenceMeterCollapsed] = React.useState(true);

  return (
    <main className={`transition-all duration-300 ${hideSidebar ? 'md:ml-0' : 'md:ml-64'} p-4 sm:p-6 pb-20 md:pb-6`}>
      {/* Sidebar toggle button */}
      <SidebarToggleButton hideSidebar={hideSidebar} onToggle={onToggleSidebar} />
      
      {/* Top navigation controls */}
      <TopNavigationControls 
        hideSidebar={hideSidebar}
        onToggleSidebar={onToggleSidebar}
        formattedDate={formattedDate}
        formattedTime={formattedTime}
      />
      
      {/* Dashboard header */}
      <DashboardHeader 
        userProfile={userProfile}
        formattedTime={formattedTime}
        formattedDate={formattedDate}
        onViewStudyPlan={onViewStudyPlan}
      />

      {/* Surrounding Influences Meter */}
      <SurroundingInfluencesSection 
        influenceMeterCollapsed={influenceMeterCollapsed}
        setInfluenceMeterCollapsed={setInfluenceMeterCollapsed}
      />
      
      {/* Mobile Navigation */}
      {isMobile && (
        <MobileNavigation activeTab={activeTab} onTabChange={onTabChange} />
      )}
      
      {/* Main dashboard content area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
        {/* Left navigation sidebar (desktop) */}
        {!hideSidebar && !isMobile && (
          <SidebarNavigation 
            activeTab={activeTab} 
            onTabChange={onTabChange} 
          />
        )}
        
        {/* Main content area */}
        <MainContent 
          hideTabsNav={hideTabsNav}
          activeTab={activeTab}
          userProfile={userProfile}
          kpis={kpis}
          nudges={nudges}
          markNudgeAsRead={markNudgeAsRead}
          features={features}
          showWelcomeTour={showWelcomeTour}
          onTabChange={onTabChange}
          onToggleTabsNav={onToggleTabsNav}
          onSkipTour={onSkipTour}
          onCompleteTour={onCompleteTour}
          isMobile={isMobile}
          lastActivity={lastActivity}
          suggestedNextAction={suggestedNextAction}
        />
      </div>
    </main>
  );
};

export default DashboardWrapper;

// Import formatting utilities
import { formatTime, formatDate } from "@/pages/dashboard/student/utils/DateTimeFormatter";
