
import { useState } from 'react';
import { UserAnswer, TestQuestion } from '../../types';

interface UseTestProgressProps {
  onCompleteTest: (answers: UserAnswer[]) => void;
}

export const useTestProgress = ({ onCompleteTest }: UseTestProgressProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [processingNextQuestion, setProcessingNextQuestion] = useState(false);

  const handleNextQuestion = (questions: TestQuestion[]) => {
    if (currentQuestionIndex < questions.length - 1) {
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);
    } else {
      endTest();
    }
  };

  const endTest = () => {
    onCompleteTest(userAnswers);
  };

  return {
    currentQuestionIndex,
    setCurrentQuestionIndex,
    userAnswers,
    setUserAnswers,
    showExplanation,
    setShowExplanation,
    processingNextQuestion,
    setProcessingNextQuestion,
    handleNextQuestion,
    endTest
  };
};
