
import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";

export interface QuestionOption {
  id: string;
  label: string;
}

export interface Question {
  id: string;
  question: string;
  options: QuestionOption[];
}

interface QuestionStepProps {
  question: Question;
  currentAnswer: string;
  onAnswer: (questionId: string, answerId: string) => void;
}

const QuestionStep: React.FC<QuestionStepProps> = ({ 
  question, 
  currentAnswer, 
  onAnswer 
}) => {
  return (
    <div key={question.id} className="mb-8">
      <h4 className="text-lg font-medium mb-4">{question.question}</h4>
      
      <RadioGroup 
        value={currentAnswer || ""} 
        onValueChange={(value) => onAnswer(question.id, value)}
      >
        <div className="space-y-3">
          {question.options.map((option) => (
            <div
              key={option.id}
              className="flex items-center border border-gray-200 dark:border-gray-700 rounded-lg p-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
              onClick={() => onAnswer(question.id, option.id)}
            >
              <RadioGroupItem 
                id={option.id} 
                value={option.id} 
                className="mr-3"
              />
              <Label htmlFor={option.id} className="cursor-pointer flex-1">
                {option.label}
              </Label>
            </div>
          ))}
        </div>
      </RadioGroup>
    </div>
  );
};

export default QuestionStep;
