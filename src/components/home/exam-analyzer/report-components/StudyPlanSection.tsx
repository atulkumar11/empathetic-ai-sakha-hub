
import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, BookOpen, ArrowRight, UserPlus, FileText, CheckCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Separator } from '@/components/ui/separator';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';

interface Recommendation {
  topic: string;
  recommendation: string;
  priority: 'high' | 'medium' | 'low';
}

interface StudyPlanSectionProps {
  recommendations?: Recommendation[] | string[];
  onStartOver: () => void;
  examType?: string;
}

const StudyPlanSection: React.FC<StudyPlanSectionProps> = ({ 
  recommendations = [], 
  onStartOver = () => {},
  examType 
}) => {
  // Function to render a recommendation (handling both string and object types)
  const renderRecommendation = (rec: string | Recommendation, index: number) => {
    const text = typeof rec === 'string' ? rec : rec.recommendation;
    
    return (
      <motion.li 
        key={index} 
        className="flex items-start"
        initial={{ opacity: 0, x: -5 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 * index, duration: 0.3 }}
      >
        <CheckCircle className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
        <span className="text-sm">{text}</span>
      </motion.li>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.4 }}
      className="bg-white dark:bg-gray-800 rounded-xl border-2 border-blue-100 dark:border-blue-800/50 p-6 shadow-lg"
    >
      <h4 className="flex items-center text-blue-700 dark:text-blue-400 font-medium mb-4">
        <div className="p-2 mr-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
          <BarChart3 className="h-4 w-4 text-blue-600 dark:text-blue-400" />
        </div>
        {examType ? `${examType} Personalized Study Plan` : 'Personalized Study Plan'}
      </h4>
      
      <div className="bg-blue-50/50 dark:bg-blue-900/20 rounded-lg p-4 mb-5">
        <p className="text-sm">Based on your performance, we recommend focusing on these key areas:</p>
      </div>
      
      <ul className="space-y-3 mb-6">
        {recommendations.length > 0 
          ? recommendations.slice(0, 5).map((rec, i) => renderRecommendation(rec, i))
          : ['Study more consistently', 'Focus on weak areas', 'Practice with mock exams', 'Review core concepts', 'Use flashcards for quick revision']
              .map((rec, i) => renderRecommendation(rec, i))
        }
      </ul>

      <Card className="mt-6 p-6 bg-gradient-to-br from-violet-500/10 to-blue-500/10 dark:from-violet-900/20 dark:to-blue-900/20 rounded-xl border border-violet-100 dark:border-violet-800/50 shadow-lg">
        <div className="flex flex-col items-center text-center">
          <div className="bg-white dark:bg-gray-800 p-3 rounded-full shadow-md mb-4">
            <UserPlus className="h-6 w-6 text-violet-600 dark:text-violet-400" />
          </div>
          <h4 className="text-lg font-semibold text-violet-700 dark:text-violet-400">
            Get Your Complete Study Plan
          </h4>
          <p className="text-sm text-violet-600/90 dark:text-violet-300/90 mt-2 mb-5 max-w-md mx-auto">
            Sign up now to receive a detailed study plan customized for your strengths and areas of improvement, with day-by-day guidance.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 w-full gap-4">
            <Button 
              onClick={onStartOver}
              className="bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600 text-white shadow-md hover:shadow-lg transition-all py-6 h-auto"
            >
              <BookOpen className="mr-2 h-4 w-4" />
              Take Another Test
            </Button>
            
            <Button 
              asChild
              className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white shadow-md hover:shadow-lg transition-all py-6 h-auto"
            >
              <Link to="/signup">
                <UserPlus className="mr-2 h-4 w-4" />
                Sign Up Free
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default StudyPlanSection;
