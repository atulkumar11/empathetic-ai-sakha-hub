
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Clock } from 'lucide-react';

interface TimeAllocation {
  concepts: number;
  flashcards: number;
  practiceExams: number;
}

interface TimeAllocationSectionProps {
  timeAllocation: TimeAllocation;
}

const TimeAllocationSection: React.FC<TimeAllocationSectionProps> = ({ timeAllocation }) => {
  // Calculate the total time
  const totalTime = timeAllocation.concepts + timeAllocation.flashcards + timeAllocation.practiceExams;
  
  // Prepare data for the pie chart
  const data = [
    {
      name: "Concepts",
      value: timeAllocation.concepts,
      color: "#3b82f6" // blue
    },
    {
      name: "Flashcards",
      value: timeAllocation.flashcards,
      color: "#f59e0b" // amber
    },
    {
      name: "Practice Tests",
      value: timeAllocation.practiceExams,
      color: "#10b981" // green
    }
  ].filter(item => item.value > 0);
  
  // Format minutes to readable time
  const formatMinutes = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes} min`;
    } else {
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;
      return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex items-center">
          <Clock className="h-4 w-4 mr-2" />
          Time Allocation
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        {totalTime > 0 ? (
          <div className="space-y-4">
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: number) => [formatMinutes(value), "Time"]}
                    contentStyle={{
                      borderRadius: "4px",
                      border: "none",
                      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)"
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="grid grid-cols-1 gap-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <span className="h-3 w-3 rounded-full bg-blue-500 mr-2" />
                  <span className="text-sm">Concepts</span>
                </div>
                <span className="text-sm font-medium">{formatMinutes(timeAllocation.concepts)}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <span className="h-3 w-3 rounded-full bg-amber-500 mr-2" />
                  <span className="text-sm">Flashcards</span>
                </div>
                <span className="text-sm font-medium">{formatMinutes(timeAllocation.flashcards)}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <span className="h-3 w-3 rounded-full bg-green-500 mr-2" />
                  <span className="text-sm">Practice Tests</span>
                </div>
                <span className="text-sm font-medium">{formatMinutes(timeAllocation.practiceExams)}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="py-4 text-center text-gray-500">
            <p className="mb-2">No time data available</p>
            <p className="text-sm">Complete tasks to see time allocation</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TimeAllocationSection;
