
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, Bookmark, Calculator, Mic, ThumbsUp, 
  ThumbsDown, RotateCw, CheckCircle, X, Flag, 
  BookOpen, BookmarkPlus, BookmarkCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type PracticeMode = "typing" | "speech" | "viewing";
type RecallStatus = "remembered" | "forgot" | "review" | null;

interface FlashcardTag {
  name: string;
  type: "concept" | "topic" | "subject" | "exam" | "practice" | "mnemonic";
}

interface Flashcard {
  id: string;
  question: string;
  answer: string;
  explanation?: string;
  image?: string;
  video?: string;
  audio?: string;
  tags: FlashcardTag[];
  difficulty: "easy" | "medium" | "hard";
  relatedConceptId?: string;
  relatedConceptName?: string;
  formulas?: string[];
}

interface FlashcardDeckInfo {
  id: string;
  title: string;
  subject: string;
  topic: string;
  cardCount: number;
  completedCount: number;
  masteryLevel: number;
  cards: Flashcard[];
}

// Mock data for demonstration
const mockDeckData: FlashcardDeckInfo = {
  id: "physics-kinematics",
  title: "Physics: Kinematics",
  subject: "Physics",
  topic: "Kinematics",
  cardCount: 10,
  completedCount: 0,
  masteryLevel: 0,
  cards: [
    {
      id: "phys-1",
      question: "What is the formula for calculating displacement when an object moves with constant acceleration?",
      answer: "s = ut + (1/2)at²",
      explanation: "Where s is displacement, u is initial velocity, t is time, and a is acceleration. This formula is derived from integrating the velocity-time function.",
      tags: [
        { name: "Kinematics", type: "concept" },
        { name: "Physics", type: "subject" },
        { name: "JEE Advanced", type: "exam" }
      ],
      difficulty: "medium",
      relatedConceptId: "concept-kinematics-1",
      relatedConceptName: "Motion with Constant Acceleration",
      formulas: ["v = u + at", "v² = u² + 2as"]
    },
    {
      id: "phys-2",
      question: "Define instantaneous velocity.",
      answer: "The velocity of an object at a specific point in time, calculated as the derivative of position with respect to time.",
      explanation: "Mathematically, it's represented as v = dx/dt, where x is position and t is time.",
      tags: [
        { name: "Velocity", type: "concept" },
        { name: "Physics", type: "subject" },
        { name: "JEE Mains", type: "exam" }
      ],
      difficulty: "easy",
      relatedConceptId: "concept-kinematics-2",
      relatedConceptName: "Velocity and Acceleration"
    },
    {
      id: "phys-3",
      question: "What is the difference between scalar and vector quantities?",
      answer: "Scalar quantities have only magnitude, while vector quantities have both magnitude and direction.",
      explanation: "Examples of scalars: mass, time, temperature. Examples of vectors: displacement, velocity, acceleration, force.",
      image: "https://example.com/scalar-vector.jpg",
      tags: [
        { name: "Vectors", type: "concept" },
        { name: "Physics", type: "subject" },
        { name: "Quick Recall", type: "practice" }
      ],
      difficulty: "easy",
      relatedConceptId: "concept-vectors-1",
      relatedConceptName: "Vectors in Physics"
    },
    {
      id: "phys-4",
      question: "Which equation represents Newton's Second Law of Motion?",
      answer: "F = ma",
      explanation: "Where F is the net force acting on an object, m is the mass of the object, and a is its acceleration.",
      tags: [
        { name: "Newton's Laws", type: "concept" },
        { name: "Physics", type: "subject" },
        { name: "NEET", type: "exam" },
        { name: "Mnemonic", type: "mnemonic" }
      ],
      difficulty: "easy",
      relatedConceptId: "concept-forces-1",
      relatedConceptName: "Newton's Laws of Motion"
    },
    {
      id: "phys-5",
      question: "What is the relation between linear velocity (v) and angular velocity (ω) for circular motion?",
      answer: "v = rω",
      explanation: "Where r is the radius of the circular path. This equation connects the linear speed with the angular speed.",
      tags: [
        { name: "Circular Motion", type: "concept" },
        { name: "Physics", type: "subject" },
        { name: "Problem Solving", type: "practice" }
      ],
      difficulty: "medium",
      relatedConceptId: "concept-circular-1",
      relatedConceptName: "Circular Motion",
      formulas: ["ac = v²/r", "ac = rω²"]
    }
  ]
};

const formulasList = [
  "v = u + at",
  "s = ut + (1/2)at²", 
  "v² = u² + 2as",
  "F = ma",
  "E = mc²",
  "p = mv",
  "W = Fd",
  "KE = (1/2)mv²",
  "PE = mgh"
];

const EnhancedInteractiveFlashcard = () => {
  const { deckId } = useParams<{ deckId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();

  // State management
  const [loading, setLoading] = useState(true);
  const [deckInfo, setDeckInfo] = useState<FlashcardDeckInfo | null>(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");
  const [accuracy, setAccuracy] = useState<number | null>(null);
  const [practiceMode, setPracticeMode] = useState<PracticeMode>("typing");
  const [showCalculator, setShowCalculator] = useState(false);
  const [showFormulas, setShowFormulas] = useState(false);
  const [bookmarkedCards, setBookmarkedCards] = useState<Set<string>>(new Set());
  const [cardStatusMap, setCardStatusMap] = useState<Record<string, RecallStatus>>({});
  const [listening, setListening] = useState(false);
  const [speechResult, setSpeechResult] = useState("");
  const [showSessionSummary, setShowSessionSummary] = useState(false);
  const [sessionStats, setSessionStats] = useState({
    attempted: 0,
    correct: 0,
    incorrect: 0,
    bookmarked: 0,
    timeSpent: 0,
    masteryImprovement: 0
  });

  // Load deck data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Mock API call
        await new Promise(resolve => setTimeout(resolve, 800));
        setDeckInfo(mockDeckData);
      } catch (error) {
        toast({
          title: "Error loading flashcards",
          description: "Failed to load the flashcard deck. Please try again.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [deckId, toast]);

  // Timer for time tracking
  useEffect(() => {
    const timer = setInterval(() => {
      setSessionStats(prev => ({
        ...prev,
        timeSpent: prev.timeSpent + 1
      }));
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  // Current card getter
  const currentCard = deckInfo && currentCardIndex < deckInfo.cards.length
    ? deckInfo.cards[currentCardIndex]
    : null;

  // Progress calculation
  const progress = deckInfo 
    ? Math.round(((currentCardIndex + 1) / deckInfo.cards.length) * 100)
    : 0;

  // Format time spent 
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Speech recognition functions
  const startListening = () => {
    if (!('webkitSpeechRecognition' in window)) {
      toast({
        title: "Speech Recognition Not Supported",
        description: "Your browser doesn't support speech recognition. Please try in Chrome.",
        variant: "destructive"
      });
      return;
    }

    setListening(true);
    // In a real implementation, use the Web Speech API
    // For this mock, simulate speech recognition
    setTimeout(() => {
      const simulatedResult = currentCard?.answer.split(' ').slice(0, 3).join(' ') + "...";
      setSpeechResult(simulatedResult);
      setUserAnswer(simulatedResult);
      setListening(false);
    }, 2000);
  };

  const stopListening = () => {
    setListening(false);
    // In a real implementation, stop the Web Speech API
  };

  // Card navigation
  const goToNextCard = () => {
    if (!deckInfo || currentCardIndex >= deckInfo.cards.length - 1) {
      // End of deck
      showSessionSummaryDialog();
      return;
    }

    setCurrentCardIndex(prev => prev + 1);
    setIsFlipped(false);
    setUserAnswer("");
    setSpeechResult("");
    setAccuracy(null);
  };

  const goToPreviousCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(prev => prev - 1);
      setIsFlipped(false);
      setUserAnswer("");
      setSpeechResult("");
      setAccuracy(null);
    }
  };

  // Card interaction functions
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleSubmitAnswer = () => {
    if (!currentCard || !userAnswer.trim()) return;
    
    // Calculate accuracy based on simple text matching
    const calculatedAccuracy = calculateAccuracy(userAnswer, currentCard.answer);
    setAccuracy(calculatedAccuracy);
    
    // Track answer in session stats
    if (calculatedAccuracy > 70) {
      setSessionStats(prev => ({
        ...prev,
        correct: prev.correct + 1,
        attempted: prev.attempted + 1
      }));
    } else {
      setSessionStats(prev => ({
        ...prev,
        incorrect: prev.incorrect + 1,
        attempted: prev.attempted + 1
      }));
    }
    
    // Show feedback toast based on accuracy
    if (calculatedAccuracy >= 80) {
      toast({
        title: "Great job!",
        description: "Your answer is correct.",
      });
    } else if (calculatedAccuracy >= 50) {
      toast({
        title: "Almost there",
        description: "Your answer is partially correct.",
      });
    } else {
      toast({
        title: "Keep learning",
        description: "Review the answer and try again.",
        variant: "destructive"
      });
    }
  };

  const calculateAccuracy = (userAnswer: string, correctAnswer: string): number => {
    if (!userAnswer.trim()) return 0;
    
    // Simple word matching algorithm (can be improved with more sophisticated NLP)
    const userWords = userAnswer.toLowerCase().split(/\s+/);
    const correctWords = correctAnswer.toLowerCase().split(/\s+/);
    
    let matchedWords = 0;
    correctWords.forEach(word => {
      if (userWords.includes(word)) matchedWords++;
    });
    
    return Math.round((matchedWords / correctWords.length) * 100);
  };

  const handleCardResponse = (status: RecallStatus) => {
    if (!currentCard) return;
    
    // Update card status
    setCardStatusMap(prev => ({
      ...prev,
      [currentCard.id]: status
    }));

    // Update bookmark if needed
    if (status === 'review') {
      setBookmarkedCards(prev => {
        const newBookmarks = new Set(prev);
        newBookmarks.add(currentCard.id);
        return newBookmarks;
      });
      
      setSessionStats(prev => ({
        ...prev,
        bookmarked: prev.bookmarked + 1
      }));
    }
    
    // Show appropriate toast
    if (status === 'remembered') {
      toast({
        title: "Great!",
        description: "This card will appear less frequently.",
      });
    } else if (status === 'forgot') {
      toast({
        title: "No problem",
        description: "We'll review this card more frequently.",
      });
    } else {
      toast({
        title: "Marked for review",
        description: "This card has been bookmarked for later review.",
      });
    }
    
    // Move to next card after a short delay
    setTimeout(goToNextCard, 800);
  };

  const toggleBookmark = () => {
    if (!currentCard) return;
    
    setBookmarkedCards(prev => {
      const newBookmarks = new Set(prev);
      if (newBookmarks.has(currentCard.id)) {
        newBookmarks.delete(currentCard.id);
        toast({ title: "Bookmark removed" });
        setSessionStats(prev => ({
          ...prev,
          bookmarked: Math.max(0, prev.bookmarked - 1)
        }));
      } else {
        newBookmarks.add(currentCard.id);
        toast({ title: "Bookmark added" });
        setSessionStats(prev => ({
          ...prev,
          bookmarked: prev.bookmarked + 1
        }));
      }
      return newBookmarks;
    });
  };

  const showSessionSummaryDialog = () => {
    // Calculate mastery improvement
    const masteryImprovement = sessionStats.attempted > 0
      ? Math.round((sessionStats.correct / sessionStats.attempted) * 100) - 
        (deckInfo?.masteryLevel || 0)
      : 0;
    
    // Update session stats
    setSessionStats(prev => ({
      ...prev,
      masteryImprovement: masteryImprovement > 0 ? masteryImprovement : 0
    }));
    
    // Show summary dialog
    setShowSessionSummary(true);
  };

  const handleRetry = () => {
    setUserAnswer("");
    setSpeechResult("");
    setAccuracy(null);
  };

  const handleBackToDecks = () => {
    navigate('/dashboard/student/flashcards');
  };

  const restartSession = () => {
    setCurrentCardIndex(0);
    setIsFlipped(false);
    setUserAnswer("");
    setSpeechResult("");
    setAccuracy(null);
    setCardStatusMap({});
    setSessionStats({
      attempted: 0,
      correct: 0,
      incorrect: 0,
      bookmarked: 0,
      timeSpent: 0,
      masteryImprovement: 0
    });
    setShowSessionSummary(false);
  };

  // Render loading state
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <Button variant="outline" onClick={handleBackToDecks}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Flashcards
          </Button>
        </div>
        <div className="h-96 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-xl font-medium">Loading flashcards...</p>
            <p className="text-muted-foreground">Preparing your personalized learning experience</p>
          </div>
        </div>
      </div>
    );
  }

  // Render deck not found state
  if (!deckInfo) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <Button variant="outline" onClick={handleBackToDecks}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Flashcards
          </Button>
        </div>
        <div className="text-center py-16">
          <h2 className="text-2xl font-bold mb-2">Deck Not Found</h2>
          <p className="text-gray-500 mb-6">The flashcard deck you're looking for doesn't exist or has been removed.</p>
          <Button onClick={handleBackToDecks}>Return to Flashcards</Button>
        </div>
      </div>
    );
  }

  // Get tag color based on type
  const getTagColor = (type: FlashcardTag["type"]) => {
    switch (type) {
      case "concept": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "topic": return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
      case "subject": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "exam": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      case "practice": return "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300";
      case "mnemonic": return "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50/50 to-indigo-50/50 dark:from-gray-900 dark:to-indigo-950/20">
      <div className="container mx-auto px-4 py-8 pb-32 md:pb-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Button variant="outline" size="sm" onClick={handleBackToDecks}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Flashcards
              </Button>
              <Badge variant="outline" className="bg-indigo-100 text-indigo-800 border-indigo-200">
                {deckInfo.subject}
              </Badge>
              <Badge variant="outline" className="bg-violet-100 text-violet-800 border-violet-200">
                {deckInfo.topic}
              </Badge>
            </div>
            <h1 className="text-2xl font-bold">{deckInfo.title}</h1>
          </div>
          
          <div className="flex items-center gap-3">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={toggleBookmark}
                  >
                    {bookmarkedCards.has(currentCard?.id || '') ? 
                      <BookmarkCheck className="h-5 w-5 text-yellow-500" /> : 
                      <BookmarkPlus className="h-5 w-5" />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{bookmarkedCards.has(currentCard?.id || '') ? 'Remove bookmark' : 'Add bookmark'}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => setShowCalculator(!showCalculator)}
                  >
                    <Calculator className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Toggle calculator</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            {currentCard?.formulas && currentCard.formulas.length > 0 && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => setShowFormulas(!showFormulas)}
                    >
                      <BookOpen className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>View relevant formulas</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
            
            <Button 
              variant="default"
              onClick={showSessionSummaryDialog}
            >
              Session Summary
            </Button>
          </div>
        </div>

        {/* Progress Section */}
        <div className="mb-6">
          <div className="flex justify-between text-sm mb-1">
            <span>Card {currentCardIndex + 1} of {deckInfo.cards.length}</span>
            <div className="flex items-center gap-2">
              <span>Time: {formatTime(sessionStats.timeSpent)}</span>
              <span>{progress}% complete</span>
            </div>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Practice Mode Selection */}
        <div className="mb-6">
          <Tabs
            value={practiceMode}
            onValueChange={(value) => setPracticeMode(value as PracticeMode)}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="typing">
                Typing Mode
              </TabsTrigger>
              <TabsTrigger value="speech">
                Speech Mode
              </TabsTrigger>
              <TabsTrigger value="viewing">
                View Only
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Main Flashcard */}
        {currentCard && (
          <div className="mb-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={`card-${currentCard.id}-${isFlipped ? 'back' : 'front'}`}
                initial={{ rotateY: isFlipped ? -90 : 90, opacity: 0 }}
                animate={{ rotateY: 0, opacity: 1 }}
                exit={{ rotateY: isFlipped ? 90 : -90, opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="w-full"
              >
                <Card className="w-full max-w-3xl mx-auto shadow-lg border border-gray-200 dark:border-gray-700">
                  {/* Card Header with Tags */}
                  <CardHeader className="border-b border-gray-100 dark:border-gray-800 pb-3">
                    <div className="flex flex-wrap gap-2">
                      {currentCard.tags.map((tag, index) => (
                        <Badge 
                          key={index}
                          className={`${getTagColor(tag.type)}`}
                        >
                          {tag.name}
                        </Badge>
                      ))}
                      <Badge className={`ml-auto ${
                        currentCard.difficulty === 'easy' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                        currentCard.difficulty === 'medium' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300' :
                        'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                      }`}>
                        {currentCard.difficulty.charAt(0).toUpperCase() + currentCard.difficulty.slice(1)}
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-6 pb-8 min-h-[300px]">
                    {!isFlipped ? (
                      <div className="space-y-6">
                        {/* Question */}
                        <div className="prose dark:prose-invert max-w-none">
                          <h3 className="text-xl font-medium mb-4">Question:</h3>
                          <div className="text-lg">{currentCard.question}</div>
                        </div>
                        
                        {/* Image if available */}
                        {currentCard.image && (
                          <div className="mt-4">
                            <img 
                              src={currentCard.image} 
                              alt="Flashcard visual"
                              className="mx-auto max-h-60 rounded-md"
                            />
                          </div>
                        )}
                        
                        {/* Answer input area based on practice mode */}
                        {practiceMode === "typing" && (
                          <div className="mt-6">
                            <h4 className="text-sm font-medium mb-2">Your answer:</h4>
                            <Textarea
                              placeholder="Type your answer here..."
                              className="min-h-[100px] resize-none"
                              value={userAnswer}
                              onChange={(e) => setUserAnswer(e.target.value)}
                              disabled={accuracy !== null}
                            />
                            
                            {accuracy !== null && (
                              <div className="mt-3 flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                  <span className="font-medium">Accuracy:</span>
                                  <span className={`font-bold ${
                                    accuracy >= 80 ? "text-green-600 dark:text-green-400" :
                                    accuracy >= 50 ? "text-amber-600 dark:text-amber-400" :
                                    "text-red-600 dark:text-red-400"
                                  }`}>
                                    {accuracy}%
                                  </span>
                                </div>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={handleRetry}
                                >
                                  <RotateCw className="h-3 w-3 mr-1" />
                                  Try Again
                                </Button>
                              </div>
                            )}
                          </div>
                        )}
                        
                        {practiceMode === "speech" && (
                          <div className="mt-6">
                            <div className="flex items-center justify-center gap-4 mb-4">
                              <Button 
                                variant={listening ? "destructive" : "default"}
                                onClick={listening ? stopListening : startListening}
                                className="flex items-center gap-2 px-6 py-6 rounded-full"
                              >
                                <Mic className="h-6 w-6" />
                                {listening ? "Stop Recording" : "Start Speaking"}
                              </Button>
                            </div>
                            
                            {speechResult && (
                              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md border border-gray-200 dark:border-gray-700 mt-4">
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Your spoken answer:</p>
                                <p className="text-lg">{speechResult}</p>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="space-y-6">
                        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md border border-blue-100 dark:border-blue-800">
                          <h3 className="text-xl font-medium mb-2">Answer:</h3>
                          <p className="text-lg text-blue-900 dark:text-blue-100">{currentCard.answer}</p>
                        </div>
                        
                        {currentCard.explanation && (
                          <div className="mt-4">
                            <h4 className="font-medium mb-2">Explanation:</h4>
                            <p className="text-gray-700 dark:text-gray-300">{currentCard.explanation}</p>
                          </div>
                        )}
                        
                        {/* Related concept link */}
                        {currentCard.relatedConceptId && currentCard.relatedConceptName && (
                          <div className="mt-4 p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-md border border-indigo-100 dark:border-indigo-800">
                            <div className="flex items-center">
                              <BookOpen className="h-5 w-5 text-indigo-600 dark:text-indigo-400 mr-2" />
                              <div>
                                <h4 className="font-medium">Related Concept:</h4>
                                <p className="text-indigo-600 dark:text-indigo-400">{currentCard.relatedConceptName}</p>
                              </div>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="ml-auto"
                                onClick={() => navigate(`/dashboard/student/concepts/${currentCard.relatedConceptId}`)}
                              >
                                View Concept
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </CardContent>

                  <CardFooter className="flex flex-col gap-4 border-t border-gray-100 dark:border-gray-800 pt-4">
                    {!isFlipped ? (
                      <div className="w-full">
                        <div className="flex justify-center">
                          {practiceMode === "typing" && accuracy === null ? (
                            <div className="flex gap-3">
                              <Button 
                                variant="outline"
                                onClick={handleFlip}
                                className="min-w-[120px]"
                              >
                                <RotateCw className="h-4 w-4 mr-2" />
                                Flip Card
                              </Button>
                              <Button 
                                onClick={handleSubmitAnswer} 
                                disabled={!userAnswer.trim()}
                                className="min-w-[120px]"
                              >
                                Check Answer
                              </Button>
                            </div>
                          ) : (
                            <Button 
                              onClick={handleFlip}
                              className="min-w-[200px]"
                            >
                              Reveal Answer
                            </Button>
                          )}
                        </div>
                        
                        <div className="w-full flex justify-between mt-4">
                          <Button
                            variant="ghost"
                            onClick={goToPreviousCard}
                            disabled={currentCardIndex === 0}
                            size="sm"
                          >
                            <ArrowLeft className="h-4 w-4 mr-1" />
                            Previous
                          </Button>
                          
                          <Button
                            variant="ghost"
                            onClick={goToNextCard}
                            size="sm"
                          >
                            Next
                            <ArrowLeft className="h-4 w-4 ml-1 rotate-180" />
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="w-full space-y-4">
                        <div className="grid grid-cols-3 gap-2 w-full">
                          <Button
                            className="border-green-200 hover:bg-green-50 dark:hover:bg-green-900/20 text-green-700 dark:text-green-400"
                            onClick={() => handleCardResponse('remembered')}
                          >
                            <ThumbsUp className="h-4 w-4 mr-1" />
                            I Knew This
                          </Button>
                          <Button
                            className="border-red-200 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-700 dark:text-red-400"
                            onClick={() => handleCardResponse('forgot')}
                          >
                            <ThumbsDown className="h-4 w-4 mr-1" />
                            I Forgot This
                          </Button>
                          <Button
                            className="border-blue-200 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-blue-700 dark:text-blue-400"
                            onClick={() => handleCardResponse('review')}
                          >
                            <Bookmark className="h-4 w-4 mr-1" />
                            Bookmark
                          </Button>
                        </div>
                        
                        <div className="w-full flex justify-between">
                          <Button
                            variant="ghost"
                            onClick={handleFlip}
                            size="sm"
                          >
                            Back to Question
                          </Button>
                          
                          <Button
                            variant="outline"
                            onClick={goToNextCard}
                            size="sm"
                          >
                            Next Card
                            <ArrowLeft className="h-4 w-4 ml-1 rotate-180" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardFooter>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>
        )}

        {/* Session statistics - mini summary at bottom */}
        <div className="mt-4 mb-8 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-4">
          <div className="grid grid-cols-4 gap-3 text-center">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Attempted</p>
              <p className="text-xl font-bold">{sessionStats.attempted}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Correct</p>
              <p className="text-xl font-bold text-green-600 dark:text-green-400">{sessionStats.correct}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Incorrect</p>
              <p className="text-xl font-bold text-red-600 dark:text-red-400">{sessionStats.incorrect}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Bookmarked</p>
              <p className="text-xl font-bold text-amber-600 dark:text-amber-400">{sessionStats.bookmarked}</p>
            </div>
          </div>
        </div>

        {/* Formula Panel (conditionally rendered) */}
        {showFormulas && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-20 right-4 w-80 z-40"
          >
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium">Formulas</h3>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="h-6 w-6 p-0"
                    onClick={() => setShowFormulas(false)}
                  >
                    ×
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pb-4">
                <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                  {currentCard?.formulas ? (
                    currentCard.formulas.map((formula, index) => (
                      <div key={index} className="p-2 bg-gray-50 dark:bg-gray-800 rounded">
                        {formula}
                      </div>
                    ))
                  ) : (
                    formulasList.map((formula, index) => (
                      <div key={index} className="p-2 bg-gray-50 dark:bg-gray-800 rounded">
                        {formula}
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Calculator Panel (conditionally rendered) */}
        {showCalculator && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-4 right-4 w-80 z-50"
          >
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium">Calculator</h3>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="h-6 w-6 p-0"
                    onClick={() => setShowCalculator(false)}
                  >
                    ×
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pb-4">
                <div className="mb-2">
                  <Input 
                    type="text" 
                    className="text-right" 
                    placeholder="0"
                    readOnly
                  />
                </div>
                <div className="grid grid-cols-4 gap-1">
                  {['7', '8', '9', '÷', '4', '5', '6', '×', '1', '2', '3', '-', '0', '.', '=', '+'].map(key => (
                    <Button 
                      key={key} 
                      variant={['=', '+', '-', '×', '÷'].includes(key) ? "default" : "outline"} 
                      size="sm"
                      className="h-10"
                    >
                      {key}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Session summary dialog */}
        <Dialog open={showSessionSummary} onOpenChange={setShowSessionSummary}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-xl">Session Summary</DialogTitle>
              <DialogDescription>
                Here's how you did in this flashcard session
              </DialogDescription>
            </DialogHeader>
            
            <div className="py-4">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg text-center">
                  <p className="text-sm text-muted-foreground mb-1">Flashcards Attempted</p>
                  <p className="text-3xl font-bold">{sessionStats.attempted}</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg text-center">
                  <p className="text-sm text-muted-foreground mb-1">Time Spent</p>
                  <p className="text-3xl font-bold">{formatTime(sessionStats.timeSpent)}</p>
                </div>
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center">
                  <span>Correct Answers</span>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                    <span className="font-medium">{sessionStats.correct}</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span>Incorrect Answers</span>
                  <div className="flex items-center">
                    <X className="h-4 w-4 text-red-500 mr-1" />
                    <span className="font-medium">{sessionStats.incorrect}</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span>Bookmarked Cards</span>
                  <div className="flex items-center">
                    <Bookmark className="h-4 w-4 text-amber-500 mr-1" />
                    <span className="font-medium">{sessionStats.bookmarked}</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span>Mastery Improvement</span>
                  <div className="flex items-center">
                    <span className="font-medium text-green-500">+{sessionStats.masteryImprovement}%</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-md text-sm">
                <p className="font-medium text-blue-800 dark:text-blue-300">Focus recommendations:</p>
                <ul className="mt-1 list-disc list-inside text-blue-700 dark:text-blue-400">
                  <li>Review your bookmarked cards</li>
                  <li>Practice more with {deckInfo.subject} concepts</li>
                  <li>Try related flashcard decks</li>
                </ul>
              </div>
            </div>
            
            <DialogFooter className="flex flex-col sm:flex-row gap-2">
              <Button variant="outline" onClick={handleBackToDecks}>
                Return to All Flashcards
              </Button>
              <Button onClick={restartSession}>
                <RotateCw className="h-4 w-4 mr-2" />
                Restart Session
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default EnhancedInteractiveFlashcard;
