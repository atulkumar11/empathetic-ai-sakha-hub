
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  ChevronLeft, 
  CheckCircle, 
  XCircle,
  Clock,
  BarChart,
  FileText,
  Lightbulb
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock data for exam results
const mockExamResults = {
  "physics-mechanics": {
    examId: "physics-mechanics",
    title: "Physics: Mechanics Final",
    subject: "Physics",
    topic: "Mechanics",
    completedOn: "2023-10-15T14:30:00Z",
    score: 78,
    maxScore: 100,
    timeSpent: 54, // minutes
    timeLimit: 60, // minutes
    questions: [
      {
        id: 1,
        question: "Which of Newton's laws states that an object will remain at rest or in uniform motion unless acted upon by an external force?",
        userAnswer: "First Law",
        correctAnswer: "First Law",
        isCorrect: true,
        explanation: "Newton's First Law of Motion, also known as the Law of Inertia, states that an object will remain at rest or in uniform motion in a straight line unless acted upon by an external force."
      },
      {
        id: 2,
        question: "Calculate the kinetic energy of a 10kg object moving at 5m/s.",
        userAnswer: "250 J",
        correctAnswer: "125 J",
        isCorrect: false,
        explanation: "The formula for kinetic energy is KE = (1/2)mv². So KE = 0.5 × 10 × 5² = 0.5 × 10 × 25 = 125 J."
      },
      {
        id: 3,
        question: "What is the SI unit of momentum?",
        userAnswer: "kg·m/s",
        correctAnswer: "kg·m/s",
        isCorrect: true,
        explanation: "The SI unit of momentum is kilogram meters per second (kg·m/s)."
      }
      // More questions would be here in a real application
    ],
    sectionResults: [
      { name: "Multiple Choice", score: 12, total: 15 },
      { name: "Numerical Problems", score: 7, total: 10 },
      { name: "Short Answer", score: 3, total: 5 }
    ],
    topicPerformance: [
      { topic: "Newton's Laws", score: 90 },
      { topic: "Energy Conservation", score: 75 },
      { topic: "Momentum", score: 80 },
      { topic: "Simple Harmonic Motion", score: 65 }
    ],
    strengths: [
      "Strong understanding of Newton's Laws",
      "Good grasp of momentum concepts"
    ],
    weaknesses: [
      "Calculations involving energy conservation",
      "Simple Harmonic Motion principles"
    ],
    recommendedResources: [
      {
        title: "Simple Harmonic Motion Review",
        type: "Video",
        link: "#"
      },
      {
        title: "Energy Conservation Practice Problems",
        type: "Practice Set",
        link: "#"
      }
    ]
  }
};

const ExamReviewPage = () => {
  const { examId } = useParams<{ examId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  const [isLoading, setIsLoading] = useState(true);
  const [examResult, setExamResult] = useState<any>(null);
  
  useEffect(() => {
    // Simulate API fetch
    const fetchExamResult = async () => {
      setIsLoading(true);
      
      try {
        // In a real app, this would be an API call
        if (examId && examId in mockExamResults) {
          setTimeout(() => {
            setExamResult(mockExamResults[examId as keyof typeof mockExamResults]);
            setIsLoading(false);
          }, 500);
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        toast({
          title: "Error loading exam results",
          description: "There was a problem loading the exam results. Please try again.",
          variant: "destructive"
        });
        setIsLoading(false);
      }
    };
    
    fetchExamResult();
  }, [examId, toast]);
  
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
  
  if (!examResult) {
    return (
      <MainLayout>
        <div className="container py-8">
          <Button variant="outline" onClick={handleGoBack}>
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to Exam List
          </Button>
          <div className="mt-6 text-center">
            <h1 className="text-2xl font-bold mb-2">Exam Results Not Found</h1>
            <p className="text-gray-600 mb-6">The exam results you're looking for don't exist or have been removed.</p>
            <Button onClick={handleGoBack}>Return to Exam List</Button>
          </div>
        </div>
      </MainLayout>
    );
  }
  
  // Format date
  const formattedDate = new Date(examResult.completedOn).toLocaleDateString();
  
  // Calculate passing status
  const passingThreshold = 70; // Example threshold
  const hasPassed = examResult.score >= passingThreshold;
  
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
          <h1 className="text-3xl font-bold mb-2">
            {examResult.title} - Results
          </h1>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="bg-indigo-100 text-indigo-800 border-indigo-200">
              {examResult.subject}
            </Badge>
            <Badge variant="outline" className="bg-violet-100 text-violet-800 border-violet-200">
              {examResult.topic}
            </Badge>
            <Badge variant={hasPassed ? "outline" : "default"} className={
              hasPassed 
              ? "bg-green-100 text-green-700 border-green-200" 
              : "bg-red-100 text-red-700 border-red-200"
            }>
              {hasPassed ? "Passed" : "Needs Improvement"}
            </Badge>
          </div>
        </div>
        
        {/* Score Card */}
        <div className="grid gap-6 md:grid-cols-3 mb-6">
          <Card className={`border-l-4 ${hasPassed ? 'border-l-green-500' : 'border-l-amber-500'}`}>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>Overall Score</span>
                <span className={`text-2xl ${hasPassed ? 'text-green-600' : 'text-amber-600'}`}>
                  {examResult.score}%
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Progress 
                  value={examResult.score} 
                  className="h-2.5" 
                  indicatorClassName={hasPassed ? "bg-green-500" : "bg-amber-500"}
                />
                <div className="flex justify-between text-sm">
                  <span>Completed on {formattedDate}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {examResult.timeSpent} mins
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Section Scores */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Section Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {examResult.sectionResults.map((section: any, index: number) => (
                  <div key={index}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{section.name}</span>
                      <span>
                        {section.score} / {section.total} ({Math.round(section.score/section.total*100)}%)
                      </span>
                    </div>
                    <Progress 
                      value={(section.score/section.total)*100} 
                      className="h-2"
                      indicatorClassName={
                        (section.score/section.total)*100 >= 70 
                          ? "bg-green-500" 
                          : "bg-amber-500"
                      }
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">
              <BarChart className="h-4 w-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="questions">
              <FileText className="h-4 w-4 mr-2" />
              Questions
            </TabsTrigger>
            <TabsTrigger value="recommendations">
              <Lightbulb className="h-4 w-4 mr-2" />
              Recommendations
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Topic Performance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {examResult.topicPerformance.map((topic: any, index: number) => (
                    <div key={index}>
                      <div className="flex justify-between text-sm mb-1">
                        <span>{topic.topic}</span>
                        <span>{topic.score}%</span>
                      </div>
                      <Progress 
                        value={topic.score} 
                        className="h-2"
                        indicatorClassName={
                          topic.score >= 80 
                            ? "bg-green-500" 
                            : topic.score >= 60 
                              ? "bg-amber-500" 
                              : "bg-red-500"
                        }
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Strengths & Weaknesses</CardTitle>
                </CardHeader>
                <CardContent>
                  <h3 className="font-medium text-green-600 mb-2">Strengths</h3>
                  <ul className="list-disc pl-5 mb-4">
                    {examResult.strengths.map((strength: string, index: number) => (
                      <li key={index} className="mb-1">{strength}</li>
                    ))}
                  </ul>
                  
                  <h3 className="font-medium text-amber-600 mb-2">Areas for Improvement</h3>
                  <ul className="list-disc pl-5">
                    {examResult.weaknesses.map((weakness: string, index: number) => (
                      <li key={index} className="mb-1">{weakness}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="questions">
            <Card>
              <CardHeader>
                <CardTitle>Question Review</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[500px]">
                  <div className="space-y-6">
                    {examResult.questions.map((question: any, index: number) => (
                      <div 
                        key={question.id} 
                        className={`p-4 rounded-lg ${
                          question.isCorrect 
                            ? 'bg-green-50 border border-green-200' 
                            : 'bg-red-50 border border-red-200'
                        }`}
                      >
                        <div className="flex justify-between">
                          <h3 className="font-medium">Question {index + 1}</h3>
                          {question.isCorrect ? (
                            <Badge className="bg-green-100 text-green-800 border-green-200">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Correct
                            </Badge>
                          ) : (
                            <Badge className="bg-red-100 text-red-800 border-red-200">
                              <XCircle className="h-3 w-3 mr-1" />
                              Incorrect
                            </Badge>
                          )}
                        </div>
                        
                        <p className="my-2">{question.question}</p>
                        
                        <div className="mt-2 space-y-1">
                          <div>
                            <span className="text-sm font-medium">Your answer: </span>
                            <span className={question.isCorrect ? 'text-green-600' : 'text-red-600'}>
                              {question.userAnswer}
                            </span>
                          </div>
                          
                          {!question.isCorrect && (
                            <div>
                              <span className="text-sm font-medium">Correct answer: </span>
                              <span className="text-green-600">{question.correctAnswer}</span>
                            </div>
                          )}
                        </div>
                        
                        <div className="mt-3 bg-white p-3 rounded border text-sm">
                          <p className="font-medium mb-1">Explanation:</p>
                          <p>{question.explanation}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="recommendations">
            <Card>
              <CardHeader>
                <CardTitle>Study Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium text-lg mb-2">Based on your performance, we recommend:</h3>
                    <ul className="list-disc pl-5 space-y-2">
                      {examResult.weaknesses.map((weakness: string, index: number) => (
                        <li key={index}>Review {weakness.toLowerCase()}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-lg mb-2">Recommended Resources</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {examResult.recommendedResources.map((resource: any, index: number) => (
                        <Card key={index}>
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-medium">{resource.title}</h4>
                                <Badge variant="outline" className="mt-1">
                                  {resource.type}
                                </Badge>
                              </div>
                              <Button variant="ghost" size="sm">View</Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <Button className="w-full">Generate Practice Set Based on Weaknesses</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default ExamReviewPage;
