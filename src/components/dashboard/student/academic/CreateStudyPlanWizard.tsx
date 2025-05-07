
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { ChevronRight, ChevronLeft, Check } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { useStudyPlanWizard } from './hooks/useStudyPlanWizard';
import { useToast } from '@/hooks/use-toast';

interface CreateStudyPlanWizardProps {
  onComplete: (planId: string) => void;
  onCancel: () => void;
}

export const CreateStudyPlanWizard: React.FC<CreateStudyPlanWizardProps> = ({ onComplete, onCancel }) => {
  const { toast } = useToast();
  const {
    studyPlan,
    currentStep,
    handleSubmitStep,
    handleSubmitExamDate,
    createStudyPlan,
    goToPrevStep,
    goToNextStep,
    steps
  } = useStudyPlanWizard();
  
  const [goal, setGoal] = useState(studyPlan.goal || '');
  const [examGoal, setExamGoal] = useState(studyPlan.examGoal || '');
  const [date, setDate] = useState<Date | undefined>(
    typeof studyPlan.examDate === 'string' 
      ? new Date(studyPlan.examDate) 
      : (studyPlan.examDate instanceof Date ? studyPlan.examDate : undefined)
  );
  const [dateStr, setDateStr] = useState(
    typeof studyPlan.examDate === 'string' 
      ? studyPlan.examDate 
      : (studyPlan.examDate instanceof Date ? format(studyPlan.examDate, 'yyyy-MM-dd') : '')
  );
  
  const handleSubmitGoal = () => {
    if (!goal.trim()) {
      toast({
        title: "Goal Required",
        description: "Please enter your study goal",
        variant: "destructive"
      });
      return;
    }
    
    handleSubmitStep({ goal });
  };
  
  const handleSubmitExamGoalStep = () => {
    if (!examGoal.trim()) {
      toast({
        title: "Exam Goal Required",
        description: "Please enter your exam goal",
        variant: "destructive"
      });
      return;
    }
    
    handleSubmitStep({ examGoal });
  };
  
  const handleSubmitExamDateStep = () => {
    if (!date && !dateStr) {
      toast({
        title: "Exam Date Required",
        description: "Please select your exam date",
        variant: "destructive"
      });
      return;
    }
    
    // Use either the date object if it's available, otherwise use the date string
    handleSubmitExamDate(date || dateStr);
  };
  
  const handleDateSelect = (newDate: Date | undefined) => {
    setDate(newDate);
    if (newDate) {
      setDateStr(format(newDate, 'yyyy-MM-dd'));
    }
  };
  
  const handleDateStrChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateStr(e.target.value);
    // Try to parse the string as a date
    const parsedDate = new Date(e.target.value);
    if (!isNaN(parsedDate.getTime())) {
      setDate(parsedDate);
    } else {
      setDate(undefined);
    }
  };
  
  const handleCreatePlan = () => {
    const newPlan = createStudyPlan();
    toast({
      title: "Study Plan Created",
      description: "Your new study plan has been created successfully."
    });
    onComplete(newPlan.id || '');
  };
  
  const renderStep = () => {
    switch (steps[currentStep]) {
      case "goal":
        return (
          <>
            <CardHeader>
              <CardTitle>What is your study goal?</CardTitle>
              <CardDescription>
                Define a clear goal for your study plan to stay motivated and focused.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="goal">Study Goal</Label>
                  <Textarea
                    id="goal"
                    placeholder="E.g., Prepare for JEE Advanced, Master Machine Learning concepts, etc."
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                  />
                </div>
                <div className="flex justify-between mt-4">
                  <Button variant="outline" onClick={onCancel}>Cancel</Button>
                  <Button onClick={handleSubmitGoal}>Continue</Button>
                </div>
              </div>
            </CardContent>
          </>
        );
        
      case "exam-goal":
        return (
          <>
            <CardHeader>
              <CardTitle>What is your target for the exam?</CardTitle>
              <CardDescription>
                Setting a specific target helps tailor your study plan more effectively.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="examGoal">Exam Target</Label>
                  <Textarea
                    id="examGoal"
                    placeholder="E.g., Score in the top 10%, achieve 95+ percentile, etc."
                    value={examGoal}
                    onChange={(e) => setExamGoal(e.target.value)}
                  />
                </div>
                <div className="flex justify-between mt-4">
                  <Button variant="outline" onClick={goToPrevStep}>Back</Button>
                  <Button onClick={handleSubmitExamGoalStep}>Continue</Button>
                </div>
              </div>
            </CardContent>
          </>
        );
        
      case "exam-date":
        return (
          <>
            <CardHeader>
              <CardTitle>When is your exam?</CardTitle>
              <CardDescription>
                Choose the date of your exam to help calculate your study timeline.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="examDate">Exam Date</Label>
                  <div className="flex space-x-2">
                    <Input
                      type="date"
                      id="examDate"
                      value={dateStr}
                      onChange={handleDateStrChange}
                      className="w-full"
                    />
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="px-2">
                          <CalendarIcon className="h-4 w-4" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="end">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={handleDateSelect}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                <div className="flex justify-between mt-4">
                  <Button variant="outline" onClick={goToPrevStep}>Back</Button>
                  <Button onClick={handleSubmitExamDateStep}>Continue</Button>
                </div>
              </div>
            </CardContent>
          </>
        );
      
      // For now, I'm skipping implementation of other steps like subjects, study hours, etc.
      // These would follow a similar pattern
        
      case "review":
        return (
          <>
            <CardHeader>
              <CardTitle>Review Your Study Plan</CardTitle>
              <CardDescription>
                Please review your study plan before finalizing.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="font-medium">Goal</p>
                  <p className="text-sm text-muted-foreground">{studyPlan.goal}</p>
                </div>
                <Separator />
                <div>
                  <p className="font-medium">Exam Goal</p>
                  <p className="text-sm text-muted-foreground">{studyPlan.examGoal}</p>
                </div>
                <Separator />
                <div>
                  <p className="font-medium">Exam Date</p>
                  <p className="text-sm text-muted-foreground">
                    {typeof studyPlan.examDate === 'string' 
                      ? new Date(studyPlan.examDate).toLocaleDateString()
                      : studyPlan.examDate.toLocaleDateString()}
                  </p>
                </div>
                
                <div className="flex justify-between mt-4">
                  <Button variant="outline" onClick={goToPrevStep}>Back</Button>
                  <Button onClick={handleCreatePlan}>Create Plan</Button>
                </div>
              </div>
            </CardContent>
          </>
        );
        
      default:
        return (
          <CardContent>
            <p>Step content not implemented yet.</p>
            <div className="flex justify-between mt-4">
              <Button variant="outline" onClick={goToPrevStep}>Back</Button>
              <Button onClick={goToNextStep}>Continue</Button>
            </div>
          </CardContent>
        );
    }
  };
  
  return (
    <Card className="w-full max-w-2xl mx-auto">
      {renderStep()}
    </Card>
  );
};

// Helper function for calendar icon
const CalendarIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
    <line x1="16" x2="16" y1="2" y2="6" />
    <line x1="8" x2="8" y1="2" y2="6" />
    <line x1="3" x2="21" y1="10" y2="10" />
  </svg>
);
