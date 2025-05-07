
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";

interface InterestsStepProps {
  examGoal?: string;
  onSubmit: (interests: string) => void;
}

const InterestsStep: React.FC<InterestsStepProps> = ({ examGoal, onSubmit }) => {
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [weakSubjects, setWeakSubjects] = useState<string[]>([]);
  const [subjects, setSubjects] = useState<string[]>([]);
  
  useEffect(() => {
    // Set default subjects based on exam goal
    if (examGoal === "IIT-JEE") {
      setSubjects([
        "Physics", 
        "Chemistry", 
        "Mathematics", 
        "Problem Solving", 
        "Mechanics", 
        "Electromagnetism", 
        "Organic Chemistry", 
        "Inorganic Chemistry", 
        "Calculus", 
        "Algebra"
      ]);
      // Auto-select core subjects
      setSelectedSubjects(["Physics", "Chemistry", "Mathematics"]);
    } else if (examGoal === "NEET") {
      setSubjects([
        "Physics", 
        "Chemistry", 
        "Biology", 
        "Botany", 
        "Zoology", 
        "Human Physiology", 
        "Biochemistry", 
        "Organic Chemistry", 
        "Inorganic Chemistry"
      ]);
      // Auto-select core subjects
      setSelectedSubjects(["Physics", "Chemistry", "Biology"]);
    } else if (examGoal === "UPSC") {
      setSubjects([
        "Indian Polity", 
        "Geography", 
        "Economy", 
        "History", 
        "Environment", 
        "Current Affairs", 
        "Science & Technology", 
        "International Relations", 
        "Ethics", 
        "Ancient India"
      ]);
      // Auto-select core subjects
      setSelectedSubjects(["Indian Polity", "Geography", "Economy", "History"]);
    } else {
      setSubjects([
        "Mathematics",
        "Science",
        "Social Studies",
        "Languages",
        "Computer Science",
        "Economics",
        "Business Studies",
        "Accountancy"
      ]);
    }
  }, [examGoal]);

  const handleSubjectToggle = (subject: string) => {
    if (selectedSubjects.includes(subject)) {
      setSelectedSubjects(selectedSubjects.filter(s => s !== subject));
      setWeakSubjects(weakSubjects.filter(s => s !== subject));
    } else {
      setSelectedSubjects([...selectedSubjects, subject]);
    }
  };

  const handleWeakToggle = (subject: string) => {
    if (!selectedSubjects.includes(subject)) {
      return; // Can't mark as weak if not selected
    }
    
    if (weakSubjects.includes(subject)) {
      setWeakSubjects(weakSubjects.filter(s => s !== subject));
    } else {
      setWeakSubjects([...weakSubjects, subject]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formattedInterests = selectedSubjects.map(subject => {
      if (weakSubjects.includes(subject)) {
        return `${subject} (weak)`;
      }
      return `${subject} (strong)`;
    }).join(", ");
    onSubmit(formattedInterests);
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div>
        <h3 className="font-medium text-lg mb-3">Select Your Preferred Subjects</h3>
        <p className="text-sm text-gray-500 mb-4">
          Mark subjects you're interested in and identify your weak areas for personalized study focus.
        </p>
        
        {examGoal && (
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md p-4 mb-4">
            <p className="text-sm text-blue-700 dark:text-blue-300">
              Based on your exam goal <strong>{examGoal}</strong>, we've pre-selected the core subjects.
              You can modify these selections and mark your weak subjects.
            </p>
          </div>
        )}
        
        <div className="space-y-2">
          {subjects.map((subject) => (
            <div key={subject} className="flex items-center justify-between border rounded-lg p-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={`subject-${subject}`}
                  checked={selectedSubjects.includes(subject)}
                  onCheckedChange={() => handleSubjectToggle(subject)}
                />
                <Label htmlFor={`subject-${subject}`} className="cursor-pointer">
                  {subject}
                </Label>
              </div>
              
              {selectedSubjects.includes(subject) && (
                <div className="flex items-center space-x-2">
                  <Label htmlFor={`weak-${subject}`} className="text-xs cursor-pointer">
                    Mark as weak
                  </Label>
                  <Checkbox
                    id={`weak-${subject}`}
                    checked={weakSubjects.includes(subject)}
                    onCheckedChange={() => handleWeakToggle(subject)}
                    className="data-[state=checked]:bg-amber-500 data-[state=checked]:border-amber-500"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <Button
        type="submit"
        className="w-full bg-gradient-to-r from-blue-500 to-blue-600"
        disabled={selectedSubjects.length === 0}
      >
        Continue
      </Button>
    </motion.form>
  );
};

export default InterestsStep;
