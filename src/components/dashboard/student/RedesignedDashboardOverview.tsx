
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStudentDashboardData } from '@/hooks/useStudentDashboardData';
import { UserProfileBase } from '@/types/user/base';
import { KpiData } from '@/hooks/useKpiTracking';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, CalendarDays, GraduationCap, BookOpen,
  Brain, FileText, Bell, TrendingUp
} from 'lucide-react';

import StudyStatsSection from './dashboard-sections/StudyStatsSection';
import SubjectBreakdownSection from './dashboard-sections/SubjectBreakdownSection';
import TodaysPlanSection from './dashboard-sections/TodaysPlanSection';
import ProgressTrackerSection from './dashboard-sections/ProgressTrackerSection';
import MoodBasedSuggestions from './dashboard-sections/MoodBasedSuggestions';
import SmartSuggestionsCenter from './dashboard-sections/SmartSuggestionsCenter';
import ExamReadinessScore from './dashboard-sections/ExamReadinessScore';
import { MoodType } from '@/types/user/base';

// Import SharedNavigation for the navigation bar
import SharedNavigation from './SharedNavigation';

interface RedesignedDashboardOverviewProps {
  userProfile: UserProfileBase;
  kpis: KpiData[];
}

export default function RedesignedDashboardOverview({ userProfile, kpis }: RedesignedDashboardOverviewProps) {
  const { loading, dashboardData, refreshData } = useStudentDashboardData();
  const [currentMood, setCurrentMood] = useState<MoodType>();
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    }
  };

  const handleMoodSelect = (mood: MoodType) => {
    setCurrentMood(mood);
    const userData = localStorage.getItem("userData");
    if (userData) {
      const parsedData = JSON.parse(userData);
      parsedData.mood = mood;
      localStorage.setItem("userData", JSON.stringify(parsedData));
    } else {
      localStorage.setItem("userData", JSON.stringify({ mood }));
    }
  };

  if (loading || !dashboardData) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-12 w-3/4" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Add SharedNavigation at the top */}
      <motion.div variants={itemVariants}>
        <SharedNavigation />
      </motion.div>

      <motion.div variants={itemVariants}>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold">Study Dashboard</h2>
            <div className="flex items-center mt-1">
              <span className="text-sm text-muted-foreground mr-2">Exam Goal:</span>
              <span className="bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-300 px-2 py-0.5 rounded-full text-sm">
                {dashboardData.examGoal}
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div 
        variants={itemVariants}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        <MoodBasedSuggestions currentMood={currentMood} onMoodSelect={handleMoodSelect} />
        <SmartSuggestionsCenter 
          performance={{
            accuracy: 85,
            quizScores: 90,
            conceptProgress: 75,
            streak: 7
          }}
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <StudyStatsSection subjects={dashboardData.subjects} conceptCards={dashboardData.conceptCards} />
      </motion.div>

      {/* Exam Readiness Score - added below the KPI section */}
      <motion.div 
        variants={itemVariants}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        <ExamReadinessScore 
          overallScore={72} 
          targetExam={dashboardData.examGoal} 
          daysUntilExam={85}
        />
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <Brain className="h-5 w-5 text-violet-600 mr-2" />
              <h3 className="text-lg font-medium">Your Learning Status</h3>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                  <div className="text-sm text-muted-foreground">Concepts Mastered</div>
                  <div className="text-2xl font-bold">45/60</div>
                  <div className="text-xs text-blue-600 dark:text-blue-400">75% completed</div>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                  <div className="text-sm text-muted-foreground">Flashcards Reviewed</div>
                  <div className="text-2xl font-bold">120/150</div>
                  <div className="text-xs text-green-600 dark:text-green-400">80% completed</div>
                </div>
              </div>
              
              <div className="p-4 bg-violet-50 dark:bg-violet-900/20 rounded-lg border border-violet-200 dark:border-violet-800/50">
                <h4 className="font-medium text-violet-800 dark:text-violet-300 mb-2">Weekly Progress</h4>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Study Hours</span>
                    <span className="font-medium">12.5 hrs</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Practice Tests</span>
                    <span className="font-medium">8 completed</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Avg. Score</span>
                    <span className="font-medium">82%</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div variants={itemVariants}>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <Brain className="h-5 w-5 text-violet-600 mr-2" />
                <h3 className="text-lg font-medium">AI Personalized Study Plan</h3>
              </div>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Based on your profile and learning goals, we've created a personalized study plan to help you succeed.
                </p>
                
                <div className="p-4 bg-violet-50 dark:bg-violet-900/20 rounded-lg border border-violet-200 dark:border-violet-800/50">
                  <h4 className="font-medium text-violet-800 dark:text-violet-300 mb-2">Your Learning Profile</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <span className="w-4 h-4 bg-violet-200 rounded-full flex items-center justify-center text-xs mr-2">•</span>
                      <span>Learning Style: <strong>Visual-Kinesthetic</strong></span>
                    </li>
                    <li className="flex items-center">
                      <span className="w-4 h-4 bg-violet-200 rounded-full flex items-center justify-center text-xs mr-2">•</span>
                      <span>Best Study Time: <strong>Morning to Afternoon</strong></span>
                    </li>
                    <li className="flex items-center">
                      <span className="w-4 h-4 bg-violet-200 rounded-full flex items-center justify-center text-xs mr-2">•</span>
                      <span>Focus Duration: <strong>30-45 minute sessions</strong></span>
                    </li>
                    <li className="flex items-center">
                      <span className="w-4 h-4 bg-violet-200 rounded-full flex items-center justify-center text-xs mr-2">•</span>
                      <span>Recommended Break: <strong>10 minute breaks</strong></span>
                    </li>
                  </ul>
                </div>
                
                <Button 
                  className="w-full bg-gradient-to-r from-violet-600 to-indigo-600" 
                  onClick={() => navigate('/dashboard/student/study-plan')}
                >
                  View Complete Study Strategy
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <TodaysPlanSection studyPlan={dashboardData.studyPlan} currentMood={currentMood} />
        </motion.div>
      </div>

      <motion.div variants={itemVariants}>
        <SubjectBreakdownSection subjects={dashboardData.subjects} />
      </motion.div>

      <motion.div variants={itemVariants}>
        <ProgressTrackerSection progressTracker={dashboardData.progressTracker} />
      </motion.div>

      {/* We'll remove the revisionItems and milestones rendering since they're causing errors */}
    </motion.div>
  );
}
