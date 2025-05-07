
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Rocket, Brain, Target, Star } from 'lucide-react';

interface SmartSuggestionsCenterProps {
  performance: {
    accuracy: number;
    quizScores: number;
    conceptProgress: number;
    streak: number;
  };
}

export default function SmartSuggestionsCenter({ performance }: SmartSuggestionsCenterProps) {
  const getSuggestion = () => {
    if (performance.accuracy > 80 && performance.quizScores > 85) {
      return {
        icon: <Rocket className="h-5 w-5 text-violet-500" />,
        text: "You're doing amazing! Let's start prepping for more advanced practice exams 📚🚀.",
        color: "bg-violet-50 border-violet-200"
      };
    } else if (performance.conceptProgress > 70 && performance.accuracy < 60) {
      return {
        icon: <Brain className="h-5 w-5 text-emerald-500" />,
        text: "Strong effort! 🧠 Let's revisit your weak flashcards today for sharper recall.",
        color: "bg-emerald-50 border-emerald-200"
      };
    } else if (performance.conceptProgress < 50) {
      return {
        icon: <Target className="h-5 w-5 text-amber-500" />,
        text: "It's okay! 🎯 Focus just on 2 concepts today — small wins will build momentum.",
        color: "bg-amber-50 border-amber-200"
      };
    } else if (performance.streak >= 5) {
      return {
        icon: <Star className="h-5 w-5 text-blue-500" />,
        text: "Consistency is your superpower. 🌟 Let's maintain this streak!",
        color: "bg-blue-50 border-blue-200"
      };
    }
    
    return null;
  };
  
  const suggestion = getSuggestion();

  if (!suggestion) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Brain className="h-5 w-5 text-primary" />
          Smart Suggestions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className={`p-4 rounded-lg ${suggestion.color}`}>
          <div className="flex items-start gap-3">
            {suggestion.icon}
            <p className="text-sm">{suggestion.text}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
