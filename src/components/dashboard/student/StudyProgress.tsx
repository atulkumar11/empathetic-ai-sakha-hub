
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { StudyTimeChart } from './study-progress/StudyTimeChart';
import { QuizzesList } from './study-progress/QuizzesList';
import { TopicsList } from './study-progress/TopicsList';
import { SubjectProgress, StudyStreak } from "@/types/user";

interface StudyProgressProps {
  subjects: SubjectProgress[];
  studyStreak: StudyStreak;
}

const StudyProgress: React.FC<StudyProgressProps> = ({ subjects, studyStreak }) => {
  const [activeTab, setActiveTab] = useState<string>('study-time');
  const [selectedSubject, setSelectedSubject] = useState<SubjectProgress | null>(
    subjects.length > 0 ? subjects[0] : null
  );

  const handleSelectSubject = (subjectId: string) => {
    const subject = subjects.find(s => s.id === subjectId);
    if (subject) {
      setSelectedSubject(subject);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Study Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full justify-start mb-4">
            <TabsTrigger value="study-time">Study Time</TabsTrigger>
            <TabsTrigger value="quizzes">Quizzes</TabsTrigger>
            <TabsTrigger value="topics">Topics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="study-time">
            <StudyTimeChart 
              selectedSubject={selectedSubject} 
              subjects={subjects}
              selectSubject={handleSelectSubject}
              studyStreak={studyStreak}
            />
          </TabsContent>
          
          <TabsContent value="quizzes">
            <QuizzesList 
              selectedSubject={selectedSubject}
              subjects={subjects}
              selectSubject={handleSelectSubject}
            />
          </TabsContent>
          
          <TabsContent value="topics">
            <TopicsList 
              selectedSubject={selectedSubject}
              subjects={subjects}
              selectSubject={handleSelectSubject}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default StudyProgress;
