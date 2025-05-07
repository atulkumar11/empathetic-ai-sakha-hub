
import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

interface OnboardingFooterProps {
  currentStep: number;
  stepComplete: boolean;
  handlePrevious: () => void;
  handleNext: () => void;
}

export default function OnboardingFooter({ 
  currentStep, 
  stepComplete, 
  handlePrevious, 
  handleNext 
}: OnboardingFooterProps) {
  return (
    <div className="bg-gray-50 p-6 flex justify-between">
      <Button
        variant="outline"
        onClick={handlePrevious}
        disabled={currentStep === 1}
      >
        Back
      </Button>
      
      <Button
        onClick={handleNext}
        disabled={!stepComplete}
        className={cn(
          currentStep === 5 ? "bg-gradient-to-r from-sky-600 to-indigo-600" : ""
        )}
      >
        {currentStep < 5 ? (
          <>
            Next <ChevronRight size={16} className="ml-1" />
          </>
        ) : (
          "Generate My Smart Plan"
        )}
      </Button>
    </div>
  );
}
