
import { useState } from 'react';
import { NewStudyPlan, StudyPlanSubject } from '@/types/user/studyPlan';
import { addDays, addMonths } from 'date-fns';

const DEFAULT_EXAM_GOAL = "Score in the top 10% of test takers";

// Default subjects with all required fields including priority
const DEFAULT_SUBJECTS: StudyPlanSubject[] = [
  { 
    id: "math", 
    name: "Mathematics", 
    difficulty: "medium", 
    completed: false,
    priority: "high",
    hoursPerWeek: 5,
    color: "#4C51BF",
    isWeakSubject: false
  },
  { 
    id: "physics", 
    name: "Physics", 
    difficulty: "hard", 
    completed: false,
    priority: "medium",
    hoursPerWeek: 4,
    color: "#2B6CB0",
    isWeakSubject: false
  },
  { 
    id: "chemistry", 
    name: "Chemistry", 
    difficulty: "medium", 
    completed: false,
    priority: "medium",
    hoursPerWeek: 4,
    color: "#2F855A",
    isWeakSubject: false
  },
  { 
    id: "biology", 
    name: "Biology", 
    difficulty: "easy", 
    completed: false,
    priority: "low",
    hoursPerWeek: 3,
    color: "#C05621",
    isWeakSubject: false
  }
];

// Default new study plan
const DEFAULT_STUDY_PLAN: NewStudyPlan = {
  goal: "Prepare for JEE Advanced",
  examGoal: DEFAULT_EXAM_GOAL,
  subjects: DEFAULT_SUBJECTS,
  weeklyHours: 30,
  startDate: new Date().toISOString().split('T')[0],
  endDate: addMonths(new Date(), 3).toISOString().split('T')[0],
  examDate: addMonths(new Date(), 3).toISOString().split('T')[0],
  status: "active",
  progress: 0,
  learningPace: "moderate",
  userDemographics: {
    age: 18,
    educationLevel: "higherSecondary",
    city: ""
  },
  studyPreferences: {
    personalityType: "analytical",
    mood: "motivated",
    studyPace: "balanced",
    dailyStudyHours: 4,
    breakFrequency: "occasionally",
    stressManagement: "meditation",
    studyEnvironment: "quiet",
    preferredStudyTime: "morning"
  },
  contactInfo: {
    mobileNumber: ""
  }
};

// Wizard steps
export const STUDY_PLAN_STEPS = [
  "goal",
  "exam-goal",
  "exam-date",
  "demographics",
  "subjects",
  "study-hours",
  "learning-pace",
  "study-preferences",
  "review"
];

export const useStudyPlanWizard = () => {
  const [studyPlan, setStudyPlan] = useState<NewStudyPlan>(DEFAULT_STUDY_PLAN);
  const [currentStep, setCurrentStep] = useState(0);

  // Handle form submission for the current step
  const handleSubmitStep = (data: Partial<NewStudyPlan>) => {
    setStudyPlan(prev => ({
      ...prev,
      ...data
    }));
    
    // If this is the last step, we'll stay on the same step for review
    if (currentStep < STUDY_PLAN_STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  // Handle form submission for the exam date step
  const handleSubmitExamDate = (date: string | Date) => {
    let formattedDate: string;
    
    if (typeof date === 'string') {
      formattedDate = date;
    } else {
      // Handle Date object
      formattedDate = date.toISOString().split('T')[0];
    }
    
    setStudyPlan(prev => ({
      ...prev,
      examDate: formattedDate
    }));
    
    if (currentStep < STUDY_PLAN_STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  // Handle form submission for demographics
  const handleSubmitDemographics = (demographics: { age?: number; educationLevel?: string; city?: string }) => {
    setStudyPlan(prev => ({
      ...prev,
      userDemographics: {
        ...prev.userDemographics,
        ...demographics
      }
    }));
    
    if (currentStep < STUDY_PLAN_STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  // Handle form submission for study preferences
  const handleSubmitPreferences = (preferences: Partial<NewStudyPlan['studyPreferences']>) => {
    setStudyPlan(prev => ({
      ...prev,
      studyPreferences: {
        ...prev.studyPreferences,
        ...preferences
      }
    }));
    
    if (currentStep < STUDY_PLAN_STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  // Create the final study plan
  const createStudyPlan = () => {
    // Here you would typically make an API call to save the study plan
    console.log("Creating study plan:", studyPlan);
    return {
      ...studyPlan,
      id: `plan-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
  };

  // Navigate to previous step
  const goToPrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  // Navigate to next step
  const goToNextStep = () => {
    if (currentStep < STUDY_PLAN_STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  // Reset the study plan to default values
  const resetStudyPlan = () => {
    setStudyPlan(DEFAULT_STUDY_PLAN);
    setCurrentStep(0);
  };

  return {
    studyPlan,
    setStudyPlan,
    currentStep,
    setCurrentStep,
    handleSubmitStep,
    handleSubmitExamDate,
    handleSubmitDemographics,
    handleSubmitPreferences,
    createStudyPlan,
    goToPrevStep,
    goToNextStep,
    resetStudyPlan,
    steps: STUDY_PLAN_STEPS
  };
};
