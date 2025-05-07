
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import {
  BookOpen, Bookmark, BookmarkPlus, Calculator,
  Mic, Star, ArrowRight, ArrowLeft, 
  RefreshCw, CheckCircle, XCircle, List,
  Image, Video, AudioLines
} from 'lucide-react';

// Types
interface FlashcardDeck {
  id: string;
  title: string;
  subject: string;
  topic: string;
  cardCount: number;
  completedCount: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  lastPracticed?: string;
  masteryLevel: number;
}

interface FlashcardQuestion {
  id: string;
  question: string;
  answer: string;
  questionType: 'text' | 'image' | 'video' | 'audio';
  answerType: 'text' | 'math';
  difficulty: 'easy' | 'medium' | 'hard';
  tags: string[];
  imageUrl?: string;
  videoUrl?: string;
  audioUrl?: string;
}

const FlashcardPracticeLandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedDeck, setSelectedDeck] = useState<FlashcardDeck | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [isFlipped, setIsFlipped] = useState(false);
  const [answerMode, setAnswerMode] = useState<'typing' | 'speech' | 'calculator'>('typing');
  const [isListening, setIsListening] = useState(false);
  const [showCalculator, setShowCalculator] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [currentAccuracy, setCurrentAccuracy] = useState<number | null>(null);
  const [attemptHistory, setAttemptHistory] = useState<{time: Date, accuracy: number}[]>([]);
  const [showPerformanceStats, setShowPerformanceStats] = useState(false);

  // Mock data for flashcard decks
  const mockDecks: FlashcardDeck[] = [
    {
      id: 'physics-101',
      title: 'Physics Fundamentals',
      subject: 'Physics',
      topic: 'Mechanics',
      cardCount: 25,
      completedCount: 12,
      difficulty: 'intermediate',
      lastPracticed: '2025-04-29T10:30:00',
      masteryLevel: 65
    },
    {
      id: 'chemistry-bonds',
      title: 'Chemical Bonding',
      subject: 'Chemistry',
      topic: 'Chemical Bonds',
      cardCount: 18,
      completedCount: 5,
      difficulty: 'advanced',
      lastPracticed: '2025-04-28T14:15:00',
      masteryLevel: 40
    },
    {
      id: 'math-calculus',
      title: 'Calculus Concepts',
      subject: 'Mathematics',
      topic: 'Calculus',
      cardCount: 30,
      completedCount: 30,
      difficulty: 'advanced',
      lastPracticed: '2025-04-26T09:45:00',
      masteryLevel: 90
    }
  ];

  // Mock questions for the selected deck
  const mockQuestions: FlashcardQuestion[] = [
    {
      id: 'q1',
      question: "What is Newton's Second Law of Motion?",
      answer: "The acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass. Mathematically, F = ma.",
      questionType: 'text',
      answerType: 'text',
      difficulty: 'medium',
      tags: ['mechanics', 'newton', 'laws of motion']
    },
    {
      id: 'q2',
      question: "Identify this circuit component:",
      answer: "Capacitor - a passive two-terminal electrical component that stores electrical energy in an electric field.",
      questionType: 'image',
      answerType: 'text',
      difficulty: 'medium',
      tags: ['electronics', 'circuits', 'components'],
      imageUrl: 'https://example.com/capacitor.jpg'
    },
    {
      id: 'q3',
      question: "Calculate the derivative of f(x) = x² + 3x + 2",
      answer: "f'(x) = 2x + 3",
      questionType: 'text',
      answerType: 'math',
      difficulty: 'easy',
      tags: ['calculus', 'derivatives', 'functions']
    },
    {
      id: 'q4',
      question: "Listen to this audio clip and identify the physical phenomenon being described:",
      answer: "Doppler Effect - the change in frequency of a wave in relation to an observer moving relative to the wave source.",
      questionType: 'audio',
      answerType: 'text',
      difficulty: 'hard',
      tags: ['waves', 'sound', 'physics'],
      audioUrl: 'https://example.com/doppler-effect.mp3'
    }
  ];

  const currentQuestion = mockQuestions[currentQuestionIndex];
  
  const handleSelectDeck = (deck: FlashcardDeck) => {
    setSelectedDeck(deck);
    setCurrentQuestionIndex(0);
    resetQuestionState();
  };

  const resetQuestionState = () => {
    setUserAnswer('');
    setIsFlipped(false);
    setCurrentAccuracy(null);
    setIsListening(false);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < mockQuestions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      resetQuestionState();
    } else {
      toast({
        title: "End of deck reached!",
        description: "You've completed all flashcards in this deck.",
      });
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prevIndex => prevIndex - 1);
      resetQuestionState();
    }
  };

  const handleFlipCard = () => {
    setIsFlipped(!isFlipped);
  };

  const handleStartListening = () => {
    setIsListening(true);
    // In a real implementation, we would use the Web Speech API
    // For this demo, we'll simulate speech recognition with a timeout
    setTimeout(() => {
      const simulatedText = "This is a simulated speech recognition result.";
      setUserAnswer(simulatedText);
      setIsListening(false);
      
      toast({
        title: "Speech recognized",
        description: "Your speech has been converted to text.",
      });
    }, 2000);
  };

  const handleStopListening = () => {
    setIsListening(false);
  };

  const handleToggleCalculator = () => {
    setShowCalculator(!showCalculator);
  };

  const handleToggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    toast({
      title: isBookmarked ? "Bookmark removed" : "Bookmark added",
      description: isBookmarked 
        ? "This flashcard has been removed from your bookmarks." 
        : "This flashcard has been added to your bookmarks.",
    });
  };

  const handleSubmitAnswer = () => {
    if (!userAnswer.trim()) {
      toast({
        title: "Answer required",
        description: "Please provide an answer before submitting.",
        variant: "destructive",
      });
      return;
    }

    // Simulate an AI-based accuracy calculation
    const accuracy = Math.floor(Math.random() * 41) + 60; // Random between 60-100
    setCurrentAccuracy(accuracy);
    
    // Record this attempt in history
    setAttemptHistory(prev => [...prev, { time: new Date(), accuracy }]);

    if (accuracy >= 90) {
      toast({
        title: "Excellent!",
        description: "Your answer is highly accurate.",
      });
    } else if (accuracy >= 70) {
      toast({
        title: "Good job!",
        description: "Your answer is mostly accurate with some room for improvement.",
      });
    } else {
      toast({
        title: "Keep practicing",
        description: "Your answer needs improvement. Review the correct answer.",
        variant: "destructive",
      });
    }
  };

  const handleRetry = () => {
    setUserAnswer('');
    setCurrentAccuracy(null);
  };

  const handleBackToDecks = () => {
    setSelectedDeck(null);
  };

  const handleShowPerformance = () => {
    setShowPerformanceStats(!showPerformanceStats);
  };

  // Calculate progress percentage
  const getProgressPercentage = () => {
    return ((currentQuestionIndex + 1) / mockQuestions.length) * 100;
  };

  // Render the question content based on question type
  const renderQuestionContent = (question: FlashcardQuestion) => {
    switch (question.questionType) {
      case 'image':
        return (
          <div className="flex flex-col items-center">
            <p className="text-lg font-medium mb-4">{question.question}</p>
            <div className="max-w-md mt-2 rounded-lg overflow-hidden border border-gray-200">
              <img 
                src={question.imageUrl} 
                alt="Question visual" 
                className="w-full h-auto"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=Image+Not+Available';
                }}
              />
            </div>
          </div>
        );
      case 'video':
        return (
          <div className="flex flex-col items-center">
            <p className="text-lg font-medium mb-4">{question.question}</p>
            <div className="max-w-md mt-2 rounded-lg overflow-hidden border border-gray-200">
              <video 
                controls 
                className="w-full h-auto"
                src={question.videoUrl}
              >
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        );
      case 'audio':
        return (
          <div className="flex flex-col items-center">
            <p className="text-lg font-medium mb-4">{question.question}</p>
            <div className="mt-2">
              <audio controls src={question.audioUrl}>
                Your browser does not support the audio element.
              </audio>
            </div>
          </div>
        );
      case 'text':
      default:
        return (
          <div className="text-center">
            <p className="text-xl font-medium">{question.question}</p>
          </div>
        );
    }
  };

  // Render the calculator component
  const renderCalculator = () => {
    return (
      <div className="fixed bottom-4 right-4 bg-white dark:bg-gray-900 shadow-xl rounded-lg p-4 z-50 w-72">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-medium">Calculator</h3>
          <Button variant="ghost" size="sm" onClick={handleToggleCalculator}>✕</Button>
        </div>
        <Input 
          type="text" 
          className="text-right mb-2" 
          value="0" 
          readOnly 
        />
        <div className="grid grid-cols-4 gap-1">
          {['7', '8', '9', '÷', '4', '5', '6', '×', '1', '2', '3', '-', '0', '.', '=', '+'].map((key) => (
            <Button key={key} variant="outline" size="sm" className="h-8">
              {key}
            </Button>
          ))}
        </div>
        <div className="mt-2 grid grid-cols-3 gap-1">
          {['sin', 'cos', 'tan', 'log', 'ln', '√', 'x²', 'x^y', 'π'].map((key) => (
            <Button key={key} variant="outline" size="sm" className="h-8 text-xs">
              {key}
            </Button>
          ))}
        </div>
      </div>
    );
  };

  // If no deck is selected, show the deck selection screen
  if (!selectedDeck) {
    return (
      <SharedPageLayout
        title="Flashcard Practice"
        subtitle="Select a deck to start practicing"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {mockDecks.map(deck => (
            <Card 
              key={deck.id}
              className="hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => handleSelectDeck(deck)}
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg font-bold">{deck.title}</CardTitle>
                  <Badge variant={
                    deck.difficulty === 'beginner' ? 'outline' :
                    deck.difficulty === 'intermediate' ? 'secondary' :
                    'destructive'
                  }>
                    {deck.difficulty}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>{deck.subject}</span>
                  <span>•</span>
                  <span>{deck.topic}</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mt-2">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress</span>
                    <span>{deck.completedCount}/{deck.cardCount} cards</span>
                  </div>
                  <Progress value={(deck.completedCount / deck.cardCount) * 100} className="h-2" />
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 mr-1" />
                    <span className="text-sm font-medium">{deck.masteryLevel}% Mastery</span>
                  </div>
                  {deck.lastPracticed && (
                    <span className="text-xs text-muted-foreground">
                      Last practiced: {new Date(deck.lastPracticed).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" size="sm">
                  Start Practice
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </SharedPageLayout>
    );
  }

  // Flashcard practice view
  return (
    <SharedPageLayout
      title={`Practicing: ${selectedDeck.title}`}
      subtitle={`${selectedDeck.subject} • ${selectedDeck.topic} • ${currentQuestionIndex + 1} of ${mockQuestions.length}`}
    >
      <div className="mb-6 flex justify-between items-center">
        <Button variant="outline" onClick={handleBackToDecks}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Decks
        </Button>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="icon"
            className={isBookmarked ? "text-yellow-500" : ""}
            onClick={handleToggleBookmark}
          >
            {isBookmarked ? <Bookmark /> : <BookmarkPlus />}
          </Button>
          <Button variant="outline" size="icon" onClick={handleToggleCalculator}>
            <Calculator />
          </Button>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm mb-1">
          <span>Progress</span>
          <span>{Math.round(getProgressPercentage())}%</span>
        </div>
        <Progress value={getProgressPercentage()} className="h-2" />
      </div>

      {/* Main flashcard */}
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-2/3">
          <div className="mb-6 perspective">
            <div
              className={`relative transition-all duration-500 h-[400px] cursor-pointer ${
                isFlipped ? "rotate-y-180" : ""
              }`}
              onClick={handleFlipCard}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Front of card (Question) */}
              <Card
                className={`absolute inset-0 backface-hidden p-6 ${
                  isFlipped ? "hidden" : ""
                }`}
              >
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">Question</Badge>
                      {currentQuestion.questionType === 'text' && (
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                          <List className="h-3 w-3 mr-1" /> Text
                        </Badge>
                      )}
                      {currentQuestion.questionType === 'image' && (
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          <Image className="h-3 w-3 mr-1" /> Image
                        </Badge>
                      )}
                      {currentQuestion.questionType === 'video' && (
                        <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                          <Video className="h-3 w-3 mr-1" /> Video
                        </Badge>
                      )}
                      {currentQuestion.questionType === 'audio' && (
                        <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                          <AudioLines className="h-3 w-3 mr-1" /> Audio
                        </Badge>
                      )}
                    </div>
                    <Badge
                      variant="outline"
                      className={`${
                        currentQuestion.difficulty === 'easy'
                          ? 'bg-green-50 text-green-700 border-green-200'
                          : currentQuestion.difficulty === 'medium'
                          ? 'bg-yellow-50 text-yellow-700 border-yellow-200'
                          : 'bg-red-50 text-red-700 border-red-200'
                      }`}
                    >
                      {currentQuestion.difficulty}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="flex flex-col items-center justify-center h-full pt-0">
                  <div className="flex-1 flex items-center">
                    {renderQuestionContent(currentQuestion)}
                  </div>
                  <p className="text-sm text-muted-foreground animate-pulse mt-auto">
                    Tap to flip
                  </p>
                </CardContent>
              </Card>

              {/* Back of card (Answer) */}
              <Card
                className={`absolute inset-0 backface-hidden p-6 rotate-y-180 ${
                  !isFlipped ? "hidden" : ""
                }`}
              >
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <Badge variant="secondary">Answer</Badge>
                    <Badge
                      variant={currentQuestion.answerType === 'math' ? 'outline' : 'default'}
                      className={currentQuestion.answerType === 'math' ? 'bg-indigo-50 text-indigo-700 border-indigo-200' : ''}
                    >
                      {currentQuestion.answerType === 'math' ? 'Math' : 'Text'}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="flex flex-col items-center justify-center h-full pt-0">
                  <div className="flex-1 flex items-center">
                    <div className="prose dark:prose-invert max-w-none">
                      <p className="text-lg">{currentQuestion.answer}</p>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground animate-pulse mt-auto">
                    Tap to flip back
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Answer input section */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">Your Answer</CardTitle>
                <Tabs 
                  value={answerMode} 
                  onValueChange={(value) => setAnswerMode(value as 'typing' | 'speech' | 'calculator')}
                >
                  <TabsList className="grid w-[400px] grid-cols-3">
                    <TabsTrigger value="typing">Type</TabsTrigger>
                    <TabsTrigger value="speech">Speak</TabsTrigger>
                    <TabsTrigger value="calculator">Math Tools</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </CardHeader>

            <CardContent>
              <div className="space-y-4">
                <TabsContent value="typing" className="mt-0">
                  <div className="space-y-2">
                    <Input
                      placeholder="Type your answer here..."
                      value={userAnswer}
                      onChange={(e) => setUserAnswer(e.target.value)}
                      disabled={currentAccuracy !== null}
                      className="h-24 py-2 resize-none"
                    />
                  </div>
                </TabsContent>

                <TabsContent value="speech" className="mt-0">
                  <div className="flex flex-col items-center py-6">
                    {isListening ? (
                      <div className="space-y-4 w-full">
                        <div className="flex justify-center">
                          <div className="relative">
                            <div className="absolute inset-0 bg-red-500/20 animate-ping rounded-full"></div>
                            <Button 
                              size="lg" 
                              variant="destructive"
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
                      <div className="space-y-4 w-full">
                        <div className="flex justify-center">
                          <Button 
                            size="lg" 
                            className="rounded-full h-16 w-16 p-0"
                            onClick={handleStartListening}
                          >
                            <Mic className="h-8 w-8" />
                          </Button>
                        </div>
                        <p className="text-center text-sm text-muted-foreground">
                          Tap the microphone and start speaking
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

                <TabsContent value="calculator" className="mt-0">
                  <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-md">
                    <div className="grid grid-cols-4 gap-2 mb-4">
                      {['x²', '√', 'π', '÷', '∫', 'Σ', '∞', '='].map((symbol) => (
                        <Button
                          key={symbol}
                          variant="outline"
                          size="sm"
                          onClick={() => setUserAnswer(prev => prev + symbol)}
                          className="h-10"
                        >
                          {symbol}
                        </Button>
                      ))}
                    </div>
                    <div className="space-y-2">
                      <Input
                        placeholder="Enter mathematical expression..."
                        value={userAnswer}
                        onChange={(e) => setUserAnswer(e.target.value)}
                        disabled={currentAccuracy !== null}
                        className="h-24 py-2 resize-none"
                      />
                    </div>
                  </div>
                </TabsContent>

                {currentAccuracy !== null && (
                  <div className="mt-4 p-4 rounded-md bg-slate-50 dark:bg-slate-900">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium">Accuracy Assessment</h3>
                      <Badge
                        variant="outline"
                        className={`${
                          currentAccuracy >= 80
                            ? 'bg-green-50 text-green-700 border-green-200'
                            : currentAccuracy >= 60
                            ? 'bg-yellow-50 text-yellow-700 border-yellow-200'
                            : 'bg-red-50 text-red-700 border-red-200'
                        }`}
                      >
                        {currentAccuracy}%
                      </Badge>
                    </div>
                    <Progress 
                      value={currentAccuracy} 
                      className="h-2 mb-4" 
                      color={
                        currentAccuracy >= 80
                          ? 'bg-green-500'
                          : currentAccuracy >= 60
                          ? 'bg-yellow-500'
                          : 'bg-red-500'
                      }
                    />
                    <div className="flex justify-center gap-4">
                      <Button variant="outline" onClick={handleRetry} className="flex items-center gap-1">
                        <RefreshCw className="h-4 w-4" />
                        Try Again
                      </Button>
                      <Button onClick={handleFlipCard} className="flex items-center gap-1">
                        Show Answer
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>

            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                onClick={handlePreviousQuestion}
                disabled={currentQuestionIndex === 0}
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Previous
              </Button>

              {currentAccuracy === null ? (
                <Button onClick={handleSubmitAnswer} disabled={!userAnswer.trim()}>
                  Submit Answer
                </Button>
              ) : (
                <Button onClick={handleNextQuestion}>
                  Next Question
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>

        <div className="lg:w-1/3">
          {/* Performance stats panel */}
          <Card className="mb-6">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">Performance</CardTitle>
                <Button variant="ghost" size="sm" onClick={handleShowPerformance}>
                  {showPerformanceStats ? "Hide Stats" : "Show Stats"}
                </Button>
              </div>
            </CardHeader>

            <CardContent>
              {showPerformanceStats ? (
                <div className="space-y-6">
                  {attemptHistory.length > 0 ? (
                    <>
                      <div>
                        <h3 className="text-sm font-medium mb-2">Accuracy Timeline</h3>
                        <div className="h-24 relative bg-slate-50 dark:bg-slate-900 rounded-md">
                          {/* Simplified chart */}
                          <div className="flex items-end h-20 gap-1 pt-2 px-2">
                            {attemptHistory.map((attempt, i) => (
                              <div 
                                key={i}
                                className="flex-1 bg-blue-500 rounded-t"
                                style={{ height: `${attempt.accuracy}%` }}
                                title={`Attempt ${i+1}: ${attempt.accuracy}%`}
                              />
                            ))}
                          </div>
                          <div className="flex justify-between text-xs text-muted-foreground px-2">
                            <span>First</span>
                            <span>Latest</span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium mb-2">Response Analysis</h3>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Average accuracy:</span>
                            <span className="font-medium">
                              {Math.round(
                                attemptHistory.reduce((sum, a) => sum + a.accuracy, 0) / attemptHistory.length
                              )}%
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Attempts:</span>
                            <span className="font-medium">{attemptHistory.length}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Trend:</span>
                            <span className={`font-medium ${
                              attemptHistory.length >= 2 && 
                              attemptHistory[attemptHistory.length - 1].accuracy > 
                              attemptHistory[0].accuracy ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {attemptHistory.length >= 2 ? (
                                attemptHistory[attemptHistory.length - 1].accuracy > 
                                attemptHistory[0].accuracy ? 'Improving' : 'Needs work'
                              ) : 'Not enough data'}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="pt-2">
                        <div className="flex justify-center gap-3">
                          <Button variant="outline" size="sm" className="flex items-center gap-1">
                            <CheckCircle className="h-3 w-3" />
                            Mark as Known
                          </Button>
                          <Button variant="outline" size="sm" className="flex items-center gap-1">
                            <XCircle className="h-3 w-3" />
                            Mark for Review
                          </Button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-6 text-muted-foreground">
                      <p>Submit your first answer to see performance stats.</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-sm text-muted-foreground">
                    Click "Show Stats" to view your performance data on this flashcard.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Tags and related content */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Related Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {currentQuestion.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary">{tag}</Badge>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-2">Related Concepts</h3>
                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <BookOpen className="h-4 w-4 mr-2" />
                    {currentQuestion.tags[0]?.charAt(0).toUpperCase() + currentQuestion.tags[0]?.slice(1)} Fundamentals
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Advanced {selectedDeck.topic}
                  </Button>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-2">Study Recommendations</h3>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Based on your performance:</p>
                  <Button className="w-full" size="sm">
                    Practice Similar Flashcards
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Calculator (conditionally rendered) */}
      {showCalculator && renderCalculator()}

      <style jsx>{`
        .perspective {
          perspective: 1000px;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </SharedPageLayout>
  );
};

export default FlashcardPracticeLandingPage;
