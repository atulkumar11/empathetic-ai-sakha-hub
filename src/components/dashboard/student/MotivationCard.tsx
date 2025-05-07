
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Lightbulb } from 'lucide-react';
import { MoodType } from '@/types/user/base';

interface MotivationCardProps {
  currentMood?: MoodType;
  className?: string;
}

const MotivationCard: React.FC<MotivationCardProps> = ({ currentMood, className = '' }) => {
  // Fetch a motivation message based on the current mood
  const getMotivationMessage = () => {
    if (!currentMood) {
      return {
        message: "Remember, consistent effort is the key to success. Keep going!",
        suggestion: "Take a short break every 25-30 minutes for optimal focus."
      };
    }

    switch (currentMood) {
      case 'happy':
        return {
          message: "Your positive energy is contagious! It's a great day to tackle challenging concepts.",
          suggestion: "Try taking on that difficult topic you've been putting off."
        };
      case 'motivated':
        return {
          message: "Your drive today is incredible! Channel that energy into productive study sessions.",
          suggestion: "Set ambitious goals for today - you're ready to achieve them!"
        };
      case 'focused':
        return {
          message: "Your concentration is at its peak. Take advantage of this clarity of mind.",
          suggestion: "Dive into complex problems requiring deep thinking and analysis."
        };
      case 'neutral':
        return {
          message: "A balanced mindset provides steady progress. You're in a good place to learn.",
          suggestion: "Maintain your routine and focus on consistent effort today."
        };
      case 'tired':
        return {
          message: "It's okay to feel tired. Quality over quantity is important today.",
          suggestion: "Try shorter, more frequent study sessions with breaks in between."
        };
      case 'anxious':
        return {
          message: "Your anxiety shows you care about your progress. Take a deep breath, you've got this.",
          suggestion: "Start with a brief meditation or try the 5-4-3-2-1 grounding technique."
        };
      case 'stressed':
        return {
          message: "Acknowledge your stress, then direct that energy toward productive tasks.",
          suggestion: "Break down complex tasks into smaller, manageable chunks."
        };
      case 'sad':
        return {
          message: "It's okay to feel down sometimes. Be kind to yourself today.",
          suggestion: "Start with a small, achievable goal to build positive momentum."
        };
      default:
        return {
          message: "Remember, consistent effort is the key to success. Keep going!",
          suggestion: "Take a short break every 25-30 minutes for optimal focus."
        };
    }
  };

  const { message, suggestion } = getMotivationMessage();

  return (
    <Card className={`overflow-hidden border-l-4 border-l-primary ${className}`}>
      <CardContent className="p-4">
        <div className="flex items-start">
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-4 mt-1 flex-shrink-0">
            <Lightbulb className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-medium mb-2">Daily Motivation</h3>
            <p className="text-sm text-muted-foreground mb-3">{message}</p>
            <div className="text-xs bg-muted/50 p-2 rounded mb-3">
              <strong>Suggestion:</strong> {suggestion}
            </div>
            <Button variant="link" className="text-sm p-0 h-auto">
              Get more tips
              <ArrowRight className="h-3 w-3 ml-1" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MotivationCard;
