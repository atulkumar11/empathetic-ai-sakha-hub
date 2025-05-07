
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, BookOpen, Calendar, CheckCircle, Clock, Star, Video, ListChecks } from "lucide-react";
import { Progress } from "@/components/ui/progress";

// Mock plan data
const studyPlanItems = [
  {
    id: "1",
    type: "concept",
    title: "Newton's Laws of Motion",
    subject: "Physics",
    duration: 45,
    status: "completed",
    priority: "high",
    progress: 100
  },
  {
    id: "2",
    type: "flashcard",
    title: "Organic Chemistry Reactions",
    subject: "Chemistry",
    duration: 20,
    status: "in_progress",
    priority: "medium",
    progress: 65
  },
  {
    id: "3",
    type: "video",
    title: "Calculus: Integration Techniques",
    subject: "Mathematics",
    duration: 35,
    status: "not_started",
    priority: "medium",
    progress: 0
  },
  {
    id: "4",
    type: "practice",
    title: "Physics Mock Test",
    subject: "Physics",
    duration: 60,
    status: "not_started",
    priority: "high",
    progress: 0
  }
];

// Mock suggestions
const smartSuggestions = [
  {
    id: "s1",
    title: "Review Organic Chemistry",
    reason: "Based on your recent test results",
    impact: "high"
  },
  {
    id: "s2",
    title: "Try Pomodoro Technique",
    reason: "May help with your focused study sessions",
    impact: "medium"
  },
  {
    id: "s3",
    title: "Revisit Calculus Fundamentals",
    reason: "Will improve your performance in advanced topics",
    impact: "high"
  }
];

const TodayStudyPlan = () => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Completed</Badge>;
      case "in_progress":
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">In Progress</Badge>;
      case "not_started":
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200">Not Started</Badge>;
      default:
        return null;
    }
  };
  
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "concept":
        return <BookOpen className="h-4 w-4" />;
      case "flashcard":
        return <ListChecks className="h-4 w-4" />;
      case "video":
        return <Video className="h-4 w-4" />;
      case "practice":
        return <Star className="h-4 w-4" />;
      default:
        return <BookOpen className="h-4 w-4" />;
    }
  };
  
  const getImpactBadge = (impact: string) => {
    switch (impact) {
      case "high":
        return <Badge className="bg-red-100 text-red-800 border-red-200">High Impact</Badge>;
      case "medium":
        return <Badge className="bg-amber-100 text-amber-800 border-amber-200">Medium Impact</Badge>;
      case "low":
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Low Impact</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-xl flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Today's Study Plan
            </CardTitle>
            <CardDescription>Your personalized plan for maximum productivity</CardDescription>
          </div>
          <Button variant="outline" size="sm">
            View Full Plan
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="pb-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {studyPlanItems.map((item) => (
            <Card key={item.id} className="border-l-4 hover:shadow-md transition-all" style={{ borderLeftColor: item.priority === "high" ? "#ef4444" : "#3b82f6" }}>
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-1.5 rounded-full bg-primary/10">
                      {getTypeIcon(item.type)}
                    </div>
                    <span className="text-sm font-medium">{item.title}</span>
                  </div>
                  {getStatusBadge(item.status)}
                </div>
                
                <div className="flex justify-between items-center text-xs text-muted-foreground mt-2">
                  <div className="flex items-center gap-1">
                    <Badge variant="outline" className="font-normal">{item.subject}</Badge>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{item.duration} min</span>
                  </div>
                </div>
                
                {item.progress > 0 && item.progress < 100 && (
                  <div className="mt-3">
                    <div className="flex justify-between text-xs mb-1">
                      <span>Progress</span>
                      <span>{item.progress}%</span>
                    </div>
                    <Progress value={item.progress} className="h-1.5" />
                  </div>
                )}
                
                {item.status === "completed" && (
                  <div className="mt-2 flex items-center gap-1 text-xs text-green-600">
                    <CheckCircle className="h-3 w-3" />
                    <span>Completed</span>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mb-2">
          <h3 className="text-sm font-semibold flex items-center gap-2 mb-3">
            <Star className="h-4 w-4 text-amber-500" />
            Smart Suggestions
          </h3>
          
          <div className="space-y-3">
            {smartSuggestions.map((suggestion) => (
              <div key={suggestion.id} className="flex items-center justify-between bg-muted/50 rounded-lg p-3">
                <div>
                  <div className="font-medium text-sm">{suggestion.title}</div>
                  <div className="text-xs text-muted-foreground">{suggestion.reason}</div>
                </div>
                <div className="flex items-center gap-2">
                  {getImpactBadge(suggestion.impact)}
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>

      <CardFooter>
        <Button variant="default" className="w-full">
          Start Next Task
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TodayStudyPlan;
