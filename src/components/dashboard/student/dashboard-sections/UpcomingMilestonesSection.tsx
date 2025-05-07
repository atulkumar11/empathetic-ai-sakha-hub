
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, CheckCircle2, BarChart, Award } from 'lucide-react';
import { Milestone } from '@/types/student/dashboard';

export interface UpcomingMilestonesSectionProps {
  milestones: Milestone[];
}

const UpcomingMilestonesSection: React.FC<UpcomingMilestonesSectionProps> = ({ milestones }) => {
  // Get the icon for each milestone type
  const getMilestoneIcon = (type: string) => {
    switch (type) {
      case 'weekly-target':
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case 'practice-exam':
        return <BarChart className="h-4 w-4 text-blue-500" />;
      case 'performance-check':
        return <Award className="h-4 w-4 text-amber-500" />;
      default:
        return <Calendar className="h-4 w-4 text-violet-500" />;
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center">
          <Calendar className="mr-2 h-5 w-5 text-violet-500" />
          <CardTitle className="text-lg font-medium">Upcoming Milestones</CardTitle>
        </div>
        <Button variant="ghost" size="sm" className="text-violet-500 hover:text-violet-600">
          View All
        </Button>
      </CardHeader>
      
      <CardContent>
        <div className="text-sm text-muted-foreground mb-4">
          Track your progress towards these important milestones
        </div>
        
        <div className="space-y-3">
          {milestones.map(milestone => (
            <div 
              key={milestone.id}
              className="p-3 border rounded-lg bg-gradient-to-r from-blue-50/50 to-white dark:from-blue-900/10 dark:to-gray-800/50"
            >
              <div className="flex items-center gap-2 mb-1.5">
                {getMilestoneIcon(milestone.type)}
                <div className="font-medium">{milestone.title}</div>
              </div>
              
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                {milestone.description}
              </p>
              
              <div className="flex items-center justify-between text-xs">
                <span className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 rounded-full px-2 py-0.5">
                  Due: {milestone.date}
                </span>
                
                <Button size="sm" className="h-7 text-xs">
                  {milestone.completed ? "Completed" : "View Details"}
                </Button>
              </div>
            </div>
          ))}
          
          {milestones.length === 0 && (
            <div className="text-center py-6 text-muted-foreground">
              No upcoming milestones
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default UpcomingMilestonesSection;
