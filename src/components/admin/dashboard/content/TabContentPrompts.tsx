
import React from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
  Book, 
  FileText, 
  FileCode,
  PenTool,
  Library,
  Zap,
  RotateCcw,
  Save
} from "lucide-react";

interface TabContentPromptsProps {
  handleEditPrompt: (promptType: string) => void;
  handleManageAllPrompts: () => void;
  handleTestContentGeneration: () => void;
  handleSaveSettings: () => void;
  handleResetSettings: () => void;
}

const TabContentPrompts = ({
  handleEditPrompt,
  handleManageAllPrompts,
  handleTestContentGeneration,
  handleSaveSettings,
  handleResetSettings
}: TabContentPromptsProps) => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Manage base prompts for GPT-based content generation and responses
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="border p-4 rounded-md bg-gray-50/50 dark:bg-gray-800/50">
          <h3 className="text-sm font-medium mb-1 flex items-center gap-2">
            <Book size={16} className="text-blue-500" />
            Concept Card Creator
          </h3>
          <Textarea 
            className="min-h-[100px] mb-3 mt-2" 
            placeholder="Create a concept card for {topic} targeted at {exam_type} students..."
            defaultValue="Create a concept card for {topic} targeted at {exam_type} students. The concept card should include: 1) A clear definition, 2) Key principles or rules, 3) 2-3 practical examples, 4) Common misconceptions, 5) Connections to other related concepts. Format the content in a structured way that's easy to understand for students preparing for {exam_type}."
          />
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => handleEditPrompt("Concept Card Creator")}
            className="flex items-center gap-2"
          >
            <PenTool size={14} />
            Edit Prompt
          </Button>
        </div>
        
        <div className="border p-4 rounded-md bg-gray-50/50 dark:bg-gray-800/50">
          <h3 className="text-sm font-medium mb-1 flex items-center gap-2">
            <FileText size={16} className="text-green-500" />
            Flashcard Generator
          </h3>
          <Textarea 
            className="min-h-[100px] mb-3 mt-2" 
            placeholder="Create a set of flashcards about {topic} with {difficulty_level}..."
            defaultValue="Create a set of flashcards about {topic} with {difficulty_level} difficulty. Generate 10 question-answer pairs that cover the most important aspects of {topic}. Each flashcard should have a concise question on one side and a clear, comprehensive answer on the other side. Include key terms, definitions, formulas, or principles as appropriate for the subject."
          />
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => handleEditPrompt("Flashcard Generator")}
            className="flex items-center gap-2"
          >
            <PenTool size={14} />
            Edit Prompt
          </Button>
        </div>
        
        <div className="border p-4 rounded-md bg-gray-50/50 dark:bg-gray-800/50">
          <h3 className="text-sm font-medium mb-1 flex items-center gap-2">
            <FileCode size={16} className="text-amber-500" />
            Practice Exam Creator
          </h3>
          <Textarea 
            className="min-h-[100px] mb-3 mt-2" 
            placeholder="Create a practice exam for {subject} based on {exam_pattern}..."
            defaultValue="Create a practice exam for {subject} based on {exam_pattern} with {number_of_questions} questions at {difficulty_level} difficulty. Include a mix of multiple choice, short answer, and problem-solving questions that test key concepts and analytical skills. Provide a detailed answer key with explanations for each question. The exam should mirror the format and style of {exam_pattern}."
          />
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => handleEditPrompt("Practice Exam Creator")}
            className="flex items-center gap-2"
          >
            <PenTool size={14} />
            Edit Prompt
          </Button>
        </div>
        
        <div className="border p-4 rounded-md bg-gray-50/50 dark:bg-gray-800/50">
          <h3 className="text-sm font-medium mb-1 flex items-center gap-2">
            <Library size={16} className="text-purple-500" />
            Study Guide Generator
          </h3>
          <Textarea 
            className="min-h-[100px] mb-3 mt-2" 
            placeholder="Create a comprehensive study guide for {topic}..."
            defaultValue="Create a comprehensive study guide for {topic} targeted at {exam_type} preparation. Include: 1) An overview of the topic, 2) Key concepts and definitions, 3) Important formulas or principles, 4) Step-by-step examples of problem solving, 5) Common questions with answers, 6) Tips and strategies for mastering the topic, 7) References to additional resources. Format the guide in a clear, structured manner with sections and subsections."
          />
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => handleEditPrompt("Study Guide Generator")}
            className="flex items-center gap-2"
          >
            <PenTool size={14} />
            Edit Prompt
          </Button>
        </div>
      </div>
      
      <div className="pt-6 border-t mt-6 space-y-4">
        <div className="flex items-center justify-between">
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={handleTestContentGeneration}
          >
            <Zap size={16} />
            Test Content Generation Algorithm
          </Button>
          <Button onClick={handleManageAllPrompts}>
            Manage All Prompts
          </Button>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            className="flex-1"
            onClick={handleSaveSettings}
          >
            <Save size={16} className="mr-2" /> Save Settings
          </Button>
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={handleResetSettings}
          >
            <RotateCcw size={16} className="mr-2" /> Reset to Defaults
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TabContentPrompts;
