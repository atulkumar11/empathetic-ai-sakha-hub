
import { TestQuestion } from '../../types';

// CAT/MBA specific questions
export const catStressQuestions: TestQuestion[] = [
  {
    id: 'st-cat1',
    question: 'If a, b, c are in AP, then 1/b, 1/a, 1/c are in:',
    options: ['GP', 'HP', 'AP', 'None of these'],
    correctAnswer: 'HP',
    timeLimit: 15,
    explanation: 'If a, b, c are in AP, then b = (a+c)/2. For 1/b, 1/a, 1/c to be in HP, we need 1/b = (1/a + 1/c)/2, which is true.',
    category: 'Quantitative Aptitude',
    difficulty: 'hard'
  },
  {
    id: 'st-cat2',
    question: 'What is the next number in the series: 2, 3, 5, 9, 17, ?',
    options: ['31', '33', '34', '35'],
    correctAnswer: '33',
    timeLimit: 15,
    explanation: 'The pattern is ×1+1, ×1+2, ×1+4, ×1+8, ×1+16. So 17×1+16 = 33',
    category: 'Logical Reasoning',
    difficulty: 'medium'
  },
  {
    id: 'st-cat3',
    question: 'Find the value of √16 + √25 + √36 + √49',
    options: ['24', '22', '20', '18'],
    timeLimit: 15,
    correctAnswer: '22',
    explanation: '√16 + √25 + √36 + √49 = 4 + 5 + 6 + 7 = 22',
    category: 'Quantitative Aptitude',
    difficulty: 'medium'
  },
  {
    id: 'st-cat4',
    question: 'The average age of 10 students is 15 years. If the teacher\'s age is included, the average increases by 3 years. What is the teacher\'s age?',
    options: ['48', '45', '50', '47'],
    timeLimit: 15,
    correctAnswer: '48',
    explanation: 'Let teacher\'s age be x. 10×15 + x = 11×18. Solving, x = 48.',
    category: 'Quantitative Aptitude',
    difficulty: 'medium'
  },
  {
    id: 'st-cat5',
    question: 'If 5/9 of a number exceeds 3/7 of the same number by 8, then the number is:',
    options: ['168', '126', '84', '63'],
    timeLimit: 15,
    correctAnswer: '84',
    explanation: '(5/9)x - (3/7)x = 8. Solving, (35-27)x/63 = 8. So 8x/63 = 8, which gives x = 63.',
    category: 'Quantitative Aptitude',
    difficulty: 'hard'
  },
  {
    id: 'st-cat6',
    question: 'The word EXAMINATION is coded as FYBNJOBUJPO. How is QUESTION coded?',
    options: ['RVFTUJPO', 'RTFVUJPO', 'RVFTUJPW', 'RVDTSJPO'],
    timeLimit: 15,
    correctAnswer: 'RVFTUJPO',
    explanation: 'Each letter is replaced by the next letter in the alphabet. Q→R, U→V, E→F, S→T, T→U, I→J, O→P, N→O',
    category: 'Verbal Ability',
    difficulty: 'medium'
  },
  {
    id: 'st-cat7',
    question: 'If the letters in PRABA are rearranged to form a word and the first letter of the word is A, then what is the last letter of the word?',
    options: ['A', 'B', 'P', 'R'],
    timeLimit: 15,
    correctAnswer: 'P',
    explanation: 'Rearranging PRABA with A as the first letter could give ABARB or ABARP. Since P is the only other option among the choices, the answer is P.',
    category: 'Verbal Ability',
    difficulty: 'medium'
  },
  {
    id: 'st-cat8',
    question: 'Which of the following is the correct descending order of fractions: 3/5, 7/9, 11/15, 13/20?',
    options: ['7/9, 11/15, 3/5, 13/20', '7/9, 3/5, 11/15, 13/20', '3/5, 7/9, 11/15, 13/20', '11/15, 7/9, 3/5, 13/20'],
    timeLimit: 15,
    correctAnswer: '7/9, 11/15, 3/5, 13/20',
    explanation: 'Converting to decimals: 3/5 = 0.6, 7/9 = 0.778, 11/15 = 0.733, 13/20 = 0.65. So in descending order: 7/9, 11/15, 3/5, 13/20',
    category: 'Quantitative Aptitude',
    difficulty: 'hard'
  }
];
