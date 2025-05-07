
import { useState } from 'react';
import { TestType, UserAnswer, TestCompletionState, ExamResults } from '../../types';
import { generateReadinessReport } from '../../utils/readinessReportGenerator';
import { generateConceptReport } from '../../utils/conceptReportGenerator';
import { generateOverallReport } from '../../utils/overallReportGenerator';

interface TestActionsProps {
  selectedExam: string;
  setSelectedExam: (value: string) => void;
  currentTest: TestType;
  setCurrentTest: (test: TestType) => void;
  progress: number;
  setProgress: (value: number) => void;
  loading: boolean;
  setLoading: (value: boolean) => void;
  testCompleted: TestCompletionState;
  setTestCompleted: (value: TestCompletionState) => void;
  results: ExamResults;
  setResults: (value: ExamResults) => void;
}

export const useTestActions = ({
  selectedExam,
  currentTest,
  setCurrentTest,
  progress,
  setProgress,
  loading,
  setLoading,
  testCompleted,
  setTestCompleted,
  results,
  setResults
}: TestActionsProps) => {

  // Start the test flow
  const handleStartTest = () => {
    setCurrentTest('readiness');
    setProgress(25);
  };

  // Readiness Test actions
  const simulateReadinessTest = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };

  const handleReadinessTestComplete = (answers: UserAnswer[]) => {
    // Generate readiness report
    const readinessResult = generateReadinessReport(answers, selectedExam);
    
    // Update completed tests
    setTestCompleted({
      ...testCompleted,
      readiness: true
    });
    
    // Update results
    setResults({
      ...results,
      readiness: readinessResult
    });
    
    // Update progress
    setProgress(50);
  };

  // Concept Test actions
  const simulateConceptTest = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };

  const handleConceptTestComplete = (answers: UserAnswer[]) => {
    // Generate concept test report
    const conceptResult = generateConceptReport(answers, selectedExam);
    
    // Update completed tests
    setTestCompleted({
      ...testCompleted,
      concept: true
    });
    
    // Update results
    setResults({
      ...results,
      concept: conceptResult,
      // Generate overall report based on all test results
      overall: generateOverallReport({
        readiness: results.readiness,
        concept: conceptResult,
        // We're not using stress test anymore
        stress: results.stress 
      }, selectedExam)
    });
    
    // Update progress
    setProgress(75);
  };

  // Handle navigation between tests
  const handleNavigation = (test: TestType) => {
    setCurrentTest(test);
    
    // Update progress based on test
    switch (test) {
      case 'readiness':
        setProgress(25);
        break;
      case 'concept':
        setProgress(50);
        break;
      case 'report':
        setProgress(100);
        break;
      default:
        setProgress(0);
    }
  };

  // Reset and start over
  const handleStartOver = () => {
    setCurrentTest('intro');
    setTestCompleted({
      readiness: false,
      stress: false, // keep for backward compatibility
      concept: false
    });
    setProgress(0);
  };

  return {
    handleStartTest,
    simulateReadinessTest,
    handleReadinessTestComplete,
    simulateConceptTest,
    handleConceptTestComplete,
    handleNavigation,
    handleStartOver
  };
};
