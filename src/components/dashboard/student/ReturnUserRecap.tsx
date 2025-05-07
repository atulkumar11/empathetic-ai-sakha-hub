
import React from 'react';
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { CheckCircle, Clock, Calendar, ArrowRight, History, ListChecks, BookOpen, Award } from "lucide-react";

interface CompletedTask {
  id: string;
  title: string;
  date: string;
  type: string;
}

interface ReturnUserRecapProps {
  userName: string;
  lastLoginDate?: string;
  completedTasks?: CompletedTask[];
  suggestedNextTasks?: string[];
  onClose: () => void;
  loginCount?: number;
}

const ReturnUserRecap: React.FC<ReturnUserRecapProps> = ({
  userName,
  lastLoginDate = "yesterday",
  completedTasks = [],
  suggestedNextTasks = [],
  onClose,
  loginCount = 0
}) => {
  // Default tasks if none provided
  const defaultCompletedTasks: CompletedTask[] = [
    { id: '1', title: 'Completed Physics Quiz', date: '2 days ago', type: 'quiz' },
    { id: '2', title: 'Reviewed Algebra Notes', date: '2 days ago', type: 'notes' },
  ];
  
  // Default next actions if none provided
  const defaultNextTasks = [
    'Complete the Chemistry practice test',
    'Review your flashcards on Organic Chemistry',
    'Check out the new study materials for Mathematics'
  ];
  
  // Use provided data or defaults
  const displayedTasks = completedTasks.length > 0 ? completedTasks : defaultCompletedTasks;
  const displayedNextTasks = suggestedNextTasks.length > 0 ? suggestedNextTasks : defaultNextTasks;
  
  // Determine greeting based on login count
  const getGreeting = () => {
    if (loginCount <= 5) return "Welcome back!";
    if (loginCount <= 15) return "Great to see you again!";
    return "Welcome back, dedicated learner!";
  };
  
  // Calculate streak based on loginCount (just a placeholder logic)
  const streak = Math.min(loginCount, 30);
  const streakLevel = streak < 5 ? 'Beginning' : streak < 10 ? 'Building' : streak < 20 ? 'Consistent' : 'Excellent';

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative z-20 mb-8 bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-xl border border-indigo-100 shadow-lg dark:from-indigo-900/30 dark:to-purple-900/30 dark:border-indigo-700/30"
    >
      <div className="flex items-start mb-4">
        <div className="mr-4">
          <motion.div 
            initial={{ scale: 0.8 }}
            animate={{ scale: 1.1 }}
            transition={{ duration: 1, yoyo: Infinity }}
            className="p-2 bg-indigo-100 rounded-full dark:bg-indigo-900/50"
          >
            <History className="text-indigo-600 dark:text-indigo-400" size={24} />
          </motion.div>
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-semibold gradient-text">
            {getGreeting()} <span className="font-bold">{userName.split(' ')[0]}</span>
          </h3>
          
          <div className="mt-3 flex items-center text-sm text-gray-600 dark:text-gray-300">
            <Clock className="mr-1" size={16} />
            <span>Last login: {lastLoginDate}</span>
          </div>
          
          {/* Study streak progress */}
          <div className="mt-4 p-3 bg-white/70 rounded-lg dark:bg-gray-800/50">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Award className="text-amber-500" size={18} />
                <h4 className="font-medium text-gray-700 dark:text-gray-200">Your Study Streak</h4>
              </div>
              <span className="text-sm font-bold text-amber-600 dark:text-amber-400">{streak} days</span>
            </div>
            
            <div className="mt-2 w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
              <div 
                className="bg-gradient-to-r from-amber-400 to-amber-600 h-2.5 rounded-full" 
                style={{ width: `${Math.min(streak * 3, 100)}%` }}
              ></div>
            </div>
            
            <p className="text-xs text-gray-500 mt-1 dark:text-gray-400">
              {streakLevel} streak level • Keep going!
            </p>
          </div>
          
          {/* Recently completed tasks */}
          <div className="mt-5">
            <h4 className="font-medium flex items-center text-gray-700 dark:text-gray-200 mb-2">
              <CheckCircle className="mr-2 text-green-500" size={18} />
              Recently completed
            </h4>
            <div className="space-y-2 ml-6 mt-3">
              {displayedTasks.map(task => (
                <div key={task.id} className="flex items-start">
                  <div className="h-2 w-2 mt-2 rounded-full bg-indigo-400 mr-2"></div>
                  <div>
                    <p className="text-gray-800 dark:text-gray-200 text-sm">{task.title}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center mt-0.5">
                      <Calendar size={12} className="mr-1" /> {task.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Suggested next tasks */}
          <div className="mt-5">
            <h4 className="font-medium flex items-center text-gray-700 dark:text-gray-200 mb-2">
              <ListChecks className="mr-2 text-blue-500" size={18} />
              Suggested next steps
            </h4>
            <div className="space-y-2 ml-6 mt-3">
              {displayedNextTasks.map((task, index) => (
                <div key={index} className="flex items-start">
                  <div className="h-2 w-2 mt-2 rounded-full bg-purple-400 mr-2"></div>
                  <p className="text-gray-800 dark:text-gray-200 text-sm">{task}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Study streak if available */}
          <div className="mt-5 flex items-center gap-3">
            <div className="p-1 bg-amber-100 rounded-full dark:bg-amber-900/50">
              <BookOpen className="text-amber-600 dark:text-amber-400" size={16} />
            </div>
            <span className="text-sm text-gray-700 font-medium dark:text-gray-300">Continue your learning journey!</span>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end mt-4">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button 
            onClick={onClose} 
            className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white flex items-center gap-2"
          >
            Continue Learning
            <ArrowRight size={16} />
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ReturnUserRecap;
