
import React, { useState } from 'react';
import AcademicHeader from '@/components/dashboard/student/academic/AcademicHeader';
import StudyPlansList from '@/components/dashboard/student/academic/StudyPlansList';
import CreateStudyPlanWizard from '@/components/dashboard/student/academic/CreateStudyPlanWizard';
import StudyPlanDetail from '@/components/dashboard/student/academic/StudyPlanDetail';
import { useToast } from '@/hooks/use-toast';
import { v4 as uuidv4 } from 'uuid';
import { format, differenceInCalendarDays } from 'date-fns';
import type { StudyPlan, NewStudyPlan, StudyPlanSubject } from '@/types/user/studyPlan';

interface AcademicAdvisorProps {
  userProfile: {
    examPreparation?: string;
  };
}

const AcademicAdvisor: React.FC<AcademicAdvisorProps> = ({ userProfile }) => {
  const { toast } = useToast();
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<StudyPlan | null>(null);

  // State for plans
  const [activePlans, setActivePlans] = useState<StudyPlan[]>([{
    id: "plan-1",
    userId: "user-1",
    goal: "IIT-JEE",
    examGoal: userProfile?.examPreparation || "IIT-JEE",
    examDate: "2024-12-15",
    daysLeft: 240,
    createdAt: "2024-04-10T12:00:00Z",
    updatedAt: "2024-04-10T12:00:00Z",
    status: 'active',
    progressPercentage: 35,
    weeklyHours: 30,
    subjects: [
      {
        id: "subj-1",
        name: "Physics",
        color: "#FDA4AF",
        hoursPerWeek: 10,
        priority: 'high',
        progress: 45,
        proficiency: 'moderate',
        topics: [
          { id: "t-1", name: "Mechanics", status: 'in-progress', difficulty: 'medium', completed: false },
          { id: "t-2", name: "Thermodynamics", status: 'pending', difficulty: 'medium', completed: false },
          { id: "t-3", name: "Electrostatics", status: 'completed', difficulty: 'medium', completed: true }
        ]
      },
      {
        id: "subj-2",
        name: "Chemistry",
        color: "#A78BFA",
        hoursPerWeek: 8,
        priority: 'medium',
        progress: 25,
        proficiency: 'weak',
        topics: [
          { id: "t-4", name: "Organic Chemistry", status: 'pending', difficulty: 'hard', completed: false },
          { id: "t-5", name: "Chemical Bonding", status: 'in-progress', difficulty: 'medium', completed: false },
          { id: "t-6", name: "Equilibrium", status: 'pending', difficulty: 'easy', completed: false }
        ]
      },
      {
        id: "subj-3",
        name: "Mathematics",
        color: "#38BDF8",
        hoursPerWeek: 12,
        priority: 'high',
        progress: 72,
        proficiency: 'strong',
        topics: [
          { id: "t-7", name: "Calculus", status: 'completed', difficulty: 'hard', completed: true },
          { id: "t-8", name: "Coordinate Geometry", status: 'completed', difficulty: 'medium', completed: true },
          { id: "t-9", name: "Probability", status: 'in-progress', difficulty: 'easy', completed: false }
        ]
      }
    ],
    studyHoursPerDay: 6,
    preferredStudyTime: 'evening',
    learningPace: 'moderate'
  }]);

  // State for completed plans
  const [completedPlans, setCompletedPlans] = useState<StudyPlan[]>([{
    id: "plan-old-1",
    userId: "user-1",
    goal: "IIT-JEE",
    examGoal: "IIT-JEE",
    examDate: "2024-03-15",
    daysLeft: 0,
    createdAt: "2024-01-01T12:00:00Z",
    updatedAt: "2024-03-15T12:00:00Z",
    status: 'completed',
    progressPercentage: 100,
    weeklyHours: 25,
    subjects: [
      {
        id: "subj-old-1",
        name: "Physics",
        color: "#FDA4AF",
        hoursPerWeek: 8,
        priority: 'medium',
        progress: 65,
        proficiency: 'weak',
        topics: [
          { id: "t-old-1", name: "Mechanics", status: 'completed', difficulty: 'medium', completed: true },
          { id: "t-old-2", name: "Waves", status: 'completed', difficulty: 'easy', completed: true }
        ]
      },
      {
        id: "subj-old-2",
        name: "Chemistry",
        color: "#A78BFA",
        hoursPerWeek: 7,
        priority: 'low',
        progress: 60,
        proficiency: 'weak',
        topics: [
          { id: "t-old-3", name: "Periodic Table", status: 'completed', difficulty: 'medium', completed: true }
        ]
      },
      {
        id: "subj-old-3",
        name: "Mathematics",
        color: "#38BDF8",
        hoursPerWeek: 10,
        priority: 'high',
        progress: 70,
        proficiency: 'moderate',
        topics: [
          { id: "t-old-4", name: "Algebra", status: 'completed', difficulty: 'hard', completed: true }
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

  // Function to generate topics based on subject
  const generateTopicsForSubject = (subject: string, proficiency: 'weak' | 'moderate' | 'strong') => {
    let topics = [];
    const priorities = ['high', 'medium', 'low'];
    const statuses = ['pending', 'in-progress'];
    const difficulties = ['easy', 'medium', 'hard'];
    
    // Generate topics based on subject
    switch(subject.toLowerCase()) {
      case 'physics':
        topics = [
          { id: `topic-${Math.random().toString(36).substr(2, 9)}`, name: "Mechanics", status: statuses[Math.floor(Math.random() * statuses.length)] as 'pending' | 'in-progress', difficulty: difficulties[Math.floor(Math.random() * difficulties.length)] as 'easy' | 'medium' | 'hard', completed: false },
          { id: `topic-${Math.random().toString(36).substr(2, 9)}`, name: "Thermodynamics", status: statuses[Math.floor(Math.random() * statuses.length)] as 'pending' | 'in-progress', difficulty: difficulties[Math.floor(Math.random() * difficulties.length)] as 'easy' | 'medium' | 'hard', completed: false },
          { id: `topic-${Math.random().toString(36).substr(2, 9)}`, name: "Electrostatics", status: statuses[Math.floor(Math.random() * statuses.length)] as 'pending' | 'in-progress', difficulty: difficulties[Math.floor(Math.random() * difficulties.length)] as 'easy' | 'medium' | 'hard', completed: false }
        ];
        break;
      case 'chemistry':
        topics = [
          { id: `topic-${Math.random().toString(36).substr(2, 9)}`, name: "Organic Chemistry", status: statuses[Math.floor(Math.random() * statuses.length)] as 'pending' | 'in-progress', difficulty: difficulties[Math.floor(Math.random() * difficulties.length)] as 'easy' | 'medium' | 'hard', completed: false },
          { id: `topic-${Math.random().toString(36).substr(2, 9)}`, name: "Inorganic Chemistry", status: statuses[Math.floor(Math.random() * statuses.length)] as 'pending' | 'in-progress', difficulty: difficulties[Math.floor(Math.random() * difficulties.length)] as 'easy' | 'medium' | 'hard', completed: false },
          { id: `topic-${Math.random().toString(36).substr(2, 9)}`, name: "Physical Chemistry", status: statuses[Math.floor(Math.random() * statuses.length)] as 'pending' | 'in-progress', difficulty: difficulties[Math.floor(Math.random() * difficulties.length)] as 'easy' | 'medium' | 'hard', completed: false }
        ];
        break;
      case 'mathematics':
        topics = [
          { id: `topic-${Math.random().toString(36).substr(2, 9)}`, name: "Calculus", status: statuses[Math.floor(Math.random() * statuses.length)] as 'pending' | 'in-progress', difficulty: difficulties[Math.floor(Math.random() * difficulties.length)] as 'easy' | 'medium' | 'hard', completed: false },
          { id: `topic-${Math.random().toString(36).substr(2, 9)}`, name: "Algebra", status: statuses[Math.floor(Math.random() * statuses.length)] as 'pending' | 'in-progress', difficulty: difficulties[Math.floor(Math.random() * difficulties.length)] as 'easy' | 'medium' | 'hard', completed: false },
          { id: `topic-${Math.random().toString(36).substr(2, 9)}`, name: "Geometry", status: statuses[Math.floor(Math.random() * statuses.length)] as 'pending' | 'in-progress', difficulty: difficulties[Math.floor(Math.random() * difficulties.length)] as 'easy' | 'medium' | 'hard', completed: false }
        ];
        break;
      default:
        topics = [
          { id: `topic-${Math.random().toString(36).substr(2, 9)}`, name: "Fundamentals", status: statuses[Math.floor(Math.random() * statuses.length)] as 'pending' | 'in-progress', difficulty: difficulties[Math.floor(Math.random() * difficulties.length)] as 'easy' | 'medium' | 'hard', completed: false },
          { id: `topic-${Math.random().toString(36).substr(2, 9)}`, name: "Advanced Topics", status: statuses[Math.floor(Math.random() * statuses.length)] as 'pending' | 'in-progress', difficulty: difficulties[Math.floor(Math.random() * difficulties.length)] as 'easy' | 'medium' | 'hard', completed: false }
        ];
    }
    
    return topics;
  };

  const handleNewPlanCreated = (plan: NewStudyPlan) => {
    // Convert proficiency values if needed
    const mappedProficiency = (prof: string): 'weak' | 'moderate' | 'strong' => {
      if (prof === 'medium') return 'moderate';
      return prof as 'weak' | 'moderate' | 'strong';
    };

    // Create a new plan object
    const newPlan: StudyPlan = {
      id: uuidv4(),
      userId: "user-1",
      goal: plan.examGoal,
      examGoal: plan.examGoal,
      examDate: format(plan.examDate instanceof Date ? plan.examDate : new Date(), 'yyyy-MM-dd'),
      daysLeft: differenceInCalendarDays(plan.examDate instanceof Date ? plan.examDate : new Date(), new Date()),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'active',
      progressPercentage: 0,
      weeklyHours: plan.weeklyHours || 30,
      subjects: plan.subjects.map(subject => ({
        id: subject.id,
        name: subject.name,
        color: subject.color,
        hoursPerWeek: subject.hoursPerWeek,
        priority: subject.priority,
        progress: 0,
        proficiency: mappedProficiency(subject.proficiency || 'medium'),
        topics: generateTopicsForSubject(subject.name, mappedProficiency(subject.proficiency || 'medium'))
      })),
      studyHoursPerDay: plan.studyHoursPerDay,
      preferredStudyTime: plan.preferredStudyTime,
      learningPace: plan.learningPace
    };
    
    // Move previous active plans to completed
    const updatedCompletedPlans = [...completedPlans];
    if (activePlans.length > 0) {
      const oldActivePlans = activePlans.map(plan => ({
        ...plan,
        status: 'completed' as 'completed'
      }));
      updatedCompletedPlans.push(...oldActivePlans);
    }
    
    // Add the new plan as the active one
    setActivePlans([newPlan]);
    setCompletedPlans(updatedCompletedPlans);
    
    // Show toast
    toast({
      title: "Success",
      description: "Your new study plan has been created and is now active!",
    });
    
    setShowCreateDialog(false);
  };

  return (
    <div className="space-y-12">
      <AcademicHeader examGoal={userProfile?.examPreparation} />
      
      <StudyPlansList
        activePlans={activePlans}
        completedPlans={completedPlans}
        onCreatePlan={handleCreatePlan}
        onViewPlanDetails={handleViewPlanDetails}
      />

      <CreateStudyPlanWizard
        open={showCreateDialog}
        onClose={() => setShowCreateDialog(false)}
        examGoal={userProfile?.examPreparation}
        onCreatePlan={handleNewPlanCreated}
      />

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
