
import React from 'react';
import { TestType, TestCompletionState, ExamResults, ExamType } from './types';
import { Button } from '@/components/ui/button';
import IntroSection from './IntroSection';
import ReadinessTestSection from './ReadinessTestSection';
import ConceptTestSection from './concept-test/ConceptTestSection';
import ReportSection from './ReportSection';
import ProgressIndicator from './ProgressIndicator';
import { UserAnswer } from './types';
import { Badge } from '@/components/ui/badge';
import { FileText, Timer } from 'lucide-react';
import { examSpecificDetails } from './testDataService';

interface TestContainerProps {
  currentTest: TestType;
  selectedExam: string;
  setSelectedExam: (value: string) => void;
  loading: boolean;
  testCompleted: TestCompletionState;
  progress: number;
  results: ExamResults;
  examTypes: ExamType[];
  simulateReadinessTest: () => void;
  simulateConceptTest: () => void;
  handleStartTest: () => void;
  handleStartOver: () => void;
  handleReadinessTestComplete: (answers: UserAnswer[]) => void;
  handleConceptTestComplete: (answers: UserAnswer[]) => void;
  handleNavigation: (test: TestType) => void;
}

const TestContainer: React.FC<TestContainerProps> = ({
  currentTest,
  selectedExam,
  setSelectedExam,
  loading,
  testCompleted,
  progress,
  results,
  examTypes,
  simulateReadinessTest,
  simulateConceptTest,
  handleStartTest,
  handleStartOver,
  handleReadinessTestComplete,
  handleConceptTestComplete,
  handleNavigation,
}) => {
  // Check if selected exam is NEET-UG
  const isNEET = selectedExam === "NEET-UG";
  const examDetails = isNEET ? examSpecificDetails["NEET-UG"] : null;
  
  return (
    <div className="my-4 space-y-6">
      <ProgressIndicator progress={progress} currentTest={currentTest} />
      
      {isNEET && examDetails && currentTest !== 'intro' && (
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-md p-3">
          <div className="flex justify-between items-center flex-wrap gap-2">
            <div className="text-sm font-medium text-blue-700 dark:text-blue-300">
              NEET-UG Exam Pattern
            </div>
            <div className="flex gap-2">
              <Badge variant="outline" className="bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300 border-blue-200">
                <FileText className="h-3 w-3 mr-1" />
                {examDetails.scoringPattern}
              </Badge>
              <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300 border-green-200">
                <Timer className="h-3 w-3 mr-1" />
                {examDetails.timePerQuestion}
              </Badge>
            </div>
          </div>
        </div>
      )}
      
      <div className="min-h-[50vh]">
        {currentTest === 'intro' && (
          <IntroSection 
            examTypes={examTypes} 
            selectedExam={selectedExam}
            setSelectedExam={setSelectedExam}
            onStartTest={handleStartTest}
          />
        )}
        
        {currentTest === 'readiness' && (
          <ReadinessTestSection 
            loading={loading}
            testCompleted={testCompleted.readiness}
            selectedExam={selectedExam}
            results={results.readiness}
            simulateTest={simulateReadinessTest}
            onCompleteTest={handleReadinessTestComplete}
            onContinue={() => handleNavigation('concept')}
            examDetails={isNEET ? examDetails : undefined}
          />
        )}
        
        {currentTest === 'concept' && (
          <ConceptTestSection
            loading={loading}
            testCompleted={testCompleted.concept}
            selectedExam={selectedExam}
            results={results.concept}
            simulateTest={simulateConceptTest}
            onCompleteTest={handleConceptTestComplete}
            onContinue={() => handleNavigation('report')}
            examDetails={isNEET ? examDetails : undefined}
          />
        )}
        
        {currentTest === 'report' && (
          <ReportSection
            results={results}
            onClose={handleStartOver}
            selectedExam={selectedExam}
            examDetails={isNEET ? examDetails : undefined}
          />
        )}
      </div>
    </div>
  );
};

export default TestContainer;
