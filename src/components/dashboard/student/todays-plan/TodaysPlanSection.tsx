
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Book, BookOpen, FileText, Clock, AlertTriangle, BookCheck } from "lucide-react";
import { SubjectBreakdownData, PendingTask, TimeAllocationSummary, MoodType } from "@/types/student/todaysPlan";
import { cn } from "@/lib/utils";

interface TodaysPlanSectionProps {
  subjects: SubjectBreakdownData[];
  pendingTasks: PendingTask[];
  timeAllocation: TimeAllocationSummary;
  completionPercentage: number;
  currentMood?: MoodType;
  onRequestHelp: (taskId: string) => void;
  onMarkDifficult: (taskId: string) => void;
}

export default function TodaysPlanSection({
  subjects,
  pendingTasks,
  timeAllocation,
  completionPercentage,
  currentMood,
  onRequestHelp,
  onMarkDifficult
}: TodaysPlanSectionProps) {
  const renderTaskType = (type: 'concept' | 'flashcard' | 'practice-exam') => {
    switch (type) {
      case 'concept':
        return <Book className="h-4 w-4 text-blue-500" />;
      case 'flashcard':
        return <BookOpen className="h-4 w-4 text-amber-500" />;
      case 'practice-exam':
        return <FileText className="h-4 w-4 text-purple-500" />;
    }
  };

  const getMoodBasedTip = () => {
    switch (currentMood) {
      case 'happy':
        return "Perfect day to tackle a challenging concept! Try completing an extra task.";
      case 'focused':
        return "Great focus! Consider tackling some backlog items today.";
      case 'tired':
        return "Take it easy today. Focus on review tasks first.";
      case 'anxious':
        return "Start with something familiar to build confidence.";
      case 'stressed':
        return "Let's keep it light. Pick your most comfortable subject.";
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Overall Progress */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex-1 mr-4">
          <h3 className="text-sm font-medium mb-1">Today's Progress</h3>
          <Progress value={completionPercentage} className="h-2" />
        </div>
        <Badge variant="outline" className="ml-2">
          {completionPercentage}% Complete
        </Badge>
      </div>

      {/* Mood-based Tip */}
      {currentMood && getMoodBasedTip() && (
        <div className={cn(
          "p-3 rounded-lg mb-4",
          currentMood === 'happy' && "bg-green-50 border border-green-200",
          currentMood === 'focused' && "bg-blue-50 border border-blue-200",
          currentMood === 'tired' && "bg-amber-50 border border-amber-200",
          currentMood === 'anxious' && "bg-purple-50 border border-purple-200",
          currentMood === 'stressed' && "bg-red-50 border border-red-200"
        )}>
          <p className="text-sm">{getMoodBasedTip()}</p>
        </div>
      )}

      {/* Quick Access Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <Link to="/dashboard/student/concepts">
          <Button variant="outline" className="w-full">
            <Book className="h-4 w-4 mr-2" /> Concepts Hub
          </Button>
        </Link>
        <Link to="/dashboard/student/flashcards">
          <Button variant="outline" className="w-full">
            <BookOpen className="h-4 w-4 mr-2" /> Flashcards
          </Button>
        </Link>
        <Link to="/dashboard/student/practice">
          <Button variant="outline" className="w-full">
            <FileText className="h-4 w-4 mr-2" /> Practice Tests
          </Button>
        </Link>
        <Link to="/dashboard/student/backlog">
          <Button variant="outline" className="w-full">
            <AlertTriangle className="h-4 w-4 mr-2" /> Backlogs
          </Button>
        </Link>
      </div>

      {/* Subject Breakdown */}
      {subjects.map((subject) => (
        <Card key={subject.name} className="mb-4">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <BookCheck className="h-5 w-5 text-primary" />
              {subject.name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Tasks Breakdown Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Task Type</th>
                      <th className="text-left py-2">Assigned</th>
                      <th className="text-left py-2">Pending</th>
                      <th className="text-right py-2">Time</th>
                      <th className="text-right py-2">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(subject.tasks).map(([taskType, tasks]) => (
                      tasks.map((task, index) => (
                        <tr key={`${taskType}-${index}`} className="border-b last:border-0">
                          <td className="py-2 flex items-center gap-2">
                            {renderTaskType(task.type)}
                            <span className="capitalize">{taskType}</span>
                          </td>
                          <td className="py-2">{task.assigned.description}</td>
                          <td className="py-2">
                            {task.pending.count > 0 ? (
                              <Badge variant="destructive">
                                {task.pending.description}
                              </Badge>
                            ) : (
                              <Badge variant="outline">None</Badge>
                            )}
                          </td>
                          <td className="py-2 text-right">{task.timeEstimate} min</td>
                          <td className="py-2 text-right">
                            <Link to={`/dashboard/student/${taskType}/${subject.name.toLowerCase()}`}>
                              <Button size="sm" variant="ghost">
                                Start
                              </Button>
                            </Link>
                          </td>
                        </tr>
                      ))
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Time Allocation Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            Time Allocation Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Concepts</p>
                <p className="text-lg font-medium">{Math.floor(timeAllocation.concepts / 60)}h {timeAllocation.concepts % 60}m</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Flashcards</p>
                <p className="text-lg font-medium">{Math.floor(timeAllocation.flashcards / 60)}h {timeAllocation.flashcards % 60}m</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Practice Tests</p>
                <p className="text-lg font-medium">{Math.floor(timeAllocation.practiceExams / 60)}h {timeAllocation.practiceExams % 60}m</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Time</p>
                <p className="text-lg font-medium">{Math.floor(timeAllocation.total / 60)}h {timeAllocation.total % 60}m</p>
              </div>
            </div>
            <div className="text-sm text-muted-foreground mt-4">
              ✅ Breaks recommended after every 60-90 minutes
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
