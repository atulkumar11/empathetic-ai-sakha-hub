
import React from 'react';
import { GraduationCap } from 'lucide-react';
import { CreateStudyPlanWizard } from '@/components/dashboard/student/academic/CreateStudyPlanWizard';
import StudyPlanDetail from '@/components/dashboard/student/academic/StudyPlanDetail';
import StudyPlanSections from '@/components/dashboard/student/academic/components/StudyPlanSections';
import { useAcademicPlans } from '@/components/dashboard/student/academic/hooks/useAcademicPlans';

interface AcademicAdvisorProps {
  userProfile: {
    examPreparation?: string;
  };
}

// Define proper types to match what the components expect
interface Topic {
  name: string;
  status: 'pending' | 'in-progress' | 'completed';
  difficulty?: 'easy' | 'medium' | 'hard';
  completed?: boolean;
}

interface StudyPlanSubject {
  name: string;
  progress: number;
  proficiency: 'strong' | 'weak' | 'medium';
  topics: Topic[];
  id?: string;
  color?: string;
  hoursPerWeek?: number;
  priority?: number;
}

interface StudyPlan {
  id: string;
  examGoal: string;
  examDate: string;
  daysLeft: number;
  createdAt: string;
  status: 'active' | 'completed' | 'paused';
  progressPercentage: number;
  subjects: StudyPlanSubject[];
  studyHoursPerDay: number;
  preferredStudyTime: string;
  learningPace: string;
}

interface NewStudyPlan {
  examGoal: string;
  examDate: string;
  subjects: string[];
  studyHoursPerDay: number;
  preferredStudyTime: string;
}

const AcademicAdvisor: React.FC<AcademicAdvisorProps> = ({ userProfile }) => {
  const {
    showCreateDialog,
    selectedPlan,
    activePlans,
    completedPlans,
    handleCreatePlan,
    handleViewPlanDetails,
    handleNewPlanCreated,
    setShowCreateDialog,
    setSelectedPlan
  } = useAcademicPlans(userProfile?.examPreparation);

  return (
    <div className="space-y-12">
      {/* Header section */}
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <GraduationCap className="h-8 w-8 text-indigo-600" />
          Academic Advisor
        </h1>
        <p className="text-gray-500 mt-1">
          Your personalized study plans and academic progress tracking
        </p>
      </div>

      <StudyPlanSections
        activePlans={activePlans}
        completedPlans={completedPlans}
        onCreatePlan={handleCreatePlan}
        onViewPlanDetails={handleViewPlanDetails}
      />

      {/* Study Plan Creation Dialog */}
      <CreateStudyPlanWizard
        open={showCreateDialog}
        onClose={() => setShowCreateDialog(false)}
        examGoal={userProfile?.examPreparation}
        onCreatePlan={handleNewPlanCreated}
      />

      {/* Study Plan Detail Dialog */}
      {selectedPlan && (
        <StudyPlanDetail
          plan={selectedPlan}
          isOpen={!!selectedPlan}
          onClose={() => setSelectedPlan(null)}
        />
      )}
    </div>
  );
};

export default AcademicAdvisor;
