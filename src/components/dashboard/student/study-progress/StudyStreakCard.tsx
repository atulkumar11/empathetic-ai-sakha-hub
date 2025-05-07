
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Star } from 'lucide-react';

interface StudyStreak {
  current: number;
  longest: number;
  thisWeek: number[];
}

interface StudyStreakCardProps {
  studyStreak: StudyStreak | null;
}

export const StudyStreakCard: React.FC<StudyStreakCardProps> = ({ studyStreak }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Study Streak</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 mb-6">
          <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-full">
            <Star className="h-8 w-8 text-blue-500" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Current Streak</p>
            <h3 className="text-3xl font-bold">{studyStreak?.current || 0} Days</h3>
          </div>
        </div>
        
        <div className="grid grid-cols-7 gap-1 mb-2">
          {studyStreak?.thisWeek.map((hours, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-md flex items-center justify-center ${hours > 0 ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300' : 'bg-gray-100 dark:bg-gray-800 text-gray-400'}`}>
                {hours > 0 ? hours : 0}
              </div>
              <span className="text-xs mt-1">
                {['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}
              </span>
            </div>
          ))}
        </div>
        
        <p className="text-sm text-muted-foreground mt-4">
          Longest streak: <span className="font-bold">{studyStreak?.longest || 0} days</span>
        </p>
      </CardContent>
    </Card>
  );
};
