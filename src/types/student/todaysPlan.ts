
import { MoodType } from '../user/base';

export interface StudyBlock {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  duration: number; // minutes
  tasks: Task[];
  completed?: boolean;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  type: TaskType;
  duration: number; // minutes
  status: TaskStatus;
  subjectId?: string;
  conceptId?: string;
  resourceId?: string;
  priority: 'high' | 'medium' | 'low';
}

export enum TaskType {
  READ = 'read',
  PRACTICE = 'practice',
  WATCH = 'watch',
  QUIZ = 'quiz',
  FLASHCARD = 'flashcard',
  BREAK = 'break',
  OTHER = 'other'
}

export enum TaskStatus {
  TODO = 'todo',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  SKIPPED = 'skipped'
}

export interface PendingTask extends Task {
  dueDate: string;
  isOverdue: boolean;
}

export interface SubjectBreakdownData {
  id: string;
  name: string;
  color: string;
  timeAllocated: number; // minutes
  percentComplete: number;
}

export interface TimeAllocationSummary {
  totalStudyTime: number; // minutes
  breakTime: number; // minutes
  subjectBreakdown: SubjectBreakdownData[];
}

export enum TimelineView {
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly'
}

export { MoodType };
