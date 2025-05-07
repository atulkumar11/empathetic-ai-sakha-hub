
import React from "react";
import { motion } from "framer-motion";
import { MoodType } from "@/types/user/base";
import { cn } from "@/lib/utils";

interface MoodOptionProps {
  type: MoodType;
  icon: React.ReactNode;
  label: string;
  isSelected: boolean;
  onSelect: () => void;
}

const MoodOption: React.FC<MoodOptionProps> = ({ type, icon, label, isSelected, onSelect }) => {
  // Define color classes based on mood type
  const getMoodColorClasses = (mood: MoodType): string => {
    const colorMap: Record<string, string> = {
      motivated: "bg-orange-100 text-orange-700 border-orange-300 hover:bg-orange-200",
      curious: "bg-blue-100 text-blue-700 border-blue-300 hover:bg-blue-200",
      neutral: "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200",
      tired: "bg-amber-100 text-amber-700 border-amber-300 hover:bg-amber-200",
      stressed: "bg-red-100 text-red-700 border-red-300 hover:bg-red-200",
      focused: "bg-emerald-100 text-emerald-700 border-emerald-300 hover:bg-emerald-200",
      happy: "bg-green-100 text-green-700 border-green-300 hover:bg-green-200",
      okay: "bg-sky-100 text-sky-700 border-sky-300 hover:bg-sky-200",
      overwhelmed: "bg-purple-100 text-purple-700 border-purple-300 hover:bg-purple-200",
      sad: "bg-indigo-100 text-indigo-700 border-indigo-300 hover:bg-indigo-200"
    };
    
    return colorMap[mood] || colorMap.neutral;
  };
  
  const getSelectedClasses = (mood: MoodType): string => {
    const colorMap: Record<string, string> = {
      motivated: "bg-orange-200 ring-2 ring-orange-500 ring-offset-2",
      curious: "bg-blue-200 ring-2 ring-blue-500 ring-offset-2",
      neutral: "bg-gray-200 ring-2 ring-gray-500 ring-offset-2",
      tired: "bg-amber-200 ring-2 ring-amber-500 ring-offset-2",
      stressed: "bg-red-200 ring-2 ring-red-500 ring-offset-2",
      focused: "bg-emerald-200 ring-2 ring-emerald-500 ring-offset-2",
      happy: "bg-green-200 ring-2 ring-green-500 ring-offset-2",
      okay: "bg-sky-200 ring-2 ring-sky-500 ring-offset-2",
      overwhelmed: "bg-purple-200 ring-2 ring-purple-500 ring-offset-2",
      sad: "bg-indigo-200 ring-2 ring-indigo-500 ring-offset-2"
    };
    
    return colorMap[mood] || colorMap.neutral;
  };

  return (
    <motion.button
      onClick={onSelect}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "flex flex-col items-center justify-center rounded-lg p-3 border transition-all",
        getMoodColorClasses(type),
        isSelected && getSelectedClasses(type)
      )}
    >
      <div className="text-2xl mb-1">{icon}</div>
      <span className="text-xs font-medium">{label}</span>
    </motion.button>
  );
};

export default MoodOption;
