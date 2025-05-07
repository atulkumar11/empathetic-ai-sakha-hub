
import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface OnboardingProgressProps {
  currentStep: number;
  loading: boolean;
}

export default function OnboardingProgress({ currentStep, loading }: OnboardingProgressProps) {
  // Don't show progress indicator during loading
  if (loading) return null;
  
  const totalSteps = 5;
  const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);
  
  return (
    <div className="flex items-center justify-between w-full py-4 px-2">
      {steps.map((step) => (
        <React.Fragment key={step}>
          {/* Step circle */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0.5 }}
            animate={{ 
              scale: step <= currentStep ? 1 : 0.8,
              opacity: step <= currentStep ? 1 : 0.5
            }}
            className={`relative flex items-center justify-center w-8 h-8 rounded-full 
              ${step < currentStep 
                ? 'bg-blue-600 text-white' 
                : step === currentStep 
                  ? 'bg-blue-500 text-white border-2 border-blue-300' 
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'}`}
          >
            {step < currentStep ? (
              <Check size={16} className="text-white" />
            ) : (
              <span className="text-sm">{step}</span>
            )}
          </motion.div>
          
          {/* Connecting line between steps */}
          {step < totalSteps && (
            <motion.div 
              className="flex-1 h-0.5 mx-2"
              initial={{ backgroundColor: "#e5e7eb" }}
              animate={{ 
                backgroundColor: step < currentStep ? "#3b82f6" : "#e5e7eb"
              }}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
