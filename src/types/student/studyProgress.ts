
export interface StudyStreak {
  current: number;
  longest: number;
  lastStudyDate: string;
}

export interface SubjectProgress {
  name: string;
  progress: number;
  color: string;
  masteredConcepts: number;
  totalConcepts: number;
}

export interface StudySession {
  date: string;
  duration: number; // in minutes
  subjectBreakdown: {
    subject: string;
    minutes: number;
  }[];
}

export interface StudyProgressData {
  streak: StudyStreak;
  subjects: SubjectProgress[];
  recentSessions: StudySession[];
  totalStudyTime: number; // in minutes
  weeklyAverage: number; // in minutes
  targetWeekly: number; // in minutes
}
