
import React from 'react';
import { TodaysPlanData, TimelineView } from '@/types/student/todaysPlan';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, List, Calendar as CalendarIcon } from 'lucide-react';

interface PlanHeaderProps {
  planData: TodaysPlanData | null;
  activeView: TimelineView;
  setActiveView: (view: TimelineView) => void;
}

const PlanHeader: React.FC<PlanHeaderProps> = ({ planData, activeView, setActiveView }) => {
  if (!planData) return null;

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
      <div>
        <h1 className="text-2xl font-bold">Today's Study Plan</h1>
        <p className="text-muted-foreground">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </p>
      </div>
      
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex items-center mr-4 bg-primary/10 rounded-md px-3 py-1">
          <Clock className="h-4 w-4 mr-2 text-primary" />
          <span className="font-medium">{planData.timeAllocation ? planData.timeAllocation.total || 0 : 0} min</span>
        </div>
        
        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-1 flex">
          <Button
            variant={activeView === 'list' ? 'default' : 'ghost'}
            size="sm"
            className="rounded-md"
            onClick={() => setActiveView('list')}
          >
            <List className="h-4 w-4 mr-1" />
            <span className="hidden sm:inline">List</span>
          </Button>
          <Button
            variant={activeView === 'timeline' ? 'default' : 'ghost'}
            size="sm"
            className="rounded-md"
            onClick={() => setActiveView('timeline')}
          >
            <Clock className="h-4 w-4 mr-1" />
            <span className="hidden sm:inline">Timeline</span>
          </Button>
          <Button
            variant={activeView === 'calendar' ? 'default' : 'ghost'}
            size="sm"
            className="rounded-md"
            onClick={() => setActiveView('calendar')}
          >
            <CalendarIcon className="h-4 w-4 mr-1" />
            <span className="hidden sm:inline">Calendar</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PlanHeader;
