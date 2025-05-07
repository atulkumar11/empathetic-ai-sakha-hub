
import React from 'react';
import { TestResults, UserAnswer } from '../../types';
import { CheckCircle2, AlertTriangle, Brain } from 'lucide-react';
import { CustomProgress } from '@/components/ui/custom-progress';
import { motion } from 'framer-motion';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ConceptTestResultsProps {
  results: TestResults;
  userAnswers?: UserAnswer[];
  subjects?: string[];
}

const ConceptTestResults: React.FC<ConceptTestResultsProps> = ({ 
  results,
  userAnswers = [],
  subjects = []
}) => {
  const correctAnswers = userAnswers.filter(a => a.isCorrect).length;
  const totalAnswers = userAnswers.length;
  const percentCorrect = totalAnswers > 0 ? Math.round((correctAnswers / totalAnswers) * 100) : 0;
  
  // Calculate per-subject results if available
  const subjectResults = subjects.map(subject => {
    const subjectAnswers = userAnswers.filter(a => 
      a.questionId.toLowerCase().includes(subject.substring(0, 3).toLowerCase())
    );
    const correct = subjectAnswers.filter(a => a.isCorrect).length;
    const total = subjectAnswers.length;
    const percent = total > 0 ? Math.round((correct / total) * 100) : 0;
    
    return {
      subject,
      correct,
      total,
      percent
    };
  });
  
  const getScoreColorClass = (score: number) => {
    if (score >= 80) return "from-green-500 to-green-600";
    if (score >= 60) return "from-blue-500 to-blue-600";
    if (score >= 40) return "from-amber-500 to-amber-600";
    return "from-red-500 to-red-600";
  };

  return (
    <ScrollArea className="h-[60vh] pr-4 -mr-4">
      <div className="space-y-6 pb-4">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border-2 border-pink-100 dark:border-pink-800 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Brain className="mr-2 text-pink-500" size={24} />
              <h3 className="text-lg font-medium">
                Concept Test Results
                {subjects.length === 1 && <span className="text-sm ml-2 text-gray-500">({subjects[0]})</span>}
              </h3>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              {percentCorrect}%
            </span>
          </div>
          
          <CustomProgress 
            value={percentCorrect} 
            className="h-2 mb-4" 
            indicatorClassName={`bg-gradient-to-r ${getScoreColorClass(percentCorrect)}`} 
          />
          
          <div className="flex items-center justify-between text-sm mb-6">
            <span>
              <span className="font-medium">{correctAnswers}</span> correct out of {totalAnswers} questions
            </span>
            <span className={`font-medium ${
              results.level === 'Excellent' || results.level === 'Good' 
                ? 'text-green-600 dark:text-green-400' 
                : 'text-amber-600 dark:text-amber-400'
            }`}>
              {results.level || 'Average'} level
            </span>
          </div>
          
          {/* Subject breakdown */}
          {subjects.length > 1 && (
            <div className="mb-6">
              <h4 className="font-medium mb-3">Subject Breakdown:</h4>
              <div className="space-y-3">
                {subjectResults.map((result, index) => (
                  <div key={index} className="bg-gray-50 dark:bg-gray-800/60 p-3 rounded-lg">
                    <div className="flex justify-between mb-1">
                      <span className="font-medium">{result.subject}</span>
                      <span>{result.percent}%</span>
                    </div>
                    <CustomProgress 
                      value={result.percent} 
                      className="h-1.5" 
                      indicatorClassName={`bg-gradient-to-r ${getScoreColorClass(result.percent)}`} 
                    />
                    <div className="text-xs mt-1 text-gray-500">
                      {result.correct} correct out of {result.total} questions
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="space-y-4">
            <div className="bg-pink-50 dark:bg-pink-900/20 p-4 rounded-lg">
              <p className="text-sm">{results.analysis || 'Your concept understanding is generally good, but there are some areas that need improvement.'}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(results.strengths && results.strengths.length > 0) && (
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <h4 className="font-medium text-green-700 dark:text-green-400 flex items-center mb-2">
                    <CheckCircle2 className="mr-2" size={16} />
                    Strengths
                  </h4>
                  <ul className="list-disc list-inside space-y-1">
                    {results.strengths.map((strength, index) => (
                      <li key={index} className="text-sm">{strength}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {(results.improvements && results.improvements.length > 0) && (
                <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg">
                  <h4 className="font-medium text-amber-700 dark:text-amber-400 flex items-center mb-2">
                    <AlertTriangle className="mr-2" size={16} />
                    Areas to Improve
                  </h4>
                  <ul className="list-disc list-inside space-y-1">
                    {results.improvements.map((improvement, index) => (
                      <li key={index} className="text-sm">{improvement}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
};

export default ConceptTestResults;
