
import React from 'react';
import { UserAnswer } from '../../types';
import { AlertTriangle, Check, X } from 'lucide-react';
import { motion } from 'framer-motion';

interface AnswerExplanationProps {
  userAnswer: UserAnswer;
  explanation: string;
}

const AnswerExplanation: React.FC<AnswerExplanationProps> = ({ userAnswer, explanation }) => {
  const isTimeout = userAnswer.answer === "TIMEOUT";
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-4 rounded-lg mt-4 ${
        isTimeout 
          ? 'bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/30' 
          : userAnswer.isCorrect 
            ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/30' 
            : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/30'
      }`}
    >
      <div className="flex items-center mb-2">
        {isTimeout ? (
          <AlertTriangle className="h-5 w-5 text-amber-500 mr-2" />
        ) : userAnswer.isCorrect ? (
          <Check className="h-5 w-5 text-green-500 mr-2" />
        ) : (
          <X className="h-5 w-5 text-red-500 mr-2" />
        )}
        
        <h4 className={`font-medium ${
          isTimeout 
            ? 'text-amber-700 dark:text-amber-400' 
            : userAnswer.isCorrect 
              ? 'text-green-700 dark:text-green-400' 
              : 'text-red-700 dark:text-red-400'
        }`}>
          {isTimeout 
            ? "Time's up!" 
            : userAnswer.isCorrect 
              ? "Correct!" 
              : "Incorrect"}
        </h4>
      </div>
      
      <div className="text-sm text-gray-700 dark:text-gray-300">
        {isTimeout ? (
          <p>You ran out of time. Moving to the next question...</p>
        ) : (
          explanation ? <p>{explanation}</p> : <p>Moving to the next question...</p>
        )}
      </div>
    </motion.div>
  );
};

export default AnswerExplanation;
