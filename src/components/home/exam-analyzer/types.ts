
export type TestType = 'intro' | 'readiness' | 'concept' | 'report';
export type TestCompletionState = {
  readiness: boolean;
  stress: boolean;
  concept: boolean;
};

export interface ExamType {
  value: string;
  label: string;
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer?: number;
  explanation?: string;
  subject?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  type?: string;
}

export interface TestResults {
  score: number;
  level: string;
  analysis: string;
  strengths: string;
  weaknesses: string;
  subjectScores?: Record<string, number>; // Added for subject-specific scores
}

export interface ExamResults {
  stress: TestResults;
  readiness: TestResults;
  concept: TestResults;
  overall: TestResults;
}

export interface TestQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer?: string;
  explanation?: string;
  timeLimit?: number;
  type?: string;
  category?: string;
  complexityLevel?: number;
  subject?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
}

export interface SubjectTopic {
  id: string;
  subject: string;
  topics: number;
}

export interface UserAnswer {
  questionId: string;
  answer: string;
  timeToAnswer?: number;
  isCorrect?: boolean;
  confidenceLevel?: number;
  subject?: string;
}
