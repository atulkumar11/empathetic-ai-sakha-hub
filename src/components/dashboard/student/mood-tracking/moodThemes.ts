
import { MoodType } from '@/types/user/base';

export interface MoodTheme {
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

export interface MoodThemesType {
  [MoodType.Happy]: MoodTheme;
  [MoodType.Focused]: MoodTheme;
  [MoodType.Tired]: MoodTheme;
  [MoodType.Stressed]: MoodTheme;
  [MoodType.Curious]: MoodTheme;
  [MoodType.Okay]: MoodTheme;
  [MoodType.Overwhelmed]: MoodTheme;
  [MoodType.Anxious]: MoodTheme;
  [MoodType.Motivated]: MoodTheme;
  [MoodType.Confused]: MoodTheme;
  [MoodType.Neutral]: MoodTheme;
  [MoodType.Sad]: MoodTheme;
}

export const MoodThemes: MoodThemesType = {
  [MoodType.Happy]: {
    backgroundColor: 'bg-amber-50',
    textColor: 'text-amber-800',
    borderColor: 'border-amber-200',
    darkBackgroundColor: 'dark:bg-amber-900/20',
    darkTextColor: 'dark:text-amber-300',
    darkBorderColor: 'dark:border-amber-800/30',
    emoji: '😊',
    message: "You're in a great mood! Perfect time for challenging material.",
    studyTip: "Take advantage of your positive energy by tackling difficult concepts."
  },
  [MoodType.Focused]: {
    backgroundColor: 'bg-blue-50',
    textColor: 'text-blue-800',
    borderColor: 'border-blue-200',
    darkBackgroundColor: 'dark:bg-blue-900/20',
    darkTextColor: 'dark:text-blue-300',
    darkBorderColor: 'dark:border-blue-800/30',
    emoji: '🧐',
    message: "You're highly focused today - perfect for deep work.",
    studyTip: "Use this focus for complex problem-solving or detailed note-taking."
  },
  [MoodType.Tired]: {
    backgroundColor: 'bg-gray-50',
    textColor: 'text-gray-800',
    borderColor: 'border-gray-200',
    darkBackgroundColor: 'dark:bg-gray-900/20',
    darkTextColor: 'dark:text-gray-300',
    darkBorderColor: 'dark:border-gray-800/30',
    emoji: '😴',
    message: "You're feeling tired - take it easy today.",
    studyTip: "Focus on review rather than new material, and take more frequent breaks."
  },
  [MoodType.Stressed]: {
    backgroundColor: 'bg-red-50',
    textColor: 'text-red-800',
    borderColor: 'border-red-200',
    darkBackgroundColor: 'dark:bg-red-900/20',
    darkTextColor: 'dark:text-red-300',
    darkBorderColor: 'dark:border-red-800/30',
    emoji: '😓',
    message: "You're feeling stressed - let's adjust your plan.",
    studyTip: "Try shorter study sessions with relaxation breaks in between."
  },
  [MoodType.Curious]: {
    backgroundColor: 'bg-indigo-50',
    textColor: 'text-indigo-800',
    borderColor: 'border-indigo-200',
    darkBackgroundColor: 'dark:bg-indigo-900/20',
    darkTextColor: 'dark:text-indigo-300',
    darkBorderColor: 'dark:border-indigo-800/30',
    emoji: '🤓',
    message: "Your curiosity is piqued - follow your interests!",
    studyTip: "Great time to explore new concepts or dive deeper into topics you enjoy."
  },
  [MoodType.Okay]: {
    backgroundColor: 'bg-green-50',
    textColor: 'text-green-800',
    borderColor: 'border-green-200',
    darkBackgroundColor: 'dark:bg-green-900/20',
    darkTextColor: 'dark:text-green-300',
    darkBorderColor: 'dark:border-green-800/30',
    emoji: '👍',
    message: "You're feeling balanced - steady progress ahead.",
    studyTip: "Good day for a mix of review and new material."
  },
  [MoodType.Overwhelmed]: {
    backgroundColor: 'bg-purple-50',
    textColor: 'text-purple-800',
    borderColor: 'border-purple-200',
    darkBackgroundColor: 'dark:bg-purple-900/20',
    darkTextColor: 'dark:text-purple-300',
    darkBorderColor: 'dark:border-purple-800/30',
    emoji: '😩',
    message: "Feeling overwhelmed? Let's break things down.",
    studyTip: "Focus on one small task at a time. Celebrate small wins."
  },
  [MoodType.Anxious]: {
    backgroundColor: 'bg-orange-50',
    textColor: 'text-orange-800',
    borderColor: 'border-orange-200',
    darkBackgroundColor: 'dark:bg-orange-900/20',
    darkTextColor: 'dark:text-orange-300',
    darkBorderColor: 'dark:border-orange-800/30',
    emoji: '😰',
    message: "You're feeling anxious - let's find some calm.",
    studyTip: "Start with easy review to build confidence before tackling new material."
  },
  [MoodType.Motivated]: {
    backgroundColor: 'bg-emerald-50',
    textColor: 'text-emerald-800',
    borderColor: 'border-emerald-200',
    darkBackgroundColor: 'dark:bg-emerald-900/20',
    darkTextColor: 'dark:text-emerald-300',
    darkBorderColor: 'dark:border-emerald-800/30',
    emoji: '💪',
    message: "You're highly motivated - let's make the most of it!",
    studyTip: "Great time to tackle your most challenging subjects or assignments."
  },
  [MoodType.Confused]: {
    backgroundColor: 'bg-cyan-50',
    textColor: 'text-cyan-800',
    borderColor: 'border-cyan-200',
    darkBackgroundColor: 'dark:bg-cyan-900/20',
    darkTextColor: 'dark:text-cyan-300',
    darkBorderColor: 'dark:border-cyan-800/30',
    emoji: '🤔',
    message: "Feeling confused? Let's build clarity.",
    studyTip: "Go back to basics and focus on understanding fundamentals first."
  },
  [MoodType.Neutral]: {
    backgroundColor: 'bg-slate-50',
    textColor: 'text-slate-800',
    borderColor: 'border-slate-200',
    darkBackgroundColor: 'dark:bg-slate-900/20',
    darkTextColor: 'dark:text-slate-300',
    darkBorderColor: 'dark:border-slate-800/30',
    emoji: '😐',
    message: "You're in a neutral mood - steady and balanced.",
    studyTip: "Follow your regular study plan - good day for consistent work."
  },
  [MoodType.Sad]: {
    backgroundColor: 'bg-sky-50',
    textColor: 'text-sky-800',
    borderColor: 'border-sky-200',
    darkBackgroundColor: 'dark:bg-sky-900/20',
    darkTextColor: 'dark:text-sky-300',
    darkBorderColor: 'dark:border-sky-800/30',
    emoji: '😔',
    message: "You're feeling down today - be gentle with yourself.",
    studyTip: "Light review of favorite subjects might be better than tackling challenging new material."
  }
};

export const getMoodTheme = (mood: MoodType): MoodTheme => {
  return MoodThemes[mood] || MoodThemes[MoodType.Neutral];
};
