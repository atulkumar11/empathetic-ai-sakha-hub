
import { ExamResults, TestResults } from '../types';

export const generateOverallReport = (results: Partial<ExamResults>, examType: string): TestResults => {
  // Calculate overall score with weighted average
  // 70% concept mastery + 30% readiness
  const conceptWeight = 0.7;
  const readinessWeight = 0.3;
  
  const conceptScore = results.concept?.score || 0;
  const readinessScore = results.readiness?.score || 0;
  
  const overallScore = Math.round(
    (conceptScore * conceptWeight) +
    (readinessScore * readinessWeight)
  );
  
  // Determine level based on score
  let level = '';
  if (overallScore >= 80) {
    level = 'Excellent';
  } else if (overallScore >= 60) {
    level = 'Good';
  } else if (overallScore >= 40) {
    level = 'Average';
  } else {
    level = 'Needs Improvement';
  }
  
  // Generate analysis based on score
  let analysis = '';
  if (overallScore >= 80) {
    analysis = `Your overall NEET readiness is excellent! With a strong conceptual foundation and good preparation habits, you're on track for success. Continue your consistent efforts while focusing on any remaining weak areas.`;
  } else if (overallScore >= 60) {
    analysis = `You have good NEET readiness overall. With continued focused effort on strengthening concepts and improving study techniques, you can improve your chances of success.`;
  } else if (overallScore >= 40) {
    analysis = `Your NEET readiness is at an average level. There's significant room for improvement in both concept mastery and preparation strategy. A structured approach focusing on fundamentals will help you progress.`;
  } else {
    analysis = `Your NEET readiness needs substantial improvement. Start with building strong fundamentals and establishing consistent study habits. With dedicated effort and the right guidance, you can make significant progress.`;
  }
  
  // Combine strengths from both assessments
  const strengths = [
    ...(results.concept?.strengths || []).slice(0, 2),
    ...(results.readiness?.strengths || []).slice(0, 2)
  ];
  
  // Combine improvements from both assessments
  const improvements = [
    ...(results.concept?.improvements || []).slice(0, 2),
    ...(results.readiness?.improvements || []).slice(0, 2)
  ];
  
  // Add NEET-specific recommendations
  if (examType.toLowerCase() === 'neet') {
    if (overallScore >= 60) {
      strengths.push('Good foundation for medical/biology subjects');
    } else {
      improvements.push('Focus on NCERT textbooks for Biology which form the core of NEET questions');
      improvements.push('Improve problem-solving speed for Physics and Chemistry');
    }
  }
  
  return {
    score: overallScore,
    level,
    analysis,
    strengths: [...new Set(strengths)], // Remove any duplicates
    improvements: [...new Set(improvements)] // Remove any duplicates
  };
};
