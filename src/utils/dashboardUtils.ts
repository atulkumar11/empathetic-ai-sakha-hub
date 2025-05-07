
import { format, parseISO, isBefore, addDays } from 'date-fns';
import { Subject, ConceptCard } from '@/types/student/dashboard';

/**
 * Calculate the percentage of completion
 */
export const calculatePercentage = (completed: number, total: number): number => {
  if (total === 0) return 0;
  return Math.round((completed / total) * 100);
};

/**
 * Format a date string to a readable format
 */
export const formatDate = (dateString: string): string => {
  try {
    return format(parseISO(dateString), 'MMM d, yyyy');
  } catch (e) {
    return dateString;
  }
};

/**
 * Format a time duration in minutes to hours and minutes
 */
export const formatTime = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  
  if (hours === 0) {
    return `${mins}m`;
  } else if (mins === 0) {
    return `${hours}h`;
  } else {
    return `${hours}h ${mins}m`;
  }
};

/**
 * Get a color based on a percentage value
 */
export const getProgressColor = (percentage: number): string => {
  if (percentage >= 90) return '#10b981'; // green-500
  if (percentage >= 75) return '#3b82f6'; // blue-500
  if (percentage >= 50) return '#f59e0b'; // amber-500
  if (percentage >= 25) return '#ef4444'; // red-500
  return '#ef4444'; // red-500
};

/**
 * Get a status emoji based on completion percentage
 */
export const getStatusEmoji = (percentage: number): string => {
  if (percentage >= 100) return '✅';
  if (percentage >= 75) return '🟢';
  if (percentage >= 50) return '🟡';
  if (percentage >= 25) return '🟠';
  return '❌';
};

/**
 * Filter concepts by subject
 */
export const filterConceptsBySubject = (concepts: ConceptCard[], subjectId: string): ConceptCard[] => {
  return concepts.filter(concept => concept.subject === subjectId);
};

/**
 * Check if a due date is approaching (within 3 days)
 */
export const isDueDateApproaching = (dateString: string): boolean => {
  try {
    const dueDate = parseISO(dateString);
    const today = new Date();
    const threeDaysFromNow = addDays(today, 3);
    
    return isBefore(dueDate, threeDaysFromNow) && !isBefore(dueDate, today);
  } catch (e) {
    return false;
  }
};

/**
 * Sort subjects by priority
 */
export const sortSubjectsByPriority = (subjects: Subject[]): Subject[] => {
  const priorityOrder = { 'High': 1, 'Medium': 2, 'Low': 3 };
  
  return [...subjects].sort((a, b) => {
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });
};

/**
 * Get subjects that need attention (low performance or progress)
 */
export const getSubjectsNeedingAttention = (subjects: Subject[]): Subject[] => {
  return subjects.filter(subject => 
    subject.progress < 50 ||
    subject.quizAverage < 60 ||
    subject.flashcards.accuracy < 60
  );
};

/**
 * Get the weekly target text
 */
export const getWeeklyTargetText = (
  conceptsTotal: number,
  flashcardsTotal: number,
  testsTotal: number
): string => {
  return `Complete ${conceptsTotal} concepts, ${flashcardsTotal} flashcards, and ${testsTotal} practice tests`;
};
