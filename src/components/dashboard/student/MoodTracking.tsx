
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SmilePlus, ArrowRight } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { MoodType } from '@/types/user/base';
import { motion } from 'framer-motion';

const MoodTracking: React.FC = () => {
  const [currentMood, setCurrentMood] = useState<MoodType | null>(null);
  const [open, setOpen] = useState(false);
  
  const handleMoodSelect = (mood: MoodType) => {
    setCurrentMood(mood);
    setOpen(false);
    
    // Save to localStorage
    const userData = localStorage.getItem("userData");
    if (userData) {
      const parsedData = JSON.parse(userData);
      parsedData.mood = mood;
      localStorage.setItem("userData", JSON.stringify(parsedData));
    } else {
      localStorage.setItem("userData", JSON.stringify({ mood }));
    }
  };
  
  const moods: { label: string; emoji: string; value: MoodType; color: string }[] = [
    { label: 'Happy', emoji: '😊', value: MoodType.Happy, color: 'bg-yellow-100 dark:bg-yellow-900/30' },
    { label: 'Motivated', emoji: '💪', value: MoodType.Motivated, color: 'bg-green-100 dark:bg-green-900/30' },
    { label: 'Focused', emoji: '🧠', value: MoodType.Focused, color: 'bg-blue-100 dark:bg-blue-900/30' },
    { label: 'Neutral', emoji: '😐', value: MoodType.Neutral, color: 'bg-gray-100 dark:bg-gray-800/50' },
    { label: 'Tired', emoji: '😴', value: MoodType.Tired, color: 'bg-indigo-100 dark:bg-indigo-900/30' },
    { label: 'Anxious', emoji: '😰', value: MoodType.Anxious, color: 'bg-amber-100 dark:bg-amber-900/30' },
    { label: 'Stressed', emoji: '😓', value: MoodType.Stressed, color: 'bg-red-100 dark:bg-red-900/30' },
    { label: 'Sad', emoji: '😢', value: MoodType.Sad, color: 'bg-purple-100 dark:bg-purple-900/30' },
  ];
  
  // Load mood from localStorage on first render
  React.useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      const parsedData = JSON.parse(userData);
      if (parsedData.mood) {
        setCurrentMood(parsedData.mood);
      }
    }
  }, []);

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center">
          <SmilePlus className="mr-2 h-5 w-5 text-primary" />
          Mood Tracking
        </CardTitle>
        <CardDescription>How are you feeling today?</CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        {currentMood ? (
          <div className="space-y-4">
            <div className={`rounded-lg p-4 ${moods.find(m => m.value === currentMood)?.color}`}>
              <div className="flex items-center mb-2">
                <span className="text-3xl mr-3">
                  {moods.find(m => m.value === currentMood)?.emoji}
                </span>
                <div>
                  <p className="font-medium">{moods.find(m => m.value === currentMood)?.label}</p>
                  <p className="text-xs text-muted-foreground">Logged just now</p>
                </div>
              </div>
              <p className="text-sm">
                {currentMood === MoodType.Happy && "Great mood! This is a perfect time to tackle challenging concepts."}
                {currentMood === MoodType.Motivated && "You're in peak condition for productive study sessions!"}
                {currentMood === MoodType.Focused && "Excellent! Your concentration is high, ideal for deep learning."}
                {currentMood === MoodType.Neutral && "A balanced state of mind, good for steady progress."}
                {currentMood === MoodType.Tired && "Consider shorter study sessions with more frequent breaks today."}
                {currentMood === MoodType.Anxious && "Try some breathing exercises before starting your studies."}
                {currentMood === MoodType.Stressed && "Focus on review rather than new concepts today."}
                {currentMood === MoodType.Sad && "Start with small, achievable goals to build momentum."}
              </p>
            </div>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => setOpen(true)}
            >
              Change Mood
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="text-center py-6">
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <SmilePlus className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                <p>No mood logged today</p>
                <p className="text-sm text-muted-foreground">
                  Logging your mood helps us adapt your study plan for better results
                </p>
              </motion.div>
            </div>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button className="w-full">
                  Log Your Mood
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-72">
                <div className="space-y-2 p-2">
                  <h4 className="font-medium text-center">Select your mood</h4>
                  <div className="grid grid-cols-4 gap-2">
                    {moods.map((mood) => (
                      <Button
                        key={mood.value}
                        variant="ghost"
                        className="flex flex-col items-center p-2 h-auto"
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
          </div>
        )}
        
        <div className="mt-4 pt-4 border-t">
          <p className="text-xs text-muted-foreground mb-2">Previous moods</p>
          <div className="flex flex-wrap gap-2">
            <div className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded text-xs">
              Focused (Yesterday)
            </div>
            <div className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded text-xs">
              Motivated (2 days ago)
            </div>
            <div className="px-2 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 rounded text-xs">
              Anxious (3 days ago)
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MoodTracking;
