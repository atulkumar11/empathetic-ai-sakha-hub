
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Clock, BookOpen, BookMarked, GraduationCap } from "lucide-react";
import { ConceptTask, FlashcardTask, PracticeExamTask, TaskStatus } from "@/types/student/todaysPlans";

interface SubjectTaskItemProps {
  task: ConceptTask | FlashcardTask | PracticeExamTask;
  type: 'concept' | 'flashcard' | 'practice-exam';
}

const SubjectTaskItem: React.FC<SubjectTaskItemProps> = ({ task, type }) => {
  // Helper function to format duration in minutes to a readable format
  const formatDuration = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes} min`;
    } else {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
    }
  };
  
  // Get status badge component
  const getStatusBadge = (status: TaskStatus) => {
    if (status === "completed") {
      return <Badge variant="outline" className="bg-green-50 border-green-200 text-green-700">Completed</Badge>;
    } else if (status === "in-progress") {
      return <Badge variant="outline" className="bg-blue-50 border-blue-200 text-blue-700">In Progress</Badge>;
    } else if (status === "viewed") {
      return <Badge variant="outline" className="bg-yellow-50 border-yellow-200 text-yellow-700">Viewed</Badge>;
    } else {
      return <Badge variant="outline" className="bg-gray-50 border-gray-200 text-gray-700">Pending</Badge>;
    }
  };
  
  // Get type-specific details for the task
  const getTaskDetails = () => {
    if (type === 'flashcard') {
      const flashcardTask = task as FlashcardTask;
      return (
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span>{flashcardTask.cardCount || 0} cards</span>
          {flashcardTask.recallAccuracy !== undefined && (
            <>
              <span>•</span>
              <span>{flashcardTask.recallAccuracy}% recall</span>
            </>
          )}
        </div>
      );
    } else if (type === 'practice-exam') {
      const examTask = task as PracticeExamTask;
      return (
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span>{examTask.questionCount || 10} questions</span>
          <span>•</span>
          <span>{examTask.timeLimit || 30} min</span>
          {examTask.lastScore !== undefined && (
            <>
              <span>•</span>
              <span>Last score: {examTask.lastScore}%</span>
            </>
          )}
        </div>
      );
    } else {
      // Concept task details (default)
      return (
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span>{formatDuration(task.duration)}</span>
          {task.difficulty && (
            <>
              <span>•</span>
              <span>{task.difficulty}</span>
            </>
          )}
        </div>
      );
    }
  };
  
  // Get icon component based on task type
  const getTaskIcon = () => {
    if (type === 'concept') {
      return <BookOpen className="h-4 w-4 text-blue-500" />;
    } else if (type === 'flashcard') {
      return <BookMarked className="h-4 w-4 text-amber-500" />;
    } else {
      return <GraduationCap className="h-4 w-4 text-green-500" />;
    }
  };

  return (
    <div className="border border-gray-200 rounded-lg hover:border-blue-200 transition-colors p-3">
      <div className="flex justify-between items-start">
        <div className="flex items-start gap-3">
          <div className="mt-1">{getTaskIcon()}</div>
          
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-medium">{task.title}</h4>
              {task.chapter && (
                <Badge variant="outline" className="bg-gray-50 text-gray-600 border-gray-200">
                  Ch. {task.chapter}
                </Badge>
              )}
            </div>
            
            {getTaskDetails()}
            
            {/* Progress bar for tasks in progress */}
            {'completionPercent' in task && task.status !== "completed" && (
              <div className="mt-3">
                <Progress 
                  value={task.completionPercent} 
                  className="h-2"
                />
              </div>
            )}
          </div>
        </div>
        
        <div className="flex flex-col items-end gap-2">
          {getStatusBadge(task.status)}
          
          {task.status !== "completed" ? (
            <Button variant="outline" size="sm" className="h-8 mt-1">
              {task.status === "in-progress" ? "Continue" : "Start"}
            </Button>
          ) : (
            <Button variant="ghost" size="sm" className="h-8 mt-1">
              Review
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubjectTaskItem;
