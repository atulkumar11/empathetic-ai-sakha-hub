
import React from 'react';
import { OnboardingStep } from './OnboardingContext';

interface StepInfo {
  name: string;
  status: 'completed' | 'current' | 'upcoming';
}

interface SignupProgressBarProps {
  currentStep: OnboardingStep;
}

const SignupProgressBar: React.FC<SignupProgressBarProps> = ({ currentStep }) => {
  // Define all the steps in the signup flow
  const allSteps: OnboardingStep[] = [
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

  // Find the current step index
  const currentStepIndex = allSteps.indexOf(currentStep);
  
  // Group steps into 5 main phases for the progress bar
  const getTotalProgress = () => {
    const totalSteps = allSteps.length;
    if (totalSteps === 0) return 0;
    
    // Calculate progress percentage based on current step
    return Math.round(((currentStepIndex + 1) / totalSteps) * 100);
  };

  // Group steps into 5 sections for display
  const getGroupLabel = () => {
    if (currentStep === "role" || currentStep === "goal") {
      return "Basic Info";
    } else if (currentStep === "demographics") {
      return "Demographics";
    } else if (currentStep === "personality" || currentStep === "sentiment") {
      return "Personality";
    } else if (
      currentStep === "studyTime" ||
      currentStep === "studyPace" ||
      currentStep === "studyHours" ||
      currentStep === "habits" ||
      currentStep === "interests"
    ) {
      return "Study Preferences";
    } else if (currentStep === "signup") {
      return "Create Account";
    }
    return "";
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs font-medium text-blue-600 dark:text-blue-400">
          {getGroupLabel()}
        </span>
        <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
          {getTotalProgress()}%
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700">
        <div
          className="bg-gradient-to-r from-blue-500 to-violet-500 h-1.5 rounded-full transition-all duration-300"
          style={{ width: `${getTotalProgress()}%` }}
        ></div>
      </div>
    </div>
  );
};

export default SignupProgressBar;
