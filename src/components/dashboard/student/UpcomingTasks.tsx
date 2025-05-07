
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, BookOpen, Brain, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

interface Task {
  id: string;
  title: string;
  subject: string;
  type: 'concept' | 'flashcard' | 'exam';
  timeEstimate: number;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
}

interface UpcomingTasksProps {
  tasks: Task[];
}

const UpcomingTasks: React.FC<UpcomingTasksProps> = ({ tasks }) => {
  const getTaskIcon = (type: string) => {
    switch (type) {
      case 'concept':
        return <BookOpen className="h-5 w-5 text-blue-500" />;
      case 'flashcard':
        return <Brain className="h-5 w-5 text-violet-500" />;
      case 'exam':
        return <FileText className="h-5 w-5 text-emerald-500" />;
      default:
        return <BookOpen className="h-5 w-5" />;
    }
  };

  const getPriorityClass = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-l-4 border-l-red-500';
      case 'medium':
        return 'border-l-4 border-l-yellow-500';
      case 'low':
        return 'border-l-4 border-l-blue-500';
      default:
        return '';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Tasks</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {tasks.map(task => (
            <div 
              key={task.id} 
              className={cn("border rounded-lg p-3 hover:shadow-sm transition-shadow", 
                getPriorityClass(task.priority)
              )}
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-3">
                  {getTaskIcon(task.type)}
                  <div>
                    <h3 className="font-medium">{task.title}</h3>
                    <p className="text-sm text-gray-500">{task.subject}</p>
                  </div>
                </div>
                <Badge variant="outline">{task.type}</Badge>
              </div>
              
              <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>{task.timeEstimate} min</span>
                <div className="ml-auto text-xs">Due: {task.dueDate}</div>
              </div>
              
              <Button className="w-full mt-3" size="sm">Start Now</Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default UpcomingTasks;
