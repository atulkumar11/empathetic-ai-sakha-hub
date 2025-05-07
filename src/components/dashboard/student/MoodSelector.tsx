
import React from 'react';
import { MoodType } from '@/types/user/base';
import { Button } from '@/components/ui/button';

interface MoodSelectorProps {
  currentMood?: MoodType;
  onMoodSelect: (mood: MoodType) => void;
  className?: string;
}

export const MoodSelector = ({ onMoodSelect, currentMood, className = '' }: MoodSelectorProps) => {
  const moodOptions = [
    { type: MoodType.Happy, emoji: '😊', label: 'Happy' },
    { type: MoodType.Focused, emoji: '🧐', label: 'Focused' },
    { type: MoodType.Motivated, emoji: '💪', label: 'Motivated' },
    { type: MoodType.Tired, emoji: '😴', label: 'Tired' },
    { type: MoodType.Stressed, emoji: '😓', label: 'Stressed' },
    { type: MoodType.Confused, emoji: '🤔', label: 'Confused' },
    { type: MoodType.Anxious, emoji: '😰', label: 'Anxious' },
    { type: MoodType.Neutral, emoji: '😐', label: 'Neutral' },
    { type: MoodType.Okay, emoji: '👍', label: 'Okay' },
    { type: MoodType.Overwhelmed, emoji: '😩', label: 'Overwhelmed' },
    { type: MoodType.Curious, emoji: '🤓', label: 'Curious' },
    { type: MoodType.Sad, emoji: '😔', label: 'Sad' },
  ];

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {moodOptions.map((mood) => (
        <Button
          key={mood.type}
          variant={currentMood === mood.type ? "default" : "outline"}
          onClick={() => onMoodSelect(mood.type)}
          className="flex flex-col items-center p-2 h-auto"
        >
          <span className="text-xl mb-1">{mood.emoji}</span>
          <span className="text-xs">{mood.label}</span>
        </Button>
      ))}
    </div>
  );
};
