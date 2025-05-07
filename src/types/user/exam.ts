
// Study progress types
export interface SubjectProgress {
  id: string;
  name: string;
  progress: number;
  totalTopics: number;
  completedTopics: number;
  weakAreas: string[];
  strongAreas: string[];
  lastStudied?: string;
  averageScore?: number;
  color?: string; // Added missing property
  topics?: {
    id: string;
    name: string;
    progress: number;
    status: 'completed' | 'in-progress' | 'not-started';
    lastPracticed?: string;
    score?: number;
    completed?: boolean; // Added missing property
    masteryLevel?: number; // Added missing property
  }[];
  quizzes?: {
    id: string;
    name: string;
    score: number;
    date: string;
    timeSpent: number;
    totalQuestions: number;
    correctAnswers: number;
  }[];
  quizScores?: { // Added missing property
    id: string;
    title: string;
    score: number;
    maxScore: number;
    date: string;
    timeTaken: string;
  }[];
  studyHours?: { // Added missing property
    date: string;
    hours: number;
  }[];
}

export interface StudyStreak {
  current: number;
  longest: number;
  lastStudyDate: string;
  weeklyData: {
    date: string;
    minutes: number;
  }[];
  monthlyData: {
    date: string;
    minutes: number;
  }[];
  thisWeek: number[]; // Added missing property
}
