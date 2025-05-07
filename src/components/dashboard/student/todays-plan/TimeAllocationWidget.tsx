
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface TimeAllocationWidgetProps {
  totalTime: number;
  usedTime: number;
  remainingTime: number;
}

const TimeAllocationWidget: React.FC<TimeAllocationWidgetProps> = ({ 
  totalTime, 
  usedTime, 
  remainingTime 
}) => {
  const progressPercentage = Math.round((usedTime / totalTime) * 100);
  
  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">Today's Study Time Allocation</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between text-sm mb-1">
          <span className="text-muted-foreground">Used: {usedTime}min</span>
          <span className="text-muted-foreground">Remaining: {remainingTime}min</span>
        </div>
        <Progress value={progressPercentage} className="h-2" />
        <div className="mt-2 text-xs text-right text-muted-foreground">
          <span>{progressPercentage}% of daily goal ({totalTime}min)</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default TimeAllocationWidget;
