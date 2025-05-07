
import React from 'react';
import { Helmet } from 'react-helmet';
import { Button } from "@/components/ui/button";
import { useTodaysPlan } from "@/hooks/useTodaysPlan";
import LoadingState from "@/components/common/LoadingState";
import ErrorState from "@/components/common/ErrorState";
import PlanHeader from './PlanHeader';
import NewTodaysPlanView from './NewTodaysPlanView';
import { useUserProfile } from '@/hooks/useUserProfile';
import { UserRole } from '@/types/user/base';

const RedesignedTodaysPlan: React.FC = () => {
  const { userProfile } = useUserProfile(UserRole.Student);
  const goalTitle = userProfile?.goals?.[0]?.title || "IIT-JEE";
  
  // Get today's plan data
  const {
    loading,
    error,
    planData,
    activeView,
    setActiveView,
    refreshData,
    markTaskCompleted,
    addBookmark,
    addNote
  } = useTodaysPlan(goalTitle, userProfile?.name || "Student");
  
  if (loading) {
    return <LoadingState message="Loading your study plan..." />;
  }
  
  if (error) {
    return (
      <ErrorState 
        title="Could not load study plan" 
        message={error} 
        action={
          <Button onClick={refreshData}>
            Try Again
          </Button>
        }
      />
    );
  }

  return (
    <>
      <Helmet>
        <title>Today's Plan - PREPZR</title>
      </Helmet>
      
      <div className="space-y-8">
        <PlanHeader 
          planData={planData} 
          activeView={activeView}
          setActiveView={setActiveView}
        />
        
        <NewTodaysPlanView 
          planData={planData}
        />
      </div>
    </>
  );
};

export default RedesignedTodaysPlan;
