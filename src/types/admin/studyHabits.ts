
export interface StudySession {
  id: string;
  studentId: string;
  date: Date;
  startTime: Date;
  endTime: Date;
  duration: number; // in minutes
  subject: string;
  topics: string[];
  completed: boolean;
  moodBefore?: number; // 1-10 scale
  moodAfter?: number; // 1-10 scale
  notes?: string;
}

export interface StudyHabit {
  id: string;
  studentId: string;
  weekStartDate: Date;
  weekEndDate: Date;
  totalSessions: number;
  totalMinutes: number;
  daysStudied: number; // 0-7
  uniqueSubjects: number;
  averageDailyDuration: number;
  consistencyScore: number; // 0-100
}

export interface StudyHabitSettings {
  minSessionsPerWeek: number; // e.g., 4 sessions minimum per week
  minDaysPerWeek: number; // e.g., 4 different days per week
  minMinutesPerSession: number; // e.g., 30 minutes minimum per session
  consistencyThreshold: number; // e.g., 80 (percent) - threshold to be considered "consistent"
  trackingPeriodWeeks: number; // e.g., 2 weeks - the period to evaluate consistency
}

export interface StudyHabitAnalytics {
  totalStudents: number;
  studentsWithConsistentHabits: number;
  averageWeeklySessions: number;
  averageWeeklyStudyHours: number;
  mostPopularStudyDays: { day: string; count: number }[];
  mostPopularStudyTimes: { timeSlot: string; count: number }[];
  subjectDistribution: { subject: string; percentage: number }[];
}
