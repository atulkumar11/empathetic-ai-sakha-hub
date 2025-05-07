
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { AlertCircle, CheckCircle2, LightbulbIcon, Shuffle, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Teaser {
  id: string;
  question: string;
  options?: string[];
  answer: string;
  hint?: string;
  explanation: string;
  category: 'math' | 'logic' | 'wordplay' | 'science' | 'general';
  difficulty: 'easy' | 'medium' | 'hard';
}

const SAMPLE_TEASERS: Teaser[] = [
  {
    id: '1',
    question: 'If 2x + 5 = 15, what is the value of x?',
    options: ['4', '5', '7', '10'],
    answer: '5',
    explanation: 'To solve this equation, we subtract 5 from both sides: 2x + 5 - 5 = 15 - 5, which gives us 2x = 10. Then we divide both sides by 2: 2x/2 = 10/2, which gives us x = 5.',
    category: 'math',
    difficulty: 'easy'
  },
  {
    id: '2',
    question: 'A father\'s age is 3 times his son\'s age. In 10 years, the father\'s age will be twice his son\'s age. How old is the son now?',
    answer: '15',
    hint: 'Let the son\'s current age be x. Set up an equation based on the given conditions.',
    explanation: 'Let x be son\'s current age and 3x be father\'s current age. In 10 years, son will be x+10 and father will be 3x+10. According to the problem, 3x+10 = 2(x+10), which gives us 3x+10 = 2x+20, so x = 10.',
    category: 'math',
    difficulty: 'medium'
  },
  {
    id: '3',
    question: 'What comes once in a minute, twice in a moment, but never in a thousand years?',
    answer: 'The letter M',
    explanation: 'The letter "M" appears once in "minute", twice in "moment", and zero times in "thousand years".',
    category: 'wordplay',
    difficulty: 'medium'
  },
  {
    id: '4',
    question: 'If you have a cube with edges 4 cm long, and you paint all the outside faces, what is the total area that is painted?',
    answer: '96 square cm',
    explanation: 'A cube has 6 faces. Each face has area = side² = 4² = 16 square cm. So total painted area is 6 × 16 = 96 square cm.',
    category: 'math',
    difficulty: 'easy'
  },
  {
    id: '5',
    question: 'Can you rearrange the letters "CIFAIPC" to form the name of an ocean?',
    answer: 'PACIFIC',
    explanation: 'The letters "CIFAIPC" can be rearranged to spell "PACIFIC", which is the name of the Pacific Ocean.',
    category: 'wordplay',
    difficulty: 'easy'
  }
];

const TeasersTab: React.FC = () => {
  const [currentTeaserIndex, setCurrentTeaserIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [submittedAnswer, setSubmittedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const { toast } = useToast();

  const currentTeaser = SAMPLE_TEASERS[currentTeaserIndex];
  
  const handleNextTeaser = () => {
    const nextIndex = (currentTeaserIndex + 1) % SAMPLE_TEASERS.length;
    setCurrentTeaserIndex(nextIndex);
    resetTeaser();
  };
  
  const handleRandomTeaser = () => {
    let nextIndex;
    do {
      nextIndex = Math.floor(Math.random() * SAMPLE_TEASERS.length);
    } while (nextIndex === currentTeaserIndex && SAMPLE_TEASERS.length > 1);
    
    setCurrentTeaserIndex(nextIndex);
    resetTeaser();
  };
  
  const resetTeaser = () => {
    setUserAnswer('');
    setShowAnswer(false);
    setShowHint(false);
    setSubmittedAnswer(null);
    setIsCorrect(null);
  };
  
  const handleSubmitAnswer = () => {
    if (!userAnswer) {
      toast({
        title: "Empty Answer",
        description: "Please enter your answer before submitting",
        variant: "destructive"
      });
      return;
    }
    
    const isAnswerCorrect = userAnswer.toLowerCase() === currentTeaser.answer.toLowerCase();
    setIsCorrect(isAnswerCorrect);
    setSubmittedAnswer(userAnswer);
    
    if (isAnswerCorrect) {
      toast({
        title: "Correct!",
        description: "Great job! That's the right answer.",
        variant: "default"
      });
      
      // In a real app, this would be sent to a backend to track user progress
      // For now, we'll just save to localStorage for demonstration
      const teaserStats = JSON.parse(localStorage.getItem('teaserStats') || '{"correct":0,"attempted":0}');
      teaserStats.correct = (teaserStats.correct || 0) + 1;
      teaserStats.attempted = (teaserStats.attempted || 0) + 1;
      localStorage.setItem('teaserStats', JSON.stringify(teaserStats));
    } else {
      toast({
        title: "Not quite right",
        description: "Keep thinking or check the hint for help.",
        variant: "destructive"
      });
      
      // In a real app, this would be sent to a backend to track user progress
      const teaserStats = JSON.parse(localStorage.getItem('teaserStats') || '{"correct":0,"attempted":0}');
      teaserStats.attempted = (teaserStats.attempted || 0) + 1;
      localStorage.setItem('teaserStats', JSON.stringify(teaserStats));
    }
  };
  
  return (
    <div className="space-y-4">
      <Card className="bg-gradient-to-r from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-900/30 border-amber-200 dark:border-amber-800">
        <CardContent className="pt-4">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center">
              <LightbulbIcon className="h-4 w-4 text-amber-500 mr-1" />
              <span className="text-sm font-medium">
                {currentTeaser.category.charAt(0).toUpperCase() + currentTeaser.category.slice(1)} • 
              </span>
              <span className="ml-1 text-sm">
                {currentTeaser.difficulty.charAt(0).toUpperCase() + currentTeaser.difficulty.slice(1)}
              </span>
            </div>
            <Button variant="ghost" size="sm" onClick={handleRandomTeaser}>
              <Shuffle className="h-3 w-3 mr-1" />
              Random
            </Button>
          </div>
          
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-1">{currentTeaser.question}</h3>
            
            {currentTeaser.options ? (
              <div className="grid grid-cols-2 gap-2 mt-3">
                {currentTeaser.options.map((option, index) => (
                  <Button 
                    key={index} 
                    variant={userAnswer === option ? "default" : "outline"}
                    onClick={() => setUserAnswer(option)}
                    disabled={submittedAnswer !== null}
                    className="justify-start"
                  >
                    {option}
                  </Button>
                ))}
              </div>
            ) : (
              <div className="mt-3">
                <Input 
                  value={userAnswer}
                  onChange={e => setUserAnswer(e.target.value)}
                  placeholder="Type your answer here..."
                  disabled={submittedAnswer !== null}
                />
              </div>
            )}
          </div>
          
          <div className="flex flex-wrap gap-2 mb-3">
            {submittedAnswer === null ? (
              <>
                <Button onClick={handleSubmitAnswer} disabled={!userAnswer}>
                  Submit Answer
                </Button>
                {currentTeaser.hint && (
                  <Button 
                    variant="outline" 
                    onClick={() => setShowHint(!showHint)}
                  >
                    {showHint ? "Hide Hint" : "Show Hint"}
                  </Button>
                )}
              </>
            ) : (
              <Button onClick={handleNextTeaser} className="ml-auto">
                Next Teaser <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
          
          {showHint && currentTeaser.hint && (
            <div className="p-3 bg-amber-100 dark:bg-amber-900/30 rounded-lg mt-3">
              <p className="text-sm italic">{currentTeaser.hint}</p>
            </div>
          )}
          
          {submittedAnswer !== null && (
            <div className={`p-3 mt-3 rounded-lg ${
              isCorrect 
                ? "bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800" 
                : "bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800"
            }`}>
              <div className="flex items-start">
                {isCorrect ? (
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5" />
                )}
                <div>
                  <p className="font-medium">
                    {isCorrect ? "Correct answer!" : "Not quite right"}
                  </p>
                  <p className="text-sm mt-1">
                    {isCorrect ? (
                      "Great job solving this teaser!"
                    ) : (
                      <>
                        The correct answer is: <span className="font-medium">{currentTeaser.answer}</span>
                      </>
                    )}
                  </p>
                  <p className="text-sm mt-2">{currentTeaser.explanation}</p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      
      <div className="text-sm text-center text-gray-500">
        Teasers help improve critical thinking and can boost your exam performance by enhancing logical reasoning.
      </div>
    </div>
  );
};

export default TeasersTab;
