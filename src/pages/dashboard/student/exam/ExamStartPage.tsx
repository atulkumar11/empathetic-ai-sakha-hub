
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { BookOpen, Clock, CheckCircle, AlertCircle, ChevronLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock exam data
const mockExams = {
  "physics-mechanics": {
    id: "physics-mechanics",
    title: "Physics: Mechanics Final",
    subject: "Physics",
    topic: "Mechanics",
    description: "Comprehensive test covering Newton's Laws, energy conservation, momentum and simple harmonic motion.",
    totalQuestions: 30,
    timeLimit: 60, // in minutes
    difficulty: "Medium",
    requiredScore: 70, // percentage to pass
    instructions: [
      "Read each question carefully before answering.",
      "All questions carry equal marks.",
      "Negative marking applies for incorrect answers.",
      "Calculator allowed for complex calculations.",
      "You may not return to previous questions once answered."
    ],
    sections: [
      { title: "Multiple Choice", questions: 15 },
      { title: "Numerical Problems", questions: 10 },
      { title: "Short Answer", questions: 5 }
    ]
  },
  "chemistry-organic": {
    id: "chemistry-organic",
    title: "Organic Chemistry Exam",
    subject: "Chemistry",
    topic: "Organic Chemistry",
    description: "Evaluation of organic compounds, reactions, and mechanisms.",
    totalQuestions: 25,
    timeLimit: 45,
    difficulty: "Hard",
    requiredScore: 65,
    instructions: [
      "Draw chemical structures clearly.",
      "Show all reaction steps where asked.",
      "You may use the periodic table provided.",
      "Your handwriting must be legible."
    ],
    sections: [
      { title: "Nomenclature", questions: 8 },
      { title: "Reaction Mechanisms", questions: 12 },
      { title: "Compound Properties", questions: 5 }
    ]
  }
};

const ExamStartPage = () => {
  const { examId } = useParams<{ examId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [exam, setExam] = useState<any>(null);
  const [readyToStart, setReadyToStart] = useState(false);
  
  useEffect(() => {
    // Simulating API fetch
    const fetchExam = async () => {
      setIsLoading(true);
      
      try {
        // In a real app, this would be an API call
        if (examId && examId in mockExams) {
          setExam(mockExams[examId as keyof typeof mockExams]);
        }
      } catch (error) {
        toast({
          title: "Error loading exam",
          description: "There was a problem loading the exam details. Please try again.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchExam();
  }, [examId, toast]);
  
  const handleStartExam = () => {
    if (!readyToStart) {
      setReadyToStart(true);
      return;
    }
    
    // In a real app, this would start the actual exam
    toast({
      title: "Exam started",
      description: `Your ${exam.title} exam is now in progress. Good luck!`
    });
    
    // Navigate to the actual exam taking page
    navigate(`/dashboard/student/exam/${examId}/take`);
  };
  
  const handleGoBack = () => {
    navigate('/dashboard/student/practice-exams');
  };
  
  if (isLoading) {
    return (
      <MainLayout>
        <div className="container py-8 animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-8"></div>
          <div className="h-64 bg-gray-200 rounded mb-6"></div>
        </div>
      </MainLayout>
    );
  }
  
  if (!exam) {
    return (
      <MainLayout>
        <div className="container py-8">
          <Button variant="outline" onClick={handleGoBack}>
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to Exam List
          </Button>
          <div className="mt-6 text-center">
            <h1 className="text-2xl font-bold mb-2">Exam Not Found</h1>
            <p className="text-gray-600 mb-6">The exam you're looking for doesn't exist or has been removed.</p>
            <Button onClick={handleGoBack}>Return to Exam List</Button>
          </div>
        </div>
      </MainLayout>
    );
  }
  
  return (
    <MainLayout>
      <div className="container py-8">
        <div className="flex items-center justify-between mb-6">
          <Button variant="outline" onClick={handleGoBack}>
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to Exam List
          </Button>
        </div>
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{exam.title}</h1>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="bg-indigo-100 text-indigo-800 border-indigo-200">
              {exam.subject}
            </Badge>
            <Badge variant="outline" className="bg-violet-100 text-violet-800 border-violet-200">
              {exam.topic}
            </Badge>
            <Badge variant="outline" className={
              exam.difficulty === "Easy" 
                ? "bg-green-100 text-green-700 border-green-200" 
                : exam.difficulty === "Medium"
                  ? "bg-yellow-100 text-yellow-700 border-yellow-200"
                  : "bg-red-100 text-red-700 border-red-200"
            }>
              {exam.difficulty} Difficulty
            </Badge>
          </div>
        </div>
        
        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Exam Overview</CardTitle>
                <CardDescription>{exam.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Instructions</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {exam.instructions.map((instruction: string, index: number) => (
                      <li key={index}>{instruction}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Exam Format</h3>
                  <div className="space-y-2">
                    {exam.sections.map((section: { title: string, questions: number }, index: number) => (
                      <div key={index} className="flex justify-between items-center">
                        <span>{section.title}</span>
                        <Badge variant="outline">{section.questions} Questions</Badge>
                      </div>
                    ))}
                  </div>
                </div>
                
                {readyToStart && (
                  <Alert className="bg-blue-50 border-blue-200">
                    <AlertCircle className="h-4 w-4 text-blue-600" />
                    <AlertTitle>Ready to start?</AlertTitle>
                    <AlertDescription>
                      Once you begin the exam, the timer will start and cannot be paused. Make sure you're ready and won't be disturbed.
                    </AlertDescription>
                  </Alert>
                )}
                
                {!readyToStart && (
                  <Alert className="bg-amber-50 border-amber-200">
                    <AlertCircle className="h-4 w-4 text-amber-600" />
                    <AlertTitle>Before you begin</AlertTitle>
                    <AlertDescription>
                      Please review all exam details and make sure you have enough time to complete the exam.
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={handleStartExam}>
                  {readyToStart ? "Start Exam Now" : "I'm Ready to Start"}
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Exam Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Questions</span>
                  <span className="font-medium">{exam.totalQuestions}</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Time Limit</span>
                  <span className="font-medium">{exam.timeLimit} mins</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Passing Score</span>
                  <span className="font-medium">{exam.requiredScore}%</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Time per Question</span>
                  <span className="font-medium">{Math.round(exam.timeLimit / exam.totalQuestions * 60)} sec</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Your Readiness</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Topic Mastery</span>
                    <span>75%</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Concept Coverage</span>
                    <span>82%</span>
                  </div>
                  <Progress value={82} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Practice Question Accuracy</span>
                    <span>68%</span>
                  </div>
                  <Progress value={68} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ExamStartPage;
