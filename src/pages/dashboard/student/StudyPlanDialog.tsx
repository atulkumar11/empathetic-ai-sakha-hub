
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { UserProfileType } from "@/types/user";
import { X, CheckCircle } from "lucide-react";

interface StudyPlanDialogProps {
  userProfile: UserProfileType;
  onClose: () => void;
}

const StudyPlanDialog: React.FC<StudyPlanDialogProps> = ({ userProfile, onClose }) => {
  const [currentTab, setCurrentTab] = useState<"today" | "weekly" | "monthly">("today");
  
  // Sample data for the study plan
  const studyPlan = {
    today: [
      { id: "1", time: "9:00 - 10:30", subject: "Physics", topic: "Laws of Motion", completed: true },
      { id: "2", time: "11:00 - 12:30", subject: "Chemistry", topic: "Periodic Table", completed: false },
      { id: "3", time: "2:00 - 3:30", subject: "Mathematics", topic: "Integration", completed: false },
      { id: "4", time: "4:00 - 5:00", subject: "Biology", topic: "Cell Structure", completed: false },
    ],
    weekly: [
      { id: "5", day: "Monday", subjects: ["Physics", "Chemistry"], focus: "Revision" },
      { id: "6", day: "Tuesday", subjects: ["Mathematics", "Biology"], focus: "New Concepts" },
      { id: "7", day: "Wednesday", subjects: ["Physics", "Mathematics"], focus: "Problem Solving" },
      { id: "8", day: "Thursday", subjects: ["Chemistry", "Biology"], focus: "Practical Application" },
      { id: "9", day: "Friday", subjects: ["Physics", "Chemistry", "Mathematics"], focus: "Mock Test" },
    ],
    monthly: [
      { id: "10", week: "Week 1", focus: "Fundamentals & Core Concepts", progress: 75 },
      { id: "11", week: "Week 2", focus: "Advanced Topics & Problem Solving", progress: 60 },
      { id: "12", week: "Week 3", focus: "Revision & Practice Tests", progress: 40 },
      { id: "13", week: "Week 4", focus: "Mock Exams & Weak Area Focus", progress: 25 },
    ],
  };

  const markAsComplete = (id: string) => {
    // This would update the completion status in a real app
    console.log(`Marking task ${id} as complete`);
  };

  return (
    <Dialog open={true} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-900 border-0 shadow-xl">
        <DialogHeader className="bg-gradient-to-r from-blue-600 to-indigo-700 -m-6 mb-6 p-6 text-white">
          <div className="flex justify-between items-center">
            <DialogTitle className="text-2xl font-bold text-white">Your Study Plan</DialogTitle>
            <DialogClose asChild>
              <Button variant="ghost" size="icon" className="text-white hover:bg-blue-700">
                <X className="h-4 w-4" />
              </Button>
            </DialogClose>
          </div>
          <DialogDescription className="text-blue-100">
            Personalized learning schedule tailored to help you achieve your goals
          </DialogDescription>
        </DialogHeader>

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200 mb-6">
          {(["today", "weekly", "monthly"] as const).map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 font-medium text-sm ${
                currentTab === tab
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setCurrentTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Today's Plan */}
        {currentTab === "today" && (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Today's Study Schedule</h3>
            <div className="space-y-3">
              {studyPlan.today.map((item) => (
                <div
                  key={item.id}
                  className={`p-4 rounded-lg border ${
                    item.completed
                      ? "bg-green-50 border-green-200"
                      : "bg-white border-gray-200"
                  } flex justify-between items-center`}
                >
                  <div>
                    <p className="text-sm font-medium text-gray-900">{item.time}</p>
                    <h4 className="font-medium">
                      {item.subject}: {item.topic}
                    </h4>
                  </div>
                  <Button
                    variant={item.completed ? "outline" : "default"}
                    size="sm"
                    onClick={() => markAsComplete(item.id)}
                    className={item.completed ? "text-green-600 border-green-300" : ""}
                  >
                    {item.completed ? (
                      <span className="flex items-center gap-1">
                        <CheckCircle className="h-4 w-4" />
                        Completed
                      </span>
                    ) : (
                      "Mark as Complete"
                    )}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Weekly Plan */}
        {currentTab === "weekly" && (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">This Week's Focus</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {studyPlan.weekly.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-lg border border-gray-200 bg-white"
                >
                  <h4 className="font-semibold text-gray-900">{item.day}</h4>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {item.subjects.map((subject) => (
                      <span
                        key={subject}
                        className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                      >
                        {subject}
                      </span>
                    ))}
                  </div>
                  <p className="mt-2 text-sm text-gray-500">Focus: {item.focus}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Monthly Plan */}
        {currentTab === "monthly" && (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Monthly Overview</h3>
            <div className="space-y-4">
              {studyPlan.monthly.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-lg border border-gray-200 bg-white"
                >
                  <div className="flex justify-between mb-2">
                    <h4 className="font-semibold">{item.week}</h4>
                    <span className="text-sm font-medium text-blue-600">
                      {item.progress}% Complete
                    </span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600 rounded-full"
                      style={{ width: `${item.progress}%` }}
                    ></div>
                  </div>
                  <p className="mt-2 text-sm text-gray-600">
                    Focus: {item.focus}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-6 flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button>
            Adjust Plan
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StudyPlanDialog;
