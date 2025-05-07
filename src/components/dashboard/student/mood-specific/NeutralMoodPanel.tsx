
import React from "react";
import { BookOpen } from "lucide-react";
import { motion } from "framer-motion";

const NeutralMoodPanel: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="p-4 bg-gradient-to-r from-gray-100 to-slate-100 dark:from-gray-900/30 dark:to-slate-900/30 rounded-lg border border-gray-200 dark:border-gray-800"
    >
      <div className="flex items-center mb-4">
        <motion.div
          animate={{ 
            rotate: [-5, 5],
            y: [0, -2, 0]
          }}
          transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
        >
          <BookOpen className="h-5 w-5 text-gray-500 mr-2" />
        </motion.div>
        <motion.h3 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="font-semibold text-gray-700 dark:text-gray-300"
        >
          Small Steps Count
        </motion.h3>
      </div>
      <div className="space-y-4">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <label className="text-sm font-medium">Pick 1 small task to complete today</label>
          <motion.select 
            whileFocus={{ scale: 1.01 }}
            className="w-full mt-1 p-2 border rounded-md text-sm bg-white/80 dark:bg-gray-800/80"
          >
            <option>Review chapter 3 notes</option>
            <option>Watch one concept explanation video</option>
            <option>Try 5 practice problems</option>
          </motion.select>
        </motion.div>
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <label className="text-sm font-medium">What's one nice thing that happened recently?</label>
          <motion.input 
            whileFocus={{ scale: 1.01 }}
            className="w-full mt-1 p-2 border rounded-md text-sm bg-white/80 dark:bg-gray-800/80"
            placeholder="I'm grateful for..."
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default NeutralMoodPanel;
