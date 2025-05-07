
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Clock,
  Flag,
  HelpCircle,
  Calculator,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  FileText,
  Timer,
  Search,
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface Question {
  id: string;
  text: string;
  type: 'mcq' | 'subjective';
  options?: string[];
  answer?: string;
  explanation?: string;
}

interface ExamData {
  id: string;
  title: string;
  subject: string;
  duration: number; // in minutes
  totalQuestions: number;
  questions: Question[];
  examType?: string; // To identify specific exams like NEET
  scoringPattern?: string; // For NEET's +4/-1
  timePerQuestion?: string; // For NEET's 1.06 minutes
}

const ExamTaking = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<string[]>([]);
  const [doubtQuestions, setDoubtQuestions] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [showCalculator, setShowCalculator] = useState(false);
  const [showConfirmSubmit, setShowConfirmSubmit] = useState(false);
  
  // Mock exam data - in a real app this would come from an API
  const isNEET = id?.toLowerCase().includes('neet');
  
  const mockExam: ExamData = {
    id: id || 'exam-001',
    title: isNEET ? 'NEET-UG Full Mock Test' : 'Integration Techniques',
    subject: isNEET ? 'Medical Entrance' : 'Mathematics',
    duration: isNEET ? 180 : 60, // NEET is 3 hours
    totalQuestions: isNEET ? 180 : 10,
    questions: Array(10).fill(null).map((_, i) => ({
      id: `q-${i}`,
      text: `Question ${i+1}: ${isNEET ? 
        'Which of the following is a characteristic feature of epithelial tissue?' : 
        'What is the integral of x^2?'}`,
      type: i % 3 === 0 ? 'subjective' : 'mcq',
      options: i % 3 === 0 ? undefined : isNEET ? [
        'Presence of blood vessels',
        'Closely packed cells with little intercellular matrix',
        'Abundant extracellular matrix',
        'Presence of cilia in all types'
      ] : [
        'Option A: Some answer here',
        'Option B: Another potential answer',
        'Option C: Yet another option',
        'Option D: Final possible answer'
      ],
    })),
    examType: isNEET ? 'NEET-UG' : undefined,
    scoringPattern: isNEET ? '+4/-1' : undefined,
    timePerQuestion: isNEET ? '1.06 minutes' : undefined
  };
  
  // Initialize timer when component mounts
  useEffect(() => {
    // Set initial time in seconds
    setTimeLeft(mockExam.duration * 60);
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  const currentQuestion = mockExam.questions[currentQuestionIndex];
  
  const handleNext = () => {
    if (currentQuestionIndex < mockExam.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };
  
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
  
  const handleAnswer = (answer: string) => {
    setAnswers({
      ...answers,
      [currentQuestion.id]: answer
    });
  };
  
  const handleFlagQuestion = () => {
    if (flaggedQuestions.includes(currentQuestion.id)) {
      setFlaggedQuestions(flaggedQuestions.filter(id => id !== currentQuestion.id));
    } else {
      setFlaggedQuestions([...flaggedQuestions, currentQuestion.id]);
    }
  };
  
  const handleDoubtQuestion = () => {
    if (doubtQuestions.includes(currentQuestion.id)) {
      setDoubtQuestions(doubtQuestions.filter(id => id !== currentQuestion.id));
    } else {
      setDoubtQuestions([...doubtQuestions, currentQuestion.id]);
    }
  };
  
  const handleTimeUp = () => {
    toast({
      title: "Time's up!",
      description: "Your exam has been automatically submitted.",
      variant: "destructive"
    });
    
    handleSubmit();
  };
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  const progressPercentage = (currentQuestionIndex + 1) / mockExam.questions.length * 100;
  
  const handleSubmit = () => {
    // In a real app, you would submit the answers to the server
    // Store exam results in localStorage for demo purposes
    localStorage.setItem(`exam_result_${id}`, JSON.stringify({
      examId: id,
      answers,
      flaggedQuestions,
      doubtQuestions,
      timeSpent: mockExam.duration * 60 - timeLeft
    }));
    
    // Navigate to the review page
    navigate(`/dashboard/student/practice-exam/${id}/review`);
  };
  
  return (
    <div className="container py-6 max-w-5xl mx-auto">
      {/* Header with Timer */}
      <div className="sticky top-0 bg-background z-10 py-2 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold">{mockExam.title}</h1>
            <p className="text-muted-foreground">{mockExam.subject}</p>
            
            {isNEET && (
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline" className="bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300 border-blue-200">
                  <FileText className="h-3 w-3 mr-1" />
                  {mockExam.scoringPattern} scoring
                </Badge>
                <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300 border-green-200">
                  <Timer className="h-3 w-3 mr-1" />
                  {mockExam.timePerQuestion} per question
                </Badge>
              </div>
            )}
          </div>
          
          <div className="mt-3 md:mt-0 flex items-center gap-3">
            <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${
              timeLeft < 300 ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
            }`}>
              <Clock className="h-4 w-4" />
              <span className="font-semibold">{formatTime(timeLeft)}</span>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setShowCalculator(!showCalculator)}
            >
              <Calculator className="h-4 w-4 mr-1" />
              Calculator
            </Button>
          </div>
        </div>
        
        <div className="flex items-center justify-between text-sm mb-1">
          <span>Question {currentQuestionIndex + 1} of {mockExam.questions.length}</span>
          <div className="flex items-center gap-2">
            <span>{answers[currentQuestion.id] ? "Answered" : "Not answered"}</span>
            {flaggedQuestions.includes(currentQuestion.id) && (
              <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">
                Flagged
              </Badge>
            )}
            {doubtQuestions.includes(currentQuestion.id) && (
              <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-300">
                Doubt
              </Badge>
            )}
          </div>
        </div>
        <Progress value={progressPercentage} className="h-2" />
      </div>
      
      {/* NEET specific info banner */}
      {isNEET && (
        <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-md">
          <div className="flex justify-between items-center text-sm text-blue-700 dark:text-blue-300">
            <div className="flex items-center">
              <Search className="h-4 w-4 mr-1" />
              <span>NEET-UG Exam Pattern</span>
            </div>
            <div className="flex gap-4">
              <span>Physics: 45 Q</span>
              <span>Chemistry: 45 Q</span>
              <span>Biology: 90 Q</span>
              <span className="font-medium">Total: 180 Q</span>
            </div>
          </div>
        </div>
      )}
      
      {/* Main Question Area */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg">
            {currentQuestion.text}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {currentQuestion.type === 'mcq' ? (
            <RadioGroup 
              value={answers[currentQuestion.id]} 
              onValueChange={handleAnswer}
            >
              {currentQuestion.options?.map((option, i) => (
                <div className="flex items-center space-x-2 mb-4" key={i}>
                  <RadioGroupItem value={option} id={`option-${i}`} />
                  <Label htmlFor={`option-${i}`}>{option}</Label>
                </div>
              ))}
            </RadioGroup>
          ) : (
            <Textarea 
              placeholder="Type your answer here..."
              value={answers[currentQuestion.id] || ''}
              onChange={(e) => handleAnswer(e.target.value)}
              rows={6}
            />
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="flex items-center gap-2">
            <Button 
              variant={flaggedQuestions.includes(currentQuestion.id) ? "default" : "outline"} 
              size="sm" 
              onClick={handleFlagQuestion}
            >
              <Flag className={`h-4 w-4 ${flaggedQuestions.includes(currentQuestion.id) ? 'text-white' : 'text-yellow-500'} mr-1`} />
              {flaggedQuestions.includes(currentQuestion.id) ? 'Unflag' : 'Flag for Review'}
            </Button>
            <Button 
              variant={doubtQuestions.includes(currentQuestion.id) ? "default" : "outline"} 
              size="sm" 
              onClick={handleDoubtQuestion}
            >
              <HelpCircle className={`h-4 w-4 ${doubtQuestions.includes(currentQuestion.id) ? 'text-white' : 'text-purple-500'} mr-1`} />
              {doubtQuestions.includes(currentQuestion.id) ? 'Remove Doubt' : 'I\'m Not Sure'}
            </Button>
          </div>
        </CardFooter>
      </Card>
      
      {/* Navigation Buttons */}
      <div className="flex justify-between mb-6">
        <Button 
          variant="outline" 
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Previous Question
        </Button>
        {currentQuestionIndex < mockExam.questions.length - 1 ? (
          <Button onClick={handleNext}>
            Next Question
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        ) : (
          <Button 
            onClick={() => setShowConfirmSubmit(true)}
            className="bg-green-600 hover:bg-green-700"
          >
            Submit Exam
          </Button>
        )}
      </div>
      
      {/* Question Navigation Panel */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Question Navigation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-5 gap-2">
            {mockExam.questions.map((q, i) => (
              <Button 
                key={i}
                variant={currentQuestionIndex === i ? "default" : "outline"}
                className={`${
                  answers[q.id] ? 
                    flaggedQuestions.includes(q.id) ? 
                      'bg-yellow-100 border-yellow-400 text-yellow-800' :
                      'bg-green-100 border-green-400 text-green-800' : 
                    flaggedQuestions.includes(q.id) ? 
                      'bg-yellow-50 border-yellow-400' : 
                      doubtQuestions.includes(q.id) ?
                        'bg-purple-50 border-purple-400' :
                        ''
                } ${currentQuestionIndex === i ? '!bg-primary !text-primary-foreground' : ''}`}
                onClick={() => setCurrentQuestionIndex(i)}
              >
                {i + 1}
              </Button>
            ))}
          </div>
          
          <div className="flex flex-wrap mt-4 gap-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-100 border border-green-400 rounded"></div>
              <span className="text-sm">Answered</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-yellow-100 border border-yellow-400 rounded"></div>
              <span className="text-sm">Flagged</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-purple-100 border border-purple-400 rounded"></div>
              <span className="text-sm">Not Sure</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-white border border-gray-300 rounded"></div>
              <span className="text-sm">Not Answered</span>
            </div>
          </div>
          
          <Separator className="my-4" />
          
          <div className="flex justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Questions Answered</p>
              <p className="font-medium">{Object.keys(answers).length} / {mockExam.questions.length}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Questions Flagged</p>
              <p className="font-medium">{flaggedQuestions.length}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Questions with Doubt</p>
              <p className="font-medium">{doubtQuestions.length}</p>
            </div>
          </div>

          {isNEET && (
            <>
              <Separator className="my-4" />
              <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-md">
                <h4 className="font-medium text-blue-700 dark:text-blue-300 text-sm mb-1">NEET-UG Scoring Pattern</h4>
                <p className="text-xs text-blue-600 dark:text-blue-400">
                  • Correct answer: <strong>+4 marks</strong><br/>
                  • Incorrect answer: <strong>-1 mark</strong><br/>
                  • Unanswered: <strong>0 marks</strong><br/>
                  • Time per question: <strong>1.06 minutes</strong>
                </p>
              </div>
            </>
          )}
        </CardContent>
      </Card>
      
      {/* Calculator Modal (simplified) */}
      {showCalculator && (
        <div className="fixed bottom-4 right-4 bg-white dark:bg-gray-900 border rounded-lg shadow-lg p-4 w-64">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium">Calculator</h3>
            <Button variant="ghost" size="sm" onClick={() => setShowCalculator(false)}>✕</Button>
          </div>
          <div className="bg-gray-100 dark:bg-gray-800 rounded p-2 mb-2 h-10 text-right">0</div>
          <div className="grid grid-cols-4 gap-1">
            {['7', '8', '9', '÷', '4', '5', '6', '×', '1', '2', '3', '-', '0', '.', '=', '+'].map((btn) => (
              <Button key={btn} variant="outline" className="h-8 w-full" size="sm">{btn}</Button>
            ))}
          </div>
        </div>
      )}
      
      {/* Confirm Submit Dialog */}
      <Dialog open={showConfirmSubmit} onOpenChange={setShowConfirmSubmit}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Submit Exam?</DialogTitle>
            <DialogDescription>
              Are you sure you want to submit your exam? You won't be able to change your answers.
            </DialogDescription>
          </DialogHeader>
          
          {Object.keys(answers).length < mockExam.questions.length && (
            <div className="bg-amber-50 border border-amber-200 rounded-md p-3 flex items-start gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
              <p className="text-sm text-amber-800">
                You have {mockExam.questions.length - Object.keys(answers).length} unanswered questions. 
                Are you sure you want to continue?
              </p>
            </div>
          )}
          
          {isNEET && (
            <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
              <p className="text-sm font-medium text-blue-700">NEET-UG Scoring Information</p>
              <ul className="text-xs text-blue-600 mt-1 space-y-1">
                <li>• Each correct answer: +4 marks</li>
                <li>• Each incorrect answer: -1 mark</li>
                <li>• Unanswered questions: 0 marks</li>
              </ul>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConfirmSubmit(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>
              Yes, Submit Exam
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ExamTaking;
