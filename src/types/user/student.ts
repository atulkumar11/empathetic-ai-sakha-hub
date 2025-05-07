
import { UserProfileBase } from './base';
import { SubjectProgress, StudyStreak } from './index';

export interface StudentProfile extends UserProfileBase {
  // Student-specific fields
  enrollmentDate?: Date;
  grade?: number | string;
  schoolName?: string;
  
  // Academic information
  subjects?: string[];
  currentExam?: string;
  examDate?: Date;
  targetScore?: number | string;
  
  // Progress tracking
  subjectProgress?: SubjectProgress[];
  studyStreak?: StudyStreak;
  totalStudyHours?: number;
  topicsCompleted?: number;
  quizzesCompleted?: number;
  
  // Additional fields
  parentEmail?: string;
  parentPhone?: string;
}

export interface StudentDashboardData {
  recentActivity: {
    type: string;
    title: string;
    timestamp: Date;
    progress?: number;
  }[];
  upcomingTasks: {
    id: string;
    type: 'concept' | 'flashcard' | 'quiz' | 'exam';
    title: string;
    dueDate: Date;
    isCompleted: boolean;
    subject?: string;
  }[];
  studyPlan: {
    id: string;
    date: Date;
    sessions: {
      id: string;
      subject: string;
      topic: string;
      startTime: string;
      endTime: string;
      isCompleted: boolean;
    }[];
  }[];
}
