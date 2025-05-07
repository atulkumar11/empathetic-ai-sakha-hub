
import React from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import { CustomProgress } from '@/components/ui/custom-progress';

const StressTestLoading: React.FC = () => {
  return (
    <motion.div 
      className="space-y-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="h-40 bg-gradient-to-br from-blue-50 to-violet-50 dark:from-blue-900/20 dark:to-violet-900/20 rounded-xl flex items-center justify-center border-2 border-blue-100 dark:border-blue-800/50 shadow-md">
        <div className="text-center">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <Clock className="mx-auto mb-2 text-blue-500" size={40} />
          </motion.div>
          <p className="text-sm font-medium bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">Analyzing cognitive patterns...</p>
        </div>
      </div>
      <CustomProgress value={20} className="h-2" indicatorClassName="bg-gradient-to-r from-blue-400 to-violet-600" />
      <p className="text-xs text-center text-muted-foreground">Please wait while we calculate your cognitive stress score</p>
    </motion.div>
  );
};

export default StressTestLoading;
