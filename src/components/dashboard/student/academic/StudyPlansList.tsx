
import React from 'react';
import StudyPlanSection from './StudyPlanSection';
import type { StudyPlan } from '@/types/user/studyPlan';

interface StudyPlansListProps {
  activePlans: StudyPlan[];
  completedPlans: StudyPlan[];
  onCreatePlan: () => void;
  onViewPlanDetails: (planId: string) => void;
}

const StudyPlansList: React.FC<StudyPlansListProps> = ({
  activePlans,
  completedPlans,
  onCreatePlan,
  onViewPlanDetails
}) => {
  return (
    <div className="space-y-12">
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
    </div>
  );
};

export default StudyPlansList;
