
import { TestQuestion } from '../../types';

// IIT-JEE specific questions
export const iitStressQuestions: TestQuestion[] = [
  {
    id: 'st-iit1',
    question: 'Solve quickly: log₁₀(100) + log₁₀(10) = ?',
    options: ['2', '3', '10', '20'],
    correctAnswer: '3',
    timeLimit: 15,
    explanation: 'log₁₀(100) = 2, log₁₀(10) = 1, 2 + 1 = 3',
    category: 'Mathematics',
    difficulty: 'medium'
  },
  {
    id: 'st-iit2',
    question: 'What is the derivative of e^x?',
    options: ['e^x', '1/x', 'e^(x-1)', '0'],
    correctAnswer: 'e^x',
    timeLimit: 15,
    explanation: 'The derivative of e^x is e^x.',
    category: 'Calculus',
    difficulty: 'medium'
  },
  {
    id: 'st-iit3',
    question: 'The pH of a solution with [H⁺] = 10^-9 M is:',
    options: ['9', '7', '5', '-9'],
    correctAnswer: '9',
    timeLimit: 15,
    explanation: 'pH = -log[H⁺] = -log(10^-9) = 9',
    category: 'Chemistry',
    difficulty: 'medium'
  },
  {
    id: 'st-iit4',
    question: 'If vectors A and B are perpendicular, then A·B equals:',
    options: ['0', '1', 'AB', '-1'],
    correctAnswer: '0',
    timeLimit: 15,
    explanation: 'When vectors are perpendicular, their dot product is zero.',
    category: 'Physics',
    difficulty: 'easy'
  },
  {
    id: 'st-iit5',
    question: 'Find the value of k if 3x² + kx + 3 has equal roots.',
    options: ['6', '-6', '3', '-3'],
    correctAnswer: '6',
    timeLimit: 15,
    explanation: 'For equal roots, discriminant = 0, so k² - 4(3)(3) = 0, k² = 36, k = 6',
    category: 'Mathematics',
    difficulty: 'hard'
  },
  {
    id: 'st-iit6',
    question: 'A body starts from rest with acceleration 2 m/s². Distance covered in 5 seconds is:',
    options: ['25m', '50m', '10m', '5m'],
    correctAnswer: '25m',
    timeLimit: 15,
    explanation: 's = (1/2)at² = 0.5 × 2 × 5² = 25m',
    category: 'Physics',
    difficulty: 'medium'
  },
  {
    id: 'st-iit7',
    question: 'The hybridization in BeCl₂ is:',
    options: ['sp', 'sp²', 'sp³', 'dsp²'],
    correctAnswer: 'sp',
    timeLimit: 15,
    explanation: 'BeCl₂ has linear geometry with sp hybridization.',
    category: 'Chemistry',
    difficulty: 'medium'
  },
  {
    id: 'st-iit8',
    question: 'Find the value of sin(30°) × cos(60°) + cos(30°) × sin(60°)',
    options: ['0', '0.5', '1', '1.5'],
    correctAnswer: '1',
    timeLimit: 15,
    explanation: 'sin(A)cos(B) + cos(A)sin(B) = sin(A+B), so sin(30°+60°) = sin(90°) = 1',
    category: 'Mathematics',
    difficulty: 'hard'
  }
];
