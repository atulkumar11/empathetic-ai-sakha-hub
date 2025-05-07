
import React, { useState } from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { BookOpen, BarChart, Plus, FileText, Clock, CheckCircle, AlertCircle, Timer } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

// Mock exams data
const mockExams = [
  {
    id: 1,
    title: "JEE Physics Full Mock Test",
    subject: "Physics",
    topic: "Comprehensive",
    questions: 45,
    timeLimit: 90,
    difficulty: "hard",
    lastAttempted: null,
    status: "not-started",
    avgScore: "N/A",
    bestScore: "N/A"
  },
  {
    id: 2,
    title: "Organic Chemistry Practice",
    subject: "Chemistry",
    topic: "Organic",
    questions: 30,
    timeLimit: 60,
    difficulty: "medium",
    lastAttempted: "3 days ago",
    status: "completed",
    avgScore: "78%",
    bestScore: "82%"
  },
  {
    id: 3,
    title: "Calculus Concepts Test",
    subject: "Mathematics",
    topic: "Calculus",
    questions: 25,
    timeLimit: 50,
    difficulty: "medium",
    lastAttempted: "Yesterday",
    status: "in-progress",
    avgScore: "65%",
    bestScore: "70%"
  },
  {
    id: 4,
    title: "Biology Systems Quiz",
    subject: "Biology",
    topic: "Body Systems",
    questions: 35,
    timeLimit: 70,
    difficulty: "hard",
    lastAttempted: "1 week ago",
    status: "completed",
    avgScore: "72%",
    bestScore: "85%"
  }
];

// Mock performance data
const mockPerformance = {
  totalExams: 28,
  completedExams: 22,
  avgScore: 76,
  improvementRate: 8.5,
  weakTopics: ["Thermodynamics", "Complex Numbers", "Organic Reactions"],
  strongTopics: ["Mechanics", "Algebra", "Inorganic Chemistry"]
};

const PracticeView: React.FC = () => {
  const { subject } = useParams<{ subject?: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("all");
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  
  // Filter exams based on subject
  const filteredExams = subject 
    ? mockExams.filter(exam => exam.subject.toLowerCase() === subject.toLowerCase())
    : mockExams;
  
  const handleAnalytics = () => {
    navigate('/dashboard/student/practice/analytics');
    toast({
      title: "Practice Test Analytics",
      description: "Viewing your exam performance analytics and progress trends.",
    });
  };
  
  const handleCreateExam = () => {
    setShowCreateDialog(false);
    toast({
      title: "Practice Exam Created",
      description: "Your new practice test has been added to your study plan.",
    });
  };
  
  return (
    <MainLayout>
      <div className="container py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">
            {subject ? `${subject} Practice` : 'All Practice Tests'}
          </h1>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex items-center gap-1" onClick={handleAnalytics}>
              <BarChart className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">Analytics</span>
            </Button>
            
            <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
              <DialogTrigger asChild>
                <Button size="sm" className="flex items-center gap-1">
                  <Plus className="h-4 w-4 mr-1" />
                  <span className="hidden sm:inline">Create Exam</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Practice Exam</DialogTitle>
                  <DialogDescription>
                    Generate a custom practice exam for your study plan.
                    <Badge className="ml-2 bg-violet-100 text-violet-800 border-violet-200">PRO</Badge>
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-2">
                  <div className="space-y-2">
                    <Label htmlFor="examTitle">Exam Title</Label>
                    <Input id="examTitle" placeholder="e.g., JEE Physics Mock Test" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Select defaultValue="physics">
                      <SelectTrigger>
                        <SelectValue placeholder="Select subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="physics">Physics</SelectItem>
                        <SelectItem value="chemistry">Chemistry</SelectItem>
                        <SelectItem value="mathematics">Mathematics</SelectItem>
                        <SelectItem value="biology">Biology</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="topic">Topic</Label>
                    <Input id="topic" placeholder="e.g., Mechanics, Organic Chemistry" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="difficulty">Difficulty</Label>
                    <Select defaultValue="medium">
                      <SelectTrigger>
                        <SelectValue placeholder="Select difficulty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="easy">Easy</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="hard">Hard</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="questionCount">Number of Questions</Label>
                    <Select defaultValue="30">
                      <SelectTrigger>
                        <SelectValue placeholder="Select question count" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">15 Questions</SelectItem>
                        <SelectItem value="30">30 Questions</SelectItem>
                        <SelectItem value="45">45 Questions</SelectItem>
                        <SelectItem value="60">60 Questions</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timeLimit">Time Limit (minutes)</Label>
                    <Select defaultValue="60">
                      <SelectTrigger>
                        <SelectValue placeholder="Select time limit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30">30 Minutes</SelectItem>
                        <SelectItem value="60">60 Minutes</SelectItem>
                        <SelectItem value="90">90 Minutes</SelectItem>
                        <SelectItem value="120">120 Minutes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowCreateDialog(false)}>Cancel</Button>
                  <Button onClick={handleCreateExam}>Create Exam</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full mb-6">
              <TabsList>
                <TabsTrigger value="all">All Exams</TabsTrigger>
                <TabsTrigger value="recommended">Recommended</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
              </TabsList>
            </Tabs>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredExams.map((exam) => (
                <ExamCard key={exam.id} exam={exam} />
              ))}
            </div>
          </div>
          
          <div className="space-y-4">
            <PracticePerformanceCard />
            <WeakTopicsCard />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

// Exam Card Component
interface ExamCardProps {
  exam: typeof mockExams[0];
}

const ExamCard: React.FC<ExamCardProps> = ({ exam }) => {
  const navigate = useNavigate();
  
  const handleStartExam = () => {
    navigate(`/dashboard/student/practice/exam/${exam.id}`);
  };
  
  const handleReviewExam = () => {
    navigate(`/dashboard/student/practice/exam/${exam.id}/review`);
  };
  
  // Get difficulty badge color and text
  const getDifficultyInfo = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return { color: "bg-green-100 text-green-800 border-green-200", text: "Easy" };
      case "medium":
        return { color: "bg-yellow-100 text-yellow-800 border-yellow-200", text: "Medium" };
      case "hard":
        return { color: "bg-red-100 text-red-800 border-red-200", text: "Hard" };
      default:
        return { color: "bg-gray-100 text-gray-800 border-gray-200", text: "Unknown" };
    }
  };
  
  // Get status badge color and text
  const getStatusInfo = (status: string) => {
    switch (status) {
      case "completed":
        return { color: "bg-emerald-100 text-emerald-800 border-emerald-200", text: "Completed" };
      case "in-progress":
        return { color: "bg-blue-100 text-blue-800 border-blue-200", text: "In Progress" };
      case "not-started":
        return { color: "bg-gray-100 text-gray-800 border-gray-200", text: "Not Started" };
      default:
        return { color: "bg-gray-100 text-gray-800 border-gray-200", text: "Unknown" };
    }
  };
  
  const difficultyInfo = getDifficultyInfo(exam.difficulty);
  const statusInfo = getStatusInfo(exam.status);
  
  return (
    <Card className="h-full flex flex-col hover:shadow-md transition-all">
      <CardHeader className="pb-2">
        <div className="flex justify-between">
          <CardTitle>{exam.title}</CardTitle>
          <Badge className={difficultyInfo.color}>
            {difficultyInfo.text}
          </Badge>
        </div>
        <CardDescription className="flex gap-2 items-center">
          <Badge variant="outline">{exam.subject}</Badge>
          <Badge variant="outline" className="bg-gray-50">{exam.topic}</Badge>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow pb-2">
        <div className="flex justify-between mb-4">
          <Badge className={statusInfo.color}>
            {statusInfo.text}
          </Badge>
        </div>
        
        <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <FileText className="h-4 w-4" />
            <span>{exam.questions} questions</span>
          </div>
          <div className="flex items-center gap-1 justify-end">
            <Timer className="h-4 w-4" />
            <span>{exam.timeLimit} mins</span>
          </div>
          
          {exam.status !== "not-started" && (
            <>
              <div className="flex items-center gap-1">
                <span>Last attempt:</span>
              </div>
              <div className="flex items-center gap-1 justify-end">
                <span>{exam.lastAttempted}</span>
              </div>
              <div className="flex items-center gap-1">
                <span>Avg Score:</span>
              </div>
              <div className="flex items-center gap-1 justify-end">
                <span>{exam.avgScore}</span>
              </div>
              <div className="flex items-center gap-1">
                <span>Best Score:</span>
              </div>
              <div className="flex items-center gap-1 justify-end">
                <span>{exam.bestScore}</span>
              </div>
            </>
          )}
        </div>
      </CardContent>
      <CardFooter>
        {exam.status === "completed" ? (
          <div className="grid grid-cols-2 gap-2 w-full">
            <Button variant="outline" onClick={handleStartExam}>
              Retake
            </Button>
            <Button className="bg-indigo-600 hover:bg-indigo-700" onClick={handleReviewExam}>
              Review
            </Button>
          </div>
        ) : (
          <Button 
            className="w-full bg-indigo-600 hover:bg-indigo-700" 
            onClick={handleStartExam}
          >
            {exam.status === "in-progress" ? "Continue Exam" : "Start Exam"}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

// Practice Performance Card Component
const PracticePerformanceCard: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Your Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Overall Score</p>
            <div className="flex items-end">
              <p className="text-2xl font-bold">{mockPerformance.avgScore}%</p>
              <p className="text-sm text-emerald-600 ml-2">↑{mockPerformance.improvementRate}%</p>
            </div>
            <Progress value={mockPerformance.avgScore} className="h-2" />
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Total Exams</p>
              <p className="text-xl font-bold">{mockPerformance.totalExams}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Completed</p>
              <p className="text-xl font-bold">{mockPerformance.completedExams}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Weak Topics Card Component
const WeakTopicsCard: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Topic Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground mb-2 flex items-center">
              <AlertCircle className="h-4 w-4 mr-1 text-amber-500" />
              Needs Improvement
            </p>
            <div className="flex flex-wrap gap-1">
              {mockPerformance.weakTopics.map((topic) => (
                <Badge key={topic} variant="outline" className="bg-amber-50 text-amber-800 border-amber-200">
                  {topic}
                </Badge>
              ))}
            </div>
          </div>
          
          <div>
            <p className="text-sm text-muted-foreground mb-2 flex items-center">
              <CheckCircle className="h-4 w-4 mr-1 text-emerald-500" />
              Strong Areas
            </p>
            <div className="flex flex-wrap gap-1">
              {mockPerformance.strongTopics.map((topic) => (
                <Badge key={topic} variant="outline" className="bg-emerald-50 text-emerald-800 border-emerald-200">
                  {topic}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PracticeView;
