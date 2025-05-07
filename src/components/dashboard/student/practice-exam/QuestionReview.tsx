
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, XCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface QuestionReviewProps {
  question: {
    id: number;
    text: string;
    userAnswer: string | string[];
    correctAnswer: string | string[];
    isCorrect: boolean;
    explanation: string;
  };
  questionNumber: number;
}

const QuestionReview: React.FC<QuestionReviewProps> = ({ question, questionNumber }) => {
  const isMultipleChoice = Array.isArray(question.userAnswer);
  
  return (
    <Card className="mb-4">
      <CardContent className="pt-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-medium text-lg flex items-center">
            <span className="bg-gray-100 dark:bg-gray-800 rounded-full w-6 h-6 flex items-center justify-center text-sm mr-2">
              {questionNumber}
            </span>
            Question {questionNumber}
          </h3>
          {question.isCorrect ? (
            <Badge variant="outline" className="flex items-center gap-1 bg-green-50 text-green-700 border-green-200">
              <CheckCircle className="h-3.5 w-3.5" /> Correct
            </Badge>
          ) : (
            <Badge variant="outline" className="flex items-center gap-1 bg-red-50 text-red-700 border-red-200">
              <XCircle className="h-3.5 w-3.5" /> Incorrect
            </Badge>
          )}
        </div>
        
        <div className="mb-4">
          <p className="text-gray-800 dark:text-gray-200">{question.text}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Your Answer</h4>
            <div className={`p-3 rounded-md ${question.isCorrect ? 'bg-green-50 dark:bg-green-900/20' : 'bg-red-50 dark:bg-red-900/20'}`}>
              {isMultipleChoice ? (
                <ul className="list-disc list-inside">
                  {(question.userAnswer as string[]).map((answer, i) => (
                    <li key={i} className="text-gray-800 dark:text-gray-200">{answer}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-800 dark:text-gray-200">{question.userAnswer}</p>
              )}
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Correct Answer</h4>
            <div className="p-3 rounded-md bg-blue-50 dark:bg-blue-900/20">
              {isMultipleChoice ? (
                <ul className="list-disc list-inside">
                  {(question.correctAnswer as string[]).map((answer, i) => (
                    <li key={i} className="text-gray-800 dark:text-gray-200">{answer}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-800 dark:text-gray-200">{question.correctAnswer}</p>
              )}
            </div>
          </div>
        </div>
        
        <div>
          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Explanation</h4>
          <div className="p-3 rounded-md bg-gray-50 dark:bg-gray-800/50">
            <p className="text-gray-700 dark:text-gray-300">{question.explanation}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuestionReview;
