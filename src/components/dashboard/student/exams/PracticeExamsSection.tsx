
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { CheckCircle, Clock, BookOpen, Calendar, Flag, Plus, BarChart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { SharedPageLayout } from "../SharedPageLayout";
import CreateExamCardDialog, { ExamCardFormData } from "./CreateExamCardDialog";
import PurchaseCreditsDialog from "./PurchaseCreditsDialog";
import { SubscriptionType } from "@/types/user/base";

// Mock exam data
const mockExams = [
  {
    id: "physics-mechanics",
    title: "Physics: Mechanics Final",
    subject: "Physics",
    topic: "Mechanics",
    description: "Comprehensive test covering Newton's Laws, energy conservation, momentum and simple harmonic motion.",
    totalQuestions: 30,
    timeLimit: 60, // in minutes
    difficulty: "medium",
    dueDate: "Tomorrow",
    progress: 0,
    status: "not-started",
    score: null
  },
  {
    id: "chemistry-organic",
    title: "Organic Chemistry Exam",
    subject: "Chemistry",
    topic: "Organic Chemistry",
    description: "Evaluation of organic compounds, reactions, and mechanisms.",
    totalQuestions: 25,
    timeLimit: 45,
    difficulty: "hard",
    dueDate: "In 3 days",
    progress: 0,
    status: "not-started",
    score: null
  },
  {
    id: "math-calculus",
    title: "Calculus Practice Exam",
    subject: "Mathematics",
    topic: "Calculus",
    description: "Derivatives, integrals, and applications.",
    totalQuestions: 20,
    timeLimit: 40,
    difficulty: "medium",
    dueDate: "Completed",
    progress: 100,
    status: "completed",
    score: 76
  }
];

interface ExamCardProps {
  exam: typeof mockExams[0];
}

const ExamCard: React.FC<ExamCardProps> = ({ exam }) => {
  const navigate = useNavigate();
  
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "easy":
        return "bg-green-100 text-green-800 border-green-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "hard":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-600";
      case "in-progress":
        return "text-blue-600";
      default:
        return "text-gray-600";
    }
  };

  const handleStartExam = () => {
    navigate(`/dashboard/student/exam/${exam.id}/start`);
  };

  const handleReviewExam = () => {
    navigate(`/dashboard/student/exam/${exam.id}/review`);
  };
  
  return (
    <Card className="h-full flex flex-col hover:shadow-md transition-all">
      <CardHeader>
        <div className="flex justify-between">
          <CardTitle>{exam.title}</CardTitle>
          <Badge className={getDifficultyColor(exam.difficulty)}>
            {exam.difficulty.charAt(0).toUpperCase() + exam.difficulty.slice(1)}
          </Badge>
        </div>
        <CardDescription className="flex gap-2 items-center">
          <Badge variant="outline">{exam.subject}</Badge>
          <Badge variant="outline" className="bg-gray-50">{exam.topic}</Badge>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {exam.description}
        </p>
        
        <div className="grid grid-cols-2 gap-y-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <BookOpen className="h-4 w-4" />
            <span>{exam.totalQuestions} Questions</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{exam.timeLimit} min</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{exam.dueDate}</span>
          </div>
          <div className="flex items-center gap-1">
            {exam.score !== null ? (
              <>
                <CheckCircle className={`h-4 w-4 ${exam.score >= 70 ? "text-green-500" : "text-amber-500"}`} />
                <span className={exam.score >= 70 ? "text-green-600" : "text-amber-600"}>
                  {exam.score}%
                </span>
              </>
            ) : (
              <span className={getStatusColor(exam.status)}>
                {exam.status === "completed" 
                  ? "Completed" 
                  : exam.status === "in-progress" 
                    ? "In Progress" 
                    : "Not Started"
                }
              </span>
            )}
          </div>
        </div>
        
        {exam.progress > 0 && (
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-1">
              <span>Progress</span>
              <span>{exam.progress}%</span>
            </div>
            <Progress value={exam.progress} className="h-2" />
          </div>
        )}
      </CardContent>
      <CardFooter className="flex gap-2">
        {exam.status === 'completed' ? (
          <Button className="w-full" variant="outline" onClick={handleReviewExam}>
            Review Exam
          </Button>
        ) : (
          <Button className="w-full bg-indigo-600 hover:bg-indigo-700" onClick={handleStartExam}>
            {exam.status === 'in-progress' ? 'Continue Exam' : 'Start Exam'}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

const PracticeExamsSection = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showPurchaseCreditsDialog, setShowPurchaseCreditsDialog] = useState(false);
  const [examForm, setExamForm] = useState({
    title: "",
    subject: "physics",
    topic: "",
    description: "",
    difficulty: "medium",
    questions: "20",
    timeLimit: "30",
    tags: ""
  });
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Mock user data - in a real app this would come from a context or API
  const [userCredits, setUserCredits] = useState({ standard: 15, exam: 5 });
  const [userSubscription, setUserSubscription] = useState<SubscriptionType>(SubscriptionType.Pro);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setExamForm(prev => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setExamForm(prev => ({ ...prev, [name]: value }));
  };
  
  const handleCreateExam = () => {
    // Validation
    if (!examForm.title.trim() || !examForm.topic.trim() || !examForm.description.trim()) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // In a real application, this would create the exam
    setShowCreateDialog(false);
    toast({
      title: "Practice Exam Created",
      description: "Your new practice exam has been added to your study plan.",
    });
    
    // Reset form
    setExamForm({
      title: "",
      subject: "physics",
      topic: "",
      description: "",
      difficulty: "medium",
      questions: "20",
      timeLimit: "30",
      tags: ""
    });
  };
  
  const handleCreateCards = (data: ExamCardFormData) => {
    // In a real app, this would call an API to generate the cards
    console.log("Creating cards with data:", data);
    
    // Deduct credits
    setUserCredits(prev => ({
      ...prev,
      exam: prev.exam - data.cardCount
    }));
    
    toast({
      title: "Creating Exam Cards",
      description: `${data.cardCount} exam cards are being created for ${data.subject}: ${data.topic}.`,
    });
  };
  
  const handlePurchaseComplete = () => {
    // In a real app, this would update the credit balance from the API
    setUserCredits(prev => ({
      ...prev,
      exam: prev.exam + 20 // Simulating purchase of 20 credits
    }));
  };
  
  // Filter exams based on tab
  const filterExams = (tab: string) => {
    switch (tab) {
      case "upcoming":
        return mockExams.filter(exam => exam.status === "not-started");
      case "completed":
        return mockExams.filter(exam => exam.status === "completed");
      default:
        return mockExams;
    }
  };
  
  const filteredExams = filterExams(activeTab);
  
  return (
    <SharedPageLayout
      title="Practice Exams"
      subtitle="Test your knowledge and track your progress"
    >
      <div className="space-y-6">
        <div className="flex flex-wrap justify-between items-center">
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-auto">
            <TabsList>
              <TabsTrigger value="all">All Exams</TabsTrigger>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <div className="flex flex-wrap gap-2 mt-2 sm:mt-0">
            <Button variant="outline" size="sm">
              <Flag className="h-4 w-4 mr-1" />
              Prioritize
            </Button>
            <Button variant="outline" size="sm">
              <BarChart className="h-4 w-4 mr-1" />
              Analytics
            </Button>
            
            <CreateExamCardDialog 
              userSubscription={userSubscription} 
              userCredits={userCredits}
              onCreateCards={handleCreateCards}
              onPurchaseCredits={() => setShowPurchaseCreditsDialog(true)}
            />
            
            <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
              <DialogTrigger asChild>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-1" />
                  Create Exam
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Practice Exam</DialogTitle>
                  <DialogDescription>
                    Generate a new practice exam for your study plan.
                    <Badge className="ml-2 bg-violet-100 text-violet-800 border-violet-200">PRO</Badge>
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-2">
                  <div className="space-y-2">
                    <Label htmlFor="title">Exam Title</Label>
                    <Input 
                      id="title" 
                      placeholder="e.g., Physics Final Preparation" 
                      value={examForm.title}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Select 
                      value={examForm.subject}
                      onValueChange={(value) => handleSelectChange("subject", value)}
                    >
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
                    <Input 
                      id="topic" 
                      placeholder="e.g., Mechanics, Organic Chemistry" 
                      value={examForm.topic}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea 
                      id="description" 
                      placeholder="Describe what this exam will cover"
                      value={examForm.description}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="difficulty">Difficulty</Label>
                      <Select 
                        value={examForm.difficulty}
                        onValueChange={(value) => handleSelectChange("difficulty", value)}
                      >
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
                      <Label htmlFor="questions">Number of Questions</Label>
                      <Select 
                        value={examForm.questions}
                        onValueChange={(value) => handleSelectChange("questions", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select number" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="10">10 Questions</SelectItem>
                          <SelectItem value="20">20 Questions</SelectItem>
                          <SelectItem value="30">30 Questions</SelectItem>
                          <SelectItem value="40">40 Questions</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timeLimit">Time Limit (minutes)</Label>
                    <Select 
                      value={examForm.timeLimit}
                      onValueChange={(value) => handleSelectChange("timeLimit", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">15 minutes</SelectItem>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="45">45 minutes</SelectItem>
                        <SelectItem value="60">60 minutes</SelectItem>
                        <SelectItem value="90">90 minutes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tags">Tags (comma separated)</Label>
                    <Input 
                      id="tags" 
                      placeholder="e.g., important, revision, final prep"
                      value={examForm.tags}
                      onChange={handleInputChange}
                    />
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
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.05 }}
        >
          {filteredExams.length > 0 ? (
            filteredExams.map((exam) => (
              <motion.div
                key={exam.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ExamCard exam={exam} />
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-8">
              <p className="text-muted-foreground">No exams found for this category.</p>
            </div>
          )}
        </motion.div>
      </div>
      
      {/* Purchase Credits Dialog */}
      <PurchaseCreditsDialog 
        open={showPurchaseCreditsDialog}
        onOpenChange={setShowPurchaseCreditsDialog}
        onPurchaseComplete={handlePurchaseComplete}
      />
    </SharedPageLayout>
  );
};

export default PracticeExamsSection;
