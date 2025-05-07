
import React from "react";
import { Coffee } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const TiredMoodPanel: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="p-4 bg-gradient-to-r from-sky-100 to-indigo-100 dark:from-sky-900/30 dark:to-indigo-900/30 rounded-lg border border-sky-200 dark:border-sky-800"
    >
      <div className="flex items-center mb-4">
        <motion.div
          animate={{ 
            y: [0, -5, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity, 
            repeatType: "mirror" 
          }}
        >
          <Coffee className="h-5 w-5 text-sky-500 mr-2" />
        </motion.div>
        <motion.h3 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="font-semibold text-sky-700 dark:text-sky-300"
        >
          Rest and Recharge
        </motion.h3>
      </div>
      <div className="space-y-4">
        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Button variant="outline" className="w-full text-sm bg-sky-50 hover:bg-sky-100 dark:bg-sky-900/40 dark:hover:bg-sky-900/60">
            2-min Relaxation Break
          </Button>
        </motion.div>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <label className="text-sm font-medium">Light task option (optional)</label>
          <motion.select 
            whileFocus={{ scale: 1.01 }}
            className="w-full mt-1 p-2 border rounded-md text-sm bg-white/80 dark:bg-gray-800/80"
          >
            <option>Browse a light concept refresher</option>
            <option>Review completed flashcards</option>
            <option>Skip for today - that's okay too!</option>
          </motion.select>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default TiredMoodPanel;
