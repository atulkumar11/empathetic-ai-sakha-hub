
import React from "react";
import { Target } from "lucide-react";
import { motion } from "framer-motion";

const FocusedMoodPanel: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="p-4 bg-gradient-to-r from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 rounded-lg border border-emerald-200 dark:border-emerald-800"
    >
      <div className="flex items-center mb-4">
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 360],
          }}
          transition={{ 
            scale: { duration: 2, repeat: Infinity },
            rotate: { duration: 3, repeat: Infinity, ease: "linear" }
          }}
        >
          <Target className="h-5 w-5 text-emerald-500 mr-2" />
        </motion.div>
        <motion.h3 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="font-semibold text-emerald-700 dark:text-emerald-300"
        >
          Deep Focus Mode
        </motion.h3>
      </div>
      <div className="space-y-4">
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white/90 dark:bg-gray-800/90 p-3 rounded shadow-sm"
        >
          <p className="text-sm">Current focus streak: 25 minutes</p>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2 overflow-hidden">
            <motion.div 
              initial={{ width: "0%" }}
              animate={{ width: "75%" }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="bg-emerald-600 h-2.5 rounded-full"
            />
          </div>
        </motion.div>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <label className="text-sm font-medium">I'm currently focusing on:</label>
          <motion.input 
            whileFocus={{ scale: 1.01 }}
            className="w-full mt-1 p-2 border rounded-md text-sm bg-white/80 dark:bg-gray-800/80"
            placeholder="What are you working on?"
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default FocusedMoodPanel;
