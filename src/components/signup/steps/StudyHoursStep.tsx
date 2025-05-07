
import React from "react";
import { Slider } from "@/components/ui/slider";
import { Clock, AlertCircle } from "lucide-react";

interface StudyHoursStepProps {
  onStudyHoursSelect: (hours: number) => void;
  examGoal?: string;
}

const StudyHoursStep: React.FC<StudyHoursStepProps> = ({ onStudyHoursSelect, examGoal }) => {
  const [studyHours, setStudyHours] = React.useState(4);
  
  const handleChange = (value: number[]) => {
    setStudyHours(value[0]);
    onStudyHoursSelect(value[0]);
  };
  
  return (
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
            onValueChange={handleChange}
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
            <span>
              {examGoal === "UPSC" 
                ? "For UPSC, a minimum of 6-8 hours daily is recommended for optimal preparation." 
                : "For competitive exams, a minimum of 4-6 hours daily is recommended for optimal preparation."}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default StudyHoursStep;
