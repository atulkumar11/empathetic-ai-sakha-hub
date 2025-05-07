
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useConceptCardDetails } from '@/hooks/useUserStudyPlan';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { ArrowLeft, Book, BookOpen, Brain, Star, AlertTriangle, Lightbulb, Clock, Award, Video, Activity, CheckCircle, PlusCircle, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';

// Enhanced interfaces for the study page
interface ConceptNote {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

interface ConceptAnalytics {
  masteryScore: number;
  accuracyRate: number;
  timeSpentByTab: {
    [key: string]: number; // in seconds
  };
  firstStudied: string;
  lastReviewed: string;
  recallAttempts: Array<{
    date: string;
    success: boolean;
    timeTaken: number;
  }>;
  retentionScore: number;
  tabsEngagement: {
    [key: string]: {
      viewed: boolean;
      timeSpent: number;
    };
  };
}

const ConceptStudyLandingPage: React.FC = () => {
  const { conceptId } = useParams<{ conceptId: string }>();
  const { conceptCard, loading } = useConceptCardDetails(conceptId || '');
  const [activeTab, setActiveTab] = useState('explanation');
  const [detailLevel, setDetailLevel] = useState<'simple' | 'detailed'>('simple');
  const [isReading, setIsReading] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [userNotes, setUserNotes] = useState<ConceptNote[]>([]);
  const [newNote, setNewNote] = useState('');
  const [conceptAnalytics, setConceptAnalytics] = useState<ConceptAnalytics | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Simulated data
  useEffect(() => {
    if (conceptId) {
      // Simulate loading notes
      setUserNotes([
        {
          id: '1',
          content: 'Remember the formula F = ma is central to this concept.',
          createdAt: '2023-04-15T12:30:00Z',
          updatedAt: '2023-04-15T12:30:00Z'
        },
        {
          id: '2',
          content: 'This connects directly to the conservation of momentum concept we studied last week.',
          createdAt: '2023-04-16T10:15:00Z',
          updatedAt: '2023-04-16T10:15:00Z'
        }
      ]);

      // Simulate analytics data
      setConceptAnalytics({
        masteryScore: 72,
        accuracyRate: 85,
        timeSpentByTab: {
          explanation: 340,
          examples: 210,
          mistakes: 150,
          examRelevance: 125
        },
        firstStudied: '2023-04-10T09:00:00Z',
        lastReviewed: '2023-04-17T14:20:00Z',
        recallAttempts: [
          { date: '2023-04-10T09:30:00Z', success: true, timeTaken: 45 },
          { date: '2023-04-12T13:15:00Z', success: false, timeTaken: 60 },
          { date: '2023-04-15T16:45:00Z', success: true, timeTaken: 40 },
          { date: '2023-04-17T14:20:00Z', success: true, timeTaken: 35 }
        ],
        retentionScore: 68,
        tabsEngagement: {
          explanation: { viewed: true, timeSpent: 340 },
          examples: { viewed: true, timeSpent: 210 },
          mistakes: { viewed: true, timeSpent: 150 },
          examRelevance: { viewed: true, timeSpent: 125 },
          video: { viewed: false, timeSpent: 0 }
        }
      });
    }
  }, [conceptId]);

  const toggleSpeech = () => {
    if (!('speechSynthesis' in window)) {
      toast({
        title: "Speech synthesis not supported",
        description: "Your browser doesn't support the speech synthesis API.",
        variant: "destructive"
      });
      return;
    }

    if (isReading) {
      window.speechSynthesis.cancel();
      setIsReading(false);
    } else {
      // Get active tab content
      const activeElement = document.querySelector(`[data-state="active"][role="tabpanel"]`);
      if (activeElement) {
        const textToRead = activeElement.textContent || '';
        const utterance = new SpeechSynthesisUtterance(textToRead);
        utterance.rate = 0.9;
        utterance.onend = () => setIsReading(false);
        window.speechSynthesis.speak(utterance);
        setIsReading(true);
      }
    }
  };

  const toggleBookmark = () => {
    setBookmarked(!bookmarked);
    toast({
      title: bookmarked ? "Bookmark removed" : "Concept bookmarked",
      description: bookmarked ? 
        "This concept has been removed from your bookmarks." : 
        "This concept has been added to your bookmarks for quick access.",
    });
  };

  const addNote = () => {
    if (newNote.trim()) {
      const note: ConceptNote = {
        id: Date.now().toString(),
        content: newNote,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      setUserNotes([...userNotes, note]);
      setNewNote('');
      toast({
        title: "Note added",
        description: "Your note has been saved with this concept.",
      });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  if (loading || !conceptCard) {
    return (
      <SharedPageLayout 
        title="Concept Study"
        subtitle="Loading concept content..."
      >
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </SharedPageLayout>
    );
  }

  return (
    <SharedPageLayout
      title={`Study: ${conceptCard.title}`}
      subtitle={`${conceptCard.subject} > ${conceptCard.chapter}`}
    >
      <div className="mb-4 flex justify-between items-center">
        <Link to={`/dashboard/student/concepts/card/${conceptId}`} className="inline-flex items-center text-blue-600">
          <ArrowLeft className="mr-1 h-4 w-4" /> Back to concept card
        </Link>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className={isReading ? "bg-blue-50" : ""}
            onClick={toggleSpeech}
          >
            {isReading ? <VolumeX className="h-4 w-4 mr-1" /> : <Volume2 className="h-4 w-4 mr-1" />}
            {isReading ? "Stop Reading" : "Read Aloud"}
          </Button>
          <Button 
            variant={bookmarked ? "default" : "outline"}
            size="sm"
            onClick={toggleBookmark}
          >
            <Star className={`h-4 w-4 mr-1 ${bookmarked ? "text-yellow-400 fill-yellow-400" : ""}`} />
            {bookmarked ? "Bookmarked" : "Bookmark"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {/* Main Learning Content */}
          <Card className="mb-6">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle>Learning Interface</CardTitle>
                <Tabs value={detailLevel} onValueChange={(value) => setDetailLevel(value as 'simple' | 'detailed')}>
                  <TabsList>
                    <TabsTrigger value="simple">Simple</TabsTrigger>
                    <TabsTrigger value="detailed">Detailed</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-3 md:grid-cols-6 w-full">
                  <TabsTrigger value="explanation">Explanation</TabsTrigger>
                  <TabsTrigger value="examples">Examples</TabsTrigger>
                  <TabsTrigger value="diagrams">Diagrams</TabsTrigger>
                  <TabsTrigger value="exam">Exam Focus</TabsTrigger>
                  <TabsTrigger value="mistakes">Common Mistakes</TabsTrigger>
                  <TabsTrigger value="video">Video</TabsTrigger>
                </TabsList>

                <TabsContent value="explanation" className="mt-4">
                  <div className="prose max-w-none dark:prose-invert">
                    <h3>Understanding {conceptCard.title}</h3>
                    {detailLevel === 'simple' ? (
                      <p>
                        {conceptCard.title} is a fundamental concept in {conceptCard.subject}. 
                        {conceptCard.content.split('.').slice(0, 2).join('.')}. 
                        This forms the basis for many advanced topics in {conceptCard.chapter}.
                      </p>
                    ) : (
                      <>
                        <p>{conceptCard.content}</p>
                        <h4>Key Points to Remember</h4>
                        <ul>
                          <li>The principle applies universally within its defined scope</li>
                          <li>Understanding how variables interact is essential for problem-solving</li>
                          <li>The mathematical representation can be derived through careful analysis</li>
                        </ul>
                      </>
                    )}

                    <div className="bg-blue-50 p-4 rounded-lg mt-6 border border-blue-100">
                      <h4 className="flex items-center text-blue-800 font-medium mb-2">
                        <Lightbulb className="h-5 w-5 mr-2 text-blue-600" />
                        Helpful Analogy
                      </h4>
                      <p className="text-blue-800">
                        Think of {conceptCard.title} as a balancing scale. When one side is pushed down (force applied), 
                        the other side responds proportionally based on its resistance (mass). This everyday comparison 
                        helps visualize the mathematical relationship described in the concept.
                      </p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="examples" className="mt-4">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-2">Basic Example</h3>
                      <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                        <p>
                          When you push a shopping cart at the supermarket, you apply a force that gives it acceleration. 
                          If the cart is empty (less mass), it accelerates quickly. If it's full of groceries (more mass), 
                          the same force results in less acceleration, demonstrating the inverse relationship between mass 
                          and acceleration when force is constant.
                        </p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-2">Real-World Application</h3>
                      <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                        <p>
                          In the design of modern electric vehicles, engineers must calculate precisely how much force the 
                          motors need to generate to achieve desired acceleration rates. For a Tesla Model 3 (mass approximately 
                          1,800 kg) to accelerate from 0 to 60 mph in 3.1 seconds, the motors must produce a specific force 
                          that overcomes the car's inertia according to F = ma.
                        </p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-2">Textbook Problem</h3>
                      <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
                        <p className="font-medium">Problem:</p>
                        <p>
                          A 2.0 kg object experiences a net force of 10 N. Calculate its acceleration.
                        </p>
                        <p className="mt-4 font-medium">Solution:</p>
                        <p>
                          Using the formula F = ma, we can rearrange to find a = F/m<br />
                          a = 10 N ÷ 2.0 kg = 5.0 m/s²
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="diagrams" className="mt-4">
                  <div className="space-y-6">
                    <p className="text-lg">Visual representations help in understanding {conceptCard.title}:</p>
                    
                    <div className="bg-gray-100 h-64 flex items-center justify-center rounded-lg border border-gray-200">
                      <div className="text-center text-gray-500">
                        <Book className="h-12 w-12 mx-auto mb-2" />
                        <p>Concept diagram illustration would appear here</p>
                        <p className="text-sm">(Forces and their effects visualization)</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-gray-100 h-40 flex items-center justify-center rounded-lg border border-gray-200">
                        <div className="text-center text-gray-500">
                          <Activity className="h-8 w-8 mx-auto mb-2" />
                          <p>Graph representation</p>
                        </div>
                      </div>
                      <div className="bg-gray-100 h-40 flex items-center justify-center rounded-lg border border-gray-200">
                        <div className="text-center text-gray-500">
                          <Brain className="h-8 w-8 mx-auto mb-2" />
                          <p>Conceptual model</p>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-500">
                      These visualizations help you understand the relationships between different variables 
                      and see how the concept applies in various scenarios.
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="exam" className="mt-4">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-2">Exam Relevance</h3>
                      <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                        <p>
                          <span className="font-medium">Importance in Exams:</span> This concept appears in approximately 
                          15-20% of physics exams, typically worth 8-10 marks in total.
                        </p>
                        <div className="mt-4">
                          <span className="font-medium">Question Formats:</span>
                          <ul className="list-disc pl-5 mt-2">
                            <li>Direct calculation problems (calculate acceleration given force and mass)</li>
                            <li>Application questions (how changing one variable affects another)</li>
                            <li>Conceptual questions (explain why certain phenomena occur)</li>
                            <li>Multi-step problems combining this concept with others</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-2">Sample Exam Question</h3>
                      <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
                        <p>
                          A 1500 kg car accelerates from rest to 20 m/s in 8 seconds. Calculate:
                        </p>
                        <ol className="list-decimal pl-5 mt-2">
                          <li>The acceleration of the car</li>
                          <li>The net force acting on the car</li>
                          <li>If the force from the engine is 3000 N, calculate the magnitude of the resistive forces</li>
                        </ol>
                        <div className="mt-4">
                          <p className="font-medium">Solution Approach:</p>
                          <ol className="list-decimal pl-5 mt-2">
                            <li>a = Δv/Δt = 20/8 = 2.5 m/s²</li>
                            <li>F = ma = 1500 × 2.5 = 3750 N</li>
                            <li>Fnet = Fengine - Fresistive, so 3750 = 3000 - Fresistive, giving Fresistive = -750 N</li>
                          </ol>
                        </div>
                      </div>
                    </div>

                    <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
                      <h4 className="flex items-center text-indigo-800 font-medium mb-2">
                        <Award className="h-5 w-5 mr-2 text-indigo-600" />
                        Examiner Tips
                      </h4>
                      <ul className="list-disc pl-5">
                        <li>Always check your units and ensure they are consistent</li>
                        <li>Show your substitution of values into the formula</li>
                        <li>Draw free-body diagrams for complex force problems</li>
                        <li>Watch for trick questions where friction or other forces are involved</li>
                      </ul>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="mistakes" className="mt-4">
                  <div className="space-y-6">
                    <h3 className="text-lg font-medium">Common Mistakes to Avoid</h3>
                    
                    <div className="bg-red-50 p-4 rounded-lg border border-red-100 mb-4">
                      <div className="flex gap-3">
                        <div className="bg-red-100 p-2 h-8 w-8 rounded-full flex items-center justify-center">
                          <AlertTriangle className="h-4 w-4 text-red-600" />
                        </div>
                        <div>
                          <p className="font-medium text-red-800">Confusing Weight and Mass</p>
                          <p className="text-red-700">
                            Weight is a force (measured in Newtons) while mass is an intrinsic property 
                            (measured in kilograms). Students often substitute weight values when mass is required.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-red-50 p-4 rounded-lg border border-red-100 mb-4">
                      <div className="flex gap-3">
                        <div className="bg-red-100 p-2 h-8 w-8 rounded-full flex items-center justify-center">
                          <AlertTriangle className="h-4 w-4 text-red-600" />
                        </div>
                        <div>
                          <p className="font-medium text-red-800">Ignoring Direction (Vector Nature)</p>
                          <p className="text-red-700">
                            Force and acceleration are vector quantities with direction. Calculations must account 
                            for direction, especially in problems involving multiple forces.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-red-50 p-4 rounded-lg border border-red-100">
                      <div className="flex gap-3">
                        <div className="bg-red-100 p-2 h-8 w-8 rounded-full flex items-center justify-center">
                          <AlertTriangle className="h-4 w-4 text-red-600" />
                        </div>
                        <div>
                          <p className="font-medium text-red-800">Forgetting to Convert Units</p>
                          <p className="text-red-700">
                            When values are given in different units (e.g., grams instead of kilograms, 
                            or km/h instead of m/s), failing to convert units leads to incorrect results.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
                      <h4 className="flex items-center text-amber-800 font-medium mb-2">
                        <Lightbulb className="h-5 w-5 mr-2 text-amber-600" />
                        How to Avoid These Mistakes
                      </h4>
                      <ul className="list-disc pl-5 text-amber-700">
                        <li>Always identify and list all forces acting on an object before applying F = ma</li>
                        <li>Draw free-body diagrams to visualize all forces and their directions</li>
                        <li>Verify that all quantities are in the correct units (SI units)</li>
                        <li>Double-check calculations by estimating whether the result is reasonable</li>
                      </ul>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="video" className="mt-4">
                  <div className="space-y-6">
                    <h3 className="text-lg font-medium mb-2">Video Explanation</h3>
                    
                    <div className="aspect-video bg-gray-100 rounded-lg border border-gray-200 flex flex-col items-center justify-center">
                      <Video className="h-16 w-16 text-gray-400 mb-2" />
                      <p className="text-gray-500">Video explanation for {conceptCard.title}</p>
                      <Button className="mt-4">
                        Watch Video
                      </Button>
                    </div>
                    
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                      <h4 className="font-medium text-blue-800 mb-2">Video Contents:</h4>
                      <ol className="list-decimal pl-5 text-blue-700">
                        <li>Introduction to {conceptCard.title} (0:00 - 1:30)</li>
                        <li>Mathematical explanation and derivation (1:31 - 4:15)</li>
                        <li>Practical demonstrations and examples (4:16 - 7:45)</li>
                        <li>Common problem-solving techniques (7:46 - 10:30)</li>
                        <li>Quiz and review questions (10:31 - 12:00)</li>
                      </ol>
                    </div>
                    
                    <p className="text-sm text-gray-500">
                      Video explanations provide an alternative learning approach which can be helpful 
                      for visual and auditory learners. This video covers all the key aspects of the concept 
                      with clear visualizations and step-by-step explanations.
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Notes Section */}
          <Card className="mb-6">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <BookOpen className="mr-2 h-5 w-5" /> Your Notes
              </CardTitle>
              <CardDescription>
                Add personal notes to help you remember key points about this concept
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {userNotes.length > 0 ? (
                  userNotes.map(note => (
                    <div key={note.id} className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                      <p>{note.content}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        Added on {formatDate(note.createdAt)}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-4">
                    You haven't added any notes yet. Add your first note below.
                  </p>
                )}
                <div className="flex gap-2">
                  <textarea
                    className="flex-1 border rounded-md p-2 text-sm"
                    rows={3}
                    placeholder="Add a new note..."
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                  ></textarea>
                  <Button 
                    className="self-end"
                    onClick={addNote}
                    disabled={!newNote.trim()}
                  >
                    <PlusCircle className="h-4 w-4 mr-1" /> Add Note
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {/* Concept Progress Tracker */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <Activity className="mr-2 h-5 w-5" /> Concept Mastery
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Overall Mastery</span>
                    <span className="text-sm font-medium">{conceptAnalytics?.masteryScore || 0}%</span>
                  </div>
                  <Progress value={conceptAnalytics?.masteryScore || 0} className="h-2" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-xs text-blue-600 mb-1">Accuracy Rate</p>
                    <p className="font-medium text-blue-800">{conceptAnalytics?.accuracyRate || 0}%</p>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg">
                    <p className="text-xs text-green-600 mb-1">Retention Score</p>
                    <p className="font-medium text-green-800">{conceptAnalytics?.retentionScore || 0}%</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium mb-2">Learning History</p>
                  <div className="bg-gray-50 p-3 rounded-lg text-sm space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">First studied:</span>
                      <span>{conceptAnalytics ? formatDate(conceptAnalytics.firstStudied) : 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Last reviewed:</span>
                      <span>{conceptAnalytics ? formatDate(conceptAnalytics.lastReviewed) : 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total review sessions:</span>
                      <span>{conceptAnalytics?.recallAttempts.length || 0}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium mb-2">Next Review Recommended</p>
                  <div className="bg-indigo-50 p-3 rounded-lg border border-indigo-100">
                    <div className="flex items-center text-indigo-700">
                      <Clock className="h-4 w-4 mr-2" />
                      <span>April 24, 2023 (in 3 days)</span>
                    </div>
                    <p className="text-xs text-indigo-600 mt-1">
                      Based on your retention curve and spaced repetition algorithm
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Related Concepts */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <Brain className="mr-2 h-5 w-5" /> Related Concepts
              </CardTitle>
              <CardDescription>
                Explore these concepts to deepen your understanding
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="bg-gray-50 hover:bg-gray-100 p-3 rounded-lg border border-gray-200 transition-colors">
                <div className="flex items-center gap-2">
                  <Book className="h-4 w-4 text-blue-600" />
                  <span className="font-medium">Newton's Third Law of Motion</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  Explores the concept of equal and opposite reactions
                </p>
                <div className="flex justify-between mt-2">
                  <Badge variant="outline" className="text-xs">Physics</Badge>
                  <span className="text-xs text-gray-500">75% Mastered</span>
                </div>
              </div>

              <div className="bg-gray-50 hover:bg-gray-100 p-3 rounded-lg border border-gray-200 transition-colors">
                <div className="flex items-center gap-2">
                  <Book className="h-4 w-4 text-green-600" />
                  <span className="font-medium">Conservation of Momentum</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  A fundamental principle in mechanics related to collisions
                </p>
                <div className="flex justify-between mt-2">
                  <Badge variant="outline" className="text-xs">Physics</Badge>
                  <span className="text-xs text-gray-500">60% Mastered</span>
                </div>
              </div>

              <div className="bg-gray-50 hover:bg-gray-100 p-3 rounded-lg border border-gray-200 transition-colors">
                <div className="flex items-center gap-2">
                  <Book className="h-4 w-4 text-purple-600" />
                  <span className="font-medium">Work and Energy</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  Explores how forces relate to energy transfer
                </p>
                <div className="flex justify-between mt-2">
                  <Badge variant="outline" className="text-xs">Physics</Badge>
                  <span className="text-xs text-gray-500">40% Mastered</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" className="w-full justify-center">
                <Brain className="mr-2 h-4 w-4" /> View All Related Concepts
              </Button>
            </CardFooter>
          </Card>

          {/* Real-world Application */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <Lightbulb className="mr-2 h-5 w-5" /> Real-world Integration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-amber-50 p-3 rounded-lg border border-amber-100">
                <h4 className="font-medium text-amber-800 mb-1">Current Application</h4>
                <p className="text-sm text-amber-700">
                  SpaceX's Starship rocket uses Newton's laws to calculate the enormous thrust needed 
                  (over 7 million pounds of force) to accelerate the massive spacecraft against Earth's gravity. 
                  This principle is currently in the news as SpaceX prepares for its upcoming orbital test.
                </p>
              </div>
              
              <div className="mt-3">
                <h4 className="text-sm font-medium mb-2">Industries Using This Concept</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Aerospace</Badge>
                  <Badge variant="secondary">Automotive</Badge>
                  <Badge variant="secondary">Robotics</Badge>
                  <Badge variant="secondary">Sports Equipment</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </SharedPageLayout>
  );
};

export default ConceptStudyLandingPage;
