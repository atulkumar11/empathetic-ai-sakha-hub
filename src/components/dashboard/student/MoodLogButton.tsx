
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { SmilePlus } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { MoodType } from '@/types/user/base';

interface MoodLogButtonProps {
  currentMood?: MoodType;
  onMoodChange?: (mood: MoodType) => void;
  className?: string;
}

const MoodLogButton: React.FC<MoodLogButtonProps> = ({
  currentMood,
  onMoodChange,
  className = '',
}) => {
  const [open, setOpen] = useState(false);
  
  const handleMoodSelect = (mood: MoodType) => {
    if (onMoodChange) {
      onMoodChange(mood);
    }
    setOpen(false);
  };
  
  const moods: { label: string; emoji: string; value: MoodType }[] = [
    { label: 'Happy', emoji: '😊', value: MoodType.Happy },
    { label: 'Motivated', emoji: '💪', value: MoodType.Motivated },
    { label: 'Focused', emoji: '🧠', value: MoodType.Focused },
    { label: 'Neutral', emoji: '😐', value: MoodType.Neutral },
    { label: 'Tired', emoji: '😴', value: MoodType.Tired },
    { label: 'Anxious', emoji: '😰', value: MoodType.Anxious },
    { label: 'Stressed', emoji: '😓', value: MoodType.Stressed },
    { label: 'Sad', emoji: '😢', value: MoodType.Sad },
  ];
  
  const currentMoodEmoji = currentMood 
    ? moods.find(m => m.value === currentMood)?.emoji 
    : '📝';
    
  const currentMoodLabel = currentMood 
    ? moods.find(m => m.value === currentMood)?.label 
    : 'Log Mood';

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className={`flex items-center gap-2 ${className}`}
        >
          {currentMoodEmoji && <span>{currentMoodEmoji}</span>}
          <span>{currentMoodLabel}</span>
          <SmilePlus className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-4" align="end">
        <div className="space-y-2">
          <h4 className="font-medium text-sm">How are you feeling?</h4>
          <p className="text-xs text-muted-foreground">
            Logging your mood helps us personalize your study plan.
          </p>
          <div className="grid grid-cols-4 gap-2 pt-2">
            {moods.map((mood) => (
              <Button
                key={mood.value}
                variant="ghost"
                className="flex flex-col items-center px-2 py-3 h-auto"
                onClick={() => handleMoodSelect(mood.value)}
              >
                <span className="text-2xl mb-1">{mood.emoji}</span>
                <span className="text-xs">{mood.label}</span>
              </Button>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default MoodLogButton;
