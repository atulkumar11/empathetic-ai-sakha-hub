
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { CalendarIcon, ChevronLeft, ChevronRight, Clock, GraduationCap, LucideBook, Target, User2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import PrepzrLogo from '@/components/common/PrepzrLogo';
import { useToast } from '@/hooks/use-toast';

const examOptions = [
  { value: 'iit-jee', label: 'IIT JEE' },
  { value: 'neet', label: 'NEET' },
  { value: 'upsc', label: 'UPSC' },
  { value: 'gate', label: 'GATE' },
  { value: 'cat', label: 'CAT' },
  { value: 'other', label: 'Other' },
];

const difficultyLevels = [
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' },
];

const studyTimeOptions = [
  { value: 'morning', label: 'Morning (5AM - 12PM)' },
  { value: 'afternoon', label: 'Afternoon (12PM - 5PM)' },
  { value: 'evening', label: 'Evening (5PM - 10PM)' },
  { value: 'night', label: 'Night (10PM - 5AM)' },
];

interface StepProps {
  children: React.ReactNode;
  onNext: () => void;
  onBack?: () => void;
  isLastStep?: boolean;
  disableNext?: boolean;
}

const Step: React.FC<StepProps> = ({ children, onNext, onBack, isLastStep = false, disableNext = false }) => {
  return (
    <div className="flex flex-col min-h-[400px]">
      <div className="flex-1">
        {children}
      </div>
      <div className="flex justify-between mt-6">
        {onBack ? (
          <Button variant="outline" onClick={onBack}>
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        ) : <div></div>}
        <Button onClick={onNext} disabled={disableNext}>
          {isLastStep ? 'Create Plan' : 'Next'}
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

const StudyPlanCreation = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    exam: '',
    examDate: null as Date | null,
    otherExam: '',
    subjects: ['Physics', 'Chemistry', 'Mathematics'],
    studyHoursPerDay: 4,
    studyTimePreference: [] as string[],
    difficultyLevel: '',
    userName: '',
  });

  const steps = [
    {
      title: "Choose Your Exam",
      description: "Select the exam you're preparing for",
      icon: <Target className="h-6 w-6" />,
      component: (
        <Step 
          onNext={() => setCurrentStep(1)}
          disableNext={formData.exam === '' || (formData.exam === 'other' && formData.otherExam === '')}
        >
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="exam">Which exam are you preparing for?</Label>
              <Select 
                value={formData.exam} 
                onValueChange={(value) => setFormData({...formData, exam: value})}
              >
                <SelectTrigger className="mt-1.5">
                  <SelectValue placeholder="Select an exam" />
                </SelectTrigger>
                <SelectContent>
                  {examOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {formData.exam === 'other' && (
              <div className="mt-4">
                <Label htmlFor="otherExam">Specify the exam name</Label>
                <Input 
                  id="otherExam"
                  value={formData.otherExam}
                  onChange={(e) => setFormData({...formData, otherExam: e.target.value})}
                  placeholder="Enter the exam name"
                  className="mt-1.5"
                />
              </div>
            )}
            
            <div className="mt-4">
              <Label htmlFor="examDate">When is your exam date?</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full mt-1.5 justify-start text-left font-normal",
                      !formData.examDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.examDate ? format(formData.examDate, "PPP") : "Select a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.examDate || undefined}
                    onSelect={(date) => setFormData({...formData, examDate: date})}
                    initialFocus
                    disabled={(date) => date < new Date()}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </Step>
      )
    },
    {
      title: "Subjects",
      description: "Select subjects to include in your plan",
      icon: <LucideBook className="h-6 w-6" />,
      component: (
        <Step 
          onNext={() => setCurrentStep(2)} 
          onBack={() => setCurrentStep(0)}
          disableNext={formData.subjects.length === 0}
        >
          <div className="space-y-4">
            <Label className="text-base">Choose subjects for your study plan</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              {/* This would ideally be dynamic based on the selected exam */}
              {['Physics', 'Chemistry', 'Mathematics', 'Biology', 'English', 'Computer Science', 'General Knowledge', 'Reasoning', 'Current Affairs'].map((subject) => (
                <div key={subject} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={subject}
                    checked={formData.subjects.includes(subject)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFormData({
                          ...formData,
                          subjects: [...formData.subjects, subject]
                        });
                      } else {
                        setFormData({
                          ...formData,
                          subjects: formData.subjects.filter(s => s !== subject)
                        });
                      }
                    }}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <Label htmlFor={subject} className="text-sm">{subject}</Label>
                </div>
              ))}
            </div>
          </div>
        </Step>
      )
    },
    {
      title: "Study Preferences",
      description: "Set your daily study hours and timing preferences",
      icon: <Clock className="h-6 w-6" />,
      component: (
        <Step 
          onNext={() => setCurrentStep(3)}
          onBack={() => setCurrentStep(1)}
          disableNext={formData.studyHoursPerDay === 0 || formData.studyTimePreference.length === 0}
        >
          <div className="space-y-6">
            <div>
              <Label htmlFor="studyHours">How many hours can you study each day?</Label>
              <div className="flex items-center mt-2 space-x-4">
                <Slider
                  id="studyHours"
                  min={1}
                  max={12}
                  step={0.5}
                  value={[formData.studyHoursPerDay]}
                  onValueChange={(value) => setFormData({...formData, studyHoursPerDay: value[0]})}
                  className="flex-1"
                />
                <span className="font-semibold w-12 text-center">{formData.studyHoursPerDay}h</span>
              </div>
            </div>
            
            <div>
              <Label className="text-base">When do you prefer to study? (Select all that apply)</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                {studyTimeOptions.map((option) => (
                  <div key={option.value} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={option.value}
                      checked={formData.studyTimePreference.includes(option.value)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFormData({
                            ...formData,
                            studyTimePreference: [...formData.studyTimePreference, option.value]
                          });
                        } else {
                          setFormData({
                            ...formData,
                            studyTimePreference: formData.studyTimePreference.filter(t => t !== option.value)
                          });
                        }
                      }}
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <Label htmlFor={option.value} className="text-sm">{option.label}</Label>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <Label htmlFor="difficultyLevel">Your current preparation level</Label>
              <RadioGroup
                value={formData.difficultyLevel}
                onValueChange={(value) => setFormData({...formData, difficultyLevel: value})}
                className="grid grid-cols-3 gap-4 mt-2"
              >
                {difficultyLevels.map((level) => (
                  <div key={level.value} className="flex items-center space-x-2">
                    <RadioGroupItem value={level.value} id={level.value} />
                    <Label htmlFor={level.value}>{level.label}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>
        </Step>
      )
    },
    {
      title: "Personal Details",
      description: "What should we call you?",
      icon: <User2 className="h-6 w-6" />,
      component: (
        <Step 
          onNext={handleCreatePlan} 
          onBack={() => setCurrentStep(2)}
          isLastStep={true}
          disableNext={formData.userName.trim() === ''}
        >
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Your Name</Label>
              <Input 
                id="name"
                value={formData.userName}
                onChange={(e) => setFormData({...formData, userName: e.target.value})}
                placeholder="Enter your name"
                className="mt-1.5"
              />
              <p className="mt-2 text-sm text-muted-foreground">
                We'll personalize your study plan based on this information.
              </p>
            </div>
            
            <div className="p-4 mt-4 bg-blue-50 dark:bg-blue-900/20 rounded-md">
              <h3 className="font-semibold text-blue-700 dark:text-blue-400">Plan Summary</h3>
              <ul className="mt-2 space-y-2 text-sm">
                <li className="flex items-start">
                  <Target className="h-4 w-4 mr-2 mt-0.5 text-blue-600 dark:text-blue-500" />
                  <span>
                    <strong>Exam:</strong> {formData.exam === 'other' ? formData.otherExam : examOptions.find(e => e.value === formData.exam)?.label || 'Not selected'}
                    {formData.examDate && <> (Exam date: {format(formData.examDate, "PPP")})</>}
                  </span>
                </li>
                <li className="flex items-start">
                  <LucideBook className="h-4 w-4 mr-2 mt-0.5 text-blue-600 dark:text-blue-500" />
                  <span>
                    <strong>Subjects:</strong> {formData.subjects.join(', ')}
                  </span>
                </li>
                <li className="flex items-start">
                  <Clock className="h-4 w-4 mr-2 mt-0.5 text-blue-600 dark:text-blue-500" />
                  <span>
                    <strong>Study Time:</strong> {formData.studyHoursPerDay} hours per day
                  </span>
                </li>
                <li className="flex items-start">
                  <GraduationCap className="h-4 w-4 mr-2 mt-0.5 text-blue-600 dark:text-blue-500" />
                  <span>
                    <strong>Level:</strong> {formData.difficultyLevel || 'Not selected'}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </Step>
      )
    }
  ];
  
  function handleCreatePlan() {
    // In a real app, this would save the plan to the backend
    // For now, we'll just navigate to the welcome screen
    
    // Save form data to localStorage
    const userData = localStorage.getItem('userData');
    if (userData) {
      const parsedData = JSON.parse(userData);
      parsedData.studyPlan = formData;
      parsedData.completedOnboarding = true;
      localStorage.setItem('userData', JSON.stringify(parsedData));
    } else {
      localStorage.setItem('userData', JSON.stringify({
        studyPlan: formData,
        completedOnboarding: true
      }));
    }
    
    toast({
      title: "Study Plan Created!",
      description: "Your personalized study plan is ready. Let's start learning!",
    });
    
    // Navigate to welcome screen
    navigate("/welcome-back?returnTo=dashboard/student");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-900 dark:to-indigo-950/20 p-4 flex flex-col items-center justify-center">
      <div className="w-full max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <PrepzrLogo width={120} height="auto" className="mx-auto" />
          <h1 className="mt-4 text-4xl font-display font-bold gradient-text">Create Your Study Plan</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Let's set up a personalized plan to help you achieve your exam goals</p>
        </div>
        
        <Card className="shadow-xl border-gray-200 dark:border-gray-800 overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-2xl">{steps[currentStep].title}</CardTitle>
                <CardDescription className="text-blue-100">
                  {steps[currentStep].description}
                </CardDescription>
              </div>
              <div className="bg-white/20 rounded-full p-3">
                {steps[currentStep].icon}
              </div>
            </div>
          </CardHeader>
          
          <div className="bg-slate-100 dark:bg-slate-800 px-6 py-2 flex justify-between">
            {steps.map((step, index) => (
              <div 
                key={index} 
                className={`flex flex-col items-center ${index <= currentStep ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400'}`}
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                  index < currentStep ? 'bg-blue-600 text-white' : 
                  index === currentStep ? 'border-2 border-blue-600 text-blue-600' : 
                  'border-2 border-gray-300 text-gray-400'
                }`}>
                  {index < currentStep ? '✓' : index + 1}
                </div>
                <span className="text-xs mt-1 hidden sm:block">{step.title}</span>
              </div>
            ))}
          </div>
          
          <div className="relative h-1">
            <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700" />
            <div 
              className="absolute inset-y-0 left-0 bg-blue-600 dark:bg-blue-500 transition-all duration-300" 
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }} 
            />
          </div>
          
          <CardContent className="p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                {steps[currentStep].component}
              </motion.div>
            </AnimatePresence>
          </CardContent>
          
          <CardFooter className="border-t bg-muted/30 flex justify-between py-3 px-6">
            <div>
              <Progress value={(currentStep + 1) / steps.length * 100} className="h-2 w-24" />
            </div>
            <p className="text-sm text-muted-foreground">
              Step {currentStep + 1} of {steps.length}
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
  
  function handleCreatePlan() {
    // In a real app, this would save the plan to the backend
    // For now, we'll just navigate to the welcome screen
    
    // Save form data to localStorage
    const userData = localStorage.getItem('userData');
    if (userData) {
      const parsedData = JSON.parse(userData);
      parsedData.studyPlan = formData;
      parsedData.completedOnboarding = true;
      localStorage.setItem('userData', JSON.stringify(parsedData));
    } else {
      localStorage.setItem('userData', JSON.stringify({
        studyPlan: formData,
        completedOnboarding: true
      }));
    }
    
    toast({
      title: "Study Plan Created!",
      description: "Your personalized study plan is ready. Let's start learning!",
    });
    
    // Navigate to welcome screen
    navigate("/welcome-back?returnTo=dashboard/student");
  }
};

export default StudyPlanCreation;
