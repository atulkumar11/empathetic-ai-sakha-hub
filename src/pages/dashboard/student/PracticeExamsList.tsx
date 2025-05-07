
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Book, Clock, FileText, Tag, Star, CheckCircle, BarChart, Plus } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

// Mock exams
const mockExams = [
  {
    id: "1",
    title: "Physics Mock Test #1",
    subject: "Physics",
    topic: "Mechanics & Optics",
    linkedConcept: "Newton's Laws",
    questionCount: 30,
    duration: "60 mins",
    difficulty: "Medium",
    priority: "High",
    completed: false
  },
  {
    id: "2",
    title: "Chemistry Final Review",
    subject: "Chemistry",
    topic: "Organic Chemistry",
    linkedConcept: "Reaction Mechanisms",
    questionCount: 45,
    duration: "90 mins",
    difficulty: "Hard",
    priority: "High",
    completed: true,
    score: 78
  },
  {
    id: "3",
    title: "Mathematics Practice",
    subject: "Mathematics",
    topic: "Calculus",
    linkedConcept: "Integration",
    questionCount: 25,
    duration: "45 mins",
    difficulty: "Medium",
    priority: "Medium",
    completed: false
  },
  {
    id: "4",
    title: "Biology Checkpoint",
    subject: "Biology",
    topic: "Cell Biology",
    linkedConcept: "Cell Structure",
    questionCount: 20,
    duration: "40 mins",
    difficulty: "Easy",
    priority: "Low",
    completed: true,
    score: 92
  }
];

const PracticeExamsList = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showCreateDialog, setShowCreateDialog] = React.useState(false);
  
  const handleStartExam = (id: string) => {
    navigate(`/dashboard/student/exams/${id}/start`);
  };
  
  const handleViewResult = (id: string) => {
    navigate(`/dashboard/student/exams/${id}/review`);
  };
  
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mockExams.map(exam => (
            <Card key={exam.id} className={`hover:shadow-md transition-shadow duration-200 ${exam.completed ? 'border-green-200' : 'border-blue-200'}`}>
              <CardContent className="p-4">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <h3 className="font-semibold text-lg">{exam.title}</h3>
                    <div className="flex gap-2">
                      <Badge className={
                        exam.difficulty === "Easy"
                          ? "bg-green-100 text-green-700"
                          : exam.difficulty === "Medium"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                      }>
                        {exam.difficulty}
                      </Badge>
                      <Badge className={
                        exam.priority === "High"
                          ? "bg-red-50 text-red-600"
                          : exam.priority === "Medium"
                            ? "bg-orange-50 text-orange-600"
                            : "bg-blue-50 text-blue-600"
                      }>
                        {exam.priority}
                      </Badge>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 text-sm">
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Book className="h-3 w-3" />
                      {exam.subject}
                    </Badge>
                    
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Tag className="h-3 w-3" />
                      {exam.topic}
                    </Badge>
                    
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Star className="h-3 w-3" />
                      {exam.linkedConcept}
                    </Badge>
                    
                    <Badge variant="outline" className="flex items-center gap-1">
                      <FileText className="h-3 w-3" />
                      {exam.questionCount} Questions
                    </Badge>
                    
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {exam.duration}
                    </Badge>

                    {exam.completed && (
                      <Badge variant="outline" className="flex items-center gap-1 bg-green-50 text-green-700">
                        <CheckCircle className="h-3 w-3" />
                        Score: {exam.score}%
                      </Badge>
                    )}
                  </div>

                  <div className="flex justify-end">
                    {exam.completed ? (
                      <Button
                        onClick={() => handleViewResult(exam.id)}
                        variant="outline"
                        className="text-blue-600 hover:text-blue-700"
                      >
                        📊 View Result
                      </Button>
                    ) : (
                      <Button
                        onClick={() => handleStartExam(exam.id)}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        ▶️ Start Test
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </SharedPageLayout>
  );
};

export default PracticeExamsList;
