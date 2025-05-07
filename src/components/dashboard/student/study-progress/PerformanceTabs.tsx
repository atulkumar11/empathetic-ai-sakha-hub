
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GradesOverview from './GradesOverview';
import SubjectOverview from './SubjectOverview';

interface PerformanceTabsProps {
  className?: string;
}

const PerformanceTabs: React.FC<PerformanceTabsProps> = ({ className }) => {
  return (
    <Tabs defaultValue="grades" className={className}>
      <TabsList className="grid grid-cols-3 mb-4">
        <TabsTrigger value="grades">Grades</TabsTrigger>
        <TabsTrigger value="subjects">Subjects</TabsTrigger>
        <TabsTrigger value="tests">Test Results</TabsTrigger>
      </TabsList>
      
      <TabsContent value="grades">
        <GradesOverview />
      </TabsContent>
      
      <TabsContent value="subjects">
        <SubjectOverview />
      </TabsContent>
      
      <TabsContent value="tests">
        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 text-center">
          <p className="text-gray-500">Test results visualization coming soon</p>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default PerformanceTabs;
