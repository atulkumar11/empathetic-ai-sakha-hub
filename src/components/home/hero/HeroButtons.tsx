
import React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, SparklesIcon } from "lucide-react";

export interface HeroButtonsProps {
  scrollToFeatures?: () => void;
  scrollToForWhom?: () => void;
  onAnalyzeClick: () => void;
}

const HeroButtons: React.FC<HeroButtonsProps> = ({
  scrollToFeatures,
  scrollToForWhom,
  onAnalyzeClick
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <Button 
        onClick={onAnalyzeClick}
        size="lg" 
        className="relative overflow-hidden group"
      >
        <span className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 transition-all duration-300 group-hover:scale-105"></span>
        <span className="relative flex items-center justify-center gap-2">
          <SparklesIcon size={18} className="text-white" />
          <span>Test Your Exam Readiness</span>
        </span>
      </Button>
      
      <Button 
        onClick={scrollToFeatures}
        size="lg" 
        variant="outline" 
        className="border-indigo-300 text-indigo-600 hover:bg-indigo-50 flex items-center gap-2 transition-colors duration-300"
      >
        Explore Features
        <motion.div
          animate={{ x: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ArrowRight size={18} />
        </motion.div>
      </Button>
    </div>
  );
};

export default HeroButtons;
