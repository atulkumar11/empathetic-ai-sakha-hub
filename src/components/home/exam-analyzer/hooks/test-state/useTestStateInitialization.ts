
import { useState } from 'react';
import { TestType, TestCompletionState, ExamResults } from '../../types';

export const useTestStateInitialization = (selectedExamInitial: string = 'neet') => {
  const [currentTest, setCurrentTest] = useState<TestType>('intro');
  const [selectedExam, setSelectedExam] = useState(selectedExamInitial || 'neet');
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [testCompleted, setTestCompleted] = useState<TestCompletionState>({
    readiness: false,
    stress: false, // kept for backward compatibility
    concept: false
  });
  const [results, setResults] = useState<ExamResults>({
    stress: { score: 0, level: '', analysis: '', strengths: [], improvements: [] },
    readiness: { score: 0, level: '', analysis: '', strengths: [], improvements: [] },
    concept: { score: 0, level: '', analysis: '', strengths: [], improvements: [] },
    overall: { score: 0, level: '', analysis: '', strengths: [], improvements: [] }
  });

  return {
    currentTest,
    setCurrentTest,
    selectedExam,
    setSelectedExam,
    progress,
    setProgress,
    loading,
    setLoading,
    testCompleted,
    setTestCompleted,
    results,
    setResults
  };
};
