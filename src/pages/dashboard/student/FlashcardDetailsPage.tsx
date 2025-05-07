
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ChevronLeft, ChevronRight, ThumbsUp, ThumbsDown, BookOpen, RotateCcw } from 'lucide-react';

const FlashcardDetailsPage = () => {
  const { flashcardId } = useParams<{ flashcardId: string }>();
  const navigate = useNavigate();
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [loading, setLoading] = useState(true);
  const [flashcardDeck, setFlashcardDeck] = useState<any>(null);
  
  // Mock data for the flashcard deck
  useEffect(() => {
    // This would be an API call in a real application
    setTimeout(() => {
      setFlashcardDeck({
        id: flashcardId,
        title: 'Organic Chemistry Reactions',
        subject: 'Chemistry',
        totalCards: 20,
        cards: [
          {
            id: '1',
            front: 'What is the product of the reaction between an alkene and Br₂?',
            back: 'A vicinal dibromide (1,2-dibromide). This is an example of an electrophilic addition reaction.',
            difficulty: 'medium',
            image: 'https://example.com/alkene-bromine.jpg'
          },
          {
            id: '2',
            front: 'What reagent is used for the hydroboration-oxidation of alkenes?',
            back: 'BH₃·THF followed by H₂O₂/NaOH. This reaction results in the anti-Markovnikov addition of an OH group.',
            difficulty: 'hard',
            image: 'https://example.com/hydroboration.jpg'
          },
          {
            id: '3',
            front: 'What is the Grignard reagent?',
            back: 'An organomagnesium compound with the general formula R-Mg-X, where X is a halogen. It\'s used to form new carbon-carbon bonds.',
            difficulty: 'medium',
            image: 'https://example.com/grignard.jpg'
          },
          {
            id: '4',
            front: 'What is the major product when propene reacts with HBr in the presence of peroxides?',
            back: '1-bromopropane. This is an anti-Markovnikov addition caused by the radical mechanism.',
            difficulty: 'hard',
            image: null
          },
          {
            id: '5',
            front: 'Define nucleophilic substitution reaction.',
            back: 'A reaction in which a nucleophile replaces a leaving group in an organic molecule. Common types include SN1 and SN2 reactions.',
            difficulty: 'easy',
            image: null
          }
        ]
      });
      setLoading(false);
    }, 1000);
  }, [flashcardId]);
  
  const handleNextCard = () => {
    if (currentCardIndex < (flashcardDeck?.cards.length || 0) - 1) {
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
  
  const handleFlip = () => {
    setFlipped(!flipped);
  };
  
  const handleKnowIt = () => {
    // In a real app, this would update the card's status in the user's progress data
    handleNextCard();
  };
  
  const handleStudyAgain = () => {
    // In a real app, this would mark the card for review and update the user's progress
    handleNextCard();
  };
  
  const handleRestart = () => {
    setCurrentCardIndex(0);
    setFlipped(false);
  };
  
  if (loading) {
    return (
      <SharedPageLayout
        title="Loading Flashcards..."
        subtitle="Please wait while we prepare your study materials"
      >
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </SharedPageLayout>
    );
  }
  
  if (!flashcardDeck) {
    return (
      <SharedPageLayout
        title="Flashcard Not Found"
        subtitle="The flashcard deck you're looking for doesn't exist or has been removed"
      >
        <Button 
          onClick={() => navigate('/dashboard/student/flashcards')}
          className="mt-4"
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Back to Flashcards
        </Button>
      </SharedPageLayout>
    );
  }
  
  const currentCard = flashcardDeck.cards[currentCardIndex];
  const progress = Math.round(((currentCardIndex + 1) / flashcardDeck.cards.length) * 100);

  return (
    <SharedPageLayout
      title={flashcardDeck.title}
      subtitle={`${flashcardDeck.subject} • ${flashcardDeck.totalCards} flashcards`}
      showQuickAccess={false}
    >
      <div className="mb-6">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => navigate('/dashboard/student/flashcards')}
          className="flex items-center gap-1"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Flashcards
        </Button>
      </div>
      
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">
            Card {currentCardIndex + 1} of {flashcardDeck.cards.length}
          </span>
          <span className="text-sm font-medium">{progress}% Complete</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>
      
      <div className="flex justify-center">
        <div className="w-full max-w-3xl perspective-1000">
          <div 
            className={`relative transition-transform duration-500 transform-style-3d cursor-pointer ${flipped ? 'rotate-y-180' : ''}`}
            style={{ height: '400px' }}
            onClick={handleFlip}
          >
            {/* Front of card */}
            <Card className={`absolute inset-0 backface-hidden p-6 flex flex-col items-center justify-center ${flipped ? 'hidden' : ''}`}>
              <CardContent className="text-center p-6 flex-1 flex flex-col justify-center items-center">
                <div className="text-2xl font-semibold mb-6">
                  {currentCard.front}
                </div>
                {currentCard.image && (
                  <div className="mt-4 max-w-full">
                    <img 
                      src={currentCard.image} 
                      alt="Flashcard illustration" 
                      className="max-h-40 rounded-lg object-contain"
                    />
                  </div>
                )}
                <p className="text-sm text-muted-foreground mt-8">
                  Click the card to flip it and see the answer
                </p>
              </CardContent>
            </Card>
            
            {/* Back of card */}
            <Card className={`absolute inset-0 backface-hidden p-6 flex flex-col items-center justify-center rotate-y-180 ${!flipped ? 'hidden' : ''}`}>
              <CardContent className="text-center p-6 flex-1 flex flex-col justify-center items-center">
                <div className="text-xl mb-6">
                  {currentCard.back}
                </div>
                {currentCard.image && (
                  <div className="mt-4 max-w-full">
                    <img 
                      src={currentCard.image} 
                      alt="Flashcard explanation" 
                      className="max-h-40 rounded-lg object-contain"
                    />
                  </div>
                )}
                <div className="mt-8 flex justify-center gap-4">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex items-center gap-2 text-red-500 hover:bg-red-50 hover:text-red-600" 
                    onClick={(e) => { e.stopPropagation(); handleStudyAgain(); }}
                  >
                    <ThumbsDown className="h-4 w-4" />
                    Study Again
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex items-center gap-2 text-green-500 hover:bg-green-50 hover:text-green-600" 
                    onClick={(e) => { e.stopPropagation(); handleKnowIt(); }}
                  >
                    <ThumbsUp className="h-4 w-4" />
                    I Know It
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <div className="mt-8 flex justify-center gap-4">
        <Button 
          variant="outline" 
          size="icon"
          onClick={handlePreviousCard}
          disabled={currentCardIndex === 0}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <Button 
          variant="outline" 
          onClick={handleRestart}
          className="flex items-center gap-2"
        >
          <RotateCcw className="h-4 w-4" />
          Restart
        </Button>
        <Button 
          variant="outline" 
          size="icon"
          onClick={handleNextCard}
          disabled={currentCardIndex === flashcardDeck.cards.length - 1}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>
      
      <CardFooter className="mt-8 justify-center">
        <Button
          className="bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center gap-2"
          onClick={() => navigate('/dashboard/student/flashcards')}
        >
          <BookOpen className="h-4 w-4" />
          View All Flashcards
        </Button>
      </CardFooter>
    </SharedPageLayout>
  );
};

export default FlashcardDetailsPage;
