
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { TimelineView, TodaysPlanData } from "@/types/student/todaysPlan";
import { Calendar, Clock, CalendarDays, CalendarRange } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface TodaysPlanHeaderProps {
  planData: TodaysPlanData | null;
  isLoading: boolean;
  activeView: TimelineView;
  onChangeView: (view: TimelineView) => void;
}

export default function TodaysPlanHeader({
  planData,
  isLoading,
  activeView,
  onChangeView
}: TodaysPlanHeaderProps) {
  const getTimeframeIcon = (view: TimelineView) => {
    switch(view) {
      case 'daily': return <Calendar className="h-4 w-4" />;
      case 'weekly': return <CalendarDays className="h-4 w-4" />;
      case 'monthly': return <CalendarRange className="h-4 w-4" />;
      default: return <Calendar className="h-4 w-4" />;
    }
  };
  
  if (isLoading) {
    return (
      <div className="space-y-3">
        <Skeleton className="h-7 w-3/4" />
        <Skeleton className="h-10 w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div>
        <h3 className="text-base text-muted-foreground">
          Hi <span className="font-medium text-foreground">{planData?.userName}</span>, 
          here's your personalized daily plan based on your{" "}
          <Badge variant="outline" className="font-normal">📌 {planData?.examGoal}</Badge>
          {" "}exam goal and <Badge variant="outline" className="font-normal">🧮 current progress</Badge>.
        </h3>
      </div>
      
      <Tabs value={activeView} onValueChange={(value) => onChangeView(value as TimelineView)} className="w-full">
        <TabsList className="w-full grid grid-cols-3 h-11">
          <TabsTrigger value="daily" className="flex items-center gap-1.5">
            {getTimeframeIcon('daily')}
            <span>🔹 Today</span>
          </TabsTrigger>
          <TabsTrigger value="weekly" className="flex items-center gap-1.5">
            {getTimeframeIcon('weekly')}
            <span>🔸 Weekly</span>
          </TabsTrigger>
          <TabsTrigger value="monthly" className="flex items-center gap-1.5">
            {getTimeframeIcon('monthly')}
            <span>🔸 Monthly</span>
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}
