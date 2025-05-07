
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

type TaskStatus = "completed" | "missed" | "partial";

interface HistoryData {
  day: string;
  completed: number;
  partial: number;
  missed: number;
}

interface HistorySectionProps {
  data: HistoryData[];
}

const HistorySection: React.FC<HistorySectionProps> = ({ data }) => {
  // Calculate percentages for progress indicators
  const calculateCompletion = () => {
    let total = 0;
    let completedCount = 0;
    let partialCount = 0;
    let missedCount = 0;
    
    data.forEach(day => {
      total += day.completed + day.partial + day.missed;
      completedCount += day.completed;
      partialCount += day.partial;
      missedCount += day.missed;
    });
    
    return {
      total,
      completed: total > 0 ? Math.round((completedCount / total) * 100) : 0,
      partial: total > 0 ? Math.round((partialCount / total) * 100) : 0,
      missed: total > 0 ? Math.round((missedCount / total) * 100) : 0,
    };
  };
  
  const completion = calculateCompletion();

  // Generate status badge based on task status
  const getStatusBadge = (status: TaskStatus) => {
    switch(status) {
      case "completed":
        return <span className="px-2 py-0.5 text-xs rounded-full bg-green-100 text-green-700">Completed</span>;
      case "partial":
        return <span className="px-2 py-0.5 text-xs rounded-full bg-yellow-100 text-yellow-700">Partial</span>;
      case "missed":
        return <span className="px-2 py-0.5 text-xs rounded-full bg-red-100 text-red-700">Missed</span>;
      default:
        return null;
    }
  };

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Weekly Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <XAxis dataKey="day" tickLine={false} axisLine={false} />
              <YAxis hide={true} />
              <Tooltip 
                cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
                contentStyle={{ borderRadius: '4px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)' }}
              />
              <Bar dataKey="completed" stackId="a" fill="#4ade80" radius={[4, 4, 0, 0]} />
              <Bar dataKey="partial" stackId="a" fill="#fbbf24" radius={[0, 0, 0, 0]} />
              <Bar dataKey="missed" stackId="a" fill="#f87171" radius={[0, 0, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="p-2 rounded-lg bg-green-50">
            <div className="text-xl font-semibold text-green-700">{completion.completed}%</div>
            <div className="text-xs text-green-600">Completed</div>
          </div>
          <div className="p-2 rounded-lg bg-yellow-50">
            <div className="text-xl font-semibold text-yellow-700">{completion.partial}%</div>
            <div className="text-xs text-yellow-600">Partial</div>
          </div>
          <div className="p-2 rounded-lg bg-red-50">
            <div className="text-xl font-semibold text-red-700">{completion.missed}%</div>
            <div className="text-xs text-red-600">Missed</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HistorySection;
