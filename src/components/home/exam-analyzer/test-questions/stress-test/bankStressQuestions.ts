
import { TestQuestion } from '../../types';

// Bank exam specific questions
export const bankStressQuestions: TestQuestion[] = [
  {
    id: 'st-bank1',
    question: 'Calculate: 17% of 350',
    options: ['59.5', '49.5', '69.5', '79.5'],
    correctAnswer: '59.5',
    timeLimit: 15,
    explanation: '17% of 350 = 0.17 × 350 = 59.5',
    category: 'Quantitative Aptitude',
    difficulty: 'medium'
  },
  {
    id: 'st-bank2',
    question: 'If A : B = 2 : 3 and B : C = 4 : 5, then A : C = ?',
    options: ['8 : 15', '2 : 5', '4 : 5', '3 : 5'],
    correctAnswer: '8 : 15',
    timeLimit: 15,
    explanation: 'A : B = 2 : 3 means A = 2x, B = 3x. B : C = 4 : 5 means B = 4y, C = 5y. So 3x = 4y, thus x = 4y/3. Therefore A : C = 2x : 5y = 2(4y/3) : 5y = 8y/3 : 5y = 8 : 15',
    category: 'Quantitative Aptitude',
    difficulty: 'hard'
  },
  {
    id: 'st-bank3',
    question: 'The difference between simple interest and compound interest on Rs. 5000 for 2 years at 10% per annum is:',
    options: ['Rs. 50', 'Rs. 100', 'Rs. 25', 'Rs. 75'],
    correctAnswer: 'Rs. 50',
    timeLimit: 15,
    explanation: 'SI = P×R×T/100 = 5000×10×2/100 = 1000. CI = P(1+R/100)^T - P = 5000(1.1)² - 5000 = 5000(1.21) - 5000 = 6050 - 5000 = 1050. Difference = 1050 - 1000 = 50',
    category: 'Quantitative Aptitude',
    difficulty: 'medium'
  },
  {
    id: 'st-bank4',
    question: 'Find the wrong term in the series: 2, 6, 12, 20, 30, 42, 56',
    options: ['12', '20', '30', '42'],
    correctAnswer: '42',
    timeLimit: 15,
    explanation: 'The pattern is +4, +6, +8, +10, +12... So after 30 should be 30+12=42, and then 42+14=56. The series is correct.',
    category: 'Reasoning',
    difficulty: 'hard'
  },
  {
    id: 'st-bank5',
    question: 'If in a code SERVANT is written as TFSWAOU, how is PRODUCT written in that code?',
    options: ['QSPEVDU', 'OSPCTDU', 'PSPCVDU', 'QSPCVDU'],
    correctAnswer: 'QSPCVDU',
    timeLimit: 15,
    explanation: 'Each letter is replaced by the letter that follows it in the alphabet. P→Q, R→S, O→P, D→C, U→V, C→D, T→U',
    category: 'Reasoning',
    difficulty: 'hard'
  },
  {
    id: 'st-bank6',
    question: 'The governor of the Reserve Bank of India is appointed by:',
    options: ['Prime Minister', 'Finance Minister', 'Central Government', 'RBI Board'],
    correctAnswer: 'Central Government',
    timeLimit: 15,
    explanation: 'The RBI Governor is appointed by the Central Government (Union Cabinet) for a term of 4 years.',
    category: 'Banking Awareness',
    difficulty: 'medium'
  },
  {
    id: 'st-bank7',
    question: 'If X = 2Y and Y = 3Z then X : Z = ?',
    options: ['6 : 1', '1 : 6', '3 : 2', '2 : 3'],
    correctAnswer: '6 : 1',
    timeLimit: 15,
    explanation: 'X = 2Y and Y = 3Z, so X = 2(3Z) = 6Z. Therefore, X : Z = 6Z : Z = 6 : 1',
    category: 'Quantitative Aptitude',
    difficulty: 'medium'
  },
  {
    id: 'st-bank8',
    question: 'RTGS in banking stands for:',
    options: ['Real Time Gross Settlement', 'Ready To Go Service', 'Rapid Transaction Guarantee System', 'Reserve Transfer Gateway System'],
    correctAnswer: 'Real Time Gross Settlement',
    timeLimit: 15,
    explanation: 'RTGS stands for Real Time Gross Settlement, which is used for large value transactions that need immediate clearing.',
    category: 'Banking Awareness',
    difficulty: 'easy'
  }
];
