
import React from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Clock, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface FlashcardCardProps {
  id: string;
  title: string;
  subject: string;
  totalCards: number;
  completedCards: number;
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedTime: number;
  accuracy?: number;
}

export default function FlashcardCard({
  id,
  title,
  subject,
  totalCards,
  completedCards,
  difficulty,
  estimatedTime,
  accuracy
}: FlashcardCardProps) {
  const progressPercentage = (completedCards / totalCards) * 100;

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'easy': return 'text-green-600 bg-green-100 dark:bg-green-900/30';
      case 'medium': return 'text-amber-600 bg-amber-100 dark:bg-amber-900/30';
      case 'hard': return 'text-red-600 bg-red-100 dark:bg-red-900/30';
      default: return 'text-slate-600 bg-slate-100';
    }
  };

  const getBorderColorClass = (diff: string) => {
    switch (diff) {
      case 'easy': return 'border-l-green-500';
      case 'medium': return 'border-l-amber-500';
      case 'hard': return 'border-l-red-500';
      default: return 'border-l-slate-500';
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className={`overflow-hidden border-l-4 ${getBorderColorClass(difficulty)} shadow-sm hover:shadow-md transition-shadow`}>
        <div className="bg-gradient-to-r from-violet-100 to-blue-100 dark:from-violet-950 dark:to-blue-950 p-4">
          <div className="flex items-start justify-between">
            <div>
              <Badge 
                variant="outline" 
                className={getDifficultyColor(difficulty)}
              >
                {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
              </Badge>
              <h3 className="text-lg font-semibold mt-2">{title}</h3>
              <p className="text-sm text-muted-foreground">{subject}</p>
            </div>
            <Star className="h-5 w-5 text-amber-500" />
          </div>
        </div>

        <CardContent className="pt-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span>{completedCards}/{totalCards} cards</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
            
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-slate-500" />
                <span className="text-sm">{estimatedTime}m</span>
              </div>
              {accuracy !== undefined && (
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-slate-500" />
                  <span className="text-sm">{accuracy}% accuracy</span>
                </div>
              )}
            </div>
          </div>
        </CardContent>

        <CardFooter className="bg-gray-50 dark:bg-gray-900/50">
          <div className="w-full flex items-center justify-between">
            <Button variant="ghost" size="sm">
              View Details
            </Button>
            <Link to={`/dashboard/student/flashcards/${id}/interactive`}>
              <Button>
                Study Now
              </Button>
            </Link>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
