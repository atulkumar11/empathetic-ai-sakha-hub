
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ArrowLeft, CheckCircle, XCircle, Clock, Book, AlertTriangle, BarChart, PieChart, LineChart } from "lucide-react";

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
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = React.useState("overview");
  
  // In a real app, fetch results based on id
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
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Correct: {examResult.correctAnswers}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <XCircle className="h-4 w-4 text-red-600" />
                      <span className="text-sm">Incorrect: {examResult.incorrectAnswers}</span>
                    </div>
                  </div>
                  <div className="mt-2 h-4 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-green-500" 
                      style={{ width: `${(examResult.correctAnswers / examResult.totalQuestions) * 100}%` }}
                    ></div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">
                    Time Taken
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-blue-600" />
                      <span className="text-sm">{examResult.timeTaken}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      of {examResult.maxTime}
                    </div>
                  </div>
                  <div className="mt-2 h-4 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-500" 
                      style={{ width: `${(parseInt(examResult.timeTaken) / parseInt(examResult.maxTime)) * 100}%` }}
                    ></div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="questions">Questions</TabsTrigger>
                <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview">
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <PieChart className="h-5 w-5 text-indigo-500" />
                      <span>Topic Performance</span>
                    </h3>
                    <div className="space-y-3">
                      {examResult.topicPerformance.map((topic) => (
                        <div key={topic.name}>
                          <div className="flex justify-between mb-1">
                            <div className="flex items-center gap-1">
                              <span className="text-sm font-medium">{topic.name}</span>
                              <span className="text-xs text-muted-foreground">({topic.questions} questions)</span>
                            </div>
                            <span className={`text-sm font-medium ${getScoreColor(topic.score)}`}>
                              {topic.score}%
                            </span>
                          </div>
                          <Progress value={topic.score} className={`h-2 ${getProgressColor(topic.score)}`} />
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold mb-3 flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-amber-500" />
                        <span>Areas Needing Improvement</span>
                      </h3>
                      <Card>
                        <CardContent className="p-4">
                          <ul className="space-y-2">
                            {examResult.weakAreas.map((area, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <div className="h-5 w-5 rounded-full bg-amber-100 flex items-center justify-center mt-0.5">
                                  <span className="text-xs font-bold text-amber-700">{index + 1}</span>
                                </div>
                                <span>{area}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold mb-3 flex items-center gap-2">
                        <BarChart className="h-5 w-5 text-blue-500" />
                        <span>Performance Trend</span>
                      </h3>
                      <Card>
                        <CardContent className="p-4">
                          <div className="h-40 flex items-center justify-center">
                            <LineChart className="h-8 w-8 text-muted-foreground" />
                            <p className="text-muted-foreground ml-2">Performance trend graph would appear here</p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="questions">
                <div className="space-y-4">
                  {examResult.questions.map((question, index) => (
                    <Card key={question.id} className={`border-l-4 ${question.isCorrect ? 'border-l-green-500' : 'border-l-red-500'}`}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-start gap-2">
                            <div className="h-6 w-6 rounded-full bg-gray-100 flex items-center justify-center">
                              <span className="text-xs font-bold">{index + 1}</span>
                            </div>
                            <div>
                              <p className="font-medium mb-2">{question.text}</p>
                              <div className="space-y-2">
                                <div className="flex items-start gap-2">
                                  <span className="text-sm font-medium">Your answer:</span>
                                  <span className={`text-sm ${question.isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                                    {Array.isArray(question.userAnswer) 
                                      ? question.userAnswer.join(", ") 
                                      : question.userAnswer
                                    }
                                  </span>
                                </div>
                                
                                {!question.isCorrect && (
                                  <div className="flex items-start gap-2">
                                    <span className="text-sm font-medium">Correct answer:</span>
                                    <span className="text-sm text-green-600">
                                      {Array.isArray(question.correctAnswer) 
                                        ? question.correctAnswer.join(", ") 
                                        : question.correctAnswer
                                      }
                                    </span>
                                  </div>
                                )}
                                
                                <div className="pt-2 mt-2 border-t">
                                  <p className="text-sm text-muted-foreground">
                                    <span className="font-medium">Explanation:</span> {question.explanation}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          {question.isCorrect ? (
                            <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                          ) : (
                            <XCircle className="h-5 w-5 text-red-500 mt-1 flex-shrink-0" />
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="recommendations">
                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Book className="h-5 w-5 text-blue-500" />
                        <span>Study Recommendations</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-4">
                        {examResult.recommendations.map((recommendation, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-700">
                              <span className="text-xs font-bold">{index + 1}</span>
                            </div>
                            <div>
                              <p>{recommendation}</p>
                            </div>
                          </li>
                        ))}
                      </ul>
                      
                      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Button className="w-full">
                          Create Study Plan
                        </Button>
                        <Button variant="outline" className="w-full">
                          Practice Similar Questions
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <BarChart className="h-5 w-5 text-indigo-500" />
                        <span>Comparative Analysis</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64 flex items-center justify-center">
                        <BarChart className="h-8 w-8 text-muted-foreground" />
                        <p className="text-muted-foreground ml-2">Comparative analysis graph would appear here</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        <div className="flex justify-between">
          <Button variant="outline" onClick={() => navigate('/dashboard/student/practice-exam')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Exams
          </Button>
          <Button onClick={() => navigate(`/dashboard/student/exams/${id}/start`)}>
            Retake Exam
          </Button>
        </div>
      </div>
    </SharedPageLayout>
  );
};

export default ExamReviewPage;
