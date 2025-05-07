
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { 
  BookOpen, 
  ChevronLeft, 
  Book, 
  Video, 
  Bookmark, 
  BookmarkPlus, 
  PenLine,
  CheckCircle,
  XCircle,
  HelpCircle,
  Brain,
  Clock,
  BarChart,
  FileText,
  MessageSquare,
  Star,
  Volume2,
  Lightbulb
} from 'lucide-react';

// Mock data for a concept
const mockConceptData = {
  id: '1',
  title: "Newton's Laws of Motion",
  subject: "Physics",
  chapter: "Classical Mechanics",
  difficulty: "Medium",
  masteryScore: 65,
  lastViewed: "2 days ago",
  firstViewed: "2 weeks ago",
  viewCount: 8,
  bookmarked: false,
  description: "Understand the fundamental principles that describe the relationship between forces and motion.",
  simpleExplanation: "Newton's three laws of motion describe how forces interact with objects and how objects move as a result of these forces. The first law states that objects at rest stay at rest, and objects in motion stay in motion unless acted upon by a force. The second law defines force as mass multiplied by acceleration (F=ma). The third law states that for every action, there is an equal and opposite reaction.",
  detailedExplanation: "Newton's First Law (Law of Inertia): An object at rest stays at rest, and an object in motion stays in motion with the same speed and in the same direction unless acted upon by an unbalanced force. This is essentially the definition of inertia – the tendency of objects to resist changes in their state of motion.\n\nNewton's Second Law: The acceleration of an object depends directly upon the net force acting upon the object, and inversely upon the mass of the object. This is mathematically expressed as F = ma, where F is the net force, m is the mass, and a is the acceleration. This relationship means that the same force will cause different accelerations for objects with different masses.\n\nNewton's Third Law: For every action, there is an equal and opposite reaction. When one object exerts a force on a second object, the second object exerts an equal force in the opposite direction on the first object. This explains why rockets can propel forward – they push exhaust gases backward, and the gases push the rocket forward.",
  examples: [
    {
      title: "Basic Example: Car Braking",
      content: "When a car brakes suddenly, passengers feel a forward jerk. This is Newton's First Law in action – their bodies want to continue moving forward due to inertia, while the car is slowing down."
    },
    {
      title: "Basic Example: Force and Acceleration",
      content: "When you push a shopping cart, it accelerates more with a harder push (more force = more acceleration) and accelerates less if it's loaded with groceries (more mass = less acceleration), demonstrating Newton's Second Law."
    },
    {
      title: "Real-World Use Case: Rocket Propulsion",
      content: "Rockets work based on Newton's Third Law. They expel exhaust gases backward at high speed, and the equal and opposite reaction pushes the rocket forward into space. This principle is fundamental to modern space exploration."
    },
    {
      title: "AI-Generated Analogy: The Stubborn Mule",
      content: "Think of Newton's First Law like a stubborn mule. When it's standing still, it takes considerable effort to get it moving. Once it's moving, it requires similar effort to get it to stop. The mule's stubbornness is like inertia – resistance to changes in motion."
    }
  ],
  diagrams: [
    {
      title: "Force Vectors",
      description: "Visual representation of force vectors showing how multiple forces combine to produce a net force.",
      imageUrl: "https://example.com/force-vectors.jpg"
    },
    {
      title: "Action-Reaction Pairs",
      description: "Diagram illustrating how action-reaction force pairs work in various scenarios.",
      imageUrl: "https://example.com/action-reaction.jpg"
    }
  ],
  examRelevance: {
    pastQuestions: [
      "A 2kg object experiences a net force of 8N. Calculate its acceleration.",
      "Explain how Newton's Third Law applies to a person walking forward."
    ],
    weightage: "High (typically constitutes 15-20% of mechanics questions)",
    expectedFormat: "Both numerical problems (especially Second Law) and conceptual explanations."
  },
  commonMistakes: [
    "Confusing mass and weight (mass is constant; weight depends on gravitational field strength)",
    "Forgetting that Newton's laws apply in inertial frames of reference only",
    "Misidentifying action-reaction pairs (they always act on different objects)",
    "Applying the equation F=ma when multiple forces are present, without first finding the net force"
  ],
  videoExplanation: {
    title: "Understanding Newton's Laws",
    duration: "8:42",
    thumbnail: "https://example.com/newton-video-thumb.jpg",
    url: "https://example.com/newton-video"
  },
  relatedConcepts: [
    { id: "2", title: "Momentum and Impulse" },
    { id: "3", title: "Work and Energy" },
    { id: "4", title: "Circular Motion" }
  ],
  relatedFlashcards: [
    { id: "flash-1", title: "Newton's Laws Application" },
    { id: "flash-2", title: "Force and Motion Basics" }
  ],
  analytics: {
    tabEngagement: {
      simple: 65, // percentage
      detailed: 42,
      examples: 78,
      diagrams: 55,
      examRelevance: 30,
      commonMistakes: 25,
      videoExplanation: 20
    },
    recallAttempts: [
      { date: "May 1, 2023", success: true, timeToRecall: 4.2 }, // seconds
      { date: "May 3, 2023", success: true, timeToRecall: 3.8 },
      { date: "May 10, 2023", success: false, timeToRecall: 7.5 },
      { date: "May 11, 2023", success: true, timeToRecall: 5.1 }
    ],
    quizResults: {
      accuracy: 72, // percentage
      attemptsCount: 3,
      averageScore: 8.5, // out of 10
      lastAttempt: "May 12, 2023"
    },
    retentionScore: 68, // AI-predicted percentage
    nextReviewDate: "May 18, 2023",
    timeSpent: 45 // minutes
  }
};

const ConceptCardDetailPage: React.FC = () => {
  const { conceptId } = useParams<{ conceptId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("simple");
  const [isBookmarked, setIsBookmarked] = useState(mockConceptData.bookmarked);
  const [showNotes, setShowNotes] = useState(false);
  const [notes, setNotes] = useState("");
  const [isReading, setIsReading] = useState(false);
  
  // In a real app, this would be an API call
  const conceptData = mockConceptData;

  useEffect(() => {
    // This would be tracking the time spent on the page
    const timer = setTimeout(() => {
      console.log("Time spent tracking...");
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleBookmarkToggle = () => {
    setIsBookmarked(!isBookmarked);
    toast({
      title: isBookmarked ? "Bookmark removed" : "Concept bookmarked",
      description: isBookmarked 
        ? "This concept has been removed from your bookmarks" 
        : "You can find this concept in your bookmarked items"
    });
  };

  const handleSaveNotes = () => {
    toast({
      title: "Notes saved",
      description: "Your notes for this concept have been saved"
    });
    setShowNotes(false);
  };

  const handleVoiceReadToggle = () => {
    setIsReading(!isReading);
    toast({
      title: isReading ? "Voice reading stopped" : "Voice reading started",
      description: isReading 
        ? "Voice reading has been stopped" 
        : "The content will now be read aloud"
    });
  };

  const handleStudyClick = () => {
    navigate(`/dashboard/student/concepts/${conceptId}/study`);
    toast({
      title: "Loading study materials",
      description: "Preparing your personalized learning experience"
    });
  };

  // Helper functions for UI elements
  const getDifficultyColor = (difficulty: string): string => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'bg-green-100 text-green-700 border-green-200';
      case 'medium': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'hard': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  const getMasteryColor = (score: number): string => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-amber-500';
    return 'bg-red-500';
  };

  const getRetentionStatusIcon = (score: number) => {
    if (score >= 80) return <CheckCircle className="h-5 w-5 text-green-500" />;
    if (score >= 50) return <HelpCircle className="h-5 w-5 text-amber-500" />;
    return <XCircle className="h-5 w-5 text-red-500" />;
  };

  return (
    <SharedPageLayout
      title={conceptData.title}
      subtitle={`${conceptData.subject} > ${conceptData.chapter}`}
      showBackButton={true}
      backButtonUrl="/dashboard/student/concepts"
    >
      <div className="space-y-6">
        {/* Header with concept overview */}
        <Card className="border-l-4 border-blue-500">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <Book className="h-6 w-6 text-blue-600" />
                <div>
                  <CardTitle className="text-2xl">{conceptData.title}</CardTitle>
                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                    <Badge variant="outline">{conceptData.subject}</Badge>
                    <Badge variant="outline">{conceptData.chapter}</Badge>
                    <Badge variant="outline" className={getDifficultyColor(conceptData.difficulty)}>
                      {conceptData.difficulty}
                    </Badge>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleBookmarkToggle}
                  className={isBookmarked ? "text-amber-500 border-amber-200" : ""}
                >
                  {isBookmarked ? <Bookmark className="fill-amber-500" /> : <BookmarkPlus />}
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleVoiceReadToggle}
                  className={isReading ? "bg-blue-50 text-blue-600" : ""}
                >
                  <Volume2 className={isReading ? "text-blue-600" : ""} />
                </Button>
              </div>
            </div>
          </CardHeader>
          
          <CardContent>
            <p className="text-gray-600 mb-4">{conceptData.description}</p>
            
            <div className="mb-4">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium">Mastery Level</span>
                <span className="text-sm font-medium">{conceptData.masteryScore}%</span>
              </div>
              <Progress value={conceptData.masteryScore} className={`h-2 ${getMasteryColor(conceptData.masteryScore)}`} />
            </div>
            
            <div className="flex flex-wrap gap-2">
              <div className="text-xs text-gray-500 flex items-center">
                <Clock className="h-3.5 w-3.5 mr-1" />
                First studied: {conceptData.firstViewed}
              </div>
              <div className="text-xs text-gray-500 flex items-center">
                <Clock className="h-3.5 w-3.5 mr-1" />
                Last viewed: {conceptData.lastViewed}
              </div>
              <div className="text-xs text-gray-500 flex items-center">
                <BarChart className="h-3.5 w-3.5 mr-1" />
                Viewed {conceptData.viewCount} times
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main tabs section */}
        <Card className="shadow-md">
          <CardHeader className="pb-0 border-b">
            <Tabs defaultValue="simple" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="w-full justify-start overflow-x-auto flex-nowrap">
                <TabsTrigger value="simple">Simple Explanation</TabsTrigger>
                <TabsTrigger value="detailed">Detailed Explanation</TabsTrigger>
                <TabsTrigger value="examples">Examples</TabsTrigger>
                <TabsTrigger value="diagrams">Diagrams</TabsTrigger>
                <TabsTrigger value="exam">Exam Relevance</TabsTrigger>
                <TabsTrigger value="mistakes">Common Mistakes</TabsTrigger>
                <TabsTrigger value="video">Video Explanation</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          
          <CardContent className="pt-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsContent value="simple" className="mt-0">
                <div className="prose max-w-none dark:prose-invert">
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mb-4 flex items-start">
                    <Lightbulb className="h-5 w-5 text-amber-500 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-lg font-medium text-blue-800 dark:text-blue-300 mb-1">Key Takeaway</h3>
                      <p className="text-blue-700 dark:text-blue-300">Newton's laws describe how objects move in response to forces. They're the foundation of classical mechanics.</p>
                    </div>
                  </div>
                  <p>{conceptData.simpleExplanation}</p>
                </div>
              </TabsContent>
              
              <TabsContent value="detailed" className="mt-0">
                <div className="prose max-w-none dark:prose-invert">
                  {conceptData.detailedExplanation.split('\n\n').map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                  
                  <div className="mt-6 bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/30 dark:to-indigo-900/30 p-4 rounded-lg">
                    <h3 className="text-lg font-medium text-indigo-800 dark:text-indigo-200 flex items-center mb-3">
                      <Brain className="h-5 w-5 mr-2 text-indigo-600" />
                      Mathematical Representation
                    </h3>
                    <div className="bg-white dark:bg-gray-800 p-3 rounded shadow-sm font-mono text-center">
                      F = ma
                    </div>
                    <p className="mt-2 text-sm text-indigo-700 dark:text-indigo-300">
                      Where F is the net force applied, m is the mass of the object, and a is the resulting acceleration.
                    </p>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="examples" className="mt-0">
                <div className="space-y-6">
                  {conceptData.examples.map((example, idx) => (
                    <div key={idx} className={`p-4 rounded-lg ${
                      example.title.includes("Basic") 
                        ? "bg-blue-50 dark:bg-blue-900/20" 
                        : example.title.includes("Real-World") 
                          ? "bg-green-50 dark:bg-green-900/20"
                          : "bg-purple-50 dark:bg-purple-900/20"
                    }`}>
                      <h3 className="font-medium text-lg mb-2 flex items-center">
                        {example.title.includes("Basic") ? (
                          <FileText className="h-5 w-5 text-blue-600 mr-2" />
                        ) : example.title.includes("Real-World") ? (
                          <BarChart className="h-5 w-5 text-green-600 mr-2" />
                        ) : (
                          <Lightbulb className="h-5 w-5 text-purple-600 mr-2" />
                        )}
                        {example.title}
                      </h3>
                      <p>{example.content}</p>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="diagrams" className="mt-0">
                <div className="space-y-6">
                  {conceptData.diagrams.map((diagram, idx) => (
                    <div key={idx} className="border rounded-lg p-4">
                      <h3 className="font-medium mb-2">{diagram.title}</h3>
                      <p className="text-sm text-gray-600 mb-3">{diagram.description}</p>
                      <div className="w-full aspect-video bg-gray-200 dark:bg-gray-700 flex items-center justify-center rounded-md">
                        <span className="text-gray-500 dark:text-gray-400">
                          {diagram.imageUrl ? "Diagram Image" : "No image available"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="exam" className="mt-0">
                <div className="space-y-4">
                  <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg">
                    <h3 className="font-semibold text-amber-800 dark:text-amber-300 mb-2 flex items-center">
                      <FileText className="h-5 w-5 mr-2 text-amber-600" />
                      Exam Weightage and Format
                    </h3>
                    <p className="text-amber-700 dark:text-amber-300">{conceptData.examRelevance.weightage}</p>
                    <p className="text-amber-700 dark:text-amber-300 mt-2">{conceptData.examRelevance.expectedFormat}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-3 flex items-center">
                      <FileText className="h-5 w-5 mr-2" />
                      Sample Past Questions
                    </h3>
                    <div className="space-y-3">
                      {conceptData.examRelevance.pastQuestions.map((question, idx) => (
                        <div key={idx} className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md">
                          <span className="text-sm font-medium text-gray-500">Question {idx + 1}:</span>
                          <p>{question}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="mistakes" className="mt-0">
                <div>
                  <h3 className="font-medium mb-3 flex items-center">
                    <XCircle className="h-5 w-5 mr-2 text-red-500" />
                    Common Mistakes to Avoid
                  </h3>
                  <div className="space-y-3">
                    {conceptData.commonMistakes.map((mistake, idx) => (
                      <div key={idx} className="bg-red-50 dark:bg-red-900/20 p-3 rounded-md">
                        <p className="text-red-700 dark:text-red-300">{mistake}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="video" className="mt-0">
                <div className="flex flex-col items-center">
                  <div className="w-full aspect-video bg-gray-200 dark:bg-gray-700 flex items-center justify-center rounded-md mb-4">
                    <Button variant="outline" className="flex items-center">
                      <Video className="mr-2 h-5 w-5" />
                      Play Video
                    </Button>
                  </div>
                  <div className="w-full">
                    <h3 className="font-medium mb-1">{conceptData.videoExplanation.title}</h3>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>Duration: {conceptData.videoExplanation.duration}</span>
                      <Button variant="ghost" size="sm">Download Video</Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Enhanced Concept Card Analysis Section */}
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 shadow-md">
          <CardHeader>
            <CardTitle className="text-xl text-blue-800 dark:text-blue-200 flex items-center">
              <BarChart className="h-5 w-5 mr-2 text-blue-600" />
              Concept Mastery Analysis
            </CardTitle>
          </CardHeader>
          
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Performance Overview */}
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                <h3 className="text-lg font-medium mb-3 flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                  Performance Overview
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Concept Mastery Score</span>
                      <span className="text-sm font-medium">{conceptData.masteryScore}%</span>
                    </div>
                    <Progress value={conceptData.masteryScore} className={`h-2 ${getMasteryColor(conceptData.masteryScore)}`} />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Quiz Accuracy</span>
                      <span className="text-sm font-medium">{conceptData.analytics.quizResults.accuracy}%</span>
                    </div>
                    <Progress value={conceptData.analytics.quizResults.accuracy} className="h-2 bg-green-500" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-blue-500" />
                      <span>Time spent: {conceptData.analytics.timeSpent} min</span>
                    </div>
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 mr-2 text-purple-500" />
                      <span>Quiz attempts: {conceptData.analytics.quizResults.attemptsCount}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Recall & Retention */}
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                <h3 className="text-lg font-medium mb-3 flex items-center">
                  <Brain className="h-4 w-4 mr-2 text-purple-500" />
                  Recall & Retention
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Long-Term Retention</span>
                      <span className="text-sm font-medium">{conceptData.analytics.retentionScore}%</span>
                    </div>
                    <Progress value={conceptData.analytics.retentionScore} className="h-2 bg-purple-500" />
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Recall History</span>
                      <Badge variant="outline" className="text-xs">
                        {conceptData.analytics.recallAttempts.length} attempts
                      </Badge>
                    </div>
                    <div className="relative pt-2">
                      <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200 dark:bg-gray-600">
                        {conceptData.analytics.recallAttempts.map((attempt, idx) => (
                          <div 
                            key={idx}
                            className={`h-full ${attempt.success ? 'bg-green-500' : 'bg-red-500'}`} 
                            style={{ width: `${100 / conceptData.analytics.recallAttempts.length}%` }}
                          ></div>
                        ))}
                      </div>
                    </div>
                    <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
                      <span>Next review: {conceptData.analytics.nextReviewDate}</span>
                      <div className="flex items-center">
                        {getRetentionStatusIcon(conceptData.analytics.retentionScore)}
                        <span className="ml-1">
                          {conceptData.analytics.retentionScore >= 80 
                            ? "Strong retention" 
                            : conceptData.analytics.retentionScore >= 50 
                              ? "Moderate retention" 
                              : "Weak retention"
                          }
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Engagement Insights */}
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                <h3 className="text-lg font-medium mb-3 flex items-center">
                  <BarChart className="h-4 w-4 mr-2 text-blue-500" />
                  Engagement Insights
                </h3>
                
                <div className="space-y-3">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Tab engagement</p>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(conceptData.analytics.tabEngagement).map(([tab, percentage]) => (
                      <div key={tab} className="text-xs">
                        <div className="flex justify-between mb-1">
                          <span className="capitalize">{tab.replace(/([A-Z])/g, ' $1').trim()}</span>
                          <span>{percentage}%</span>
                        </div>
                        <Progress value={percentage as number} className="h-1.5" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Smart Feedback */}
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                <h3 className="text-lg font-medium mb-3 flex items-center">
                  <MessageSquare className="h-4 w-4 mr-2 text-amber-500" />
                  Smart Feedback
                </h3>
                
                <div className="space-y-3">
                  <div className="bg-amber-50 dark:bg-amber-900/20 p-2.5 rounded text-sm">
                    <p className="text-amber-800 dark:text-amber-200">
                      <span className="font-medium">Focus Area:</span> Review the detailed explanations and examples to strengthen your understanding.
                    </p>
                  </div>
                  
                  <div className="text-sm">
                    <p className="font-medium mb-1">Related Content to Explore:</p>
                    <div className="grid grid-cols-1 gap-1">
                      {conceptData.relatedConcepts.map(concept => (
                        <Button 
                          key={concept.id}
                          variant="ghost" 
                          size="sm" 
                          className="justify-start text-left"
                          onClick={() => navigate(`/dashboard/student/concepts/card/${concept.id}`)}
                        >
                          <Book className="h-3.5 w-3.5 mr-2" />
                          {concept.title}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notes section */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <PenLine className="h-5 w-5 mr-2" />
              Your Notes
            </CardTitle>
          </CardHeader>
          <CardContent>
            {showNotes ? (
              <div className="space-y-3">
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full min-h-[150px] p-3 border rounded-md resize-none"
                  placeholder="Add your notes about this concept here..."
                />
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setShowNotes(false)}>Cancel</Button>
                  <Button onClick={handleSaveNotes}>Save Notes</Button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-6 text-center">
                <PenLine className="h-10 w-10 text-gray-300 mb-2" />
                <h3 className="font-medium mb-1">No notes yet</h3>
                <p className="text-sm text-gray-500 mb-3">
                  Add your own notes to help remember this concept
                </p>
                <Button variant="outline" onClick={() => setShowNotes(true)}>
                  <PenLine className="h-4 w-4 mr-2" />
                  Add Notes
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Related content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Related Concepts */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Book className="h-5 w-5 mr-2" />
                Related Concepts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {conceptData.relatedConcepts.map((concept) => (
                <Button
                  key={concept.id}
                  variant="outline"
                  className="w-full justify-start text-left"
                  onClick={() => navigate(`/dashboard/student/concepts/card/${concept.id}`)}
                >
                  <Book className="h-4 w-4 mr-2" />
                  {concept.title}
                </Button>
              ))}
            </CardContent>
          </Card>
          
          {/* Related Flashcards */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <BookOpen className="h-5 w-5 mr-2" />
                Related Flashcards
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {conceptData.relatedFlashcards.map((flashcard) => (
                <Button
                  key={flashcard.id}
                  variant="outline"
                  className="w-full justify-start text-left"
                  onClick={() => navigate(`/dashboard/student/flashcards/${flashcard.id}`)}
                >
                  <BookOpen className="h-4 w-4 mr-2" />
                  {flashcard.title}
                </Button>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Start learning button */}
        <div className="flex justify-center mt-6">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium px-8 py-6 shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
            onClick={handleStudyClick}
          >
            <BookOpen className="mr-2 h-5 w-5" />
            Start Interactive Learning
          </Button>
        </div>
      </div>
    </SharedPageLayout>
  );
};

export default ConceptCardDetailPage;
