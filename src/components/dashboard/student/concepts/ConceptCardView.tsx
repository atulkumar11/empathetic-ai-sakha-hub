import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { 
  ArrowLeft, BookOpen, Brain, FileText, Bookmark, BookmarkPlus,
  Clock, CheckCircle, RotateCw, Volume2, Play, 
  PenLine, MessageSquare, FileQuestion, ArrowRight
} from 'lucide-react';

interface ConceptCardData {
  id: string;
  title: string;
  subject: string;
  topic: string;
  simpleExplanation: string;
  detailedExplanation: string;
  examples: {
    question: string;
    solution: string;
    steps: string[];
  }[];
  diagrams: { description: string; imageUrl?: string; }[];
  realWorldApplications: string[];
  examRelevance: {
    importance: 'high' | 'medium' | 'low';
    frequentQuestions: string[];
    tips: string[];
  };
  commonMistakes: string[];
  videoUrl?: string;
  tags: string[];
  difficulty: 'easy' | 'medium' | 'hard';
}

// Mock data for a concept card
const mockConceptData: ConceptCardData = {
  id: '1',
  title: "Newton's Laws of Motion",
  subject: "Physics",
  topic: "Classical Mechanics",
  simpleExplanation: "Newton's three laws of motion describe the relationship between a body and the forces acting upon it, and its motion in response to those forces. These laws are fundamental to classical mechanics.",
  detailedExplanation: "Newton's First Law (Law of Inertia): An object at rest stays at rest, and an object in motion stays in motion with the same speed and in the same direction unless acted upon by an unbalanced force.\n\nNewton's Second Law (F = ma): The acceleration of an object depends directly upon the net force acting upon the object, and inversely upon the mass of the object.\n\nNewton's Third Law: For every action, there is an equal and opposite reaction. Forces always occur in pairs.",
  examples: [
    {
      question: "A 2kg object is subjected to a force of 10 Newtons. What is its acceleration?",
      solution: "a = F/m = 10/2 = 5 m/s²",
      steps: [
        "Identify the known values: mass (m) = 2kg, force (F) = 10N",
        "Apply Newton's Second Law: F = ma",
        "Rearrange to solve for acceleration: a = F/m",
        "Substitute the values: a = 10/2 = 5 m/s²"
      ]
    },
    {
      question: "Explain why passengers in a car move forward when the driver brakes suddenly.",
      solution: "According to Newton's First Law, objects in motion tend to stay in motion unless acted upon by an external force. When a car brakes suddenly, the passengers' bodies continue moving forward due to inertia until restrained by seat belts or other forces.",
      steps: [
        "Consider Newton's First Law (Law of Inertia)",
        "The passengers are initially moving with the car",
        "When the car brakes, it applies a force to stop",
        "The passengers' bodies continue moving forward due to inertia",
        "They stop only when acted upon by another force (seat belt, dashboard, etc.)"
      ]
    }
  ],
  diagrams: [
    {
      description: "Force diagram showing Newton's Second Law",
      imageUrl: "https://example.com/force-diagram.jpg"
    },
    {
      description: "Illustration of Newton's Third Law with rocket propulsion",
      imageUrl: "https://example.com/rocket-propulsion.jpg"
    }
  ],
  realWorldApplications: [
    "Rocket propulsion: Rockets move forward by expelling gas backwards (Third Law)",
    "Car safety features: Seat belts and airbags counteract inertia in collisions (First Law)",
    "Sports: In baseball, the force applied to a ball determines its acceleration (Second Law)"
  ],
  examRelevance: {
    importance: 'high',
    frequentQuestions: [
      "Calculating acceleration using F = ma",
      "Explaining real-world phenomena using Newton's Laws",
      "Force diagram analysis"
    ],
    tips: [
      "Always draw force diagrams for problems involving multiple forces",
      "Remember that Newton's Laws apply only in inertial reference frames",
      "Pay attention to units: force in Newtons, mass in kg, acceleration in m/s²"
    ]
  },
  commonMistakes: [
    "Forgetting that weight is a force (mass × gravity)",
    "Confusing mass and weight",
    "Incorrectly identifying all forces acting on an object"
  ],
  videoUrl: "https://example.com/newtons-laws-video.mp4",
  tags: ["Newton", "Classical Mechanics", "Forces", "Motion", "Physics Fundamentals"],
  difficulty: "medium"
};

const ConceptCardView = () => {
  const { conceptId } = useParams<{ conceptId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("simple");
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [studyTime, setStudyTime] = useState(0);
  const [mastery, setMastery] = useState(30); // Initial mastery level (0-100)
  const [hasAddedNote, setHasAddedNote] = useState(false);
  
  // In a real app, we would fetch the concept data from an API
  const conceptData = mockConceptData;
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  // React useEffect would be used to track study time, etc.
  
  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    toast({
      title: !isBookmarked ? "Concept bookmarked" : "Bookmark removed",
      description: !isBookmarked 
        ? "You can find this concept in your bookmarks section." 
        : "Concept removed from your bookmarks.",
    });
  };
  
  const handleAddNote = () => {
    setHasAddedNote(true);
    toast({
      title: "Note added",
      description: "Your note has been saved to this concept card",
    });
  };
  
  const handleUpdateMastery = (increase: boolean) => {
    const change = increase ? 10 : -10;
    const newMastery = Math.max(0, Math.min(100, mastery + change));
    setMastery(newMastery);
    
    toast({
      title: increase ? "Mastery increased" : "Mastery decreased",
      description: `Your mastery is now ${newMastery}%`,
      variant: increase ? "default" : "secondary",
    });
  };
  
  // Add a function to navigate to flashcards
  const handleStartInteractiveLearning = () => {
    navigate(`/dashboard/student/flashcards/physics-${conceptId}/interactive`);
    toast({
      title: "Interactive learning started",
      description: "Get ready to master this concept with flashcards!",
    });
  };
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header area */}
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <Button variant="outline" onClick={() => navigate('/dashboard/student/concepts')} className="mb-2">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Concepts
          </Button>
          <h1 className="text-2xl sm:text-3xl font-bold">{conceptData.title}</h1>
          <div className="flex flex-wrap items-center gap-2 mt-2">
            <Badge variant="secondary">{conceptData.subject}</Badge>
            <Badge>{conceptData.topic}</Badge>
            <Badge variant={
              conceptData.difficulty === 'easy' ? "outline" : 
              conceptData.difficulty === 'medium' ? "secondary" : "destructive"
            }>
              {conceptData.difficulty.charAt(0).toUpperCase() + conceptData.difficulty.slice(1)}
            </Badge>
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="h-4 w-4 mr-1" />
              {formatTime(studyTime)}
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <Button
            variant="outline"
            size="icon"
            onClick={toggleBookmark}
            className={isBookmarked ? "text-yellow-500 border-yellow-200" : ""}
          >
            {isBookmarked ? <Bookmark className="fill-yellow-500" /> : <BookmarkPlus />}
          </Button>
          <Button variant="outline" size="icon">
            <Volume2 />
          </Button>
        </div>
      </div>
      
      {/* Mastery indicator */}
      <div className="mb-6">
        <div className="flex justify-between text-sm mb-1">
          <span>Mastery Level</span>
          <span>{mastery}%</span>
        </div>
        <Progress value={mastery} className="h-2" />
        <div className="flex justify-center space-x-4 mt-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => handleUpdateMastery(false)}
            disabled={mastery <= 0}
          >
            Need More Practice
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => handleUpdateMastery(true)}
            disabled={mastery >= 100}
          >
            I Understand This
          </Button>
        </div>
      </div>
      
      {/* Main content area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Learn: {conceptData.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="w-full justify-start mb-4 overflow-x-auto">
                  <TabsTrigger value="simple">Simple Explanation</TabsTrigger>
                  <TabsTrigger value="detailed">Detailed Explanation</TabsTrigger>
                  <TabsTrigger value="examples">Examples</TabsTrigger>
                  <TabsTrigger value="diagrams">Diagrams</TabsTrigger>
                  <TabsTrigger value="applications">Real-World Applications</TabsTrigger>
                  <TabsTrigger value="exam">Exam Relevance</TabsTrigger>
                  <TabsTrigger value="mistakes">Common Mistakes</TabsTrigger>
                  <TabsTrigger value="video">Video Analysis</TabsTrigger>
                </TabsList>
                
                <TabsContent value="simple" className="prose max-w-none dark:prose-invert">
                  <p>{conceptData.simpleExplanation}</p>
                </TabsContent>
                
                <TabsContent value="detailed" className="prose max-w-none dark:prose-invert">
                  {conceptData.detailedExplanation.split('\n\n').map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </TabsContent>
                
                <TabsContent value="examples">
                  <div className="space-y-6">
                    {conceptData.examples.map((example, idx) => (
                      <div key={idx} className="bg-muted/20 p-4 rounded-lg">
                        <h3 className="font-medium mb-2">Example {idx + 1}</h3>
                        <div className="mb-3 bg-card p-3 rounded-md">
                          <p className="font-medium text-sm mb-1">Question:</p>
                          <p>{example.question}</p>
                        </div>
                        <div className="mb-3">
                          <p className="font-medium text-sm mb-1">Solution:</p>
                          <p>{example.solution}</p>
                        </div>
                        <div>
                          <p className="font-medium text-sm mb-1">Steps:</p>
                          <ol className="list-decimal pl-5 space-y-1">
                            {example.steps.map((step, stepIdx) => (
                              <li key={stepIdx} className="text-sm">{step}</li>
                            ))}
                          </ol>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="diagrams">
                  <div className="space-y-4">
                    {conceptData.diagrams.map((diagram, idx) => (
                      <div key={idx} className="border rounded-lg p-4">
                        <h3 className="font-medium mb-2">Diagram {idx + 1}</h3>
                        <p className="text-sm mb-3">{diagram.description}</p>
                        <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 flex items-center justify-center rounded-md">
                          <span className="text-gray-500 dark:text-gray-400">
                            {diagram.imageUrl ? "Diagram Image" : "No image available"}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="applications">
                  <div>
                    <h3 className="font-medium mb-3">Real-World Applications</h3>
                    <ul className="list-disc pl-5 space-y-2">
                      {conceptData.realWorldApplications.map((app, idx) => (
                        <li key={idx}>{app}</li>
                      ))}
                    </ul>
                  </div>
                </TabsContent>
                
                <TabsContent value="exam">
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <h3 className="font-medium">Importance in Exams:</h3>
                      <Badge className={`ml-2 ${
                        conceptData.examRelevance.importance === 'high' ? 'bg-red-100 text-red-800' :
                        conceptData.examRelevance.importance === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {conceptData.examRelevance.importance.toUpperCase()}
                      </Badge>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-2">Frequently Asked Questions</h3>
                      <ul className="list-disc pl-5 space-y-1">
                        {conceptData.examRelevance.frequentQuestions.map((q, idx) => (
                          <li key={idx}>{q}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-2">Exam Tips</h3>
                      <ul className="list-disc pl-5 space-y-1">
                        {conceptData.examRelevance.tips.map((tip, idx) => (
                          <li key={idx}>{tip}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="mistakes">
                  <div>
                    <h3 className="font-medium mb-3">Common Mistakes to Avoid</h3>
                    <ul className="list-disc pl-5 space-y-2">
                      {conceptData.commonMistakes.map((mistake, idx) => (
                        <li key={idx}>{mistake}</li>
                      ))}
                    </ul>
                  </div>
                </TabsContent>
                
                <TabsContent value="video">
                  <div className="flex flex-col items-center">
                    <div className="w-full aspect-video bg-gray-200 dark:bg-gray-700 flex items-center justify-center rounded-md mb-4">
                      <Button variant="outline">
                        <Play className="mr-2 h-4 w-4" />
                        Play Video
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Video explanation of {conceptData.title}
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
          {/* Practice section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Button 
              onClick={() => navigate(`/dashboard/student/flashcards/physics-${conceptId}`)}
              className="h-auto py-6 flex flex-col items-center"
            >
              <Brain className="h-10 w-10 mb-2" />
              <div className="text-center">
                <h3 className="font-medium">Practice with Flashcards</h3>
                <p className="text-xs opacity-90">Review key points with spaced repetition</p>
              </div>
            </Button>
            
            <Button 
              variant="outline"
              onClick={() => navigate(`/dashboard/student/practice-exam/quiz-${conceptId}`)}
              className="h-auto py-6 flex flex-col items-center"
            >
              <FileQuestion className="h-10 w-10 mb-2" />
              <div className="text-center">
                <h3 className="font-medium">Take a Practice Quiz</h3>
                <p className="text-xs opacity-90">Test your knowledge with targeted questions</p>
              </div>
            </Button>
          </div>
          
          {/* Add the Start Interactive Learning button */}
          <Button 
            variant="default" 
            size="lg"
            onClick={handleStartInteractiveLearning}
            className="w-full py-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
          >
            <Play className="mr-2 h-5 w-5" />
            Start Interactive Learning
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
        
        <div className="lg:col-span-1 space-y-6">
          {/* User notes */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Your Notes</CardTitle>
            </CardHeader>
            <CardContent className="pt-2">
              {hasAddedNote ? (
                <div className="bg-muted/30 rounded-md p-3 text-sm mb-3">
                  <p>First Law: An object at rest stays at rest, and an object in motion stays in motion unless acted upon by an external force.</p>
                </div>
              ) : (
                <div className="text-center text-muted-foreground py-6">
                  <PenLine className="h-10 w-10 mx-auto mb-2 opacity-50" />
                  <p>You haven't added any notes yet</p>
                </div>
              )}
              
              <Button 
                variant="outline" 
                className="w-full mt-2"
                onClick={handleAddNote}
              >
                <PenLine className="h-4 w-4 mr-2" />
                {hasAddedNote ? "Edit Notes" : "Add Notes"}
              </Button>
            </CardContent>
          </Card>
          
          {/* Tags */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Tags</CardTitle>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="flex flex-wrap gap-2">
                {conceptData.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary">{tag}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Study statistics */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Study Statistics</CardTitle>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Topic Mastery</span>
                    <span>65%</span>
                  </div>
                  <Progress value={65} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Quiz Score</span>
                    <span>72%</span>
                  </div>
                  <Progress value={72} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Time Spent</span>
                    <span>45 minutes</span>
                  </div>
                  <Progress value={60} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Related resources */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Related Concepts</CardTitle>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="space-y-2">
                <Button 
                  variant="outline" 
                  className="w-full justify-start text-left"
                  onClick={() => navigate(`/dashboard/student/concepts/card/2`)}
                >
                  <BookOpen className="mr-2 h-4 w-4" />
                  Conservation of Momentum
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start text-left"
                  onClick={() => navigate(`/dashboard/student/concepts/card/3`)}
                >
                  <BookOpen className="mr-2 h-4 w-4" />
                  Work and Energy
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start text-left"
                  onClick={() => navigate(`/dashboard/student/concepts/card/4`)}
                >
                  <BookOpen className="mr-2 h-4 w-4" />
                  Circular Motion
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Discussion */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Discussion</CardTitle>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="text-center py-4 text-muted-foreground">
                <MessageSquare className="h-10 w-10 mx-auto mb-2 opacity-50" />
                <p>Join the discussion about this concept</p>
                <Button className="mt-3" variant="secondary">
                  View Discussion Thread
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ConceptCardView;
