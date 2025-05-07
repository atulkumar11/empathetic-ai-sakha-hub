
import React from 'react';
import { TodaysPlanData } from '@/types/student/todaysPlan';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Clock } from 'lucide-react';

interface ScheduleTimelineProps {
  planData: TodaysPlanData;
}

const ScheduleTimeline: React.FC<ScheduleTimelineProps> = ({ planData }) => {
  // Combine all task types into a single array for the timeline
  const allTasks = [
    ...(planData?.concepts || []).map(task => ({ ...task, type: 'concept' })),
    ...(planData?.flashcards || []).map(task => ({ ...task, type: 'flashcard' })),
    ...(planData?.practiceExams || []).map(task => ({ ...task, type: 'practice-exam' }))
  ];

  // Sort tasks by status (completed first) and then by duration
  const sortedTasks = allTasks.sort((a, b) => {
    if (a.status === 'completed' && b.status !== 'completed') return -1;
    if (a.status !== 'completed' && b.status === 'completed') return 1;
    return a.duration - b.duration;
  });

  const getTaskColor = (type: string, status: string) => {
    const isCompleted = status === 'completed';
    
    switch (type) {
      case 'concept':
        return isCompleted ? 'bg-blue-100 text-blue-800 border-blue-200' : 'bg-blue-50 text-blue-700 border-blue-100';
      case 'flashcard':
        return isCompleted ? 'bg-green-100 text-green-800 border-green-200' : 'bg-green-50 text-green-700 border-green-100';
      case 'practice-exam':
        return isCompleted ? 'bg-purple-100 text-purple-800 border-purple-200' : 'bg-purple-50 text-purple-700 border-purple-100';
      default:
        return isCompleted ? 'bg-gray-100 text-gray-800 border-gray-200' : 'bg-gray-50 text-gray-700 border-gray-100';
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Timeline</CardTitle>
      </CardHeader>
      <CardContent className="pl-6 relative">
        {/* Timeline line */}
        <div className="absolute top-0 bottom-0 left-3 w-[2px] bg-gray-200 dark:bg-gray-700" />

        {sortedTasks.map((task, index) => {
          const isCompleted = task.status === 'completed';
          const taskColor = getTaskColor(task.type as string, task.status);

          return (
            <div key={task.id} className="relative mb-6 last:mb-0">
              {/* Timeline circle */}
              <div className={`absolute -left-3 w-6 h-6 rounded-full flex items-center justify-center 
                ${isCompleted ? 'bg-primary text-white' : 'bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700'}`}>
                {isCompleted ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <div className="h-2 w-2 rounded-full bg-gray-400"></div>
                )}
              </div>

              {/* Task card */}
              <div className={`ml-6 p-3 rounded-lg border ${taskColor}`}>
                <div className="flex justify-between items-start">
                  <h4 className="font-medium">{task.title}</h4>
                  <div className="flex items-center text-xs">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>{task.duration} min</span>
                  </div>
                </div>
                <div className="text-sm mt-1">
                  <span className="font-medium">{task.subject}</span>
                  {task.topic && <span> • {task.topic}</span>}
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default ScheduleTimeline;
