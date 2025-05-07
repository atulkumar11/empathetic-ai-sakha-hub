
import React from 'react';
import { Button } from "@/components/ui/button";
import { BookOpen } from 'lucide-react';
import { SubjectProgress } from "@/types/user";

interface QuizzesListProps {
  selectedSubject: SubjectProgress | null;
  subjects: SubjectProgress[];
  selectSubject: (id: string) => void;
}

export const QuizzesList: React.FC<QuizzesListProps> = ({
  selectedSubject,
  subjects,
  selectSubject
}) => {
  if (!selectedSubject) {
    return (
      <div className="text-center py-8">
        <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
        <h3 className="font-medium text-lg">Select a subject to view quizzes</h3>
        <div className="flex flex-wrap gap-2 justify-center mt-4">
          {subjects.map(subject => (
            <Button 
              key={subject.id}
              variant="outline"
              onClick={() => selectSubject(subject.id)}
            >
              {subject.name}
            </Button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h3 className="font-medium">Recent Quiz Performance</h3>
      
      <div className="space-y-4">
        {selectedSubject.quizScores.map(quiz => (
          <div key={quiz.id} className="border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">{quiz.title}</h4>
                <p className="text-sm text-muted-foreground">
                  {quiz.date} • {quiz.timeTaken} min
                </p>
              </div>
              <div className="text-right">
                <div className="text-lg font-semibold">
                  {quiz.score}/{quiz.maxScore}
                </div>
                <div className={`text-sm ${
                  (quiz.score / quiz.maxScore) * 100 > 70 ? 'text-green-600' :
                  (quiz.score / quiz.maxScore) * 100 > 40 ? 'text-amber-600' :
                  'text-red-600'
                }`}>
                  {Math.round((quiz.score / quiz.maxScore) * 100)}%
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
