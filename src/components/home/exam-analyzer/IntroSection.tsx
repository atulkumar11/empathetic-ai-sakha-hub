
import React from 'react';
import { ExamType } from './types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { GraduationCap, BookOpen, Calculator, CheckCircle, ArrowRight } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface IntroSectionProps {
  selectedExam: string;
  setSelectedExam: (exam: string) => void;
  examTypes: ExamType[];
  onStartTest: () => void;
}

const IntroSection: React.FC<IntroSectionProps> = ({ 
  selectedExam, 
  setSelectedExam, 
  examTypes,
  onStartTest 
}) => {
  const isMobile = useIsMobile();
  
  // Default to NEET since it's the only option now
  React.useEffect(() => {
    if (examTypes.length > 0 && !selectedExam) {
      setSelectedExam(examTypes[0].value);
    }
  }, [examTypes, selectedExam, setSelectedExam]);
  
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-violet-500/20 to-blue-500/20 rounded-full mb-3">
            <GraduationCap size={isMobile ? 24 : 30} className="text-violet-600 dark:text-violet-400" />
          </div>
          <h3 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent`}>
            NEET Exam Readiness Analysis
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mt-2 max-w-md mx-auto text-sm sm:text-base">
            Complete two quick assessments to discover your NEET readiness level and get a personalized study plan.
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 shadow-lg rounded-xl p-4 sm:p-6"
      >
        <h4 className="text-base sm:text-lg font-medium mb-3 sm:mb-4">NEET Examination</h4>
        
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
          The National Eligibility cum Entrance Test (NEET) is the qualifying test for MBBS and BDS programs in Indian medical and dental colleges. Our analysis will help you assess your readiness across Physics, Chemistry, and Biology subjects.
        </p>
        
        <Button 
          className="w-full mt-4 bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700"
          onClick={onStartTest}
        >
          Start Analysis <ArrowRight size={16} className="ml-2" />
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-6 sm:mt-8">
          <div className="bg-gradient-to-br from-violet-50 to-violet-100 dark:from-violet-900/20 dark:to-violet-800/20 p-3 sm:p-4 rounded-xl border border-violet-200 dark:border-violet-800/50 shadow-sm">
            <div className="flex items-start mb-2">
              <div className="p-2 bg-violet-100 dark:bg-violet-800/40 rounded-lg mr-2">
                <BookOpen className="text-violet-600 dark:text-violet-400" size={isMobile ? 16 : 20} />
              </div>
              <h5 className="font-medium text-violet-800 dark:text-violet-300 text-sm sm:text-base">Readiness Score</h5>
            </div>
            <p className="text-xs sm:text-sm text-violet-700/80 dark:text-violet-300/80">Evaluates your current preparation level by analyzing your study habits and comfort with the NEET syllabus.</p>
          </div>

          <div className="bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-900/20 dark:to-pink-800/20 p-3 sm:p-4 rounded-xl border border-pink-200 dark:border-pink-800/50 shadow-sm">
            <div className="flex items-start mb-2">
              <div className="p-2 bg-pink-100 dark:bg-pink-800/40 rounded-lg mr-2">
                <Calculator className="text-pink-600 dark:text-pink-400" size={isMobile ? 16 : 20} />
              </div>
              <h5 className="font-medium text-pink-800 dark:text-pink-300 text-sm sm:text-base">Concept Mastery</h5>
            </div>
            <p className="text-xs sm:text-sm text-pink-700/80 dark:text-pink-300/80">Tests your knowledge across Physics, Chemistry, and Biology to identify strengths and areas that need improvement.</p>
          </div>
        </div>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="mt-3 sm:mt-4"
      >
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-800/30 p-3 sm:p-4 rounded-xl border border-gray-200 dark:border-gray-700">
          <h4 className="flex items-center font-medium mb-2 text-sm sm:text-base">
            <CheckCircle size={isMobile ? 16 : 18} className="text-green-500 mr-2" />
            What you'll get:
          </h4>
          <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm pl-5 sm:pl-7 list-disc">
            <li>Personalized NEET readiness score across Physics, Chemistry, and Biology</li>
            <li>Customized study plan based on your results</li>
            <li>Identification of specific topics that need more attention</li>
            <li>Evidence-based recommendations to maximize your NEET preparation</li>
          </ul>
        </div>
      </motion.div>
    </div>
  );
};

export default IntroSection;
