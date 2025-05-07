
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, FileText, Clock, Calendar, ChevronRight, Tag, BarChart, Medal, AlertCircle } from 'lucide-react';

interface PracticeExam {
  id: string;
  title: string;
  subject: string;
  description: string;
  questionCount: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  duration: number;
  tags: string[];
  completed: boolean;
  lastAttempted?: string;
  bestScore?: number;
  unlocked: boolean;
  isNew?: boolean;
  isRecommended?: boolean;
  deadline?: string;
}

const PracticeExamLandingPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data for practice exams
  const practiceExams: PracticeExam[] = [
    {
      id: 'exam-1',
      title: "Physics Mid-Term Mock Exam",
      subject: "Physics",
      description: "Comprehensive physics exam covering mechanics, thermodynamics, and waves",
      questionCount: 30,
      difficulty: "Medium",
      duration: 60,
      tags: ["Mechanics", "Thermodynamics", "Waves"],
      completed: false,
      unlocked: true,
      isNew: true,
      isRecommended: true
    },
    {
      id: 'exam-2',
      title: "Chemistry Periodic Table Test",
      subject: "Chemistry",
      description: "Test your knowledge of the periodic table and element properties",
      questionCount: 25,
      difficulty: "Easy",
      duration: 45,
      tags: ["Elements", "Periodic Table", "Properties"],
      completed: true,
      lastAttempted: "2 days ago",
      bestScore: 82,
      unlocked: true
    },
    {
      id: 'exam-3',
      title: "Advanced Calculus Exam",
      subject: "Mathematics",
      description: "Challenge your calculus skills with advanced integration and differentiation",
      questionCount: 20,
      difficulty: "Hard",
      duration: 90,
      tags: ["Calculus", "Integration", "Differentiation"],
      completed: false,
      unlocked: true,
      isRecommended: true
    },
    {
      id: 'exam-4',
      title: "Biology Cell Functions Test",
      subject: "Biology",
      description: "Comprehensive test on cell structures and their functions",
      questionCount: 35,
      difficulty: "Medium",
      duration: 60,
      tags: ["Cell Biology", "Organelles", "Functions"],
      completed: true,
      lastAttempted: "1 week ago",
      bestScore: 95,
      unlocked: true
    },
    {
      id: 'exam-5',
      title: "Organic Chemistry Reactions Test",
      subject: "Chemistry",
      description: "Test your understanding of organic chemistry reactions and mechanisms",
      questionCount: 40,
      difficulty: "Hard",
      duration: 75,
      tags: ["Organic", "Reactions", "Mechanisms"],
      completed: false,
      unlocked: false
    },
    {
      id: 'exam-6',
      title: "Physics Electromagnetism Quiz",
      subject: "Physics",
      description: "Quick assessment of your knowledge in electromagnetism concepts",
      questionCount: 15,
      difficulty: "Medium",
      duration: 30,
      tags: ["Electromagnetism", "Electricity", "Magnetism"],
      completed: false,
      unlocked: true,
      deadline: "Tomorrow, 11:59 PM"
    }
  ];

  // Filter exams based on tab and search
  const getFilteredExams = () => {
    let filtered = practiceExams;
    
    // Filter by tab
    if (activeTab === 'new') {
      filtered = filtered.filter(exam => exam.isNew);
    } else if (activeTab === 'completed') {
      filtered = filtered.filter(exam => exam.completed);
    } else if (activeTab === 'pending') {
      filtered = filtered.filter(exam => !exam.completed && exam.unlocked);
    } else if (activeTab === 'recommended') {
      filtered = filtered.filter(exam => exam.isRecommended);
    } else if (activeTab !== 'all') {
      // Filter by subject
      filtered = filtered.filter(exam => exam.subject.toLowerCase() === activeTab);
    }
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(exam => 
        exam.title.toLowerCase().includes(query) || 
        exam.subject.toLowerCase().includes(query) ||
        exam.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    return filtered;
  };

  const filteredExams = getFilteredExams();
  
  // Get list of unique subjects
  const subjects = Array.from(new Set(practiceExams.map(exam => exam.subject.toLowerCase())));
  
  // Handle exam click to navigate to take exam or review results
  const handleExamClick = (examId: string, completed: boolean) => {
    if (completed) {
      navigate(`/dashboard/student/practice-exam/${examId}/review`);
    } else {
      navigate(`/dashboard/student/practice-exam/${examId}/start`);
    }
  };

  // Difficulty badge color
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800 border-green-200';
      case 'Medium': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Hard': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  return (
    <SharedPageLayout
      title="Practice Exams"
      subtitle="Test your knowledge and track your progress with practice exams"
    >
      <div className="space-y-6">
        {/* Search and filter bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input 
            placeholder="Search exams by title, subject, or tag..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 w-full"
          />
        </div>

        {/* Tabs for filtering */}
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full overflow-x-auto flex flex-nowrap justify-start">
            <TabsTrigger value="all">All Exams</TabsTrigger>
            <TabsTrigger value="new">New</TabsTrigger>
            <TabsTrigger value="recommended">Recommended</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            {subjects.map(subject => (
              <TabsTrigger key={subject} value={subject} className="capitalize">
                {subject}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={activeTab} className="mt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredExams.map(exam => (
                <Card 
                  key={exam.id}
                  className={`transition-all hover:shadow-md overflow-hidden border-l-4 ${
                    !exam.unlocked 
                      ? 'border-l-gray-300 bg-gray-50 opacity-80' 
                      : exam.completed 
                        ? 'border-l-green-500' 
                        : exam.isNew 
                          ? 'border-l-blue-500' 
                          : exam.isRecommended 
                            ? 'border-l-violet-500' 
                            : 'border-l-gray-300'
                  } ${exam.unlocked ? 'cursor-pointer' : ''}`}
                  onClick={() => exam.unlocked && handleExamClick(exam.id, exam.completed)}
                >
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start mb-1">
                      <Badge variant="outline" className={getDifficultyColor(exam.difficulty)}>
                        {exam.difficulty}
                      </Badge>
                      {exam.isNew && (
                        <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                          New
                        </Badge>
                      )}
                      {!exam.unlocked && (
                        <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-200">
                          Locked
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-lg">{exam.title}</CardTitle>
                  </CardHeader>
                  
                  <CardContent className="pb-2">
                    <div className="text-sm text-muted-foreground line-clamp-2 mb-3">
                      {exam.description}
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mb-3">
                      {exam.tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          <Tag className="h-3 w-3 mr-1" />
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 mr-1" />
                        <span>{exam.questionCount} questions</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{exam.duration} min</span>
                      </div>
                    </div>
                    
                    {exam.completed && exam.bestScore && (
                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center">
                          <Medal className="h-4 w-4 mr-1 text-amber-500" />
                          <span className="font-medium">Best score: {exam.bestScore}%</span>
                        </div>
                        {exam.bestScore >= 80 ? (
                          <Badge className="bg-green-100 text-green-800">Passed</Badge>
                        ) : (
                          <Badge variant="outline" className="bg-red-100 text-red-800">Needs Review</Badge>
                        )}
                      </div>
                    )}
                    
                    {exam.lastAttempted && (
                      <div className="mt-2 text-xs text-muted-foreground flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>Last attempted: {exam.lastAttempted}</span>
                      </div>
                    )}
                    
                    {exam.deadline && (
                      <div className="mt-2 text-xs text-red-600 flex items-center">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        <span>Due: {exam.deadline}</span>
                      </div>
                    )}
                  </CardContent>
                  
                  <CardFooter>
                    {exam.unlocked ? (
                      <Button variant={exam.completed ? "outline" : "default"} className="w-full">
                        {exam.completed ? 'View Results' : 'Start Exam'}
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    ) : (
                      <Button variant="outline" className="w-full" disabled>
                        Complete prerequisites to unlock
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>
            
            {filteredExams.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                <FileText className="h-12 w-12 mx-auto mb-3 text-muted-foreground opacity-20" />
                <h3 className="text-lg font-medium mb-1">No practice exams found</h3>
                <p>Try adjusting your filter or search criteria</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </SharedPageLayout>
  );
};

export default PracticeExamLandingPage;
