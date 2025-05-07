
import React, { useState, useEffect } from "react";
import { useStudentDashboard } from "@/hooks/useStudentDashboard";
import OnboardingFlow from "@/components/dashboard/student/OnboardingFlow";
import DashboardLoading from "@/pages/dashboard/student/DashboardLoading";
import DashboardLayout from "@/pages/dashboard/student/DashboardLayout";
import SplashScreen from "@/components/dashboard/student/SplashScreen";
import { useLocation } from "react-router-dom";
import RedesignedDashboardOverview from "@/components/dashboard/student/RedesignedDashboardOverview";
import { MoodType } from "@/types/user/base";
import WelcomeTour from "@/components/dashboard/student/WelcomeTour";

const StudentDashboard = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [currentMood, setCurrentMood] = useState<MoodType | undefined>(undefined);
  const [showTourModal, setShowTourModal] = useState(false);
  const location = useLocation();
  
  const {
    loading,
    userProfile,
    activeTab,
    showWelcomeTour,
    showOnboarding,
    currentTime,
    showStudyPlan,
    hideTabsNav,
    hideSidebar,
    kpis,
    nudges,
    features,
    lastActivity,
    suggestedNextAction,
    markNudgeAsRead,
    handleTabChange,
    handleSkipTour,
    handleCompleteTour,
    handleCompleteOnboarding,
    handleViewStudyPlan,
    handleCloseStudyPlan,
    toggleSidebar,
    toggleTabsNav
  } = useStudentDashboard();

  // Check URL parameters for onboarding status and show tour immediately
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const isNewUser = params.get('new') === 'true';
    const completedOnboarding = params.get('completedOnboarding') === 'true';
    
    console.log("URL params:", { isNewUser, completedOnboarding });
    
    // Don't show splash screen for new users coming from signup flow
    if (isNewUser) {
      setShowSplash(false);
      // Always show tour for new users, immediately
      setShowTourModal(true);
    } else {
      // Check if the user has seen the splash screen in this session
      const hasSeen = sessionStorage.getItem("hasSeenSplash");
      setShowSplash(!hasSeen);
      
      // For returning users who haven't seen the tour
      const hasSeenTour = localStorage.getItem("userData") ? 
        JSON.parse(localStorage.getItem("userData") || '{}').sawWelcomeTour : false;
      
      if (!hasSeenTour) {
        // Short timeout just to let the dashboard render first
        setTimeout(() => setShowTourModal(true), 500);
      }
    }
    
    // Try to get saved mood from local storage
    const savedUserData = localStorage.getItem("userData");
    if (savedUserData) {
      const parsedData = JSON.parse(savedUserData);
      if (parsedData.mood) {
        setCurrentMood(parsedData.mood);
      }
    }
  }, [location]);
  
  const handleSplashComplete = () => {
    setShowSplash(false);
    // Mark that the user has seen the splash screen in this session
    sessionStorage.setItem("hasSeenSplash", "true");
    
    // Save a default optimistic mood if none is set
    if (!currentMood) {
      setCurrentMood(MoodType.Motivated);
      const userData = localStorage.getItem("userData");
      if (userData) {
        const parsedData = JSON.parse(userData);
        parsedData.mood = MoodType.Motivated;
        localStorage.setItem("userData", JSON.stringify(parsedData));
      }
    }
  };

  const handleSkipTourWrapper = () => {
    handleSkipTour();
    setShowTourModal(false);
  };

  const handleCompleteTourWrapper = () => {
    handleCompleteTour();
    setShowTourModal(false);
  };

  // Show splash screen if needed
  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} mood={currentMood} />;
  }

  if (loading || !userProfile) {
    return <DashboardLoading />;
  }

  // Show onboarding flow only for users who haven't completed it
  if (showOnboarding) {
    // Make sure we have a goal to work with
    const defaultGoal = "IIT-JEE";
    const goalTitle = userProfile?.goals?.[0]?.title || defaultGoal;
    
    return (
      <OnboardingFlow 
        userProfile={userProfile} 
        goalTitle={goalTitle}
        onComplete={handleCompleteOnboarding}
      />
    );
  }

  // Custom content based on active tab
  const getTabContent = () => {
    if (activeTab === "overview") {
      return <RedesignedDashboardOverview userProfile={userProfile} kpis={kpis} />;
    }
    
    // For other tabs, use the default tab content
    return null;
  };

  return (
    <>
      <DashboardLayout
        userProfile={userProfile}
        hideSidebar={hideSidebar}
        hideTabsNav={hideTabsNav}
        activeTab={activeTab}
        kpis={kpis}
        nudges={nudges}
        markNudgeAsRead={markNudgeAsRead}
        showWelcomeTour={false} // We're controlling this with our own state now
        onTabChange={handleTabChange}
        onViewStudyPlan={handleViewStudyPlan}
        onToggleSidebar={toggleSidebar}
        onToggleTabsNav={toggleTabsNav}
        onSkipTour={handleSkipTourWrapper}
        onCompleteTour={handleCompleteTourWrapper}
        showStudyPlan={showStudyPlan}
        onCloseStudyPlan={handleCloseStudyPlan}
        lastActivity={lastActivity}
        suggestedNextAction={suggestedNextAction}
        currentMood={currentMood}
      >
        {getTabContent()}
      </DashboardLayout>
      
      {/* Welcome Tour Modal - will show immediately for new users */}
      <WelcomeTour
        open={showTourModal}
        onOpenChange={setShowTourModal}
        onSkipTour={handleSkipTourWrapper}
        onCompleteTour={handleCompleteTourWrapper}
        isFirstTimeUser={true}
        lastActivity={lastActivity}
        suggestedNextAction={suggestedNextAction}
      />
    </>
  );
};

export default StudentDashboard;
