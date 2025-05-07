
import React from 'react';
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';

interface ConfidenceQuestionProps {
  currentSubject: string;
  confidenceRating: number | null;
  onConfidenceRating: (rating: number) => void;
  onContinue: () => void;
}

const ConfidenceQuestion: React.FC<ConfidenceQuestionProps> = ({
  currentSubject,
  confidenceRating,
  onConfidenceRating,
  onContinue
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border-2 border-pink-100 dark:border-pink-800 shadow-md">
      <h3 className="text-lg font-medium mb-4">
        How confident are you about your knowledge of {currentSubject}?
      </h3>
      
      <div className="grid grid-cols-5 gap-3 mt-6">
        {[1, 2, 3, 4, 5].map(rating => (
          <motion.div 
            key={rating}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant={confidenceRating === rating ? "default" : "outline"}
              className={`w-full h-14 ${
                confidenceRating === rating 
                  ? "bg-gradient-to-r from-pink-500 to-pink-600" 
                  : "hover:bg-pink-50 dark:hover:bg-pink-900/20"
              }`}
              onClick={() => onConfidenceRating(rating)}
            >
              <div className="flex flex-col items-center">
                <span className="text-lg font-bold">{rating}</span>
                <span className="text-xs">
                  {rating === 1 ? "Very low" : 
                   rating === 2 ? "Low" : 
                   rating === 3 ? "Medium" : 
                   rating === 4 ? "High" : "Very high"}
                </span>
              </div>
            </Button>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-6">
        <Button
          className="w-full bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700"
          disabled={confidenceRating === null}
          onClick={onContinue}
        >
          Continue to Questions
        </Button>
      </div>
    </div>
  );
};

export default ConfidenceQuestion;
