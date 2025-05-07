
import React from 'react';
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import StudyPlanCard from './StudyPlanCard';
import type { StudyPlan } from '@/types/user/studyPlan';

interface StudyPlanSectionProps {
  title: string;
  description?: string;
  plans: StudyPlan[];
  onCreatePlan: () => void;
  onViewPlanDetails: (planId: string) => void;
}

const StudyPlanSection: React.FC<StudyPlanSectionProps> = ({
  title,
  description,
  plans,
  onCreatePlan,
  onViewPlanDetails
}) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold">{title}</h2>
          {description && <p className="text-gray-500 mt-1">{description}</p>}
        </div>
        <Button 
          onClick={onCreatePlan}
          className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create New Plan
        </Button>
      </div>

      {plans.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {plans.map(plan => (
            <StudyPlanCard 
              key={plan.id}
              plan={plan}
              onViewDetails={onViewPlanDetails}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 dark:bg-gray-900 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">No Study Plans Yet</h3>
          <p className="text-gray-500 mb-4">Create your first study plan to get started</p>
          <Button 
            onClick={onCreatePlan}
            className="bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Study Plan
          </Button>
        </div>
      )}
    </div>
  );
};

export default StudyPlanSection;
