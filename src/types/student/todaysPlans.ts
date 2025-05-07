
// Define task status enum
export type TaskStatus = "completed" | "in-progress" | "viewed" | "pending";

// Base task interface with common properties
export interface BaseTask {
  id: string;
  title: string;
  subject: string;
  chapter?: string;
  topic?: string;
  duration: number; // in minutes
  status: TaskStatus;
  difficulty?: 'Easy' | 'Medium' | 'Hard';
  completionPercent?: number;
}

// Concept task interface
export interface ConceptTask extends BaseTask {
  key_points?: string[];
  mastery_level?: number;
}

// Flashcard task interface
export interface FlashcardTask extends BaseTask {
  cardCount?: number;
  recallAccuracy?: number;
}

// Practice exam task interface
export interface PracticeExamTask extends BaseTask {
  questionCount?: number;
  timeLimit?: number;
  lastScore?: number;
}

// Time allocation interface
export interface TimeAllocation {
  concepts: number;
  flashcards: number;
  practiceExams: number;
}

// Today's plan data interface
export interface TodaysPlanData {
  id: string;
  date: string;
  totalDuration: number; // in minutes
  completed: boolean;
  completedTasks: number;
  totalTasks: number;
  timeAllocation: TimeAllocation;
  concepts: ConceptTask[];
  flashcards: FlashcardTask[];
  practiceExams: PracticeExamTask[];
  recommendations?: {
    id: string;
    type: 'concept' | 'flashcard' | 'practice-exam';
    title: string;
    description: string;
    reason: string;
  }[];
}

// Timeline view type
export type TimelineView = 'list' | 'timeline' | 'calendar';
