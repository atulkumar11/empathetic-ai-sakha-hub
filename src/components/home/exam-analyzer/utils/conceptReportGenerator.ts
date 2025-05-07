
import { TestResults, UserAnswer } from '../types';

export const generateConceptReport = (answers: UserAnswer[], examType: string): TestResults => {
  // Calculate overall score
  const correctAnswers = answers.filter(answer => answer.isCorrect).length;
  const totalQuestions = answers.length;
  const score = Math.round((correctAnswers / totalQuestions) * 100);
  
  // Create subject-specific scores for NEET
  const subjectScores: Record<string, number> = {};
  
  if (examType === "NEET-UG") {
    // Group answers by subject
    const physicsAnswers = answers.filter(a => a.subject?.toLowerCase() === 'physics');
    const chemistryAnswers = answers.filter(a => a.subject?.toLowerCase() === 'chemistry');
    const biologyAnswers = answers.filter(a => a.subject?.toLowerCase() === 'biology');
    
    // Calculate scores for each subject
    if (physicsAnswers.length > 0) {
      const physicsCorrect = physicsAnswers.filter(a => a.isCorrect).length;
      subjectScores['Physics'] = Math.round((physicsCorrect / physicsAnswers.length) * 100);
    }
    
    if (chemistryAnswers.length > 0) {
      const chemistryCorrect = chemistryAnswers.filter(a => a.isCorrect).length;
      subjectScores['Chemistry'] = Math.round((chemistryCorrect / chemistryAnswers.length) * 100);
    }
    
    if (biologyAnswers.length > 0) {
      const biologyCorrect = biologyAnswers.filter(a => a.isCorrect).length;
      subjectScores['Biology'] = Math.round((biologyCorrect / biologyAnswers.length) * 100);
    }
  }
  
  // Determine level based on score
  let level = '';
  if (score >= 80) level = 'Excellent';
  else if (score >= 60) level = 'Good';
  else if (score >= 40) level = 'Average';
  else level = 'Needs Improvement';
  
  // Generate analysis and strengths/weaknesses based on score
  let analysis = '';
  let strengths = '';
  let weaknesses = '';
  
  if (examType === "NEET-UG") {
    const highestSubject = Object.entries(subjectScores)
      .sort((a, b) => b[1] - a[1])[0];
    
    const lowestSubject = Object.entries(subjectScores)
      .sort((a, b) => a[1] - b[1])[0];
    
    if (score >= 80) {
      analysis = `You have an excellent grasp of core NEET concepts across subjects. Your performance shows strong concept mastery.`;
      strengths = `Strong understanding of key concepts, especially in ${highestSubject[0]} (${highestSubject[1]}%). You demonstrate the ability to apply concepts to solve problems.`;
      weaknesses = `Even with excellent performance, continue to refine your knowledge in ${lowestSubject[0]} (${lowestSubject[1]}%) to reach perfection.`;
    } else if (score >= 60) {
      analysis = `You have a good understanding of most NEET concepts. With more practice, you can improve further.`;
      strengths = `Good grasp of fundamentals, particularly in ${highestSubject[0]} (${highestSubject[1]}%). You're on the right track.`;
      weaknesses = `Focus more on strengthening your conceptual clarity in ${lowestSubject[0]} (${lowestSubject[1]}%) and practice applying concepts to more complex problems.`;
    } else if (score >= 40) {
      analysis = `Your understanding of NEET concepts is average. Dedicated study and practice will help improve your performance.`;
      strengths = `Basic understanding of concepts in ${highestSubject[0]} (${highestSubject[1]}%). You have a foundation to build upon.`;
      weaknesses = `Need significant improvement in ${lowestSubject[0]} (${lowestSubject[1]}%). Focus on understanding core principles before moving to complex topics.`;
    } else {
      analysis = `You need significant improvement in understanding NEET concepts. Consider revisiting fundamentals and seeking additional help.`;
      strengths = `You've taken the first step by identifying areas that need work. ${highestSubject[0]} is your relatively better subject at ${highestSubject[1]}%.`;
      weaknesses = `Major gaps in conceptual understanding, especially in ${lowestSubject[0]} (${lowestSubject[1]}%). Focus on NCERT textbooks and revise fundamentals.`;
    }
  } else {
    // Generic analysis for other exams
    if (score >= 80) {
      analysis = `You have an excellent grasp of core concepts. Your performance shows strong concept mastery.`;
      strengths = `Strong understanding of key concepts. You demonstrate the ability to apply concepts to solve problems.`;
      weaknesses = `Even with excellent performance, continue to refine your knowledge to reach perfection.`;
    } else if (score >= 60) {
      analysis = `You have a good understanding of most concepts. With more practice, you can improve further.`;
      strengths = `Good grasp of fundamentals. You're on the right track.`;
      weaknesses = `Focus more on strengthening your conceptual clarity and practice applying concepts to more complex problems.`;
    } else if (score >= 40) {
      analysis = `Your understanding of concepts is average. Dedicated study and practice will help improve your performance.`;
      strengths = `Basic understanding of some concepts. You have a foundation to build upon.`;
      weaknesses = `Need significant improvement. Focus on understanding core principles before moving to complex topics.`;
    } else {
      analysis = `You need significant improvement in understanding concepts. Consider revisiting fundamentals and seeking additional help.`;
      strengths = `You've taken the first step by identifying areas that need work.`;
      weaknesses = `Major gaps in conceptual understanding. Focus on textbooks and revise fundamentals.`;
    }
  }
  
  return {
    score,
    level,
    analysis,
    strengths,
    weaknesses,
    subjectScores
  };
};
