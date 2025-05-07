
import React from "react";
import { Button } from "@/components/ui/button";

export interface HeroButtonsProps {
  scrollToFeatures: () => void;
  scrollToForWhom: () => void;
  openExamAnalyzer: () => void;
}

const HeroButtons: React.FC<HeroButtonsProps> = ({
  scrollToFeatures,
  scrollToForWhom,
  openExamAnalyzer
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in animation-delay-300">
      <Button 
        onClick={openExamAnalyzer}
        size="lg" 
        className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white"
      >
        Test Your Exam Readiness
      </Button>
      <Button 
        onClick={scrollToFeatures}
        size="lg" 
        variant="outline" 
        className="border-indigo-300 text-indigo-600 hover:bg-indigo-50"
      >
        Explore Features
      </Button>
    </div>
  );
};

export default HeroButtons;
