
import React from "react";
import { ThumbsUp, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const OkayMoodPanel: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="p-4 bg-gradient-to-r from-blue-100 to-sky-100 dark:from-blue-900/30 dark:to-sky-900/30 rounded-lg border border-blue-200 dark:border-blue-800"
    >
      <div className="flex items-center mb-4">
        <motion.div
          animate={{ 
            y: [0, -5, 0],
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity, 
            repeatType: "reverse" 
          }}
        >
          <ThumbsUp className="h-5 w-5 text-blue-500 mr-2" />
        </motion.div>
        <motion.h3 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="font-semibold text-blue-700 dark:text-blue-300"
        >
          Steady Progress
        </motion.h3>
      </div>
      <div className="space-y-4">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white/90 dark:bg-gray-800/90 p-3 rounded shadow-sm"
        >
          <p className="text-sm">You're doing fine! Would you like to try a quick focus exercise to boost your energy for studying?</p>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <Button variant="outline" className="w-full text-sm bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/40 dark:hover:bg-blue-900/60">
            <span>Focus Booster</span>
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default OkayMoodPanel;
