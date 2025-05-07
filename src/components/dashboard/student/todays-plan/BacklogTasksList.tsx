
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Task, TaskType } from '@/types/student/todaysPlan';
import { Play, BookOpen, Brain, FileText } from 'lucide-react';

interface BacklogTasksListProps {
  tasks: Task[];
  onStartTask: (taskId: string) => void;
}

const BacklogTasksList: React.FC<BacklogTasksListProps> = ({ tasks, onStartTask }) => {
  // Get icon based on task type
  const getTaskIcon = (task: Task) => {
    switch (task.type) {
      case TaskType.Concept:
        return <BookOpen className="h-4 w-4 text-purple-500" />;
      case TaskType.Flashcard:
        return <Brain className="h-4 w-4 text-blue-500" />;
      case "practice-exam":
        return <FileText className="h-4 w-4 text-green-500" />;
      default:
        return null;
    }
  };
  
  // Function to group tasks by subject
  const groupTasksBySubject = () => {
    const grouped: Record<string, Task[]> = {};
    
    tasks.forEach(task => {
      if (!grouped[task.subject]) {
        grouped[task.subject] = [];
      }
      grouped[task.subject].push(task);
    });
    
    return grouped;
  };
  
  // Get task title based on type
  const getTaskTitle = (task: Task) => {
    switch (task.type) {
      case TaskType.Concept:
        return task.title;
      case TaskType.Flashcard:
        return task.deckName;
      case "practice-exam":
        return (task as any).examName;
      default:
        return "Unknown task";
    }
  };
  
  const groupedTasks = groupTasksBySubject();

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Backlog Tasks</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {Object.entries(groupedTasks).map(([subject, subjectTasks]) => (
          <div key={subject}>
            <h4 className="font-medium text-sm mb-2">{subject}</h4>
            <div className="space-y-2">
              {subjectTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex items-center space-x-2">
                    {getTaskIcon(task)}
                    <div>
                      <p className="font-medium text-sm">{getTaskTitle(task)}</p>
                      <p className="text-xs text-muted-foreground">{task.timeEstimate}</p>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-8"
                    onClick={() => onStartTask(task.id)}
                  >
                    <Play className="h-3 w-3 mr-1" />
                    Start
                  </Button>
                </div>
              ))}
            </div>
          </div>
        ))}
        
        {tasks.length === 0 && (
          <div className="text-center py-4 text-muted-foreground">
            <p>No backlog tasks remaining.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BacklogTasksList;
