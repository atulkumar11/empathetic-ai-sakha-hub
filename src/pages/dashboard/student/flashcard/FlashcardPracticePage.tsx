import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  ChevronLeft,
  ChevronRight,
  Bookmark,
  BookmarkPlus,
  Check,
  X,
  ArrowRight,
  FlipHorizontal,
  Dices,
  Mic,
  RefreshCw,
  RotateCcw,
  Save,
  Volume2
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Flashcard {
  id: string;
  question: string;
  answer: string;
  questionType: 'text' | 'image' | 'video' | 'audio';
  topic: string;
  subject: string;
  difficulty: 'easy' | 'medium' | 'hard';
  tags: string[];
}

// Mock flashcard data
const mockFlashcards: Flashcard[] = [
  {
    id: '1',
    question: "What are the three laws of motion formulated by Sir Isaac Newton?",
    answer: "1. An object at rest stays at rest, and an object in motion stays in motion unless acted upon by a force.\n2. The acceleration of an object is directly proportional to the net force and inversely proportional to its mass (F = ma).\n3. For every action, there is an equal and opposite reaction.",
    questionType: 'text',
    topic: 'Classical Mechanics',
    subject: 'Physics',
    difficulty: 'medium',
    tags: ['Newton', 'Laws of Motion', 'Physics']
  },
  {
    id: '2',
    question: "Define and explain the concept of 'potential energy'.",
    answer: "Potential energy is the stored energy an object possesses due to its position or state. It's the energy that could potentially be converted to kinetic energy. Examples include gravitational potential energy (mgh) and elastic potential energy (½kx²).",
    questionType: 'text',
    topic: 'Energy',
    subject: 'Physics',
    difficulty: 'medium',
    tags: ['Energy', 'Mechanics', 'Physics']
  },
  {
    id: '3',
    question: "What is the difference between an acid and a base?",
    answer: "Acids are substances that donate hydrogen ions (H⁺) or protons in a solution, have a pH less than 7, and turn litmus paper red.\n\nBases are substances that accept hydrogen ions or donate hydroxide ions (OH⁻), have a pH greater than 7, and turn litmus paper blue.",
    questionType: 'text',
    topic: 'Acid-Base Chemistry',
    subject: 'Chemistry',
    difficulty: 'easy',
    tags: ['Acids', 'Bases', 'pH', 'Chemistry']
  },
  {
    id: '4',
    question: "What is the quadratic formula and when is it used?",
    answer: "The quadratic formula is x = (-b ± √(b² - 4ac)) / 2a, where ax² + bx + c = 0. It's used to find the roots (or solutions) of a quadratic equation.",
    questionType: 'text',
    topic: 'Algebra',
    subject: 'Mathematics',
    difficulty: 'medium',
    tags: ['Algebra', 'Equations', 'Mathematics']
  },
  {
    id: '5',
    question: "What is photosynthesis and what is its chemical equation?",
    answer: "Photosynthesis is the process by which green plants and some other organisms use sunlight to synthesize nutrients from carbon dioxide and water. The chemical equation is: 6CO₂ + 6H₂O + Light Energy → C₆H₁₂O₆ + 6O₂",
    questionType: 'text',
    topic: 'Plant Biology',
    subject: 'Biology',
    difficulty: 'medium',
    tags: ['Photosynthesis', 'Plants', 'Biology']
  }
];

export default function FlashcardPracticePage() {
  const { deckId } = useParams<{deckId: string}>();
  
  // State variables
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [accuracyScore, setAccuracyScore] = useState<number | null>(null);
  const [studyTime, setStudyTime] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [speechToTextActive, setSpeechToTextActive] = useState(false);
  
  // Timer for study time
  useEffect(() => {
    const timer = setInterval(() => {
      setStudyTime(prev => prev + 1);
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  // Format study time
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Get current flashcard
  const currentFlashcard = mockFlashcards[currentIndex];
  
  // Handle next/previous card
  const goToNextCard = () => {
    if (currentIndex < mockFlashcards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      resetCardState();
    }
  };
  
  const goToPrevCard = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      resetCardState();
    }
  };
  
  // Reset card state when changing cards
  const resetCardState = () => {
    setShowAnswer(false);
    setUserAnswer("");
    setIsSubmitted(false);
    setAccuracyScore(null);
  };
  
  // Toggle flashcard
  const toggleFlashcard = () => {
    setShowAnswer(!showAnswer);
  };
  
  // Submit answer
  const submitAnswer = () => {
    if (userAnswer.trim() === "") return;
    
    setIsSubmitted(true);
    
    // Simple mock accuracy calculation (in a real app, this would use a more sophisticated algorithm)
    const answerWords = currentFlashcard.answer.toLowerCase().split(/\s+/);
    const userWords = userAnswer.toLowerCase().split(/\s+/);
    
    const matchedWords = userWords.filter(word => 
      answerWords.some(answerWord => answerWord.includes(word) || word.includes(answerWord))
    );
    
    const accuracy = Math.min(100, Math.round((matchedWords.length / answerWords.length) * 100));
    setAccuracyScore(accuracy);
  };
  
  // Retry current card
  const retryCard = () => {
    setShowAnswer(false);
    setUserAnswer("");
    setIsSubmitted(false);
    setAccuracyScore(null);
  };
  
  // Toggle bookmark
  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };
  
  // Toggle calculator
  const toggleCalculator = () => {
    setIsCalculatorOpen(!isCalculatorOpen);
  };
  
  // Toggle speech to text (mock implementation)
  const toggleSpeechToText = () => {
    setSpeechToTextActive(!speechToTextActive);
    // In a real app, this would start/stop the speech recognition API
  };
  
  // Calculate progress
  const progress = ((currentIndex + 1) / mockFlashcards.length) * 100;
  
  return (
    <div className="container mx-auto px-4 py-6 max-w-6xl">
      {/* Header area */}
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <Button variant="outline" asChild className="mb-2">
            <Link to="/dashboard/student/flashcards">&larr; Back to Flashcards</Link>
          </Button>
          <h1 className="text-2xl sm:text-3xl font-bold">{currentFlashcard.subject} Flashcards</h1>
          <div className="flex flex-wrap items-center gap-2 mt-2">
            <Badge variant="secondary">{currentFlashcard.topic}</Badge>
            <Badge variant={
              currentFlashcard.difficulty === 'easy' ? "outline" : 
              currentFlashcard.difficulty === 'medium' ? "secondary" : "destructive"
            }>
              {currentFlashcard.difficulty.charAt(0).toUpperCase() + currentFlashcard.difficulty.slice(1)}
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
            <Bookmark className={isBookmarked ? "fill-yellow-500" : ""} />
          </Button>
          <Button variant="outline" size="icon">
            <Volume2 />
          </Button>
          <Button variant="outline" size="sm">
            Fullscreen
          </Button>
        </div>
      </div>
      
      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm mb-1">
          <span>Card {currentIndex + 1} of {mockFlashcards.length}</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>
      
      {/* Main flashcard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="relative min-h-[400px] perspective">
            <AnimatePresence initial={false} mode="wait">
              <motion.div
                key={showAnswer ? 'answer' : 'question'}
                initial={{ rotateY: showAnswer ? -90 : 90, opacity: 0 }}
                animate={{ rotateY: 0, opacity: 1 }}
                exit={{ rotateY: showAnswer ? 90 : -90, opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0"
              >
                <Card className="h-full cursor-pointer" onClick={toggleFlashcard}>
                  <CardContent className="p-6 h-full flex flex-col">
                    <div className="flex justify-between mb-4">
                      <Badge>{showAnswer ? 'Answer' : 'Question'}</Badge>
                      <span className="text-sm text-muted-foreground">Tap to flip</span>
                    </div>
                    
                    <div className="flex-grow flex items-center justify-center">
                      <div className="prose max-w-none dark:prose-invert">
                        {showAnswer ? (
                          <div>
                            {currentFlashcard.answer.split('\n').map((paragraph, idx) => (
                              <p key={idx}>{paragraph}</p>
                            ))}
                          </div>
                        ) : (
                          <p className="text-xl font-medium">{currentFlashcard.question}</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex justify-center mt-4">
                      <Button variant="outline" size="sm" className="animate-pulse">
                        {showAnswer ? 'Show Question' : 'Show Answer'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>
          
          {/* Answer input area */}
          <div className="mt-6">
            <Tabs defaultValue="type" className="w-full">
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
                        onClick={() => setUserAnswer(prev => prev + symbol)}
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
                  <Button variant="outline" onClick={toggleFlashcard}>
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Flip Card
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="outline" onClick={retryCard}>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Try Again
                  </Button>
                  <Button onClick={goToNextCard}>
                    Next Card
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-1 space-y-6">
          {/* Accuracy score (shows after submission) */}
          {isSubmitted && accuracyScore !== null && (
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-medium mb-3">Answer Accuracy</h3>
                <div className="flex justify-between mb-1 text-sm">
                  <span>Score</span>
                  <span>{accuracyScore}%</span>
                </div>
                <Progress 
                  value={accuracyScore} 
                  className="h-2 mb-4"
                  color={accuracyScore > 70 ? "bg-green-500" : accuracyScore > 40 ? "bg-amber-500" : "bg-red-500"}
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
          
          {/* Navigation and stats */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-medium mb-3">Navigation</h3>
              <div className="flex justify-between">
                <Button 
                  variant="outline" 
                  onClick={goToPrevCard} 
                  disabled={currentIndex === 0}
                  className="flex items-center"
                >
                  <ArrowLeft className="mr-1 h-4 w-4" />
                  Previous
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setCurrentIndex(Math.floor(Math.random() * mockFlashcards.length))}
                  className="flex items-center mx-2"
                >
                  <Dices className="mr-1 h-4 w-4" />
                  Random
                </Button>
                <Button 
                  variant="outline" 
                  onClick={goToNextCard} 
                  disabled={currentIndex === mockFlashcards.length - 1}
                  className="flex items-center"
                >
                  Next
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Tags */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-medium mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {currentFlashcard.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary">{tag}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Study stats */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-medium mb-3">Study Statistics</h3>
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
                    <span>15/30</span>
                  </div>
                  <Progress value={50} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Study Streak</span>
                    <span>4 days</span>
                  </div>
                  <Progress value={40} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Related resources */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-medium mb-3">Related Resources</h3>
              <div className="space-y-2">
                <Link 
                  to={`/dashboard/student/concepts/card/1`}
                  className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                >
                  {currentFlashcard.topic} Concept Cards
                </Link>
                <Link 
                  to={`/dashboard/student/practice-exam/1`}
                  className="block p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                >
                  Practice Quiz: {currentFlashcard.subject}
                </Link>
              </div>
              <Button variant="outline" className="w-full mt-4">
                <Save className="mr-2 h-4 w-4" />
                Save Study Session
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <style jsx>{`
        .perspective {
          perspective: 1000px;
        }
      `}</style>
    </div>
  );
};
