
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { 
  ArrowLeft, ArrowRight, RotateCw, CheckCircle, XCircle, 
  Bookmark, BookmarkPlus, Save, Dices, Calculator, Mic, Brain, 
  Volume2, ThumbsUp, ThumbsDown, Clock, Pencil, Star, 
  FileText, BookOpen, CircleCheck
} from "lucide-react";
import { motion, AnimatePresence } from 'framer-motion';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';

interface FlashcardData {
  id: string;
  question: string;
  answer: string;
  subject: string;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
  questionType: 'text' | 'image' | 'video' | 'audio';
  tags: string[];
  explanation?: string;
  hint?: string;
}

const FlashcardInteractive = () => {
  const { flashcardId } = useParams<{ flashcardId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [cards, setCards] = useState<FlashcardData[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [userResponses, setUserResponses] = useState<Record<string, boolean>>({});
  const [userAnswer, setUserAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [accuracyScore, setAccuracyScore] = useState<number | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [studyTime, setStudyTime] = useState(0);
  const [speechToTextActive, setSpeechToTextActive] = useState(false);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState("type");
  const [showHint, setShowHint] = useState(false);
  const [masteryScore, setMasteryScore] = useState(68);
  const [streak, setStreak] = useState(3);

  // Enhanced UI states
  const [showExplanation, setShowExplanation] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const [studyMode, setStudyMode] = useState<'standard' | 'exam' | 'challenge'>('standard');
  
  useEffect(() => {
    // Mock data - in a real app this would come from an API call
    const fetchFlashcards = async () => {
      try {
        // Simulate API call
        setTimeout(() => {
          const mockCards: FlashcardData[] = [
            {
              id: '1',
              question: "What is Newton\'s Third Law of Motion?",
              answer: 'For every action, there is an equal and opposite reaction.',
              explanation: 'This fundamental principle describes the mutual interaction between two objects. When one object exerts a force on another, the second object simultaneously exerts a force of equal magnitude but opposite direction back on the first object.',
              subject: 'Physics',
              topic: 'Classical Mechanics',
              difficulty: 'medium',
              questionType: 'text',
              tags: ['Newton', 'Laws of Motion', 'Physics'],
              hint: 'Think about what happens when you push against a wall.'
            },
            {
              id: '2',
              question: 'What is the chemical formula for water?',
              answer: 'H₂O',
              explanation: 'Water molecules consist of two hydrogen atoms bonded to one oxygen atom. The hydrogen atoms are attached to the oxygen atom by covalent bonds.',
              subject: 'Chemistry',
              topic: 'Chemical Formulas',
              difficulty: 'easy',
              questionType: 'text',
              tags: ['Chemistry', 'Formulas', 'Elements'],
              hint: 'It contains hydrogen and oxygen atoms.'
            },
            {
              id: '3',
              question: 'What is the Pythagorean theorem?',
              answer: 'In a right-angled triangle, the square of the length of the hypotenuse equals the sum of squares of the other two sides (a² + b² = c²).',
              explanation: 'This theorem is fundamental to geometry and has numerous applications in architecture, engineering, and various areas of mathematics.',
              subject: 'Mathematics',
              topic: 'Geometry',
              difficulty: 'medium',
              questionType: 'text',
              tags: ['Math', 'Geometry', 'Triangles'],
              hint: 'It relates to right-angled triangles and their sides.'
            },
            {
              id: '4',
              question: 'What is photosynthesis?',
              answer: 'The process by which green plants and some other organisms use sunlight to synthesize nutrients from carbon dioxide and water.',
              explanation: 'During photosynthesis, plants use light energy, usually from the sun, to convert carbon dioxide and water into glucose and oxygen. This process is vital for maintaining Earth\'s oxygen levels.',
              subject: 'Biology',
              topic: 'Cell Biology',
              difficulty: 'hard',
              questionType: 'text',
              tags: ['Biology', 'Plants', 'Energy'],
              hint: 'It\'s how plants make their food using sunlight.'
            },
            {
              id: '5',
              question: 'Who wrote "Romeo and Juliet"?',
              answer: 'William Shakespeare',
              explanation: 'William Shakespeare wrote this tragedy about two young lovers whose deaths ultimately reconcile their feuding families. It was written early in his career, between 1591-1595.',
              subject: 'Literature',
              topic: 'Classic Literature',
              difficulty: 'easy',
              questionType: 'text',
              tags: ['Literature', 'Shakespeare', 'Plays'],
              hint: 'He is often referred to as the "Bard of Avon".'
            },
          ];
          setCards(mockCards);
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching flashcards:', error);
        toast({
          title: "Failed to load flashcards",
          description: "Please try again later",
          variant: "destructive",
        });
        setIsLoading(false);
      }
    };

    fetchFlashcards();
    
    // Timer for study time tracking
    const timer = setInterval(() => {
      setStudyTime(prev => prev + 1);
    }, 1000);
    
    return () => clearInterval(timer);
  }, [flashcardId, toast]);

  // Format study time for display
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    if (!isFlipped) {
      // When revealing the answer, show explanation button
      setShowExplanation(false);
    }
  };

  const submitAnswer = () => {
    if (userAnswer.trim() === '') return;
    
    setIsSubmitted(true);
    
    // Enhanced accuracy calculation with better NLP-like comparison
    const answerWords = cards[currentIndex].answer.toLowerCase().split(/\s+/).filter(word => word.length > 2);
    const userWords = userAnswer.toLowerCase().split(/\s+/).filter(word => word.length > 2);
    
    // Calculate matches using a more sophisticated approach
    let matchScore = 0;
    answerWords.forEach(word => {
      if (userWords.some(userWord => 
        userWord.includes(word) || word.includes(userWord) || 
        levenshteinDistance(word, userWord) <= 2
      )) {
        matchScore++;
      }
    });
    
    const accuracy = Math.min(100, Math.round((matchScore / Math.max(1, answerWords.length)) * 100));
    setAccuracyScore(accuracy);
    
    // Update user responses
    setUserResponses(prev => ({
      ...prev,
      [cards[currentIndex].id]: accuracy > 60,
    }));
    
    // Set feedback message based on accuracy
    if (accuracy > 90) {
      setFeedbackMessage("Excellent! Your answer is spot on!");
      setMasteryScore(prev => Math.min(100, prev + 3));
    } else if (accuracy > 70) {
      setFeedbackMessage("Good job! Your understanding is solid.");
      setMasteryScore(prev => Math.min(100, prev + 2));
    } else if (accuracy > 50) {
      setFeedbackMessage("Getting there! You've grasped the main concept.");
      setMasteryScore(prev => Math.min(100, prev + 1));
    } else {
      setFeedbackMessage("Keep practicing! Review the answer carefully.");
      setMasteryScore(prev => Math.max(0, prev - 1));
    }
    
    // Show toast with result
    toast({
      title: accuracy > 70 ? "Great job!" : "Keep practicing!",
      description: `Your answer was ${accuracy}% accurate.`,
      variant: accuracy > 70 ? "default" : "destructive",
    });
  };
  
  // Simple Levenshtein distance implementation for better word comparison
  const levenshteinDistance = (str1: string, str2: string): number => {
    const track = Array(str2.length + 1).fill(null).map(() => 
      Array(str1.length + 1).fill(null));
    
    for (let i = 0; i <= str1.length; i += 1) {
      track[0][i] = i;
    }
    
    for (let j = 0; j <= str2.length; j += 1) {
      track[j][0] = j;
    }
    
    for (let j = 1; j <= str2.length; j += 1) {
      for (let i = 1; i <= str1.length; i += 1) {
        const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
        track[j][i] = Math.min(
          track[j][i - 1] + 1, // deletion
          track[j - 1][i] + 1, // insertion
          track[j - 1][i - 1] + indicator, // substitution
        );
      }
    }
    
    return track[str2.length][str1.length];
  };

  const handleResponse = (knew: boolean) => {
    setUserResponses(prev => ({
      ...prev,
      [cards[currentIndex].id]: knew,
    }));
    
    if (knew) {
      setMasteryScore(prev => Math.min(100, prev + 2));
      setStreak(prev => prev + 1);
    } else {
      setMasteryScore(prev => Math.max(0, prev - 1));
      setStreak(1);
    }
    
    // Move to next card
    if (currentIndex < cards.length - 1) {
      moveToNextCard();
    } else {
      // End of deck
      toast({
        title: "Deck completed!",
        description: "Moving to results page",
      });
      
      // In a real app, you would save the results and navigate to a results page
      setTimeout(() => {
        navigate(`/dashboard/student/flashcards/${flashcardId}/results`);
      }, 1500);
    }
  };

  const moveToNextCard = () => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      resetCardState();
    } else {
      // Show completion message
      toast({
        title: "Completed all cards!",
        description: `You've reached the end of this deck. Your mastery score: ${masteryScore}%`,
        duration: 5000,
      });
    }
  };

  const moveToPreviousCard = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      resetCardState();
    }
  };

  const resetCardState = () => {
    setIsFlipped(false);
    setUserAnswer("");
    setIsSubmitted(false);
    setAccuracyScore(null);
    setSpeechToTextActive(false);
    setShowHint(false);
    setShowExplanation(false);
    setFeedbackMessage(null);
  };

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    toast({
      title: !isBookmarked ? "Flashcard bookmarked" : "Bookmark removed",
      description: !isBookmarked 
        ? "You can find this card in your bookmarks section." 
        : "Card removed from your bookmarks.",
    });
  };

  const retryCard = () => {
    setIsSubmitted(false);
    setUserAnswer("");
    setAccuracyScore(null);
    setFeedbackMessage(null);
  };

  const toggleSpeechToText = () => {
    setSpeechToTextActive(!speechToTextActive);
    if (!speechToTextActive) {
      toast({
        title: "Speech recognition activated",
        description: "Start speaking to convert your speech to text",
      });
      // Simulating speech-to-text functionality
      setTimeout(() => {
        if (cards[currentIndex].subject === 'Physics') {
          setUserAnswer(prev => prev + " Force equals mass times acceleration");
        } else if (cards[currentIndex].subject === 'Chemistry') {
          setUserAnswer(prev => prev + " H₂O is water");
        } else {
          setUserAnswer(prev => prev + " Speaking my answer...");
        }
      }, 2000);
    }
  };

  const toggleCalculator = () => {
    setIsCalculatorOpen(!isCalculatorOpen);
  };

  // Insert mathematical symbols into answer
  const insertMathSymbol = (symbol: string) => {
    setUserAnswer(prev => prev + symbol);
  };

  const addVoiceRead = () => {
    toast({
      title: "Reading aloud",
      description: "The question is being read aloud",
    });
    // In a real app, this would trigger text-to-speech
  };

  const toggleHint = () => {
    setShowHint(!showHint);
    if (!showHint && !isFlipped) {
      toast({
        title: "Hint revealed",
        description: "Try to answer before seeing the full solution",
      });
    }
  };

  const toggleExplanation = () => {
    setShowExplanation(!showExplanation);
  };
  
  const goToRandomCard = () => {
    // Ensure we don't pick the current card
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * cards.length);
    } while (newIndex === currentIndex && cards.length > 1);
    
    setCurrentIndex(newIndex);
    resetCardState();
    
    toast({
      title: "Random card selected",
      description: `Card ${newIndex + 1} of ${cards.length}`,
    });
  };
  
  const changeStudyMode = (mode: 'standard' | 'exam' | 'challenge') => {
    setStudyMode(mode);
    
    toast({
      title: `${mode.charAt(0).toUpperCase() + mode.slice(1)} mode activated`,
      description: mode === 'standard' ? "Take your time to learn" : 
                   mode === 'exam' ? "Test your knowledge under exam conditions" :
                   "Push your limits with challenging questions",
    });
    
    // Reset the current card when changing modes
    resetCardState();
  };

  if (isLoading) {
    return (
      <SharedPageLayout title="Loading Flashcards..." subtitle="Please wait while we prepare your study session">
        <div className="flex items-center justify-center h-96">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            <p className="mt-4 text-muted-foreground">Loading your flashcards...</p>
          </div>
        </div>
      </SharedPageLayout>
    );
  }

  if (cards.length === 0) {
    return (
      <SharedPageLayout title="No Flashcards Found" subtitle="We couldn't find any flashcards for this deck">
        <div className="text-center py-12">
          <div className="mb-6 text-muted-foreground">
            <BookOpen className="h-16 w-16 mx-auto mb-4 opacity-30" />
            <p>No flashcards found in this deck</p>
          </div>
          <Button onClick={() => navigate('/dashboard/student/flashcards')}>
            Return to Flashcards
          </Button>
        </div>
      </SharedPageLayout>
    );
  }

  const currentCard = cards[currentIndex];
  const progress = ((currentIndex + 1) / cards.length) * 100;

  return (
    <SharedPageLayout
      title="Interactive Flashcards"
      subtitle={`${currentCard.subject}: ${currentCard.topic}`}
    >
      <div className="mb-6">
        <Button 
          variant="outline" 
          onClick={() => navigate('/dashboard/student/flashcards')}
          className="flex items-center gap-1"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Flashcards
        </Button>
      </div>
      
      {/* Study mode selector */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          <Button 
            variant={studyMode === 'standard' ? "default" : "outline"}
            size="sm"
            onClick={() => changeStudyMode('standard')}
            className="flex items-center gap-1"
          >
            <BookOpen className="h-4 w-4" />
            Standard Mode
          </Button>
          <Button 
            variant={studyMode === 'exam' ? "default" : "outline"}
            size="sm"
            onClick={() => changeStudyMode('exam')}
            className="flex items-center gap-1"
          >
            <FileText className="h-4 w-4" />
            Exam Mode
          </Button>
          <Button 
            variant={studyMode === 'challenge' ? "default" : "outline"}
            size="sm"
            onClick={() => changeStudyMode('challenge')}
            className="flex items-center gap-1"
          >
            <Star className="h-4 w-4" />
            Challenge Mode
          </Button>
        </div>
      </div>
      
      {/* Progress indicator with enhanced design */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">
              Card {currentIndex + 1} of {cards.length}
            </span>
            <Badge variant={
              currentCard.difficulty === 'easy' ? "outline" : 
              currentCard.difficulty === 'medium' ? "secondary" : "destructive"
            } className="ml-2">
              {currentCard.difficulty.charAt(0).toUpperCase() + currentCard.difficulty.slice(1)}
            </Badge>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="h-4 w-4 mr-1" />
              {formatTime(studyTime)}
            </div>
            <span className="text-sm font-medium">{Math.round(progress)}% Complete</span>
          </div>
        </div>
        <Progress value={progress} className="h-2" />
      </div>
      
      {/* Main content area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {/* Enhanced Flashcard with animations */}
          <div className="perspective-1000">
            <div 
              className={`relative transition-all duration-500 transform-style-3d cursor-pointer min-h-[400px] ${isFlipped ? 'rotate-y-180' : ''}`}
              onClick={handleFlip}
            >
              {/* Front of card - Question */}
              <Card className={`absolute inset-0 backface-hidden p-6 ${isFlipped ? 'hidden' : ''} ${studyMode === 'challenge' ? 'border-amber-500' : ''}`}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">Question</CardTitle>
                    <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0">
                      {currentCard.topic}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center h-full pt-0">
                  <div className="text-2xl font-semibold text-center mb-8">
                    {currentCard.question}
                  </div>
                  
                  {showHint && currentCard.hint && (
                    <div className="w-full bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md border border-blue-100 dark:border-blue-800 mb-6">
                      <p className="text-blue-700 dark:text-blue-300 text-sm">
                        <span className="font-semibold">Hint:</span> {currentCard.hint}
                      </p>
                    </div>
                  )}
                  
                  <div className="flex gap-2 mt-auto">
                    {currentCard.hint && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleHint();
                        }}
                        className="text-xs"
                      >
                        {showHint ? "Hide Hint" : "Show Hint"}
                      </Button>
                    )}
                  </div>
                  
                  <p className="text-sm text-muted-foreground mt-4 animate-pulse">
                    Tap to flip
                  </p>
                </CardContent>
              </Card>
              
              {/* Back of card - Answer */}
              <Card className={`absolute inset-0 backface-hidden p-6 rotate-y-180 ${!isFlipped ? 'hidden' : ''} ${studyMode === 'challenge' ? 'border-amber-500' : ''}`}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">Answer</CardTitle>
                    <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0">
                      Solution
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="flex flex-col h-full pt-0">
                  <div className="text-xl text-center my-6 bg-green-50 dark:bg-green-900/20 p-4 rounded-md border border-green-100 dark:border-green-800">
                    {currentCard.answer}
                  </div>
                  
                  {showExplanation && currentCard.explanation && (
                    <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-md border border-amber-100 dark:border-amber-800 mb-6">
                      <p className="text-amber-800 dark:text-amber-300 text-sm">
                        <span className="font-semibold">Explanation:</span> {currentCard.explanation}
                      </p>
                    </div>
                  )}
                  
                  <div className="flex justify-center mt-auto">
                    {currentCard.explanation && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleExplanation();
                        }}
                        className="text-xs"
                      >
                        {showExplanation ? "Hide Explanation" : "Show Explanation"}
                      </Button>
                    )}
                  </div>
                  
                  <p className="text-sm text-muted-foreground mt-4 text-center animate-pulse">
                    Tap to flip back
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Feedback message display */}
          {feedbackMessage && (
            <div className={`mt-4 p-3 rounded-md ${
              accuracyScore && accuracyScore > 70 ? "bg-green-50 border border-green-200 text-green-700 dark:bg-green-900/20 dark:text-green-300" : 
              accuracyScore && accuracyScore > 50 ? "bg-amber-50 border border-amber-200 text-amber-700 dark:bg-amber-900/20 dark:text-amber-300" : 
              "bg-red-50 border border-red-200 text-red-700 dark:bg-red-900/20 dark:text-red-300"
            }`}>
              <p>{feedbackMessage}</p>
            </div>
          )}
          
          {/* Answer input area */}
          <div className="mt-6">
            <Tabs value={selectedTab} onValueChange={setSelectedTab}>
              <TabsList className="w-full justify-start mb-4">
                <TabsTrigger value="type">Type Answer</TabsTrigger>
                <TabsTrigger value="speak">Speak Answer</TabsTrigger>
                <TabsTrigger value="math">Math Tools</TabsTrigger>
              </TabsList>
              
              <TabsContent value="type" className="mt-0">
                <Textarea
                  placeholder="Type your answer here..."
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  disabled={isSubmitted}
                  className="min-h-[120px]"
                />
              </TabsContent>
              
              <TabsContent value="speak" className="mt-0">
                <div className="bg-muted/30 rounded-lg p-6 text-center">
                  <Button
                    variant={speechToTextActive ? "destructive" : "default"}
                    className="mx-auto mb-3"
                    onClick={toggleSpeechToText}
                  >
                    <Mic className="mr-2 h-4 w-4" />
                    {speechToTextActive ? "Stop Recording" : "Start Speaking"}
                  </Button>
                  <p className="text-sm text-muted-foreground">
                    {speechToTextActive
                      ? "Listening... Speak your answer clearly."
                      : "Click the button and start speaking to convert your speech to text."}
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="math" className="mt-0">
                <div className="bg-muted/30 rounded-lg p-6 text-center">
                  <Button variant="outline" className="mx-auto mb-3" onClick={toggleCalculator}>
                    <Calculator className="mr-2 h-4 w-4" />
                    Open Calculator
                  </Button>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4">
                    {["x²", "√", "π", "÷", "∫", "Σ", "∞", "θ"].map((symbol) => (
                      <Button
                        key={symbol}
                        variant="outline"
                        size="sm"
                        onClick={() => insertMathSymbol(symbol)}
                      >
                        {symbol}
                      </Button>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
            
            <div className="mt-4 flex flex-wrap gap-3">
              {!isSubmitted ? (
                <>
                  <Button onClick={submitAnswer} disabled={userAnswer.trim() === ""}>
                    Submit Answer
                  </Button>
                  <Button variant="outline" onClick={handleFlip}>
                    <RotateCw className="mr-2 h-4 w-4" />
                    Flip Card
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="outline" onClick={retryCard}>
                    <RotateCw className="mr-2 h-4 w-4" />
                    Try Again
                  </Button>
                  <Button onClick={moveToNextCard} disabled={currentIndex === cards.length - 1}>
                    Next Card
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </>
              )}
            </div>
          </div>
          
          {/* Navigation controls with enhanced design */}
          <div className="flex justify-between items-center mt-6">
            <Button 
              variant="outline" 
              onClick={moveToPreviousCard}
              disabled={currentIndex === 0}
              size="sm"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>
            
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={goToRandomCard}
              >
                <Dices className="h-4 w-4 mr-1" />
                Random Card
              </Button>
              
              <Button 
                variant="outline" 
                size="sm"
                className="flex items-center"
                onClick={toggleBookmark}
              >
                {isBookmarked ? 
                  <Bookmark className="h-4 w-4 mr-1 text-yellow-500 fill-yellow-500" /> : 
                  <BookmarkPlus className="h-4 w-4 mr-1" />
                }
                {isBookmarked ? "Bookmarked" : "Bookmark"}
              </Button>
            </div>
            
            <Button 
              onClick={moveToNextCard}
              disabled={currentIndex === cards.length - 1}
              size="sm"
            >
              Next
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
        
        {/* Sidebar */}
        <div className="space-y-6">
          {/* Enhanced mastery tracker with visual improvements */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Star className="h-5 w-5 text-yellow-500 mr-2" />
                Mastery Progress
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="flex flex-col items-center">
                <div className="relative h-32 w-32">
                  <svg className="h-full w-full" viewBox="0 0 100 100">
                    <circle
                      className="text-muted-foreground/20 stroke-current"
                      strokeWidth="10"
                      cx="50"
                      cy="50"
                      r="40"
                      fill="transparent"
                    />
                    <circle
                      className={`stroke-current ${
                        masteryScore > 80 ? "text-green-500" : 
                        masteryScore > 60 ? "text-blue-500" : 
                        masteryScore > 40 ? "text-amber-500" : "text-red-500"
                      }`}
                      strokeWidth="10"
                      strokeLinecap="round"
                      cx="50"
                      cy="50"
                      r="40"
                      fill="transparent"
                      strokeDasharray={`${masteryScore * 2.51} 251`}
                      strokeDashoffset="0"
                      transform="rotate(-90 50 50)"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold">{masteryScore}%</span>
                  </div>
                </div>
                
                <div className="text-center mt-4">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <div className="flex">
                      {[1, 2, 3].map(i => (
                        <div 
                          key={i} 
                          className={`h-5 w-5 flex items-center justify-center ${
                            streak >= i ? "text-yellow-500" : "text-gray-300"
                          }`}
                        >
                          <Star className="h-4 w-4" fill={streak >= i ? "currentColor" : "none"} />
                        </div>
                      ))}
                    </div>
                    <span className="text-sm ml-1">Streak: {streak} days</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {masteryScore > 80 ? 'Almost mastered!' : masteryScore > 50 ? 'Good progress!' : 'Keep practicing!'}
                  </p>
                </div>
              </div>
              
              <div className="mt-4 grid grid-cols-2 gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleResponse(true)}
                  className="flex items-center text-green-600"
                >
                  <CheckCircle className="h-4 w-4 mr-1" />
                  I Know This
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleResponse(false)}
                  className="flex items-center text-amber-600"
                >
                  <XCircle className="h-4 w-4 mr-1" />
                  Still Learning
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Accuracy score (shows after submission) */}
          {isSubmitted && accuracyScore !== null && (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Answer Accuracy</CardTitle>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="flex justify-between mb-1 text-sm">
                  <span>Score</span>
                  <span>{accuracyScore}%</span>
                </div>
                <Progress 
                  value={accuracyScore} 
                  className={`h-2 mb-4 ${
                    accuracyScore > 70 ? "bg-green-500" : 
                    accuracyScore > 40 ? "bg-amber-500" : "bg-red-500"
                  }`}
                />
                
                <div className="flex justify-center space-x-4 mt-4">
                  <Button variant="outline" size="sm" className="flex items-center">
                    <ThumbsUp className="mr-2 h-4 w-4" />
                    Good Recall
                  </Button>
                  <Button variant="outline" size="sm" className="flex items-center">
                    <ThumbsDown className="mr-2 h-4 w-4" />
                    Need Practice
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
          
          {/* Tags */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Tags</CardTitle>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="flex flex-wrap gap-2">
                {currentCard.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary">{tag}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Study stats */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Study Statistics</CardTitle>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Recall Accuracy</span>
                    <span>78%</span>
                  </div>
                  <Progress value={78} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Cards Practiced</span>
                    <span>{currentIndex + 1}/{cards.length}</span>
                  </div>
                  <Progress value={(currentIndex + 1) / cards.length * 100} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Study Streak</span>
                    <span>{streak} days</span>
                  </div>
                  <Progress value={streak * 10} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Related resources */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Related Resources</CardTitle>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="space-y-2">
                <Button 
                  variant="outline" 
                  className="w-full justify-start text-left"
                  onClick={() => navigate(`/dashboard/student/concepts/card/1`)}
                >
                  <Brain className="mr-2 h-4 w-4" />
                  {currentCard.topic} Concept Cards
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start text-left"
                  onClick={() => navigate(`/dashboard/student/practice-exam/1/start`)}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Practice Quiz: {currentCard.subject}
                </Button>
              </div>
              <Button variant="outline" className="w-full mt-4">
                <Save className="mr-2 h-4 w-4" />
                Save Study Session
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Daily Challenge Card */}
      <div className="mt-8 mb-4">
        <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/50 dark:to-purple-950/50 border-indigo-100 dark:border-indigo-800">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Star className="h-5 w-5 text-yellow-500 mr-2" fill="currentColor" />
              Today's Challenge Card
            </CardTitle>
          </CardHeader>
          <CardContent className="pb-2">
            <p className="mb-2">Solve this challenging question to earn bonus points!</p>
            <div className="p-4 bg-white/80 dark:bg-gray-800/80 rounded-md">
              <p className="font-medium">Explain the differences between Newton's three laws of motion and provide a real-world example of each.</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600">
              Accept Challenge
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </SharedPageLayout>
  );
};

export default FlashcardInteractive;
