
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

interface SubjectTabsProps {
  subjects: string[];
  activeSubject: string;
  onSubjectChange: (subject: string) => void;
  conceptCounts: Record<string, number>;
}

export const SubjectTabs = ({ subjects, activeSubject, onSubjectChange, conceptCounts }: SubjectTabsProps) => {
  return (
    <Tabs value={activeSubject} onValueChange={onSubjectChange}>
      <TabsList className="w-full flex-wrap h-auto p-2 bg-muted/20">
        <TabsTrigger value="all" className="gap-2">
          All Subjects
          <Badge variant="secondary" className="ml-2">
            {Object.values(conceptCounts).reduce((a, b) => a + b, 0)}
          </Badge>
        </TabsTrigger>
        {subjects.map((subject) => (
          <TabsTrigger key={subject} value={subject} className="gap-2">
            {subject}
            <Badge variant="secondary" className="ml-2">
              {conceptCounts[subject] || 0}
            </Badge>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};
