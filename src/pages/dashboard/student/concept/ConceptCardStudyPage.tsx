
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Bookmark, 
  Share2, 
  Edit3, 
  PlayCircle, 
  PauseCircle,
  Volume2,
  VolumeX,
  ChevronLeft,
  Lightbulb,
  BookOpen,
  AlertTriangle,
  Video,
  ExternalLink,
  Maximize2,
  Minimize2
} from "lucide-react";
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { useToast } from '@/hooks/use-toast';

// Mock concept data for demonstration
const mockConceptData = {
  id: '1',
  title: 'Newton\'s First Law of Motion',
  subject: 'Physics',
  topic: 'Mechanics',
  tags: ['NEET', 'JEE', 'Physics', 'Mechanics'],
  marksWeightage: '4-6 marks',
  pyqFrequency: 'High',
  idealTimeToComplete: '15 mins',
  content: {
    simpleExplanation: "Newton's First Law states that an object at rest will stay at rest, and an object in motion will stay in motion at constant velocity, unless acted upon by an external force. This is also known as the law of inertia.",
    detailedExplanation: `Newton's First Law of Motion is one of the fundamental principles of classical mechanics. It establishes the relationship between an object's motion and the forces acting on it.

    The law states: 'An object at rest will remain at rest, and an object in motion will continue in motion with a constant velocity (in a straight line), unless acted upon by an external force.'
    
    This property of objects to resist changes in their state of motion is called inertia. The mass of an object is a measure of its inertia - objects with greater mass have greater inertia.
    
    The first law challenges the intuitive notion that an object in motion will naturally come to rest. In the absence of friction and other forces, an object would continue moving indefinitely.
    
    Galileo Galilei first proposed the concept that would later become Newton's First Law. Newton formalized it in his masterwork 'Philosophiæ Naturalis Principia Mathematica' published in 1687.`,
    examples: [
      "A book lying on a table will remain there unless a force (like someone picking it up) acts on it.",
      "When a bus suddenly starts moving, passengers feel a jerk backward due to their body's resistance to the change in motion (inertia).",
      "When a bus suddenly stops, passengers tend to continue moving forward due to inertia.",
      "A hockey puck glides farther on ice than on concrete due to less friction (external force) on ice."
    ],
    commonMistakes: [
      "Confusing a state of rest with the absence of forces (rather than balanced forces)",
      "Assuming that constant motion requires a constant force",
      "Ignoring friction when analyzing real-world scenarios",
      "Thinking that heavier objects fall faster than lighter ones (in vacuum)"
    ],
    examRelevance: {
      marksWeightage: "4-6 marks",
      questionTypes: ["Conceptual", "Numerical", "Application-based"],
      previousYearQuestions: [
        "2022: A ball of mass 'm' moving with velocity 'v' collides with a wall...",
        "2021: A block of mass 2kg is placed on a horizontal surface with coefficient of friction..."
      ]
    },
    diagrams: [
      {
        url: "/images/newtons-first-law.png",
        caption: "Illustration of Newton's First Law showing inertia in different scenarios"
      }
    ],
    videoUrl: "https://www.youtube.com/embed/CQYELiTtUs8"
  },
  relatedConcepts: [
    { id: "2", title: "Newton's Second Law of Motion" },
    { id: "3", title: "Newton's Third Law of Motion" },
    { id: "4", title: "Momentum and Impulse" },
    { id: "5", title: "Friction" }
  ],
  prerequisites: [
    { id: "6", title: "Basic Kinematics" },
    { id: "7", title: "Vector Quantities" }
  ]
};

const ConceptCardStudyPage: React.FC = () => {
  const { conceptId } = useParams<{ conceptId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [concept] = useState(mockConceptData); // In a real app, you'd fetch this data
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isVoiceReading, setIsVoiceReading] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [currentTab, setCurrentTab] = useState("simple");
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLIFrameElement>(null);
  const speechSynthesisRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Effect to cleanup speech synthesis when component unmounts
  useEffect(() => {
    return () => {
      if (speechSynthesisRef.current) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Handle toggle bookmark
  const handleToggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    toast({
      title: isBookmarked ? "Bookmark removed" : "Bookmark added",
      description: isBookmarked ? "Concept removed from your saved items" : "Concept saved to your bookmarks",
    });
  };

  // Handle sharing concept
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copied",
      description: "Concept link copied to clipboard",
    });
  };

  // Handle note taking
  const handleAddNote = () => {
    toast({
      title: "Add note",
      description: "Note feature will open here",
    });
  };

  // Toggle voice reading
  const handleToggleVoiceRead = () => {
    if (isVoiceReading) {
      window.speechSynthesis.cancel();
      setIsVoiceReading(false);
      return;
    }

    // Get text to read based on current tab
    let textToRead = "";
    switch (currentTab) {
      case "simple":
        textToRead = concept.content.simpleExplanation;
        break;
      case "detailed":
        textToRead = concept.content.detailedExplanation;
        break;
      case "examples":
        textToRead = "Real world examples: " + concept.content.examples.join(". ");
        break;
      case "mistakes":
        textToRead = "Common mistakes: " + concept.content.commonMistakes.join(". ");
        break;
      default:
        textToRead = concept.content.simpleExplanation;
    }

    const utterance = new SpeechSynthesisUtterance(textToRead);
    speechSynthesisRef.current = utterance;
    
    utterance.onend = () => {
      setIsVoiceReading(false);
    };
    
    window.speechSynthesis.speak(utterance);
    setIsVoiceReading(true);
  };

  // Toggle full screen
  const handleToggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`);
      });
      setIsFullScreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullScreen(false);
      }
    }
  };

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Keyboard shortcuts
      switch (event.key) {
        case "1":
          if (event.altKey) setCurrentTab("simple");
          break;
        case "2":
          if (event.altKey) setCurrentTab("detailed");
          break;
        case "3":
          if (event.altKey) setCurrentTab("examples");
          break;
        case "4":
          if (event.altKey) setCurrentTab("mistakes");
          break;
        case "5":
          if (event.altKey) setCurrentTab("exam");
          break;
        case "6":
          if (event.altKey) setCurrentTab("video");
          break;
        case "b":
          if (event.ctrlKey) {
            event.preventDefault();
            handleToggleBookmark();
          }
          break;
        case "v":
          if (event.ctrlKey) {
            event.preventDefault();
            handleToggleVoiceRead();
          }
          break;
        case "f":
          if (event.ctrlKey) {
            event.preventDefault();
            handleToggleFullScreen();
          }
          break;
        case "Escape":
          if (isVoiceReading) {
            window.speechSynthesis.cancel();
            setIsVoiceReading(false);
          }
          break;
        default:
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isVoiceReading, currentTab]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 via-white to-purple-50/50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Back button and header */}
        <div className="mb-6">
          <Button 
            variant="ghost" 
            className="mb-2 hover:bg-blue-100 dark:hover:bg-blue-900/30"
            onClick={() => navigate(-1)}
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to Concepts
          </Button>
          
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{concept.title}</h1>
              <div className="flex items-center mt-2 space-x-2">
                {concept.tags.map((tag, idx) => (
                  <Badge key={idx} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button 
                size="sm" 
                variant={isBookmarked ? "default" : "outline"}
                onClick={handleToggleBookmark}
                title="Bookmark (Ctrl+B)"
              >
                <Bookmark className={`h-4 w-4 ${isBookmarked ? "fill-current" : ""}`} />
                <span className="ml-1 hidden sm:inline">
                  {isBookmarked ? "Bookmarked" : "Bookmark"}
                </span>
              </Button>
              
              <Button 
                size="sm" 
                variant="outline" 
                onClick={handleShare}
                title="Share concept"
              >
                <Share2 className="h-4 w-4" />
                <span className="ml-1 hidden sm:inline">Share</span>
              </Button>
              
              <Button 
                size="sm" 
                variant="outline" 
                onClick={handleAddNote}
                title="Add note"
              >
                <Edit3 className="h-4 w-4" />
                <span className="ml-1 hidden sm:inline">Note</span>
              </Button>
              
              <Button
                size="sm"
                variant={isVoiceReading ? "default" : "outline"}
                onClick={handleToggleVoiceRead}
                title="Read aloud (Ctrl+V)"
              >
                {isVoiceReading ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </Button>
              
              <Button
                size="sm"
                variant="outline"
                onClick={handleToggleFullScreen}
                title="Toggle fullscreen (Ctrl+F)"
              >
                {isFullScreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
              </Button>
            </div>
          </div>
          
          <div className="mt-3 text-sm text-gray-600 dark:text-gray-400">
            <span className="mr-3">Subject: <span className="font-medium">{concept.subject}</span></span>
            <span className="mr-3">Topic: <span className="font-medium">{concept.topic}</span></span>
            <span>Ideal time to complete: <span className="font-medium">{concept.idealTimeToComplete}</span></span>
          </div>
        </div>
        
        {/* Main tabbed content */}
        <Card className="mb-6 overflow-hidden border-0 shadow-lg">
          <Tabs 
            value={currentTab} 
            onValueChange={setCurrentTab}
            className="w-full"
          >
            <TabsList className="w-full flex overflow-x-auto p-0 bg-blue-50/80 dark:bg-gray-800/80 border-b">
              <TabsTrigger 
                value="simple" 
                className="flex-1 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 rounded-none border-r"
              >
                <Lightbulb className="h-4 w-4 mr-2" />
                Simple
              </TabsTrigger>
              <TabsTrigger 
                value="detailed" 
                className="flex-1 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 rounded-none border-r"
              >
                <BookOpen className="h-4 w-4 mr-2" />
                Detailed
              </TabsTrigger>
              <TabsTrigger 
                value="examples" 
                className="flex-1 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 rounded-none border-r"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Examples
              </TabsTrigger>
              <TabsTrigger 
                value="mistakes" 
                className="flex-1 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 rounded-none border-r"
              >
                <AlertTriangle className="h-4 w-4 mr-2" />
                Mistakes
              </TabsTrigger>
              <TabsTrigger 
                value="exam" 
                className="flex-1 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 rounded-none border-r"
              >
                <BookOpen className="h-4 w-4 mr-2" />
                Exam
              </TabsTrigger>
              <TabsTrigger 
                value="video" 
                className="flex-1 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 rounded-none"
              >
                <Video className="h-4 w-4 mr-2" />
                Video
              </TabsTrigger>
            </TabsList>
            
            {/* Simple explanation tab */}
            <TabsContent value="simple" className="m-0 p-6 bg-white dark:bg-gray-800">
              <div className="prose dark:prose-invert max-w-none">
                <h3 className="text-xl font-semibold mb-4">Simple Explanation</h3>
                <p>{concept.content.simpleExplanation}</p>
              </div>
            </TabsContent>
            
            {/* Detailed explanation tab */}
            <TabsContent value="detailed" className="m-0 p-6 bg-white dark:bg-gray-800">
              <div className="prose dark:prose-invert max-w-none">
                <h3 className="text-xl font-semibold mb-4">Detailed Explanation</h3>
                <div className="whitespace-pre-line">{concept.content.detailedExplanation}</div>
                
                {concept.content.diagrams && concept.content.diagrams.length > 0 && (
                  <div className="mt-6">
                    <h4 className="text-lg font-semibold mb-3">Diagram</h4>
                    <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                      <img 
                        src="https://static.vecteezy.com/system/resources/previews/013/117/143/original/newton-s-first-law-of-motion-three-cases-of-inertia-vector.jpg" 
                        alt={concept.content.diagrams[0].caption} 
                        className="mx-auto max-h-80 object-contain"
                      />
                      <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-2">
                        {concept.content.diagrams[0].caption}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>
            
            {/* Real-world examples tab */}
            <TabsContent value="examples" className="m-0 p-6 bg-white dark:bg-gray-800">
              <div className="prose dark:prose-invert max-w-none">
                <h3 className="text-xl font-semibold mb-4">Real-world Examples</h3>
                <ul className="space-y-3">
                  {concept.content.examples.map((example, idx) => (
                    <li key={idx} className="flex">
                      <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-800/30 dark:text-blue-300 mr-3 mt-0.5 flex-shrink-0">
                        {idx + 1}
                      </span>
                      <span>{example}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </TabsContent>
            
            {/* Common mistakes tab */}
            <TabsContent value="mistakes" className="m-0 p-6 bg-white dark:bg-gray-800">
              <div className="prose dark:prose-invert max-w-none">
                <h3 className="text-xl font-semibold mb-4">Common Mistakes</h3>
                <ul className="space-y-3">
                  {concept.content.commonMistakes.map((mistake, idx) => (
                    <li key={idx} className="flex">
                      <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-red-100 text-red-800 dark:bg-red-800/30 dark:text-red-300 mr-3 mt-0.5 flex-shrink-0">
                        ✕
                      </span>
                      <span>{mistake}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </TabsContent>
            
            {/* Exam relevance tab */}
            <TabsContent value="exam" className="m-0 p-6 bg-white dark:bg-gray-800">
              <div className="prose dark:prose-invert max-w-none">
                <h3 className="text-xl font-semibold mb-4">Exam Relevance</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-semibold mb-2">Weightage & Importance</h4>
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                      <div className="mb-3">
                        <span className="font-medium text-gray-700 dark:text-gray-300">Marks weightage:</span>
                        <span className="ml-2">{concept.content.examRelevance.marksWeightage}</span>
                      </div>
                      
                      <div>
                        <span className="font-medium text-gray-700 dark:text-gray-300">Question types:</span>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {concept.content.examRelevance.questionTypes.map((type, idx) => (
                            <Badge key={idx} variant="outline" className="bg-blue-100/50 dark:bg-blue-800/30">
                              {type}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold mb-2">Previous Year Questions</h4>
                    <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
                      <ul className="space-y-3">
                        {concept.content.examRelevance.previousYearQuestions.map((question, idx) => (
                          <li key={idx} className="text-sm">
                            <span className="font-medium">{question.split(":")[0]}:</span>
                            <span className="ml-1">{question.split(":")[1]}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h4 className="text-lg font-semibold mb-2">Tips to Approach Questions</h4>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Identify all forces acting on the object before applying the law</li>
                    <li>Draw free body diagrams to visualize forces</li>
                    <li>Consider whether forces are balanced (object at rest or moving with constant velocity)</li>
                    <li>Watch for trick questions that involve apparent forces</li>
                  </ul>
                </div>
              </div>
            </TabsContent>
            
            {/* Video analysis tab */}
            <TabsContent value="video" className="m-0 p-0 bg-white dark:bg-gray-800">
              <div className="aspect-video w-full">
                <iframe
                  ref={videoRef}
                  src={concept.content.videoUrl}
                  title="Video explanation"
                  className="w-full h-[500px]"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-4">Video Analysis</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  This video explains Newton's First Law of Motion with visual demonstrations and examples to help solidify your understanding of the concept.
                </p>
                
                <div className="mt-4">
                  <h4 className="font-medium text-lg mb-2">Key Timestamps</h4>
                  <ul className="space-y-2">
                    <li className="flex">
                      <Badge variant="outline" className="mr-2">0:45</Badge>
                      <span>Definition of Newton's First Law</span>
                    </li>
                    <li className="flex">
                      <Badge variant="outline" className="mr-2">2:30</Badge>
                      <span>Demonstration with everyday examples</span>
                    </li>
                    <li className="flex">
                      <Badge variant="outline" className="mr-2">5:15</Badge>
                      <span>Mathematical representation and problem solving</span>
                    </li>
                  </ul>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </Card>
        
        {/* Related concepts and prerequisites */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">Related Concepts</h3>
              <ul className="space-y-2">
                {concept.relatedConcepts.map(related => (
                  <li key={related.id} className="border-b last:border-0 border-gray-100 dark:border-gray-700 pb-2 last:pb-0">
                    <Button variant="link" className="p-0 h-auto font-normal justify-start text-blue-600 dark:text-blue-400 hover:underline">
                      {related.title}
                    </Button>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">Prerequisites</h3>
              <ul className="space-y-2">
                {concept.prerequisites.map(prereq => (
                  <li key={prereq.id} className="border-b last:border-0 border-gray-100 dark:border-gray-700 pb-2 last:pb-0">
                    <Button variant="link" className="p-0 h-auto font-normal justify-start text-blue-600 dark:text-blue-400 hover:underline">
                      {prereq.title}
                    </Button>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
        
        {/* Quick revision mode */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Quick Revision Mode</h3>
              <Button variant="outline" size="sm">
                Expand
              </Button>
            </div>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4">
              <p className="font-medium">Key points to remember:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Objects at rest stay at rest, objects in motion stay in motion with constant velocity unless acted upon by a force.</li>
                <li>This is known as the law of inertia.</li>
                <li>Mass is a measure of inertia.</li>
                <li>The law explains why we feel a jerk when a vehicle suddenly starts or stops.</li>
                <li>Newton's First Law establishes the concept of reference frames.</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ConceptCardStudyPage;
