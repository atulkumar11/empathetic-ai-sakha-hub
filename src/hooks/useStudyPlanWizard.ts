
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import type { NewStudyPlan, StudyPlanSubject } from "@/types/user/studyPlan";

interface UseStudyPlanWizardProps {
  examGoal?: string;
  onCreatePlan: (plan: NewStudyPlan) => void;
  onClose: () => void;
}

export const useStudyPlanWizard = ({ examGoal = '', onCreatePlan, onClose }: UseStudyPlanWizardProps) => {
  const { toast } = useToast();
  const [step, setStep] = useState(examGoal ? 2 : 1); // Skip goal selection if examGoal is provided
  const [formData, setFormData] = useState<NewStudyPlan>({
    goal: examGoal || '',
    examGoal: examGoal || '',
    subjects: [],
    weeklyHours: 20,
    status: 'active',
    studyHoursPerDay: 6,
    preferredStudyTime: 'evening',
    learningPace: 'moderate'
  });

  const [strongSubjects, setStrongSubjects] = useState<string[]>([]);
  const [weakSubjects, setWeakSubjects] = useState<string[]>([]);

  const handleToggleSubject = (subject: string, type: 'strong' | 'weak') => {
    if (type === 'strong') {
      if (strongSubjects.includes(subject)) {
        setStrongSubjects(strongSubjects.filter(s => s !== subject));
      } else {
        if (weakSubjects.includes(subject)) {
          setWeakSubjects(weakSubjects.filter(s => s !== subject));
        }
        setStrongSubjects([...strongSubjects, subject]);
      }
    } else {
      if (weakSubjects.includes(subject)) {
        setWeakSubjects(weakSubjects.filter(s => s !== subject));
      } else {
        if (strongSubjects.includes(subject)) {
          setStrongSubjects(strongSubjects.filter(s => s !== subject));
        }
        setWeakSubjects([...weakSubjects, subject]);
      }
    }
  };

  const getSubjectsProficiencyList = (): StudyPlanSubject[] => {
    const subjectsList: StudyPlanSubject[] = [
      ...strongSubjects.map(subject => ({ 
        id: `subject-${Math.random().toString(36).substr(2, 9)}`,
        name: subject, 
        color: getRandomColor(),
        hoursPerWeek: formData.studyHoursPerDay || 4,
        priority: 'medium' as const,
        proficiency: 'strong' as const 
      })),
      ...weakSubjects.map(subject => ({ 
        id: `subject-${Math.random().toString(36).substr(2, 9)}`,
        name: subject, 
        color: getRandomColor(),
        hoursPerWeek: (formData.studyHoursPerDay || 4) * 1.5,
        priority: 'high' as const,
        proficiency: 'weak' as const 
      }))
    ];
    return subjectsList;
  };

  const handlePaceChange = (pace: "Aggressive" | "Balanced" | "Relaxed") => {
    const learningPace: 'slow' | 'moderate' | 'fast' = 
      pace === 'Relaxed' ? 'slow' : 
      pace === 'Balanced' ? 'moderate' : 'fast';
    setFormData(prev => ({ ...prev, learningPace }));
  };

  const handleStudyTimeChange = (time: "Morning" | "Afternoon" | "Evening" | "Night") => {
    const preferredStudyTime = time.toLowerCase() as 'morning' | 'afternoon' | 'evening' | 'night';
    setFormData(prev => ({ ...prev, preferredStudyTime }));
  };

  const handleExamGoalSelect = (goal: string) => {
    setFormData(prev => ({ ...prev, goal, examGoal: goal }));
    // Clear subjects when changing exam goal
    setStrongSubjects([]);
    setWeakSubjects([]);
    setStep(2); // Move to next step after goal selection
  };

  const handleNext = () => {
    if (step < 6) {
      setStep(step + 1);
    } else {
      const updatedFormData = {
        ...formData,
        subjects: getSubjectsProficiencyList(),
        weeklyHours: formData.studyHoursPerDay ? formData.studyHoursPerDay * 7 : 20
      };
      onCreatePlan(updatedFormData);
      setStep(1);
      setStrongSubjects([]);
      setWeakSubjects([]);
      setFormData({
        goal: '',
        examGoal: '',
        subjects: [],
        weeklyHours: 20,
        status: 'active',
        studyHoursPerDay: 6,
        preferredStudyTime: 'morning',
        learningPace: 'moderate'
      });
      onClose();
      toast({
        title: "Study Plan Created",
        description: "Your personalized study plan has been generated successfully.",
      });
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      onClose();
    }
  };

  return {
    step,
    formData,
    setFormData,
    strongSubjects,
    weakSubjects,
    handleToggleSubject,
    handlePaceChange,
    handleStudyTimeChange,
    handleExamGoalSelect,
    handleNext,
    handleBack
  };
};

// Helper function to generate random pastel colors
function getRandomColor(): string {
  const colors = [
    '#8B5CF6', // Purple
    '#EC4899', // Pink
    '#10B981', // Green
    '#F59E0B', // Yellow
    '#2563EB', // Blue
    '#EF4444', // Red
    '#6366F1', // Indigo
    '#14B8A6', // Teal
    '#F97316', // Orange
    '#8B5CF6', // Purple
  ];
  
  return colors[Math.floor(Math.random() * colors.length)];
}
