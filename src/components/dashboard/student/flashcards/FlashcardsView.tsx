
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, ArrowRight, Book, Clock } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { SharedPageLayout } from '../SharedPageLayout';

// Mock data for flashcard decks
const mockFlashcards = [
  {
    id: '1',
    subject: 'Physics',
    topic: 'Mechanics',
    concept: 'Newton\'s Laws of Motion',
    timeToReview: '20 min',
    difficulty: 'Medium',
    tags: ['#Mechanics', '#Force'],
    status: 'Pending',
    cardCount: 15
  },
  {
    id: '2',
    subject: 'Mathematics',
    topic: 'Calculus',
    concept: 'Integration Techniques',
    timeToReview: '15 min',
    difficulty: 'Hard',
    tags: ['#Calculus', '#Integration'],
    status: 'Completed',
    cardCount: 12
  },
  {
    id: '3',
    subject: 'Chemistry',
    topic: 'Organic Chemistry',
    concept: 'Functional Groups',
    timeToReview: '10 min',
    difficulty: 'Easy',
    tags: ['#OrganicChemistry'],
    status: 'Pending',
    cardCount: 8
  },
  {
    id: '4',
    subject: 'Biology',
    topic: 'Cell Biology',
    concept: 'Cell Organelles',
    timeToReview: '25 min',
    difficulty: 'Medium',
    tags: ['#CellBiology'],
    status: 'Completed',
    cardCount: 20
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

const FlashcardsView = () => {
  const [timeFilter, setTimeFilter] = useState('today');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newFlashcard, setNewFlashcard] = useState({
    subject: '',
    topic: '',
    concept: '',
    difficulty: 'Medium',
    question: '',
    answer: '',
    tags: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewFlashcard(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setNewFlashcard(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock save functionality
    console.log('New flashcard created:', newFlashcard);
    setIsDialogOpen(false);
    // Reset form
    setNewFlashcard({
      subject: '',
      topic: '',
      concept: '',
      difficulty: 'Medium',
      question: '',
      answer: '',
      tags: ''
    });
  };

  // Filter flashcards based on selected filters
  const filteredFlashcards = mockFlashcards.filter(flashcard => {
    if (statusFilter === 'all') return true;
    if (statusFilter === 'pending' && flashcard.status === 'Pending') return true;
    if (statusFilter === 'completed' && flashcard.status === 'Completed') return true;
    return false;
  });

  return (
    <SharedPageLayout
      title="Flashcards"
      subtitle="Review and memorize with smart flashcards"
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
                <Plus className="mr-1 h-4 w-4" /> Create Flashcard
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Create New Flashcard</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Select 
                    value={newFlashcard.subject} 
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
                    value={newFlashcard.topic}
                    onChange={handleInputChange}
                    placeholder="E.g., Mechanics, Calculus"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="concept">Concept Area</Label>
                  <Input 
                    id="concept"
                    name="concept"
                    value={newFlashcard.concept}
                    onChange={handleInputChange}
                    placeholder="E.g., Newton's Laws, Integration"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="difficulty">Difficulty Level</Label>
                  <Select 
                    value={newFlashcard.difficulty} 
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
                  <Label htmlFor="question">Question</Label>
                  <Textarea 
                    id="question"
                    name="question"
                    value={newFlashcard.question}
                    onChange={handleInputChange}
                    placeholder="Enter the flashcard question here..."
                    rows={3}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="answer">Answer</Label>
                  <Textarea 
                    id="answer"
                    name="answer"
                    value={newFlashcard.answer}
                    onChange={handleInputChange}
                    placeholder="Enter the flashcard answer here..."
                    rows={3}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="tags">Tags (comma-separated)</Label>
                  <Input 
                    id="tags"
                    name="tags"
                    value={newFlashcard.tags}
                    onChange={handleInputChange}
                    placeholder="E.g., #Mechanics, #Force"
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
                  <Button type="submit">Create Flashcard</Button>
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
          {filteredFlashcards.map((deck) => (
            <Card key={deck.id} className="dashboard-card overflow-hidden hover:shadow-md transition-shadow">
              <CardHeader className="p-4">
                <div className="flex justify-between items-start">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      {deck.subject} • {deck.topic}
                    </span>
                    <CardTitle className="text-lg mt-1">{deck.concept}</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                  <Clock className="mr-1 h-4 w-4" />
                  <span>{deck.timeToReview}</span>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge className={difficultyColors[deck.difficulty as keyof typeof difficultyColors]}>
                    {deck.difficulty}
                  </Badge>
                  <Badge className={statusColors[deck.status as keyof typeof statusColors]}>
                    {deck.status}
                  </Badge>
                  <Badge variant="outline">{deck.cardCount} cards</Badge>
                </div>
                
                <div className="flex flex-wrap gap-1 mb-2">
                  {deck.tags.map((tag, index) => (
                    <span key={index} className="text-xs text-blue-600 dark:text-blue-400">
                      {tag}{index < deck.tags.length - 1 ? ' ' : ''}
                    </span>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button asChild variant="ghost" className="w-full justify-between">
                  <Link to={`/dashboard/student/flashcards/${deck.id}/interactive`}>
                    Practice Now
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

export default FlashcardsView;
