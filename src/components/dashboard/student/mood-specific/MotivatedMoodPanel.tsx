
import React from "react";
import { Flame } from "lucide-react";
import { motion } from "framer-motion";

const MotivatedMoodPanel: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="p-4 bg-gradient-to-r from-orange-100 to-amber-100 dark:from-orange-900/30 dark:to-amber-900/30 rounded-lg border border-orange-200 dark:border-orange-800"
    >
      <div className="flex items-center mb-4">
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity, 
            repeatType: "loop" 
          }}
        >
          <Flame className="h-5 w-5 text-orange-500 mr-2" />
        </motion.div>
        <motion.h3 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="font-semibold text-orange-700 dark:text-orange-300"
        >
          Power Mode Activated!
        </motion.h3>
      </div>
      <div className="space-y-4">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <label className="text-sm font-medium">What's your mini goal today?</label>
          <motion.input 
            whileFocus={{ scale: 1.01 }}
            className="w-full mt-1 p-2 border rounded-md text-sm bg-white/80 dark:bg-gray-800/80"
            placeholder="I want to complete..."
          />
        </motion.div>
        <motion.div 
          className="animate-pulse"
          whileHover={{ scale: 1.05 }}
        >
          <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-orange-200 text-orange-800 dark:bg-orange-800/50 dark:text-orange-200">
            <Flame className="h-3 w-3 mr-1" /> Power Mode Activated
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default MotivatedMoodPanel;
