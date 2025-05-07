
import React from 'react';
import { useStudyProgress } from "@/hooks/useStudyProgress";
import { useUserProfile } from "@/hooks/useUserProfile";
import { StudyProgressHeader } from "@/components/dashboard/student/study-progress/StudyProgressHeader";
import { ProgressStatCards } from "@/components/dashboard/student/study-progress/ProgressStatCards";
import { WeeklyProgressChart } from "@/components/dashboard/student/study-progress/WeeklyProgressChart";
import { StudyStreakCard } from "@/components/dashboard/student/study-progress/StudyStreakCard";
import { PerformanceTabs } from "@/components/dashboard/student/study-progress/PerformanceTabs";
import { UserRole } from "@/types/user/base";

const StudyProgress = () => {
  const { subjects, studyStreak, loading, selectedSubject, selectSubject } = useStudyProgress();
  const { userProfile } = useUserProfile(UserRole.Student);
  
  // Check if userProfile isn't null before accessing examPreparation
  const examGoal = userProfile?.examPreparation || "General Study";
  
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sky-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <StudyProgressHeader studyStreak={studyStreak} />
      
      <ProgressStatCards 
        subjectsLength={subjects.length} 
        studyStreak={studyStreak} 
        examGoal={examGoal} 
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 my-8">
        <WeeklyProgressChart subjects={subjects} />
        <StudyStreakCard studyStreak={studyStreak} />
      </div>
      
      <PerformanceTabs
        subjects={subjects}
        selectedSubject={selectedSubject}
        selectSubject={selectSubject}
        studyStreak={studyStreak}
      />
    </div>
  );
};

export default StudyProgress;
