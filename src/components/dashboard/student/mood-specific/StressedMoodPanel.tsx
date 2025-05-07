
import React from "react";
import { HeartPulse } from "lucide-react";
import { motion } from "framer-motion";

const StressedMoodPanel: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="p-4 bg-gradient-to-r from-lavender-100 to-blue-100 dark:from-lavender-900/30 dark:to-blue-900/30 rounded-lg border border-lavender-200 dark:border-lavender-800"
    >
      <div className="flex items-center mb-4">
        <motion.div
          animate={{ 
            scale: [1, 1.3, 1],
          }}
          transition={{ 
            duration: 0.8, 
            repeat: Infinity, 
            repeatType: "reverse" 
          }}
        >
          <HeartPulse className="h-5 w-5 text-lavender-500 mr-2" />
        </motion.div>
        <motion.h3 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="font-semibold text-lavender-700 dark:text-lavender-300"
        >
          Let's Take a Moment
        </motion.h3>
      </div>
      <div className="space-y-4">
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white/90 dark:bg-gray-800/90 p-3 rounded shadow-sm"
        >
          <p className="text-sm font-medium mb-2">4-7-8 Breathing:</p>
          <p className="text-xs">Breathe in for 4 seconds, hold for 7, exhale for 8</p>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2 overflow-hidden">
            <motion.div 
              initial={{ width: "10%" }}
              animate={{ 
                width: ["10%", "100%", "10%"],
              }}
              transition={{ 
                duration: 19, 
                repeat: Infinity,
                times: [0, 0.579, 1], // 4+7+8 = 19 seconds total, 11/19 ≈ 0.579 is when exhale starts
                ease: "linear" 
              }}
              className="bg-blue-600 h-2.5 rounded-full"
            />
          </div>
        </motion.div>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <label className="text-sm font-medium">Write what's bothering you (private journal)</label>
          <motion.textarea 
            whileFocus={{ scale: 1.01 }}
            className="w-full mt-1 p-2 border rounded-md text-sm bg-white/80 dark:bg-gray-800/80"
            placeholder="I feel stressed because..."
            rows={3}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default StressedMoodPanel;
