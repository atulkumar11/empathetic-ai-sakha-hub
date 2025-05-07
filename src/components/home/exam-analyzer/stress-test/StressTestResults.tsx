
import React from 'react';
import { motion } from 'framer-motion';
import { CustomProgress } from '@/components/ui/custom-progress';
import { TestResults, UserAnswer } from '../types';
import { ScrollArea } from '@/components/ui/scroll-area';

interface TestMetrics {
  correctRate: number;
  avgResponseTime: string;
  timeoutsCount: number;
}

interface StressTestResultsProps {
  results: TestResults;
  userAnswers: UserAnswer[];
}

const StressTestResults: React.FC<StressTestResultsProps> = ({ results, userAnswers }) => {
  const getTestMetrics = (): TestMetrics | null => {
    if (userAnswers.length === 0) return null;
    
    const answeredQuestions = userAnswers.filter(a => a.answer !== "TIMEOUT");
    const totalAnswered = answeredQuestions.length;
    const correctAnswers = answeredQuestions.filter(a => a.isCorrect).length;
    const avgResponseTime = answeredQuestions.length > 0
      ? answeredQuestions.reduce((sum, a) => sum + a.timeToAnswer, 0) / answeredQuestions.length
      : 0;
    
    return {
      correctRate: totalAnswered > 0 ? (correctAnswers / totalAnswered) * 100 : 0,
      avgResponseTime: avgResponseTime.toFixed(1),
      timeoutsCount: userAnswers.filter(a => a.answer === "TIMEOUT").length
    };
  };
  
  const metrics = getTestMetrics();
  
  return (
    <ScrollArea className="h-[60vh]">
      <motion.div 
        className="space-y-4 pb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="bg-gradient-to-br from-blue-50 to-violet-50 dark:from-blue-900/20 dark:to-violet-900/20 p-5 rounded-xl border-2 border-blue-100 dark:border-blue-800/50 shadow-lg">
          <div className="flex justify-between items-center">
            <h4 className="font-medium text-blue-700 dark:text-blue-400">Your Cognitive Stress Score:</h4>
            <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">{results.score}%</span>
          </div>
          <CustomProgress 
            value={results.score} 
            className="h-2 my-2" 
            indicatorClassName={`bg-gradient-to-r ${
              results.score >= 80 ? 'from-green-400 to-green-600' :
              results.score >= 65 ? 'from-blue-400 to-blue-600' :
              results.score >= 50 ? 'from-amber-400 to-amber-600' :
              'from-red-400 to-red-600'
            }`} 
          />
          <p className="text-sm">{results.analysis}</p>
          
          {metrics && (
            <div className="grid grid-cols-3 gap-2 mt-4">
              <div className="bg-white/60 dark:bg-gray-800/60 p-3 rounded-lg shadow-sm">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Accuracy</p>
                <p className="font-medium text-blue-700 dark:text-blue-300">{Math.round(metrics.correctRate)}%</p>
              </div>
              <div className="bg-white/60 dark:bg-gray-800/60 p-3 rounded-lg shadow-sm">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Avg Time</p>
                <p className="font-medium text-blue-700 dark:text-blue-300">{metrics.avgResponseTime}s</p>
              </div>
              <div className="bg-white/60 dark:bg-gray-800/60 p-3 rounded-lg shadow-sm">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Time Pressures</p>
                <p className="font-medium text-blue-700 dark:text-blue-300">{metrics.timeoutsCount} timeouts</p>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </ScrollArea>
  );
};

export default StressTestResults;
