
import React from "react";
import { Button } from "@/components/ui/button";
import { X, ChevronRight, ChevronLeft } from "lucide-react";

interface QuestionNavigationProps {
  isFirstStep: boolean;
  isLastStep: boolean;
  isAnswered: boolean;
  isLoading: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onClose?: () => void;
  showCloseButton?: boolean;
}

const QuestionNavigation: React.FC<QuestionNavigationProps> = ({
  isFirstStep,
  isLastStep,
  isAnswered,
  isLoading,
  onPrevious,
  onNext,
  onClose,
  showCloseButton = false,
}) => {
  return (
    <div className="flex justify-between">
      {showCloseButton ? (
        <Button 
          variant="outline" 
          onClick={onClose} 
          className="flex items-center gap-2 border-2 border-gray-200 dark:border-gray-700"
        >
          <X size={16} />
          <span>Cancel</span>
        </Button>
      ) : (
        <Button 
          variant="outline" 
          onClick={onPrevious} 
          disabled={isFirstStep}
          className="flex items-center gap-2"
        >
          <ChevronLeft size={16} />
          <span>Back</span>
        </Button>
      )}
      
      <Button 
        onClick={onNext} 
        disabled={!isAnswered || isLoading}
        className="bg-gradient-to-r from-sky-500 to-violet-500 flex items-center gap-2"
      >
        <span>{isLoading ? "Processing..." : isLastStep ? "Complete" : "Next"}</span>
        <ChevronRight size={16} />
      </Button>
    </div>
  );
};

export default QuestionNavigation;
