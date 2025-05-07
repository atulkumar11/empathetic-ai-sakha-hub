
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FastForward, Play, Pause, AlertCircle } from "lucide-react";

interface StudyPaceStepProps {
  studyPace: "Aggressive" | "Balanced" | "Relaxed";
  setStudyPace: (pace: "Aggressive" | "Balanced" | "Relaxed") => void;
}

export default function StudyPaceStep({ studyPace, setStudyPace }: StudyPaceStepProps) {
  return (
    <motion.div
      key="step4"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
            <FastForward className="text-amber-500" size={20} />
            Study Pace Preference
          </h3>
          <p className="text-muted-foreground mb-4">How intensive would you like your study plan to be?</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <Button 
              variant={studyPace === "Aggressive" ? "default" : "outline"}
              onClick={() => setStudyPace("Aggressive")}
              className={cn(
                "h-24 flex flex-col items-center justify-center space-y-2",
                studyPace === "Aggressive" && "bg-amber-600 hover:bg-amber-700"
              )}
            >
              <FastForward size={24} />
              <span>Aggressive</span>
            </Button>
            
            <Button 
              variant={studyPace === "Balanced" ? "default" : "outline"}
              onClick={() => setStudyPace("Balanced")}
              className={cn(
                "h-24 flex flex-col items-center justify-center space-y-2",
                studyPace === "Balanced" && "bg-emerald-600 hover:bg-emerald-700"
              )}
            >
              <Play size={24} />
              <span>Balanced</span>
            </Button>
            
            <Button 
              variant={studyPace === "Relaxed" ? "default" : "outline"}
              onClick={() => setStudyPace("Relaxed")}
              className={cn(
                "h-24 flex flex-col items-center justify-center space-y-2",
                studyPace === "Relaxed" && "bg-blue-600 hover:bg-blue-700"
              )}
            >
              <Pause size={24} />
              <span>Relaxed</span>
            </Button>
          </div>
          
          <div className="mt-4 bg-amber-50 p-4 rounded-md">
            <p className="text-sm flex items-center gap-2">
              <AlertCircle size={16} className="text-amber-500" />
              <span>
                {studyPace === "Aggressive" && "Aggressive pace fits more content in less time. Best for those with strong discipline."}
                {studyPace === "Balanced" && "Balanced pace provides a steady progression with regular breaks. Ideal for most students."}
                {studyPace === "Relaxed" && "Relaxed pace spreads content over longer periods with more review time. Good for reducing stress."}
              </span>
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
