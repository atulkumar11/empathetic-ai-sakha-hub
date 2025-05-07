
import React from "react";
import { motion } from "framer-motion";
import { Slider } from "@/components/ui/slider";
import { Clock, AlertCircle } from "lucide-react";

interface StudyHoursStepProps {
  studyHours: number;
  setStudyHours: (hours: number) => void;
  normalizedGoalTitle?: string;
}

export default function StudyHoursStep({ studyHours, setStudyHours, normalizedGoalTitle }: StudyHoursStepProps) {
  return (
    <motion.div
      key="step2"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
            <Clock className="text-indigo-500" size={20} />
            Daily Study Hours
          </h3>
          <p className="text-muted-foreground mb-4">How many hours can you dedicate to studying each day?</p>
          
          <div className="space-y-6 py-4">
            <div className="flex justify-between items-center">
              <span className="text-sm">Hours: {studyHours}</span>
            </div>
            <Slider
              defaultValue={[studyHours]}
              max={12}
              min={1}
              step={0.5}
              onValueChange={(value) => setStudyHours(value[0])}
              className="cursor-pointer"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>1 hour</span>
              <span>6 hours</span>
              <span>12 hours</span>
            </div>
          </div>
          
          <div className="mt-4 bg-indigo-50 p-4 rounded-md">
            <p className="text-sm flex items-center gap-2">
              <AlertCircle size={16} className="text-indigo-500" />
              <span>For {normalizedGoalTitle === "UPSC" ? "UPSC" : "this exam"}, a minimum of {normalizedGoalTitle === "UPSC" ? "6-8" : "4-6"} hours daily is recommended for optimal preparation.</span>
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
