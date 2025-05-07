
import React from 'react';
import { Brain } from 'lucide-react';

interface ComplexityIndicatorProps {
  level: number;
}

const ComplexityIndicator: React.FC<ComplexityIndicatorProps> = ({ level }) => {
  return (
    <div className="flex items-center gap-2">
      <Brain className="h-4 w-4 text-violet-500" aria-hidden="true" />
      <span className="text-xs text-gray-500 dark:text-gray-400 sr-only">Complexity:</span>
      <div className="flex">
        {[1, 2, 3, 4, 5].map((complexityLevel) => (
          <div 
            key={complexityLevel}
            className={`h-1.5 w-1.5 rounded-full mx-0.5 ${
              complexityLevel <= level 
                ? 'bg-gradient-to-r from-blue-400 to-violet-500' 
                : 'bg-gray-200 dark:bg-gray-700'
            }`}
            aria-hidden="true"
          />
        ))}
      </div>
      <span className="sr-only">Complexity level {level} out of 5</span>
    </div>
  );
};

export default ComplexityIndicator;
