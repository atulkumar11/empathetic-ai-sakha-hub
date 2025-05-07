
import React from "react";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps }) => {
  const progress = Math.round(((currentStep + 1) / totalSteps) * 100);
  
  return (
    <div className="mb-8">
      <div className="flex justify-between text-sm text-gray-500 mb-1">
        <span>Question {currentStep + 1} of {totalSteps}</span>
        <span>{progress}%</span>
      </div>
      <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-sky-500 to-violet-500 transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
