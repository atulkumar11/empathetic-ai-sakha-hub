
import React from 'react';
import { Label } from "@/components/ui/label";
import { 
  Sunrise, 
  Sun, 
  Sunset, 
  Moon,
  Check
} from "lucide-react";

interface StudyTimeStepProps {
  studyTime: string; 
  setStudyTime: (time: "Morning" | "Afternoon" | "Evening" | "Night") => void;
}

const StudyTimeStep: React.FC<StudyTimeStepProps> = ({ studyTime, setStudyTime }) => {
  const timeOptions = [
    {
      value: "Morning",
      label: "Morning",
      description: "Early hours, 6 AM - 11 AM",
      icon: <Sunrise className="h-6 w-6 text-amber-500" />
    },
    {
      value: "Afternoon",
      label: "Afternoon",
      description: "Midday hours, 12 PM - 4 PM",
      icon: <Sun className="h-6 w-6 text-orange-500" />
    },
    {
      value: "Evening",
      label: "Evening",
      description: "After sunset, 5 PM - 8 PM",
      icon: <Sunset className="h-6 w-6 text-indigo-500" />
    },
    {
      value: "Night",
      label: "Night",
      description: "Late hours, 9 PM - 12 AM",
      icon: <Moon className="h-6 w-6 text-blue-500" />
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">When do you prefer to study?</h2>
        <p className="text-muted-foreground">
          We'll optimize your study plan for your most productive hours
        </p>
      </div>

      {/* Improved button-style time selection with clearer feedback */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {timeOptions.map((option) => (
          <div
            key={option.value}
            className={`relative cursor-pointer group transition-all rounded-lg overflow-hidden`}
            onClick={() => setStudyTime(option.value as "Morning" | "Afternoon" | "Evening" | "Night")}
          >
            <div className={`flex items-center gap-4 p-4 border-2 transition-colors ${
              studyTime === option.value
                ? 'bg-indigo-50 border-indigo-400 dark:bg-indigo-900/30 dark:border-indigo-700 shadow-md'
                : 'border-gray-200 hover:bg-indigo-50/50 hover:border-indigo-200 dark:border-gray-700 dark:hover:bg-indigo-900/10 dark:hover:border-indigo-800'
            }`}>
              <div className="p-3 rounded-full bg-white dark:bg-gray-800 shadow-sm">
                {option.icon}
              </div>
              <div className="text-left">
                <div className="font-medium text-lg">{option.label}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">{option.description}</div>
              </div>
              {studyTime === option.value && (
                <div className="ml-auto">
                  <div className="bg-indigo-100 dark:bg-indigo-800/60 rounded-full p-1.5">
                    <Check className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                  </div>
                </div>
              )}
            </div>

            {/* Selection overlay for accessibility and clearer feedback */}
            {studyTime !== option.value && (
              <div className="absolute inset-0 bg-indigo-500/0 hover:bg-indigo-500/5 transition-colors" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudyTimeStep;
