
import { TestQuestion } from '../../types';

// Default questions used when no specific exam questions are available
export const defaultStressQuestions: TestQuestion[] = [
  {
    id: 'st1',
    question: 'Identify the next pattern in the sequence: 2, 4, 8, 16, ...',
    options: ['24', '32', '30', '64'],
    correctAnswer: '32',
    timeLimit: 15,
    explanation: 'Each number is doubled to get the next number in the sequence.',
    category: 'Pattern Recognition'
  },
  {
    id: 'st2',
    question: 'Which shape continues the pattern? △ □ ○ △ □ ...',
    options: ['△', '□', '○', '⬠'],
    correctAnswer: '○',
    timeLimit: 15,
    explanation: 'The pattern repeats every 3 shapes: triangle, square, circle.',
    category: 'Visual Pattern'
  },
  {
    id: 'st3',
    question: 'Complete the analogy: Hand is to Glove as Foot is to...',
    options: ['Leg', 'Shoe', 'Toe', 'Sock'],
    correctAnswer: 'Shoe',
    timeLimit: 15,
    explanation: 'A glove covers a hand, and a shoe covers a foot.',
    category: 'Verbal Reasoning'
  },
  {
    id: 'st4',
    question: 'Find the odd one out: Apple, Orange, Carrot, Banana',
    options: ['Apple', 'Orange', 'Carrot', 'Banana'],
    correctAnswer: 'Carrot',
    timeLimit: 15,
    explanation: 'Carrot is a vegetable, while the others are fruits.',
    category: 'Classification'
  },
  {
    id: 'st5',
    question: 'If A = 1, B = 2, C = 3, what does CAB equal?',
    options: ['123', '312', '213', '321'],
    correctAnswer: '312',
    timeLimit: 15,
    explanation: 'C = 3, A = 1, B = 2, so CAB = 312',
    category: 'Logical Reasoning'
  },
  {
    id: 'st6',
    question: 'What comes next in the sequence: A, C, E, G, ...?',
    options: ['H', 'I', 'J', 'K'],
    correctAnswer: 'I',
    timeLimit: 15,
    explanation: 'The sequence is every other letter in the alphabet.',
    category: 'Pattern Recognition'
  },
  {
    id: 'st7',
    question: 'Solve: 17 + 23 - 15 + 8 = ?',
    options: ['31', '33', '35', '37'],
    correctAnswer: '33',
    timeLimit: 15,
    explanation: '17 + 23 = 40, 40 - 15 = 25, 25 + 8 = 33',
    category: 'Mental Math'
  },
  {
    id: 'st8',
    question: 'Which image completes the pattern?',
    imageUrl: '/lovable-uploads/pattern-test.png',
    options: ['Image A', 'Image B', 'Image C', 'Image D'],
    correctAnswer: 'Image B',
    timeLimit: 15,
    explanation: 'The pattern rotates 90° clockwise each time.',
    category: 'Visual Pattern'
  }
];
