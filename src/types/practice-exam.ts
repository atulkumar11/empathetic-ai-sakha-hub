
export interface ExamQuestion {
  id: string;
  text: string;
  options: {
    id: string;
    text: string;
  }[];
  correctOptionId: string;
  explanation?: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface UserAnswer {
  questionId: string;
  selectedOptionId: string;
  isCorrect?: boolean;
}

export interface PracticeExam {
  id: string;
  title: string;
  description: string;
  subject: string;
  topic: string;
  totalQuestions: number;
  timeAllowed: number; // minutes
  questions: ExamQuestion[];
  scoringPattern?: string | null;
  timePerQuestion?: string | null;
}
