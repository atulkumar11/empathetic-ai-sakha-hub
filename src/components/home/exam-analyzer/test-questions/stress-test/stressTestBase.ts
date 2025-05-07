
import { TestQuestion } from '../../types';
import { defaultStressQuestions } from './defaultStressQuestions';

// Core stress test questions focused on cognitive abilities, not subject knowledge
const coreStressQuestions: TestQuestion[] = [
  // Pattern recognition questions
  {
    id: "pattern-recognition-1",
    question: "What comes next in this sequence: 2, 5, 10, 17, 26, ?",
    options: ["37", "35", "36", "39"],
    correctAnswer: "37",
    timeLimit: 15,
    explanation: "The pattern is adding consecutive odd numbers: +3, +5, +7, +9, so next is +11 = 37",
    type: "pattern-recognition",
    complexityLevel: 2
  },
  {
    id: "pattern-recognition-2",
    question: "What letter comes next in this sequence: A, C, F, J, ?",
    options: ["M", "N", "O", "P"],
    correctAnswer: "O",
    timeLimit: 15,
    explanation: "The pattern adds increasing numbers: +2, +3, +4, so next is +5 = O",
    type: "pattern-recognition",
    complexityLevel: 3
  },
  {
    id: "pattern-recognition-3",
    question: "Complete the pattern: 16, 8, 4, ?",
    options: ["2", "0", "3", "1"],
    correctAnswer: "2",
    timeLimit: 10,
    explanation: "The pattern is dividing by 2 each time",
    type: "pattern-recognition",
    complexityLevel: 1
  },
  
  // Memory recall questions - modified for quicker response
  {
    id: "memory-recall-1",
    question: "Memorize: 7 3 9 1 5. What's the middle number?",
    options: ["7", "3", "9", "1"],
    correctAnswer: "9",
    timeLimit: 8, // Reduced time limit for quicker response
    explanation: "The sequence was 7 3 9 1 5, and 9 was in the middle position",
    type: "memory-recall",
    complexityLevel: 2
  },
  {
    id: "memory-recall-2",
    question: "Memorize: APPLE, CHAIR, PENCIL, WINDOW, BOOK. Which word was fourth?",
    options: ["APPLE", "WINDOW", "PENCIL", "BOOK"],
    correctAnswer: "WINDOW",
    timeLimit: 10, // Reduced time limit for quicker response
    explanation: "The sequence was APPLE, CHAIR, PENCIL, WINDOW, BOOK, so WINDOW was fourth",
    type: "memory-recall",
    complexityLevel: 3
  },
  
  // Timed calculation questions
  {
    id: "timed-calculation-1",
    question: "Calculate quickly: 137 + 294",
    options: ["421", "431", "432", "441"],
    correctAnswer: "431",
    timeLimit: 8,
    explanation: "137 + 294 = 431",
    type: "timed-calculation",
    complexityLevel: 3
  },
  {
    id: "timed-calculation-2",
    question: "Calculate quickly: 15 × 17",
    options: ["255", "245", "265", "275"],
    correctAnswer: "255",
    timeLimit: 10,
    explanation: "15 × 17 = 255",
    type: "timed-calculation",
    complexityLevel: 4
  },
  
  // Higher complexity questions
  {
    id: "complex-pattern-1",
    question: "If the pattern continues, which number comes next: 1, 4, 9, 16, 25, ?",
    options: ["30", "36", "49", "64"],
    correctAnswer: "36",
    timeLimit: 12,
    explanation: "These are perfect squares: 1², 2², 3², 4², 5², so next is 6² = 36",
    type: "pattern-recognition",
    complexityLevel: 4
  },
  {
    id: "complex-pattern-2",
    question: "Find the odd one out: 16, 25, 36, 48, 64",
    options: ["16", "25", "48", "64"],
    correctAnswer: "48",
    timeLimit: 15,
    explanation: "All numbers except 48 are perfect squares. 48 is not a perfect square.",
    type: "pattern-recognition",
    complexityLevel: 5
  }
];

// Updated visual test questions with more relevant images
const visualQuestions: TestQuestion[] = [
  {
    id: "visual-pattern-1",
    question: "Which shape should come next in this pattern?",
    options: ["Triangle", "Circle", "Square", "Pentagon"],
    correctAnswer: "Square",
    timeLimit: 15,
    explanation: "The pattern alternates between triangle and square.",
    type: "pattern-recognition",
    imageUrl: "https://images.unsplash.com/photo-1580048915913-4f8f5cb481c4?q=80&w=1000", // Geometric pattern image
    complexityLevel: 2
  },
  {
    id: "visual-memory-1",
    question: "Study this image for 5 seconds. How many triangular shapes are there?",
    options: ["3", "5", "7", "9"],
    correctAnswer: "5",
    timeLimit: 12,
    explanation: "The image contained 5 triangular shapes in different orientations.",
    type: "memory-recall",
    imageUrl: "https://images.unsplash.com/photo-1551907234-fb773fb08a2a?q=80&w=1000", // Geometric shapes image
    complexityLevel: 3
  },
  {
    id: "visual-analysis-1",
    question: "In this geometric pattern, which element is different from the others?",
    options: ["Top left", "Top right", "Bottom left", "Bottom right"],
    correctAnswer: "Bottom right",
    timeLimit: 20,
    explanation: "The bottom right element has a different symmetry pattern compared to the others.",
    type: "pattern-recognition",
    imageUrl: "https://images.unsplash.com/photo-1614851099511-773084f6911d?q=80&w=1000", // Abstract pattern image
    complexityLevel: 4
  },
  {
    id: "sequence-memory-1",
    question: "Remember this sequence: Red, Blue, Green, Yellow, Purple. What was the middle color?",
    options: ["Red", "Blue", "Green", "Yellow"],
    correctAnswer: "Green",
    timeLimit: 10, // Reduced time for quicker response
    explanation: "The sequence was Red, Blue, Green, Yellow, Purple. Green was in the middle.",
    type: "memory-recall",
    imageUrl: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1000", // Color sequence image
    complexityLevel: 2
  },
  {
    id: "matrix-pattern-1",
    question: "Which image completes this logical pattern matrix?",
    options: ["Pattern A", "Pattern B", "Pattern C", "Pattern D"],
    correctAnswer: "Pattern C",
    timeLimit: 20,
    explanation: "The pattern follows a logical sequence where each row and column must contain certain elements.",
    type: "pattern-recognition",
    imageUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=1000", // Matrix pattern image
    complexityLevel: 5
  }
];

/**
 * Helper function to get stress test questions based on the selected exam
 */
export const getStressTestQuestions = (selectedExam: string): TestQuestion[] => {
  try {
    // Use the same cognitive stress test questions for all exam types
    // No subject-specific questions
    const allQuestions = [...coreStressQuestions, ...visualQuestions];
    
    // Sort questions by complexity level for a progressive test experience
    allQuestions.sort((a, b) => {
      const levelA = a.complexityLevel || 1;
      const levelB = b.complexityLevel || 1;
      return levelA - levelB;
    });
    
    return allQuestions;
  } catch (error) {
    console.error(`Error loading stress test questions:`, error);
    // Fallback to default questions in case of error
    return [...defaultStressQuestions, ...visualQuestions];
  }
};
