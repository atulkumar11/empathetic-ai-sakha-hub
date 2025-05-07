
import React, { useEffect, useState } from 'react';
import { Timer, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface QuestionTimerProps {
  timeLeft: number;
  questionType?: string;
}

const QuestionTimer: React.FC<QuestionTimerProps> = ({ timeLeft, questionType }) => {
  const [initialTime, setInitialTime] = useState<number>(30); // Default to 30s
  const isRunningLow = timeLeft < 5;
  const isMemoryQuestion = questionType === 'memory-recall';
  
  // Set initial time once when component mounts
  useEffect(() => {
    if (timeLeft > 0) {
      setInitialTime(timeLeft);
    }
  }, []);
  
  // Calculate progress percentage
  const progress = timeLeft / initialTime;
  const circumference = 2 * Math.PI * 18; // Circle radius is 18
  const strokeDashoffset = circumference * (1 - progress);
  
  // Determine color based on time left and question type
  const getColor = () => {
    if (isMemoryQuestion) return 'text-amber-500 stroke-amber-500';
    if (timeLeft > 10) return 'text-blue-500 stroke-blue-500';
    if (timeLeft > 5) return 'text-amber-500 stroke-amber-500';
    return 'text-red-500 stroke-red-500';
  };
  
  return (
    <div className="flex items-center justify-center">
      <div className="relative flex items-center justify-center">
        {/* SVG Circle Progress */}
        <svg width="44" height="44" className="rotate-[-90deg] transform">
          {/* Background Circle */}
          <circle
            cx="22"
            cy="22"
            r="18"
            strokeWidth="2.5"
            className="fill-none stroke-gray-200 dark:stroke-gray-700"
          />
          
          {/* Progress Circle */}
          <motion.circle
            cx="22"
            cy="22"
            r="18"
            strokeWidth="2.5"
            className={`fill-none ${getColor()}`}
            strokeLinecap="round"
            initial={{ strokeDashoffset: 0 }}
            animate={{ strokeDashoffset }}
            style={{
              strokeDasharray: circumference,
            }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </svg>
        
        {/* Timer Icon in Center */}
        <div className="absolute inset-0 flex items-center justify-center">
          {isMemoryQuestion ? (
            <AlertCircle 
              className={`${getColor()} ${isRunningLow || isMemoryQuestion ? 'animate-pulse' : ''}`} 
              size={16} 
            />
          ) : (
            <Timer 
              className={`${getColor()} ${isRunningLow ? 'animate-pulse' : ''}`} 
              size={16} 
            />
          )}
        </div>
      </div>
      
      {/* Time Text */}
      <span 
        className={`ml-2 font-medium ${getColor()} ${isRunningLow || isMemoryQuestion ? 'animate-pulse' : ''}`}
        aria-live={isRunningLow ? "assertive" : "polite"}
      >
        {timeLeft}s
      </span>
    </div>
  );
};

export default QuestionTimer;
