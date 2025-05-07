
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { StudyStreak } from '@/types/student/studyProgress';
import { CalendarClock, Flame, BarChart3, Clock } from 'lucide-react';

interface StudyProgressHeaderProps {
  streak: StudyStreak;
  totalStudyHours: number;
  weeklyAverage: number;
  targetWeekly: number;
}

const StudyProgressHeader: React.FC<StudyProgressHeaderProps> = ({
  streak,
  totalStudyHours,
  weeklyAverage,
  targetWeekly
}) => {
  // Convert minutes to hours:minutes format
  const formatMinutes = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };
  
  // Calculate percentage of weekly target achieved
  const weeklyPercentage = Math.min(100, Math.round((weeklyAverage / targetWeekly) * 100));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardContent className="p-6 flex items-center">
          <Flame className="h-10 w-10 text-amber-500 mr-4" />
          <div>
            <p className="text-sm text-muted-foreground">Current Streak</p>
            <div className="flex items-baseline">
              <p className="text-3xl font-bold">{streak.current}</p>
              <p className="ml-1 text-sm text-muted-foreground">days</p>
            </div>
            <p className="text-xs text-muted-foreground">Longest: {streak.longest} days</p>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6 flex items-center">
          <Clock className="h-10 w-10 text-blue-500 mr-4" />
          <div>
            <p className="text-sm text-muted-foreground">Total Study Time</p>
            <div className="flex items-baseline">
              <p className="text-3xl font-bold">{Math.floor(totalStudyHours / 60)}</p>
              <p className="ml-1 text-sm text-muted-foreground">hours</p>
            </div>
            <p className="text-xs text-muted-foreground">Since you joined</p>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6 flex items-center">
          <CalendarClock className="h-10 w-10 text-purple-500 mr-4" />
          <div>
            <p className="text-sm text-muted-foreground">Weekly Average</p>
            <div className="flex items-baseline">
              <p className="text-3xl font-bold">{formatMinutes(weeklyAverage)}</p>
            </div>
            <p className="text-xs text-muted-foreground">Last 4 weeks</p>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6 flex items-center">
          <BarChart3 className="h-10 w-10 text-green-500 mr-4" />
          <div>
            <p className="text-sm text-muted-foreground">Target Completion</p>
            <div className="flex items-baseline">
              <p className="text-3xl font-bold">{weeklyPercentage}%</p>
            </div>
            <p className="text-xs text-muted-foreground">of {formatMinutes(targetWeekly)} weekly goal</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudyProgressHeader;
