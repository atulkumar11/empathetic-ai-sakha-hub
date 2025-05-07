
import React from 'react';
import { Clock } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts';
import { SubjectProgress, StudyStreak } from "@/types/user";

interface StudyTimeChartProps {
  selectedSubject: SubjectProgress | null;
  subjects: SubjectProgress[];
  selectSubject: (id: string) => void;
  studyStreak: StudyStreak | null;
}

export const StudyTimeChart: React.FC<StudyTimeChartProps> = ({
  selectedSubject,
  subjects,
  selectSubject,
  studyStreak
}) => {
  const totalWeeklyHours = studyStreak?.thisWeek.reduce((a, b) => a + b, 0) || 0;

  if (!selectedSubject) {
    return (
      <div className="text-center py-8">
        <Clock className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
        <h3 className="font-medium text-lg">Select a subject to view study time</h3>
        <div className="flex flex-wrap gap-2 justify-center mt-4">
          {subjects.map(subject => (
            <Button 
              key={subject.id}
              variant="outline"
              onClick={() => selectSubject(subject.id)}
            >
              {subject.name}
            </Button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h3 className="font-medium">Study Hours Distribution</h3>
      
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={selectedSubject.studyHours}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="hours" fill="#0ea5e9" name="Hours Studied" />
        </BarChart>
      </ResponsiveContainer>
      
      <div className="border-t pt-4 mt-4">
        <h3 className="font-medium mb-4">Total Study Hours This Week</h3>
        <div className="text-3xl font-bold">
          {totalWeeklyHours} hours
        </div>
        <p className="text-sm text-muted-foreground">
          <span className="text-green-500 font-medium">↑ 3 hours</span> from last week
        </p>
      </div>
    </div>
  );
};
