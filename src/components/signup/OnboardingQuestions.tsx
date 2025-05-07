
import React, { useState } from "react";
import { X } from "lucide-react";
import { motion } from "framer-motion";

import { UserRole } from "./OnboardingContext";
import QuestionStep from "./onboarding/QuestionStep";
import ProgressBar from "./onboarding/ProgressBar";
import QuestionNavigation from "./onboarding/QuestionNavigation";
import { getQuestionsByRole } from "./onboarding/questionsData";

export type OnboardingData = {
  role?: UserRole;
  [key: string]: any;
};

export interface OnboardingQuestionsProps {
  role: UserRole;
  onComplete: (data: OnboardingData) => void;
  onClose: () => void;
  isLoading?: boolean;
}

const OnboardingQuestions = ({ role, onComplete, onClose, isLoading = false }: OnboardingQuestionsProps) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  // Get questions based on user role
  const questions = getQuestionsByRole(role);

  const handleAnswer = (id: string, value: string) => {
    setAnswers({ ...answers, [id]: value });
  };

  const handleNext = () => {
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      onComplete({...answers, role});
    }
  };

  const handlePrevious = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const currentQuestion = questions[step];
  const isLastQuestion = step === questions.length - 1;
  const isAnswered = answers[currentQuestion.id] !== undefined;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-100 dark:border-gray-700 p-6"
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold">{role} Profile</h3>
        <button 
          onClick={onClose}
          className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <X size={18} />
        </button>
      </div>

      <ProgressBar currentStep={step} totalSteps={questions.length} />

      <QuestionStep
        question={currentQuestion}
        currentAnswer={answers[currentQuestion.id] || ""}
        onAnswer={handleAnswer}
      />

      <QuestionNavigation
        isFirstStep={step === 0}
        isLastStep={isLastQuestion}
        isAnswered={isAnswered}
        isLoading={isLoading}
        onPrevious={handlePrevious}
        onNext={handleNext}
      />
    </motion.div>
  );
};

export default OnboardingQuestions;
