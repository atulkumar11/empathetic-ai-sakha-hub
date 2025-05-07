
import React from 'react';
import { Button } from "@/components/ui/button";
import { BookOpen } from 'lucide-react';
import { SubjectProgress } from "@/types/user";

interface TopicsListProps {
  selectedSubject: SubjectProgress | null;
  subjects: SubjectProgress[];
  selectSubject: (id: string) => void;
}

export const TopicsList: React.FC<TopicsListProps> = ({ 
  selectedSubject, 
  subjects,
  selectSubject 
}) => {
  if (!selectedSubject) {
    return (
      <div className="text-center py-8">
        <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
        <h3 className="font-medium text-lg">Select a subject to view topics</h3>
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
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">{selectedSubject.name} Topics</h3>
        <div className="text-sm text-muted-foreground">
          {selectedSubject.topics.filter(t => t.completed).length} of {selectedSubject.topics.length} completed
        </div>
      </div>
      
      <div className="space-y-4">
        {selectedSubject.topics.map(topic => (
          <div key={topic.id} className="border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  topic.masteryLevel > 80 ? 'bg-green-100 text-green-700' :
                  topic.masteryLevel > 50 ? 'bg-amber-100 text-amber-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {topic.masteryLevel}%
                </div>
                <div>
                  <h4 className="font-medium">{topic.name}</h4>
                  {topic.lastPracticed && (
                    <p className="text-xs text-muted-foreground">
                      Last practiced: {topic.lastPracticed}
                    </p>
                  )}
                </div>
              </div>
              <Button variant="outline" size="sm">Practice</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
