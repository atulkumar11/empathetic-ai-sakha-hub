
import React from "react";
import { Sun, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const HappyMoodPanel: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="p-4 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-lg border border-green-200 dark:border-green-800"
    >
      <div className="flex items-center mb-4">
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 10, 0],
          }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity, 
            repeatType: "reverse" 
          }}
        >
          <Sun className="h-5 w-5 text-yellow-500 mr-2" />
        </motion.div>
        <motion.h3 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="font-semibold text-green-700 dark:text-green-300"
        >
          Today's Joy Booster
        </motion.h3>
      </div>
      <div className="space-y-4">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white/90 dark:bg-gray-800/90 p-3 rounded shadow-sm"
        >
          <p className="text-sm">Happiness boosts learning! Try teaching a concept to someone else - it reinforces your knowledge and spreads joy.</p>
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
            <Button variant="outline" size="sm" className="w-full bg-green-50 hover:bg-green-100 dark:bg-green-900/40 dark:hover:bg-green-900/60">
              <Heart className="h-4 w-4 mr-2 text-pink-500" />
              Share Your Joy
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HappyMoodPanel;
