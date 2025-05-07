
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Target, ArrowLeft } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { StudyPlan } from '@/types/user/studyPlan';
import StudyPlanOverview from './study-plan-detail/StudyPlanOverview';
import SubjectsList from './study-plan-detail/SubjectsList';
import WeeklySchedule from './study-plan-detail/WeeklySchedule';

interface StudyPlanDetailProps {
  plan: StudyPlan;
  isOpen: boolean;
  onClose: () => void;
}

const StudyPlanDetail: React.FC<StudyPlanDetailProps> = ({
  plan,
  isOpen,
  onClose
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-3xl max-h-[85vh] overflow-auto bg-white dark:bg-gray-900 shadow-2xl border border-gray-200 dark:border-gray-800">
        <DialogHeader className="space-y-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
              onClick={onClose}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </div>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Target className="h-6 w-6 text-indigo-600" />
            Study Plan for {plan.examGoal}
          </DialogTitle>
        </DialogHeader>

        <div className="py-4">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="subjects">Subjects</TabsTrigger>
              <TabsTrigger value="schedule">Schedule</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <StudyPlanOverview plan={plan} />
            </TabsContent>

            <TabsContent value="subjects">
              <SubjectsList subjects={plan.subjects} />
            </TabsContent>

            <TabsContent value="schedule">
              <WeeklySchedule plan={plan} />
            </TabsContent>
          </Tabs>
        </div>

        <DialogFooter className="border-t pt-4">
          <Button variant="outline" onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default StudyPlanDetail;
