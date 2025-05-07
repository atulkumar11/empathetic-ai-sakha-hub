
import React from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface StudyPlanModalProps {
  onClose: () => void;
}

const StudyPlanModal: React.FC<StudyPlanModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-lg bg-white dark:bg-gray-800 shadow-xl border border-gray-200 dark:border-gray-700">
        <div className="sticky top-0 z-10 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold">Your Academic Advisor</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="p-6">
          <div className="mb-6 rounded-lg bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/40 dark:to-blue-900/40 p-6 border border-purple-100 dark:border-purple-800/30 shadow-md">
            <h3 className="mb-4 text-xl font-semibold text-purple-800 dark:text-purple-300">Your New Study Plan</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Based on your recent performance, we've optimized your study schedule to focus on the areas where you need the most improvement.
            </p>
            <div className="space-y-4">
              <div className="rounded-md bg-white dark:bg-gray-800/90 p-4 border border-gray-200 dark:border-gray-700">
                <h4 className="font-medium mb-2">Today's Priority</h4>
                <p className="text-gray-700 dark:text-gray-300">Physics: Thermodynamics - Chapter 3</p>
                <div className="mt-2 h-2 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: '35%' }}></div>
                </div>
              </div>
              
              <div className="rounded-md bg-white dark:bg-gray-800/90 p-4 border border-gray-200 dark:border-gray-700">
                <h4 className="font-medium mb-2">Upcoming Review</h4>
                <p className="text-gray-700 dark:text-gray-300">Chemistry: Organic Chemistry - Practice Test</p>
                <div className="mt-2 h-2 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: '70%' }}></div>
                </div>
              </div>
              
              <div className="rounded-md bg-white dark:bg-gray-800/90 p-4 border border-gray-200 dark:border-gray-700">
                <h4 className="font-medium mb-2">In Need of Attention</h4>
                <p className="text-gray-700 dark:text-gray-300">Mathematics: Integration - Practice Problems</p>
                <div className="mt-2 h-2 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-red-500 rounded-full" style={{ width: '20%' }}></div>
                </div>
              </div>
            </div>
            <Button className="w-full mt-4 bg-purple-600 hover:bg-purple-700">Apply This Plan</Button>
          </div>
          
          <div className="mb-6 rounded-lg bg-white dark:bg-gray-800 shadow border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="mb-4 text-xl font-semibold">Weekly Progress Analysis</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-2">Study Time</h4>
                <p className="text-2xl font-bold text-green-600">↑ 12% increase</p>
                <p className="text-gray-500 dark:text-gray-400">16 hours this week</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Problem Solving</h4>
                <p className="text-2xl font-bold text-amber-600">↔ Steady</p>
                <p className="text-gray-500 dark:text-gray-400">120 problems this week</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Question Quality</h4>
                <p className="text-2xl font-bold text-green-600">↑ 20% increase</p>
                <p className="text-gray-500 dark:text-gray-400">From basic to advanced</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Test Scores</h4>
                <p className="text-2xl font-bold text-green-600">↑ 8% increase</p>
                <p className="text-gray-500 dark:text-gray-400">Average score: 76%</p>
              </div>
            </div>
          </div>
          
          <div className="rounded-lg bg-white dark:bg-gray-800 shadow border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="mb-4 text-xl font-semibold">Recommended Resources</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700/50 border border-gray-100 dark:border-gray-700">
                <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-blue-600 dark:text-blue-400">
                    <path d="M19 16V3H5V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M3 19H21V21H3V19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 3V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <p className="font-medium">Chapter 5: Thermodynamics Advanced Reading</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">PDF • 15 pages • 5 min read</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700/50 border border-gray-100 dark:border-gray-700">
                <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-purple-600 dark:text-purple-400">
                    <path d="M12 2L14.5 9H22L16 13.5L18 21L12 16.5L6 21L8 13.5L2 9H9.5L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <p className="font-medium">Practice Quiz: Integration Techniques</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">10 questions • 15 min • Medium difficulty</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700/50 border border-gray-100 dark:border-gray-700">
                <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-green-600 dark:text-green-400">
                    <path d="M22 9L12 2L2 9V15L12 22L22 15V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 22L12 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M22 9L12 15L2 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 2V9L17 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <p className="font-medium">Video Lecture: Organic Chemistry Fundamentals</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Video • 22 min • Prof. Agarwal</p>
                </div>
              </div>
            </div>
            <Button variant="outline" className="w-full mt-4">View All Resources</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyPlanModal;
