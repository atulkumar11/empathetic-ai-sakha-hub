
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { LineChart, ResponsiveContainer, XAxis, YAxis, Line, Tooltip, Legend } from 'recharts';

interface Subject {
  id: string;
  name: string;
  progress: number;
  lastWeekProgress: number;
  [key: string]: any;
}

interface WeeklyProgressChartProps {
  subjects: Subject[];
}

export const WeeklyProgressChart: React.FC<WeeklyProgressChartProps> = ({ subjects }) => {
  const chartData = subjects.map(s => ({
    subject: s.name,
    progress: s.progress,
    lastWeek: s.lastWeekProgress
  }));

  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle>Weekly Progress Tracker</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <XAxis dataKey="subject" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="progress" stroke="#0ea5e9" name="Current Progress" />
            <Line type="monotone" dataKey="lastWeek" stroke="#94a3b8" name="Last Week" strokeDasharray="5 5" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
