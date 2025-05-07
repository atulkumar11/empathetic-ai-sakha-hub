
import React from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Clock, FileText, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface ExamCardProps {
  id: string;
  title: string;
  subject: string;
  questions: number;
  duration: number;
  difficulty: 'easy' | 'medium' | 'hard';
  completionStatus?: {
    isCompleted: boolean;
    score?: number;
    date?: string;
  };
}

export default function ExamCard({
  id,
  title,
  subject,
  questions,
  duration,
  difficulty,
  completionStatus
}: ExamCardProps) {
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
        <div className="bg-gradient-to-r from-purple-100 to-indigo-100 dark:from-purple-950 dark:to-indigo-950 p-4">
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
            <FileText className="h-5 w-5 text-purple-500" />
          </div>
        </div>

        <CardContent className="pt-4">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Questions</p>
                <p className="font-medium">{questions}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Duration</p>
                <p className="font-medium">{duration} min</p>
              </div>
            </div>

            {completionStatus?.isCompleted && (
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-900 rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-green-800 dark:text-green-200">
                    Completed
                  </span>
                  {completionStatus.score && (
                    <Badge variant="outline" className="bg-green-100 text-green-800">
                      Score: {completionStatus.score}%
                    </Badge>
                  )}
                </div>
                {completionStatus.date && (
                  <p className="text-xs text-green-600 dark:text-green-300 mt-1">
                    {new Date(completionStatus.date).toLocaleDateString()}
                  </p>
                )}
              </div>
            )}
          </div>
        </CardContent>

        <CardFooter className="bg-gray-50 dark:bg-gray-900/50">
          <div className="w-full flex items-center justify-between">
            <Link to={`/dashboard/student/practice-exam/${id}/review`}>
              <Button variant="ghost" size="sm">
                {completionStatus?.isCompleted ? 'View Analysis' : 'View Details'}
              </Button>
            </Link>
            <Link to={`/dashboard/student/practice-exam/${id}/start`}>
              <Button>
                {completionStatus?.isCompleted ? 'Retake Exam' : 'Start Exam'}
              </Button>
            </Link>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
