
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  BookOpen, 
  Clock, 
  Star, 
  Flag,
  Check,
  ChevronRight,
  AlertTriangle,
  Flame
} from 'lucide-react';
import { MoodType } from '@/types/student/todaysPlan';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

interface TodaysSmartPlanProps {
  userName: string;
  currentMood?: MoodType;
  subjects: Array<{
    name: string;
    timeAllocated: number;
    targets: {
      concepts: number;
      flashcards: number;
      practiceTests: number;
    };
    tasks: Array<{
      type: 'concept' | 'flashcard' | 'practiceTest';
      title: string;
      duration: number;
      link: string;
      isCompleted: boolean;
    }>;
  }>;
  backlogs: Array<{
    subject: string;
    task: string;
    timeRequired: number;
    link: string;
  }>;
  streakDays: number;
  completionPercentage: number;
}

export default function TodaysSmartPlan({
  userName,
  currentMood,
  subjects,
  backlogs,
  streakDays,
  completionPercentage
}: TodaysSmartPlanProps) {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  const getMoodBasedSuggestion = (mood?: MoodType) => {
    switch(mood) {
      case 'energetic':
      case 'motivated':
        return "You're in beast mode! 🚀 Let's tackle the toughest concepts first.";
      case 'tired':
        return "Focus on lighter topics and flashcards today. Slow and steady wins!";
      case 'anxious':
        return "Start with simple wins - 5 flashcards first to build momentum. 🧘‍♂️";
      default:
        return "Let's make today count! What would you like to focus on first?";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-violet-100 to-blue-100 dark:from-violet-950 dark:to-blue-950 rounded-lg p-6">
        <h2 className="text-2xl font-bold">
          {getGreeting()}, {userName}! 🌟
        </h2>
        <p className="mt-2 text-muted-foreground">
          {getMoodBasedSuggestion(currentMood)}
        </p>
        <div className="mt-4 p-4 bg-white/50 dark:bg-black/10 rounded-lg">
          <h3 className="font-medium">Today's Focus Goal</h3>
          <p className="text-sm mt-1">
            Complete {subjects.length} Subjects + 
            Clear {subjects.reduce((acc, s) => acc + s.targets.practiceTests, 0)} Practice Test + 
            Revise {subjects.reduce((acc, s) => acc + s.targets.flashcards, 0)} Flashcards
          </p>
        </div>
      </div>

      {/* Subject Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {subjects.map((subject, idx) => (
          <Card key={idx} className="border-t-4 border-t-violet-500">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{subject.name}</span>
                <Badge variant="outline">
                  {Math.floor(subject.timeAllocated / 60)}h {subject.timeAllocated % 60}m
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {subject.tasks.map((task, taskIdx) => (
                  <div 
                    key={taskIdx}
                    className={cn(
                      "p-3 rounded-lg border",
                      task.isCompleted 
                        ? "bg-green-50 border-green-200 dark:bg-green-950/30 dark:border-green-900" 
                        : "bg-gray-50 border-gray-200 dark:bg-gray-800/50 dark:border-gray-700"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {task.type === 'concept' && <BookOpen className="h-4 w-4 text-blue-500" />}
                        {task.type === 'flashcard' && <Star className="h-4 w-4 text-amber-500" />}
                        {task.type === 'practiceTest' && <Flag className="h-4 w-4 text-purple-500" />}
                        <span className="text-sm font-medium">{task.title}</span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {task.duration}m
                      </Badge>
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        {task.isCompleted ? "Completed" : "Pending"}
                      </span>
                      <Link to={task.link}>
                        <Button variant="ghost" size="sm" className="h-7 text-xs">
                          {task.isCompleted ? "Review" : "Start"} <ChevronRight className="h-3 w-3 ml-1" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Backlogs Section */}
      {backlogs.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              Pending Backlogs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {backlogs.map((backlog, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-amber-50/50 dark:bg-amber-950/30 rounded-lg border border-amber-200 dark:border-amber-900/50">
                  <div>
                    <h4 className="font-medium">{backlog.subject}</h4>
                    <p className="text-sm text-muted-foreground">{backlog.task}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {backlog.timeRequired}m
                    </Badge>
                    <Link to={backlog.link}>
                      <Button size="sm" variant="secondary">Complete Now</Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Footer Progress */}
      <div className="sticky bottom-4 bg-white dark:bg-gray-900 p-4 rounded-lg border shadow-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">Today's Progress</span>
          <div className="flex items-center gap-2">
            <Flame className="h-4 w-4 text-orange-500" />
            <span className="text-sm">Streak: {streakDays} days</span>
          </div>
        </div>
        <Progress value={completionPercentage} className="h-2" />
        <div className="mt-2 text-center text-sm text-muted-foreground">
          {completionPercentage < 100 
            ? `${100 - completionPercentage}% more to complete today's goals!`
            : "🎉 Amazing! You've completed all tasks for today!"}
        </div>
      </div>
    </div>
  );
}
