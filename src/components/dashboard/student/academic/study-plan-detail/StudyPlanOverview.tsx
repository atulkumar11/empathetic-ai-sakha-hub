
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { StudyPlan } from '@/types/user/studyPlan';
import { formatDate } from '@/utils/dateUtils';

interface StudyPlanOverviewProps {
  plan: StudyPlan;
}

const StudyPlanOverview: React.FC<StudyPlanOverviewProps> = ({ plan }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Exam Goal</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-indigo-700">{plan.examGoal}</div>
            <p className="text-sm text-gray-500 mt-1">Target exam</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Exam Date</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-indigo-700">{formatDate(plan.examDate)}</div>
            <p className="text-sm text-gray-500 mt-1">{plan.daysLeft} days remaining</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Overall Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-indigo-700">{plan.progressPercentage}%</div>
            <Progress value={plan.progressPercentage} className="h-2 mt-2" />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Study Preferences</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <h4 className="text-sm font-medium text-gray-500">Daily Study Hours</h4>
              <p className="font-medium">{plan.studyHoursPerDay} hours</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500">Preferred Study Time</h4>
              <p className="font-medium capitalize">{plan.preferredStudyTime}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500">Learning Pace</h4>
              <p className="font-medium capitalize">{plan.learningPace}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudyPlanOverview;
