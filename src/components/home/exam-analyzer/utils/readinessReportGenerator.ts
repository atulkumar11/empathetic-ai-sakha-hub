
import { UserAnswer, TestResults } from '../types';

export const generateReadinessReport = (answers: UserAnswer[], examType: string): TestResults => {
  // For readiness, we'll assume answers are self-assessment on a scale (index 0-3)
  // Calculate weighted score based on answer index (0 = worst, 3 = best)
  let totalWeight = 0;
  let totalScore = 0;
  
  answers.forEach(answer => {
    // Get the question categories and weight differently
    if (answer.questionId.includes('rt-')) {
      const optionIndex = parseInt(answer.answer.charAt(0)) - 1;
      totalWeight += 3; // max possible score per question
      totalScore += optionIndex;
    }
  });
  
  // Convert to percentage
  const score = Math.floor((totalScore / (answers.length * 3)) * 100);
  
  // Determine level based on score
  let level = '';
  if (score >= 80) {
    level = 'Well Prepared';
  } else if (score >= 60) {
    level = 'Moderately Prepared';
  } else if (score >= 40) {
    level = 'Partially Prepared';
  } else {
    level = 'Just Beginning';
  }
  
  // Generate analysis based on score
  let analysis = '';
  if (score >= 80) {
    analysis = 'You\'re on track for NEET! Your preparation level is strong with good study habits and coverage of material.';
  } else if (score >= 60) {
    analysis = 'Your NEET preparation is progressing well, but needs more consistency and deeper coverage in some areas.';
  } else if (score >= 40) {
    analysis = 'You\'ve begun your NEET preparation but need to significantly increase your coverage and strengthen your study routine.';
  } else {
    analysis = 'You\'re in the early stages of NEET preparation. A structured study plan and consistent effort will help you improve.';
  }
  
  // Generate strengths and improvements based on score
  let strengths = [];
  let improvements = [];
  
  if (score >= 80) {
    strengths = [
      'Strong study routine and time management',
      'Comprehensive coverage of the NEET syllabus',
      'Regular practice with mock tests',
      'Good balance between subjects'
    ];
    improvements = [
      'Focus on any remaining weak areas',
      'Increase practice with previous years\' questions',
      'Refine test-taking strategies for optimal performance',
      'Maintain consistent revision schedule'
    ];
  } else if (score >= 60) {
    strengths = [
      'Good study habits established',
      'Reasonable coverage of most subjects',
      'Some experience with practice tests'
    ];
    improvements = [
      'Increase consistency in daily study hours',
      'Complete full syllabus coverage',
      'Take more full-length mock tests',
      'Implement a more structured revision plan'
    ];
  } else if (score >= 40) {
    strengths = [
      'Basic understanding of NEET requirements',
      'Some study routine established',
      'Covered fundamental topics'
    ];
    improvements = [
      'Significantly increase study hours',
      'Create a comprehensive study schedule',
      'Begin regular mock test practice',
      'Focus on completing syllabus coverage',
      'Implement spaced repetition techniques'
    ];
  } else {
    strengths = [
      'Awareness of NEET exam pattern',
      'Identified learning needs',
      'Beginning to develop study habits'
    ];
    improvements = [
      'Establish a consistent daily study routine',
      'Create a detailed study plan covering all subjects',
      'Begin with NCERT textbooks as your foundation',
      'Gradually introduce practice questions',
      'Consider joining a structured preparation program'
    ];
  }
  
  return {
    score,
    level,
    analysis,
    strengths,
    improvements
  };
};
