
import React from 'react';
import { TestResults, UserAnswer } from './types';
import StressTestHeader from './stress-test/StressTestHeader';
import StressTestQuestion from './stress-test/StressTestQuestion';
import StressTestIntro from './stress-test/StressTestIntro';
import StressTestLoading from './stress-test/StressTestLoading';
import StressTestResults from './stress-test/StressTestResults';
import CognitiveSetSelector from './stress-test/components/CognitiveSetSelector';
import TestProgressBar from './stress-test/components/TestProgressBar';
import { useStressTest } from './stress-test/hooks/useStressTest';

interface StressTestSectionProps {
  loading: boolean;
  testCompleted: boolean;
  selectedExam: string;
  results: TestResults;
  simulateTest: () => void;
  onCompleteTest: (answers: UserAnswer[]) => void;
}

const StressTestSection: React.FC<StressTestSectionProps> = ({
  loading,
  testCompleted,
  selectedExam,
  results,
  simulateTest,
  onCompleteTest
}) => {
  const {
    isTestActive,
    currentQuestionIndex,
    timeLeft,
    userAnswers,
    questions,
    showExplanation,
    currentComplexity,
    showDistraction,
    selectedCognitiveSet,
    setSelectedCognitiveSet,
    testTimeLeft,
    processingNextQuestion,
    startTest,
    handleAnswer
  } = useStressTest({
    selectedExam,
    onCompleteTest
  });

  // Determine if we can render the question or if we need to show a fallback
  const canRenderQuestion = isTestActive && 
    questions.length > 0 && 
    currentQuestionIndex >= 0 && 
    currentQuestionIndex < questions.length;

  return (
    <div className="space-y-6">
      <StressTestHeader />
      
      <p className="text-sm">
        This scientific test measures your ability to perform under pressure through pattern recognition, 
        reaction speed, and memory exercises specific to {selectedExam}.
      </p>
      
      {!loading && !testCompleted && !isTestActive ? (
        <div>
          <StressTestIntro onStart={() => startTest(selectedCognitiveSet)} />
          <CognitiveSetSelector 
            selectedExam={selectedExam}
            selectedCognitiveSet={selectedCognitiveSet}
            setSelectedCognitiveSet={setSelectedCognitiveSet}
          />
        </div>
      ) : loading ? (
        <StressTestLoading />
      ) : isTestActive ? (
        <div>
          {canRenderQuestion ? (
            <>
              <TestProgressBar 
                testTimeLeft={testTimeLeft}
                currentQuestionIndex={currentQuestionIndex}
                questionsLength={questions.length}
                selectedCognitiveSet={selectedCognitiveSet}
              />
              <StressTestQuestion
                currentQuestion={questions[currentQuestionIndex]}
                currentQuestionIndex={currentQuestionIndex}
                questionsLength={questions.length}
                timeLeft={timeLeft}
                showExplanation={showExplanation}
                showDistraction={showDistraction}
                currentComplexity={currentComplexity}
                userAnswers={userAnswers}
                onAnswer={!processingNextQuestion ? handleAnswer : () => {}}
              />
            </>
          ) : (
            // Fallback UI in case we have no valid question to display
            <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg text-center">
              <p className="text-gray-700 dark:text-gray-300">Loading next question...</p>
            </div>
          )}
        </div>
      ) : (
        <StressTestResults results={results} userAnswers={userAnswers} />
      )}
    </div>
  );
};

export default StressTestSection;
