
import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, Calendar, GraduationCap, HeartHandshake } from "lucide-react";
import { Link } from 'react-router-dom';

export function QuickAccess() {
  const quickActions = [
    {
      title: "24/7 AI Tutor",
      icon: Brain,
      description: "Get instant help with any topic",
      path: "/dashboard/student/tutor",
      color: "bg-blue-500"
    },
    {
      title: "Study Plan",
      icon: Calendar,
      description: "View your personalized study schedule",
      path: "/dashboard/student/study-plan",
      color: "bg-purple-500"
    },
    {
      title: "Academic Advisor",
      icon: GraduationCap,
      description: "Get expert guidance for your exams",
      path: "/dashboard/student/academic",
      color: "bg-green-500"
    },
    {
      title: "Feel Good Corner",
      icon: HeartHandshake,
      description: "Take a break and refresh your mind",
      path: "/dashboard/student/feel-good-corner",
      color: "bg-amber-500"
    }
  ];

  return (
    <Card className="p-4">
      <h2 className="font-medium text-lg mb-3">Quick Access</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
        {quickActions.map((action) => (
          <Button
            key={action.title}
            variant="outline"
            className="h-auto py-3 px-4 flex flex-col items-center text-center hover:bg-muted/50"
            asChild
          >
            <Link to={action.path}>
              <div className={`${action.color} rounded-full p-2 mb-2`}>
                <action.icon className="h-5 w-5 text-white" />
              </div>
              <span className="font-medium mb-1">{action.title}</span>
              <span className="text-xs text-muted-foreground">{action.description}</span>
            </Link>
          </Button>
        ))}
      </div>
    </Card>
  );
}
