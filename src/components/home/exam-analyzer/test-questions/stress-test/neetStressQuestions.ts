
import { TestQuestion } from '../../types';

// NEET specific questions
export const neetStressQuestions: TestQuestion[] = [
  {
    id: 'st-neet1',
    question: 'What is the normal heart rate (beats per minute) in adults?',
    options: ['40-60', '60-100', '100-140', '140-180'],
    correctAnswer: '60-100',
    timeLimit: 15,
    explanation: 'Normal resting heart rate in adults is 60-100 beats per minute.',
    category: 'Physiology',
    difficulty: 'easy'
  },
  {
    id: 'st-neet2',
    question: 'Which of these is NOT a nitrogenous base in DNA?',
    options: ['Adenine', 'Uracil', 'Guanine', 'Cytosine'],
    correctAnswer: 'Uracil',
    timeLimit: 15,
    explanation: 'Uracil is found in RNA, not DNA. DNA contains Adenine, Thymine, Guanine, and Cytosine.',
    category: 'Biology',
    difficulty: 'medium'
  },
  {
    id: 'st-neet3',
    question: 'The functional unit of kidney is:',
    options: ['Neuron', 'Nephron', 'Axon', 'Alveolus'],
    correctAnswer: 'Nephron',
    timeLimit: 15,
    explanation: 'Nephron is the functional unit of kidney responsible for filtering blood.',
    category: 'Anatomy',
    difficulty: 'easy'
  },
  {
    id: 'st-neet4',
    question: 'Which vitamin deficiency causes night blindness?',
    options: ['Vitamin A', 'Vitamin B', 'Vitamin C', 'Vitamin D'],
    correctAnswer: 'Vitamin A',
    timeLimit: 15,
    explanation: 'Vitamin A deficiency leads to night blindness as it is essential for rhodopsin formation.',
    category: 'Physiology',
    difficulty: 'medium'
  },
  {
    id: 'st-neet5',
    question: 'The pH of human blood under normal conditions is:',
    options: ['6.4', '7.0', '7.4', '8.0'],
    correctAnswer: '7.4',
    timeLimit: 15,
    explanation: 'Normal blood pH is tightly regulated between 7.35-7.45, with 7.4 being the average.',
    category: 'Physiology',
    difficulty: 'medium'
  },
  {
    id: 'st-neet6',
    question: 'Which of these is the universal recipient blood group?',
    options: ['A', 'B', 'AB', 'O'],
    correctAnswer: 'AB',
    timeLimit: 15,
    explanation: 'AB blood group has no antibodies against A or B antigens, so can receive any blood type.',
    category: 'Physiology',
    difficulty: 'easy'
  },
  {
    id: 'st-neet7',
    question: 'The junction between two neurons is called:',
    options: ['Dendrite', 'Synapse', 'Axon', 'Myelin sheath'],
    correctAnswer: 'Synapse',
    timeLimit: 15,
    explanation: 'Synapse is the junction where neurons communicate with each other.',
    category: 'Neurology',
    difficulty: 'medium'
  },
  {
    id: 'st-neet8',
    question: 'Which organelle is known as the "powerhouse of the cell"?',
    options: ['Nucleus', 'Ribosome', 'Mitochondria', 'Golgi apparatus'],
    correctAnswer: 'Mitochondria',
    timeLimit: 15,
    explanation: 'Mitochondria produce ATP through cellular respiration, providing energy for the cell.',
    category: 'Cell Biology',
    difficulty: 'easy'
  }
];
