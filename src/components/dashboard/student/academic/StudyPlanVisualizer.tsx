
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Pie, PieChart, ResponsiveContainer, Cell, Legend, Tooltip } from 'recharts';
import { CalendarDays, Clock, Book, FileText, Brain } from 'lucide-react';

interface StudyPlanVisualizerProps {
  examGoal: string;
  progressPercentage: number;
  daysLeft: number;
  totalSubjects: number;
  conceptCards: number;
  flashcards: number;
  practiceExams: number;
  studyHoursPerDay: number;
  focusArea: string;
}

const StudyPlanVisualizer: React.FC<StudyPlanVisualizerProps> = ({
  examGoal,
  progressPercentage,
  daysLeft,
  totalSubjects,
  conceptCards,
  flashcards,
  practiceExams,
  studyHoursPerDay,
  focusArea
}) => {
  const timeData = [
    { name: 'Concepts', value: conceptCards * 15 }, // Assuming 15 min per concept card
    { name: 'Flashcards', value: flashcards * 5 },  // Assuming 5 min per flashcard
    { name: 'Practice Tests', value: practiceExams * 40 }  // Assuming 40 min per practice exam
  ];
  
  const COLORS = ['#0088FE', '#00C49F', '#FF8042'];
  
  const totalTimeMinutes = timeData.reduce((sum, item) => sum + item.value, 0);
  const totalTimeHours = Math.round(totalTimeMinutes / 60);
  
  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-violet-50 dark:from-blue-900/20 dark:to-violet-900/20">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl">Study Plan Overview</CardTitle>
          <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
            {examGoal}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">Overall Progress</h3>
                <span className="text-sm font-medium">{progressPercentage}%</span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md">
                <CalendarDays className="h-5 w-5 mr-3 text-blue-600 dark:text-blue-400" />
                <div>
                  <div className="text-sm text-muted-foreground">Days Left</div>
                  <div className="font-bold">{daysLeft}</div>
                </div>
              </div>
              <div className="flex items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-md">
                <Clock className="h-5 w-5 mr-3 text-green-600 dark:text-green-400" />
                <div>
                  <div className="text-sm text-muted-foreground">Daily Hours</div>
                  <div className="font-bold">{studyHoursPerDay}</div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
                <Book className="h-5 w-5 mr-3 text-gray-600 dark:text-gray-400" />
                <div>
                  <div className="text-sm text-muted-foreground">Total Subjects</div>
                  <div className="font-bold">{totalSubjects}</div>
                </div>
              </div>
              <div className="flex items-center p-3 bg-violet-50 dark:bg-violet-900/20 rounded-md">
                <Brain className="h-5 w-5 mr-3 text-violet-600 dark:text-violet-400" />
                <div className="flex-1">
                  <div className="text-sm text-muted-foreground">Focus Area</div>
                  <div className="font-bold">{focusArea}</div>
                </div>
                <Badge variant="outline" className="ml-2 bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-300">
                  Priority
                </Badge>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-3 text-center">Time Allocation</h3>
            <div className="h-[200px] mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={timeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {timeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} min`]} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="grid grid-cols-3 gap-2 text-center bg-gray-50 dark:bg-gray-800 rounded-md p-4">
              <div>
                <div className="text-sm text-muted-foreground">Concepts</div>
                <div className="font-bold text-blue-600 dark:text-blue-400">{conceptCards}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Flashcards</div>
                <div className="font-bold text-green-600 dark:text-green-400">{flashcards}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Practice Exams</div>
                <div className="font-bold text-orange-600 dark:text-orange-400">{practiceExams}</div>
              </div>
              <div className="col-span-3 mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                <div className="text-sm text-muted-foreground">Total Time</div>
                <div className="font-bold">{totalTimeHours} hours</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center mt-6">
          <Button variant="outline" className="mr-3">Modify Plan</Button>
          <Button>View Detailed Plan</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default StudyPlanVisualizer;
