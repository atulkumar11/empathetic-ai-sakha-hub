
import React, { useState } from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import { useNavigate, useParams } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { BookOpen, BarChart, Flag, Plus, Book, ArrowRight, ChevronRight, Clock } from 'lucide-react';

const conceptCards = [
  {
    id: 1,
    title: "Newton's Laws of Motion",
    subject: "Physics",
    chapter: "Mechanics",
    status: "in-progress",
    difficulty: "medium",
    timeEstimate: 20,
    mastery: 65,
    priority: 1,
    cardCount: 15,
    isRecommended: true
  },
  {
    id: 2,
    title: "Chemical Bonding",
    subject: "Chemistry",
    chapter: "Chemical Bonds",
    status: "not-started",
    difficulty: "hard",
    timeEstimate: 30,
    mastery: 0,
    priority: 2,
    cardCount: 22,
    isRecommended: false
  },
  // ... keep existing code (with similar data structure for concept cards)
];

const ConceptsView: React.FC = () => {
  const { subject } = useParams<{ subject?: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [timePeriod, setTimePeriod] = useState("today");
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  
  const filteredConcepts = subject 
    ? conceptCards.filter(card => card.subject.toLowerCase() === subject.toLowerCase())
    : conceptCards;
  
  const handleViewAll = () => {
    navigate('/dashboard/student/concepts/all');
  };
  
  const handlePrioritize = () => {
    toast({
      title: "Concepts prioritized",
      description: "Your concept cards have been sorted by exam importance and relevance.",
    });
  };
  
  const handleAnalytics = () => {
    navigate('/dashboard/student/concepts/analytics');
    toast({
      title: "Concept Analytics",
      description: "Analyzing your concept card progress and completion patterns.",
    });
  };
  
  const handleCreateConcept = () => {
    setShowCreateDialog(false);
    toast({
      title: "Concept Card Created",
      description: "Your new concept card has been added to your study plan.",
    });
  };
  
  const handleOpenConcept = (id: number) => {
    // Navigate to the detailed concept card page
    navigate(`/dashboard/student/concepts/card/${id}`);
  };
  
  return (
    <MainLayout>
      <div className="container py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">
            {subject ? `${subject} Concepts` : 'All Concepts'}
          </h1>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex items-center gap-1" onClick={handleViewAll}>
              <BookOpen className="h-4 w-4" />
              <span>View All</span>
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-1" onClick={handlePrioritize}>
              <Flag className="h-4 w-4" />
              <span className="hidden sm:inline">Prioritize</span>
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-1" onClick={handleAnalytics}>
              <BarChart className="h-4 w-4" />
              <span className="hidden sm:inline">Analytics</span>
            </Button>
            
            <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
              <DialogTrigger asChild>
                <Button size="sm" className="flex items-center gap-1">
                  <Plus className="h-4 w-4" />
                  <span className="hidden sm:inline">Create Concept</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Concept Card</DialogTitle>
                  <DialogDescription>
                    Generate a new concept card for your study plan.
                    <Badge className="ml-2 bg-violet-100 text-violet-800 border-violet-200">PRO</Badge>
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-2">
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
                    <Input id="topic" placeholder="Enter topic" />
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
                    <Label htmlFor="tags">Tags (comma separated)</Label>
                    <Input id="tags" placeholder="e.g., important, exam, revision" />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowCreateDialog(false)}>Cancel</Button>
                  <Button onClick={handleCreateConcept}>Create Concept</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        
        <Tabs value={timePeriod} onValueChange={setTimePeriod as any} className="space-y-6">
          <TabsList>
            <TabsTrigger value="today">Today</TabsTrigger>
            <TabsTrigger value="week">This Week</TabsTrigger>
            <TabsTrigger value="month">This Month</TabsTrigger>
          </TabsList>
          
          <TabsContent value="today" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredConcepts.map(concept => (
                <ConceptCard 
                  key={concept.id} 
                  concept={concept} 
                  onOpenConcept={() => handleOpenConcept(concept.id)}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="week" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredConcepts.map(concept => (
                <ConceptCard 
                  key={concept.id} 
                  concept={concept}
                  onOpenConcept={() => handleOpenConcept(concept.id)}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="month" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredConcepts.map(concept => (
                <ConceptCard 
                  key={concept.id} 
                  concept={concept}
                  onOpenConcept={() => handleOpenConcept(concept.id)}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

interface ConceptCardProps {
  concept: typeof conceptCards[0];
  onOpenConcept: () => void;
}

const ConceptCard: React.FC<ConceptCardProps> = ({ concept, onOpenConcept }) => {
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
  
  const statusInfo = getStatusInfo(concept.status);
  const difficultyInfo = getDifficultyInfo(concept.difficulty);
  
  return (
    <Card className="h-full flex flex-col transform hover:scale-[1.01] transition-all duration-200 hover:shadow-md">
      <CardContent className="p-6 flex flex-col h-full">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-bold">{concept.title}</h3>
          {concept.isRecommended && (
            <Badge variant="outline" className="bg-indigo-100 text-indigo-800 border-indigo-200">
              Recommended
            </Badge>
          )}
        </div>
        
        <div className="flex flex-wrap gap-2 mb-3">
          <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-200">
            {concept.subject}
          </Badge>
          <Badge variant="outline" className="bg-violet-100 text-violet-800 border-violet-200">
            {concept.chapter}
          </Badge>
        </div>
        
        <div className="flex justify-between items-center mb-3">
          <Badge variant="outline" className={statusInfo.color}>
            {statusInfo.text}
          </Badge>
          <Badge variant="outline" className={difficultyInfo.color}>
            {difficultyInfo.text}
          </Badge>
        </div>
        
        <div className="mt-2 mb-4">
          <div className="flex justify-between text-sm text-gray-500 mb-1">
            <span>Mastery</span>
            <span>{concept.mastery}%</span>
          </div>
          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full ${
                concept.mastery >= 80 
                  ? "bg-emerald-500" 
                  : concept.mastery >= 40 
                    ? "bg-yellow-500" 
                    : "bg-red-500"
              }`} 
              style={{ width: `${concept.mastery}%` }}
            ></div>
          </div>
        </div>

        <div className="flex items-center gap-2 mt-auto mb-4 text-sm text-gray-500">
          <Book className="h-4 w-4" />
          <span>{concept.cardCount} cards</span>
          <span className="mx-2">•</span>
          <Clock className="h-4 w-4" />
          <span>{concept.timeEstimate} min</span>
        </div>
        
        <Button 
          className="w-full bg-indigo-600 hover:bg-indigo-700 mt-auto"
          onClick={onOpenConcept}
        >
          {concept.status === "completed" 
            ? "Review Again" 
            : concept.status === "in-progress" 
              ? "Continue Learning" 
              : "Start Learning"
          }
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default ConceptsView;
