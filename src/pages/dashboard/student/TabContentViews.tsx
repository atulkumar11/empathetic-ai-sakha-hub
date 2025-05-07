
import React from 'react';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { HistoryAndBacklog } from '@/components/dashboard/student/todays-plan/HistoryAndBacklog';
import { Card } from "@/components/ui/card";
import RedesignedTodaysPlan from '@/components/dashboard/student/todays-plan/RedesignedTodaysPlan';
import { useStudentDashboardData } from '@/hooks/useStudentDashboardData';

export function TodayPlanView() {
  const { dashboardData } = useStudentDashboardData();
  
  return (
    <SharedPageLayout 
      title="Today's Study Plan"
      subtitle="Your personalized daily learning path"
    >
      <RedesignedTodaysPlan userProfile={dashboardData?.userProfile} />
    </SharedPageLayout>
  );
}

export function StudyPlanView() {
  return (
    <SharedPageLayout 
      title="Complete Study Plan"
      subtitle="Your comprehensive study calendar and exam preparation path"
    >
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Exam Goal Study Plan</h2>
        <div className="grid grid-cols-1 gap-4">
          <Card className="p-6">
            <p className="mb-4">This comprehensive study plan is specifically designed for your exam goal.</p>
            <p>It includes a full calendar view of your preparation schedule, topic breakdowns, and milestone tracking.</p>
          </Card>
        </div>
      </div>
    </SharedPageLayout>
  );
}

export function ConceptsView() {
  return (
    <SharedPageLayout 
      title="Concept Cards"
      subtitle="Master key concepts through interactive learning"
    >
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Your Concept Cards</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card className="p-6">
            <p>Your concept cards will appear here.</p>
          </Card>
        </div>
      </div>
    </SharedPageLayout>
  );
}

export function FlashcardsView() {
  return (
    <SharedPageLayout 
      title="Flashcards"
      subtitle="Review and reinforce your knowledge"
    >
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Your Flashcards</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-6">
            <p>Your flashcards will appear here.</p>
          </Card>
        </div>
      </div>
    </SharedPageLayout>
  );
}

export function PracticeExamsView() {
  return (
    <SharedPageLayout 
      title="Practice Exams"
      subtitle="Test your knowledge and track progress"
    >
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Practice Exams</h2>
        <div className="grid grid-cols-1 gap-4">
          <Card className="p-6">
            <p>Your practice exams will appear here.</p>
          </Card>
        </div>
      </div>
    </SharedPageLayout>
  );
}

export function NotificationsView() {
  return (
    <SharedPageLayout 
      title="Notifications"
      subtitle="Stay updated with your learning journey"
    >
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Your Notifications</h2>
        <div className="grid grid-cols-1 gap-4">
          <Card className="p-6">
            <p>Your notifications will appear here.</p>
          </Card>
        </div>
      </div>
    </SharedPageLayout>
  );
}
