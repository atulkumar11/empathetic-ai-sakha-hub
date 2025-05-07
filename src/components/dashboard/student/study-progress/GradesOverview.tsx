
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface GradeData {
  month: string;
  physics: number;
  chemistry: number;
  mathematics: number;
}

// Sample data for the chart
const gradeData: GradeData[] = [
  { month: "Jan", physics: 76, chemistry: 65, mathematics: 82 },
  { month: "Feb", physics: 68, chemistry: 72, mathematics: 80 },
  { month: "Mar", physics: 75, chemistry: 78, mathematics: 85 },
  { month: "Apr", physics: 82, chemistry: 75, mathematics: 89 },
  { month: "May", physics: 85, chemistry: 82, mathematics: 92 },
  { month: "Jun", physics: 87, chemistry: 85, mathematics: 90 },
];

const GradesOverview: React.FC = () => {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Subject Performance Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={gradeData}>
                <XAxis dataKey="month" />
                <YAxis domain={[0, 100]} />
                <Tooltip 
                  formatter={(value) => [`${value}%`]}
                  labelFormatter={(month) => `Month: ${month}`}
                />
                <Line 
                  type="monotone" 
                  dataKey="physics" 
                  stroke="#2563eb" 
                  strokeWidth={2}
                  activeDot={{ r: 6 }}
                  name="Physics"
                />
                <Line 
                  type="monotone" 
                  dataKey="chemistry" 
                  stroke="#16a34a" 
                  strokeWidth={2}
                  activeDot={{ r: 6 }}
                  name="Chemistry"
                />
                <Line 
                  type="monotone" 
                  dataKey="mathematics" 
                  stroke="#9333ea" 
                  strokeWidth={2}
                  activeDot={{ r: 6 }}
                  name="Mathematics"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Physics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">87%</div>
            <div className="text-sm text-muted-foreground mt-1">Up 12% from last month</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Chemistry</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">85%</div>
            <div className="text-sm text-muted-foreground mt-1">Up 10% from last month</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Mathematics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600">90%</div>
            <div className="text-sm text-muted-foreground mt-1">Up 5% from last month</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GradesOverview;
