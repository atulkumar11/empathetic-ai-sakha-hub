
export interface SystemLog {
  id: string;
  timestamp: string;
  level: 'info' | 'warning' | 'error' | 'debug';
  message: string;
  source: string;
  details?: Record<string, any>;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'super_admin' | 'admin' | 'moderator';
  permissions: string[];
  lastLogin?: string;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  billingCycle: 'monthly' | 'yearly';
  features: string[];
  isActive: boolean;
}

export interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  newUsersToday: number;
  totalRevenue: number;
  subscriptionsByPlan: Record<string, number>;
  dailyActiveUsers: { date: string; count: number }[];
  
  // Add missing properties for SystemAnalyticsTab component
  verifiedMoodImprovement: number;
  averageMoodScore: number;
  averageTimeSavedPerWeek: number;
  studyPlanEfficiencyImprovement: number;
  studentsWithVerifiedConsistentHabits: number;
  studentsWithConsistentHabits: number;
  totalStudents: number;
  verifiedExamConfidenceImprovement: number;
  averageConfidenceScore: number;
  verifiedRetentionRate: number;
  activeStudents: number;
  verifiedMoodFeatureUsage: number;
  moodBasedSessionsCount: number;
  totalSessions: number;
  completedSurveys: number;
}

// Alias for DashboardStats to maintain compatibility
export type AdminDashboardStats = DashboardStats;
