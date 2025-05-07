
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StudyBlock, Task, TaskType, TaskStatus } from '@/types/student/todaysPlan';
import { CheckCircle, Clock, BookOpen, Brain, FileText, Bookmark, AlertCircle } from 'lucide-react';
import { MoodType } from '@/types/user/base';

interface DailyPlanBreakdownProps {
  currentBlock?: StudyBlock;
  completedBlocks: StudyBlock[];
  upcomingBlocks: StudyBlock[];
  onMarkCompleted: (id: string, type: TaskType | "practice-exam") => void;
  onBookmark: (title: string, type: TaskType | "exam") => void;
  currentMood?: MoodType;
}

const DailyPlanBreakdown: React.FC<DailyPlanBreakdownProps> = ({
  currentBlock,
  completedBlocks,
  upcomingBlocks,
  onMarkCompleted,
  onBookmark,
  currentMood
}) => {
  const getTaskIcon = (task: Task) => {
    switch (task.type) {
      case TaskType.Concept:
        return <BookOpen className="h-4 w-4 mr-2" />;
      case TaskType.Flashcard:
        return <Brain className="h-4 w-4 mr-2" />;
      case "practice-exam":
        return <FileText className="h-4 w-4 mr-2" />;
      default:
        return <Clock className="h-4 w-4 mr-2" />;
    }
  };
  
  const getTaskTitle = (task: Task) => {
    switch (task.type) {
      case TaskType.Concept:
        return task.title;
      case TaskType.Flashcard:
        return `${task.deckName} Flashcards`;
      case "practice-exam":
        return task.examName;
      default:
        return "Unknown task";
    }
  };
  
  const renderStudyBlock = (block: StudyBlock, status: 'current' | 'completed' | 'upcoming') => {
    // Get border color based on status
    const getBorderColor = () => {
      if (status === 'current') return "border-blue-300 dark:border-blue-700";
      if (status === 'completed') return "border-green-300 dark:border-green-700";
      return "border-gray-300 dark:border-gray-700";
    };
    
    // Get background color based on status
    const getBackgroundColor = () => {
      if (status === 'current') return "bg-blue-50 dark:bg-blue-900/20";
      if (status === 'completed') return "bg-green-50 dark:bg-green-900/20";
      return "bg-gray-50 dark:bg-gray-800/50";
    };
    
    return (
      <Card key={block.startTime} className={`${getBorderColor()} mb-4`}>
        <CardHeader className={`${getBackgroundColor()} pb-3`}>
          <CardTitle className="text-base flex items-center justify-between">
            <span>
              {block.startTime} - {block.endTime}
              {status === 'current' && <span className="ml-2 text-xs bg-blue-500 text-white px-2 py-0.5 rounded-full">Current</span>}
            </span>
            
            {block.mood && (
              <span className="text-sm px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center">
                {block.mood === MoodType.Happy && "😊 Happy"}
                {block.mood === MoodType.Motivated && "💪 Motivated"}
                {block.mood === MoodType.Focused && "🧠 Focused"}
                {block.mood === MoodType.Neutral && "😐 Neutral"}
                {block.mood === MoodType.Tired && "😴 Tired"}
                {block.mood === MoodType.Anxious && "😰 Anxious"}
                {block.mood === MoodType.Stressed && "😓 Stressed"}
                {block.mood === MoodType.Sad && "😢 Sad"}
              </span>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {block.tasks.map((task) => (
              <li 
                key={task.id} 
                className={`p-2 rounded-md border ${
                  task.status === TaskStatus.Completed 
                    ? 'bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-800' 
                    : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {getTaskIcon(task)}
                    <span className="font-medium">{getTaskTitle(task)}</span>
                    <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">{task.subject}</span>
                    <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">{task.timeEstimate}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {task.status !== TaskStatus.Completed && status !== 'completed' && (
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="h-8 px-2"
                        onClick={() => onBookmark(getTaskTitle(task), task.type)}
                      >
                        <Bookmark className="h-4 w-4" />
                      </Button>
                    )}
                    
                    {task.status !== TaskStatus.Completed && status !== 'completed' && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="h-8"
                        onClick={() => onMarkCompleted(task.id, task.type)}
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Complete
                      </Button>
                    )}
                    
                    {task.status === TaskStatus.Completed && (
                      <span className="text-green-600 dark:text-green-400 flex items-center text-sm">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Completed
                      </span>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-4">
      {currentMood && currentMood === MoodType.Tired && (
        <Card className="border-amber-300 bg-amber-50 dark:bg-amber-900/20 dark:border-amber-700 mb-4">
          <CardContent className="p-4">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 mr-2 text-amber-600 dark:text-amber-400" />
              <p className="text-amber-800 dark:text-amber-300">You seem tired today. We've adjusted your plan with more breaks and focused on review tasks.</p>
            </div>
          </CardContent>
        </Card>
      )}
      
      {currentBlock && renderStudyBlock(currentBlock, 'current')}
      
      {completedBlocks.length > 0 && (
        <>
          <h3 className="text-lg font-semibold mt-6">Completed</h3>
          {completedBlocks.map(block => renderStudyBlock(block, 'completed'))}
        </>
      )}
      
      {upcomingBlocks.length > 0 && (
        <>
          <h3 className="text-lg font-semibold mt-6">Up Next</h3>
          {upcomingBlocks.map(block => renderStudyBlock(block, 'upcoming'))}
        </>
      )}
    </div>
  );
};

export default DailyPlanBreakdown;
