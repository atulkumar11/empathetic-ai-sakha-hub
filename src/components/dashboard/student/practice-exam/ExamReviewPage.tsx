
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ArrowLeft, CheckCircle, XCircle, Clock, Book, AlertTriangle, BarChart } from "lucide-react";
import QuestionReview from "./QuestionReview";
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';

// Mock exam result data
const mockExamResult = {
  examId: "1",
  title: "Physics Mock Test #1",
  subject: "Physics",
  topics: ["Mechanics", "Optics", "Waves"],
  score: 78,
  totalQuestions: 30,
  correctAnswers: 23,
  incorrectAnswers: 7,
  timeTaken: "48 minutes",
  maxTime: "60 minutes",
  completedOn: "2023-10-25T10:30:00Z",
  topicPerformance: [
    { name: "Mechanics", score: 85, questions: 12 },
    { name: "Optics", score: 70, questions: 10 },
    { name: "Waves", score: 75, questions: 8 }
  ],
  questions: [
    {
      id: 1,
      text: "Which of the following correctly describes Newton's First Law of Motion?",
      userAnswer: "An object at rest stays at rest, and an object in motion stays in motion unless acted upon by an external force",
      correctAnswer: "An object at rest stays at rest, and an object in motion stays in motion unless acted upon by an external force",
      isCorrect: true,
      explanation: "Newton's First Law of Motion states that an object will remain at rest or in uniform motion in a straight line unless acted upon by an external force."
    },
    {
      id: 2,
      text: "What is the SI unit of electric current?",
      userAnswer: "Watt",
      correctAnswer: "Ampere",
      isCorrect: false,
      explanation: "The SI unit of electric current is the ampere (A), not the watt. The watt is the unit of power."
    },
    {
      id: 3,
      text: "Which of the following are scalar quantities?",
      userAnswer: ["Mass", "Temperature"],
      correctAnswer: ["Mass", "Temperature"],
      isCorrect: true,
      explanation: "Mass and temperature are scalar quantities because they have only magnitude and no direction."
    }
    // More questions would be here
  ],
  weakAreas: [
    "Electric Current and Resistance",
    "Lens Equations",
    "Doppler Effect"
  ],
  recommendations: [
    "Review the concepts of electric current and resistivity",
    "Practice problems related to lens equations and image formation",
    "Focus on wave mechanics, especially the Doppler effect"
  ]
};

const ExamReviewPage = () => {
  const { examId } = useParams<{ examId: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = React.useState("overview");
  
  // In a real app, fetch results based on examId
  const examResult = mockExamResult;
  
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-amber-600";
    return "text-red-600";
  };
  
  const getProgressColor = (score: number) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 60) return "bg-amber-500";
    return "bg-red-500";
  };
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  const handleBackToPracticeExams = () => {
    navigate("/dashboard/student/practice-exam");
  };
  
  return (
    <SharedPageLayout
      title={`Exam Result: ${examResult.title}`}
      subtitle={`${examResult.subject} • Completed on ${formatDate(examResult.completedOn)}`}
      showBackButton={true}
      backButtonUrl="/dashboard/student/practice-exam"
      showQuickAccess={false}
    >
      <div className="space-y-6">
        {/* Score Overview */}
        <Card className="overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
            <div className="flex flex-wrap justify-between items-center">
              <CardTitle>Exam Performance</CardTitle>
              <div className="flex items-center gap-2">
                {examResult.topics.map(topic => (
                  <Badge key={topic} variant="outline">
                    {topic}
                  </Badge>
                ))}
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">
                    Overall Score
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className={`text-4xl font-bold ${getScoreColor(examResult.score)}`}>
                    {examResult.score}%
                  </div>
                  <Progress 
                    value={examResult.score} 
                    className={`h-2 mt-2 ${getProgressColor(examResult.score)}`} 
                  />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">
                    Questions
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex justify-between">
                    <div>
                      <div className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                        <span className="text-sm text-muted-foreground">Correct</span>
                      </div>
                      <div className="text-xl font-medium">{examResult.correctAnswers}</div>
                    </div>
                    <div>
                      <div className="flex items-center">
                        <XCircle className="h-4 w-4 text-red-500 mr-1" />
                        <span className="text-sm text-muted-foreground">Incorrect</span>
                      </div>
                      <div className="text-xl font-medium">{examResult.incorrectAnswers}</div>
                    </div>
                    <div>
                      <div className="flex items-center">
                        <Book className="h-4 w-4 text-blue-500 mr-1" />
                        <span className="text-sm text-muted-foreground">Total</span>
                      </div>
                      <div className="text-xl font-medium">{examResult.totalQuestions}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">
                    Time
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center mb-1">
                    <Clock className="h-4 w-4 text-muted-foreground mr-1" />
                    <span className="text-sm text-muted-foreground">Time taken</span>
                  </div>
                  <div className="text-xl font-medium">{examResult.timeTaken}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    out of {examResult.maxTime}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="questions">Questions</TabsTrigger>
                <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-5">
                <div>
                  <h3 className="font-medium text-lg mb-3">Topic Performance</h3>
                  <div className="space-y-3">
                    {examResult.topicPerformance.map(topic => (
                      <div key={topic.name}>
                        <div className="flex justify-between text-sm mb-1">
                          <span>{topic.name}</span>
                          <span className={getScoreColor(topic.score)}>{topic.score}%</span>
                        </div>
                        <Progress 
                          value={topic.score}
                          className={`h-2 ${getProgressColor(topic.score)}`} 
                        />
                        <div className="text-xs text-muted-foreground mt-1 text-right">
                          {topic.questions} questions
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-lg mb-3">Areas for Improvement</h3>
                  <div className="space-y-2">
                    {examResult.weakAreas.map((area, index) => (
                      <div key={index} className="flex items-start">
                        <AlertTriangle className="h-5 w-5 text-amber-500 mr-2 mt-0.5" />
                        <span>{area}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="questions">
                <div className="space-y-5">
                  {examResult.questions.map((question, index) => (
                    <QuestionReview 
                      key={question.id}
                      question={question}
                      questionNumber={index + 1}
                    />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="recommendations">
                <div className="space-y-6">
                  <h3 className="font-medium text-lg">Suggested Actions</h3>
                  <div className="space-y-4">
                    {examResult.recommendations.map((recommendation, index) => (
                      <Card key={index}>
                        <CardContent className="p-4 flex">
                          <BarChart className="h-5 w-5 text-blue-500 mr-3 mt-0.5" />
                          <div>
                            <p>{recommendation}</p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  
                  <div className="flex justify-end space-x-3">
                    <Button variant="outline" onClick={handleBackToPracticeExams}>
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Back to Practice Exams
                    </Button>
                    <Button>
                      <Book className="h-4 w-4 mr-2" />
                      Study Related Concepts
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </SharedPageLayout>
  );
};

export default ExamReviewPage;
