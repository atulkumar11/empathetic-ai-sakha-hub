
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { ArrowLeft, BookOpen, Star, RotateCw, CheckCircle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const FlashcardInteractivePage: React.FC = () => {
  const { deckId = 'default' } = useParams<{ deckId: string }>();
  const navigate = useNavigate();
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [masteryScore, setMasteryScore] = useState(68);
  
  // Mock flashcard data
  const mockFlashcards = [
    {
      id: '1',
      question: 'What is the law of conservation of energy?',
      answer: 'Energy cannot be created or destroyed, only transformed from one form to another.',
      mastered: true
    },
    {
      id: '2',
      question: 'What is Newton\'s Second Law of Motion?',
      answer: 'Force equals mass times acceleration (F = ma).',
      mastered: false
    },
    {
      id: '3',
      question: 'What is the chemical formula for water?',
      answer: 'H₂O',
      mastered: true
    }
  ];
  
  const handleFlip = () => {
    setFlipped(!flipped);
  };
  
  const handleNextCard = () => {
    if (currentCardIndex < mockFlashcards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setFlipped(false);
    }
  };
  
  const handlePreviousCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
      setFlipped(false);
    }
  };
  
  const handleMarkAsMastered = () => {
    // In a real app, you would update the mastery status in your data store
    setMasteryScore(masteryScore + 2);
  };
  
  return (
    <SharedPageLayout
      title="Interactive Flashcards"
      subtitle="Practice and master your flashcards"
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
      
      {/* Progress indicator */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">
            Card {currentCardIndex + 1} of {mockFlashcards.length}
          </span>
          <span className="text-sm font-medium">{Math.round((currentCardIndex + 1) / mockFlashcards.length * 100)}% Complete</span>
        </div>
        <Progress value={(currentCardIndex + 1) / mockFlashcards.length * 100} className="h-2" />
      </div>
      
      {/* Main content area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {/* Flashcard */}
          <div className="perspective-1000">
            <div 
              className={`relative transition-all duration-500 transform-style-3d cursor-pointer h-[400px] ${flipped ? 'rotate-y-180' : ''}`}
              onClick={handleFlip}
            >
              {/* Front of card - Question */}
              <Card className={`absolute inset-0 backface-hidden p-6 ${flipped ? 'hidden' : ''}`}>
                <CardContent className="flex flex-col items-center justify-center h-full">
                  <div className="text-2xl font-semibold text-center">
                    {mockFlashcards[currentCardIndex].question}
                  </div>
                  <p className="text-sm text-muted-foreground mt-8 animate-pulse">
                    Tap to flip
                  </p>
                </CardContent>
              </Card>
              
              {/* Back of card - Answer */}
              <Card className={`absolute inset-0 backface-hidden p-6 rotate-y-180 ${!flipped ? 'hidden' : ''}`}>
                <CardContent className="flex flex-col items-center justify-center h-full">
                  <div className="text-xl text-center">
                    {mockFlashcards[currentCardIndex].answer}
                  </div>
                  <p className="text-sm text-muted-foreground mt-8 animate-pulse">
                    Tap to flip back
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Navigation controls */}
          <div className="flex justify-between items-center mt-4">
            <Button 
              variant="outline" 
              onClick={handlePreviousCard}
              disabled={currentCardIndex === 0}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>
            
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => {
                  setCurrentCardIndex(0);
                  setFlipped(false);
                }}
              >
                <RotateCw className="h-4 w-4" />
              </Button>
              
              <Button 
                variant="outline" 
                className="flex items-center"
                onClick={handleMarkAsMastered}
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Mark as Mastered
              </Button>
            </div>
            
            <Button 
              onClick={handleNextCard}
              disabled={currentCardIndex === mockFlashcards.length - 1}
            >
              Next
              <ArrowLeft className="h-4 w-4 ml-2 rotate-180" />
            </Button>
          </div>
        </div>
        
        {/* Sidebar */}
        <div className="space-y-6">
          {/* Mastery tracker */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Mastery Progress</CardTitle>
            </CardHeader>
            <CardContent>
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
                      className="text-primary stroke-current"
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
                  <p className="text-sm text-muted-foreground">
                    {masteryScore > 80 ? 'Almost mastered!' : masteryScore > 50 ? 'Good progress!' : 'Keep practicing!'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Study options */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Study Options</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full flex justify-start items-center">
                <Star className="h-4 w-4 mr-2 text-yellow-500" />
                Spaced Repetition
              </Button>
              <Button variant="outline" className="w-full flex justify-start items-center">
                <BookOpen className="h-4 w-4 mr-2 text-blue-500" />
                Quiz Mode
              </Button>
              <Button variant="outline" className="w-full flex justify-start items-center">
                <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                Mastered Cards
              </Button>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-gradient-to-r from-indigo-500 to-purple-500">
                Start Enhanced Practice
              </Button>
            </CardFooter>
          </Card>
        </div>
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

export default FlashcardInteractivePage;
