
import { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import type { NewStudyPlanSubject } from '@/types/user/studyPlan';

export const useOnboardingForm = (examGoal: string, onComplete: () => void) => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [stepComplete, setStepComplete] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSuccessCard, setShowSuccessCard] = useState(false);
  
  // Form state
  const [examDate, setExamDate] = useState<Date | undefined>();
  const [studyHours, setStudyHours] = useState<number>(4);
  const [strongSubjects, setStrongSubjects] = useState<NewStudyPlanSubject[]>([]);
  const [weakSubjects, setWeakSubjects] = useState<NewStudyPlanSubject[]>([]);
  const [studyPace, setStudyPace] = useState<"Aggressive" | "Balanced" | "Relaxed">("Balanced");
  const [studyTime, setStudyTime] = useState<"Morning" | "Afternoon" | "Evening" | "Night">("Evening");

  // Effect to update stepComplete based on the current step and form state
  useEffect(() => {
    switch (currentStep) {
      case 1:
        setStepComplete(!!examDate);
        break;
      case 2:
        setStepComplete(studyHours > 0);
        break;
      case 3:
        setStepComplete(strongSubjects.length > 0 || weakSubjects.length > 0);
        break;
      case 4:
        setStepComplete(!!studyTime);
        break;
      case 5:
        setStepComplete(!!studyPace);
        break;
      default:
        setStepComplete(false);
    }
  }, [currentStep, examDate, studyHours, strongSubjects, weakSubjects, studyPace, studyTime]);

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    setLoading(true);
    
    setTimeout(() => {
      setLoading(false);
      setShowSuccessCard(true);
      
      toast({
        title: "Success!",
        description: "Your personalized study plan has been created.",
      });
      
      setTimeout(() => {
        onComplete();
      }, 3000);
    }, 2500);
  };

  const handleToggleSubject = (subject: string, type: 'strong' | 'weak') => {
    const newSubject: NewStudyPlanSubject = {
      name: subject,
      proficiency: type === 'strong' ? 'strong' : 'weak'
    };

    if (type === 'strong') {
      if (strongSubjects.some(s => s.name === subject)) {
        setStrongSubjects(strongSubjects.filter(s => s.name !== subject));
      } else {
        setWeakSubjects(weakSubjects.filter(s => s.name !== subject));
        setStrongSubjects([...strongSubjects, newSubject]);
      }
    } else {
      if (weakSubjects.some(s => s.name === subject)) {
        setWeakSubjects(weakSubjects.filter(s => s.name !== subject));
      } else {
        setStrongSubjects(strongSubjects.filter(s => s.name !== subject));
        setWeakSubjects([...weakSubjects, newSubject]);
      }
    }
  };

  return {
    currentStep,
    stepComplete,
    loading,
    showSuccessCard,
    examDate,
    studyHours,
    strongSubjects,
    weakSubjects,
    studyPace,
    studyTime,
    setExamDate,
    setStudyHours,
    setStudyPace,
    setStudyTime,
    handleNext,
    handlePrevious,
    handleToggleSubject
  };
};
