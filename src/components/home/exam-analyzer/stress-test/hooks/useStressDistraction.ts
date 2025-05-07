
import { useRef, useState } from 'react';
import { TestQuestion } from '../../types';

export const useStressDistraction = () => {
  const [showDistraction, setShowDistraction] = useState(false);
  const distractionTimerRef = useRef<NodeJS.Timeout | null>(null);

  const scheduleDistraction = (currentQuestion: TestQuestion) => {
    if (distractionTimerRef.current) {
      clearTimeout(distractionTimerRef.current);
    }

    const distractionDelay = Math.floor(Math.random() * (currentQuestion.timeLimit - 3) * 1000) + 2000;
    
    distractionTimerRef.current = setTimeout(() => {
      setShowDistraction(true);
      
      setTimeout(() => {
        setShowDistraction(false);
      }, 1500);
    }, distractionDelay);
  };

  const clearDistraction = () => {
    if (distractionTimerRef.current) {
      clearTimeout(distractionTimerRef.current);
    }
    setShowDistraction(false);
  };

  return {
    showDistraction,
    scheduleDistraction,
    clearDistraction
  };
};
