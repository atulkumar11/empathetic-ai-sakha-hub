
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { TestQuestion, UserAnswer } from '../types';
import { CustomProgress } from '@/components/ui/custom-progress';
import QuestionHeader from './components/QuestionHeader';
import QuestionContainer from './components/QuestionContainer';
import AnswerExplanation from './components/AnswerExplanation';
import { useIsMobile } from '@/hooks/use-mobile';

interface StressTestQuestionProps {
  currentQuestion: TestQuestion;
  currentQuestionIndex: number;
  questionsLength: number;
  timeLeft: number;
  showExplanation: boolean;
  showDistraction: boolean;
  currentComplexity: number;
  userAnswers: UserAnswer[];
  onAnswer: (answer: string) => void;
}

const StressTestQuestion: React.FC<StressTestQuestionProps> = ({
  currentQuestion,
  currentQuestionIndex,
  questionsLength,
  timeLeft,
  showExplanation,
  showDistraction,
  currentComplexity,
  userAnswers,
  onAnswer
}) => {
  const isMobile = useIsMobile();
  
  // Add a special class for memory recall questions to highlight the urgency
  const questionTypeClass = currentQuestion.type === 'memory-recall' 
    ? 'border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-900/10'
    : '';

  // Get the latest answer for the current question (if any)
  const latestAnswer = userAnswers.length > 0 ? userAnswers[userAnswers.length - 1] : null;

  return (
    <div className={`space-y-3 sm:space-y-6 ${questionTypeClass} rounded-lg p-1`}>
      <QuestionHeader
        currentQuestionIndex={currentQuestionIndex}
        questionsLength={questionsLength}
        timeLeft={timeLeft}
        questionType={currentQuestion.type}
        currentComplexity={currentComplexity}
      />
      
      <QuestionContainer
        currentQuestion={currentQuestion}
        showDistraction={showDistraction}
        showExplanation={showExplanation}
        onAnswer={onAnswer}
      />
      
      {showExplanation && latestAnswer && (
        <AnswerExplanation
          userAnswer={latestAnswer} 
          explanation={currentQuestion.explanation || ""}
        />
      )}
      
      <CustomProgress 
        value={(currentQuestionIndex + 1) / questionsLength * 100} 
        className="h-2" 
        indicatorClassName="bg-gradient-to-r from-blue-400 to-violet-600" 
      />

      {/* Extra info for memory recall questions */}
      {currentQuestion.type === 'memory-recall' && !showExplanation && (
        <div className="text-center text-xs text-amber-600 dark:text-amber-400 animate-pulse font-medium">
          Quick response required - answer from memory!
        </div>
      )}
    </div>
  );
};

export default StressTestQuestion;
