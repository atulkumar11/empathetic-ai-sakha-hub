
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Check, Clock, ChevronRight, BookOpen, Brain, FileCheck } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/utils/dateUtils";
import type { StudyPlan } from '@/types/user/studyPlan';

interface StudyPlanCardProps {
  plan: StudyPlan;
  onViewDetails: (planId: string) => void;
}

const StudyPlanCard: React.FC<StudyPlanCardProps> = ({ plan, onViewDetails }) => {
  // Calculate total statistics
  const totalTopics = plan.subjects.reduce((acc, subject) => acc + subject.topics.length, 0);
  const completedTopics = plan.subjects.reduce((acc, subject) => 
    acc + subject.topics.filter(topic => topic.status === 'completed').length, 0
  );
  
  const stats = [
    { icon: <BookOpen className="h-4 w-4" />, label: 'Topics', value: `${completedTopics}/${totalTopics}` },
    { icon: <Brain className="h-4 w-4" />, label: 'Hours/Day', value: `${plan.studyHoursPerDay}h` },
    { icon: <FileCheck className="h-4 w-4" />, label: 'Progress', value: `${plan.progressPercentage}%` },
  ];

  return (
    <Card className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300">
      <CardHeader className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 dark:from-indigo-500/20 dark:to-purple-500/20">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-lg font-semibold">{plan.examGoal}</CardTitle>
            <CardDescription>Created on {formatDate(plan.createdAt)}</CardDescription>
          </div>
          <Badge variant={plan.status === 'active' ? 'default' : 'secondary'} 
                className={plan.status === 'active' ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-500 hover:bg-gray-600'}>
            {plan.status === 'active' ? `${plan.daysLeft} days left` : plan.status}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="p-4 space-y-6">
        <div>
          <h3 className="font-medium mb-2">Overall Progress</h3>
          <Progress value={plan.progressPercentage} className="h-2 mb-2" />
          <div className="grid grid-cols-3 gap-2 mt-4">
            {stats.map((stat, index) => (
              <div key={index} className="flex flex-col items-center p-2 bg-gray-50 dark:bg-gray-900 rounded-lg">
                {stat.icon}
                <span className="text-xs text-gray-600 dark:text-gray-400 mt-1">{stat.label}</span>
                <span className="font-semibold">{stat.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          {plan.subjects.map(subject => (
            <div key={subject.name} className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="font-medium">{subject.name}</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {subject.progress}%
                </span>
              </div>
              <Progress value={subject.progress} 
                className={`h-1.5 ${
                  subject.proficiency === 'strong' ? 'bg-green-500' : 
                  subject.proficiency === 'moderate' ? 'bg-amber-500' : 
                  'bg-red-500'
                }`} />
              <div className="text-xs text-gray-500 flex justify-between mt-1">
                <span>Proficiency: {subject.proficiency}</span>
                <span>{subject.topics.filter(t => t.status === 'completed').length}/{subject.topics.length} topics</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>

      <CardFooter className="border-t pt-4">
        <Button 
          variant="outline" 
          className="w-full hover:bg-indigo-50 dark:hover:bg-indigo-950" 
          onClick={() => onViewDetails(plan.id)}
        >
          <ChevronRight className="h-4 w-4 mr-2" />
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default StudyPlanCard;
