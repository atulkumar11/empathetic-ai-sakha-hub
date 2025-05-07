
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  BookOpen, 
  Star, 
  Clock, 
  Repeat, 
  Check, 
  X, 
  Flag, 
  Mic, 
  Calculator 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const InteractiveFlashcard = () => {
  const { id } = useParams<{ id: string }>();
  const [flipped, setFlipped] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [answerMode, setAnswerMode] = useState<'typing' | 'speech'>('typing');
  const [userAnswer, setUserAnswer] = useState('');
  const [showCalculator, setShowCalculator] = useState(false);
  const [mastery, setMastery] = useState<Record<number, 'remembered' | 'forgot' | 'needHelp' | null>>({});
  
  // Mock data - in a real app, this would come from an API
  const mockFlashcardSet = {
    id,
    title: 'Integration Techniques',
    subject: 'Mathematics',
    topic: 'Calculus',
    totalCards: 20,
    linkedConcept: {
      id: 'conc123',
      title: 'Integral Calculus Fundamentals'
    },
    cards: Array(20).fill(null).map((_, i) => ({
      id: `card-${i}`,
      front: `What is the integral of ${i % 3 === 0 ? 'sin(x)' : i % 3 === 1 ? 'x²' : 'e^x'}?`,
      back: `${i % 3 === 0 ? '-cos(x) + C' : i % 3 === 1 ? 'x³/3 + C' : 'e^x + C'}`,
      explanation: `This is solved by applying the basic integration rule for ${i % 3 === 0 ? 'sine functions' : i % 3 === 1 ? 'polynomials' : 'exponential functions'}.`,
      difficulty: i % 3 === 0 ? 'easy' : i % 3 === 1 ? 'medium' : 'hard',
    }))
  };
  
  const currentCard = mockFlashcardSet.cards[currentCardIndex];
  
  const handleFlip = () => {
    setFlipped(!flipped);
  };
  
  const handleNext = () => {
    if (currentCardIndex < mockFlashcardSet.cards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setFlipped(false);
      setUserAnswer('');
    }
  };
  
  const handlePrev = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
      setFlipped(false);
      setUserAnswer('');
    }
  };
  
  const handleMasteryResponse = (type: 'remembered' | 'forgot' | 'needHelp') => {
    setMastery({ ...mastery, [currentCardIndex]: type });
    setTimeout(handleNext, 500);
  };
  
  const handleSpeech = () => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      alert('Speech recognition would start here');
      // In a real app, implement speech recognition
    } else {
      alert('Speech recognition not supported in your browser');
    }
  };
  
  // Calculate progress
  const progress = ((currentCardIndex + 1) / mockFlashcardSet.totalCards) * 100;
  
  // Calculate accuracy
  const masteredCards = Object.values(mastery).filter(v => v === 'remembered').length;
  const attemptedCards = Object.values(mastery).filter(v => v !== null).length;
  const accuracy = attemptedCards > 0 ? Math.round((masteredCards / attemptedCards) * 100) : 0;
  
  return (
    <div className="container py-6 max-w-5xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">{mockFlashcardSet.title}</h1>
          <div className="flex items-center gap-2 mt-1">
            <Badge variant="outline">{mockFlashcardSet.subject}</Badge>
            <Badge variant="outline">{mockFlashcardSet.topic}</Badge>
            <div className="text-sm text-muted-foreground flex items-center gap-1">
              <BookOpen className="h-4 w-4" />
              <span>
                {currentCardIndex + 1} of {mockFlashcardSet.totalCards} cards
              </span>
            </div>
          </div>
        </div>
        
        <div className="mt-4 md:mt-0 flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={() => window.history.back()}>
            Back to Flashcards
          </Button>
          <Button 
            size="sm" 
            variant="outline" 
            className="flex items-center gap-1"
            onClick={() => window.open(`/dashboard/student/concepts/${mockFlashcardSet.linkedConcept.id}`, '_blank')}
          >
            <BookOpen className="h-4 w-4" />
            <span>{mockFlashcardSet.linkedConcept.title}</span>
          </Button>
        </div>
      </div>
      
      {/* Mode Selector & Tools */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <Tabs value={answerMode} onValueChange={(value) => setAnswerMode(value as 'typing' | 'speech')}>
          <TabsList>
            <TabsTrigger value="typing">Typing Mode</TabsTrigger>
            <TabsTrigger value="speech">Speech Mode</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="mt-4 md:mt-0 flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setShowCalculator(!showCalculator)}>
            <Calculator className="h-4 w-4 mr-1" />
            Calculator
          </Button>
          <Button variant="ghost" size="icon">
            <Star className="h-4 w-4 text-yellow-500" />
          </Button>
        </div>
      </div>
      
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-sm mb-1">
          <span className="text-muted-foreground">Progress</span>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4 text-slate-600" />
              <span>Session time: 3:45</span>
            </div>
            <div>Accuracy: {accuracy}%</div>
          </div>
        </div>
        <Progress value={progress} className="h-2" />
      </div>
      
      {/* Main Flashcard */}
      <div className="h-96 md:h-80 mb-8 perspective">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={flipped ? "back" : "front"}
            className={`w-full h-full rounded-xl shadow-lg p-6 relative cursor-pointer ${
              flipped ? 'bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900 dark:to-indigo-900' : 
              'bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-900 dark:to-purple-900'
            }`}
            initial={{ rotateY: flipped ? -180 : 0, opacity: 0 }}
            animate={{ rotateY: flipped ? 0 : 0, opacity: 1 }}
            exit={{ rotateY: flipped ? 0 : 180, opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={handleFlip}
          >
            <div className="flex justify-end mb-2">
              <Badge 
                className={`${
                  currentCard.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                  currentCard.difficulty === 'medium' ? 'bg-amber-100 text-amber-800' :
                  'bg-red-100 text-red-800'
                }`}
              >
                {currentCard.difficulty}
              </Badge>
            </div>
            
            {flipped ? (
              <div className="flex flex-col h-full">
                <h3 className="text-lg font-medium mb-4">Answer:</h3>
                <div className="text-xl font-bold mb-4">{currentCard.back}</div>
                <div className="mt-auto">
                  <h4 className="font-medium text-sm">Explanation:</h4>
                  <p className="text-muted-foreground">{currentCard.explanation}</p>
                </div>
                
                <div className="absolute bottom-4 right-4 text-sm text-muted-foreground">
                  Tap to flip back
                </div>
              </div>
            ) : (
              <div className="flex flex-col h-full">
                <h3 className="text-xl font-bold mb-6">{currentCard.front}</h3>
                
                {answerMode === 'typing' ? (
                  <div className="mt-auto">
                    <textarea 
                      className="w-full p-3 border rounded-md"
                      placeholder="Type your answer here..."
                      value={userAnswer}
                      onChange={(e) => setUserAnswer(e.target.value)}
                      onClick={(e) => e.stopPropagation()}
                      rows={3}
                    />
                  </div>
                ) : (
                  <div className="mt-auto flex flex-col items-center">
                    <Button 
                      className="h-16 w-16 rounded-full"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSpeech();
                      }}
                    >
                      <Mic className="h-6 w-6" />
                    </Button>
                    <p className="mt-2 text-center text-sm text-muted-foreground">Tap to speak your answer</p>
                  </div>
                )}
                
                <div className="absolute bottom-4 right-4 text-sm text-muted-foreground">
                  Tap to see answer
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
      
      {flipped && (
        <div className="flex justify-center space-x-4 mb-8">
          <Button 
            className="bg-green-600 hover:bg-green-700"
            onClick={() => handleMasteryResponse('remembered')}
          >
            <Check className="mr-2 h-4 w-4" /> I Remembered
          </Button>
          <Button 
            className="bg-red-600 hover:bg-red-700"
            onClick={() => handleMasteryResponse('forgot')}
          >
            <X className="mr-2 h-4 w-4" /> I Forgot
          </Button>
          <Button 
            variant="outline"
            onClick={() => handleMasteryResponse('needHelp')}
          >
            <Flag className="mr-2 h-4 w-4" /> Need Help
          </Button>
        </div>
      )}
      
      {/* Navigation Controls */}
      <div className="flex justify-between mb-6">
        <Button 
          variant="outline" 
          onClick={handlePrev}
          disabled={currentCardIndex === 0}
        >
          Previous Card
        </Button>
        <Button 
          variant="outline"
          onClick={handleNext}
          disabled={currentCardIndex === mockFlashcardSet.cards.length - 1}
        >
          Next Card
        </Button>
      </div>
      
      {/* Smart Recommendations */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-3">Recommended for You</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4">
              <h3 className="font-medium">Daily Challenge</h3>
              <p className="text-sm text-muted-foreground mb-2">Complete 5 more cards to earn streak points</p>
              <Button size="sm" variant="outline" className="w-full">Start Challenge</Button>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <h3 className="font-medium">Related Concept</h3>
              <p className="text-sm text-muted-foreground mb-2">Integration by Parts</p>
              <Button size="sm" variant="outline" className="w-full">View Concept</Button>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <h3 className="font-medium">Practice Test</h3>
              <p className="text-sm text-muted-foreground mb-2">Test your knowledge with a quick quiz</p>
              <Button size="sm" variant="outline" className="w-full">Take Quiz</Button>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Calculator Modal (simplified) */}
      {showCalculator && (
        <div className="fixed bottom-4 right-4 bg-white dark:bg-gray-900 border rounded-lg shadow-lg p-4 w-64">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium">Calculator</h3>
            <Button variant="ghost" size="sm" onClick={() => setShowCalculator(false)}>✕</Button>
          </div>
          <div className="bg-gray-100 dark:bg-gray-800 rounded p-2 mb-2 h-10 text-right">0</div>
          <div className="grid grid-cols-4 gap-1">
            {['7', '8', '9', '÷', '4', '5', '6', '×', '1', '2', '3', '-', '0', '.', '=', '+'].map((btn) => (
              <Button key={btn} variant="outline" className="h-8 w-full" size="sm">{btn}</Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default InteractiveFlashcard;
