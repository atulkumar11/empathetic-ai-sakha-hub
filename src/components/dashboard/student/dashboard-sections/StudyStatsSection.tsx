
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Subject, ConceptCard } from '@/types/student/dashboard';
import { BookOpen, Brain, Check, Clock, FileText } from 'lucide-react';

interface StudyStatsSectionProps {
  subjects: Subject[];
  conceptCards: ConceptCard[];
}

const StudyStatsSection: React.FC<StudyStatsSectionProps> = ({ subjects, conceptCards }) => {
  // Calculate overall statistics
  const totalConcepts = subjects.reduce((sum, subject) => sum + subject.conceptsTotal, 0);
  const completedConcepts = subjects.reduce((sum, subject) => sum + subject.conceptsCompleted, 0);
  const conceptsCompletionPercentage = totalConcepts > 0 ? Math.round((completedConcepts / totalConcepts) * 100) : 0;

  const totalFlashcards = subjects.reduce((sum, subject) => sum + subject.flashcards.total, 0);
  const completedFlashcards = subjects.reduce((sum, subject) => sum + subject.flashcards.completed, 0);
  const flashcardsCompletionPercentage = totalFlashcards > 0 ? Math.round((completedFlashcards / totalFlashcards) * 100) : 0;

  // Calculate average scores across subjects
  const totalQuizScore = subjects.reduce((sum, subject) => sum + subject.quizAverage, 0);
  const avgQuizScore = subjects.length > 0 ? Math.round(totalQuizScore / subjects.length) : 0;

  const totalFlashcardAccuracy = subjects.reduce((sum, subject) => sum + subject.flashcards.accuracy, 0);
  const avgFlashcardAccuracy = subjects.length > 0 ? Math.round(totalFlashcardAccuracy / subjects.length) : 0;

  // Calculate total practice tests
  const totalPracticeTests = subjects.reduce((sum, subject) => sum + subject.practiceTests.total, 0);
  const completedPracticeTests = subjects.reduce((sum, subject) => sum + subject.practiceTests.completed, 0);

  // Calculate total study time recommended
  const totalStudyHours = subjects.reduce((sum, subject) => sum + subject.recommendedStudyHours, 0);
  
  const stats = [
    {
      title: 'Concepts Completed',
      value: `${completedConcepts} / ${totalConcepts}`,
      percentage: conceptsCompletionPercentage,
      icon: <BookOpen className="h-5 w-5 text-blue-500" />,
    },
    {
      title: 'Quiz Average Score',
      value: `${avgQuizScore}%`,
      percentage: avgQuizScore,
      icon: <Brain className="h-5 w-5 text-purple-500" />,
    },
    {
      title: 'Flashcard Recall Accuracy',
      value: `${avgFlashcardAccuracy}%`,
      percentage: avgFlashcardAccuracy,
      icon: <FileText className="h-5 w-5 text-amber-500" />,
    },
    {
      title: 'Practice Tests Completed',
      value: `${completedPracticeTests} / ${totalPracticeTests}`,
      percentage: totalPracticeTests > 0 ? Math.round((completedPracticeTests / totalPracticeTests) * 100) : 0,
      icon: <Check className="h-5 w-5 text-green-500" />,
    },
    {
      title: 'Recommended Daily Study',
      value: `${totalStudyHours.toFixed(1)} hrs`,
      percentage: Math.min(100, Math.round((totalStudyHours / 8) * 100)), // 8 hours is considered 100%
      icon: <Clock className="h-5 w-5 text-indigo-500" />,
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} className="overflow-hidden border-t-4" style={{ borderTopColor: getColorForPercentage(stat.percentage) }}>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <div className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 mr-3">
                  {stat.icon}
                </div>
                <h3 className="text-sm font-medium">{stat.title}</h3>
              </div>
            </div>
            <div className="flex justify-between items-baseline mb-2">
              <span className="text-2xl font-bold">{stat.value}</span>
              <span className="text-sm text-muted-foreground">{stat.percentage}%</span>
            </div>
            <Progress value={stat.percentage} className="h-2" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

// Helper function to get color based on percentage
const getColorForPercentage = (percentage: number): string => {
  if (percentage >= 80) return '#10b981'; // green
  if (percentage >= 60) return '#3b82f6'; // blue
  if (percentage >= 40) return '#f59e0b'; // amber
  return '#ef4444'; // red
};

export default StudyStatsSection;
