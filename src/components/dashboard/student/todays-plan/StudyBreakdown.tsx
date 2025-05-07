
import React from 'react';
import { TodaysPlanData } from '@/types/student/todaysPlan';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface StudyBreakdownProps {
  planData: TodaysPlanData;
}

const StudyBreakdown: React.FC<StudyBreakdownProps> = ({ planData }) => {
  const totalTasks = planData?.totalTasks || 0;
  const completedTasks = planData?.completedTasks || 0;
  const progressPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <Card>
      <CardContent className="p-4 space-y-4">
        <div>
          <div className="flex justify-between items-center mb-1">
            <h3 className="font-medium">Overall Progress</h3>
            <span className="text-sm font-medium">
              {completedTasks}/{totalTasks} tasks
            </span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>

        <div className="grid grid-cols-3 gap-2 text-center text-sm">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded-md">
            <div className="font-semibold text-blue-600 dark:text-blue-400">
              {planData?.concepts?.length || 0}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Concepts</div>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 p-2 rounded-md">
            <div className="font-semibold text-green-600 dark:text-green-400">
              {planData?.flashcards?.length || 0}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Flashcards</div>
          </div>
          <div className="bg-purple-50 dark:bg-purple-900/20 p-2 rounded-md">
            <div className="font-semibold text-purple-600 dark:text-purple-400">
              {planData?.practiceExams?.length || 0}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Practice Exams</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StudyBreakdown;
