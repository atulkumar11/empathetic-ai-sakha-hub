
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Flag } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface QuestionViewProps {
  question: {
    id: string;
    text: string;
    options: {
      id: string;
      text: string;
    }[];
  };
  selectedOptionId?: string;
  onAnswerSelect: (optionId: string) => void;
  questionNumber: number;
  isFlagged?: boolean;
}

const QuestionView: React.FC<QuestionViewProps> = ({
  question,
  selectedOptionId,
  onAnswerSelect,
  questionNumber,
  isFlagged = false,
}) => {
  return (
    <Card className="relative">
      {isFlagged && (
        <Badge 
          variant="outline" 
          className="absolute top-3 right-3 bg-yellow-100 text-yellow-800 border-yellow-300 flex items-center"
        >
          <Flag className="h-3.5 w-3.5 mr-1 fill-yellow-500" /> Flagged
        </Badge>
      )}
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <span className="bg-gray-100 dark:bg-gray-800 rounded-full w-6 h-6 flex items-center justify-center text-sm">
            {questionNumber}
          </span>
          <h3 className="font-medium text-lg">{question.text}</h3>
        </div>
      </CardHeader>
      <CardContent>
        <RadioGroup 
          value={selectedOptionId} 
          onValueChange={onAnswerSelect}
          className="space-y-3"
        >
          {question.options.map((option) => (
            <div 
              key={option.id}
              className="flex items-center space-x-2 border border-gray-200 dark:border-gray-700 rounded-lg p-3 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
              onClick={() => onAnswerSelect(option.id)}
            >
              <RadioGroupItem value={option.id} id={`option-${option.id}`} />
              <Label htmlFor={`option-${option.id}`} className="flex-1 cursor-pointer">
                {option.text}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
    </Card>
  );
};

export default QuestionView;
