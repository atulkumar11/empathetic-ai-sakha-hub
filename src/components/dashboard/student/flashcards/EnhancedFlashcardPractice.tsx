
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";
import {
  ArrowLeft, ArrowRight, RotateCw, Check, X, Bookmark, BookmarkPlus, Save,
  Calculator, Mic, Brain, Volume2, ThumbsUp, ThumbsDown, Clock, Pencil,
  Star, RefreshCw, CheckCircle, XCircle, Flag, List, Image, Video, AudioLines
} from "lucide-react";

// Types
interface FlashcardData {
  id: string;
  question: string;
  answer: string;
  subject: string;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
  questionType: 'text' | 'image' | 'video' | 'audio';
  answerType: 'text' | 'math';
  tags: string[];
  imageUrl?: string;
  videoUrl?: string;
  audioUrl?: string;
  explanation?: string;
  relatedConceptId?: string;
  relatedConceptName?: string;
}

interface AttemptData {
  timestamp: Date;
  accuracy: number;
  responseTime: number; // in seconds
}

interface UserNote {
  id: string;
  content: string;
  timestamp: Date;
}

const EnhancedFlashcardPractice: React.FC = () => {
  const { deckId } = useParams<{ deckId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // State variables
  const [cards, setCards] = useState<FlashcardData[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [answerSubmitted, setAnswerSubmitted] = useState(false);
  const [currentAccuracy, setCurrentAccuracy] = useState<number | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [studyTime, setStudyTime] = useState(0);
  const [attemptStartTime, setAttemptStartTime] = useState<Date | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [showCalculator, setShowCalculator] = useState(false);
  const [inputMode, setInputMode] = useState<"typing" | "speech" | "math">("typing");
  const [attempts, setAttempts] = useState<Record<string, AttemptData[]>>({});
  const [bookmarkedCards, setBookmarkedCards] = useState<Set<string>>(new Set());
  const [lowRetentionCards, setLowRetentionCards] = useState<Set<string>>(new Set());
  const [userNotes, setUserNotes] = useState<Record<string, UserNote[]>>({});
  const [currentNote, setCurrentNote] = useState("");
  const [showRetentionStats, setShowRetentionStats] = useState(false);
  
  // Timer ref for cleanup
  const timerRef = useRef<number | null>(null);
  
  // Load flashcard data
  useEffect(() => {
    const fetchCards = async () => {
      setIsLoading(true);
      try {
        // In a real app, fetch from API using deckId
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
        
        // Mock data
        const mockCards: FlashcardData[] = [
          {
            id: '1',
            question: "What is Newton's Third Law of Motion?",
            answer: "For every action, there is an equal and opposite reaction.",
            explanation: "This law explains the nature of forces between two objects - when one object exerts a force on another, the second object exerts an equal and opposite force on the first.",
            subject: 'Physics',
            topic: 'Mechanics',
            difficulty: 'medium',
            questionType: 'text',
            answerType: 'text',
            tags: ['Physics', 'Mechanics', 'Newton Laws'],
            relatedConceptId: 'concept-newton-laws',
            relatedConceptName: 'Newton\'s Laws of Motion'
          },
          {
            id: '2',
            question: "Identify this circuit component:",
            answer: "Capacitor - a device that stores electrical energy in an electric field.",
            explanation: "Capacitors store energy in an electric field between two conductors, and are fundamental components in electronic circuits.",
            subject: 'Physics',
            topic: 'Electronics',
            difficulty: 'medium',
            questionType: 'image',
            answerType: 'text',
            imageUrl: 'https://placehold.co/400x300/png?text=Capacitor+Image',
            tags: ['Physics', 'Electronics', 'Components'],
            relatedConceptId: 'concept-circuit-components',
            relatedConceptName: 'Electronic Circuit Components'
          },
          {
            id: '3',
            question: "Listen to this audio clip and identify the physical phenomenon being described:",
            answer: "Doppler Effect - the change in frequency of a wave in relation to an observer moving relative to the wave source.",
            explanation: "The Doppler effect explains why the pitch of a sound changes as its source moves relative to an observer.",
            subject: 'Physics',
            topic: 'Waves',
            difficulty: 'hard',
            questionType: 'audio',
            answerType: 'text',
            audioUrl: 'https://example.com/doppler-effect.mp3',
            tags: ['Physics', 'Waves', 'Sound'],
            relatedConceptId: 'concept-wave-phenomena',
            relatedConceptName: 'Wave Phenomena'
          },
          {
            id: '4',
            question: "Calculate the derivative of f(x) = x² + 3x + 2",
            answer: "f'(x) = 2x + 3",
            explanation: "To find the derivative, apply the power rule to each term: d/dx(x²) = 2x, d/dx(3x) = 3, and d/dx(2) = 0.",
            subject: 'Mathematics',
            topic: 'Calculus',
            difficulty: 'easy',
            questionType: 'text',
            answerType: 'math',
            tags: ['Mathematics', 'Calculus', 'Derivatives'],
            relatedConceptId: 'concept-derivatives',
            relatedConceptName: 'Derivatives and Differentiation'
          },
          {
            id: '5',
            question: "Watch this video and explain the chemical reaction occurring:",
            answer: "Neutralization reaction between an acid and base forming salt and water.",
            explanation: "This is a typical acid-base reaction where H+ ions from the acid combine with OH- ions from the base to form water, while the remaining ions form a salt.",
            subject: 'Chemistry',
            topic: 'Acid-Base Reactions',
            difficulty: 'medium',
            questionType: 'video',
            answerType: 'text',
            videoUrl: 'https://example.com/neutralization.mp4',
            tags: ['Chemistry', 'Reactions', 'Acid-Base'],
            relatedConceptId: 'concept-acid-base',
            relatedConceptName: 'Acid-Base Chemistry'
          },
        ];
        
        setCards(mockCards);
        
        // Simulate some previous attempts data
        const mockAttempts: Record<string, AttemptData[]> = {
          '1': [
            { timestamp: new Date(Date.now() - 86400000), accuracy: 65, responseTime: 25 },
            { timestamp: new Date(Date.now() - 43200000), accuracy: 80, responseTime: 18 },
          ],
          '2': [
            { timestamp: new Date(Date.now() - 172800000), accuracy: 40, responseTime: 30 },
          ],
          '4': [
            { timestamp: new Date(Date.now() - 259200000), accuracy: 90, responseTime: 12 },
            { timestamp: new Date(Date.now() - 129600000), accuracy: 95, responseTime: 10 },
          ],
        };
        setAttempts(mockAttempts);
        
        // Simulate bookmarked cards
        setBookmarkedCards(new Set(['2', '4']));
        
        // Simulate low retention cards
        setLowRetentionCards(new Set(['2', '3']));
        
        // Simulate user notes
        const mockNotes: Record<string, UserNote[]> = {
          '1': [
            { id: 'note1', content: "Remember the equal and opposite forces part - this is the key concept.", timestamp: new Date(Date.now() - 43200000) }
          ],
          '4': [
            { id: 'note2', content: "Power rule: d/dx(xⁿ) = n·xⁿ⁻¹", timestamp: new Date(Date.now() - 129600000) }
          ],
        };
        setUserNotes(mockNotes);
        
      } catch (error) {
        console.error("Error fetching flashcards:", error);
        toast({
          title: "Failed to load flashcards",
          description: "Please try again later",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCards();
    
    // Start study time tracker
    setAttemptStartTime(new Date());
    const timer = window.setInterval(() => {
      setStudyTime(prev => prev + 1);
    }, 1000);
    timerRef.current = timer;
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [deckId, toast]);
  
  // Get current card
  const currentCard = cards[currentIndex] || null;
  
  // Check if current card is bookmarked
  useEffect(() => {
    if (currentCard) {
      setIsBookmarked(bookmarkedCards.has(currentCard.id));
    }
  }, [currentCard, bookmarkedCards]);
  
  // Format time for display (MM:SS)
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Calculate progress percentage
  const calculateProgress = () => {
    return ((currentIndex + 1) / cards.length) * 100;
  };
  
  // Handle card flip
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };
  
  // Handle submitting an answer
  const handleSubmitAnswer = () => {
    if (!userAnswer.trim() || !currentCard || answerSubmitted) return;
    
    // Calculate response time
    const responseTime = attemptStartTime 
      ? Math.round((new Date().getTime() - attemptStartTime.getTime()) / 1000) 
      : 0;
    
    // Calculate accuracy (AI simulation)
    const calculateAccuracy = () => {
      // Simple word matching algorithm (in a real app, use more sophisticated NLP)
      const userWords = userAnswer.toLowerCase().split(/\s+/);
      const answerWords = currentCard.answer.toLowerCase().split(/\s+/);
      
      let matchCount = 0;
      for (const word of userWords) {
        if (answerWords.some(answerWord => answerWord.includes(word) || word.includes(answerWord))) {
          matchCount++;
        }
      }
      
      const wordMatchScore = Math.min(100, Math.round((matchCount / answerWords.length) * 100));
      
      // Factor in response time (faster is better, but with diminishing returns)
      const timeFactorBase = currentCard.difficulty === 'easy' ? 15 : 
                              currentCard.difficulty === 'medium' ? 25 : 40;
      const timePenalty = Math.max(0, Math.min(20, Math.round((responseTime - timeFactorBase) / 5)));
      
      return Math.max(0, wordMatchScore - timePenalty);
    };
    
    const accuracy = calculateAccuracy();
    setCurrentAccuracy(accuracy);
    setAnswerSubmitted(true);
    
    // Store this attempt
    setAttempts(prev => {
      const cardAttempts = prev[currentCard.id] || [];
      return {
        ...prev,
        [currentCard.id]: [
          ...cardAttempts,
          { timestamp: new Date(), accuracy, responseTime }
        ]
      };
    });
    
    // Update low retention cards if needed
    if (accuracy < 60) {
      setLowRetentionCards(prev => new Set([...prev, currentCard.id]));
    } else if (lowRetentionCards.has(currentCard.id) && accuracy > 85) {
      // Remove from low retention if they've improved
      setLowRetentionCards(prev => {
        const updated = new Set([...prev]);
        updated.delete(currentCard.id);
        return updated;
      });
    }
    
    // Show feedback toast
    if (accuracy >= 85) {
      toast({
        title: "Excellent!",
        description: "Your answer is highly accurate.",
      });
    } else if (accuracy >= 60) {
      toast({
        title: "Good job!",
        description: "Your answer is mostly correct with some room for improvement.",
      });
    } else {
      toast({
        title: "Keep practicing",
        description: "Your answer needs improvement. Review the correct answer.",
        variant: "destructive",
      });
    }
  };
  
  // Handle retrying the current card
  const handleRetry = () => {
    setUserAnswer("");
    setCurrentAccuracy(null);
    setAnswerSubmitted(false);
    setIsFlipped(false);
    setAttemptStartTime(new Date());
  };
  
  // Move to next card
  const handleNextCard = () => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      resetCardState();
    } else {
      // End of deck
      showDeckSummary();
    }
  };
  
  // Move to previous card
  const handlePreviousCard = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      resetCardState();
    }
  };
  
  // Reset card state when switching cards
  const resetCardState = () => {
    setUserAnswer("");
    setCurrentAccuracy(null);
    setAnswerSubmitted(false);
    setIsFlipped(false);
    setAttemptStartTime(new Date());
  };
  
  // Toggle bookmark for current card
  const handleToggleBookmark = () => {
    if (!currentCard) return;
    
    if (isBookmarked) {
      setBookmarkedCards(prev => {
        const updated = new Set([...prev]);
        updated.delete(currentCard.id);
        return updated;
      });
      setIsBookmarked(false);
      toast({ title: "Bookmark removed" });
    } else {
      setBookmarkedCards(prev => new Set([...prev, currentCard.id]));
      setIsBookmarked(true);
      toast({ title: "Bookmark added" });
    }
  };
  
  // Handle speech recognition
  const handleStartListening = () => {
    setIsListening(true);
    
    // In a real app, use the Web Speech API
    // For this demo, simulate with a timeout
    setTimeout(() => {
      let simulatedSpeech = "";
      
      if (currentCard?.subject === 'Physics') {
        simulatedSpeech = "For every action there is an equal and opposite reaction";
      } else if (currentCard?.subject === 'Mathematics') {
        simulatedSpeech = "The derivative is 2x plus 3";
      } else if (currentCard?.subject === 'Chemistry') {
        simulatedSpeech = "Neutralization reaction between acid and base";
      } else {
        simulatedSpeech = "This is my spoken answer";
      }
      
      setUserAnswer(prev => prev + (prev ? " " : "") + simulatedSpeech);
      setIsListening(false);
      
      toast({
        title: "Speech recognized",
        description: "Your speech has been converted to text.",
      });
    }, 2000);
  };
  
  // Stop speech recognition
  const handleStopListening = () => {
    setIsListening(false);
  };
  
  // Toggle calculator
  const handleToggleCalculator = () => {
    setShowCalculator(!showCalculator);
  };
  
  // Insert math symbol into answer
  const handleInsertMathSymbol = (symbol: string) => {
    setUserAnswer(prev => prev + symbol);
  };
  
  // Save note for current card
  const handleSaveNote = () => {
    if (!currentCard || !currentNote.trim()) return;
    
    const newNote: UserNote = {
      id: `note-${Date.now()}`,
      content: currentNote,
      timestamp: new Date()
    };
    
    setUserNotes(prev => {
      const cardNotes = prev[currentCard.id] || [];
      return {
        ...prev,
        [currentCard.id]: [...cardNotes, newNote]
      };
    });
    
    setCurrentNote("");
    
    toast({
      title: "Note saved",
      description: "Your note has been saved to this flashcard."
    });
  };
  
  // Delete a note
  const handleDeleteNote = (noteId: string) => {
    if (!currentCard) return;
    
    setUserNotes(prev => {
      const cardNotes = prev[currentCard.id] || [];
      return {
        ...prev,
        [currentCard.id]: cardNotes.filter(note => note.id !== noteId)
      };
    });
    
    toast({
      title: "Note deleted",
      description: "Your note has been removed."
    });
  };
  
  // Calculate retention score (0-100) based on attempt history
  const calculateRetentionScore = (cardId: string): number => {
    const cardAttempts = attempts[cardId] || [];
    if (cardAttempts.length === 0) return 0;
    
    // Weight recent attempts more heavily
    const weightedScores = cardAttempts.map((attempt, index) => {
      const recencyWeight = 1 + (index / cardAttempts.length);
      return attempt.accuracy * recencyWeight;
    });
    
    const totalWeightedScore = weightedScores.reduce((sum, score) => sum + score, 0);
    return Math.min(100, Math.round(totalWeightedScore / (cardAttempts.length * 1.5)));
  };
  
  // Check if retention is improving or declining
  const getRetentionTrend = (cardId: string): 'improving' | 'declining' | 'stable' => {
    const cardAttempts = attempts[cardId] || [];
    if (cardAttempts.length < 2) return 'stable';
    
    const recentAttempts = cardAttempts.slice(-2);
    const diff = recentAttempts[1].accuracy - recentAttempts[0].accuracy;
    
    if (diff >= 10) return 'improving';
    if (diff <= -10) return 'declining';
    return 'stable';
  };
  
  // Calculate when to next review card based on spaced repetition algorithm
  const calculateNextReviewDate = (cardId: string): Date => {
    // Simple spaced repetition algorithm
    // For a real app, use something like SM-2 algorithm
    const cardAttempts = attempts[cardId] || [];
    const now = new Date();
    
    if (cardAttempts.length === 0) {
      return now; // Review immediately if never attempted
    }
    
    const latestAttempt = cardAttempts[cardAttempts.length - 1];
    const accuracy = latestAttempt.accuracy;
    
    let daysToAdd = 0;
    if (accuracy >= 90) daysToAdd = 7; // Review in a week
    else if (accuracy >= 70) daysToAdd = 3; // Review in 3 days
    else if (accuracy >= 50) daysToAdd = 1; // Review tomorrow
    else daysToAdd = 0; // Review today
    
    const nextDate = new Date(now);
    nextDate.setDate(nextDate.getDate() + daysToAdd);
    return nextDate;
  };
  
  // Show deck summary when finished
  const showDeckSummary = () => {
    // Calculate overall stats
    let totalAccuracy = 0;
    let attemptCount = 0;
    let lowRetentionCount = 0;
    
    // In a real app, process all attempts
    Object.values(attempts).forEach(cardAttempts => {
      cardAttempts.forEach(attempt => {
        totalAccuracy += attempt.accuracy;
        attemptCount++;
      });
    });
    
    const averageAccuracy = attemptCount > 0 ? Math.round(totalAccuracy / attemptCount) : 0;
    lowRetentionCount = lowRetentionCards.size;
    
    toast({
      title: "Deck Complete",
      description: `Average Accuracy: ${averageAccuracy}% · Low Retention Cards: ${lowRetentionCount}`,
      duration: 5000,
    });
    
    // In a real app, navigate to a summary page
    setTimeout(() => {
      navigate('/dashboard/student/flashcards');
    }, 3000);
  };
  
  // Render math expression with proper formatting
  const renderMathExpression = (expression: string) => {
    // In a real app, use a math rendering library like KaTeX or MathJax
    // For this demo, just render the text
    return <span className="font-mono">{expression}</span>;
  };
  
  // Get suggested related cards
  const getSuggestedRelatedCards = () => {
    // In a real app, implement AI-based suggestions based on:
    // - Topic similarity
    // - User performance patterns
    // - Learning path
    
    // For this demo, return static suggestions
    return cards
      .filter(card => card.id !== currentCard?.id)
      .slice(0, 2)
      .map(card => ({
        id: card.id,
        title: card.question.slice(0, 60) + (card.question.length > 60 ? "..." : ""),
        subject: card.subject,
        topic: card.topic
      }));
  };
  
  // Loading state
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }
  
  // Empty state
  if (cards.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">No flashcards found</h2>
          <Button onClick={() => navigate('/dashboard/student/flashcards')}>
            Back to Flashcards
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8 pb-32 md:pb-8 max-w-7xl">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <Button variant="outline" onClick={() => navigate('/dashboard/student/flashcards')} className="mb-2">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Flashcards
          </Button>
          <h1 className="text-2xl sm:text-3xl font-bold">
            {currentCard?.subject} Flashcards
          </h1>
          <div className="flex flex-wrap items-center gap-2 mt-2">
            <Badge variant="secondary">{currentCard?.topic}</Badge>
            <Badge variant={
              currentCard?.difficulty === 'easy' ? "outline" : 
              currentCard?.difficulty === 'medium' ? "secondary" : "destructive"
            }>
              {currentCard?.difficulty.charAt(0).toUpperCase() + currentCard?.difficulty.slice(1)}
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
            onClick={handleToggleBookmark}
            className={isBookmarked ? "text-yellow-500 border-yellow-200" : ""}
          >
            {isBookmarked ? <Bookmark className="fill-yellow-500" /> : <BookmarkPlus />}
          </Button>
          <Button variant="outline" size="icon" onClick={handleToggleCalculator}>
            <Calculator />
          </Button>
        </div>
      </div>
      
      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm mb-1">
          <span>Card {currentIndex + 1} of {cards.length}</span>
          <span>{Math.round(calculateProgress())}% Complete</span>
        </div>
        <Progress value={calculateProgress()} className="h-2" />
      </div>
      
      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main flashcard column */}
        <div className="lg:col-span-2">
          {/* Flashcard */}
          <div className="relative min-h-[320px] perspective mb-6">
            <div
              className={`transition-all duration-500 transform-style-3d cursor-pointer ${
                isFlipped ? "rotate-y-180" : ""
              }`}
              onClick={handleFlip}
            >
              {/* Front of card (Question) */}
              <Card 
                className={`absolute inset-0 backface-hidden p-6 ${isFlipped ? "invisible" : ""}`}
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">Question</Badge>
                      {currentCard?.questionType === 'text' && (
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                          <List className="h-3 w-3 mr-1" /> Text
                        </Badge>
                      )}
                      {currentCard?.questionType === 'image' && (
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          <Image className="h-3 w-3 mr-1" /> Image
                        </Badge>
                      )}
                      {currentCard?.questionType === 'video' && (
                        <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                          <Video className="h-3 w-3 mr-1" /> Video
                        </Badge>
                      )}
                      {currentCard?.questionType === 'audio' && (
                        <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                          <AudioLines className="h-3 w-3 mr-1" /> Audio
                        </Badge>
                      )}
                    </div>
                    <Badge variant="default" className="cursor-pointer" onClick={(e) => {
                      e.stopPropagation();
                      toast({ title: "Text-to-speech activated" });
                    }}>
                      <Volume2 className="h-4 w-4 mr-1" /> Listen
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="flex flex-col items-center justify-center min-h-[240px]">
                  {/* Question content based on type */}
                  {currentCard?.questionType === 'text' && (
                    <div className="prose max-w-none dark:prose-invert">
                      <p className="text-xl font-medium text-center">{currentCard.question}</p>
                    </div>
                  )}
                  
                  {currentCard?.questionType === 'image' && (
                    <div className="flex flex-col items-center w-full">
                      <p className="text-lg font-medium mb-4">{currentCard?.question}</p>
                      <img 
                        src={currentCard?.imageUrl} 
                        alt="Question visual" 
                        className="max-h-48 object-contain rounded-md border border-muted mb-4"
                      />
                    </div>
                  )}
                  
                  {currentCard?.questionType === 'video' && (
                    <div className="flex flex-col items-center w-full">
                      <p className="text-lg font-medium mb-4">{currentCard?.question}</p>
                      <div className="w-full max-w-md bg-slate-100 dark:bg-slate-800 rounded-md flex items-center justify-center h-48 mb-4">
                        <Video className="h-12 w-12 text-muted-foreground" />
                        <span className="ml-2 text-muted-foreground">Video unavailable in demo</span>
                      </div>
                    </div>
                  )}
                  
                  {currentCard?.questionType === 'audio' && (
                    <div className="flex flex-col items-center w-full">
                      <p className="text-lg font-medium mb-4">{currentCard?.question}</p>
                      <div className="w-full max-w-md bg-slate-100 dark:bg-slate-800 rounded-md flex items-center justify-center h-24 mb-4">
                        <AudioLines className="h-8 w-8 text-muted-foreground" />
                        <span className="ml-2 text-muted-foreground">Audio unavailable in demo</span>
                      </div>
                    </div>
                  )}
                  
                  <p className="text-sm text-muted-foreground animate-pulse mt-auto">
                    Tap to flip
                  </p>
                </CardContent>
              </Card>
              
              {/* Back of card (Answer) */}
              <Card 
                className={`absolute inset-0 backface-hidden p-6 rotate-y-180 ${!isFlipped ? "invisible" : ""}`}
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <Badge variant="secondary">Answer</Badge>
                    <Badge
                      variant={currentCard?.answerType === 'math' ? 'outline' : 'default'}
                      className={currentCard?.answerType === 'math' ? 'bg-indigo-50 text-indigo-700 border-indigo-200' : ''}
                    >
                      {currentCard?.answerType === 'math' ? 'Math' : 'Text'}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="flex flex-col items-center justify-center min-h-[240px]">
                  <div className="prose max-w-none dark:prose-invert">
                    {currentCard?.answerType === 'math' ? (
                      <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-md">
                        {renderMathExpression(currentCard.answer)}
                      </div>
                    ) : (
                      <p className="text-lg">{currentCard?.answer}</p>
                    )}
                    
                    {currentCard?.explanation && (
                      <div className="mt-6">
                        <h4 className="text-sm font-semibold text-muted-foreground mb-2">Explanation:</h4>
                        <p className="text-sm bg-muted/50 p-3 rounded-md">{currentCard.explanation}</p>
                      </div>
                    )}
                  </div>
                  
                  <p className="text-sm text-muted-foreground animate-pulse mt-auto">
                    Tap to flip back
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Answer input */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">Your Answer</CardTitle>
                <Tabs 
                  value={inputMode} 
                  onValueChange={(value) => setInputMode(value as "typing" | "speech" | "math")}
                >
                  <TabsList>
                    <TabsTrigger value="typing">Type</TabsTrigger>
                    <TabsTrigger value="speech">Speak</TabsTrigger>
                    <TabsTrigger value="math">Math Tools</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </CardHeader>
            
            <CardContent>
              <TabsContent value="typing" className="mt-0 space-y-4">
                <Textarea
                  placeholder="Type your answer here..."
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  disabled={answerSubmitted}
                  className="min-h-[120px]"
                />
              </TabsContent>
              
              <TabsContent value="speech" className="mt-0">
                <div className="bg-muted/30 rounded-lg p-6 text-center">
                  {isListening ? (
                    <div className="space-y-4">
                      <div className="flex justify-center">
                        <div className="relative">
                          <div className="absolute inset-0 bg-red-500/20 animate-ping rounded-full"></div>
                          <Button 
                            variant="destructive"
                            size="lg" 
                            className="rounded-full h-16 w-16 p-0"
                            onClick={handleStopListening}
                          >
                            <Mic className="h-8 w-8" />
                          </Button>
                        </div>
                      </div>
                      <p className="text-center text-sm text-muted-foreground animate-pulse">
                        Listening... Tap to stop
                      </p>
                      {userAnswer && (
                        <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-md border">
                          <p className="text-sm text-muted-foreground mb-1">Recognized speech:</p>
                          <p>{userAnswer}</p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <Button
                        variant="default"
                        className="mx-auto"
                        onClick={handleStartListening}
                      >
                        <Mic className="mr-2 h-4 w-4" />
                        Start Speaking
                      </Button>
                      <p className="text-sm text-muted-foreground">
                        Click the button and start speaking to convert your speech to text.
                      </p>
                      {userAnswer && (
                        <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-md border">
                          <p className="text-sm text-muted-foreground mb-1">Recognized speech:</p>
                          <p>{userAnswer}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="math" className="mt-0">
                <div className="bg-muted/30 rounded-lg p-4 text-center space-y-4">
                  <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                    {["x²", "√", "π", "÷", "∫", "Σ", "∞", "=", "≠", "≤", "≥", "±", "⋅", "×", "→", "()", "[]", "{}"].map((symbol) => (
                      <Button
                        key={symbol}
                        variant="outline"
                        size="sm"
                        onClick={() => handleInsertMathSymbol(symbol)}
                      >
                        {symbol}
                      </Button>
                    ))}
                  </div>
                  
                  <Textarea
                    placeholder="Type your math answer here..."
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    disabled={answerSubmitted}
                    className="min-h-[120px]"
                  />
                </div>
              </TabsContent>
              
              {currentAccuracy !== null && (
                <div className="mt-4 p-4 rounded-md border bg-muted/20">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium">Answer Accuracy</h3>
                    <Badge
                      variant={
                        currentAccuracy >= 80 ? "default" :
                        currentAccuracy >= 60 ? "secondary" :
                        "destructive"
                      }
                    >
                      {currentAccuracy}%
                    </Badge>
                  </div>
                  <Progress 
                    value={currentAccuracy} 
                    className={`h-2 mb-4 ${
                      currentAccuracy >= 80 ? "bg-green-600" :
                      currentAccuracy >= 60 ? "bg-amber-600" :
                      "bg-red-600"
                    }`}
                  />
                  
                  <div className="flex flex-wrap justify-center gap-3 mt-4">
                    <Button variant="outline" size="sm" onClick={handleRetry} className="flex items-center gap-1">
                      <RefreshCw className="h-3 w-3" />
                      Try Again
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleFlip} className="flex items-center gap-1">
                      Show Answer
                    </Button>
                    {!isFlipped && currentAccuracy >= 80 && (
                      <Button size="sm" onClick={handleNextCard} className="flex items-center gap-1">
                        Next Card
                        <ArrowRight className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
            
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                onClick={handlePreviousCard}
                disabled={currentIndex === 0}
              >
                <ArrowLeft className="mr-1 h-4 w-4" />
                Previous
              </Button>
              
              {!answerSubmitted ? (
                <Button 
                  onClick={handleSubmitAnswer} 
                  disabled={!userAnswer.trim()}
                >
                  Submit Answer
                </Button>
              ) : (
                <Button onClick={handleNextCard}>
                  Next Card
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>
        
        {/* Sidebar column */}
        <div className="lg:col-span-1 space-y-6">
          {/* Retention Analysis */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">Retention Analysis</CardTitle>
                <Button
                  variant="ghost" 
                  size="sm"
                  onClick={() => setShowRetentionStats(!showRetentionStats)}
                >
                  {showRetentionStats ? "Hide" : "Show"} Stats
                </Button>
              </div>
            </CardHeader>
            
            {currentCard && showRetentionStats ? (
              <CardContent className="pt-0">
                <div className="space-y-4">
                  {/* Current card statistics */}
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Retention Score:</span>
                      <span className={`font-semibold ${
                        calculateRetentionScore(currentCard.id) >= 70 ? "text-green-600" :
                        calculateRetentionScore(currentCard.id) >= 40 ? "text-amber-600" :
                        "text-red-600"
                      }`}>
                        {calculateRetentionScore(currentCard.id)}%
                      </span>
                    </div>
                    <Progress value={calculateRetentionScore(currentCard.id)} className="h-2 mb-3" />
                    
                    <div className="text-sm space-y-2">
                      <div className="flex justify-between">
                        <span>Trend:</span>
                        <span className={`font-medium ${
                          getRetentionTrend(currentCard.id) === 'improving' ? "text-green-600" :
                          getRetentionTrend(currentCard.id) === 'declining' ? "text-red-600" :
                          "text-muted-foreground"
                        }`}>
                          {getRetentionTrend(currentCard.id) === 'improving' ? 'Improving' :
                           getRetentionTrend(currentCard.id) === 'declining' ? 'Declining' : 'Stable'}
                        </span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span>Next review:</span>
                        <span className="font-medium">
                          {calculateNextReviewDate(currentCard.id).toLocaleDateString()}
                        </span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span>Total attempts:</span>
                        <span className="font-medium">
                          {(attempts[currentCard.id] || []).length}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Attempt history timeline */}
                  {(attempts[currentCard.id] || []).length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium mb-2">Attempt History</h4>
                      <div className="space-y-2">
                        {(attempts[currentCard.id] || []).map((attempt, idx) => (
                          <div key={idx} className="flex items-center text-xs">
                            <div className={`h-2 w-2 rounded-full mr-2 ${
                              attempt.accuracy >= 80 ? "bg-green-500" :
                              attempt.accuracy >= 60 ? "bg-amber-500" :
                              "bg-red-500"
                            }`}></div>
                            <span className="flex-1">
                              {new Date(attempt.timestamp).toLocaleDateString()} ({attempt.responseTime}s)
                            </span>
                            <span className={`font-medium ${
                              attempt.accuracy >= 80 ? "text-green-600" :
                              attempt.accuracy >= 60 ? "text-amber-600" :
                              "text-red-600"
                            }`}>
                              {attempt.accuracy}%
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Recall actions */}
                  <div className="pt-2">
                    <div className="flex justify-center gap-3">
                      <Button variant="outline" size="sm" className="flex items-center gap-1">
                        <CheckCircle className="h-3 w-3" />
                        Easy to Recall
                      </Button>
                      <Button variant="outline" size="sm" className="flex items-center gap-1">
                        <XCircle className="h-3 w-3" />
                        Hard to Recall
                      </Button>
                    </div>
                    
                    {lowRetentionCards.has(currentCard.id) && (
                      <p className="text-xs text-center text-amber-600 mt-3">
                        This card is marked for additional review due to low retention.
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            ) : (
              <CardContent className="py-8 text-center">
                <p className="text-sm text-muted-foreground">
                  Click "Show Stats" to view your retention data for this card.
                </p>
              </CardContent>
            )}
          </Card>
          
          {/* Notes */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Notes</CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Textarea 
                  placeholder="Add a note for this flashcard..." 
                  value={currentNote}
                  onChange={(e) => setCurrentNote(e.target.value)}
                  className="min-h-[60px] text-sm"
                />
              </div>
              
              <div className="flex justify-end">
                <Button 
                  size="sm" 
                  onClick={handleSaveNote} 
                  disabled={!currentNote.trim()}
                >
                  Save Note
                </Button>
              </div>
              
              {currentCard && (userNotes[currentCard.id] || []).length > 0 ? (
                <div className="space-y-3 pt-2">
                  {(userNotes[currentCard.id] || []).map((note) => (
                    <div 
                      key={note.id} 
                      className="bg-muted/40 p-3 rounded-md text-sm space-y-1"
                    >
                      <p>{note.content}</p>
                      <div className="flex justify-between items-center text-xs text-muted-foreground">
                        <span>{new Date(note.timestamp).toLocaleString(undefined, { 
                          year: 'numeric', 
                          month: 'short', 
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}</span>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-5 px-2" 
                          onClick={() => handleDeleteNote(note.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-center text-muted-foreground">
                  You haven't added any notes for this card yet.
                </p>
              )}
            </CardContent>
          </Card>
          
          {/* Related cards & concepts */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Related Content</CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {currentCard?.relatedConceptId && (
                <div>
                  <h4 className="text-sm font-medium mb-2">Related Concept</h4>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start text-left"
                    onClick={() => navigate(`/dashboard/student/concepts/card/${currentCard.relatedConceptId}`)}
                  >
                    <Brain className="mr-2 h-4 w-4" />
                    {currentCard.relatedConceptName || "View Related Concept"}
                  </Button>
                </div>
              )}
              
              <div>
                <h4 className="text-sm font-medium mb-2">Suggested Cards</h4>
                <div className="space-y-2">
                  {getSuggestedRelatedCards().map((card, index) => (
                    <div 
                      key={index}
                      className="p-3 border rounded-md hover:bg-muted/40 cursor-pointer"
                      onClick={() => {
                        const targetIndex = cards.findIndex(c => c.id === card.id);
                        if (targetIndex >= 0) {
                          setCurrentIndex(targetIndex);
                          resetCardState();
                        }
                      }}
                    >
                      <p className="text-sm font-medium line-clamp-2">{card.title}</p>
                      <div className="flex gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">{card.subject}</Badge>
                        <Badge variant="outline" className="text-xs">{card.topic}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Smart recommendations */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Smart Recommendations</CardTitle>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center p-2 border rounded-md bg-muted/20">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Optimal Review Time</p>
                    <p className="text-xs text-muted-foreground">Best to review this card again tomorrow evening</p>
                  </div>
                </div>
                
                <div className="flex items-center p-2 border rounded-md bg-muted/20">
                  <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 mr-3">
                    <Flag className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Weekly Deep Review</p>
                    <p className="text-xs text-muted-foreground">Added to your weekend review session</p>
                  </div>
                </div>
                
                <div className="flex items-center p-2 border rounded-md bg-muted/20">
                  <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-3">
                    <Brain className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Learning Tip</p>
                    <p className="text-xs text-muted-foreground">Try creating a visual memory aid for better recall</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Calculator */}
      {showCalculator && (
        <div className="fixed bottom-4 right-4 w-80 z-50">
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
        </div>
      )}
    </div>
  );
};

export default EnhancedFlashcardPractice;
