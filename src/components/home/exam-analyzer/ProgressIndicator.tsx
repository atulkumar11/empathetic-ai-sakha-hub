
import React from 'react';
import { motion } from 'framer-motion';
import { TestType } from './types';

interface ProgressIndicatorProps {
  progress: number;
  currentTest: TestType;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ progress, currentTest }) => {
  return (
    <motion.div 
      className="relative h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div 
        className="h-full bg-gradient-to-r from-violet-500 to-blue-500"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      />
      
      <div className="absolute top-4 w-full flex justify-between text-xs">
        <div className={`flex flex-col items-center ${currentTest === 'intro' ? 'text-blue-600 font-medium' : ''}`}>
          <div className={`w-2 h-2 rounded-full ${currentTest === 'intro' ? 'bg-blue-600' : 'bg-gray-400'}`} />
          <span className="mt-1">Start</span>
        </div>
        
        <div className={`flex flex-col items-center ${currentTest === 'readiness' ? 'text-blue-600 font-medium' : ''}`}>
          <div className={`w-2 h-2 rounded-full ${currentTest === 'readiness' ? 'bg-blue-600' : progress >= 25 ? 'bg-blue-600' : 'bg-gray-400'}`} />
          <span className="mt-1">Readiness</span>
        </div>
        
        <div className={`flex flex-col items-center ${currentTest === 'concept' ? 'text-blue-600 font-medium' : ''}`}>
          <div className={`w-2 h-2 rounded-full ${currentTest === 'concept' ? 'bg-blue-600' : progress >= 50 ? 'bg-blue-600' : 'bg-gray-400'}`} />
          <span className="mt-1">Concepts</span>
        </div>
        
        <div className={`flex flex-col items-center ${currentTest === 'report' ? 'text-blue-600 font-medium' : ''}`}>
          <div className={`w-2 h-2 rounded-full ${currentTest === 'report' ? 'bg-blue-600' : progress >= 100 ? 'bg-blue-600' : 'bg-gray-400'}`} />
          <span className="mt-1">Report</span>
        </div>
      </div>
    </motion.div>
  );
};

export default ProgressIndicator;
