
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, BarChart, BookOpen, CheckCircle, Clock, FileText, Plus, Timer } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from 'react-router-dom';
import { SharedPageLayout } from '../SharedPageLayout';

// Mock data for exams
const mockExams = [
  {
    id: 1,
    title: "Physics Mock Test #1",
    subject: "Physics",
    topic: "Mechanics & Optics",
    questionCount: 30,
    timeLimit: 60,
    difficulty: "medium",
    status: "not-started",
    description: "Comprehensive test covering Newton's Laws, Optics, and Wave Theory",
    lastScore: null
  },
  {
    id: 2,
    title: "Chemistry Final Prep",
    subject: "Chemistry",
    topic: "Organic & Inorganic",
    questionCount: 45,
    timeLimit: 90,
    difficulty: "hard",
    status: "completed",
    description: "Full-length practice exam for final chemistry preparation",
    lastScore: 78
  },
  {
    id: 3,
    title: "Mathematics Quiz",
    subject: "Mathematics",
    topic: "Calculus",
    questionCount: 20,
    timeLimit: 40,
    difficulty: "medium",
    status: "in-progress",
    description: "Quick test covering differentiation and integration",
    lastScore: null
  },
  {
    id: 4,
    title: "Biology Chapter Review",
    subject: "Biology",
    topic: "Cell Biology",
    questionCount: 25,
    timeLimit: 50,
    difficulty: "easy",
    status: "not-started",
    description: "Review test for cell biology chapter",
    lastScore: null
  }
];

interface ExamCardProps {
  exam: typeof mockExams[0];
}

const ExamCard: React.FC<ExamCardProps> = ({ exam }) => {
  const navigate = useNavigate();
  
  const handleStartExam = () => {
    navigate(`/dashboard/student/exams/${exam.id}/start`);
  };
  
  const handleReviewExam = () => {
    navigate(`/dashboard/student/exams/${exam.id}/review`);
  };
  
  const getStatusInfo = () => {
    switch (exam.status) {
      case "completed":
        return { 
          icon: <CheckCircle className="h-4 w-4 text-emerald-500" />, 
          text: "Completed", 
          color: "bg-emerald-100 text-emerald-800 border-emerald-200" 
        };
      case "in-progress":
        return { 
          icon: <Clock className="h-4 w-4 text-blue-500" />, 
          text: "In Progress", 
          color: "bg-blue-100 text-blue-800 border-blue-200" 
        };
      default:
        return { 
          icon: <AlertCircle className="h-4 w-4 text-gray-500" />, 
          text: "Not Started", 
          color: "bg-gray-100 text-gray-800 border-gray-200" 
        };
    }
  };
  
  const getDifficultyInfo = () => {
    switch (exam.difficulty) {
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
  
  const statusInfo = getStatusInfo();
  const difficultyInfo = getDifficultyInfo();
  
  return (
    <Card className="h-full flex flex-col hover:shadow-md transition-all">
      <CardHeader className="pb-2">
        <div className="flex justify-between">
          <CardTitle>{exam.title}</CardTitle>
          <Badge variant="outline" className={difficultyInfo.color}>
            {difficultyInfo.text}
          </Badge>
        </div>
        <CardDescription className="flex gap-2 items-center">
          <Badge variant="outline">{exam.subject}</Badge>
          <Badge variant="outline" className="bg-gray-50">{exam.topic}</Badge>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow pb-2">
        <div className="mb-4">
          <Badge variant="outline" className={statusInfo.color}>
            {statusInfo.icon}
            <span className="ml-1">{statusInfo.text}</span>
          </Badge>
          
          {exam.status === "completed" && (
            <div className="mt-3">
              <div className="flex justify-between text-sm mb-1">
                <span>Last Score</span>
                <span>{exam.lastScore}%</span>
              </div>
              <Progress value={exam.lastScore || 0} className="h-2" />
            </div>
          )}
        </div>
        
        <p className="text-sm text-muted-foreground mb-3">{exam.description}</p>
        
        <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <FileText className="h-4 w-4" />
            <span>{exam.questionCount} questions</span>
          </div>
          <div className="flex items-center gap-1 justify-end">
            <Timer className="h-4 w-4" />
            <span>{exam.timeLimit} minutes</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="gap-2">
        {exam.status === "completed" ? (
          <Button 
            className="w-full bg-indigo-600 hover:bg-indigo-700" 
            onClick={handleReviewExam}
          >
            Review Exam
          </Button>
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

const PracticeExamSection = () => {
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const { toast } = useToast();
  
  const handleCreateExam = () => {
    setShowCreateDialog(false);
    toast({
      title: "Practice Exam Created",
      description: "Your new exam has been added to your study plan.",
    });
  };

  return (
    <SharedPageLayout
      title="Practice Exams"
      subtitle="Test your knowledge with comprehensive practice exams"
    >
      <div className="space-y-6">
        <div className="flex flex-wrap justify-between items-center">
          <h3 className="text-lg font-medium">Your Practice Exams</h3>
          
          <div className="flex gap-2 mt-2 sm:mt-0">
            <Button variant="outline" size="sm">
              <BarChart className="h-4 w-4 mr-1" />
              Exam Analytics
            </Button>
            
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
                    Generate a custom practice exam for your study plan.
                    <Badge className="ml-2 bg-violet-100 text-violet-800 border-violet-200">PRO</Badge>
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-2">
                  <div className="space-y-2">
                    <Label htmlFor="examTitle">Exam Title</Label>
                    <Input id="examTitle" placeholder="e.g., Physics Mock Test" />
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
                    <Label htmlFor="topic">Topics (comma separated)</Label>
                    <Input id="topic" placeholder="e.g., Mechanics, Optics, Waves" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="questionCount">Question Count</Label>
                      <Select defaultValue="30">
                        <SelectTrigger>
                          <SelectValue placeholder="Select count" />
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
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="30">30 minutes</SelectItem>
                          <SelectItem value="60">60 minutes</SelectItem>
                          <SelectItem value="90">90 minutes</SelectItem>
                          <SelectItem value="120">120 minutes</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.05 }}
        >
          {mockExams.map((exam) => (
            <motion.div
              key={exam.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ExamCard exam={exam} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </SharedPageLayout>
  );
};

export default PracticeExamSection;
