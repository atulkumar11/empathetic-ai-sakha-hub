
import React from "react";
import { Button } from "@/components/ui/button";
import { FastForward, Play, Pause, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface StudyPaceStepProps {
  onStudyPaceSelect: (pace: "Aggressive" | "Balanced" | "Relaxed") => void;
}

const StudyPaceStep: React.FC<StudyPaceStepProps> = ({ onStudyPaceSelect }) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
          <FastForward className="text-amber-500" size={20} />
          Study Pace Preference
        </h3>
        <p className="text-muted-foreground mb-4">How intensive would you like your study plan to be?</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Button 
            variant="outline"
            onClick={() => onStudyPaceSelect("Aggressive")}
            className="h-24 flex flex-col items-center justify-center space-y-2 hover:bg-amber-600 hover:text-white"
          >
            <FastForward size={24} />
            <span>Aggressive</span>
          </Button>
          
          <Button 
            variant="outline"
            onClick={() => onStudyPaceSelect("Balanced")}
            className="h-24 flex flex-col items-center justify-center space-y-2 hover:bg-emerald-600 hover:text-white"
          >
            <Play size={24} />
            <span>Balanced</span>
          </Button>
          
          <Button 
            variant="outline"
            onClick={() => onStudyPaceSelect("Relaxed")}
            className="h-24 flex flex-col items-center justify-center space-y-2 hover:bg-blue-600 hover:text-white"
          >
            <Pause size={24} />
            <span>Relaxed</span>
          </Button>
        </div>
        
        <div className="mt-4 bg-amber-50 p-4 rounded-md">
          <p className="text-sm flex items-center gap-2">
            <AlertCircle size={16} className="text-amber-500" />
            <span>
              Choose a pace that suits your learning style. Aggressive pace fits more content in less time, Balanced provides steady progression, and Relaxed pace gives more time for review.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default StudyPaceStep;
