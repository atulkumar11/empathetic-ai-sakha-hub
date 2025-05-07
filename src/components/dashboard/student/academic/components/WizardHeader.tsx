
import React from 'react';
import { GraduationCap, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

const WizardHeader: React.FC<{ examGoal?: string }> = ({ examGoal }) => {
  return (
    <motion.div 
      className="bg-gradient-to-br from-indigo-600 to-violet-700 text-white p-6 rounded-t-lg"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center gap-3">
        <div className="p-2 bg-white/20 rounded-lg">
          {examGoal ? <BookOpen size={24} className="text-white" /> : <GraduationCap size={24} className="text-white" />}
        </div>
        <div>
          <h2 className="text-xl font-bold">Create Study Plan</h2>
          <p className="text-indigo-100 text-sm">
            {examGoal 
              ? `Customize your ${examGoal} preparation journey` 
              : "Design your personalized learning journey"}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default WizardHeader;
