
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { TestResults } from '../types';
import ConceptLoader from './ConceptLoader';
import ConceptTestResults from './ConceptTestResults';
import ConceptTestQuestions from './ConceptTestQuestions';
import { Card } from "@/components/ui/card";
import { Brain, Atom, Book } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from "@/components/ui/checkbox";
import { getConceptTopics } from '../test-questions/conceptTestQuestions';

interface ConceptTestSectionProps {
  loading: boolean;
  testCompleted: boolean;
  selectedExam: string;
  results: TestResults | null;
  simulateTest: () => void;
  onCompleteTest: (answers: any[]) => void;
  onContinue: () => void;
  examDetails?: {
    scoringPattern: string;
    timePerQuestion: string;
    totalTime: string;
    totalQuestions: string;
  };
}

const ConceptTestSection: React.FC<ConceptTestSectionProps> = ({
  loading,
  testCompleted,
  selectedExam,
  results,
  simulateTest,
  onCompleteTest,
  onContinue,
  examDetails
}) => {
  const [isTestActive, setIsTestActive] = useState(false);
  const [userAnswers, setUserAnswers] = useState<any[]>([]);
  const [currentSubject, setCurrentSubject] = useState<string | undefined>(undefined);
  const [completedSubjects, setCompletedSubjects] = useState<string[]>([]);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  
  const isNEET = selectedExam === "NEET-UG" || selectedExam === "NEET";
  const subjects = isNEET ? ["Physics", "Chemistry", "Biology"] : [];
  
  // Initialize topics based on exam type
  const topics = getConceptTopics(selectedExam);
  
  const toggleSubjectSelection = (subject: string) => {
    setSelectedSubjects(prev => {
      // If already selected, remove it
      if (prev.includes(subject)) {
        return prev.filter(s => s !== subject);
      }
      
      // If trying to add more than 3 subjects, don't allow for NEET
      if (isNEET && prev.length >= 3) {
        return prev;
      }
      
      // Add the subject
      return [...prev, subject];
    });
  };
  
  const handleStartTest = () => {
    if (selectedSubjects.length === 0) return;
    
    setIsTestActive(true);
    simulateTest();
    
    // Start with the first selected subject
    setCurrentSubject(selectedSubjects[0]);
    setCompletedSubjects([]);
  };
  
  const handleCompleteSubjectTest = (answers: any[]) => {
    // Store answers for this subject
    setUserAnswers(prev => [...prev, ...answers]);
    
    // Track completed subjects
    if (currentSubject) {
      setCompletedSubjects(prev => [...prev, currentSubject]);
    }
    
    // Find the next subject to test
    const nextSubjectIndex = selectedSubjects.findIndex(s => s === currentSubject) + 1;
    
    if (nextSubjectIndex < selectedSubjects.length) {
      // More subjects to test
      setCurrentSubject(selectedSubjects[nextSubjectIndex]);
      simulateTest(); // Simulate loading for next subject
    } else {
      // All subjects completed
      setIsTestActive(false);
      onCompleteTest(userAnswers);
    }
  };
  
  if (loading) {
    return <ConceptLoader subject={currentSubject} />;
  }
  
  if (testCompleted && results) {
    return (
      <ConceptTestResults 
        results={results}
        onContinue={onContinue}
      />
    );
  }
  
  if (isTestActive) {
    return (
      <div className="space-y-4">
        {isNEET && (
          <div className="flex items-center justify-between">
            <h3 className="font-medium">NEET Concept Test</h3>
            <div className="flex items-center space-x-2">
              {selectedSubjects.map((subject, index) => (
                <Badge 
                  key={subject}
                  variant={currentSubject === subject ? "default" : completedSubjects.includes(subject) ? "outline" : "secondary"}
                  className={currentSubject === subject ? "bg-pink-500" : completedSubjects.includes(subject) ? "bg-green-50 text-green-700 border-green-300" : ""}
                >
                  {subject}
                </Badge>
              ))}
            </div>
          </div>
        )}
        
        <ConceptTestQuestions
          selectedExam={selectedExam}
          onCompleteTest={handleCompleteSubjectTest}
          examDetails={examDetails}
          currentSubject={currentSubject}
        />
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold mb-2">Test Your Concept Understanding</h3>
        <p className="text-muted-foreground">
          Let's assess your understanding of key concepts required for {selectedExam}
        </p>
      </div>
      
      {isNEET && examDetails && (
        <Card className="p-4 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
          <div className="space-y-2">
            <h4 className="font-medium text-blue-700 dark:text-blue-300">NEET-UG Concept Test</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div className="flex items-center">
                <span>Scoring: {examDetails.scoringPattern}</span>
              </div>
              <div className="flex items-center">
                <span>Time: {examDetails.timePerQuestion}</span>
              </div>
            </div>
            <p className="text-xs text-blue-600 dark:text-blue-400">
              This test will assess your understanding of key concepts across subjects covered in NEET-UG
            </p>
          </div>
        </Card>
      )}
      
      <div className="bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20 rounded-lg p-6">
        <h4 className="text-lg font-medium mb-4">What to expect in the concept test:</h4>
        
        <ul className="space-y-3 list-disc pl-5">
          <li>
            <span className="font-medium">Subject Coverage:</span>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {isNEET 
                ? "Questions from Physics, Chemistry, and Biology covering key NEET concepts" 
                : `Core topics relevant to ${selectedExam}`}
            </p>
          </li>
          <li>
            <span className="font-medium">Question Format:</span>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              A mix of multiple-choice questions with different difficulty levels
            </p>
          </li>
          <li>
            <span className="font-medium">Question Bank:</span>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Each subject has a bank of 50 questions with 10 randomly selected each time
            </p>
          </li>
          {isNEET && (
            <li>
              <span className="font-medium">NEET Specifics:</span>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Follows +4/-1 scoring pattern with 1.06 minutes per question timing
              </p>
            </li>
          )}
        </ul>
        
        {isNEET && (
          <div className="mt-5 pt-5 border-t border-violet-200 dark:border-violet-700">
            <h5 className="font-medium mb-3">Select subjects for your test:</h5>
            <div className="space-y-3">
              {topics.map((topic) => (
                <div key={topic.id} className="flex items-center space-x-2 bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                  <Checkbox 
                    id={topic.id} 
                    checked={selectedSubjects.includes(topic.subject)} 
                    onCheckedChange={() => toggleSubjectSelection(topic.subject)}
                  />
                  <label 
                    htmlFor={topic.id} 
                    className="flex items-center justify-between w-full text-sm cursor-pointer"
                  >
                    <span className="font-medium flex items-center">
                      {topic.subject === 'Physics' && <Atom className="mr-2 text-blue-500" size={16} />}
                      {topic.subject === 'Chemistry' && <Brain className="mr-2 text-green-500" size={16} />}
                      {topic.subject === 'Biology' && <Book className="mr-2 text-red-500" size={16} />}
                      {topic.subject}
                    </span>
                    <span className="text-xs text-gray-500">10 random questions from bank of 50</span>
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      <div className="flex justify-end">
        <Button 
          onClick={handleStartTest}
          disabled={selectedSubjects.length === 0}
          className="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700"
        >
          Start Concept Test
          {selectedSubjects.length > 0 && ` (${selectedSubjects.length} ${selectedSubjects.length === 1 ? 'subject' : 'subjects'})`}
        </Button>
      </div>
    </div>
  );
};

export default ConceptTestSection;
