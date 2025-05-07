
import React from 'react';
import { Button } from '@/components/ui/button';
import { ExamResults } from './types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CustomProgress } from '@/components/ui/custom-progress';
import { Separator } from '@/components/ui/separator';
import { FileText, Timer } from 'lucide-react';

interface ReportSectionProps {
  results: ExamResults;
  onClose: () => void;
  selectedExam: string;
  examDetails?: {
    scoringPattern: string;
    timePerQuestion: string;
    totalTime: string;
    totalQuestions: string;
  };
}

const ReportSection: React.FC<ReportSectionProps> = ({ 
  results, 
  onClose,
  selectedExam,
  examDetails
}) => {
  const { readiness, concept, overall } = results;
  const isNEET = selectedExam === "NEET-UG";
  
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-bold mb-2">Your {selectedExam} Exam Analysis Report</h3>
        <p className="text-muted-foreground">
          Based on our comprehensive assessment, here's your personalized analysis
        </p>
      </div>
      
      {isNEET && examDetails && (
        <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-blue-700 dark:text-blue-300">NEET-UG Exam Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-blue-700 dark:text-blue-300 flex items-center">
                  <FileText className="h-4 w-4 mr-2" />
                  Scoring Pattern: {examDetails.scoringPattern}
                </p>
                <p className="text-xs text-blue-600 dark:text-blue-400 ml-6 mt-1">
                  +4 marks for correct answers, -1 mark for incorrect answers
                </p>
              </div>
              <div>
                <p className="text-sm text-blue-700 dark:text-blue-300 flex items-center">
                  <Timer className="h-4 w-4 mr-2" />
                  Timing: {examDetails.timePerQuestion}
                </p>
                <p className="text-xs text-blue-600 dark:text-blue-400 ml-6 mt-1">
                  {examDetails.totalTime} for {examDetails.totalQuestions}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="border-2 border-purple-100 dark:border-purple-900">
        <CardHeader className="bg-purple-50 dark:bg-purple-900/20">
          <CardTitle className="text-lg text-purple-700 dark:text-purple-300 flex items-center justify-between">
            <span>Overall Readiness Score</span>
            <span className="text-2xl">{overall.score}%</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <CustomProgress 
            value={overall.score} 
            className="h-2 mb-4" 
            indicatorClassName={`bg-gradient-to-r ${
              overall.score >= 80 ? 'from-green-400 to-green-600' :
              overall.score >= 60 ? 'from-blue-400 to-blue-600' :
              overall.score >= 40 ? 'from-amber-400 to-amber-600' :
              'from-red-400 to-red-600'
            }`} 
          />
          
          <div className="text-sm mb-6">
            {overall.analysis}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Readiness Score</div>
              <div className="text-lg font-medium">{readiness.score}%</div>
              <CustomProgress 
                value={readiness.score} 
                className="h-1.5 mt-2" 
                indicatorClassName="bg-blue-500" 
              />
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Concept Mastery</div>
              <div className="text-lg font-medium">{concept.score}%</div>
              <CustomProgress 
                value={concept.score} 
                className="h-1.5 mt-2" 
                indicatorClassName="bg-purple-500" 
              />
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Time Management</div>
              <div className="text-lg font-medium">{Math.round((readiness.score + concept.score) / 2 * 0.9)}%</div>
              <CustomProgress 
                value={Math.round((readiness.score + concept.score) / 2 * 0.9)} 
                className="h-1.5 mt-2" 
                indicatorClassName="bg-amber-500" 
              />
            </div>
          </div>
          
          <Separator className="my-6" />
          
          <div className="space-y-4">
            <h4 className="font-medium text-lg">What to Focus On</h4>
            <div>
              <h5 className="font-medium mb-2">Key Strengths</h5>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                {overall.strengths.split(',').map((strength, idx) => (
                  <li key={idx}>{strength.trim()}</li>
                ))}
              </ul>
            </div>
            
            <div>
              <h5 className="font-medium mb-2">Areas for Improvement</h5>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                {overall.weaknesses.split(',').map((weakness, idx) => (
                  <li key={idx}>{weakness.trim()}</li>
                ))}
              </ul>
            </div>
            
            {isNEET && (
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <h5 className="font-medium mb-2 text-blue-700 dark:text-blue-300">NEET-UG Specific Advice</h5>
                <ul className="list-disc pl-5 space-y-1 text-sm text-blue-600 dark:text-blue-400">
                  <li>Focus on Biology section as it carries the maximum weightage (90 questions).</li>
                  <li>Practice time management - with only 1.06 minutes per question, quick decision-making is crucial.</li>
                  <li>Master the +4/-1 scoring strategy to optimize your attempt pattern.</li>
                  <li>Pay special attention to NCERT content which forms the core of NEET-UG questions.</li>
                </ul>
              </div>
            )}
          </div>
          
          <div className="flex justify-end mt-6">
            <Button onClick={onClose}>Start Over</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportSection;
