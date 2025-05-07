
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Award, Trophy, Send, RefreshCw } from "lucide-react";
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface DailyWinner {
  name: string;
  avatar: string;
  content: string;
}

interface DailyTeasersProps {
  onLike: () => void;
  dailyWinner: DailyWinner;
}

const DailyTeasers: React.FC<DailyTeasersProps> = ({ onLike, dailyWinner }) => {
  const { toast } = useToast();
  const [selectedTeaser, setSelectedTeaser] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [submitted, setSubmitted] = useState<boolean[]>([false, false, false]);

  const teasers = [
    {
      type: "Chemistry",
      question: "I'm a compound essential for life. I contain carbon, hydrogen, and oxygen. I'm formed by the condensation of two molecules, releasing water. I'm found in pasta, bread, and rice. What am I?",
      answer: "Carbohydrate",
      hint: "I provide energy for the body.",
      difficulty: "Medium"
    },
    {
      type: "Physics",
      question: "I am a fundamental concept in physics. I can be potential or kinetic. According to a famous law, I cannot be created or destroyed, only transformed. What am I?",
      answer: "Energy",
      hint: "E = mc²",
      difficulty: "Easy"
    },
    {
      type: "Mathematics",
      question: "I am a number. When you multiply me by any number, the result remains unchanged. When you add me to any number, the result is that number. What number am I?",
      answer: "0 and 1",
      hint: "Think about the identity elements for multiplication and addition.",
      difficulty: "Hard"
    }
  ];

  const handleSubmit = (index: number) => {
    const newSubmitted = [...submitted];
    newSubmitted[index] = true;
    setSubmitted(newSubmitted);
    
    toast({
      title: "Answer Submitted!",
      description: "Your answer has been recorded. Check back later for results!",
    });
  };

  const handleGetHint = (index: number) => {
    toast({
      title: "Hint",
      description: teasers[index].hint,
    });
  };

  const getNewTeaser = () => {
    toast({
      title: "Coming Soon!",
      description: "New teasers are added daily. Check back tomorrow!",
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
        <div className="flex items-start space-x-4">
          <Avatar className="h-10 w-10 border-2 border-amber-300">
            <AvatarImage src={dailyWinner.avatar} alt={dailyWinner.name} />
            <AvatarFallback>{dailyWinner.name.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center">
              <h3 className="font-medium">Today's Teaser Winner</h3>
              <Trophy className="h-4 w-4 text-amber-500 ml-2" />
            </div>
            <p className="text-sm text-amber-700">{dailyWinner.name} solved the {dailyWinner.content} in record time!</p>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium">Daily Brain Teasers</h2>
        <Button variant="outline" size="sm" onClick={getNewTeaser} className="flex items-center gap-1">
          <RefreshCw className="h-3.5 w-3.5" />
          <span>Get New Teasers</span>
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg">
              {teasers[selectedTeaser].type} Teaser
            </CardTitle>
            <Badge>{teasers[selectedTeaser].difficulty}</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">{teasers[selectedTeaser].question}</p>
          
          <div className="pt-2">
            <Textarea 
              placeholder="Write your answer here..." 
              className="mb-3"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              disabled={submitted[selectedTeaser]}
            />
            
            <div className="flex justify-between">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleGetHint(selectedTeaser)}
                disabled={submitted[selectedTeaser]}
              >
                Get Hint
              </Button>
              <Button 
                size="sm"
                onClick={() => handleSubmit(selectedTeaser)}
                disabled={!userAnswer.trim() || submitted[selectedTeaser]}
                className="flex items-center gap-1"
              >
                <Send className="h-3.5 w-3.5" />
                <span>Submit Answer</span>
              </Button>
            </div>
          </div>
          
          {submitted[selectedTeaser] && (
            <div className="mt-4 p-3 bg-green-50 text-green-800 border border-green-200 rounded-md">
              Thank you for your submission! Check back later to see if you're the daily winner.
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex gap-2 justify-center mt-4">
        {teasers.map((teaser, index) => (
          <Button
            key={index}
            variant={selectedTeaser === index ? "default" : "outline"} 
            size="sm"
            onClick={() => setSelectedTeaser(index)}
          >
            {teaser.type}
          </Button>
        ))}
      </div>

      <div className="flex justify-center pt-2">
        <Button variant="ghost" onClick={onLike} className="flex items-center">
          <Award className="mr-2 h-4 w-4" />
          I enjoyed these teasers!
        </Button>
      </div>
    </div>
  );
};

export default DailyTeasers;
