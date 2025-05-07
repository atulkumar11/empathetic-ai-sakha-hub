
import React from "react";
import { MoodType } from "@/types/user/base";
import { AnimatePresence, motion } from "framer-motion";

interface MoodSpecificContentProps {
  currentMood?: MoodType;
}

// Simplified version - placeholder for mood-specific content
const MoodSpecificContent: React.FC<MoodSpecificContentProps> = ({ currentMood }) => {
  if (!currentMood) return null;
  
  // Map of mood-specific messages
  const moodMessages: Record<string, { title: string; message: string }> = {
    motivated: { 
      title: "You're feeling motivated!", 
      message: "Great time to tackle challenging problems or study difficult concepts." 
    },
    curious: { 
      title: "You're feeling curious!", 
      message: "Perfect time to explore new topics or dive deeper into subjects that interest you." 
    },
    neutral: { 
      title: "You're feeling neutral", 
      message: "Good time to review learned material or organize your notes."
    },
    tired: { 
      title: "You're feeling tired", 
      message: "Consider taking a short break or focusing on lighter subjects." 
    },
    stressed: { 
      title: "You're feeling stressed", 
      message: "Try a short mindfulness exercise before continuing your studies." 
    },
    focused: { 
      title: "You're feeling focused!", 
      message: "Great time to work on complex problems or dive into deep study." 
    },
    happy: { 
      title: "You're feeling happy!", 
      message: "Your positive energy can help with creative thinking and problem solving." 
    },
    okay: { 
      title: "You're feeling okay", 
      message: "A good balanced state for steady progress on your studies." 
    },
    overwhelmed: { 
      title: "You're feeling overwhelmed", 
      message: "Break down your tasks into smaller, manageable chunks." 
    },
    sad: { 
      title: "You're feeling sad", 
      message: "Consider a brief mood-boosting activity before returning to your studies." 
    }
  };

  const moodInfo = moodMessages[currentMood] || {
    title: "Thanks for sharing how you feel",
    message: "We'll tailor your experience accordingly."
  };
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentMood}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700"
      >
        <h3 className="font-medium text-lg mb-2">{moodInfo.title}</h3>
        <p className="text-gray-600 dark:text-gray-300">{moodInfo.message}</p>
      </motion.div>
    </AnimatePresence>
  );
};

export default MoodSpecificContent;
