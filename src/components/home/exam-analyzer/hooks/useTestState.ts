
import { useTestStateInitialization } from './test-state/useTestStateInitialization';
import { useTestActions } from './test-state/useTestActions';

export const useTestState = (selectedExamInitial: string = '') => {
  const {
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
  } = useTestStateInitialization(selectedExamInitial);

  const {
    handleStartTest,
    simulateStressTest,
    handleStressTestComplete,
    simulateReadinessTest,
    handleReadinessTestComplete,
    simulateConceptTest,
    handleConceptTestComplete,
    handleNavigation,
    handleStartOver
  } = useTestActions({
    selectedExam,
    setSelectedExam,
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
  });

  return {
    currentTest,
    selectedExam,
    setSelectedExam,
    progress,
    loading,
    testCompleted,
    results,
    handleStartTest,
    simulateStressTest,
    handleStressTestComplete,
    simulateReadinessTest,
    handleReadinessTestComplete,
    simulateConceptTest,
    handleConceptTestComplete,
    handleNavigation,
    handleStartOver
  };
};
