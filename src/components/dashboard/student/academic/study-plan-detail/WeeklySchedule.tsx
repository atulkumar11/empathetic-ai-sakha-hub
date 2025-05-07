
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Clock } from 'lucide-react';
import type { StudyPlan } from '@/types/user/studyPlan';

interface WeeklyScheduleProps {
  plan: StudyPlan;
}

const WeeklySchedule: React.FC<WeeklyScheduleProps> = ({ plan }) => {
  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Weekly Schedule</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4">
          {weekDays.map(day => (
            <div key={day} className="border rounded-lg p-3">
              <h4 className="font-medium mb-2">{day}</h4>
              <div className="space-y-2 pl-2">
                {plan.subjects.map((subject, idx) => {
                  if (idx % 7 !== weekDays.indexOf(day) % 3) return null;
                  
                  return (
                    <div key={`${day}-${subject.name}`} className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span className="text-indigo-600">{plan.preferredStudyTime}</span>
                      <span className="text-gray-500">-</span>
                      <span>{subject.name}</span>
                    </div>
                  );
                }).filter(Boolean)}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default WeeklySchedule;
