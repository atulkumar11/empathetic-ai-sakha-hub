import { useState, useEffect } from 'react';
import { UserProfileType } from '@/types/user';
import { DashboardData, Subject, ConceptCard, ProgressTracker, RevisionStats, Milestone } from '@/types/student/dashboard';
import { useKpiTracking } from './useKpiTracking';
import { useUserProfile } from './useUserProfile';
import { UserRole } from '@/types/user/base';

// In a real application, this would fetch data from an API
export function useStudentDashboardData(): {
  loading: boolean;
  dashboardData: DashboardData | null;
  refreshData: () => void;
} {
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const { kpis } = useKpiTracking(UserRole.Student);
  const { userProfile } = useUserProfile(UserRole.Student);

  const fetchDashboardData = () => {
    setLoading(true);
    
    // Simulate API fetch with timeout
    setTimeout(() => {
      if (userProfile) {
        // This would be an API call in a real app
        const mockData: DashboardData = generateMockDashboardData(userProfile);
        setDashboardData(mockData);
      }
      setLoading(false);
    }, 800);
  };

  useEffect(() => {
    if (userProfile) {
      fetchDashboardData();
    }
  }, [userProfile]);

  const refreshData = () => {
    fetchDashboardData();
  };

  return {
    loading,
    dashboardData,
    refreshData
  };
}

// Temporary mock data generator - this would be replaced by actual API calls
function generateMockDashboardData(userProfile: UserProfileType): DashboardData {
  // Extract exam goal from user profile if available
  const examGoal = userProfile.goals && userProfile.goals.length > 0
    ? userProfile.goals[0].title
    : "IIT-JEE"; // Default goal
  
  // Generate subjects
  const subjects: Subject[] = [
    {
      id: "math-101",
      name: "Mathematics",
      progress: 75,
      priority: "High",
      proficiency: 85,
      status: "in-progress",
      chapters: 12,
      conceptsTotal: 60,
      conceptsCompleted: 45,
      flashcards: {
        total: 150,
        completed: 120,
        accuracy: 78
      },
      practiceTests: {
        total: 25,
        completed: 20,
        score: 85
      },
      quizAverage: 85,
      recommendedStudyHours: 2.5
    },
    {
      id: "hist-101",
      name: "History",
      progress: 50,
      priority: "Medium",
      proficiency: 65,
      status: "in-progress",
      chapters: 8,
      conceptsTotal: 40,
      conceptsCompleted: 20,
      flashcards: {
        total: 100,
        completed: 90,
        accuracy: 65
      },
      practiceTests: {
        total: 15,
        completed: 10,
        score: 70
      },
      quizAverage: 70,
      recommendedStudyHours: 1.5
    },
    {
      id: "sci-101",
      name: "Science",
      progress: 100,
      priority: "High",
      proficiency: 92,
      status: "completed",
      chapters: 15,
      conceptsTotal: 55,
      conceptsCompleted: 55,
      flashcards: {
        total: 180,
        completed: 180,
        accuracy: 90
      },
      practiceTests: {
        total: 25,
        completed: 25,
        score: 92
      },
      quizAverage: 92,
      recommendedStudyHours: 0.5
    }
  ];

  // Generate concept cards
  const conceptCards: ConceptCard[] = [
    {
      id: "concept-1",
      title: "Quadratic Equations",
      subject: "Mathematics",
      topic: "Algebra",
      completed: true,
      masteryLevel: 85,
      lastPracticed: "2025-04-24",
      timeSuggestion: 45,
      flashcardsTotal: 25,
      flashcardsCompleted: 22,
      examReady: true,
      bookmarked: true
    },
    {
      id: "concept-2",
      title: "French Revolution",
      subject: "History",
      topic: "European History",
      completed: false,
      masteryLevel: 60,
      lastPracticed: "2025-04-23",
      timeSuggestion: 60,
      flashcardsTotal: 30,
      flashcardsCompleted: 18,
      examReady: false
    },
    {
      id: "concept-3",
      title: "Electromagnetic Waves",
      subject: "Science",
      topic: "Physics",
      completed: true,
      masteryLevel: 92,
      lastPracticed: "2025-04-25",
      timeSuggestion: 30,
      flashcardsTotal: 20,
      flashcardsCompleted: 20,
      examReady: true
    }
    // Add more concept cards as needed
  ];

  // Study plan
  const studyPlan = {
    id: "plan-1",
    dailyStudyTarget: 3,
    conceptsPerDay: 5,
    flashcardsPerDay: 50,
    testsPerWeek: 3,
    todaysFocus: {
      subject: "Mathematics",
      concepts: ["Integrals", "Derivatives", "Limits"],
      flashcardsCount: 30,
      hasPracticeExam: true,
      estimatedTime: 120
    }
  };

  // Progress tracker
  const progressTracker: ProgressTracker = {
    daily: {
      conceptsDone: 3,
      flashcardsDone: 25,
      testsTaken: 1,
      completionPercentage: 80
    },
    weekly: {
      conceptsDone: 12,
      flashcardsDone: 120,
      testsTaken: 3,
      completionPercentage: 75
    },
    monthly: {
      conceptsDone: 45,
      flashcardsDone: 350,
      testsTaken: 10,
      completionPercentage: 65
    }
  };

  // Revision stats
  const revisionStats: RevisionStats = {
    pendingReviewConcepts: 8,
    lowRetentionFlashcards: 15,
    flaggedItems: 5
  };

  // Add revision items that were missing and causing errors
  const revisionItems = [
    {
      id: "rev-1",
      title: "Wave Optics",
      subject: "Physics",
      lastReviewed: "2025-04-20",
      retentionScore: 65,
      dueDate: "2025-04-27"
    },
    {
      id: "rev-2",
      title: "Chemical Bonding",
      subject: "Chemistry",
      lastReviewed: "2025-04-22",
      retentionScore: 72,
      dueDate: "2025-04-28"
    },
    {
      id: "rev-3",
      title: "Integration",
      subject: "Mathematics",
      lastReviewed: "2025-04-23",
      retentionScore: 58,
      dueDate: "2025-04-26"
    }
  ];

  // Add milestone data that was missing and causing errors
  const milestones: Milestone[] = [
    {
      id: "mile-1",
      title: "Complete Calculus Section",
      description: "Finish all concept cards in the Calculus section",
      date: "2025-04-30",
      type: "weekly-target",
      completed: false
    },
    {
      id: "mile-2",
      title: "Physics Practice Exam",
      description: "Complete the comprehensive Physics practice exam",
      date: "2025-05-03",
      type: "practice-exam",
      completed: false
    },
    {
      id: "mile-3",
      title: "Monthly Performance Review",
      description: "Review your progress and adjust your study plan",
      date: "2025-05-05",
      type: "performance-check",
      completed: false
    }
  ];

  return {
    examGoal,
    subjects,
    conceptCards,
    studyPlan,
    progressTracker,
    revisionStats,
    revisionItems,  // Added this property
    milestones     // Added this property
  };
}
