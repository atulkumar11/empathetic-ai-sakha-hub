
import React from 'react';
import { Button } from "@/components/ui/button";
import { TestResults } from './types';
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from '@/components/ui/card';
import { FileText, Timer } from 'lucide-react';

interface ReadinessTestSectionProps {
  loading: boolean;
  testCompleted: boolean;
  selectedExam: string;
  results: TestResults | null;
  simulateTest: () => void;
  onCompleteTest: (answers: any[]) => void;
  onContinue: () => void;
  examDetails?: {
    scoringPattern: string;
    timePerQuestion: string;
    totalTime: string;
    totalQuestions: string;
  };
}

const ReadinessTestSection: React.FC<ReadinessTestSectionProps> = ({
  loading,
  testCompleted,
  selectedExam,
  results,
  simulateTest,
  onCompleteTest,
  onContinue,
  examDetails
}) => {
  const [mockAnswers, setMockAnswers] = React.useState<any[]>([]);
  const [subjectSelections, setSubjectSelections] = React.useState({
    physics: true,
    chemistry: true,
    biology: true,
    mathematics: true
  });

  const handleSubjectToggle = (subject: string, checked: boolean) => {
    setSubjectSelections(prev => ({
      ...prev,
      [subject]: checked
    }));
  };

  const isNEET = selectedExam === "NEET-UG";

  const handleStartTest = () => {
    // Reset mock answers
    setMockAnswers([]);
    
    // Simulate API call or test loading
    simulateTest();
    
    // After simulation completes, generate mock results
    setTimeout(() => {
      // Generate random test answers
      const answers = Array(10).fill(null).map((_, i) => ({
        questionId: `q${i}`,
        answer: Math.random() > 0.3 ? "correct" : "incorrect",
        timeToAnswer: Math.floor(Math.random() * 45) + 15, // 15-60 seconds
        isCorrect: Math.random() > 0.3
      }));
      setMockAnswers(answers);
      onCompleteTest(answers);
    }, 2000);
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-32 w-full" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
        </div>
      </div>
    );
  }

  if (testCompleted && results) {
    return (
      <div className="space-y-6">
        <div className="text-center py-6">
          <h3 className="text-xl font-bold mb-2">Readiness Analysis Complete</h3>
          <p className="text-muted-foreground mb-6">
            Based on your performance, we've analyzed your readiness for {selectedExam}
          </p>
        </div>
        
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-xl shadow-inner">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-lg font-semibold">Your Readiness Score</h4>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              {results.score}%
            </span>
          </div>
          
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mb-4">
            <div 
              className={cn(
                "h-full rounded-full", 
                results.score >= 80 ? "bg-green-500" : 
                results.score >= 60 ? "bg-blue-500" : 
                results.score >= 40 ? "bg-yellow-500" : "bg-red-500"
              )}
              style={{ width: `${results.score}%` }}
            />
          </div>
          
          <div className="text-sm mb-4">
            {results.analysis}
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm">
              <p className="text-sm text-gray-500 dark:text-gray-400">Strengths</p>
              <p>{results.strengths || "Analyzing your strengths..."}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm">
              <p className="text-sm text-gray-500 dark:text-gray-400">Areas for Improvement</p>
              <p>{results.weaknesses || "Analyzing areas for improvement..."}</p>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end">
          <Button onClick={onContinue}>Continue to Concept Analysis</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold mb-2">Test Your Exam Readiness</h3>
        <p className="text-muted-foreground">
          Let's assess your current readiness level for the {selectedExam} exam with a quick diagnostic test
        </p>
      </div>
      
      {isNEET && examDetails && (
        <Card className="p-4 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
          <div className="space-y-2">
            <h4 className="font-medium text-blue-700 dark:text-blue-300">NEET-UG Exam Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div className="flex items-center">
                <FileText className="h-4 w-4 text-blue-600 dark:text-blue-400 mr-2" />
                <span>Scoring: {examDetails.scoringPattern}</span>
              </div>
              <div className="flex items-center">
                <Timer className="h-4 w-4 text-blue-600 dark:text-blue-400 mr-2" />
                <span>Time: {examDetails.timePerQuestion}</span>
              </div>
            </div>
          </div>
        </Card>
      )}
      
      <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-md">
        <h4 className="font-medium mb-3">Select subjects to include in your assessment:</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {isNEET ? (
            <>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="physics" 
                  checked={subjectSelections.physics}
                  onCheckedChange={(checked) => handleSubjectToggle('physics', !!checked)} 
                />
                <label htmlFor="physics" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Physics (45 Questions)
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="chemistry" 
                  checked={subjectSelections.chemistry}
                  onCheckedChange={(checked) => handleSubjectToggle('chemistry', !!checked)} 
                />
                <label htmlFor="chemistry" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Chemistry (45 Questions)
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="biology" 
                  checked={subjectSelections.biology}
                  onCheckedChange={(checked) => handleSubjectToggle('biology', !!checked)} 
                />
                <label htmlFor="biology" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Biology (90 Questions)
                </label>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="subject1" 
                  checked={subjectSelections.physics}
                  onCheckedChange={(checked) => handleSubjectToggle('physics', !!checked)} 
                />
                <label htmlFor="subject1" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Subject 1
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="subject2" 
                  checked={subjectSelections.chemistry}
                  onCheckedChange={(checked) => handleSubjectToggle('chemistry', !!checked)} 
                />
                <label htmlFor="subject2" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Subject 2
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="subject3" 
                  checked={subjectSelections.mathematics}
                  onCheckedChange={(checked) => handleSubjectToggle('mathematics', !!checked)} 
                />
                <label htmlFor="subject3" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Subject 3
                </label>
              </div>
            </>
          )}
        </div>
      </div>
      
      <div className="flex justify-end">
        <Button 
          disabled={!Object.values(subjectSelections).some(Boolean)}
          onClick={handleStartTest}
        >
          Start Readiness Test
        </Button>
      </div>
    </div>
  );
};

export default ReadinessTestSection;
