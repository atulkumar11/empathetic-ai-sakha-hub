
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { PieChart, ResponsiveContainer, Pie, Cell, Tooltip, Legend } from 'recharts';
import { ArrowUp, ArrowDown } from "lucide-react";

interface SubjectData {
  subject: string;
  progress: number;
  change: number;
}

interface SubjectPerformanceProps {
  subjects: SubjectData[];
}

const SubjectPerformance: React.FC<SubjectPerformanceProps> = ({ subjects }) => {
  // Sort subjects by progress for the chart
  const sortedSubjects = [...subjects].sort((a, b) => b.progress - a.progress);
  
  // Create chart data
  const chartData = sortedSubjects.map(subject => ({
    name: subject.subject,
    value: subject.progress
  }));
  
  // Colors for the pie chart
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Subject Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="space-y-4">
              {subjects.map((subject, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{subject.subject}</span>
                    <span className="text-sm flex items-center">
                      {subject.change > 0 ? (
                        <ArrowUp className="h-3 w-3 text-green-500 mr-1" />
                      ) : (
                        <ArrowDown className="h-3 w-3 text-red-500 mr-1" />
                      )}
                      {Math.abs(subject.change)}%
                    </span>
                  </div>
                  <Progress value={subject.progress} className="h-2" />
                </div>
              ))}
            </div>
          </div>
          
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default SubjectPerformance;
