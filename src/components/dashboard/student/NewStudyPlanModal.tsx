
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface NewStudyPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile: any;
}

const NewStudyPlanModal: React.FC<NewStudyPlanModalProps> = ({ isOpen, onClose, userProfile }) => {
  const { toast } = useToast();
  const [date, setDate] = useState<Date>();
  const [examGoal, setExamGoal] = useState("");
  const [strengths, setStrengths] = useState<string[]>([]);
  const [weakSubjects, setWeakSubjects] = useState<string[]>([]);
  const [studyStyle, setStudyStyle] = useState("");
  const [studyHours, setStudyHours] = useState("4");
  const [preferredTime, setPreferredTime] = useState("morning");
  
  const handleCreatePlan = () => {
    if (!examGoal) {
      toast({
        title: "Missing Information",
        description: "Please select an exam goal",
        variant: "destructive"
      });
      return;
    }
    
    // Here you would normally send this data to your API
    const planData = {
      examGoal,
      strengths,
      weakSubjects,
      studyStyle,
      preferredTime,
      studyHours: parseInt(studyHours),
      examDate: date ? format(date, "PPP") : undefined,
    };
    
    console.log("Creating new study plan with data:", planData);
    
    // Show success message
    toast({
      title: "Study Plan Created",
      description: "Your personalized study plan is ready!",
      variant: "default"
    });
    
    onClose();
  };
  
  const examOptions = [
    { value: "jee", label: "JEE Main & Advanced" },
    { value: "neet", label: "NEET" },
    { value: "upsc", label: "UPSC" },
    { value: "cat", label: "CAT" },
    { value: "gate", label: "GATE" },
    { value: "clat", label: "CLAT" },
    { value: "bank", label: "Banking Exams" },
    { value: "ssc", label: "SSC" }
  ];
  
  const subjectOptions = [
    { value: "physics", label: "Physics" },
    { value: "chemistry", label: "Chemistry" },
    { value: "mathematics", label: "Mathematics" },
    { value: "biology", label: "Biology" },
    { value: "history", label: "History" },
    { value: "geography", label: "Geography" },
    { value: "economics", label: "Economics" },
    { value: "polity", label: "Political Science" },
    { value: "english", label: "English" },
    { value: "general_knowledge", label: "General Knowledge" },
    { value: "computer_science", label: "Computer Science" }
  ];
  
  const studyStyleOptions = [
    { value: "visual", label: "Visual Learner" },
    { value: "auditory", label: "Auditory Learner" },
    { value: "reading_writing", label: "Reading/Writing Preference" },
    { value: "kinesthetic", label: "Kinesthetic Learner" },
    { value: "mixed", label: "Mixed Learning Style" }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-900">
        <DialogHeader className="bg-gradient-to-r from-purple-100 to-indigo-100 dark:from-purple-900/40 dark:to-indigo-900/40 p-4 rounded-t-lg mb-2">
          <DialogTitle>Create New Study Plan</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-2">
          <div className="space-y-2">
            <Label htmlFor="examGoal">Exam Goal</Label>
            <Select value={examGoal} onValueChange={setExamGoal}>
              <SelectTrigger id="examGoal">
                <SelectValue placeholder="Select your exam goal" />
              </SelectTrigger>
              <SelectContent>
                {examOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label>Your Strengths (Subjects)</Label>
            <div className="grid grid-cols-2 gap-2">
              {subjectOptions.map(subject => (
                <div key={subject.value} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={`strength-${subject.value}`}
                    className="rounded border-gray-300"
                    checked={strengths.includes(subject.value)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setStrengths([...strengths, subject.value]);
                      } else {
                        setStrengths(strengths.filter(s => s !== subject.value));
                      }
                    }}
                  />
                  <Label htmlFor={`strength-${subject.value}`} className="text-sm">
                    {subject.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Weak Areas (Subjects)</Label>
            <div className="grid grid-cols-2 gap-2">
              {subjectOptions.map(subject => (
                <div key={subject.value} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={`weak-${subject.value}`}
                    className="rounded border-gray-300"
                    checked={weakSubjects.includes(subject.value)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setWeakSubjects([...weakSubjects, subject.value]);
                      } else {
                        setWeakSubjects(weakSubjects.filter(s => s !== subject.value));
                      }
                    }}
                  />
                  <Label htmlFor={`weak-${subject.value}`} className="text-sm">
                    {subject.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="examDate">Exam Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                  disabled={(date) => date < new Date()}
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="studyStyle">Preferred Learning Style</Label>
            <Select value={studyStyle} onValueChange={setStudyStyle}>
              <SelectTrigger id="studyStyle">
                <SelectValue placeholder="Select learning style" />
              </SelectTrigger>
              <SelectContent>
                {studyStyleOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label>Preferred Study Time</Label>
            <RadioGroup value={preferredTime} onValueChange={setPreferredTime}>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="morning" id="morning" />
                  <Label htmlFor="morning">Morning (5am - 12pm)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="afternoon" id="afternoon" />
                  <Label htmlFor="afternoon">Afternoon (12pm - 5pm)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="evening" id="evening" />
                  <Label htmlFor="evening">Evening (5pm - 9pm)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="night" id="night" />
                  <Label htmlFor="night">Night (9pm - 5am)</Label>
                </div>
              </div>
            </RadioGroup>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="studyHours">Daily Study Hours</Label>
            <div className="flex items-center gap-2">
              <Input
                id="studyHours"
                type="number"
                min="1"
                max="12"
                value={studyHours}
                onChange={(e) => setStudyHours(e.target.value)}
                className="w-20"
              />
              <span>hours per day</span>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleCreatePlan} className="bg-gradient-to-r from-purple-600 to-indigo-600">Create Plan</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewStudyPlanModal;
