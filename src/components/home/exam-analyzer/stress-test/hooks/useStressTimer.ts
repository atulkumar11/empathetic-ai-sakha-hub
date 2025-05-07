
import { useRef, useEffect } from 'react';

interface UseStressTimerProps {
  timeLeft: number;
  setTimeLeft: React.Dispatch<React.SetStateAction<number>>;
  isTestActive: boolean;
  handleNextQuestion: () => void;
  setShowExplanation: (show: boolean) => void;
  setProcessingNextQuestion: (processing: boolean) => void;
  currentQuestion?: {
    timeLimit: number;
  };
}

export const useStressTimer = ({
  timeLeft,
  setTimeLeft,
  isTestActive,
  handleNextQuestion,
  setShowExplanation,
  setProcessingNextQuestion,
  currentQuestion
}: UseStressTimerProps) => {
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);

  const startTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    startTimeRef.current = Date.now();
    
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (timerRef.current) {
            clearInterval(timerRef.current);
          }
          
          setShowExplanation(true);
          setProcessingNextQuestion(true);
          
          setTimeout(() => {
            setShowExplanation(false);
            setProcessingNextQuestion(false);
            handleNextQuestion();
          }, 3000);
          
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    if (isTestActive && currentQuestion) {
      startTimer();
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isTestActive, currentQuestion]);

  return {
    startTimer,
    startTimeRef
  };
};
