
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

interface SubjectItemProps {
  name: string;
  topics: string[];
  isProficiencySelected: (proficiency: 'weak' | 'moderate' | 'strong') => boolean;
  onProficiencySelect: (proficiency: 'weak' | 'moderate' | 'strong') => void;
}

const SubjectItem: React.FC<SubjectItemProps> = ({
  name,
  topics,
  isProficiencySelected,
  onProficiencySelect
}) => {
  const [showTopics, setShowTopics] = React.useState(false);

  const handleProficiencySelect = (proficiency: 'weak' | 'moderate' | 'strong') => (e: React.MouseEvent) => {
    e.preventDefault();
    onProficiencySelect(proficiency);
  };

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="flex flex-col">
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex-1">
              <h3 className="font-medium">{name}</h3>
              <p className="text-sm text-muted-foreground">{topics.join(', ')}</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowTopics(!showTopics)}
            >
              {showTopics ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </Button>
          </div>

          <div className="flex border-b">
            <button
              className={`flex-1 py-3 text-center text-sm transition-colors ${
                isProficiencySelected('weak')
                  ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300 font-medium'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
              onClick={handleProficiencySelect('weak')}
            >
              Needs Work
            </button>
            <button
              className={`flex-1 py-3 text-center text-sm transition-colors ${
                isProficiencySelected('moderate')
                  ? 'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300 font-medium'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
              onClick={handleProficiencySelect('moderate')}
            >
              Moderate
            </button>
            <button
              className={`flex-1 py-3 text-center text-sm transition-colors ${
                isProficiencySelected('strong')
                  ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 font-medium'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
              onClick={handleProficiencySelect('strong')}
            >
              Strong
            </button>
          </div>

          {showTopics && (
            <div className="p-4 bg-gray-50 dark:bg-gray-800/50">
              <h4 className="text-sm font-medium mb-2">Topics:</h4>
              <ul className="text-sm space-y-1">
                {topics.map((topic, index) => (
                  <li key={index} className="text-muted-foreground">{topic}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SubjectItem;
