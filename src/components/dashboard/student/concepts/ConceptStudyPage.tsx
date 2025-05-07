
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from '@/hooks/use-toast';
import {
  BookOpen,
  Video,
  CheckCircle,
  MessageSquare,
  Star,
  ArrowLeft,
  Lightbulb,
  AlertTriangle,
  Heart,
  BookmarkPlus,
  Volume2,
  VolumeX,
  ExternalLink,
  Clock,
  Brain,
  Award,
  Activity,
  Bookmark,
  PlusCircle,
  BarChart2
} from "lucide-react";

// Mock concept data
const mockConcept = {
  id: "c1",
  title: "Newton's Laws of Motion",
  subject: "Physics",
  topic: "Mechanics",
  chapter: "Forces and Motion",
  difficulty: "medium",
  importance: "high",
  masteryLevel: 65,
  lastStudied: "2023-04-15T10:30:00Z",
  description: "Understanding the fundamental laws that describe the relationship between forces acting on a body and its motion due to those forces.",
  simpleExplanation: "Newton's Laws explain how objects move. The first law states objects stay at rest or in motion unless acted upon by a force. The second law defines the relationship between force, mass and acceleration (F=ma). The third law states for every action there is an equal and opposite reaction.",
  detailedExplanation: "Sir Isaac Newton's three laws of motion, published in 1687, are fundamental principles in classical mechanics that describe the relationship between the motion of an object and the forces acting on it.\n\nThe First Law (Law of Inertia) states that an object will remain at rest or in uniform motion in a straight line unless acted upon by an external force. This property of objects to resist changes in their state of motion is called inertia.\n\nThe Second Law quantifies the relationship as F = ma, where F is the net force applied, m is the mass of the object, and a is the acceleration produced. This means the acceleration of an object is directly proportional to the force applied and inversely proportional to its mass.\n\nThe Third Law states that for every action, there is an equal and opposite reaction. When one object exerts a force on a second object, the second object exerts an equal and opposite force on the first.",
  examples: [
    {
      title: "Basic Example - Ball Rolling",
      content: "When you push a ball, you apply force that overcomes its inertia (First Law), the acceleration depends on the force and the ball's mass (Second Law), and as you push the ball, it pushes back against your hand (Third Law)."
    },
    {
      title: "Real-World Application - Rocket Propulsion",
      content: "In rocket propulsion, burning fuel creates hot gases that are expelled backward (action). This creates an equal and opposite force (reaction) that propels the rocket forward. This demonstrates Newton's Third Law in action."
    },
    {
      title: "Textbook Problem",
      content: "A 1,000 kg car accelerates from 0 to 27.8 m/s (100 km/h) in 10 seconds. The net force required can be calculated using F = ma: F = 1,000 kg × 2.78 m/s² = 2,780 Newtons."
    }
  ],
  commonMistakes: [
    {
      title: "Confusing Weight and Mass",
      content: "Weight is a force (measured in Newtons) while mass is an intrinsic property (measured in kilograms). Students often substitute weight values when mass is required."
    },
    {
      title: "Ignoring Direction (Vector Nature)",
      content: "Force and acceleration are vector quantities with direction. Calculations must account for direction, especially in problems involving multiple forces."
    },
    {
      title: "Neglecting Friction",
      content: "In real-world applications, friction often plays a significant role but is frequently overlooked in calculations, leading to incorrect results."
    }
  ],
  examRelevance: {
    marksWeightage: "8-10 marks",
    questionTypes: ["Conceptual", "Numerical", "Application-based"],
    previousYearQuestions: [
      "2022: A ball of mass 'm' moving with velocity 'v' collides with a wall...",
      "2021: A block of mass 2kg is placed on a horizontal surface with coefficient of friction..."
    ],
    examinerTips: [
      "Always check your units and ensure they are consistent",
      "Show your substitution of values into the formula",
      "Draw free-body diagrams for complex force problems",
      "Watch for trick questions where friction or other forces are involved"
    ]
  },
  diagrams: [
    {
      id: "d1",
      title: "Newton's Laws Illustration",
      description: "Visual representation of all three laws with practical examples",
      imageUrl: "https://static.vecteezy.com/system/resources/previews/013/117/143/original/newton-s-first-law-of-motion-three-cases-of-inertia-vector.jpg"
    },
    {
      id: "d2",
      title: "Free Body Diagram",
      description: "Showing forces acting on an object on an inclined plane",
      imageUrl: "https://www.physicsclassroom.com/Class/newtlaws/u2l2d4.gif"
    }
  ],
  video: {
    id: "v1",
    title: "Newton's Laws Explained",
    duration: "12:45",
    url: "https://www.youtube.com/embed/CQYELiTtUs8",
    timestamps: [
      {time: "00:45", description: "First Law Explanation"},
      {time: "04:30", description: "Second Law and Formula Derivation"},
      {time: "08:15", description: "Third Law and Examples"}
    ]
  },
  analytics: {
    masteryScore: 65,
    accuracyRate: 78,
    timeSpentByTab: {
      simple: 340,
      detailed: 560,
      examples: 210,
      mistakes: 150,
      exam: 320,
      diagrams: 180,
      video: 480
    },
    firstStudied: "2023-03-20T14:00:00Z",
    lastReviewed: "2023-04-15T10:30:00Z",
    recallAttempts: [
      {date: "2023-03-20T14:30:00Z", success: true, timeTaken: 45},
      {date: "2023-03-25T16:20:00Z", success: false, timeTaken: 60},
      {date: "2023-04-05T09:15:00Z", success: true, timeTaken: 40},
      {date: "2023-04-15T10:30:00Z", success: true, timeTaken: 35}
    ],
    retentionScore: 72,
    tabsEngagement: {
      simple: {viewed: true, timeSpent: 340},
      detailed: {viewed: true, timeSpent: 560},
      examples: {viewed: true, timeSpent: 210},
      mistakes: {viewed: true, timeSpent: 150},
      exam: {viewed: true, timeSpent: 320},
      diagrams: {viewed: true, timeSpent: 180},
      video: {viewed: true, timeSpent: 480}
    }
  },
  relatedConcepts: [
    {id: "rc1", title: "Momentum and Impulse", masteryLevel: 45},
    {id: "rc2", title: "Work, Energy and Power", masteryLevel: 60},
    {id: "rc3", title: "Circular Motion", masteryLevel: 30}
  ],
  realWorldIntegration: {
    currentEvent: "SpaceX's recent Starship rocket test uses Newton's laws for calculating thrust requirements.",
    industries: ["Aerospace", "Automotive", "Robotics", "Sports Equipment"],
    dailyLifeExamples: [
      "Car seat belts protect you based on the First Law (inertia)",
      "Electric vehicles adjust motor force based on the Second Law for efficient acceleration",
      "Walking involves pushing against the ground (Third Law) to move forward"
    ]
  },
  nextReviewDate: "2023-04-22T10:00:00Z"
};

const ConceptStudyPage = () => {
  const { conceptId } = useParams<{ conceptId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("simple");
  const [isReading, setIsReading] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [notes, setNotes] = useState<Array<{id: string, content: string, timestamp: string}>>([]);
  const [newNote, setNewNote] = useState("");
  const concept = mockConcept; // In a real app, fetch concept by conceptId
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  
  // Clean up speech synthesis when component unmounts
  useEffect(() => {
    return () => {
      if (isReading) {
        window.speechSynthesis.cancel();
      }
    };
  }, [isReading]);

  // Text-to-speech functionality
  const handleToggleVoiceRead = () => {
    if (isReading) {
      window.speechSynthesis.cancel();
      setIsReading(false);
      return;
    }

    // Select text based on active tab
    let textToRead = "";
    switch (activeTab) {
      case "simple":
        textToRead = concept.simpleExplanation;
        break;
      case "detailed":
        textToRead = concept.detailedExplanation;
        break;
      case "examples":
        textToRead = concept.examples.map(ex => `${ex.title}: ${ex.content}`).join(". ");
        break;
      case "mistakes":
        textToRead = concept.commonMistakes.map(m => `${m.title}: ${m.content}`).join(". ");
        break;
      case "exam":
        textToRead = `Exam relevance: This concept has a marks weightage of ${concept.examRelevance.marksWeightage}. Question types include ${concept.examRelevance.questionTypes.join(", ")}. Previous year questions include: ${concept.examRelevance.previousYearQuestions.join(". ")}`;
        break;
      default:
        textToRead = concept.simpleExplanation;
    }

    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.onend = () => setIsReading(false);
    utteranceRef.current = utterance;
    
    window.speechSynthesis.speak(utterance);
    setIsReading(true);
  };

  // Toggle bookmark
  const handleToggleBookmark = () => {
    setBookmarked(!bookmarked);
    toast({
      title: bookmarked ? "Concept removed from bookmarks" : "Concept bookmarked",
      description: bookmarked 
        ? "This concept has been removed from your saved items" 
        : "This concept has been added to your bookmarks for quick access",
    });
  };

  // Add a note
  const handleAddNote = () => {
    if (newNote.trim()) {
      const newNoteObj = {
        id: Date.now().toString(),
        content: newNote.trim(),
        timestamp: new Date().toISOString()
      };
      
      setNotes([...notes, newNoteObj]);
      setNewNote("");
      
      toast({
        title: "Note added",
        description: "Your note has been saved with this concept",
      });
    }
  };

  // Format date
  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Format time duration
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  // Calculate mastery level color
  const getMasteryColor = (level: number): string => {
    if (level >= 80) return "bg-green-500";
    if (level >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <SharedPageLayout
      title={`Study: ${concept.title}`}
      subtitle={`${concept.subject} > ${concept.chapter}`}
      showBackButton={true}
      backButtonUrl={`/dashboard/student/concepts/card/${conceptId}`}
    >
      {/* Header section with controls */}
      <div className="mb-6 flex flex-wrap justify-between items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">{concept.title}</h2>
          <div className="flex flex-wrap gap-2 mt-1">
            <Badge>{concept.subject}</Badge>
            <Badge variant="outline">{concept.chapter}</Badge>
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              {concept.difficulty.charAt(0).toUpperCase() + concept.difficulty.slice(1)} Difficulty
            </Badge>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Button 
            variant={isReading ? "default" : "outline"}
            size="sm"
            onClick={handleToggleVoiceRead}
            title="Read aloud"
          >
            {isReading ? <VolumeX className="h-4 w-4 mr-1" /> : <Volume2 className="h-4 w-4 mr-1" />}
            {isReading ? "Stop Reading" : "Read Aloud"}
          </Button>
          
          <Button 
            variant={bookmarked ? "default" : "outline"}
            size="sm"
            onClick={handleToggleBookmark}
            title="Bookmark concept"
          >
            <Bookmark className={`h-4 w-4 mr-1 ${bookmarked ? "fill-current" : ""}`} />
            {bookmarked ? "Bookmarked" : "Bookmark"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content area */}
        <div className="lg:col-span-2 space-y-6">
          {/* Learning Interface Card */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Learning Interface</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-7 w-full">
                  <TabsTrigger value="simple">Simple</TabsTrigger>
                  <TabsTrigger value="detailed">Detailed</TabsTrigger>
                  <TabsTrigger value="examples">Examples</TabsTrigger>
                  <TabsTrigger value="diagrams">Diagrams</TabsTrigger>
                  <TabsTrigger value="mistakes">Mistakes</TabsTrigger>
                  <TabsTrigger value="exam">Exam</TabsTrigger>
                  <TabsTrigger value="video">Video</TabsTrigger>
                </TabsList>

                {/* Simple Explanation Tab */}
                <TabsContent value="simple" className="mt-4 space-y-4">
                  <div className="prose max-w-none dark:prose-invert">
                    <h3 className="text-xl font-semibold mb-4">Simple Explanation</h3>
                    <p className="text-lg">{concept.simpleExplanation}</p>
                    
                    <div className="bg-blue-50 p-4 rounded-lg mt-6 border border-blue-100 dark:bg-blue-900/20 dark:border-blue-800">
                      <h4 className="flex items-center text-blue-800 dark:text-blue-300 font-medium mb-2">
                        <Lightbulb className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
                        AI-Generated Analogy
                      </h4>
                      <p className="text-blue-800 dark:text-blue-300">
                        Think of Newton's Laws like a shopping cart in a supermarket. The cart won't move until you push it (First Law). 
                        How quickly it accelerates depends on how hard you push and how heavy it is (Second Law). 
                        And when you push the cart, the cart pushes back against your hands (Third Law).
                      </p>
                    </div>
                  </div>
                </TabsContent>

                {/* Detailed Explanation Tab */}
                <TabsContent value="detailed" className="mt-4 space-y-4">
                  <div className="prose max-w-none dark:prose-invert">
                    <h3 className="text-xl font-semibold mb-4">Detailed Explanation</h3>
                    <div className="whitespace-pre-line text-lg">{concept.detailedExplanation}</div>
                    
                    <div className="bg-purple-50 p-4 rounded-lg mt-6 border border-purple-100 dark:bg-purple-900/20 dark:border-purple-800">
                      <h4 className="font-medium text-purple-800 dark:text-purple-300 mb-2">Key Points to Remember</h4>
                      <ul className="list-disc pl-5 space-y-1 text-purple-700 dark:text-purple-300">
                        <li>First Law: Objects remain at rest or uniform motion unless acted upon by a force</li>
                        <li>Second Law: Force equals mass times acceleration (F = ma)</li>
                        <li>Third Law: For every action, there is an equal and opposite reaction</li>
                        <li>These laws form the foundation of classical mechanics</li>
                        <li>They apply to macroscopic objects under everyday conditions</li>
                      </ul>
                    </div>
                  </div>
                </TabsContent>

                {/* Examples Tab */}
                <TabsContent value="examples" className="mt-4 space-y-6">
                  {concept.examples.map((example, index) => (
                    <Card key={index} className="border-l-4 border-l-blue-500">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">{example.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p>{example.content}</p>
                      </CardContent>
                    </Card>
                  ))}
                  
                  <div className="bg-green-50 p-4 rounded-lg border border-green-100 dark:bg-green-900/20 dark:border-green-800">
                    <h4 className="flex items-center text-green-800 dark:text-green-300 font-medium mb-2">
                      <Lightbulb className="h-5 w-5 mr-2 text-green-600 dark:text-green-400" />
                      Quick Application Exercise
                    </h4>
                    <p className="text-green-800 dark:text-green-300 mb-2">
                      Think about pushing a heavy box across a room. Identify how each of Newton's three laws applies in this situation.
                    </p>
                    <Button variant="outline" className="bg-green-100 hover:bg-green-200 dark:bg-green-800 dark:hover:bg-green-700 border-green-300 dark:border-green-700 text-green-800 dark:text-green-300">
                      Show Explanation
                    </Button>
                  </div>
                </TabsContent>

                {/* Diagrams Tab */}
                <TabsContent value="diagrams" className="mt-4 space-y-6">
                  <h3 className="text-xl font-semibold mb-4">Visual Representations</h3>
                  
                  {concept.diagrams.map((diagram) => (
                    <div key={diagram.id} className="space-y-2">
                      <h4 className="font-medium text-lg">{diagram.title}</h4>
                      <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
                        <div className="aspect-video relative flex items-center justify-center">
                          <img 
                            src={diagram.imageUrl}
                            alt={diagram.title}
                            className="max-h-96 object-contain mx-auto"
                          />
                        </div>
                        <p className="text-sm text-center text-slate-600 dark:text-slate-400 mt-2">
                          {diagram.description}
                        </p>
                      </div>
                    </div>
                  ))}
                  
                  <div className="bg-amber-50 p-4 rounded-lg border border-amber-100 dark:bg-amber-900/20 dark:border-amber-800">
                    <h4 className="text-amber-800 dark:text-amber-300 font-medium mb-2">Diagram Reading Tips</h4>
                    <ul className="list-disc pl-5 text-amber-700 dark:text-amber-400">
                      <li>Focus on identifying force vectors and their directions</li>
                      <li>Note how each force affects the object's motion</li>
                      <li>Analyze the cause-effect relationship in each scenario</li>
                      <li>Try recreating these diagrams in your notes to improve recall</li>
                    </ul>
                  </div>
                </TabsContent>

                {/* Common Mistakes Tab */}
                <TabsContent value="mistakes" className="mt-4 space-y-6">
                  <h3 className="text-xl font-semibold mb-4">Common Mistakes to Avoid</h3>
                  
                  {concept.commonMistakes.map((mistake, index) => (
                    <div key={index} className="bg-red-50 p-4 rounded-lg border border-red-100 dark:bg-red-900/20 dark:border-red-800 mb-4">
                      <div className="flex gap-3">
                        <div className="bg-red-100 p-2 h-8 w-8 rounded-full flex items-center justify-center dark:bg-red-800">
                          <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400" />
                        </div>
                        <div>
                          <p className="font-medium text-red-800 dark:text-red-300">{mistake.title}</p>
                          <p className="text-red-700 dark:text-red-400 mt-1">{mistake.content}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-100 dark:bg-emerald-900/20 dark:border-emerald-800">
                    <h4 className="flex items-center text-emerald-800 dark:text-emerald-300 font-medium mb-2">
                      <CheckCircle className="h-5 w-5 mr-2 text-emerald-600 dark:text-emerald-400" />
                      How to Avoid These Mistakes
                    </h4>
                    <ul className="list-disc pl-5 text-emerald-700 dark:text-emerald-400">
                      <li>Always identify all forces involved before solving problems</li>
                      <li>Draw free-body diagrams to visualize vector forces</li>
                      <li>Double-check your units (kg for mass, N for force)</li>
                      <li>Remember that force and acceleration are vectors with direction</li>
                    </ul>
                  </div>
                </TabsContent>

                {/* Exam Relevance Tab */}
                <TabsContent value="exam" className="mt-4 space-y-6">
                  <h3 className="text-xl font-semibold mb-4">Exam Relevance</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Exam Coverage</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="font-medium">Marks weightage:</span>
                            <span>{concept.examRelevance.marksWeightage}</span>
                          </div>
                          <div>
                            <span className="font-medium">Question types:</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {concept.examRelevance.questionTypes.map((type, i) => (
                                <Badge key={i} variant="outline">{type}</Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Previous Year Questions</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 list-disc pl-5">
                          {concept.examRelevance.previousYearQuestions.map((question, i) => (
                            <li key={i} className="text-sm">{question}</li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <Card className="border-l-4 border-l-indigo-500">
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center">
                        <Award className="h-5 w-5 mr-2 text-indigo-600" /> 
                        Examiner Tips
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 list-disc pl-5">
                        {concept.examRelevance.examinerTips.map((tip, i) => (
                          <li key={i}>{tip}</li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Video Tab */}
                <TabsContent value="video" className="mt-4 space-y-4">
                  <h3 className="text-xl font-semibold mb-4">Video Explanation</h3>
                  
                  <div className="aspect-video bg-black rounded-lg overflow-hidden">
                    <iframe
                      src={concept.video.url}
                      title={concept.video.title}
                      className="w-full h-full"
                      allowFullScreen
                    ></iframe>
                  </div>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">
                        {concept.video.title}
                      </CardTitle>
                      <CardDescription>
                        Duration: {concept.video.duration}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <h4 className="font-medium mb-2">Key Timestamps</h4>
                      <ul className="space-y-2">
                        {concept.video.timestamps.map((stamp, i) => (
                          <li key={i} className="flex items-center">
                            <Badge variant="outline" className="mr-2">{stamp.time}</Badge>
                            <span>{stamp.description}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Notes Section */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <MessageSquare className="h-5 w-5 mr-2" /> Your Notes
              </CardTitle>
              <CardDescription>
                Add personal notes to help you remember key points about this concept
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notes.length > 0 ? (
                  notes.map(note => (
                    <div key={note.id} className="bg-slate-50 p-3 rounded-lg border border-slate-200 dark:bg-slate-800 dark:border-slate-700">
                      <p>{note.content}</p>
                      <p className="text-xs text-slate-500 mt-1">Added on {formatDate(note.timestamp)}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-slate-500 text-center py-4">
                    You haven't added any notes yet. Add your first note below.
                  </p>
                )}
                
                <div className="flex flex-col gap-2">
                  <Textarea
                    placeholder="Add a new note..."
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    rows={3}
                  />
                  <Button 
                    onClick={handleAddNote}
                    disabled={!newNote.trim()}
                    className="self-end"
                  >
                    <PlusCircle className="h-4 w-4 mr-1" /> Add Note
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right sidebar with analytics */}
        <div className="space-y-6">
          {/* Concept Progress Tracker */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <BarChart2 className="h-5 w-5 mr-2" /> Concept Mastery
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Overall Mastery</span>
                    <span className="text-sm font-medium">{concept.analytics.masteryScore}%</span>
                  </div>
                  <Progress value={concept.analytics.masteryScore} className={`h-2 ${getMasteryColor(concept.analytics.masteryScore)}`} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-3 rounded-lg dark:bg-blue-900/20">
                    <p className="text-xs text-blue-600 dark:text-blue-400 mb-1">Accuracy Rate</p>
                    <p className="font-medium text-blue-800 dark:text-blue-300">{concept.analytics.accuracyRate}%</p>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg dark:bg-green-900/20">
                    <p className="text-xs text-green-600 dark:text-green-400 mb-1">Retention Score</p>
                    <p className="font-medium text-green-800 dark:text-green-300">{concept.analytics.retentionScore}%</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium mb-2">Learning History</p>
                  <div className="bg-slate-50 p-3 rounded-lg text-sm space-y-2 dark:bg-slate-800">
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-slate-400">First studied:</span>
                      <span>{formatDate(concept.analytics.firstStudied)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-slate-400">Last reviewed:</span>
                      <span>{formatDate(concept.analytics.lastReviewed)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-slate-400">Total review sessions:</span>
                      <span>{concept.analytics.recallAttempts.length}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium mb-2">Next Review Recommended</p>
                  <div className="bg-indigo-50 p-3 rounded-lg border border-indigo-100 dark:bg-indigo-900/20 dark:border-indigo-800">
                    <div className="flex items-center text-indigo-700 dark:text-indigo-300">
                      <Clock className="h-4 w-4 mr-2" />
                      <span>{formatDate(concept.nextReviewDate)}</span>
                    </div>
                    <p className="text-xs text-indigo-600 dark:text-indigo-400 mt-1">
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
                <Brain className="h-5 w-5 mr-2" /> Related Concepts
              </CardTitle>
              <CardDescription>
                Explore these concepts to deepen your understanding
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {concept.relatedConcepts.map(related => (
                <div 
                  key={related.id} 
                  className="bg-slate-50 hover:bg-slate-100 p-3 rounded-lg border border-slate-200 transition-colors dark:bg-slate-800 dark:hover:bg-slate-700 dark:border-slate-700"
                >
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    <span className="font-medium">{related.title}</span>
                  </div>
                  <div className="flex justify-between mt-2">
                    <Badge variant="outline" className="text-xs">{concept.subject}</Badge>
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-slate-500">{related.masteryLevel}% Mastered</span>
                      <div className="w-10 h-1.5 bg-slate-200 rounded-full dark:bg-slate-700">
                        <div 
                          className={`h-full rounded-full ${getMasteryColor(related.masteryLevel)}`} 
                          style={{width: `${related.masteryLevel}%`}}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" onClick={() => toast({
                title: "Feature coming soon",
                description: "View all related concepts will be available in a future update"
              })}>
                <Brain className="h-4 w-4 mr-2" /> View All Related Concepts
              </Button>
            </CardFooter>
          </Card>

          {/* Real-world Integration */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <Lightbulb className="h-5 w-5 mr-2" /> Real-world Integration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-amber-50 p-3 rounded-lg border border-amber-100 mb-3 dark:bg-amber-900/20 dark:border-amber-800">
                <h4 className="font-medium text-amber-800 dark:text-amber-300 mb-1">Current Application</h4>
                <p className="text-sm text-amber-700 dark:text-amber-400">
                  {concept.realWorldIntegration.currentEvent}
                </p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-2">Industries Using This Concept</h4>
                <div className="flex flex-wrap gap-2">
                  {concept.realWorldIntegration.industries.map((industry, i) => (
                    <Badge key={i} variant="secondary">{industry}</Badge>
                  ))}
                </div>
              </div>
              
              <div className="mt-3">
                <h4 className="text-sm font-medium mb-2">Daily Life Examples</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  {concept.realWorldIntegration.dailyLifeExamples.map((example, i) => (
                    <li key={i}>{example}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </SharedPageLayout>
  );
};

export default ConceptStudyPage;
