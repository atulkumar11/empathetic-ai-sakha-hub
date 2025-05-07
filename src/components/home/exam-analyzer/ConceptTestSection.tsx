
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, CheckCircle2, XCircle, Clock } from 'lucide-react';
import { CustomProgress } from '@/components/ui/custom-progress';
import { TestResults, TestQuestion, SubjectTopic, UserAnswer } from './types';
import { getConceptTopics, getConceptTestQuestions } from './test-questions/conceptTestQuestions';
import { motion } from 'framer-motion';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

interface ConceptTestSectionProps {
  loading: boolean;
  testCompleted: boolean;
  selectedExam: string;
  results: TestResults;
  simulateTest: () => void;
  onCompleteTest: (answers: UserAnswer[]) => void;
}

const ConceptTestSection: React.FC<ConceptTestSectionProps> = ({
  loading,
  testCompleted,
  selectedExam,
  results,
  simulateTest,
  onCompleteTest
}) => {
  const [isTestActive, setIsTestActive] = useState(false);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [topics, setTopics] = useState<SubjectTopic[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState<TestQuestion[]>([]);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [confidenceRating, setConfidenceRating] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [currentSubjectIndex, setCurrentSubjectIndex] = useState(0);
  
  // Initialize topics based on exam type
  React.useEffect(() => {
    if (selectedExam) {
      const examTopics = getConceptTopics(selectedExam);
      setTopics(examTopics);
      setSelectedSubjects([]);
    }
  }, [selectedExam]);
  
  const toggleSubjectSelection = (subject: string) => {
    setSelectedSubjects(prev => {
      // If already selected, remove it
      if (prev.includes(subject)) {
        return prev.filter(s => s !== subject);
      }
      
      // If trying to add more than 2 subjects, don't allow
      if (prev.length >= 2) {
        return prev;
      }
      
      // Add the subject
      return [...prev, subject];
    });
  };
  
  const startTest = () => {
    if (selectedSubjects.length === 0) return;
    
    let allQuestions: TestQuestion[] = [];
    
    // Get 5 questions from each selected subject
    selectedSubjects.forEach(subject => {
      const subjectQuestions = getConceptTestQuestions(selectedExam, subject);
      allQuestions = [...allQuestions, ...subjectQuestions.slice(0, 5)];
    });
    
    setQuestions(allQuestions);
    setCurrentSubjectIndex(0);
    setIsTestActive(true);
    setCurrentQuestionIndex(-1); // Start with confidence question
    setUserAnswers([]);
  };
  
  const handleConfidenceRating = (rating: number) => {
    setConfidenceRating(rating);
  };
  
  const handleAnswer = (answer: string) => {
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = answer === currentQuestion.correctAnswer;
    
    const newAnswer: UserAnswer = {
      questionId: currentQuestion.id,
      answer,
      timeToAnswer: 0,
      isCorrect,
      confidenceLevel: confidenceRating || 3
    };
    
    setUserAnswers(prev => [...prev, newAnswer]);
    setShowExplanation(true);
    
    // Automatically proceed to next question after explanation
    setTimeout(() => {
      setShowExplanation(false);
      
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      } else {
        setIsTestActive(false);
        onCompleteTest(userAnswers);
      }
    }, 2500);
  };
  
  const renderConfidenceQuestion = () => {
    const currentSubject = selectedSubjects[currentSubjectIndex];
    
    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border-2 border-pink-100 dark:border-pink-800 shadow-md">
        <h3 className="text-lg font-medium mb-4">
          How confident are you about your knowledge of {currentSubject}?
        </h3>
        
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
        
        <div className="mt-6">
          <Button
            className="w-full bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700"
            disabled={confidenceRating === null}
            onClick={() => setCurrentQuestionIndex(0)}
          >
            Continue to Questions
          </Button>
        </div>
      </div>
    );
  };
  
  const renderQuestion = () => {
    const currentQuestion = questions[currentQuestionIndex];
    const currentSubjectQuestions = questions.filter(q => 
      q.id.includes(selectedSubjects[currentSubjectIndex].toLowerCase().substring(0, 3))
    );
    const subjectQuestionIndex = currentSubjectQuestions.findIndex(q => q.id === currentQuestion.id);
    
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <Badge variant="outline" className="bg-pink-50 dark:bg-pink-900/30 border-pink-200 dark:border-pink-700">
            Question {currentQuestionIndex + 1}/{questions.length}
          </Badge>
          <Badge variant="outline" className="bg-pink-50 dark:bg-pink-900/30 border-pink-200 dark:border-pink-700">
            {getCurrentSubjectFromQuestionId(currentQuestion.id)}
          </Badge>
        </div>
        
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
              userAnswers[userAnswers.length - 1].isCorrect 
                ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800' 
                : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
            }`}
          >
            <div className="flex items-start">
              {userAnswers[userAnswers.length - 1].isCorrect ? (
                <CheckCircle2 className="text-green-500 mr-2 mt-1 flex-shrink-0" size={18} />
              ) : (
                <XCircle className="text-red-500 mr-2 mt-1 flex-shrink-0" size={18} />
              )}
              <div>
                <p className="font-medium">
                  {userAnswers[userAnswers.length - 1].isCorrect ? 'Correct!' : 'Incorrect'}
                </p>
                <p className="text-sm mt-1">{currentQuestion.explanation}</p>
              </div>
            </div>
          </motion.div>
        )}
        
        <CustomProgress 
          value={(currentQuestionIndex + 1) / questions.length * 100} 
          className="h-2" 
          indicatorClassName="bg-gradient-to-r from-pink-400 to-pink-600" 
        />
      </div>
    );
  };
  
  const getCurrentSubjectFromQuestionId = (questionId: string): string => {
    // Find which subject this question belongs to based on the ID prefix
    for (const subject of selectedSubjects) {
      if (questionId.toLowerCase().includes(subject.toLowerCase().substring(0, 3))) {
        return subject;
      }
    }
    return selectedSubjects[0]; // Fallback
  };
  
  const getEstimatedTestTime = (): number => {
    // Each question takes about 1 minute (60 seconds)
    const questionsPerSubject = 5;
    return selectedSubjects.length * questionsPerSubject * 60;
  };
  
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    return `${minutes} min`;
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium flex items-center">
          <Brain className="mr-2 text-pink-500" size={20} />
          Concept Mastery Test
        </h3>
        <Badge variant="outline" className="bg-pink-50 dark:bg-pink-900/30 border-pink-200 dark:border-pink-700">3 of 3</Badge>
      </div>
      
      <p className="text-sm">
        This test identifies gaps between your perceived knowledge and actual performance on key topics.
      </p>
      
      {!loading && !testCompleted && !isTestActive ? (
        <div className="space-y-6">
          <div className="bg-pink-50 dark:bg-pink-900/20 p-4 rounded-lg border-2 border-pink-100 dark:border-pink-800">
            <h4 className="font-medium mb-2 flex items-center">
              <Brain className="mr-2 text-pink-500" size={16} />
              Instructions:
            </h4>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>Select up to 2 subjects you want to test your knowledge on</li>
              <li>Rate your confidence on each selected subject</li>
              <li>Answer 5 multiple-choice questions per subject</li>
              <li>We'll identify knowledge gaps to optimize your study plan</li>
            </ul>
            
            <div className="mt-3 flex items-center text-sm text-pink-700 dark:text-pink-300">
              <Clock size={16} className="mr-1" />
              <span>Total test time: {formatTime(getEstimatedTestTime())}</span>
            </div>
          </div>
          
          <div className="space-y-3">
            <label className="text-sm font-medium">Select Subjects (max 2)</label>
            <div className="grid grid-cols-1 gap-2">
              {topics.map((topic) => (
                <div key={topic.id} className="flex items-center space-x-2 bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                  <Checkbox 
                    id={topic.id} 
                    checked={selectedSubjects.includes(topic.subject)} 
                    onCheckedChange={() => toggleSubjectSelection(topic.subject)}
                    disabled={selectedSubjects.length >= 2 && !selectedSubjects.includes(topic.subject)}
                  />
                  <label 
                    htmlFor={topic.id} 
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex justify-between w-full"
                  >
                    <span>{topic.subject}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{topic.topics} questions · {formatTime(topic.topics * 60)}</span>
                  </label>
                </div>
              ))}
            </div>
          </div>
          
          <Button 
            className="w-full bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 transition-all duration-300 shadow-md hover:shadow-lg"
            onClick={startTest}
            disabled={selectedSubjects.length === 0}
          >
            Begin Concept Test ({selectedSubjects.length} {selectedSubjects.length === 1 ? 'subject' : 'subjects'})
          </Button>
        </div>
      ) : loading ? (
        <div className="space-y-4">
          <div className="h-40 bg-pink-50 dark:bg-pink-900/20 rounded-lg flex items-center justify-center border-2 border-pink-100 dark:border-pink-800">
            <div className="text-center">
              <Brain className="mx-auto mb-2 animate-pulse text-pink-500" size={40} />
              <p className="text-sm font-medium">Test in progress...</p>
            </div>
          </div>
          <CustomProgress value={40} className="h-2" indicatorClassName="bg-gradient-to-r from-pink-400 to-pink-600" />
          <p className="text-xs text-center text-muted-foreground">Please wait while we analyze your responses</p>
        </div>
      ) : isTestActive ? (
        currentQuestionIndex === -1 ? renderConfidenceQuestion() : renderQuestion()
      ) : (
        <div className="space-y-4">
          <div className="bg-pink-50 dark:bg-pink-900/20 p-4 rounded-lg border-2 border-pink-100 dark:border-pink-800">
            <div className="flex justify-between items-center">
              <h4 className="font-medium">Your Concept Mastery Score:</h4>
              <span className="text-lg font-bold">{results.score}%</span>
            </div>
            <CustomProgress value={results.score} className="h-2 my-2" indicatorClassName="bg-gradient-to-r from-pink-400 to-pink-600" />
            <p className="text-sm">{results.analysis}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConceptTestSection;
