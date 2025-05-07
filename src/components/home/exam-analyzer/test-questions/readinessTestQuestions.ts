
import { TestQuestion } from '../types';

// NEET-specific readiness assessment questions
const neetReadinessQuestions: TestQuestion[] = [
  {
    id: 'rt-neet1',
    question: 'How thoroughly have you studied NCERT Biology textbooks?',
    options: ['Not started yet', 'Read partially', 'Completed once', 'Multiple thorough revisions with notes'],
    timeLimit: 30,
    type: 'self-assessment',
    category: 'Concept Completion'
  },
  {
    id: 'rt-neet2',
    question: 'How comfortable are you with memorizing biological terminology and classifications?',
    options: ['Very uncomfortable', 'Somewhat comfortable', 'Reasonably comfortable', 'Highly comfortable'],
    timeLimit: 30,
    type: 'self-assessment',
    category: 'Concept Completion'
  },
  {
    id: 'rt-neet3',
    question: 'How many NEET practice tests have you completed so far?',
    options: ['None', '1-3 tests', '4-10 tests', 'More than 10 tests'],
    timeLimit: 30,
    type: 'self-assessment',
    category: 'Practice Performance'
  },
  {
    id: 'rt-neet4',
    question: 'How regular is your study schedule for NEET preparation?',
    options: ['Irregular/occasional', '1-2 days per week', '3-5 days per week', 'Daily with fixed hours'],
    timeLimit: 30,
    type: 'self-assessment',
    category: 'Time Management'
  },
  {
    id: 'rt-neet5',
    question: 'How well can you solve numerical problems in Physics and Chemistry sections?',
    options: ['Struggle with most', 'Can solve basic problems', 'Good with most problems', 'Excellent with even complex problems'],
    timeLimit: 30,
    type: 'self-assessment',
    category: 'Practice Performance'
  },
  {
    id: 'rt-neet6',
    question: 'How comfortable are you with organic chemistry reaction mechanisms?',
    options: ['Not familiar', 'Basic understanding', 'Good understanding', 'Thorough understanding'],
    timeLimit: 30,
    type: 'self-assessment',
    category: 'Concept Completion'
  },
  {
    id: 'rt-neet7',
    question: 'How do you handle topics you find difficult?',
    options: ['Skip them', 'Try briefly before moving on', 'Work on them until somewhat understood', 'Master them completely before moving on'],
    timeLimit: 30,
    type: 'self-assessment',
    category: 'Time Management'
  },
  {
    id: 'rt-neet8',
    question: 'How familiar are you with the NEET exam pattern and marking scheme?',
    options: ['Not familiar', 'Vaguely familiar', 'Mostly familiar', 'Completely familiar'],
    timeLimit: 30,
    type: 'self-assessment',
    category: 'Practice Performance'
  },
  {
    id: 'rt-neet9',
    question: 'How effective is your method for revising previously studied topics?',
    options: ['No revision strategy', 'Random revision when I remember', 'Periodic revision but unsystematic', 'Systematic spaced repetition'],
    timeLimit: 30,
    type: 'self-assessment',
    category: 'Time Management'
  },
  {
    id: 'rt-neet10',
    question: 'How confident do you feel about your current NEET preparation?',
    options: ['Not confident at all', 'Somewhat confident', 'Fairly confident', 'Very confident'],
    timeLimit: 30,
    type: 'self-assessment',
    category: 'Overall Confidence'
  }
];

export const getReadinessTestQuestions = (examType: string): TestQuestion[] => {
  // Since we only have NEET now, we'll always return the NEET questions
  return neetReadinessQuestions;
};
