
import React from 'react';
import StudyPlanSection from '@/components/dashboard/student/academic/StudyPlanSection';
import type { StudyPlan } from '@/types/user/studyPlan';

interface StudyPlanSectionsProps {
  activePlans: StudyPlan[];
  completedPlans: StudyPlan[];
  onCreatePlan: () => void;
  onViewPlanDetails: (planId: string) => void;
}

const StudyPlanSections: React.FC<StudyPlanSectionsProps> = ({
  activePlans,
  completedPlans,
  onCreatePlan,
  onViewPlanDetails,
}) => {
  return (
    <>
      {/* Active Plans Section */}
      <StudyPlanSection
        title="Active Study Plans"
        description="Your current study plans and ongoing progress"
        plans={activePlans}
        onCreatePlan={onCreatePlan}
        onViewPlanDetails={onViewPlanDetails}
      />

      {/* Completed Plans Section */}
      <StudyPlanSection
        title="Completed & Past Plans"
        description="History of your completed and expired study plans"
        plans={completedPlans}
        onCreatePlan={onCreatePlan}
        onViewPlanDetails={onViewPlanDetails}
      />
    </>
  );
};

export default StudyPlanSections;
