
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, ArrowRight, BookOpen, Clock } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { SharedPageLayout } from '../SharedPageLayout';

// Mock data for concept cards
const mockConcepts = [
  {
    id: '1',
    subject: 'Physics',
    topic: 'Mechanics',
    title: 'Newton\'s Laws of Motion',
    estimatedTime: '45 min',
    difficulty: 'Medium',
    tags: ['#Mechanics', '#Force', '#Motion'],
    status: 'Pending'
  },
  {
    id: '2',
    subject: 'Mathematics',
    topic: 'Calculus',
    title: 'Integration by Parts',
    estimatedTime: '30 min',
    difficulty: 'Hard',
    tags: ['#Calculus', '#Integration'],
    status: 'Completed'
  },
  {
    id: '3',
    subject: 'Chemistry',
    topic: 'Organic Chemistry',
    title: 'Functional Groups',
    estimatedTime: '20 min',
    difficulty: 'Easy',
    tags: ['#OrganicChemistry', '#FunctionalGroups'],
    status: 'Pending'
  },
  {
    id: '4',
    subject: 'Biology',
    topic: 'Cell Biology',
    title: 'Cell Structure and Function',
    estimatedTime: '40 min',
    difficulty: 'Medium',
    tags: ['#CellBiology', '#CellStructure'],
    status: 'Completed'
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
  Completed: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
};

const ConceptCardsView = () => {
  const [timeFilter, setTimeFilter] = useState('today');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newConcept, setNewConcept] = useState({
    subject: '',
    topic: '',
    title: '',
    difficulty: 'Medium',
    tags: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewConcept(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setNewConcept(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock save functionality
    console.log('New concept created:', newConcept);
    setIsDialogOpen(false);
    // Reset form
    setNewConcept({
      subject: '',
      topic: '',
      title: '',
      difficulty: 'Medium',
      tags: ''
    });
  };

  // Filter concepts based on selected filters
  const filteredConcepts = mockConcepts.filter(concept => {
    if (statusFilter === 'all') return true;
    if (statusFilter === 'pending' && concept.status === 'Pending') return true;
    if (statusFilter === 'completed' && concept.status === 'Completed') return true;
    return false;
  });

  return (
    <SharedPageLayout
      title="Concept Cards"
      subtitle="Master key concepts through interactive learning"
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
                <Plus className="mr-1 h-4 w-4" /> Create Concept Card
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Create New Concept Card</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Select 
                    value={newConcept.subject} 
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
                  <Label htmlFor="topic">Topic</Label>
                  <Input 
                    id="topic"
                    name="topic"
                    value={newConcept.topic}
                    onChange={handleInputChange}
                    placeholder="E.g., Mechanics, Calculus"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="title">Concept Title</Label>
                  <Input 
                    id="title"
                    name="title"
                    value={newConcept.title}
                    onChange={handleInputChange}
                    placeholder="E.g., Newton's Laws of Motion"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="difficulty">Difficulty Level</Label>
                  <Select 
                    value={newConcept.difficulty} 
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
                  <Label htmlFor="tags">Tags (comma-separated)</Label>
                  <Input 
                    id="tags"
                    name="tags"
                    value={newConcept.tags}
                    onChange={handleInputChange}
                    placeholder="E.g., #Mechanics, #Force, #Motion"
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
                  <Button type="submit">Create Concept Card</Button>
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
          {filteredConcepts.map((concept) => (
            <Card key={concept.id} className="dashboard-card overflow-hidden hover:shadow-md transition-shadow">
              <CardHeader className="p-4">
                <div className="flex justify-between items-start">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      {concept.subject} • {concept.topic}
                    </span>
                    <CardTitle className="text-lg mt-1">{concept.title}</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                  <Clock className="mr-1 h-4 w-4" />
                  <span>{concept.estimatedTime}</span>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge className={difficultyColors[concept.difficulty as keyof typeof difficultyColors]}>
                    {concept.difficulty}
                  </Badge>
                  <Badge className={statusColors[concept.status as keyof typeof statusColors]}>
                    {concept.status}
                  </Badge>
                </div>
                
                <div className="flex flex-wrap gap-1 mb-2">
                  {concept.tags.map((tag, index) => (
                    <span key={index} className="text-xs text-blue-600 dark:text-blue-400">
                      {tag}{index < concept.tags.length - 1 ? ' ' : ''}
                    </span>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button asChild variant="ghost" className="w-full justify-between">
                  <Link to={`/dashboard/student/concepts/card/${concept.id}`}>
                    Start Learning
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

export default ConceptCardsView;
