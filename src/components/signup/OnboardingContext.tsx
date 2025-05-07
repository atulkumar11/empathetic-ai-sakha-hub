
import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MoodType, PersonalityType, UserRole } from "@/types/user/base";

export type OnboardingStep = 
  | "role" 
  | "goal" 
  | "demographics" 
  | "personality" 
  | "sentiment" 
  | "studyTime" 
  | "studyPace" 
  | "studyHours" 
  | "habits" 
  | "interests" 
  | "signup";

export type UserGoal = "IIT-JEE" | "NEET" | "UPSC" | "CAT" | "GATE" | "GMAT";

interface OnboardingContextType {
  onboardingData: Record<string, any>;
  setOnboardingData: (data: Record<string, any>) => void;
  currentStep: OnboardingStep;
  setStep: (step: OnboardingStep) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
}

const defaultOnboardingData = {
  role: UserRole.Student,
  examGoal: "",
  demographics: {},
  personalityType: null,
  mood: null,
  studyTime: null,
  studyPace: null,
  dailyStudyHours: null,
  habits: {},
  interests: []
};

const OnboardingContext = createContext<OnboardingContextType>({
  onboardingData: defaultOnboardingData,
  setOnboardingData: () => {},
  currentStep: "role",
  setStep: () => {},
  goToNextStep: () => {},
  goToPreviousStep: () => {}
});

export const useOnboarding = () => useContext(OnboardingContext);

// Define the step sequence for the onboarding flow
const stepSequence: OnboardingStep[] = [
  "role", 
  "goal", 
  "demographics", 
  "personality", 
  "sentiment", 
  "studyTime", 
  "studyPace", 
  "studyHours", 
  "habits", 
  "interests", 
  "signup"
];

export const OnboardingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [onboardingData, setOnboardingData] = useState(defaultOnboardingData);
  const [currentStep, setCurrentStep] = useState<OnboardingStep>("role");
  const navigate = useNavigate();

  // Get the current step index
  const currentStepIndex = stepSequence.indexOf(currentStep);

  // Go to the next step in the sequence
  const goToNextStep = () => {
    if (currentStepIndex < stepSequence.length - 1) {
      setCurrentStep(stepSequence[currentStepIndex + 1]);
    }
  };

  // Go to the previous step in the sequence
  const goToPreviousStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStep(stepSequence[currentStepIndex - 1]);
    }
  };

  // Set a specific step
  const setStep = (step: OnboardingStep) => {
    setCurrentStep(step);
  };

  // Update the onboarding data
  const updateOnboardingData = (data: Record<string, any>) => {
    setOnboardingData({ ...onboardingData, ...data });
  };

  return (
    <OnboardingContext.Provider
      value={{
        onboardingData,
        setOnboardingData: updateOnboardingData,
        currentStep,
        setStep,
        goToNextStep,
        goToPreviousStep
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};
