
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PlusCircle, Book, BookOpen, CheckCircle, Clock, BarChart } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/hooks/use-toast';

const mockExams = [
  {
    id: '1',
    title: 'Physics Full Mock Test',
    subject: 'Physics',
    questionsCount: 50,
    timeInMinutes: 90,
    difficulty: 'medium',
    lastAttempt: null
  },
  {
    id: '2',
    title: 'Chemistry Unit Test: Organic',
    subject: 'Chemistry',
    questionsCount: 30,
    timeInMinutes: 45,
    difficulty: 'hard',
    lastAttempt: '2023-12-01T10:30:00Z'
  },
  {
    id: '3',
    title: 'Mathematics: Calculus',
    subject: 'Mathematics',
    questionsCount: 40,
    timeInMinutes: 60,
    difficulty: 'medium',
    lastAttempt: null
  },
  {
    id: '4',
    title: 'Biology: Human Systems',
    subject: 'Biology',
    questionsCount: 35,
    timeInMinutes: 50,
    difficulty: 'easy',
    lastAttempt: '2023-12-05T14:15:00Z'
  }
];

const subjects = [
  { value: 'physics', label: 'Physics' },
  { value: 'chemistry', label: 'Chemistry' },
  { value: 'mathematics', label: 'Mathematics' },
  { value: 'biology', label: 'Biology' }
];

const topics = {
  physics: ['Mechanics', 'Electromagnetism', 'Optics', 'Thermodynamics', 'Modern Physics'],
  chemistry: ['Organic Chemistry', 'Inorganic Chemistry', 'Physical Chemistry', 'Biochemistry'],
  mathematics: ['Calculus', 'Algebra', 'Geometry', 'Statistics', 'Trigonometry'],
  biology: ['Human Systems', 'Cell Biology', 'Genetics', 'Ecology', 'Evolution']
};

const difficultyLevels = [
  { value: 'easy', label: 'Easy' },
  { value: 'medium', label: 'Medium' },
  { value: 'hard', label: 'Hard' }
];

const formSchema = z.object({
  subject: z.string().min(1, { message: "Subject is required" }),
  topic: z.string().min(1, { message: "Topic is required" }),
  concept: z.string().min(1, { message: "Concept is required" }),
  difficulty: z.string().min(1, { message: "Difficulty level is required" }),
  tags: z.string().optional(),
  numCards: z.number().min(1).max(50)
});

const PracticeExamsSection = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subject: '',
      topic: '',
      concept: '',
      difficulty: 'medium',
      tags: '',
      numCards: 5
    },
  });

  const handleStartExam = (examId: string) => {
    navigate(`/dashboard/student/practice-exam/${examId}/start`);
  };

  const handleReviewExam = (examId: string) => {
    navigate(`/dashboard/student/practice-exam/${examId}/review`);
  };

  const handleSubjectChange = (value: string) => {
    setSelectedSubject(value);
    form.setValue('topic', '');
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Check if user has subscription and credits
    const hasSubscription = true; // This would check the user's subscription status
    const availableCredits = 20; // This would fetch from the user's credit balance
    const creditsNeeded = values.numCards;

    if (!hasSubscription) {
      toast({
        title: "Subscription Required",
        description: "You need a paid subscription to create exam cards.",
        variant: "destructive",
      });
      return;
    }

    if (availableCredits < creditsNeeded) {
      toast({
        title: "Insufficient Credits",
        description: `You need ${creditsNeeded} credits but only have ${availableCredits}. Please purchase more credits.`,
        variant: "destructive",
      });
      // Here you would navigate to credit purchase page
      return;
    }

    // Process card creation
    toast({
      title: "Creating Exam Cards",
      description: `Creating ${values.numCards} ${values.difficulty} cards for ${values.subject} - ${values.topic}`,
    });

    // Close dialog and show success after simulated delay
    setTimeout(() => {
      setIsCreateDialogOpen(false);
      toast({
        title: "Exam Cards Created",
        description: `${values.numCards} new cards have been added to your practice exams.`,
      });
    }, 2000);
  };

  const filteredExams = activeTab === 'all' 
    ? mockExams 
    : mockExams.filter(exam => {
        if (activeTab === 'completed') return exam.lastAttempt !== null;
        if (activeTab === 'pending') return exam.lastAttempt === null;
        return true;
      });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Practice Exams</h2>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="h-4 w-4 mr-2" />
              Create Exam Card
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Create New Exam Cards</DialogTitle>
              <DialogDescription>
                Design custom practice exam cards. Each card uses 1 credit from your account.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject</FormLabel>
                      <Select 
                        onValueChange={(value) => {
                          field.onChange(value);
                          handleSubjectChange(value);
                        }}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a subject" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {subjects.map((subject) => (
                            <SelectItem key={subject.value} value={subject.value}>
                              {subject.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="topic"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Topic</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled={!selectedSubject}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={selectedSubject ? "Select a topic" : "Select a subject first"} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {selectedSubject && 
                            topics[selectedSubject as keyof typeof topics]?.map((topic) => (
                              <SelectItem key={topic} value={topic.toLowerCase()}>
                                {topic}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="concept"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Concept</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter specific concept" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="difficulty"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Difficulty Level</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select difficulty" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {difficultyLevels.map((level) => (
                            <SelectItem key={level.value} value={level.value}>
                              {level.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="tags"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tags (Comma separated)</FormLabel>
                      <FormControl>
                        <Input placeholder="exam, important, revision" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="numCards"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Number of Cards to Create: {field.value}</FormLabel>
                      <FormControl>
                        <Slider
                          value={[field.value]}
                          min={1}
                          max={20}
                          step={1}
                          onValueChange={(value) => field.onChange(value[0])}
                          className="py-4"
                        />
                      </FormControl>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>1 card</span>
                        <span>20 cards</span>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="pt-2 border-t">
                  <div className="flex justify-between text-sm">
                    <span>Credits required:</span>
                    <span className="font-medium">{form.watch('numCards')}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Your available credits:</span>
                    <span className="font-medium">20</span>
                  </div>
                </div>

                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>Cancel</Button>
                  <Button type="submit">Create Cards</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full sm:w-auto">
          <TabsTrigger value="all">All Exams</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredExams.map((exam) => (
              <ExamCard 
                key={exam.id} 
                exam={exam} 
                onStart={handleStartExam} 
                onReview={handleReviewExam} 
              />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="completed" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredExams.map((exam) => (
              <ExamCard 
                key={exam.id} 
                exam={exam} 
                onStart={handleStartExam} 
                onReview={handleReviewExam} 
              />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="pending" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredExams.map((exam) => (
              <ExamCard 
                key={exam.id} 
                exam={exam} 
                onStart={handleStartExam} 
                onReview={handleReviewExam} 
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface ExamCardProps {
  exam: {
    id: string;
    title: string;
    subject: string;
    questionsCount: number;
    timeInMinutes: number;
    difficulty: string;
    lastAttempt: string | null;
  };
  onStart: (id: string) => void;
  onReview: (id: string) => void;
}

const ExamCard: React.FC<ExamCardProps> = ({ exam, onStart, onReview }) => {
  const difficultyColor = {
    easy: 'text-green-600 bg-green-50',
    medium: 'text-amber-600 bg-amber-50',
    hard: 'text-red-600 bg-red-50'
  }[exam.difficulty];

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <CardTitle className="text-base font-medium">{exam.title}</CardTitle>
          <span className={`text-xs px-2 py-1 rounded-full ${difficultyColor}`}>
            {exam.difficulty.charAt(0).toUpperCase() + exam.difficulty.slice(1)}
          </span>
        </div>
        <p className="text-sm text-muted-foreground">{exam.subject}</p>
      </CardHeader>
      <CardContent>
        <div className="flex mb-4 text-sm">
          <div className="flex items-center mr-4">
            <Book className="h-4 w-4 mr-1 text-muted-foreground" />
            <span>{exam.questionsCount} Questions</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
            <span>{exam.timeInMinutes} Minutes</span>
          </div>
        </div>
        
        {exam.lastAttempt ? (
          <div className="flex justify-between">
            <Button 
              variant="default" 
              size="sm" 
              className="flex-1 mr-2"
              onClick={() => onStart(exam.id)}
            >
              <BookOpen className="h-4 w-4 mr-2" />
              Retry
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1"
              onClick={() => onReview(exam.id)}
            >
              <BarChart className="h-4 w-4 mr-2" />
              Review
            </Button>
          </div>
        ) : (
          <Button 
            className="w-full" 
            size="sm"
            onClick={() => onStart(exam.id)}
          >
            <PlayIcon className="h-4 w-4 mr-2" />
            Start Exam
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

// PlayIcon component
const PlayIcon = ({ className = "" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <polygon points="5 3 19 12 5 21 5 3" />
  </svg>
);

export default PracticeExamsSection;
