
import { getStressTestQuestions as getBaseStressQuestions } from './stress-test/stressTestBase';
import { TestQuestion } from '../types';

// Function to get all cognitive test sets for a specific exam
export const getCognitiveTestSets = (examType: string): number[] => {
  // For each exam, we provide 3 cognitive test sets
  return [1, 2, 3];
};

// Helper function to modify questions to ensure each set is unique
const modifyQuestionsForSet = (
  baseQuestions: TestQuestion[], 
  setNumber: number,
  examType: string
): TestQuestion[] => {
  // If set 1, return the base questions with minimal modifications
  if (setNumber === 1) {
    return baseQuestions.map(q => {
      const newQ = { ...q };
      newQ.id = `set1_${newQ.id}`;
      return newQ;
    });
  }
  
  // For set 2 and 3, create significantly different questions
  return baseQuestions.map(q => {
    // Deep clone the question
    const newQuestion = JSON.parse(JSON.stringify(q));
    newQuestion.id = `set${setNumber}_${newQuestion.id}`;
    
    if (setNumber === 2) {
      // Set 2 modifications
      switch(q.type) {
        case 'pattern-recognition':
          // Change pattern questions for set 2
          if (q.question.includes('sequence')) {
            newQuestion.question = `Identify the pattern in this sequence: 3, 7, 15, 31, ...`;
            newQuestion.options = ['63', '47', '59', '51'];
            newQuestion.correctAnswer = '63';
            newQuestion.explanation = 'The pattern is each number is multiplied by 2 and then 1 is added: 3*2+1=7, 7*2+1=15, 15*2+1=31, 31*2+1=63';
          } else {
            // Modify other pattern questions
            newQuestion.question = `For ${examType} preparation, which pattern comes next: △ ○ □ △ ○ ...`;
            newQuestion.options = ['△', '□', '○', '⬠'];
            newQuestion.correctAnswer = '□';
            newQuestion.explanation = 'The pattern repeats every 3 shapes: triangle, circle, square.';
          }
          break;
          
        case 'memory-recall':
          // Change memory questions for set 2
          newQuestion.question = `Memorize these numbers: 4 9 2 7 5. What's the second number?`;
          newQuestion.options = ['4', '9', '2', '7'];
          newQuestion.correctAnswer = '9';
          newQuestion.explanation = 'The sequence was 4 9 2 7 5, and 9 was the second number.';
          break;
          
        case 'timed-calculation':
          // Change calculation questions for set 2
          newQuestion.question = `Calculate quickly: 246 + 175`;
          newQuestion.options = ['421', '412', '421', '431'];
          newQuestion.correctAnswer = '421';
          newQuestion.explanation = '246 + 175 = 421';
          break;
          
        default:
          // Default modifications for set 2
          newQuestion.question = `Set 2 - ${newQuestion.question.replace('?', ` for ${examType}?`)}`;
          if (newQuestion.timeLimit) {
            newQuestion.timeLimit = Math.max(5, newQuestion.timeLimit - 2);
          }
      }
    } else if (setNumber === 3) {
      // Set 3 modifications - more advanced questions
      switch(q.type) {
        case 'pattern-recognition':
          // Change pattern questions for set 3
          if (q.question.includes('sequence')) {
            newQuestion.question = `Advanced ${examType} pattern: What comes next in this sequence: 2, 6, 12, 20, 30, ...`;
            newQuestion.options = ['42', '40', '36', '48'];
            newQuestion.correctAnswer = '42';
            newQuestion.explanation = 'The pattern adds consecutive even numbers: +4, +6, +8, +10, so next is +12 = 42';
          } else {
            // Modify other pattern questions
            newQuestion.question = `For advanced ${examType} preparation, find the pattern: ■□■ □■□ ■□■ ...`;
            newQuestion.options = ['□■□', '■□■', '□□□', '■■■'];
            newQuestion.correctAnswer = '□■□';
            newQuestion.explanation = 'The pattern alternates between ■□■ and □■□.';
          }
          break;
          
        case 'memory-recall':
          // Change memory questions for set 3
          newQuestion.question = `Memorize these words: SYSTEM, DATA, LOGIC, QUERY, CODE. Which word was third?`;
          newQuestion.options = ['DATA', 'LOGIC', 'QUERY', 'CODE'];
          newQuestion.correctAnswer = 'LOGIC';
          newQuestion.explanation = 'The sequence was SYSTEM, DATA, LOGIC, QUERY, CODE, so LOGIC was third.';
          break;
          
        case 'timed-calculation':
          // Change calculation questions for set 3
          newQuestion.question = `Advanced calculation: 27 × 19`;
          newQuestion.options = ['513', '523', '493', '503'];
          newQuestion.correctAnswer = '513';
          newQuestion.explanation = '27 × 19 = 513';
          break;
          
        default:
          // Default modifications for set 3
          newQuestion.question = `Advanced ${examType}: ${newQuestion.question}`;
          if (newQuestion.timeLimit) {
            newQuestion.timeLimit = Math.max(5, newQuestion.timeLimit - 3);
          }
          if (newQuestion.complexityLevel) {
            newQuestion.complexityLevel = Math.min(5, newQuestion.complexityLevel + 1);
          }
      }
    }
    
    return newQuestion;
  });
};

// Modified function to get stress test questions with set number
export const getStressTestQuestions = (examType: string, setNumber: number = 1): TestQuestion[] => {
  const baseQuestions = getBaseStressQuestions(examType);
  
  // Create unique questions based on set number
  const modifiedQuestions = modifyQuestionsForSet(baseQuestions, setNumber, examType);
  
  return modifiedQuestions;
};
