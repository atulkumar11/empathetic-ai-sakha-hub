
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, ArrowRight, Book, Clock, FileText } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Link } from 'react-router-dom';
import { SharedPageLayout } from '../SharedPageLayout';

// Mock data for practice exams
const mockExams = [
  {
    id: '1',
    subject: 'Physics',
    topic: 'Mechanics and Thermodynamics',
    difficulty: 'Medium',
    totalTime: '60 min',
    tags: ['#Mechanics', '#Thermodynamics'],
    status: 'Pending',
    questionCount: 30
  },
  {
    id: '2',
    subject: 'Mathematics',
    topic: 'Calculus and Linear Algebra',
    difficulty: 'Hard',
    totalTime: '90 min',
    tags: ['#Calculus', '#LinearAlgebra'],
    status: 'In Progress',
    questionCount: 45
  },
  {
    id: '3',
    subject: 'Chemistry',
    topic: 'Organic and Inorganic Chemistry',
    difficulty: 'Medium',
    totalTime: '45 min',
    tags: ['#OrganicChemistry', '#InorganicChemistry'],
    status: 'Completed',
    questionCount: 25
  },
  {
    id: '4',
    subject: 'Biology',
    topic: 'Cell Biology and Genetics',
    difficulty: 'Easy',
    totalTime: '30 min',
    tags: ['#CellBiology', '#Genetics'],
    status: 'Pending',
    questionCount: 20
  }
];

// Difficulty badge colors
const difficultyColors = {
  Easy: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  Medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
  Hard: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
};

// Status badge colors
const statusColors = {
  Pending: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  'In Progress': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
  Completed: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
};

const PracticeExamsView = () => {
  const [timeFilter, setTimeFilter] = useState('today');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newExam, setNewExam] = useState({
    subject: '',
    topic: '',
    difficulty: 'Medium',
    questionCount: 30,
    examDuration: 60,
    tags: '',
    useAI: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewExam(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setNewExam(prev => ({ ...prev, [name]: value }));
  };

  const handleSliderChange = (name: string, value: number[]) => {
    setNewExam(prev => ({ ...prev, [name]: value[0] }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock save functionality
    console.log('New exam created:', newExam);
    setIsDialogOpen(false);
    // Reset form
    setNewExam({
      subject: '',
      topic: '',
      difficulty: 'Medium',
      questionCount: 30,
      examDuration: 60,
      tags: '',
      useAI: false
    });
  };

  // Filter exams based on selected filters
  const filteredExams = mockExams.filter(exam => {
    if (statusFilter === 'all') return true;
    if (statusFilter === 'pending' && exam.status === 'Pending') return true;
    if (statusFilter === 'in-progress' && exam.status === 'In Progress') return true;
    if (statusFilter === 'completed' && exam.status === 'Completed') return true;
    return false;
  });

  const getActionText = (status: string) => {
    switch(status) {
      case 'Pending': return 'Start Exam';
      case 'In Progress': return 'Continue Exam';
      case 'Completed': return 'Review Exam';
      default: return 'Start Exam';
    }
  };

  const getActionUrl = (id: string, status: string) => {
    switch(status) {
      case 'Pending':
      case 'In Progress':
        return `/dashboard/student/practice-exam/${id}/start`;
      case 'Completed':
        return `/dashboard/student/practice-exam/${id}/review`;
      default:
        return `/dashboard/student/practice-exam/${id}/start`;
    }
  };

  return (
    <SharedPageLayout
      title="Practice Exams"
      subtitle="Test your knowledge with comprehensive practice exams"
    >
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <Tabs defaultValue="today" className="w-full" onValueChange={setTimeFilter}>
            <TabsList>
              <TabsTrigger value="today">Today's</TabsTrigger>
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="ml-2 whitespace-nowrap">
                <Plus className="mr-1 h-4 w-4" /> Create Exam
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Create New Practice Exam</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Select 
                    value={newExam.subject} 
                    onValueChange={(value) => handleSelectChange('subject', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="physics">Physics</SelectItem>
                      <SelectItem value="chemistry">Chemistry</SelectItem>
                      <SelectItem value="biology">Biology</SelectItem>
                      <SelectItem value="mathematics">Mathematics</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="topic">Topic / Concept Focus</Label>
                  <Input 
                    id="topic"
                    name="topic"
                    value={newExam.topic}
                    onChange={handleInputChange}
                    placeholder="E.g., Mechanics and Thermodynamics"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="difficulty">Difficulty Level</Label>
                  <Select 
                    value={newExam.difficulty} 
                    onValueChange={(value) => handleSelectChange('difficulty', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Easy">Easy</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Hard">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="questionCount">
                    Number of Questions: {newExam.questionCount}
                  </Label>
                  <Slider
                    value={[newExam.questionCount]}
                    min={5}
                    max={100}
                    step={5}
                    onValueChange={(value) => handleSliderChange('questionCount', value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="examDuration">
                    Exam Duration (minutes): {newExam.examDuration}
                  </Label>
                  <Slider
                    value={[newExam.examDuration]}
                    min={15}
                    max={180}
                    step={15}
                    onValueChange={(value) => handleSliderChange('examDuration', value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="tags">Tags (comma-separated)</Label>
                  <Input 
                    id="tags"
                    name="tags"
                    value={newExam.tags}
                    onChange={handleInputChange}
                    placeholder="E.g., #Mechanics, #Thermodynamics"
                  />
                </div>
                
                <div className="flex justify-between pt-4">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Create Exam</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        
        <div className="flex space-x-2 pb-2">
          <Button 
            variant={statusFilter === 'all' ? "default" : "outline"} 
            size="sm" 
            onClick={() => setStatusFilter('all')}
          >
            All
          </Button>
          <Button 
            variant={statusFilter === 'pending' ? "default" : "outline"} 
            size="sm" 
            onClick={() => setStatusFilter('pending')}
          >
            Pending
          </Button>
          <Button 
            variant={statusFilter === 'in-progress' ? "default" : "outline"} 
            size="sm" 
            onClick={() => setStatusFilter('in-progress')}
          >
            In Progress
          </Button>
          <Button 
            variant={statusFilter === 'completed' ? "default" : "outline"} 
            size="sm" 
            onClick={() => setStatusFilter('completed')}
          >
            Completed
          </Button>
          <Button 
            variant={statusFilter === 'relevant' ? "default" : "outline"} 
            size="sm" 
            onClick={() => setStatusFilter('relevant')}
          >
            Exam-Relevant
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredExams.map((exam) => (
            <Card key={exam.id} className="dashboard-card overflow-hidden hover:shadow-md transition-shadow">
              <CardHeader className="p-4">
                <div className="flex justify-between items-start">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      {exam.subject}
                    </span>
                    <CardTitle className="text-lg mt-1">{exam.topic}</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                  <Clock className="mr-1 h-4 w-4" />
                  <span>{exam.totalTime}</span>
                  <FileText className="ml-3 mr-1 h-4 w-4" />
                  <span>{exam.questionCount} questions</span>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge className={difficultyColors[exam.difficulty as keyof typeof difficultyColors]}>
                    {exam.difficulty}
                  </Badge>
                  <Badge className={statusColors[exam.status as keyof typeof statusColors]}>
                    {exam.status}
                  </Badge>
                </div>
                
                <div className="flex flex-wrap gap-1 mb-2">
                  {exam.tags.map((tag, index) => (
                    <span key={index} className="text-xs text-blue-600 dark:text-blue-400">
                      {tag}{index < exam.tags.length - 1 ? ' ' : ''}
                    </span>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button asChild variant="ghost" className="w-full justify-between">
                  <Link to={getActionUrl(exam.id, exam.status)}>
                    {getActionText(exam.status)}
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </SharedPageLayout>
  );
};

export default PracticeExamsView;
