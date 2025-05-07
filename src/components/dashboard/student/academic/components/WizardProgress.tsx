
import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface WizardProgressProps {
  currentStep: number;
  totalSteps?: number;
}

const WizardProgress: React.FC<WizardProgressProps> = ({ currentStep, totalSteps = 6 }) => {
  const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);
  
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between w-full">
        {steps.map((step) => (
          <React.Fragment key={step}>
            {/* Step circle */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0.5 }}
              animate={{ 
                scale: step <= currentStep ? 1 : 0.8,
                opacity: step <= currentStep ? 1 : 0.5
              }}
              className={`relative flex items-center justify-center w-10 h-10 rounded-full 
                ${step < currentStep 
                  ? 'bg-indigo-600 text-white' 
                  : step === currentStep 
                    ? 'bg-indigo-500 text-white border-2 border-indigo-300' 
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'}`}
            >
              {step < currentStep ? (
                <Check size={18} className="text-white" />
              ) : (
                <span className="text-sm font-medium">{step}</span>
              )}

              {/* Pulse animation for current step */}
              {step === currentStep && (
                <motion.span
                  className="absolute -inset-1 rounded-full border-2 border-indigo-400"
                  animate={{ scale: [1, 1.15, 1], opacity: [0.7, 0.5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                />
              )}
            </motion.div>
            
            {/* Connecting line between steps */}
            {step < totalSteps && (
              <motion.div 
                className="flex-1 h-1 mx-1"
                initial={{ backgroundColor: "#e5e7eb" }}
                animate={{ 
                  backgroundColor: step < currentStep ? "#4f46e5" : "#e5e7eb"
                }}
              />
            )}
          </React.Fragment>
        ))}
      </div>
      
      {/* Step labels */}
      <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
        <span className={`${currentStep >= 1 ? "text-indigo-600 font-medium" : ""} w-10 text-center`}>Goal</span>
        <span className={`${currentStep >= 2 ? "text-indigo-600 font-medium" : ""} w-10 text-center`}>Date</span>
        <span className={`${currentStep >= 3 ? "text-indigo-600 font-medium" : ""} w-10 text-center`}>Hours</span>
        <span className={`${currentStep >= 4 ? "text-indigo-600 font-medium" : ""} w-10 text-center`}>Subjects</span>
        <span className={`${currentStep >= 5 ? "text-indigo-600 font-medium" : ""} w-10 text-center`}>Time</span>
        <span className={`${currentStep >= 6 ? "text-indigo-600 font-medium" : ""} w-10 text-center`}>Pace</span>
      </div>
    </div>
  );
};

export default WizardProgress;
