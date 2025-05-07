
import { UserRole } from "../user/base";

// Basic interfaces for user progress tracking
export interface ConceptCard {
  id: string;
  title: string;
  subject: string;
  topic: string;
  completed: boolean;
  masteryLevel: number;  // 0-100
  lastPracticed?: string;
  timeSuggestion?: number; // in minutes
  flashcardsTotal: number;
  flashcardsCompleted: number;
  examReady: boolean;
  bookmarked?: boolean;
}

export interface Subject {
  id: string;
  name: string;
  progress: number; // 0-100
  priority: 'High' | 'Medium' | 'Low';
  proficiency: number; // 0-100
  status: 'completed' | 'in-progress' | 'not-started';
  chapters: number;
  conceptsTotal: number;
  conceptsCompleted: number;
  flashcards: {
    total: number;
    completed: number;
    accuracy: number; // 0-100
  };
  practiceTests: {
    total: number;
    completed: number;
    score: number; // 0-100
  };
  quizAverage: number; // 0-100
  recommendedStudyHours: number;
}

export interface StudyPlan {
  id: string;
  dailyStudyTarget: number; // hours
  conceptsPerDay: number;
  flashcardsPerDay: number;
  testsPerWeek: number;
  todaysFocus: {
    subject: string;
    concepts: string[];
    flashcardsCount: number;
    hasPracticeExam: boolean;
    estimatedTime: number; // minutes
  };
}

export interface ProgressSnapshot {
  conceptsDone: number;
  flashcardsDone: number;
  testsTaken: number;
  completionPercentage: number;
}

export interface ProgressTracker {
  daily: ProgressSnapshot;
  weekly: ProgressSnapshot;
  monthly: ProgressSnapshot;
}

export interface RevisionStats {
  pendingReviewConcepts: number;
  lowRetentionFlashcards: number;
  flaggedItems: number;
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  date: string;
  type: 'weekly-target' | 'practice-exam' | 'performance-check';
  completed: boolean;
}

export interface DashboardData {
  examGoal: string;
  subjects: Subject[];
  conceptCards: ConceptCard[];
  studyPlan: StudyPlan;
  progressTracker: ProgressTracker;
  revisionStats: RevisionStats;
  upcomingMilestones: Milestone[];
}
