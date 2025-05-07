
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface SubjectOverviewProps {}

const SubjectOverview: React.FC<SubjectOverviewProps> = () => {
  // Sample data for subject performance
  const subjects = [
    {
      name: "Physics",
      progress: 75,
      strengths: ["Kinematics", "Thermodynamics"],
      weaknesses: ["Electricity", "Modern Physics"],
      recentScores: [85, 78, 82]
    },
    {
      name: "Chemistry",
      progress: 68,
      strengths: ["Organic Chemistry", "Chemical Bonding"],
      weaknesses: ["Electrochemistry", "Coordination Compounds"],
      recentScores: [72, 65, 80]
    },
    {
      name: "Mathematics",
      progress: 82,
      strengths: ["Calculus", "Algebra"],
      weaknesses: ["Trigonometry", "Coordinate Geometry"],
      recentScores: [88, 92, 80]
    }
  ];

  const calculateAverage = (scores: number[]) => {
    if (scores.length === 0) return 0;
    return scores.reduce((a, b) => a + b, 0) / scores.length;
  };

  return (
    <div className="space-y-6">
      {subjects.map((subject) => (
        <Card key={subject.name} className="overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle>{subject.name}</CardTitle>
            <CardDescription>
              Average Score: {Math.round(calculateAverage(subject.recentScores))}%
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-4">
            <div className="mb-4">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium">Overall Progress</span>
                <span className="text-sm text-muted-foreground">{subject.progress}%</span>
              </div>
              <Progress value={subject.progress} className="h-2" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                <h4 className="text-sm font-medium text-green-700 dark:text-green-400 mb-2">Strengths</h4>
                <ul className="space-y-1">
                  {subject.strengths.map((strength, idx) => (
                    <li key={idx} className="text-sm flex items-center">
                      <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                      {strength}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                <h4 className="text-sm font-medium text-red-700 dark:text-red-400 mb-2">Areas to Improve</h4>
                <ul className="space-y-1">
                  {subject.weaknesses.map((weakness, idx) => (
                    <li key={idx} className="text-sm flex items-center">
                      <span className="w-2 h-2 rounded-full bg-red-500 mr-2"></span>
                      {weakness}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default SubjectOverview;
