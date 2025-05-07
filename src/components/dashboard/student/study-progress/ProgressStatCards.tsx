
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2 } from 'lucide-react';

interface ProgressStatCardsProps {
  subjectsLength: number;
  studyStreak: { current: number } | null;
  examGoal: string;
}

export const ProgressStatCards: React.FC<ProgressStatCardsProps> = ({
  subjectsLength,
  studyStreak,
  examGoal
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Daily Study Goal</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold mb-2">4.5 hrs / 6 hrs</div>
          <Progress value={75} className="h-2" />
          <p className="text-sm text-muted-foreground mt-2">75% Completed Today</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Total Subjects</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{subjectsLength}</div>
          <p className="text-sm text-muted-foreground mt-2">
            <span className="text-green-500 font-medium">2 Subjects</span> above 80% mastery
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Quiz Accuracy</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">76%</div>
          <p className="text-sm text-muted-foreground mt-2">
            <span className="text-green-500 font-medium">↑ 12%</span> from last month
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Syllabus Coverage</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">48%</div>
          <p className="text-sm text-muted-foreground mt-2">
            <span className="text-amber-500 font-medium">On Track</span> for {examGoal}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
