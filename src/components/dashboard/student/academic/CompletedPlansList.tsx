
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, ChevronRight, CheckCircle } from 'lucide-react';
import { StudyPlan } from '@/types/user/studyPlan';

interface CompletedPlansListProps {
  plans: StudyPlan[];
}

const CompletedPlansList: React.FC<CompletedPlansListProps> = ({ plans }) => {
  if (!plans || plans.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground">
            No completed study plans yet.
          </p>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <>
      {plans.map((plan) => (
        <Card key={plan.id} className="hover:shadow-md transition-shadow bg-gray-50/50 dark:bg-gray-800/50">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="col-span-2">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-lg font-semibold">{plan.examGoal}</h3>
                    <p className="text-sm text-muted-foreground">
                      Completed on {new Date(plan.examDate).toLocaleDateString()}
                    </p>
                  </div>
                  <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                    Completed
                  </Badge>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between items-center text-sm">
                    <span>Final Progress</span>
                    <span className="font-medium">{plan.progressPercentage}%</span>
                  </div>
                  <Progress value={plan.progressPercentage} className="h-2" />
                </div>
                
                <div className="flex flex-wrap gap-3">
                  <div className="flex items-center text-sm">
                    <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                    <span>Ran for {Math.round(Math.random() * 30 + 30)} days</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 mr-1 text-green-600" />
                    <span>{Math.round(Math.random() * 100 + 100)} tasks completed</span>
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
                  View Archive
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

export default CompletedPlansList;
