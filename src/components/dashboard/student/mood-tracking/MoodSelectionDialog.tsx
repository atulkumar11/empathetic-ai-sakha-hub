
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { MoodType } from '@/types/user/base';

interface MoodSelectionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  selectedMood?: MoodType;
  onSelectMood: (mood: MoodType) => void;
}

export const MoodSelectionDialog: React.FC<MoodSelectionDialogProps> = ({
  isOpen,
  onClose,
  selectedMood,
  onSelectMood
}) => {
  const moods = [
    { name: 'Happy', emoji: '😊', value: MoodType.Happy },
    { name: 'Motivated', emoji: '💪', value: MoodType.Motivated },
    { name: 'Focused', emoji: '🧠', value: MoodType.Focused },
    { name: 'Neutral', emoji: '😐', value: MoodType.Neutral },
    { name: 'Tired', emoji: '😴', value: MoodType.Tired },
    { name: 'Anxious', emoji: '😰', value: MoodType.Anxious },
    { name: 'Stressed', emoji: '😓', value: MoodType.Stressed },
    { name: 'Sad', emoji: '😢', value: MoodType.Sad },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>How are you feeling today?</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-4 gap-3 py-4">
          {moods.map((mood) => (
            <Button
              key={mood.value}
              onClick={() => onSelectMood(mood.value)}
              variant={selectedMood === mood.value ? "default" : "outline"}
              className="flex flex-col py-3 h-auto gap-1"
            >
              <span className="text-2xl">{mood.emoji}</span>
              <span className="text-xs">{mood.name}</span>
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MoodSelectionDialog;
