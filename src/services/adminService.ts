import { AdminDashboardStats } from '@/types/admin';

// Mock admin data
const mockDashboardStats: AdminDashboardStats = {
  totalUsers: 10000,
  activeUsers: 7500,
  newUsersToday: 120,
  totalRevenue: 500000,
  subscriptionsByPlan: {
    "basic": 5000,
    "premium": 3000,
    "enterprise": 500
  },
  dailyActiveUsers: [
    { date: "2023-01-01", count: 2100 },
    { date: "2023-01-02", count: 2300 },
    { date: "2023-01-03", count: 2000 },
    { date: "2023-01-04", count: 2400 },
    { date: "2023-01-05", count: 2800 }
  ],
  
  // KPI data tied to homepage
  totalStudents: 10000,
  averageConcepts: 850,
  successRate: 95,
  totalQuestions: 500000,
  totalFlashcards: 2000000,
  totalStudyPlans: 12000,
  averageStudyTimePerUser: 6.5,
  targetExams: 20,
  studentsWithMoodTracking: 85,
  verifiedMoodImprovement: 72,
  
  // Other required fields
  averageMoodScore: 4.2,
  averageTimeSavedPerWeek: 3.5,
  studyPlanEfficiencyImprovement: 40,
  studentsWithVerifiedConsistentHabits: 5600,
  studentsWithConsistentHabits: 6500,
  verifiedExamConfidenceImprovement: 80,
  averageConfidenceScore: 4.1,
  verifiedRetentionRate: 85,
  activeStudents: 7500,
  verifiedMoodFeatureUsage: 75,
  moodBasedSessionsCount: 25000,
  totalSessions: 50000,
  completedSurveys: 8500
};

// Admin service for fetching data
export const adminService = {
  // Get admin dashboard statistics
  getDashboardStats: async (): Promise<AdminDashboardStats> => {
    // In a real app, this would fetch from an API
    // For demo purposes, we'll simulate a network request
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockDashboardStats);
      }, 300);
    });
  },
  
  // Update KPI stats
  updateKpiStat: async (key: string, value: number): Promise<boolean> => {
    // In a real app, this would update via API
    console.log(`Updating ${key} to ${value}`);
    
    // Update our mock data
    const keyAsStatKey = key as keyof typeof mockDashboardStats;
    if (typeof mockDashboardStats[keyAsStatKey] === 'number') {
      mockDashboardStats[keyAsStatKey] = value as any;
    }
    
    return true;
  },
  
  // Mock login function
  login: async (email: string, password: string) => {
    // For demo purposes: simple validation - email includes "admin" and password length > 2
    if (email.includes('admin') && password.length > 2) {
      return {
        id: `admin_${Date.now()}`,
        name: 'Admin User',
        email: email,
        role: 'admin'
      };
    }
    
    throw new Error('Invalid credentials');
  }
};

export default adminService;
