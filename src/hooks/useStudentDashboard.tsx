// Mock implementation of useStudentDashboard hook
import { useState, useEffect } from "react";
import { UserProfileType, UserRole } from "@/types/user";
import { KpiData, NudgeData } from "@/hooks/useKpiTracking";

export const useStudentDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showWelcomeTour, setShowWelcomeTour] = useState(false);
  const [showStudyPlan, setShowStudyPlan] = useState(false);
  const [hideSidebar, setHideSidebar] = useState(false);
  const [hideTabsNav, setHideTabsNav] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  
  // Mock user profile
  const [userProfile, setUserProfile] = useState<UserProfileType | null>(null);
  
  // Other state
  const [kpis, setKpis] = useState<KpiData[]>([]);
  const [nudges, setNudges] = useState<NudgeData[]>([]);
  const [features, setFeatures] = useState<any[]>([]);
  const [lastActivity, setLastActivity] = useState<{ type: string; description: string } | null>(null);
  const [suggestedNextAction, setSuggestedNextAction] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  
  // Mock initialization
  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      // Set mock user profile
      setUserProfile({
        id: "1",
        name: "John Doe",
        email: "john@example.com",
        role: UserRole.Student,
        loginCount: 2
      });
      
      // Set mock KPIs
      setKpis([
        { id: "1", title: "Streak Days", value: 12, icon: "🔥", change: 2, changeType: "positive" },
        { id: "2", title: "Concepts Mastered", value: 48, icon: "📚", change: 5, changeType: "positive" },
        { id: "3", title: "Practice Tests", value: 24, icon: "✅", change: 3, changeType: "positive" },
        { id: "4", title: "Study Time", value: 28, unit: "hours", icon: "⏱️", change: 4, changeType: "positive" }
      ]);
      
      // Set mock nudges
      setNudges([
        { id: "1", title: "Complete Physics Quiz", description: "You have an incomplete quiz to finish", priority: "high", createdAt: new Date().toISOString() },
        { id: "2", title: "Review Flashcards", description: "10 flashcards due for review today", priority: "medium", createdAt: new Date().toISOString() }
      ]);
      
      // Set mock features
      setFeatures([
        { title: "Academic Advisor", description: "Get personalized guidance", path: "/dashboard/student/academic", isPremium: false },
        { title: "Today's Plan", description: "Your daily study schedule", path: "/dashboard/student/today", isPremium: false },
        { title: "Concept Cards", description: "Master key concepts", path: "/dashboard/student/concepts", isPremium: false },
        { title: "Practice Exams", description: "Test your knowledge", path: "/dashboard/student/practice-exam", isPremium: false }
      ]);
      
      // Set last activity
      setLastActivity({ type: "login", description: "yesterday" });
      
      // Set suggested next action
      setSuggestedNextAction("Complete the Physics quiz on Newton's Laws");
      
      // Set loading to false
      setLoading(false);
    }, 1000);
  }, []);
  
  // Update current time
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute
    
    return () => clearInterval(timer);
  }, []);
  
  // Handlers
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };
  
  const handleSkipTour = () => {
    setShowWelcomeTour(false);
  };
  
  const handleCompleteTour = () => {
    setShowWelcomeTour(false);
  };
  
  const handleCompleteOnboarding = () => {
    setShowOnboarding(false);
  };
  
  const handleViewStudyPlan = () => {
    setShowStudyPlan(true);
  };
  
  const handleCloseStudyPlan = () => {
    setShowStudyPlan(false);
  };
  
  const toggleSidebar = () => {
    setHideSidebar(!hideSidebar);
  };
  
  const toggleTabsNav = () => {
    setHideTabsNav(!hideTabsNav);
  };
  
  const markNudgeAsRead = (id: string) => {
    setNudges(nudges.filter(nudge => nudge.id !== id));
  };
  
  return {
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
  };
};
