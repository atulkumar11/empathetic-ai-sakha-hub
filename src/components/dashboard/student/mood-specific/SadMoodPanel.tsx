
import React from "react";
import { HeartPulse, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const SadMoodPanel: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="p-4 bg-gradient-to-r from-indigo-100 to-blue-100 dark:from-indigo-900/30 dark:to-blue-900/30 rounded-lg border border-indigo-200 dark:border-indigo-800"
    >
      <div className="flex items-center mb-4">
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          <HeartPulse className="h-5 w-5 text-indigo-500 mr-2" />
        </motion.div>
        <motion.h3 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="font-semibold text-indigo-700 dark:text-indigo-300"
        >
          Mood Uplift
        </motion.h3>
      </div>
      <div className="space-y-4">
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white/90 dark:bg-gray-800/90 p-3 rounded shadow-sm"
        >
          <p className="text-sm">Everyone has down moments. Try starting with a small task to build momentum and boost your mood.</p>
        </motion.div>
        <motion.div 
          className="flex space-x-2"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex-1"
          >
            <Button variant="outline" size="sm" className="w-full bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-900/40 dark:hover:bg-indigo-900/60">
              <Sparkles className="h-4 w-4 mr-2 text-amber-500" />
              Mood Boosters
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SadMoodPanel;
