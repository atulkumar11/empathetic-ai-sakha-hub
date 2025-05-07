
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, ExternalLink, Clock, FileText, CheckCircle, LoaderCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';

interface Exam {
  id: string;
  title: string;
  subject: string;
  duration: string;
  questions: number;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Mixed';
  urlPath: string;
  completed?: boolean;
  score?: number;
  dateTaken?: string;
  dateCompleted?: string;
}

interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

// Mock data for exams
const upcomingExams: Exam[] = [
  {
    id: 'exam1',
    title: 'Physics Full Mock Test',
    subject: 'Physics',
    duration: '3 hours',
    questions: 90,
    difficulty: 'Medium',
    urlPath: '/exams/physics-mock-1'
  },
  {
    id: 'exam2',
    title: 'Mathematics Practice Set',
    subject: 'Mathematics',
    duration: '2 hours',
    questions: 60,
    difficulty: 'Hard',
    urlPath: '/exams/math-practice-1'
  },
  {
    id: 'exam3',
    title: 'Chemistry Concepts Quiz',
    subject: 'Chemistry',
    duration: '1.5 hours',
    questions: 45,
    difficulty: 'Easy',
    urlPath: '/exams/chemistry-quiz-1'
  }
];

const completedExams: Exam[] = [
  {
    id: 'exam4',
    title: 'Biology Quick Assessment',
    subject: 'Biology',
    duration: '1 hour',
    questions: 30,
    difficulty: 'Easy',
    urlPath: '/exams/bio-assess-1',
    completed: true,
    score: 85,
    dateTaken: '2023-04-12',
    dateCompleted: '2023-04-12'
  },
  {
    id: 'exam5',
    title: 'Physics Mechanics Test',
    subject: 'Physics',
    duration: '2 hours',
    questions: 45,
    difficulty: 'Medium',
    urlPath: '/exams/physics-mech-1',
    completed: true,
    score: 72,
    dateTaken: '2023-04-05',
    dateCompleted: '2023-04-05'
  }
];

// Sample questions for exams
const sampleQuestions: Record<string, Question[]> = {
  'exam1': [
    {
      id: 'q1',
      text: 'What is the correct expression for the kinetic energy of a moving object?',
      options: ['E = mc²', 'E = ½mv²', 'E = mgh', 'E = mv'],
      correctAnswer: 1,
      explanation: 'Kinetic energy is calculated as E = ½mv², where m is mass and v is velocity.'
    },
    {
      id: 'q2',
      text: 'A 2kg object moving at 3m/s has what kinetic energy?',
      options: ['3 J', '6 J', '9 J', '18 J'],
      correctAnswer: 1,
      explanation: 'Kinetic energy = ½mv² = 0.5 × 2 × 3² = 9 J'
    },
    {
      id: 'q3',
      text: 'Which of these is NOT a unit of energy?',
      options: ['Joule', 'Watt', 'Calorie', 'Electron-volt'],
      correctAnswer: 1,
      explanation: 'Watt is a unit of power (rate of energy transfer), not energy itself.'
    }
  ],
  'exam2': [
    {
      id: 'q1',
      text: 'If f(x) = 2x² + 3x - 5, what is f\'(x)?',
      options: ['f\'(x) = 4x + 3', 'f\'(x) = 2x + 3', 'f\'(x) = 4x² + 3', 'f\'(x) = 4x - 5'],
      correctAnswer: 0,
      explanation: 'The derivative of f(x) = 2x² + 3x - 5 is f\'(x) = 4x + 3 using the power rule.'
    },
    {
      id: 'q2',
      text: 'What is the solution to the equation 3x² - 12 = 0?',
      options: ['x = ±2', 'x = ±4', 'x = ±√6', 'x = ±√3'],
      correctAnswer: 0,
      explanation: '3x² - 12 = 0 → 3x² = 12 → x² = 4 → x = ±2'
    }
  ],
  'exam3': [
    {
      id: 'q1',
      text: 'Which of the following is NOT a type of chemical bond?',
      options: ['Covalent bond', 'Ionic bond', 'Magnetic bond', 'Metallic bond'],
      correctAnswer: 2,
      explanation: 'Magnetic bond is not a type of chemical bond. The three main types are covalent, ionic, and metallic bonds.'
    }
  ]
};

// Sample review data for completed exams
const examReviewData: Record<string, {
  questions: Question[],
  userAnswers: number[],
  timeSpent: string,
  correctAnswers: number
}> = {
  'exam4': {
    questions: [
      {
        id: 'q1',
        text: 'Which organelle is responsible for photosynthesis in plant cells?',
        options: ['Mitochondria', 'Chloroplast', 'Golgi body', 'Lysosome'],
        correctAnswer: 1,
        explanation: 'Chloroplasts are the organelles where photosynthesis takes place in plant cells.'
      },
      {
        id: 'q2',
        text: 'What is the function of the nucleus in a cell?',
        options: ['Energy production', 'Protein synthesis', 'Storage of genetic material', 'Waste disposal'],
        correctAnswer: 2,
        explanation: 'The nucleus contains the cell\'s genetic material (DNA) and controls cellular activities.'
      }
    ],
    userAnswers: [1, 1],
    timeSpent: '42 minutes',
    correctAnswers: 1
  },
  'exam5': {
    questions: [
      {
        id: 'q1',
        text: 'What does Newton\'s Second Law of Motion state?',
        options: [
          'For every action, there is an equal and opposite reaction',
          'Force equals mass times acceleration (F=ma)',
          'An object in motion stays in motion unless acted upon by a force',
          'Energy cannot be created or destroyed'
        ],
        correctAnswer: 1,
        explanation: 'Newton\'s Second Law states that force is equal to mass times acceleration (F=ma).'
      },
      {
        id: 'q2',
        text: 'What is the SI unit of force?',
        options: ['Watt', 'Joule', 'Newton', 'Pascal'],
        correctAnswer: 2,
        explanation: 'The SI unit of force is the Newton (N), named after Sir Isaac Newton.'
      }
    ],
    userAnswers: [1, 3],
    timeSpent: '52 minutes',
    correctAnswers: 1
  }
};

interface PracticeExamFeatureProps {
  displayCount?: number;
}

export default function PracticeExamFeature({ displayCount = 3 }: PracticeExamFeatureProps) {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'upcoming' | 'completed'>('upcoming');
  const [examInProgress, setExamInProgress] = useState<Exam | null>(null);
  const [showExamEnvironment, setShowExamEnvironment] = useState(false);
  const [showExamReview, setShowExamReview] = useState(false);
  const [reviewingExam, setReviewingExam] = useState<Exam | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number | null>>({});
  const [examSubmitting, setExamSubmitting] = useState(false);
  const [examTimer, setExamTimer] = useState<number | null>(null);
  const [isLoadingExam, setIsLoadingExam] = useState(false);
  
  const visibleUpcomingExams = upcomingExams.slice(0, displayCount);
  const visibleCompletedExams = completedExams.slice(0, displayCount);
  
  const handleExamClick = (exam: Exam) => {
    // Modified to show exam details or review
    if (exam.completed) {
      handleReviewExam(exam);
    } else {
      toast({
        title: "Exam Details",
        description: `${exam.title}: ${exam.questions} questions, ${exam.duration}`,
        duration: 3000,
      });
    }
  };
  
  const handleStartExam = async (exam: Exam, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the parent onClick
    
    setIsLoadingExam(true);
    
    try {
      // Simulate loading exam data
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSelectedAnswers({});
      setCurrentQuestionIndex(0);
      
      // Convert duration string to minutes for timer
      const durationMatch = exam.duration.match(/(\d+)/);
      const durationMinutes = durationMatch ? parseInt(durationMatch[0]) * 60 : 180 * 60; // Default 3 hours in seconds
      
      setExamTimer(durationMinutes);
      setExamInProgress(exam);
      setShowExamEnvironment(true);
      
      toast({
        title: "Exam Started",
        description: `You've started ${exam.title}. Good luck!`,
        duration: 5000,
      });
      
      window.scrollTo(0, 0); // Scroll to top
    } catch (error) {
      toast({
        title: "Error",
        description: "Could not load exam. Please try again.",
        variant: "destructive",
      });
      console.error("Error starting exam:", error);
    } finally {
      setIsLoadingExam(false);
    }
  };
  
  const handleReviewExam = (exam: Exam, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation(); // Prevent triggering the parent onClick
    }
    
    setReviewingExam(exam);
    setShowExamReview(true);
    
    toast({
      title: "Exam Review Mode",
      description: "Review your answers and see explanations for each question.",
      duration: 5000,
    });
    
    window.scrollTo(0, 0); // Scroll to top
  };

  const closeExamEnvironment = () => {
    // Confirm before closing
    if (Object.keys(selectedAnswers).length > 0) {
      const confirmed = window.confirm("Are you sure you want to leave the exam? Your progress will be lost.");
      if (!confirmed) return;
    }
    
    setShowExamEnvironment(false);
    setExamInProgress(null);
    setExamTimer(null);
    setSelectedAnswers({});
  };
  
  const closeExamReview = () => {
    setShowExamReview(false);
    setReviewingExam(null);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'Hard': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default: return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
    }
  };
  
  const handleAnswerSelect = (questionId: string, answerIndex: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };
  
  const handleNextQuestion = () => {
    if (!examInProgress) return;
    
    const questions = sampleQuestions[examInProgress.id] || [];
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };
  
  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };
  
  const handleSubmitExam = async () => {
    if (!examInProgress) return;
    
    setExamSubmitting(true);
    
    try {
      // Simulate API call to submit exam
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Calculate score based on selected answers
      const questions = sampleQuestions[examInProgress.id] || [];
      let correctCount = 0;
      
      questions.forEach(question => {
        if (selectedAnswers[question.id] === question.correctAnswer) {
          correctCount++;
        }
      });
      
      const score = questions.length > 0 
        ? Math.round((correctCount / questions.length) * 100) 
        : 0;
      
      toast({
        title: "Exam Submitted",
        description: `Your score: ${score}%. ${correctCount} out of ${questions.length} questions correct.`,
        duration: 5000,
      });
      
      // Close exam and show review
      setShowExamEnvironment(false);
      
      // Add to completed exams
      const completedExam: Exam = {
        ...examInProgress,
        completed: true,
        score,
        dateTaken: new Date().toISOString().split('T')[0],
        dateCompleted: new Date().toISOString().split('T')[0]
      };
      
      // In a real app, we would update the database here
      console.log("Exam completed:", completedExam);
      
      // Show review for the completed exam
      setTimeout(() => {
        handleReviewExam(completedExam);
      }, 500);
      
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit exam. Please try again.",
        variant: "destructive",
      });
      console.error("Error submitting exam:", error);
    } finally {
      setExamSubmitting(false);
      setExamInProgress(null);
      setExamTimer(null);
    }
  };
  
  // Timer effect
  useEffect(() => {
    if (examTimer === null || !showExamEnvironment) return;
    
    const interval = setInterval(() => {
      setExamTimer(prev => {
        if (prev === null || prev <= 1) {
          clearInterval(interval);
          // Auto-submit when time is up
          if (examInProgress) {
            toast({
              title: "Time's Up!",
              description: "Your exam is being submitted automatically.",
              variant: "destructive",
            });
            handleSubmitExam();
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(interval);
  }, [examTimer, showExamEnvironment, examInProgress]);
  
  const formatTime = (seconds: number | null) => {
    if (seconds === null) return "00:00:00";
    
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    return [
      hours.toString().padStart(2, "0"),
      minutes.toString().padStart(2, "0"),
      secs.toString().padStart(2, "0")
    ].join(":");
  };

  // Exam Environment Component
  const ExamEnvironment = ({ exam }: { exam: Exam }) => {
    const questions = sampleQuestions[exam.id] || [];
    const currentQuestion = questions[currentQuestionIndex];
    
    if (!currentQuestion) {
      return (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70"
        >
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-auto p-6">
            <div className="text-center py-8">
              <h2 className="text-2xl font-bold mb-4">No Questions Available</h2>
              <p className="mb-6">This exam has no questions yet.</p>
              <Button onClick={closeExamEnvironment}>Close Exam</Button>
            </div>
          </div>
        </motion.div>
      );
    }
    
    const answeredCount = Object.keys(selectedAnswers).length;
    const progress = questions.length > 0 ? (answeredCount / questions.length) * 100 : 0;
    
    return (
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70"
      >
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-auto p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold">{exam.title}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {currentQuestionIndex + 1} of {questions.length} questions
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Badge className={getDifficultyColor(exam.difficulty)}>
                {exam.difficulty}
              </Badge>
              <span className="text-sm font-medium flex items-center gap-2 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 px-2 py-1 rounded-md">
                <Clock className="h-4 w-4" />
                {formatTime(examTimer)}
              </span>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={closeExamEnvironment} 
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>
          
          <div className="mb-6">
            <Progress value={progress} className="h-2 w-full bg-gray-100 dark:bg-gray-800" />
            <div className="flex justify-between mt-1 text-xs text-gray-500 dark:text-gray-400">
              <span>Progress: {answeredCount}/{questions.length} questions answered</span>
              <span>{Math.round(progress)}% complete</span>
            </div>
          </div>
          
          <div className="space-y-8">
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-medium mb-3">Question {currentQuestionIndex + 1}</h3>
              <p className="mb-6 text-gray-800 dark:text-gray-200">{currentQuestion.text}</p>
              
              <div className="space-y-3">
                {currentQuestion.options.map((option, index) => (
                  <div 
                    key={index} 
                    onClick={() => handleAnswerSelect(currentQuestion.id, index)}
                    className={`p-3 border rounded-lg cursor-pointer transition-all ${
                      selectedAnswers[currentQuestion.id] === index 
                        ? 'bg-blue-50 dark:bg-blue-900/30 border-blue-500 dark:border-blue-500' 
                        : 'hover:bg-gray-50 dark:hover:bg-gray-800 border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    <div className="flex items-center">
                      <div className={`w-6 h-6 flex items-center justify-center rounded-full mr-3 ${
                        selectedAnswers[currentQuestion.id] === index 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                      }`}>
                        {String.fromCharCode(65 + index)}
                      </div>
                      <span>{option}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="mt-8 flex justify-between">
            <Button 
              variant="outline" 
              onClick={handlePreviousQuestion}
              disabled={currentQuestionIndex === 0}
            >
              Previous
            </Button>
            
            <Button 
              variant="outline"
              onClick={handleNextQuestion}
              disabled={currentQuestionIndex === questions.length - 1}
            >
              Next
            </Button>
          </div>
          
          <div className="mt-6 flex justify-end">
            <Button 
              onClick={handleSubmitExam}
              disabled={examSubmitting}
              className="bg-green-600 hover:bg-green-700"
            >
              {examSubmitting ? (
                <>
                  <LoaderCircle className="h-4 w-4 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : 'Submit Exam'}
            </Button>
          </div>
        </div>
      </motion.div>
    );
  };

  // Exam Review Component
  const ExamReview = ({ exam }: { exam: Exam }) => {
    const reviewData = examReviewData[exam.id];
    
    if (!reviewData) {
      return (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70"
        >
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-auto p-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">{exam.title} - Review</h2>
              <p className="text-gray-500 dark:text-gray-400 mb-6">No review data available for this exam.</p>
              <Button onClick={closeExamReview}>Close Review</Button>
            </div>
          </div>
        </motion.div>
      );
    }
    
    return (
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70"
      >
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-auto p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold">{exam.title} - Review</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Completed on: {exam.dateCompleted} | Score: {exam.score}%
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                Completed
              </Badge>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={closeExamReview} 
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>
          
          <div className="space-y-8">
            {/* Performance Summary */}
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-3">Performance Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white dark:bg-gray-900 p-3 rounded shadow-sm">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Accuracy</p>
                  <p className="text-xl font-bold">{exam.score}%</p>
                </div>
                <div className="bg-white dark:bg-gray-900 p-3 rounded shadow-sm">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Time Spent</p>
                  <p className="text-xl font-bold">{reviewData.timeSpent}</p>
                </div>
                <div className="bg-white dark:bg-gray-900 p-3 rounded shadow-sm">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Questions</p>
                  <p className="text-xl font-bold">{reviewData.correctAnswers}/{reviewData.questions.length}</p>
                </div>
              </div>
            </div>
            
            {/* Question Review */}
            <div>
              <h3 className="text-lg font-medium mb-3">Questions Review</h3>
              
              {reviewData.questions.map((question, qIndex) => {
                const userAnswer = reviewData.userAnswers[qIndex];
                const isCorrect = userAnswer === question.correctAnswer;
                
                return (
                  <div key={question.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 mb-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">Question {qIndex + 1}</span>
                        <h4 className="font-medium">{question.text}</h4>
                      </div>
                      <Badge className={isCorrect ? "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300" : "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300"}>
                        {isCorrect ? "Correct" : "Incorrect"}
                      </Badge>
                    </div>
                    
                    <div className="mt-3">
                      <p className="text-sm font-medium">Your answer:</p>
                      <p className={`text-sm ${isCorrect ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
                        {question.options[userAnswer] || "No answer selected"}
                      </p>
                    </div>
                    
                    {!isCorrect && (
                      <div className="mt-2">
                        <p className="text-sm font-medium">Correct answer:</p>
                        <p className="text-sm text-green-600 dark:text-green-400">
                          {question.options[question.correctAnswer]}
                        </p>
                      </div>
                    )}
                    
                    <div className="mt-3 bg-blue-50 dark:bg-blue-900/20 p-3 rounded-md">
                      <p className="text-sm text-blue-800 dark:text-blue-300 font-medium">Explanation:</p>
                      <p className="text-xs text-blue-700 dark:text-blue-400">
                        {question.explanation}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* Recommendations */}
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-3">Recommendations</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>Review concepts related to questions you missed</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>Practice similar problems to reinforce understanding</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>Consider attempting the next difficulty level exam</span>
                </li>
              </ul>
            </div>
            
            <div className="flex justify-between">
              <Button variant="outline" onClick={closeExamReview}>
                Close Review
              </Button>
              <Button 
                className="bg-blue-600 hover:bg-blue-700"
                onClick={() => {
                  // Download exam report as PDF (simulated)
                  toast({
                    title: "Report Downloaded",
                    description: "Your exam report has been downloaded.",
                  });
                }}
              >
                <FileText className="h-4 w-4 mr-2" />
                Download Report
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <Card className="shadow-md border border-gray-200 dark:border-gray-800">
      {/* Exam environment overlay */}
      <AnimatePresence>
        {showExamEnvironment && examInProgress && (
          <ExamEnvironment exam={examInProgress} />
        )}
      </AnimatePresence>
      
      {/* Exam review overlay */}
      <AnimatePresence>
        {showExamReview && reviewingExam && (
          <ExamReview exam={reviewingExam} />
        )}
      </AnimatePresence>
      
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold flex items-center justify-between">
          <span className="flex items-center">
            Practice Exams 
            <motion.span 
              className="ml-2 text-sm bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-300 px-2 py-0.5 rounded-full"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              {upcomingExams.length + completedExams.length} Available
            </motion.span>
          </span>
          <Button variant="ghost" size="sm" className="text-blue-600 dark:text-blue-400" asChild>
            <a href="/dashboard/student/exams">
              View All <ArrowRight className="h-4 w-4 ml-1" />
            </a>
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'upcoming' | 'completed')} className="w-full">
          <TabsList className="grid grid-cols-2 mb-4 w-full max-w-md mx-auto">
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming" className="space-y-3 mt-0">
            {visibleUpcomingExams.length > 0 ? (
              visibleUpcomingExams.map((exam) => (
                <motion.div
                  key={exam.id}
                  className="p-3 rounded-lg border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-all duration-200"
                  whileHover={{ scale: 1.01, boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, type: "spring", stiffness: 260, damping: 20 }}
                  onClick={() => handleExamClick(exam)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-gray-100 flex items-center">
                        {exam.title}
                        <ExternalLink className="h-3.5 w-3.5 ml-1.5 text-gray-400" />
                      </h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{exam.subject} • {exam.questions} questions</p>
                    </div>
                    <Badge className={`${getDifficultyColor(exam.difficulty)}`}>
                      {exam.difficulty}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs text-gray-400 flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      Duration: {exam.duration}
                    </span>
                    <Button 
                      size="sm" 
                      className="h-7 text-xs bg-blue-600 hover:bg-blue-700"
                      onClick={(e) => handleStartExam(exam, e)}
                      disabled={isLoadingExam}
                    >
                      {isLoadingExam ? (
                        <>
                          <LoaderCircle className="h-3 w-3 mr-1 animate-spin" />
                          Loading...
                        </>
                      ) : (
                        <>
                          Start Exam <ExternalLink className="h-3 w-3 ml-1" />
                        </>
                      )}
                    </Button>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-6 text-gray-500 dark:text-gray-400">
                No upcoming exams available
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="completed" className="space-y-3 mt-0">
            {visibleCompletedExams.length > 0 ? (
              visibleCompletedExams.map((exam) => (
                <motion.div
                  key={exam.id}
                  className="p-3 rounded-lg border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-all duration-200"
                  whileHover={{ scale: 1.01, boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, type: "spring", stiffness: 260, damping: 20 }}
                  onClick={() => handleExamClick(exam)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-gray-100 flex items-center">
                        {exam.title}
                        <CheckCircle className="h-3.5 w-3.5 ml-1.5 text-green-500" />
                      </h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{exam.subject} • Score: {exam.score}%</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                      Completed
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs text-gray-400 flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      Completed: {exam.dateCompleted}
                    </span>
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="h-7 text-xs border-green-500 text-green-700 hover:bg-green-50 hover:text-green-800 dark:border-green-600 dark:text-green-400 dark:hover:bg-green-900/20"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleReviewExam(exam);
                      }}
                    >
                      <FileText className="h-3 w-3 mr-1" />
                      Review Exam
                    </Button>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-6 text-gray-500 dark:text-gray-400">
                No completed exams yet
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
