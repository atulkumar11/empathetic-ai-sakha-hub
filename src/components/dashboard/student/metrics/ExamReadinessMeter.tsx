
import React from 'react';
import { Progress } from "@/components/ui/progress";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";
import { formatDistanceToNow } from 'date-fns';

interface ReadinessData {
  conceptCompletion: number;
  flashcardAccuracy: number;
  examScores: {
    physics: number;
    chemistry: number;
    mathematics: number;
  };
  overallReadiness: number;
  timestamp: string;
}

interface ExamReadinessMeterProps {
  readinessData: ReadinessData;
}

const ExamReadinessMeter: React.FC<ExamReadinessMeterProps> = ({ readinessData }) => {
  const { conceptCompletion, flashcardAccuracy, examScores, overallReadiness, timestamp } = readinessData;

  const getColorClass = (value: number) => {
    if (value >= 80) return "text-green-600 dark:text-green-400";
    if (value >= 60) return "text-amber-600 dark:text-amber-400";
    return "text-red-600 dark:text-red-400";
  };
  
  const getProgressColorClass = (value: number) => {
    if (value >= 80) return "bg-green-600 dark:bg-green-500";
    if (value >= 60) return "bg-amber-500 dark:bg-amber-400";
    return "bg-red-500 dark:bg-red-500";
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <div className={`text-xl font-bold ${getColorClass(overallReadiness)}`}>
              {overallReadiness}%
            </div>
            <span className="text-sm text-muted-foreground">Overall Readiness</span>
          </div>
        </div>
        <span className="text-xs text-muted-foreground">
          Updated {formatDistanceToNow(new Date(timestamp))} ago
        </span>
      </div>

      <Progress 
        value={overallReadiness} 
        className={`h-2 ${getProgressColorClass(overallReadiness)}`} 
      />

      <div className="grid grid-cols-3 gap-4 pt-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="p-2 bg-background rounded border text-center">
                <div className="text-xs text-muted-foreground">Concepts</div>
                <div className={`font-medium ${getColorClass(conceptCompletion)}`}>{conceptCompletion}%</div>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs">Concept mastery level</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="p-2 bg-background rounded border text-center">
                <div className="text-xs text-muted-foreground">Flashcards</div>
                <div className={`font-medium ${getColorClass(flashcardAccuracy)}`}>{flashcardAccuracy}%</div>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs">Flashcard recall accuracy</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="p-2 bg-background rounded border text-center">
                <div className="text-xs text-muted-foreground">Practice</div>
                <div className={`font-medium ${getColorClass((examScores.physics + examScores.chemistry + examScores.mathematics) / 3)}`}>
                  {Math.round((examScores.physics + examScores.chemistry + examScores.mathematics) / 3)}%
                </div>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <div className="text-xs space-y-1">
                <p>Practice exam performance</p>
                <p>Physics: {examScores.physics}%</p>
                <p>Chemistry: {examScores.chemistry}%</p>
                <p>Mathematics: {examScores.mathematics}%</p>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default ExamReadinessMeter;
