
import React from 'react';
import { motion } from 'framer-motion';
import { ExamType } from '../types';

interface ReportHeaderProps {
  examLabel?: string;
  weightedScore?: number;
  overallAnalysis?: string;
  getScoreColorClass?: (score: number) => string;
  selectedExam: string; // Added this prop
}

const ReportHeader: React.FC<ReportHeaderProps> = ({ 
  examLabel, 
  weightedScore = 0, 
  overallAnalysis = "",
  getScoreColorClass = () => "from-blue-500 to-blue-600",
  selectedExam
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="text-center mb-4">
        <h3 className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
          Your {selectedExam} Readiness Analysis
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Based on scientific assessment across cognitive stress, readiness, and concept mastery
        </p>
      </div>
      
      <div className="bg-gradient-to-br from-violet-50 to-blue-50 dark:from-violet-900/20 dark:to-blue-900/20 p-6 rounded-xl border-2 border-violet-100 dark:border-violet-800/50 shadow-lg">
        <div className="flex justify-between items-center mb-2">
          <h4 className="font-semibold text-lg">Overall Readiness Score</h4>
          <span className="text-2xl font-bold text-violet-700 dark:text-violet-300">{weightedScore}%</span>
        </div>
        
        <CustomProgressImport 
          value={weightedScore} 
          className="h-3 mb-4"
          indicatorClassName={`bg-gradient-to-r ${getScoreColorClass(weightedScore)}`}
        />
        
        <div className="bg-white/80 dark:bg-gray-800/50 p-4 rounded-lg mb-4">
          <p className="text-sm mb-2">{overallAnalysis}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 italic">
            Score Formula: (Concept Mastery × 0.3) + (Stress Performance × 0.5) + (Confidence Alignment × 0.2)
          </p>
        </div>
      </div>
    </motion.div>
  );
};

// Import this component separately to avoid circular dependencies
const CustomProgressImport = React.lazy(() => 
  import('@/components/ui/custom-progress').then(module => ({ default: module.CustomProgress }))
);

export default ReportHeader;
