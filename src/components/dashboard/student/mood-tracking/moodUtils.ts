
import { MoodType } from '@/types/user/base';

export const getMoodDisplayName = (mood?: MoodType): string => {
  if (!mood) return "Set Mood";
  
  const moodMap: Record<MoodType, string> = {
    [MoodType.Happy]: "Happy",
    [MoodType.Focused]: "Focused",
    [MoodType.Tired]: "Tired",
    [MoodType.Stressed]: "Stressed",
    [MoodType.Curious]: "Curious",
    [MoodType.Okay]: "Okay",
    [MoodType.Overwhelmed]: "Overwhelmed",
    [MoodType.Anxious]: "Anxious",
    [MoodType.Motivated]: "Motivated",
    [MoodType.Confused]: "Confused",
    [MoodType.Neutral]: "Neutral",
    [MoodType.Sad]: "Sad"
  };
  
  return moodMap[mood];
};

export const getMoodEmoji = (mood?: MoodType): string => {
  if (!mood) return "📝";
  
  const moodEmojiMap: Record<MoodType, string> = {
    [MoodType.Happy]: "😊",
    [MoodType.Focused]: "🧐",
    [MoodType.Tired]: "😴",
    [MoodType.Stressed]: "😓",
    [MoodType.Curious]: "🤓",
    [MoodType.Okay]: "👍",
    [MoodType.Overwhelmed]: "😩",
    [MoodType.Anxious]: "😰",
    [MoodType.Motivated]: "💪",
    [MoodType.Confused]: "🤔",
    [MoodType.Neutral]: "😐",
    [MoodType.Sad]: "😔"
  };
  
  return moodEmojiMap[mood];
};

export const getMoodColor = (mood?: MoodType): string => {
  if (!mood) return "bg-gray-100 text-gray-800";
  
  const moodColorMap: Record<MoodType, string> = {
    [MoodType.Happy]: "bg-amber-100 text-amber-800",
    [MoodType.Focused]: "bg-blue-100 text-blue-800",
    [MoodType.Tired]: "bg-gray-100 text-gray-800",
    [MoodType.Stressed]: "bg-red-100 text-red-800",
    [MoodType.Curious]: "bg-indigo-100 text-indigo-800",
    [MoodType.Okay]: "bg-green-100 text-green-800",
    [MoodType.Overwhelmed]: "bg-purple-100 text-purple-800",
    [MoodType.Anxious]: "bg-orange-100 text-orange-800",
    [MoodType.Motivated]: "bg-emerald-100 text-emerald-800",
    [MoodType.Confused]: "bg-cyan-100 text-cyan-800",
    [MoodType.Neutral]: "bg-slate-100 text-slate-800",
    [MoodType.Sad]: "bg-sky-100 text-sky-800"
  };
  
  return moodColorMap[mood];
};

export const getMoodStudyTip = (mood?: MoodType): string => {
  if (!mood) return "Set your mood to get personalized study tips";
  
  const moodTipMap: Record<MoodType, string> = {
    [MoodType.Happy]: "Great mood! Take on challenging concepts today, your positivity will help you tackle difficult material.",
    [MoodType.Focused]: "Your focus is sharp! Perfect time for deep work on complex topics that require concentration.",
    [MoodType.Tired]: "Take it easy today with lighter review sessions and more breaks. Quality over quantity!",
    [MoodType.Stressed]: "Try short study bursts with relaxation breaks. Focus on reviewing familiar material for confidence.",
    [MoodType.Curious]: "Channel that curiosity into exploring new concepts or diving deeper into topics you enjoy.",
    [MoodType.Okay]: "You're in a balanced state - good for steady progress through your study plan.",
    [MoodType.Overwhelmed]: "Break tasks into smaller chunks. Focus on just one small goal at a time.",
    [MoodType.Anxious]: "Start with easy wins to build confidence. Try the Pomodoro technique with short sessions.",
    [MoodType.Motivated]: "Harness this energy to tackle your most challenging or least favorite subjects first!",
    [MoodType.Confused]: "Focus on clarifying concepts. Revisit fundamentals and create simple summaries.",
    [MoodType.Neutral]: "A balanced approach works well today - mix review with new material.",
    [MoodType.Sad]: "Be kind to yourself. Choose lighter material or review familiar concepts that bring a sense of accomplishment."
  };
  
  return moodTipMap[mood];
};
