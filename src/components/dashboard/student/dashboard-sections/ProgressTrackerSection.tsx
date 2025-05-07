
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from '@/components/ui/progress';
import { ProgressSnapshot, ProgressTracker } from '@/types/student/dashboard';
import { BookOpen, Calendar, Check, FileText, TrendingUp } from 'lucide-react';

interface ProgressTrackerSectionProps {
  progressTracker: ProgressTracker;
}

const ProgressTrackerSection: React.FC<ProgressTrackerSectionProps> = ({ progressTracker }) => {
  const [activeTab, setActiveTab] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  
  const renderProgressSnapshot = (snapshot: ProgressSnapshot, timeframe: string) => {
    const progressItems = [
      { 
        icon: <BookOpen className="h-5 w-5 text-blue-500" />, 
        label: "Concepts Done", 
        value: snapshot.conceptsDone,
        color: "bg-blue-500" 
      },
      { 
        icon: <FileText className="h-5 w-5 text-amber-500" />, 
        label: "Flashcards Done", 
        value: snapshot.flashcardsDone,
        color: "bg-amber-500" 
      },
      { 
        icon: <Check className="h-5 w-5 text-green-500" />, 
        label: "Tests Taken", 
        value: snapshot.testsTaken,
        color: "bg-green-500" 
      },
      { 
        icon: <TrendingUp className="h-5 w-5 text-purple-500" />, 
        label: "Completion %", 
        value: `${snapshot.completionPercentage}%`,
        progress: snapshot.completionPercentage,
        color: "bg-purple-500"
      }
    ];
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
        {progressItems.map((item, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-4 border">
            <div className="flex items-center mb-2">
              <div className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 mr-3">
                {item.icon}
              </div>
              <div>
                <h4 className="text-sm font-medium">{item.label}</h4>
                <p className={`text-xl font-bold ${item.label === 'Completion %' ? 'text-purple-600 dark:text-purple-400' : ''}`}>
                  {item.value}
                </p>
              </div>
            </div>
            {item.progress !== undefined && (
              <Progress value={item.progress} className={`h-2 ${item.color}`} />
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Calendar className="h-5 w-5 mr-2 text-violet-600" />
          Progress Tracker
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={(val) => setActiveTab(val as 'daily' | 'weekly' | 'monthly')}>
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="daily">Daily</TabsTrigger>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
          </TabsList>
          <TabsContent value="daily">
            {renderProgressSnapshot(progressTracker.daily, 'Daily')}
          </TabsContent>
          <TabsContent value="weekly">
            {renderProgressSnapshot(progressTracker.weekly, 'Weekly')}
          </TabsContent>
          <TabsContent value="monthly">
            {renderProgressSnapshot(progressTracker.monthly, 'Monthly')}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ProgressTrackerSection;
