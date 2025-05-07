
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface SentimentStepProps {
  onMoodSelect: (mood: string) => void;
  isUpdate?: boolean;
}

const SentimentStep: React.FC<SentimentStepProps> = ({ onMoodSelect, isUpdate = false }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const moodOptions = [
    "😊 Motivated", "🤔 Curious", "😐 Neutral", "😓 Tired", "😔 Stressed"
  ];

  const handleMoodSelect = (mood: string) => {
    onMoodSelect(mood);
    
    if (isUpdate) {
      toast({
        title: "Mood Updated",
        description: `Your mood has been logged as ${mood}`,
      });
      
      // If this is an update from the dashboard, close the modal or navigate back
      navigate("/dashboard/student");
    }
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {moodOptions.map((mood) => (
        <Button
          key={mood}
          onClick={() => handleMoodSelect(mood)}
          className="bg-white hover:bg-blue-50 text-blue-700 border border-blue-200 h-auto py-4 flex flex-col items-center"
          variant="outline"
        >
          <span className="text-2xl mb-2">{mood.split(" ")[0]}</span>
          <span>{mood.split(" ")[1]}</span>
        </Button>
      ))}
    </div>
  );
};

export default SentimentStep;
