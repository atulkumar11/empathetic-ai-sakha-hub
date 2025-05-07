
import React from "react";
import { Button } from "@/components/ui/button";
import { MoodType } from "@/types/user/base";

interface MoodStepProps {
  onMoodSelect: (mood: MoodType) => void;
}

const MoodStep: React.FC<MoodStepProps> = ({ onMoodSelect }) => {
  // Define the available moods with emojis
  const moods: { type: MoodType; emoji: string; label: string }[] = [
    { type: "happy", emoji: "😊", label: "Happy" },
    { type: "motivated", emoji: "💪", label: "Motivated" },
    { type: "focused", emoji: "🧠", label: "Focused" },
    { type: "neutral", emoji: "😐", label: "Neutral" },
    { type: "tired", emoji: "😴", label: "Tired" },
    { type: "anxious", emoji: "😰", label: "Anxious" },
    { type: "stressed", emoji: "😓", label: "Stressed" },
    { type: "sad", emoji: "😢", label: "Sad" },
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        {moods.map((mood) => (
          <Button
            key={mood.type}
            onClick={() => onMoodSelect(mood.type)}
            className="flex flex-col items-center h-auto py-4 px-2"
            variant="outline"
          >
            <span className="text-2xl mb-2">{mood.emoji}</span>
            <span>{mood.label}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default MoodStep;
