
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { 
  BookOpen, Clock, CalendarDays, Timer, Award, 
  AlertTriangle, CheckCircle2, XCircle, ArrowRightCircle,
  TrendingUp, Layers, BarChart3, Plus, Users, Star,
  FileText, BarChart, Check, Play, Brain, User
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { format } from "date-fns";

interface Exam {
  id: string;
  title: string;
  subject: string;
  duration: number; // in minutes
  questions: number;
  difficulty: 'easy' | 'medium' | 'hard' | 'advanced';
  type: 'mock' | 'practice' | 'topic' | 'full';
  date?: string;
  completed?: boolean;
  score?: number;
  accuracy?: number;
  attempts?: number;
  lastAttempt?: string;
}

interface ExamAnalysis {
  topicPerformance: {
    topic: string;
    performance: number; // percentage
    strength: boolean; // true if it's a strength
  }[];
  accuracyOverTime: {
    date: string;
    accuracy: number;
  }[];
  averageTime: number; // in seconds per question
  completionRate: number; // percentage
  improvement: number; // percentage points improvement from previous attempts
}

const ExamPreparationPage = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("upcoming");
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null);
  const [showExamInfoDialog, setShowExamInfoDialog] = useState(false);
  const [showStartDialog, setShowStartDialog] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [confirmStart, setConfirmStart] = useState(false);
  
  // Mock data
  const upcomingExams: Exam[] = [
    {
      id: "e1",
      title: "Physics - Mechanics Mock Exam",
      subject: "Physics",
      duration: 60,
      questions: 30,
      difficulty: 'medium',
      type: 'mock',
      date: "2025-04-25T10:00:00Z"
    },
    {
      id: "e2",
      title: "Chemistry - Periodic Table",
      subject: "Chemistry",
      duration: 45,
      questions: 25,
      difficulty: 'easy',
      type: 'topic',
      date: "2025-05-02T14:30:00Z"
    },
    {
      id: "e3",
      title: "JEE Advanced Mock Test",
      subject: "Multiple",
      duration: 180,
      questions: 90,
      difficulty: 'advanced',
      type: 'full',
      date: "2025-05-15T09:00:00Z"
    }
  ];
  
  const completedExams: Exam[] = [
    {
      id: "c1",
      title: "Mathematics - Calculus Practice",
      subject: "Mathematics",
      duration: 90,
      questions: 40,
      difficulty: 'hard',
      type: 'practice',
      completed: true,
      score: 75,
      accuracy: 80,
      attempts: 2,
      lastAttempt: "2025-04-15T11:45:00Z"
    },
    {
      id: "c2",
      title: "Physics - Electromagnetism",
      subject: "Physics",
      duration: 60,
      questions: 30,
      difficulty: 'medium',
      type: 'topic',
      completed: true,
      score: 68,
      accuracy: 72,
      attempts: 1,
      lastAttempt: "2025-04-10T15:30:00Z"
    },
    {
      id: "c3",
      title: "JEE Mains Mock Test 1",
      subject: "Multiple",
      duration: 180,
      questions: 90,
      difficulty: 'hard',
      type: 'full',
      completed: true,
      score: 82,
      accuracy: 85,
      attempts: 3,
      lastAttempt: "2025-04-05T09:20:00Z"
    },
    {
      id: "c4",
      title: "Chemistry - Organic Chemistry",
      subject: "Chemistry",
      duration: 45,
      questions: 25,
      difficulty: 'medium',
      type: 'topic',
      completed: true,
      score: 64,
      accuracy: 68,
      attempts: 1,
      lastAttempt: "2025-04-01T14:15:00Z"
    }
  ];
  
  const suggestedExams: Exam[] = [
    {
      id: "s1",
      title: "Mathematics - Integration Techniques",
      subject: "Mathematics",
      duration: 60,
      questions: 30,
      difficulty: 'medium',
      type: 'topic'
    },
    {
      id: "s2",
      title: "Physics - Thermodynamics",
      subject: "Physics",
      duration: 45,
      questions: 25,
      difficulty: 'hard',
      type: 'topic'
    },
    {
      id: "s3",
      title: "JEE Chemistry Practice Set",
      subject: "Chemistry",
      duration: 90,
      questions: 45,
      difficulty: 'medium',
      type: 'practice'
    }
  ];
  
  const examAnalysis: ExamAnalysis = {
    topicPerformance: [
      { topic: "Mechanics", performance: 85, strength: true },
      { topic: "Thermodynamics", performance: 72, strength: true },
      { topic: "Electromagnetism", performance: 65, strength: false },
      { topic: "Modern Physics", performance: 78, strength: true },
      { topic: "Optics", performance: 58, strength: false }
    ],
    accuracyOverTime: [
      { date: "2025-01-15", accuracy: 65 },
      { date: "2025-02-01", accuracy: 68 },
      { date: "2025-02-15", accuracy: 72 },
      { date: "2025-03-01", accuracy: 75 },
      { date: "2025-03-15", accuracy: 79 },
      { date: "2025-04-01", accuracy: 82 }
    ],
    averageTime: 45, // seconds per question
    completionRate: 92, // percentage
    improvement: 12 // percentage points
  };
  
  const handleViewExam = (exam: Exam) => {
    setSelectedExam(exam);
    setShowExamInfoDialog(true);
  };
  
  const handleStartExam = (exam: Exam) => {
    setSelectedExam(exam);
    setShowStartDialog(true);
  };
  
  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    try {
      return format(new Date(dateString), "MMM dd, yyyy h:mm a");
    } catch (e) {
      return "Invalid date";
    }
  };
  
  const formatDuration = (minutes: number) => {
    if (minutes < 60) return `${minutes} minutes`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours} hour${hours > 1 ? 's' : ''}${remainingMinutes > 0 ? ` ${remainingMinutes} min` : ''}`;
  };
  
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'medium':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'hard':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'advanced':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };
  
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'mock':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'practice':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'topic':
        return 'bg-indigo-100 text-indigo-700 border-indigo-200';
      case 'full':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };
  
  const confirmExamStart = () => {
    setConfirmStart(true);
    setTimeout(() => {
      setShowStartDialog(false);
      setConfirmStart(false);
      
      toast({
        title: "Exam Started",
        description: `You have started the ${selectedExam?.title} exam. Good luck!`
      });
      
      // Here you would navigate to the actual exam page
    }, 1500);
  };
  
  useEffect(() => {
    if (submitted) {
      const timer = setTimeout(() => {
        setSubmitted(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [submitted]);
  
  // Calculate remaining time until exam
  const getRemainingTime = (dateString?: string) => {
    if (!dateString) return "";
    
    const examDate = new Date(dateString);
    const now = new Date();
    const diffMs = examDate.getTime() - now.getTime();
    
    if (diffMs <= 0) return "Starting now";
    
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (diffDays > 0) {
      return `${diffDays} day${diffDays !== 1 ? 's' : ''} ${diffHours} hr`;
    } else {
      const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      return `${diffHours} hr ${diffMinutes} min`;
    }
  };
  
  // Component for the exam cards
  const ExamCard = ({ exam, completed = false }: { exam: Exam, completed?: boolean }) => (
    <motion.div
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="group"
    >
      <Card className={`h-full transition-all ${completed ? "border-l-4 border-green-500" : ""}`}>
        <CardHeader className="space-y-1 pb-2">
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className={getDifficultyColor(exam.difficulty)}>
              {exam.difficulty.charAt(0).toUpperCase() + exam.difficulty.slice(1)}
            </Badge>
            <Badge variant="outline" className={getTypeColor(exam.type)}>
              {exam.type === 'full' ? 'Full Length' : exam.type.charAt(0).toUpperCase() + exam.type.slice(1)}
            </Badge>
          </div>
          <CardTitle className="line-clamp-1 mt-1">{exam.title}</CardTitle>
          <CardDescription className="flex items-center">
            <BookOpen className="h-3.5 w-3.5 mr-1.5" />
            {exam.subject}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="pb-4">
          <div className="grid grid-cols-2 gap-y-2 text-sm">
            <div className="flex items-center text-muted-foreground">
              <Clock className="h-3.5 w-3.5 mr-1.5" />
              {formatDuration(exam.duration)}
            </div>
            <div className="flex items-center text-muted-foreground">
              <FileText className="h-3.5 w-3.5 mr-1.5" />
              {exam.questions} Questions
            </div>
            
            {completed ? (
              <>
                <div className="flex items-center text-muted-foreground">
                  <Award className="h-3.5 w-3.5 mr-1.5" />
                  Score: {exam.score}%
                </div>
                <div className="flex items-center text-muted-foreground">
                  <BarChart className="h-3.5 w-3.5 mr-1.5" />
                  Accuracy: {exam.accuracy}%
                </div>
              </>
            ) : (
              exam.date && (
                <>
                  <div className="flex items-center text-muted-foreground col-span-2">
                    <CalendarDays className="h-3.5 w-3.5 mr-1.5" />
                    {formatDate(exam.date)}
                  </div>
                  {activeTab === "upcoming" && (
                    <div className="flex items-center text-amber-600 col-span-2">
                      <Timer className="h-3.5 w-3.5 mr-1.5" />
                      {getRemainingTime(exam.date)}
                    </div>
                  )}
                </>
              )
            )}
          </div>
          
          {completed && (
            <div className="mt-3">
              <div className="flex justify-between text-xs mb-1">
                <span>Accuracy</span>
                <span>{exam.accuracy}%</span>
              </div>
              <Progress value={exam.accuracy} className="h-1.5" />
            </div>
          )}
        </CardContent>
        
        <CardFooter className="pt-0">
          <div className="flex w-full justify-between">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleViewExam(exam)}
            >
              View Details
            </Button>
            
            <Button 
              size="sm"
              onClick={() => handleStartExam(exam)}
              className={completed ? "bg-green-600 hover:bg-green-700" : ""}
            >
              {completed ? (
                <>
                  <ArrowRightCircle className="mr-1 h-4 w-4" /> 
                  Review
                </>
              ) : (
                <>
                  <Play className="mr-1 h-4 w-4" /> 
                  Start Exam
                </>
              )}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );

  return (
    <div className="space-y-6 pb-8">
      <div>
        <h1 className="text-3xl font-bold">Practice Exams</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Prepare for your exams with mock tests and practice papers
        </p>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-100 dark:border-blue-800/20">
          <CardContent className="p-4 flex items-center">
            <div className="rounded-full bg-blue-100 dark:bg-blue-800/30 p-3 mr-4">
              <CheckCircle2 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Completed Exams</p>
              <p className="text-2xl font-bold">{completedExams.length}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20 border-violet-100 dark:border-violet-800/20">
          <CardContent className="p-4 flex items-center">
            <div className="rounded-full bg-violet-100 dark:bg-violet-800/30 p-3 mr-4">
              <Award className="h-6 w-6 text-violet-600 dark:text-violet-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-violet-600 dark:text-violet-400">Average Score</p>
              <p className="text-2xl font-bold">
                {Math.round(completedExams.reduce((acc, exam) => acc + (exam.score || 0), 0) / completedExams.length)}%
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 border-emerald-100 dark:border-emerald-800/20">
          <CardContent className="p-4 flex items-center">
            <div className="rounded-full bg-emerald-100 dark:bg-emerald-800/30 p-3 mr-4">
              <TrendingUp className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">Improvement</p>
              <p className="text-2xl font-bold">+{examAnalysis.improvement}%</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 border-amber-100 dark:border-amber-800/20">
          <CardContent className="p-4 flex items-center">
            <div className="rounded-full bg-amber-100 dark:bg-amber-800/30 p-3 mr-4">
              <Clock className="h-6 w-6 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-amber-600 dark:text-amber-400">Upcoming Exams</p>
              <p className="text-2xl font-bold">{upcomingExams.length}</p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Tabs */}
      <Tabs defaultValue="upcoming" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 w-full max-w-lg">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="suggested">Suggested</TabsTrigger>
          <TabsTrigger value="analysis">Analysis</TabsTrigger>
        </TabsList>
        
        <div className="mt-6">
          <TabsContent value="upcoming" className="space-y-6">
            {upcomingExams.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcomingExams.map((exam) => (
                  <ExamCard key={exam.id} exam={exam} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <CalendarDays className="h-16 w-16 text-gray-300 mb-4" />
                <h3 className="text-xl font-medium mb-2">No upcoming exams</h3>
                <p className="text-muted-foreground mb-6 max-w-md">
                  You don't have any upcoming exams scheduled. Add a new exam or check the suggested exams tab.
                </p>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Schedule New Exam
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="completed" className="space-y-6">
            {completedExams.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {completedExams.map((exam) => (
                  <ExamCard key={exam.id} exam={exam} completed />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <CheckCircle2 className="h-16 w-16 text-gray-300 mb-4" />
                <h3 className="text-xl font-medium mb-2">No completed exams</h3>
                <p className="text-muted-foreground mb-6">
                  You haven't completed any exams yet. Start with a practice test to track your progress.
                </p>
                <Button>
                  <Play className="mr-2 h-4 w-4" />
                  Start Practice Test
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="suggested" className="space-y-6">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-4 border border-blue-100 dark:border-blue-800/30">
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 dark:bg-blue-800/50 p-2 rounded-full">
                  <Brain className="h-5 w-5 text-blue-600 dark:text-blue-300" />
                </div>
                <div>
                  <h3 className="font-medium text-blue-800 dark:text-blue-200 mb-1">AI-Personalized Recommendations</h3>
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    These exams are curated based on your performance, study patterns, and areas that need improvement.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {suggestedExams.map((exam) => (
                <ExamCard key={exam.id} exam={exam} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="analysis" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Topic Performance */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-indigo-500" />
                    Topic Performance
                  </CardTitle>
                  <CardDescription>
                    Your performance across different exam topics
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {examAnalysis.topicPerformance.map((topic) => (
                      <div key={topic.topic} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{topic.topic}</span>
                            {topic.strength && (
                              <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
                                Strength
                              </Badge>
                            )}
                          </div>
                          <span className="text-sm font-medium">{topic.performance}%</span>
                        </div>
                        <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${topic.strength ? 'bg-green-500' : 'bg-orange-500'}`}
                            style={{ width: `${topic.performance}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              {/* Accuracy Over Time */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-emerald-500" />
                    Progress Over Time
                  </CardTitle>
                  <CardDescription>
                    Your accuracy has improved by {examAnalysis.improvement}% over time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px] flex items-end justify-between gap-1">
                    {examAnalysis.accuracyOverTime.map((point, index) => (
                      <div key={index} className="flex flex-col items-center mb-2">
                        <div className="relative flex flex-col items-center">
                          <div 
                            className="w-8 bg-gradient-to-t from-blue-500 to-violet-500 rounded-t-sm transition-all duration-500"
                            style={{ height: `${point.accuracy * 1.5}px` }}
                          ></div>
                          {index === examAnalysis.accuracyOverTime.length - 1 && (
                            <Badge className="absolute -right-8 top-0 translate-y-[-50%] bg-gradient-to-r from-blue-500 to-violet-500">
                              {point.accuracy}%
                            </Badge>
                          )}
                        </div>
                        <span className="text-xs text-gray-500 mt-2">
                          {format(new Date(point.date), "MMM d")}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              {/* Key Metrics */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Layers className="h-5 w-5 text-amber-500" />
                    Exam Performance Metrics
                  </CardTitle>
                  <CardDescription>
                    Key statistics about your exam performance
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Timer className="h-5 w-5 text-blue-500" />
                        <h4 className="font-medium">Average Time per Question</h4>
                      </div>
                      <p className="text-3xl font-bold">{examAnalysis.averageTime} sec</p>
                      <p className="text-sm text-muted-foreground">
                        {examAnalysis.averageTime < 60 ? "Good pace" : "Try to improve speed"}
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                        <h4 className="font-medium">Completion Rate</h4>
                      </div>
                      <p className="text-3xl font-bold">{examAnalysis.completionRate}%</p>
                      <p className="text-sm text-muted-foreground">
                        {examAnalysis.completionRate > 90 ? "Excellent" : "Needs improvement"}
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-violet-500" />
                        <h4 className="font-medium">Peer Comparison</h4>
                      </div>
                      <p className="text-3xl font-bold">Top 15%</p>
                      <p className="text-sm text-muted-foreground">
                        Among similar students preparing for JEE
                      </p>
                    </div>
                  </div>
                  
                  <Separator className="my-6" />
                  
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <h4 className="font-medium mb-1">Recommendations</h4>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2 text-sm">
                          <Check className="h-4 w-4 text-green-500" />
                          <span>Focus on improving Electromagnetism topics</span>
                        </li>
                        <li className="flex items-center gap-2 text-sm">
                          <Check className="h-4 w-4 text-green-500" />
                          <span>Practice more timed tests to improve speed</span>
                        </li>
                        <li className="flex items-center gap-2 text-sm">
                          <Check className="h-4 w-4 text-green-500" />
                          <span>Review Optics concepts before next exam</span>
                        </li>
                      </ul>
                    </div>
                    
                    <Button className="shrink-0">
                      <Play className="mr-2 h-4 w-4" />
                      Start Targeted Practice
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </div>
      </Tabs>
      
      {/* Exam Info Dialog */}
      <Dialog open={showExamInfoDialog} onOpenChange={setShowExamInfoDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl">{selectedExam?.title}</DialogTitle>
            <DialogDescription>
              {selectedExam?.subject} - {formatDuration(selectedExam?.duration || 0)}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
            <div>
              <h4 className="font-medium text-sm text-muted-foreground mb-2">Exam Details</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Difficulty:</span>
                  <Badge variant="outline" className={getDifficultyColor(selectedExam?.difficulty || 'medium')}>
                    {selectedExam?.difficulty?.charAt(0)?.toUpperCase() + selectedExam?.difficulty?.slice(1)}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Type:</span>
                  <Badge variant="outline" className={getTypeColor(selectedExam?.type || 'practice')}>
                    {selectedExam?.type === 'full' ? 'Full Length' : selectedExam?.type?.charAt(0)?.toUpperCase() + selectedExam?.type?.slice(1)}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Questions:</span>
                  <span className="font-medium">{selectedExam?.questions}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Duration:</span>
                  <span className="font-medium">{formatDuration(selectedExam?.duration || 0)}</span>
                </div>
                {selectedExam?.date && (
                  <div className="flex justify-between">
                    <span className="text-sm">Scheduled:</span>
                    <span className="font-medium">{formatDate(selectedExam.date)}</span>
                  </div>
                )}
                {selectedExam?.completed && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-sm">Last Attempt:</span>
                      <span className="font-medium">{formatDate(selectedExam.lastAttempt)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Attempts:</span>
                      <span className="font-medium">{selectedExam.attempts}</span>
                    </div>
                  </>
                )}
              </div>
            </div>
            
            {selectedExam?.completed ? (
              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-2">Performance</h4>
                <div className="space-y-4">
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span className="text-sm">Score:</span>
                      <span className="font-bold text-blue-600">{selectedExam.score}%</span>
                    </div>
                    <Progress value={selectedExam.score} className="h-2" />
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span className="text-sm">Accuracy:</span>
                      <span className="font-bold text-indigo-600">{selectedExam.accuracy}%</span>
                    </div>
                    <Progress value={selectedExam.accuracy} className="h-2 bg-gray-100">
                      <div className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full" style={{ width: `${selectedExam.accuracy}%` }} />
                    </Progress>
                  </div>
                  
                  <div>
                    <h5 className="text-sm font-medium mt-4 mb-2">Strengths & Weaknesses</h5>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mr-1" />
                        <span>Mechanics</span>
                      </div>
                      <div className="flex items-center">
                        <XCircle className="h-4 w-4 text-red-500 mr-1" />
                        <span>Electromagnetism</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mr-1" />
                        <span>Thermodynamics</span>
                      </div>
                      <div className="flex items-center">
                        <XCircle className="h-4 w-4 text-red-500 mr-1" />
                        <span>Optics</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <h4 className="font-medium text-sm text-muted-foreground mb-2">Topics Covered</h4>
                <ul className="space-y-1">
                  {selectedExam?.subject === 'Physics' ? (
                    <>
                      <li className="text-sm flex items-center">
                        <Check className="h-3.5 w-3.5 text-green-500 mr-2" />
                        Kinematics & Newton's Laws
                      </li>
                      <li className="text-sm flex items-center">
                        <Check className="h-3.5 w-3.5 text-green-500 mr-2" />
                        Work, Energy & Power
                      </li>
                      <li className="text-sm flex items-center">
                        <Check className="h-3.5 w-3.5 text-green-500 mr-2" />
                        Rotational Motion
                      </li>
                      <li className="text-sm flex items-center">
                        <Check className="h-3.5 w-3.5 text-green-500 mr-2" />
                        Gravitation
                      </li>
                      <li className="text-sm flex items-center">
                        <Check className="h-3.5 w-3.5 text-green-500 mr-2" />
                        Properties of Matter
                      </li>
                    </>
                  ) : selectedExam?.subject === 'Chemistry' ? (
                    <>
                      <li className="text-sm flex items-center">
                        <Check className="h-3.5 w-3.5 text-green-500 mr-2" />
                        Periodic Table & Properties
                      </li>
                      <li className="text-sm flex items-center">
                        <Check className="h-3.5 w-3.5 text-green-500 mr-2" />
                        Chemical Bonding
                      </li>
                      <li className="text-sm flex items-center">
                        <Check className="h-3.5 w-3.5 text-green-500 mr-2" />
                        States of Matter
                      </li>
                    </>
                  ) : selectedExam?.subject === 'Mathematics' ? (
                    <>
                      <li className="text-sm flex items-center">
                        <Check className="h-3.5 w-3.5 text-green-500 mr-2" />
                        Calculus - Differentiation
                      </li>
                      <li className="text-sm flex items-center">
                        <Check className="h-3.5 w-3.5 text-green-500 mr-2" />
                        Calculus - Integration
                      </li>
                      <li className="text-sm flex items-center">
                        <Check className="h-3.5 w-3.5 text-green-500 mr-2" />
                        Algebra & Functions
                      </li>
                    </>
                  ) : (
                    <>
                      <li className="text-sm flex items-center">
                        <Check className="h-3.5 w-3.5 text-green-500 mr-2" />
                        Multiple subjects covered
                      </li>
                      <li className="text-sm flex items-center">
                        <Check className="h-3.5 w-3.5 text-green-500 mr-2" />
                        Core concepts from syllabus
                      </li>
                    </>
                  )}
                </ul>
                
                <div className="mt-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700/30 rounded-lg p-3">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-amber-600" />
                    <h5 className="text-sm font-medium text-amber-800 dark:text-amber-300">Preparation Tips</h5>
                  </div>
                  <p className="text-xs text-amber-700 dark:text-amber-400 mt-1">
                    Review your notes on key concepts before attempting this exam.
                    Set aside uninterrupted time to complete it in one session for the best results.
                  </p>
                </div>
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowExamInfoDialog(false)}>
              Close
            </Button>
            <Button onClick={() => {
              setShowExamInfoDialog(false);
              handleStartExam(selectedExam!);
            }}>
              {selectedExam?.completed ? (
                <>
                  <ArrowRightCircle className="mr-2 h-4 w-4" /> 
                  Review Exam
                </>
              ) : (
                <>
                  <Play className="mr-2 h-4 w-4" /> 
                  Start Exam
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Start Exam Dialog */}
      <Dialog open={showStartDialog} onOpenChange={setShowStartDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Start Exam</DialogTitle>
            <DialogDescription>
              You are about to start "{selectedExam?.title}". This exam will take approximately {formatDuration(selectedExam?.duration || 0)}.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/30 rounded-lg p-4">
              <h4 className="font-medium text-blue-800 dark:text-blue-300 flex items-center gap-2 mb-2">
                <User className="h-4 w-4" />
                Before You Begin
              </h4>
              <ul className="space-y-2 text-sm text-blue-700 dark:text-blue-400">
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 mt-0.5 shrink-0" />
                  <span>Ensure you have a stable internet connection</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 mt-0.5 shrink-0" />
                  <span>Find a quiet place without distractions</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 mt-0.5 shrink-0" />
                  <span>Keep a pen and paper handy for rough work</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 mt-0.5 shrink-0" />
                  <span>Timer will start once you begin the exam</span>
                </li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <Label htmlFor="readiness">I am ready to begin</Label>
              <RadioGroup defaultValue="yes" className="space-y-1">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="ready-yes" />
                  <Label htmlFor="ready-yes">Yes, I'm ready to start now</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="ready-no" />
                  <Label htmlFor="ready-no">No, I'll come back later</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowStartDialog(false)}>
              Cancel
            </Button>
            <Button 
              onClick={confirmExamStart} 
              disabled={confirmStart}
              className="min-w-[100px]"
            >
              {confirmStart ? (
                <span className="flex items-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="mr-2"
                  >
                    <Clock className="h-4 w-4" />
                  </motion.div>
                  Starting...
                </span>
              ) : (
                <>
                  <Play className="mr-2 h-4 w-4" />
                  Begin Exam
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ExamPreparationPage;
