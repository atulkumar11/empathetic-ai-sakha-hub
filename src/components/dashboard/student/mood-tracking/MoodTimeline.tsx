import React from "react";
import { MoodType } from "@/types/user/base";
import { Card } from "@/components/ui/card";
import { getMoodTheme } from "./moodThemes";
import { motion } from "framer-motion";

interface MoodTheme {
  emoji: string;
  label: string;
  colors: {
    light: string;
    dark: string;
  };
}

interface MoodTimelineProps {
  moodHistory: Array<{
    mood: MoodType;
    timestamp: Date;
  }>;
}

const MoodTimeline: React.FC<MoodTimelineProps> = ({ moodHistory }) => {
  const lastSevenDays = moodHistory.slice(0, 7).reverse();
  
  return (
    <Card className="p-4">
      <h4 className="text-sm font-medium mb-4">Your Mood Timeline</h4>
      <div className="flex items-center justify-between space-x-2">
        {lastSevenDays.map((entry, index) => (
          <motion.div
            key={index}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="flex flex-col items-center"
          >
            <div 
              className={`w-8 h-8 rounded-full flex items-center justify-center ${getMoodTheme(entry.mood).colors.background}`}
              title={`${entry.mood} on ${entry.timestamp.toLocaleDateString()}`}
            >
              <span className="text-xs">{entry.timestamp.getDate()}</span>
            </div>
            <div className="w-1 h-1 rounded-full mt-1 bg-current" 
                 style={{ color: getMoodTheme(entry.mood).colors.text }} />
          </motion.div>
        ))}
      </div>
    </Card>
  );
};

export default MoodTimeline;
