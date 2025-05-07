
import React, { useState } from 'react';
import { TestQuestion } from '../../types';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Brain } from 'lucide-react';

interface ConceptTestQuestionProps {
  question: TestQuestion;
  onAnswer: (answer: string, confidenceLevel?: number) => void;
  disabled?: boolean;
}

const ConceptTestQuestion: React.FC<ConceptTestQuestionProps> = ({ 
  question, 
  onAnswer,
  disabled = false
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  
  const handleSubmit = () => {
    if (selectedAnswer && !disabled) {
      onAnswer(selectedAnswer);
    }
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="mb-6">
        <h3 className="text-lg font-medium flex items-center">
          <Brain className="mr-2 text-pink-500" size={20} />
          <span>{question.question}</span>
        </h3>
        
        {question.imageUrl && (
          <div className="mt-4 rounded-lg overflow-hidden">
            <img 
              src={question.imageUrl} 
              alt="Question visual" 
              className="w-full object-contain max-h-64" 
            />
          </div>
        )}
      </div>
      
      <RadioGroup className="space-y-3 mb-6">
        {question.options.map((option, index) => (
          <div 
            key={index} 
            className={`flex items-center space-x-2 p-3 rounded-md border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 ${
              selectedAnswer === option ? 'bg-pink-50 dark:bg-pink-900/20 border-pink-200 dark:border-pink-800' : ''
            }`}
            onClick={() => !disabled && setSelectedAnswer(option)}
          >
            <RadioGroupItem 
              value={option} 
              id={`option-${index}`} 
              checked={selectedAnswer === option}
              disabled={disabled}
            />
            <Label 
              htmlFor={`option-${index}`}
              className="flex-1 cursor-pointer"
            >
              {option}
            </Label>
          </div>
        ))}
      </RadioGroup>
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Button
          className="w-full bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700"
          onClick={handleSubmit}
          disabled={!selectedAnswer || disabled}
        >
          Submit Answer
        </Button>
      </motion.div>
    </div>
  );
};

export default ConceptTestQuestion;
