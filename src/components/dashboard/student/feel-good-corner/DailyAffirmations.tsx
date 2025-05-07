
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ThumbsUp, RefreshCw, Quote } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface DailyAffirmationsProps {
  onLike: () => void;
}

const DailyAffirmations: React.FC<DailyAffirmationsProps> = ({ onLike }) => {
  const { toast } = useToast();
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const affirmations = [
    {
      text: "I am capable of understanding even the most complex topics when I apply myself.",
      theme: "Academic Success",
      background: "bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20"
    },
    {
      text: "My dedication to learning will lead me to achieve my goals and dreams.",
      theme: "Persistence",
      background: "bg-gradient-to-r from-green-100 to-teal-100 dark:from-green-900/20 dark:to-teal-900/20"
    },
    {
      text: "I embrace challenges as opportunities to grow and improve.",
      theme: "Growth Mindset",
      background: "bg-gradient-to-r from-orange-100 to-amber-100 dark:from-orange-900/20 dark:to-amber-900/20"
    },
    {
      text: "Each study session brings me one step closer to mastery.",
      theme: "Progress",
      background: "bg-gradient-to-r from-pink-100 to-red-100 dark:from-pink-900/20 dark:to-red-900/20"
    },
    {
      text: "I have the strength to persist even when the material is challenging.",
      theme: "Resilience",
      background: "bg-gradient-to-r from-indigo-100 to-violet-100 dark:from-indigo-900/20 dark:to-violet-900/20"
    }
  ];
  
  const nextAffirmation = () => {
    setCurrentIndex((prev) => (prev + 1) % affirmations.length);
  };
  
  const saveAffirmation = () => {
    toast({
      title: "Affirmation Saved",
      description: "This affirmation has been added to your collection"
    });
  };
  
  return (
    <div className="space-y-6">
      <Card className={`overflow-hidden ${affirmations[currentIndex].background}`}>
        <CardContent className="p-10 flex flex-col items-center text-center">
          <Quote className="h-10 w-10 text-primary/50 mb-4" />
          <blockquote className="text-2xl font-medium mb-6">
            {affirmations[currentIndex].text}
          </blockquote>
          <div className="border border-primary/20 rounded-full px-3 py-1 text-sm">
            {affirmations[currentIndex].theme}
          </div>
        </CardContent>
      </Card>
      
      <div className="flex flex-col sm:flex-row justify-between gap-3">
        <Button variant="outline" onClick={nextAffirmation}>
          <RefreshCw className="h-4 w-4 mr-2" /> Show Another
        </Button>
        <div className="flex gap-3">
          <Button variant="outline" onClick={saveAffirmation}>
            Save to Collection
          </Button>
          <Button onClick={onLike}>
            <ThumbsUp className="h-4 w-4 mr-2" /> Like This Activity
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-6">
        <Card>
          <CardContent className="p-4 text-center">
            <h3 className="font-medium mb-2">Today's Focus</h3>
            <p className="text-sm text-muted-foreground">
              Remember to celebrate small victories in your study session
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <h3 className="font-medium mb-2">Weekly Theme</h3>
            <p className="text-sm text-muted-foreground">
              Building resilience through consistent effort
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <h3 className="font-medium mb-2">Community Favorite</h3>
            <p className="text-sm text-muted-foreground">
              "I transform challenges into stepping stones to success"
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          Daily affirmations help reinforce positive thinking and improve focus during study sessions
        </p>
      </div>
    </div>
  );
};

export default DailyAffirmations;
