import { ExamType } from './types';

// Simplified to only include NEET
export const examTypes: ExamType[] = [
  { value: 'neet', label: 'NEET (National Eligibility cum Entrance Test)' }
];

// Add NEET-specific exam details
export const examSpecificDetails = {
  "NEET-UG": {
    scoringPattern: "+4 points for correct answers, -1 for incorrect answers",
    timePerQuestion: "1.06 minutes per question",
    totalTime: "180 minutes",
    totalQuestions: "180 questions"
  }
};

export const getDialogTitle = (currentTest: string): string => {
  switch (currentTest) {
    case 'intro':
      return 'NEET Exam Readiness Analysis';
    case 'readiness':
      return 'NEET Readiness Assessment';
    case 'concept':
      return 'NEET Concept Mastery Test';
    case 'report':
      return 'Your NEET Readiness Analysis';
    default:
      return 'Exam Readiness Analysis';
  }
};

export const getDialogDescription = (currentTest: string): string => {
  switch (currentTest) {
    case 'intro':
      return 'Discover your NEET exam readiness with our comprehensive assessment';
    case 'readiness':
      return 'Answer questions about your preparation level for the NEET exam';
    case 'concept':
      return 'Test your knowledge in Physics, Chemistry, and Biology';
    case 'report':
      return 'Review your personalized results and recommendations';
    default:
      return 'Analyze your exam preparation';
  }
};
