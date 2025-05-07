
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { ConceptTask, FlashcardTask, PracticeExamTask } from "@/types/student/todaysPlans";
import SubjectTaskItem from './SubjectTaskItem';

interface SubjectBreakdownProps {
  concepts: ConceptTask[];
  flashcards: FlashcardTask[];
  practiceExams: PracticeExamTask[];
  showAllTasks?: boolean;
}

const SubjectBreakdown: React.FC<SubjectBreakdownProps> = ({ 
  concepts, 
  flashcards, 
  practiceExams,
  showAllTasks = false
}) => {
  const [expandedSubject, setExpandedSubject] = useState<string | null>(null);
  
  // Group tasks by subject
  const subjectGroups = useMemo(() => {
    const groups: {[key: string]: {
      concepts: ConceptTask[];
      flashcards: FlashcardTask[];
      practiceExams: PracticeExamTask[];
    }} = {};
    
    // Group concepts by subject
    concepts.forEach(concept => {
      const subject = concept.subject;
      if (!groups[subject]) {
        groups[subject] = {
          concepts: [],
          flashcards: [],
          practiceExams: []
        };
      }
      groups[subject].concepts.push(concept);
    });
    
    // Group flashcards by subject
    flashcards.forEach(flashcard => {
      const subject = flashcard.subject;
      if (!groups[subject]) {
        groups[subject] = {
          concepts: [],
          flashcards: [],
          practiceExams: []
        };
      }
      groups[subject].flashcards.push(flashcard);
    });
    
    // Group practice exams by subject
    practiceExams.forEach(exam => {
      const subject = exam.subject;
      if (!groups[subject]) {
        groups[subject] = {
          concepts: [],
          flashcards: [],
          practiceExams: []
        };
      }
      groups[subject].practiceExams.push(exam);
    });
    
    return groups;
  }, [concepts, flashcards, practiceExams]);

  // Toggle expansion for a subject
  const toggleSubject = (subject: string) => {
    if (expandedSubject === subject) {
      setExpandedSubject(null);
    } else {
      setExpandedSubject(subject);
    }
  };
  
  // Calculate completion stats for a subject
  const getSubjectStats = (subject: string) => {
    const group = subjectGroups[subject];
    
    const conceptsTotal = group.concepts.length;
    const flashcardsTotal = group.flashcards.length;
    const examsTotal = group.practiceExams.length;
    
    const conceptsCompleted = group.concepts.filter(c => c.status === "completed").length;
    const flashcardsCompleted = group.flashcards.filter(f => f.status === "completed").length;
    const examsCompleted = group.practiceExams.filter(e => e.status === "completed").length;
    
    return {
      total: conceptsTotal + flashcardsTotal + examsTotal,
      completed: conceptsCompleted + flashcardsCompleted + examsCompleted,
      conceptsTotal,
      conceptsCompleted,
      flashcardsTotal,
      flashcardsCompleted,
      examsTotal,
      examsCompleted
    };
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Subjects Breakdown</CardTitle>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          {/* Subject Cards */}
          {Object.keys(subjectGroups).map((subject) => {
            const stats = getSubjectStats(subject);
            const isExpanded = expandedSubject === subject;
            const completionPercentage = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;
            
            return (
              <div key={subject} className="border rounded-lg overflow-hidden">
                {/* Subject Header */}
                <div 
                  className={`p-4 flex justify-between items-center cursor-pointer ${isExpanded ? 'bg-blue-50 border-b' : 'hover:bg-gray-50'}`}
                  onClick={() => toggleSubject(subject)}
                >
                  <div className="flex items-center space-x-4">
                    <h3 className="font-medium">{subject}</h3>
                    <span className="text-sm text-gray-500">
                      {stats.completed}/{stats.total} tasks completed
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium">{completionPercentage}%</span>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                
                {/* Expanded Content */}
                {isExpanded && (
                  <div className="p-4 space-y-6">
                    {/* Concepts Section */}
                    {stats.conceptsTotal > 0 && (
                      <div>
                        <h4 className="font-medium mb-2 text-sm text-gray-500">Concepts ({stats.conceptsCompleted}/{stats.conceptsTotal})</h4>
                        <div className="space-y-2">
                          {subjectGroups[subject].concepts.map((concept) => (
                            <SubjectTaskItem 
                              key={concept.id} 
                              task={concept} 
                              type="concept" 
                            />
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Flashcards Section */}
                    {stats.flashcardsTotal > 0 && (
                      <div>
                        <h4 className="font-medium mb-2 text-sm text-gray-500">Flashcards ({stats.flashcardsCompleted}/{stats.flashcardsTotal})</h4>
                        <div className="space-y-2">
                          {subjectGroups[subject].flashcards.map((flashcard) => (
                            <SubjectTaskItem 
                              key={flashcard.id} 
                              task={flashcard} 
                              type="flashcard" 
                            />
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Practice Exams Section */}
                    {stats.examsTotal > 0 && (
                      <div>
                        <h4 className="font-medium mb-2 text-sm text-gray-500">Practice Tests ({stats.examsCompleted}/{stats.examsTotal})</h4>
                        <div className="space-y-2">
                          {subjectGroups[subject].practiceExams.map((exam) => (
                            <SubjectTaskItem 
                              key={exam.id} 
                              task={exam} 
                              type="practice-exam" 
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default SubjectBreakdown;
