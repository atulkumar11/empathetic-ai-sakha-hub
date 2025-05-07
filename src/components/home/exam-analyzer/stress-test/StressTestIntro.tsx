
import React from 'react';
import { Button } from "@/components/ui/button";
import { Zap, PlayCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface StressTestIntroProps {
  onStart: () => void;
}

const StressTestIntro: React.FC<StressTestIntroProps> = ({ onStart }) => {
  const handleStartTest = () => {
    try {
      console.log("Starting cognitive stress test");
      onStart();
    } catch (error) {
      console.error("Error starting cognitive stress test:", error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-blue-50 to-violet-50 dark:from-blue-900/20 dark:to-violet-900/20 p-5 rounded-xl border-2 border-blue-100 dark:border-blue-800/50 shadow-md">
        <h4 className="font-medium mb-3 flex items-center text-blue-700 dark:text-blue-400">
          <Zap className="mr-2 text-blue-500" size={18} />
          Scientific Assessment Components:
        </h4>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          <li className="flex items-start">
            <div className="h-5 w-5 rounded-full bg-gradient-to-r from-blue-400 to-violet-500 flex items-center justify-center text-xs text-white mr-2 mt-0.5">1</div>
            <div>
              <span className="font-medium text-blue-700 dark:text-blue-300">Reaction Time:</span>
              <p className="text-xs text-blue-600/70 dark:text-blue-400/70">How quickly you can process and respond</p>
            </div>
          </li>
          <li className="flex items-start">
            <div className="h-5 w-5 rounded-full bg-gradient-to-r from-blue-400 to-violet-500 flex items-center justify-center text-xs text-white mr-2 mt-0.5">2</div>
            <div>
              <span className="font-medium text-blue-700 dark:text-blue-300">Focus under Pressure:</span>
              <p className="text-xs text-blue-600/70 dark:text-blue-400/70">Maintaining accuracy with time constraints</p>
            </div>
          </li>
          <li className="flex items-start">
            <div className="h-5 w-5 rounded-full bg-gradient-to-r from-blue-400 to-violet-500 flex items-center justify-center text-xs text-white mr-2 mt-0.5">3</div>
            <div>
              <span className="font-medium text-blue-700 dark:text-blue-300">Pattern Recognition:</span>
              <p className="text-xs text-blue-600/70 dark:text-blue-400/70">Identifying visual and logical patterns</p>
            </div>
          </li>
          <li className="flex items-start">
            <div className="h-5 w-5 rounded-full bg-gradient-to-r from-blue-400 to-violet-500 flex items-center justify-center text-xs text-white mr-2 mt-0.5">4</div>
            <div>
              <span className="font-medium text-blue-700 dark:text-blue-300">Cognitive Flexibility:</span>
              <p className="text-xs text-blue-600/70 dark:text-blue-400/70">Adapting to increasing complexity</p>
            </div>
          </li>
        </ul>
      </div>
      
      <Button 
        className="w-full bg-gradient-to-r from-violet-500 to-blue-500 hover:from-violet-600 hover:to-blue-600 transition-all duration-300 shadow-md hover:shadow-lg p-6 h-auto text-lg"
        onClick={handleStartTest}
      >
        <motion.div 
          className="flex items-center"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <PlayCircle className="mr-2" size={20} />
          Begin Cognitive Stress Test
        </motion.div>
      </Button>
    </div>
  );
};

export default StressTestIntro;
