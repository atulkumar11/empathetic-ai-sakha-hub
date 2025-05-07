
import React, { useState, useEffect } from 'react';
import { Brain, CheckCircle2, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CustomProgress } from '@/components/ui/custom-progress';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { UserAnswer, TestQuestion } from '../types';
import { getConceptTestQuestions } from '../test-questions/conceptTestQuestions';
import { motion } from 'framer-motion';

interface ConceptTestQuestionsProps {
  selectedExam: string;
  onCompleteTest: (answers: UserAnswer[]) => void;
  examDetails?: any;
  currentSubject?: string;
}

const ConceptTestQuestions: React.FC<ConceptTestQuestionsProps> = ({
  selectedExam,
  onCompleteTest,
  examDetails,
  currentSubject
}) => {
  const [questions, setQuestions] = useState<TestQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [confidenceRating, setConfidenceRating] = useState<number | null>(null);

  // Load questions
  useEffect(() => {
    if (currentSubject) {
      // Get 10 random questions for this subject
      const subjectQuestions = getConceptTestQuestions(selectedExam, currentSubject);
      setQuestions(subjectQuestions.slice(0, 10)); // Limit to 10 questions
      setCurrentQuestionIndex(0);
      setUserAnswers([]);
    }
  }, [selectedExam, currentSubject]);

  const handleAnswer = (answer: string) => {
    if (!questions.length || showExplanation) return;
    
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = answer === currentQuestion.correctAnswer;
    
    const newAnswer: UserAnswer = {
      questionId: currentQuestion.id,
      answer,
      timeToAnswer: 0,
      isCorrect,
      confidenceLevel: confidenceRating || 3,
      subject: currentSubject
    };
    
    setUserAnswers(prev => [...prev, newAnswer]);
    setShowExplanation(true);
    
    // Automatically proceed to next question after explanation
    setTimeout(() => {
      setShowExplanation(false);
      
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prevIndex => prevIndex + 1);
        setConfidenceRating(null); // Reset confidence rating for the next question
      } else {
        onCompleteTest([...userAnswers, newAnswer]);
      }
    }, 2500);
  };

  const handleConfidenceRating = (rating: number) => {
    setConfidenceRating(rating);
  };

  if (!questions.length) {
    return <div className="text-center py-8">Loading questions...</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Badge variant="outline" className="bg-pink-50 dark:bg-pink-900/30 border-pink-200 dark:border-pink-700">
          Question {currentQuestionIndex + 1}/{questions.length}
        </Badge>
        {currentSubject && (
          <Badge variant="outline" className="bg-pink-50 dark:bg-pink-900/30 border-pink-200 dark:border-pink-700">
            {currentSubject}
          </Badge>
        )}
      </div>
      
      {/* Confidence Rating Step */}
      {confidenceRating === null && (
        <Card className="p-6 bg-white dark:bg-gray-800 border-2 border-pink-100 dark:border-pink-800 shadow-md">
          <h3 className="text-lg font-medium mb-4">
            How confident are you about this topic?
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            {currentQuestion.question}
          </p>
          
          <div className="grid grid-cols-5 gap-3 mt-6">
            {[1, 2, 3, 4, 5].map(rating => (
              <motion.div 
                key={rating}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant={confidenceRating === rating ? "default" : "outline"}
                  className={`w-full h-14 ${
                    confidenceRating === rating 
                      ? "bg-gradient-to-r from-pink-500 to-pink-600" 
                      : "hover:bg-pink-50 dark:hover:bg-pink-900/20"
                  }`}
                  onClick={() => handleConfidenceRating(rating)}
                >
                  <div className="flex flex-col items-center">
                    <span className="text-lg font-bold">{rating}</span>
                    <span className="text-xs">
                      {rating === 1 ? "Very low" : 
                       rating === 2 ? "Low" : 
                       rating === 3 ? "Medium" : 
                       rating === 4 ? "High" : "Very high"}
                    </span>
                  </div>
                </Button>
              </motion.div>
            ))}
          </div>
        </Card>
      )}
      
      {/* Question Step */}
      {confidenceRating !== null && (
        <>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border-2 border-pink-100 dark:border-pink-800 shadow-md">
            <h3 className="text-lg font-medium mb-4">{currentQuestion.question}</h3>
            
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => (
                <motion.div 
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button 
                    variant="outline" 
                    className="w-full text-left justify-start p-4 h-auto"
                    onClick={() => handleAnswer(option)}
                    disabled={showExplanation}
                  >
                    <span className="mr-2">{String.fromCharCode(65 + index)}.</span>
                    {option}
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
          
          {showExplanation && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 rounded-lg ${
                userAnswers[userAnswers.length - 1]?.isCorrect 
                  ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800' 
                  : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
              }`}
            >
              <div className="flex items-start">
                {userAnswers[userAnswers.length - 1]?.isCorrect ? (
                  <CheckCircle2 className="text-green-500 mr-2 mt-1 flex-shrink-0" size={18} />
                ) : (
                  <XCircle className="text-red-500 mr-2 mt-1 flex-shrink-0" size={18} />
                )}
                <div>
                  <p className="font-medium">
                    {userAnswers[userAnswers.length - 1]?.isCorrect ? 'Correct!' : 'Incorrect'}
                  </p>
                  <p className="text-sm mt-1">{currentQuestion.explanation}</p>
                </div>
              </div>
            </motion.div>
          )}
        </>
      )}
      
      <CustomProgress 
        value={(currentQuestionIndex + 1) / questions.length * 100} 
        className="h-2" 
        indicatorClassName="bg-gradient-to-r from-pink-400 to-pink-600" 
      />
    </div>
  );
};

export default ConceptTestQuestions;
