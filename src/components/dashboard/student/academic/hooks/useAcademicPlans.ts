
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import type { StudyPlan, NewStudyPlan } from '@/types/user/studyPlan';
import { v4 as uuidv4 } from 'uuid';
import { format, differenceInCalendarDays } from 'date-fns';

export const useAcademicPlans = (initialExamPrep?: string) => {
  const { toast } = useToast();
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<StudyPlan | null>(null);
  
  // Sample active study plan data
  const [activePlans, setActivePlans] = useState<StudyPlan[]>([{
    id: "plan-1",
    examGoal: initialExamPrep || "IIT-JEE",
    examDate: "2024-12-15",
    daysLeft: 240,
    createdAt: "2024-04-10T12:00:00Z",
    status: 'active',
    progressPercentage: 35,
    subjects: [
      {
        name: "Physics",
        progress: 45,
        proficiency: 'moderate',
        topics: [
          { name: "Mechanics", status: 'in-progress', priority: 'high' },
          { name: "Thermodynamics", status: 'pending', priority: 'medium' },
          { name: "Electrostatics", status: 'completed', priority: 'high' }
        ]
      },
      {
        name: "Chemistry",
        progress: 25,
        proficiency: 'weak',
        topics: [
          { name: "Organic Chemistry", status: 'pending', priority: 'high' },
          { name: "Chemical Bonding", status: 'in-progress', priority: 'medium' }
        ]
      },
      {
        name: "Mathematics",
        progress: 72,
        proficiency: 'strong',
        topics: [
          { name: "Calculus", status: 'completed', priority: 'high' },
          { name: "Coordinate Geometry", status: 'completed', priority: 'high' }
        ]
      }
    ],
    studyHoursPerDay: 6,
    preferredStudyTime: 'evening',
    learningPace: 'moderate'
  }]);

  // Sample completed plans
  const [completedPlans, setCompletedPlans] = useState<StudyPlan[]>([{
    id: "plan-old-1",
    examGoal: "IIT-JEE",
    examDate: "2024-03-15",
    daysLeft: 0,
    createdAt: "2024-01-01T12:00:00Z",
    status: 'completed',
    progressPercentage: 100,
    subjects: [
      {
        name: "Physics",
        progress: 100,
        proficiency: 'strong',
        topics: [
          { name: "All topics", status: 'completed', priority: 'high' }
        ]
      },
      {
        name: "Chemistry",
        progress: 100,
        proficiency: 'strong',
        topics: [
          { name: "All topics", status: 'completed', priority: 'high' }
        ]
      },
      {
        name: "Mathematics",
        progress: 100,
        proficiency: 'strong',
        topics: [
          { name: "All topics", status: 'completed', priority: 'high' }
        ]
      }
    ],
    studyHoursPerDay: 5,
    preferredStudyTime: 'morning',
    learningPace: 'slow'
  }]);

  const handleCreatePlan = () => {
    setShowCreateDialog(true);
  };

  const handleViewPlanDetails = (planId: string) => {
    const plan = [...activePlans, ...completedPlans].find(p => p.id === planId);
    if (plan) {
      setSelectedPlan(plan);
    }
  };

  const handleNewPlanCreated = (plan: NewStudyPlan) => {
    // Move current active plans to completed
    const updatedCompletedPlans = [
      ...completedPlans,
      ...activePlans.map(plan => ({ ...plan, status: 'completed' as const }))
    ];

    // Create new plan
    const newPlan: StudyPlan = {
      id: uuidv4(),
      examGoal: plan.examGoal,
      examDate: format(plan.examDate, 'yyyy-MM-dd'),
      daysLeft: differenceInCalendarDays(plan.examDate, new Date()),
      createdAt: new Date().toISOString(),
      status: 'active',
      progressPercentage: 0,
      subjects: plan.subjects.map(subject => ({
        name: subject.name,
        progress: 0,
        proficiency: subject.proficiency,
        topics: []
      })),
      studyHoursPerDay: plan.studyHoursPerDay,
      preferredStudyTime: plan.preferredStudyTime,
      learningPace: plan.learningPace
    };

    setActivePlans([newPlan]);
    setCompletedPlans(updatedCompletedPlans);
    setShowCreateDialog(false);
    
    toast({
      title: "Success",
      description: "Your new study plan has been created.",
    });
  };

  return {
    showCreateDialog,
    selectedPlan,
    activePlans,
    completedPlans,
    handleCreatePlan,
    handleViewPlanDetails,
    handleNewPlanCreated,
    setShowCreateDialog,
    setSelectedPlan
  };
};
