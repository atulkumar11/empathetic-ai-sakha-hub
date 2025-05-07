
// Re-export StudentData from studentData.ts to ensure consistency
export * from './studentData';
export * from './systemLog';

// Admin User Interface
export interface AdminUser {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'super_admin' | 'support';
  permissions: string[];
}

// Admin Settings Interface
export interface AdminSettings {
  id: string;
  userId: string;
  theme: 'light' | 'dark' | 'system';
  notifications: boolean;
  emailAlerts: boolean;
  defaultView: string;
  preferences: Record<string, any>;
}

// Admin Dashboard Stats Interface
export interface AdminDashboardStats {
  totalStudents: number;
  activeStudents: number;
  studentsWithConsistentHabits: number;
  averageMoodScore: number;
  studyPlanEfficiencyImprovement: number;
  averageConfidenceScore: number;
  totalSessions: number;
  moodBasedSessionsCount: number;
  studentsWithMoodTracking: number;
  
  // KPI Stats for homepage
  totalQuestions?: number;
  averageConcepts?: number;
  successRate?: number;
  totalFlashcards?: number;
  totalStudyPlans?: number;
  targetExams?: number;
  newUsersToday?: number;
  
  // New KPIs for admin dashboard
  dailyActiveUsers?: number;
  weeklyActiveUsers?: number;
  monthlyActiveUsers?: number;
  freeUsers?: number;
  paidUsers?: number;
  groupUsers?: number;
  subscriptionConversionRate?: number;
  churnRate?: number;
  averageStudyTimePerUser?: number;
  practiceAttemptsPerUser?: number;
  weakAreaIdentificationRate?: number;
  userSatisfactionScore?: number;
  referralRate?: number;
  totalRevenue?: number;

  // Verified metrics
  verifiedMoodImprovement?: number;
  averageTimeSavedPerWeek?: number;
  studentsWithVerifiedConsistentHabits?: number;
  verifiedExamConfidenceImprovement?: number;
  verifiedRetentionRate?: number;
  verifiedMoodFeatureUsage?: number;
  completedSurveys?: number;
}
