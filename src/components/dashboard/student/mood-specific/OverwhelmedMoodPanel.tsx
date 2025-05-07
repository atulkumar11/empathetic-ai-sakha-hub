
import React from "react";
import { Shield, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const OverwhelmedMoodPanel: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="p-4 bg-gradient-to-r from-purple-100 to-violet-100 dark:from-purple-900/30 dark:to-violet-900/30 rounded-lg border border-purple-200 dark:border-purple-800"
    >
      <div className="flex items-center mb-4">
        <motion.div
          animate={{ 
            opacity: [1, 0.6, 1],
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity, 
            repeatType: "mirror" 
          }}
        >
          <Shield className="h-5 w-5 text-purple-500 mr-2" />
        </motion.div>
        <motion.h3 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="font-semibold text-purple-700 dark:text-purple-300"
        >
          Calm Space
        </motion.h3>
      </div>
      <div className="space-y-4">
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white/90 dark:bg-gray-800/90 p-3 rounded shadow-sm"
        >
          <p className="text-sm">It's okay to feel overwhelmed. Let's break things down into smaller tasks to make them more manageable.</p>
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
            <Button variant="outline" size="sm" className="w-full bg-purple-50 hover:bg-purple-100 dark:bg-purple-900/40 dark:hover:bg-purple-900/60">
              <Clock className="h-4 w-4 mr-2" />
              5-Min Meditation
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default OverwhelmedMoodPanel;
