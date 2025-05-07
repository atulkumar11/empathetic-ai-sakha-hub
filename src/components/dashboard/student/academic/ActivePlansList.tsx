
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, ChevronRight, Clock } from 'lucide-react';
import { StudyPlan } from '@/types/user/studyPlan';

interface ActivePlansListProps {
  plans: StudyPlan[];
}

const ActivePlansList: React.FC<ActivePlansListProps> = ({ plans }) => {
  if (!plans || plans.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground">
            No active study plans. Create a new plan to get started.
          </p>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <>
      {plans.map((plan) => (
        <Card key={plan.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="col-span-2">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-lg font-semibold">{plan.examGoal}</h3>
                    <p className="text-sm text-muted-foreground">
                      Created on {new Date(plan.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                    Active
                  </Badge>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between items-center text-sm">
                    <span>Progress</span>
                    <span className="font-medium">{plan.progressPercentage}%</span>
                  </div>
                  <Progress value={plan.progressPercentage} className="h-2" />
                </div>
                
                <div className="flex flex-wrap gap-3">
                  <div className="flex items-center text-sm">
                    <CalendarDays className="h-4 w-4 mr-1 text-muted-foreground" />
                    <span>{plan.daysLeft} days left</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                    <span>{plan.studyHoursPerDay} hours/day</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col justify-between md:items-end space-y-4">
                <div className="space-y-2 w-full md:text-right">
                  <h4 className="text-sm font-medium text-muted-foreground">Subjects</h4>
                  <div className="flex flex-wrap gap-2 md:justify-end">
                    {plan.subjects.map((subject, idx) => (
                      <Badge key={idx} variant="outline" className="bg-gray-50 dark:bg-gray-800">
                        {subject.name}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <Button variant="ghost" className="w-fit ml-auto">
                  View Details
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
};

export default ActivePlansList;
