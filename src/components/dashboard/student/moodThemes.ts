
import { MoodType } from "@/types/user/base";

interface MoodTheme {
  backgroundColor: string;
  textColor: string;
  borderColor: string;
  darkBackgroundColor: string;
  darkTextColor: string;
  darkBorderColor: string;
  emoji: string;
  message: string;
  studyTip: string;
}

type MoodThemes = {
  [key in MoodType]: MoodTheme
};

export const moodThemes: MoodThemes = {
  [MoodType.Happy]: {
    backgroundColor: "#FEF3C7",
    textColor: "#92400E",
    borderColor: "#FCD34D",
    darkBackgroundColor: "rgba(251, 191, 36, 0.2)",
    darkTextColor: "#FBBF24",
    darkBorderColor: "#D97706",
    emoji: "😊",
    message: "You're in a good mood!",
    studyTip: "This is a great time to tackle challenging subjects or start new material."
  },
  [MoodType.Motivated]: {
    backgroundColor: "#ECFDF5",
    textColor: "#065F46",
    borderColor: "#6EE7B7",
    darkBackgroundColor: "rgba(16, 185, 129, 0.2)",
    darkTextColor: "#10B981",
    darkBorderColor: "#059669",
    emoji: "💪",
    message: "You're feeling motivated today!",
    studyTip: "Channel this energy into your most important topics and aim for deep work sessions."
  },
  [MoodType.Focused]: {
    backgroundColor: "#EFF6FF",
    textColor: "#1E40AF",
    borderColor: "#93C5FD",
    darkBackgroundColor: "rgba(59, 130, 246, 0.2)",
    darkTextColor: "#3B82F6",
    darkBorderColor: "#2563EB",
    emoji: "🧠",
    message: "You're in a focused state of mind!",
    studyTip: "Perfect time for complex problem-solving and detailed conceptual work."
  },
  [MoodType.Neutral]: {
    backgroundColor: "#F3F4F6",
    textColor: "#4B5563",
    borderColor: "#D1D5DB",
    darkBackgroundColor: "rgba(107, 114, 128, 0.2)",
    darkTextColor: "#9CA3AF",
    darkBorderColor: "#6B7280",
    emoji: "😐",
    message: "You're feeling neutral today.",
    studyTip: "Good for balanced study sessions across multiple subjects."
  },
  [MoodType.Tired]: {
    backgroundColor: "#EEF2FF",
    textColor: "#4338CA",
    borderColor: "#A5B4FC",
    darkBackgroundColor: "rgba(79, 70, 229, 0.2)",
    darkTextColor: "#818CF8",
    darkBorderColor: "#4F46E5",
    emoji: "😴",
    message: "You're feeling tired today.",
    studyTip: "Try shorter study sessions with more frequent breaks. Focus on review rather than new material."
  },
  [MoodType.Anxious]: {
    backgroundColor: "#FEF3C7",
    textColor: "#92400E",
    borderColor: "#FCD34D",
    darkBackgroundColor: "rgba(245, 158, 11, 0.2)",
    darkTextColor: "#FBBF24",
    darkBorderColor: "#D97706",
    emoji: "😰",
    message: "You're feeling anxious today.",
    studyTip: "Start with something easy to build confidence. Take breaks for deep breathing exercises."
  },
  [MoodType.Stressed]: {
    backgroundColor: "#FEE2E2",
    textColor: "#B91C1C",
    borderColor: "#FECACA",
    darkBackgroundColor: "rgba(239, 68, 68, 0.2)",
    darkTextColor: "#EF4444",
    darkBorderColor: "#DC2626",
    emoji: "😓",
    message: "You're feeling stressed today.",
    studyTip: "Choose review activities over new concepts. Break tasks into smaller chunks."
  },
  [MoodType.Sad]: {
    backgroundColor: "#F3E8FF",
    textColor: "#6D28D9",
    borderColor: "#DDD6FE",
    darkBackgroundColor: "rgba(139, 92, 246, 0.2)",
    darkTextColor: "#A78BFA",
    darkBorderColor: "#7C3AED",
    emoji: "😢",
    message: "You're feeling down today.",
    studyTip: "Focus on subjects you enjoy. Set small, achievable goals to boost your mood."
  },
  [MoodType.Curious]: {
    backgroundColor: "#CFFAFE",
    textColor: "#0E7490",
    borderColor: "#A5F3FC",
    darkBackgroundColor: "rgba(6, 182, 212, 0.2)",
    darkTextColor: "#22D3EE",
    darkBorderColor: "#0891B2",
    emoji: "🤔",
    message: "You're feeling curious today!",
    studyTip: "Great time to explore new topics or dive deeper into concepts that interest you."
  },
  [MoodType.Okay]: {
    backgroundColor: "#E5E7EB",
    textColor: "#374151",
    borderColor: "#D1D5DB",
    darkBackgroundColor: "rgba(75, 85, 99, 0.2)",
    darkTextColor: "#9CA3AF",
    darkBorderColor: "#4B5563",
    emoji: "👍",
    message: "You're feeling okay today.",
    studyTip: "Good for steady progress. Mix review with new material for best results."
  },
  [MoodType.Overwhelmed]: {
    backgroundColor: "#FFEDD5",
    textColor: "#9A3412",
    borderColor: "#FED7AA",
    darkBackgroundColor: "rgba(234, 88, 12, 0.2)",
    darkTextColor: "#FDBA74",
    darkBorderColor: "#C2410C",
    emoji: "😵",
    message: "You're feeling overwhelmed today.",
    studyTip: "Break work into the smallest possible tasks. Focus on one thing at a time."
  }
};

export const getMoodTheme = (mood: MoodType | undefined): MoodTheme => {
  if (!mood || !(mood in moodThemes)) {
    return moodThemes[MoodType.Neutral]; // Default to neutral
  }
  return moodThemes[mood];
};
