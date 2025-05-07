
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Book, BookOpen, Calculator, Mic, 
  StarIcon, ArrowLeft, ArrowRight, 
  CheckCircle, XCircle, Flag, RefreshCw,
  Bookmark, BookmarkCheck, BookmarkPlus, Smile
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

type PracticeMode = "typing" | "speech" | "viewing";

interface Flashcard {
  id: string;
  question: string;
  answer: string;
  explanation?: string;
  image?: string;
  relatedConceptId?: string;
  relatedConceptName?: string;
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

// Mock data - in a real app, this would come from an API/database
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
      relatedConceptId: "concept-kinematics-1",
      relatedConceptName: "Motion with Constant Acceleration"
    },
    {
      id: "phys-2",
      question: "Define instantaneous velocity.",
      answer: "The velocity of an object at a specific point in time, calculated as the derivative of position with respect to time.",
      explanation: "Mathematically, it's represented as v = dx/dt, where x is position and t is time.",
      relatedConceptId: "concept-kinematics-2",
      relatedConceptName: "Velocity and Acceleration"
    },
    {
      id: "phys-3",
      question: "What is the difference between scalar and vector quantities?",
      answer: "Scalar quantities have only magnitude, while vector quantities have both magnitude and direction.",
      explanation: "Examples of scalars: mass, time, temperature. Examples of vectors: displacement, velocity, acceleration, force.",
      relatedConceptId: "concept-vectors-1",
      relatedConceptName: "Vectors in Physics"
    },
    {
      id: "phys-4",
      question: "State Newton's Second Law of Motion.",
      answer: "The acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass.",
      explanation: "Mathematically expressed as F = ma, where F is force, m is mass, and a is acceleration.",
      relatedConceptId: "concept-forces-1",
      relatedConceptName: "Newton's Laws of Motion"
    },
    {
      id: "phys-5",
      question: "What is the relation between linear velocity (v) and angular velocity (ω) for circular motion?",
      answer: "v = rω",
      explanation: "Where r is the radius of the circular path. This equation connects the linear speed with the angular speed.",
      relatedConceptId: "concept-circular-1",
      relatedConceptName: "Circular Motion"
    }
  ]
};

const InteractiveFlashcardBrowser = () => {
  const { deckId } = useParams<{ deckId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();

  // State management
  const [loading, setLoading] = useState(true);
  const [deckInfo, setDeckInfo] = useState<FlashcardDeckInfo | null>(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");
  const [practiceMode, setPracticeMode] = useState<PracticeMode>("typing");
  const [showCalculator, setShowCalculator] = useState(false);
  const [accuracy, setAccuracy] = useState(0);
  const [bookmarkedCards, setBookmarkedCards] = useState<Set<string>>(new Set());
  const [cardStats, setCardStats] = useState<Record<string, 'remembered' | 'forgot' | 'needHelp' | null>>({});
  const [listening, setListening] = useState(false);
  const [speechResult, setSpeechResult] = useState("");

  // Load deck data
  useEffect(() => {
    // In a real app, fetch from API based on deckId
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

  // Current card getter
  const currentCard = deckInfo && currentCardIndex < deckInfo.cards.length
    ? deckInfo.cards[currentCardIndex]
    : null;

  // Progress calculation
  const progress = deckInfo 
    ? Math.round(((currentCardIndex + 1) / deckInfo.cards.length) * 100)
    : 0;

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
    // For this mock, we'll simulate speech recognition
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
      showSessionSummary();
      return;
    }

    setCurrentCardIndex(prev => prev + 1);
    setIsFlipped(false);
    setUserAnswer("");
    setSpeechResult("");
    setAccuracy(0);
  };

  const goToPreviousCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(prev => prev - 1);
      setIsFlipped(false);
      setUserAnswer("");
      setSpeechResult("");
      setAccuracy(0);
    }
  };

  // Card interaction functions
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
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

  const handleSubmitAnswer = () => {
    if (!currentCard || !userAnswer.trim()) return;
    
    const calculatedAccuracy = calculateAccuracy(userAnswer, currentCard.answer);
    setAccuracy(calculatedAccuracy);
    
    // Show feedback toast based on accuracy
    if (calculatedAccuracy >= 80) {
      toast({
        title: "Great job!",
        description: "Your answer is correct.",
        variant: "default"
      });
    } else if (calculatedAccuracy >= 50) {
      toast({
        title: "Almost there",
        description: "Your answer is partially correct.",
        variant: "default"
      });
    } else {
      toast({
        title: "Keep learning",
        description: "Review the answer and try again.",
        variant: "destructive"
      });
    }
  };

  const handleRecall = (type: 'remembered' | 'forgot' | 'needHelp') => {
    if (!currentCard) return;
    
    setCardStats(prev => ({
      ...prev,
      [currentCard.id]: type
    }));
    
    // Show appropriate toast
    if (type === 'remembered') {
      toast({
        title: "Great!",
        description: "This card will appear less frequently.",
        variant: "default"
      });
    } else if (type === 'forgot') {
      toast({
        title: "No problem",
        description: "We'll review this card more frequently.",
        variant: "default"
      });
    } else {
      toast({
        title: "Marked for review",
        description: "This card has been flagged for a detailed review later.",
        variant: "default"
      });
    }
    
    // Move to next card after a short delay
    setTimeout(goToNextCard, 1000);
  };

  const toggleBookmark = () => {
    if (!currentCard) return;
    
    setBookmarkedCards(prev => {
      const newBookmarks = new Set(prev);
      if (newBookmarks.has(currentCard.id)) {
        newBookmarks.delete(currentCard.id);
        toast({ title: "Bookmark removed" });
      } else {
        newBookmarks.add(currentCard.id);
        toast({ title: "Bookmark added" });
      }
      return newBookmarks;
    });
  };

  const showSessionSummary = () => {
    if (!deckInfo) return;
    
    const rememberedCount = Object.values(cardStats).filter(s => s === 'remembered').length;
    const forgotCount = Object.values(cardStats).filter(s => s === 'forgot').length;
    const needHelpCount = Object.values(cardStats).filter(s => s === 'needHelp').length;
    const totalResponded = rememberedCount + forgotCount + needHelpCount;
    
    const summaryAccuracy = totalResponded > 0
      ? Math.round((rememberedCount / totalResponded) * 100)
      : 0;
    
    toast({
      title: "Session Summary",
      description: `Accuracy: ${summaryAccuracy}% | Remembered: ${rememberedCount} | Forgot: ${forgotCount} | Flagged: ${needHelpCount}`,
      duration: 5000
    });

    // In a real app, you'd save this data to the user's profile/progress
    console.log("Session stats:", { rememberedCount, forgotCount, needHelpCount, summaryAccuracy });
  };

  const handleRetry = () => {
    setUserAnswer("");
    setSpeechResult("");
    setAccuracy(0);
  };

  const handleBackToDecks = () => {
    navigate('/dashboard/student/flashcards');
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <Button variant="outline" onClick={handleBackToDecks}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Decks
          </Button>
        </div>
        <div className="h-96 flex items-center justify-center">
          <div className="animate-pulse flex flex-col items-center">
            <div className="rounded-lg bg-gray-200 h-64 w-full max-w-2xl mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-2.5"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-2.5"></div>
            <div className="h-10 bg-gray-200 rounded w-1/3"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!deckInfo) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <Button variant="outline" onClick={handleBackToDecks}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Decks
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

  return (
    <div className="container mx-auto px-4 py-8 pb-32 md:pb-8">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Button variant="outline" size="sm" onClick={handleBackToDecks}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
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
          
          <Button 
            variant="default"
            onClick={showSessionSummary}
          >
            Session Summary
          </Button>
        </div>
      </div>

      {/* Progress Section */}
      <div className="mb-6">
        <div className="flex justify-between text-sm mb-1">
          <span>Card {currentCardIndex + 1} of {deckInfo.cards.length}</span>
          <span>{progress}% complete</span>
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
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <Card className="w-full max-w-3xl mx-auto shadow-lg">
                {/* Related Concept Link */}
                {currentCard.relatedConceptName && (
                  <div className="px-6 pt-4">
                    <div 
                      onClick={() => currentCard.relatedConceptId && navigate(`/dashboard/student/concepts/${currentCard.relatedConceptId}`)} 
                      className="inline-flex items-center text-xs bg-blue-50 hover:bg-blue-100 text-blue-700 px-2 py-1 rounded-full cursor-pointer transition-colors"
                    >
                      <Book className="h-3 w-3 mr-1" />
                      {currentCard.relatedConceptName}
                    </div>
                  </div>
                )}
                
                <CardHeader>
                  <div className="text-lg font-medium">
                    {!isFlipped ? "Question" : "Answer"}
                  </div>
                </CardHeader>

                <CardContent className="min-h-[200px]">
                  {!isFlipped ? (
                    <div className="space-y-4">
                      <div className="prose dark:prose-invert">
                        <p className="text-lg">{currentCard.question}</p>
                      </div>
                      
                      {practiceMode === "typing" && (
                        <div className="mt-4">
                          <Textarea
                            placeholder="Type your answer here..."
                            className="min-h-[100px] resize-none"
                            value={userAnswer}
                            onChange={(e) => setUserAnswer(e.target.value)}
                            disabled={accuracy > 0}
                          />
                          
                          {accuracy > 0 && (
                            <div className="mt-2 flex justify-between items-center">
                              <div className="flex items-center gap-2">
                                <span className="font-medium">Accuracy:</span>
                                <span className={`font-bold ${
                                  accuracy >= 80 ? "text-green-600" :
                                  accuracy >= 50 ? "text-amber-600" :
                                  "text-red-600"
                                }`}>
                                  {accuracy}%
                                </span>
                              </div>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={handleRetry}
                              >
                                <RefreshCw className="h-3 w-3 mr-1" />
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
                              className="flex items-center gap-2"
                            >
                              <Mic className="h-4 w-4" />
                              {listening ? "Stop Recording" : "Start Speaking"}
                            </Button>
                          </div>
                          
                          {speechResult && (
                            <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                              <p className="text-sm text-gray-600 mb-2">Your spoken answer:</p>
                              <p>{speechResult}</p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md border border-blue-100 dark:border-blue-800">
                        <p className="text-blue-900 dark:text-blue-100">{currentCard.answer}</p>
                      </div>
                      
                      {currentCard.explanation && (
                        <div>
                          <h4 className="font-medium mb-2">Explanation:</h4>
                          <p className="text-gray-700 dark:text-gray-300">{currentCard.explanation}</p>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>

                <CardFooter className="flex flex-col gap-4">
                  {!isFlipped ? (
                    <div className="w-full flex justify-center">
                      {practiceMode === "typing" && !accuracy ? (
                        <Button onClick={handleSubmitAnswer} disabled={!userAnswer.trim()}>
                          Check Answer
                        </Button>
                      ) : (
                        <Button onClick={handleFlip}>
                          Reveal Answer
                        </Button>
                      )}
                    </div>
                  ) : (
                    <div className="grid grid-cols-3 gap-2 w-full">
                      <Button
                        variant="outline"
                        className="border-green-200 hover:bg-green-50 text-green-700"
                        onClick={() => handleRecall('remembered')}
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        I Remembered
                      </Button>
                      <Button
                        variant="outline"
                        className="border-amber-200 hover:bg-amber-50 text-amber-700"
                        onClick={() => handleRecall('forgot')}
                      >
                        <XCircle className="h-4 w-4 mr-1" />
                        I Forgot
                      </Button>
                      <Button
                        variant="outline"
                        className="border-blue-200 hover:bg-blue-50 text-blue-700"
                        onClick={() => handleRecall('needHelp')}
                      >
                        <Flag className="h-4 w-4 mr-1" />
                        Need More Help
                      </Button>
                    </div>
                  )}
                  
                  <div className="w-full flex justify-between">
                    <Button
                      variant="ghost"
                      onClick={goToPreviousCard}
                      disabled={currentCardIndex === 0}
                      size="sm"
                    >
                      <ArrowLeft className="h-4 w-4 mr-1" />
                      Previous
                    </Button>
                    
                    {isFlipped && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={handleFlip}
                      >
                        Back to Question
                      </Button>
                    )}
                    
                    <Button
                      variant="ghost"
                      onClick={goToNextCard}
                      size="sm"
                    >
                      Next
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>
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

      {/* Daily Challenge Section */}
      <div className="mt-12 mb-6">
        <h2 className="text-xl font-bold mb-4">Daily Challenge</h2>
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Today's Challenge Card</h3>
                <p className="text-sm text-muted-foreground">Master this concept to earn bonus points</p>
              </div>
              <Badge className="bg-gradient-to-r from-orange-400 to-pink-500 text-white border-none">
                Challenge
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Define the principle of conservation of momentum and provide an example.</p>
            <Button className="w-full">Accept Challenge</Button>
          </CardContent>
        </Card>
      </div>

      {/* Motivational Quote (shows every 10 cards) */}
      {(currentCardIndex + 1) % 5 === 0 && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-8 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg border border-indigo-100 text-center"
        >
          <Smile className="h-5 w-5 text-indigo-500 mx-auto mb-2" />
          <blockquote className="text-indigo-700 italic">
            "The more you learn, the more you realize how much you don't know. And that's the exciting part."
          </blockquote>
          <p className="text-sm text-indigo-500 mt-1">Keep going! You're doing great!</p>
        </motion.div>
      )}
    </div>
  );
};

export default InteractiveFlashcardBrowser;
