
import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, Clock } from 'lucide-react';
import { SubjectTopic } from '../../types';
import { Checkbox } from "@/components/ui/checkbox";

interface ConceptTestIntroProps {
  topics?: SubjectTopic[];
  selectedSubjects?: string[];
  toggleSubjectSelection?: (subject: string) => void;
  getEstimatedTestTime?: () => number;
  startTest?: () => void;
  selectedExam?: string;
  selectedSubject?: string;
  onStart?: () => void;
  disabled?: boolean;
}

const ConceptTestIntro: React.FC<ConceptTestIntroProps> = ({
  topics = [],
  selectedSubjects = [],
  toggleSubjectSelection = () => {},
  getEstimatedTestTime = () => 300, // Default 5 minutes
  startTest = () => {},
  selectedExam,
  selectedSubject,
  onStart,
  disabled
}) => {
  // Use the appropriate handler based on which props are available
  const handleStartTest = onStart || startTest;
  
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    return `${minutes} min`;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium flex items-center">
          <Brain className="mr-2 text-pink-500" size={20} />
          Concept Mastery Test
          {selectedExam && <span className="ml-2 text-sm">({selectedExam})</span>}
        </h3>
        <Badge variant="outline" className="bg-pink-50 dark:bg-pink-900/30 border-pink-200 dark:border-pink-700">3 of 3</Badge>
      </div>
      
      <p className="text-sm">
        This test identifies gaps between your perceived knowledge and actual performance on key topics.
      </p>
      
      <div className="space-y-6">
        <div className="bg-pink-50 dark:bg-pink-900/20 p-4 rounded-lg border-2 border-pink-100 dark:border-pink-800">
          <h4 className="font-medium mb-2 flex items-center">
            <Brain className="mr-2 text-pink-500" size={16} />
            Instructions:
          </h4>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li>Select up to 2 subjects you want to test your knowledge on</li>
            <li>Rate your confidence on each selected subject</li>
            <li>Answer 5 multiple-choice questions per subject</li>
            <li>We'll identify knowledge gaps to optimize your study plan</li>
          </ul>
          
          <div className="mt-3 flex items-center text-sm text-pink-700 dark:text-pink-300">
            <Clock size={16} className="mr-1" />
            <span>Total test time: {formatTime(getEstimatedTestTime())}</span>
          </div>
        </div>
        
        {topics && topics.length > 0 ? (
          <div className="space-y-3">
            <label className="text-sm font-medium">Select Subjects (max 2)</label>
            <div className="grid grid-cols-1 gap-2">
              {topics.map((topic) => (
                <div key={topic.id} className="flex items-center space-x-2 bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                  <Checkbox 
                    id={topic.id} 
                    checked={selectedSubjects.includes(topic.subject)} 
                    onCheckedChange={() => toggleSubjectSelection(topic.subject)}
                    disabled={selectedSubjects.length >= 2 && !selectedSubjects.includes(topic.subject)}
                  />
                  <label 
                    htmlFor={topic.id} 
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex justify-between w-full"
                  >
                    <span>{topic.subject}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{topic.topics} questions · {formatTime(topic.topics * 60)}</span>
                  </label>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center p-4">
            <p>{selectedExam && selectedSubject ? `Ready to test your knowledge on ${selectedSubject} for ${selectedExam}?` : "Select a subject to begin"}</p>
          </div>
        )}
        
        <Button 
          className="w-full bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 transition-all duration-300 shadow-md hover:shadow-lg"
          onClick={handleStartTest}
          disabled={disabled !== undefined ? disabled : selectedSubjects.length === 0}
        >
          Begin Concept Test {selectedSubject ? `(${selectedSubject})` : selectedSubjects.length > 0 ? `(${selectedSubjects.length} ${selectedSubjects.length === 1 ? 'subject' : 'subjects'})` : ''}
        </Button>
      </div>
    </div>
  );
};

export default ConceptTestIntro;
