
import React from 'react';

interface TestProgressBarProps {
  testTimeLeft: number;
  currentQuestionIndex: number;
  questionsLength: number;
  selectedCognitiveSet: number;
}

const TestProgressBar: React.FC<TestProgressBarProps> = ({ 
  testTimeLeft, 
  currentQuestionIndex, 
  questionsLength,
  selectedCognitiveSet 
}) => {
  // Ensure we don't show NaN if questionsLength is 0
  const safeQuestionsLength = questionsLength || 1;
  // Make sure currentQuestionIndex is valid
  const safeCurrentQuestionIndex = Math.min(Math.max(0, currentQuestionIndex), safeQuestionsLength - 1);

  return (
    <div className="mb-2 flex justify-between items-center text-xs text-gray-600 dark:text-gray-400">
      <div>
        Test time remaining: {Math.floor(testTimeLeft / 60)}:{(testTimeLeft % 60).toString().padStart(2, '0')}
      </div>
      <div>
        Set {selectedCognitiveSet} - Question {safeCurrentQuestionIndex + 1}/{safeQuestionsLength}
      </div>
    </div>
  );
};

export default TestProgressBar;
