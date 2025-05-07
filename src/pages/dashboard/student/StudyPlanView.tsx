
import React, { useState, useEffect } from 'react';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { StudyPlanBreakdown } from '@/components/dashboard/student/study-plan/StudyPlanBreakdown';
import { Button } from '@/components/ui/button';
import { Plus, Download, Calendar } from 'lucide-react';
import { StudyPlanSubject } from '@/types/user/studyPlan';

// Mock data for demonstration purposes
const mockStudyPlan = {
  examName: "JEE Advanced",
  examDate: "2023-12-15",
  weeklyHours: 35,
  subjects: [
    {
      id: "physics",
      name: "Physics",
      color: "#8B5CF6",
      hoursPerWeek: 12,
      priority: "high" as const,
      proficiency: "medium" as const,
      topics: [
        { id: "p1", name: "Mechanics", difficulty: "medium" as const, completed: true, status: "completed" as const },
        { id: "p2", name: "Thermodynamics", difficulty: "medium" as const, completed: false, status: "in-progress" as const },
        { id: "p3", name: "Electromagnetism", difficulty: "hard" as const, completed: false, status: "pending" as const },
        { id: "p4", name: "Modern Physics", difficulty: "hard" as const, completed: false, status: "pending" as const },
        { id: "p5", name: "Optics", difficulty: "medium" as const, completed: false, status: "pending" as const },
      ]
    },
    {
      id: "chemistry",
      name: "Chemistry",
      color: "#10B981",
      hoursPerWeek: 10,
      priority: "medium" as const,
      proficiency: "weak" as const,
      topics: [
        { id: "c1", name: "Physical Chemistry", difficulty: "hard" as const, completed: false, status: "in-progress" as const },
        { id: "c2", name: "Organic Chemistry", difficulty: "hard" as const, completed: false, status: "pending" as const },
        { id: "c3", name: "Inorganic Chemistry", difficulty: "medium" as const, completed: false, status: "pending" as const },
        { id: "c4", name: "Analytical Chemistry", difficulty: "easy" as const, completed: true, status: "completed" as const },
      ]
    },
    {
      id: "mathematics",
      name: "Mathematics",
      color: "#F59E0B",
      hoursPerWeek: 13,
      priority: "high" as const,
      proficiency: "strong" as const,
      topics: [
        { id: "m1", name: "Calculus", difficulty: "medium" as const, completed: true, status: "completed" as const },
        { id: "m2", name: "Algebra", difficulty: "medium" as const, completed: false, status: "in-progress" as const },
        { id: "m3", name: "Coordinate Geometry", difficulty: "easy" as const, completed: true, status: "completed" as const },
        { id: "m4", name: "Trigonometry", difficulty: "easy" as const, completed: false, status: "pending" as const },
        { id: "m5", name: "Statistics", difficulty: "medium" as const, completed: false, status: "pending" as const },
        { id: "m6", name: "Vectors", difficulty: "hard" as const, completed: false, status: "pending" as const },
      ]
    }
  ]
};

const StudyPlanView = () => {
  const [studyPlan, setStudyPlan] = useState<{
    examName: string;
    examDate: string;
    weeklyHours: number;
    subjects: StudyPlanSubject[];
  }>(mockStudyPlan);
  
  // In a real implementation, you would fetch the study plan from an API or context
  useEffect(() => {
    // Simulate fetching data
    const userData = localStorage.getItem("userData");
    if (userData) {
      try {
        const parsedData = JSON.parse(userData);
        if (parsedData && parsedData.examPreparation) {
          setStudyPlan(prev => ({
            ...prev, 
            examName: parsedData.examPreparation || mockStudyPlan.examName
          }));
        }
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  return (
    <SharedPageLayout 
      title="Study Plan" 
      subtitle="Your personalized exam preparation roadmap"
      backButtonUrl="/dashboard/student"
      showBackButton={true}
      actions={
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Sync Calendar
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Download Plan
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Update Plan
          </Button>
        </div>
      }
    >
      <div className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-muted/50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Exam Goal</h3>
            <p className="text-lg font-semibold">{studyPlan.examName}</p>
          </div>
          <div className="bg-muted/50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Exam Date</h3>
            <p className="text-lg font-semibold">{new Date(studyPlan.examDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>
          <div className="bg-muted/50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Weekly Study Hours</h3>
            <p className="text-lg font-semibold">{studyPlan.weeklyHours} hours</p>
          </div>
        </div>
      </div>
      
      <StudyPlanBreakdown 
        subjects={studyPlan.subjects}
        examDate={studyPlan.examDate}
        examName={studyPlan.examName}
        weeklyHours={studyPlan.weeklyHours}
      />
    </SharedPageLayout>
  );
};

export default StudyPlanView;
