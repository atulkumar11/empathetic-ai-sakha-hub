
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Check, GraduationCap, Brain, Target } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { NewStudyPlan } from '@/types/user/studyPlan';
import { useStudyPlanWizard } from '@/hooks/useStudyPlanWizard';

const PostSignupFlow = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [selectedExam, setSelectedExam] = useState('');
  const [analyzeComplete, setAnalyzeComplete] = useState(false);

  const mockCreatePlan = (plan: NewStudyPlan) => {
    // In a real app, this would save the plan to the backend
    console.log("Creating plan:", plan);
    localStorage.setItem('studyPlan', JSON.stringify(plan));
    toast({
      title: "Study Plan Created!",
      description: "Your personalized study plan is ready.",
    });
    
    // Navigate to welcome page after plan creation
    setTimeout(() => {
      navigate('/welcome');
    }, 1000);
  };

  const {
    formData,
    setFormData,
    strongSubjects,
    weakSubjects,
    handleToggleSubject,
    handlePaceChange,
    handleStudyTimeChange,
    handleNext: wizardHandleNext,
    handleBack: wizardHandleBack
  } = useStudyPlanWizard({
    examGoal: selectedExam,
    onCreatePlan: mockCreatePlan,
    onClose: () => navigate('/welcome')
  });

  // Simulate analyzing user profile
  useEffect(() => {
    if (step === 3) {
      const timer = setTimeout(() => {
        setAnalyzeComplete(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [step]);

  const handleExamSelect = (exam: string) => {
    setSelectedExam(exam);
    setFormData(prev => ({ ...prev, goal: exam, examGoal: exam }));
  };

  const handleNext = () => {
    if (step === 4 && analyzeComplete) {
      // Create the study plan
      const updatedFormData = {
        ...formData,
        subjects: [
          ...strongSubjects.map(subject => ({
            id: `subject-${Math.random().toString(36).substr(2, 9)}`,
            name: subject,
            color: getRandomColor(),
            hoursPerWeek: 4,
            priority: 'medium' as const,
            proficiency: 'strong' as const
          })),
          ...weakSubjects.map(subject => ({
            id: `subject-${Math.random().toString(36).substr(2, 9)}`,
            name: subject,
            color: getRandomColor(),
            hoursPerWeek: 6,
            priority: 'high' as const,
            proficiency: 'weak' as const
          })),
        ],
        weeklyHours: formData.studyHoursPerDay ? formData.studyHoursPerDay * 7 : 20
      };
      mockCreatePlan(updatedFormData);
    } else {
      setStep(step + 1);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            <h2 className="text-2xl font-bold text-center">Let's create your personalized study plan</h2>
            <div className="text-center text-muted-foreground">
              Selecting the right exam is the first step to achieving your goals
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {['IIT-JEE', 'NEET', 'UPSC', 'CAT', 'GATE', 'GMAT'].map((exam) => (
                <Card
                  key={exam}
                  className={`p-6 cursor-pointer transition-all hover:shadow-md ${
                    selectedExam === exam 
                      ? 'border-2 border-primary bg-primary/5' 
                      : 'hover:bg-muted/50'
                  }`}
                  onClick={() => handleExamSelect(exam)}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{exam}</span>
                    {selectedExam === exam && (
                      <Check className="h-5 w-5 text-primary" />
                    )}
                  </div>
                </Card>
              ))}
            </div>

            <div className="flex justify-center pt-4">
              <Button 
                size="lg"
                disabled={!selectedExam} 
                onClick={handleNext}
                className="px-8"
              >
                Next <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            <h2 className="text-2xl font-bold text-center">What are your academic strengths?</h2>
            <div className="text-center text-muted-foreground">
              Select subjects you're confident in
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {getSubjectsForGoal(selectedExam).map((subject) => (
                <Button 
                  key={subject}
                  variant={strongSubjects.includes(subject) ? "default" : "outline"}
                  className="text-left justify-start h-auto py-4"
                  onClick={() => handleToggleSubject(subject, 'strong')}
                >
                  {subject}
                </Button>
              ))}
            </div>

            <div className="flex justify-between pt-4">
              <Button 
                variant="outline" 
                onClick={() => setStep(step - 1)}
              >
                Back
              </Button>
              <Button 
                onClick={handleNext}
              >
                Next <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        );
        
      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            <h2 className="text-2xl font-bold text-center">What would you like to improve?</h2>
            <div className="text-center text-muted-foreground">
              Select subjects you find challenging
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {getSubjectsForGoal(selectedExam).map((subject) => (
                <Button 
                  key={subject}
                  variant={weakSubjects.includes(subject) ? "default" : "outline"}
                  className="text-left justify-start h-auto py-4"
                  onClick={() => handleToggleSubject(subject, 'weak')}
                  disabled={strongSubjects.includes(subject)}
                >
                  {subject}
                </Button>
              ))}
            </div>

            <div className="flex justify-between pt-4">
              <Button 
                variant="outline" 
                onClick={() => setStep(step - 1)}
              >
                Back
              </Button>
              <Button 
                onClick={handleNext}
              >
                Next <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        );
        
      case 4:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            <h2 className="text-2xl font-bold text-center">Creating your personalized study plan</h2>
            
            {!analyzeComplete ? (
              <div className="space-y-6 py-8">
                <div className="flex justify-center">
                  <div className="w-16 h-16 border-4 border-t-primary border-r-primary border-b-primary/30 border-l-primary/30 rounded-full animate-spin"></div>
                </div>
                <div className="text-center text-muted-foreground">
                  Analyzing your profile and creating a customized learning path...
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800/30">
                  <div className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-600 dark:text-green-400" />
                    <span className="font-medium text-green-800 dark:text-green-300">Analysis complete!</span>
                  </div>
                  <p className="pl-7 text-sm text-green-700 dark:text-green-400">
                    We've created a personalized study plan based on your goals and preferences.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="p-4 flex flex-col items-center text-center">
                    <div className="bg-primary/10 p-3 rounded-full mb-3">
                      <Target className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-medium">Exam Goal</h3>
                    <p className="text-sm text-muted-foreground">{selectedExam}</p>
                  </Card>
                  
                  <Card className="p-4 flex flex-col items-center text-center">
                    <div className="bg-violet-500/10 p-3 rounded-full mb-3">
                      <GraduationCap className="h-6 w-6 text-violet-500" />
                    </div>
                    <h3 className="font-medium">Subjects</h3>
                    <p className="text-sm text-muted-foreground">{strongSubjects.length + weakSubjects.length} subjects</p>
                  </Card>
                  
                  <Card className="p-4 flex flex-col items-center text-center">
                    <div className="bg-blue-500/10 p-3 rounded-full mb-3">
                      <Brain className="h-6 w-6 text-blue-500" />
                    </div>
                    <h3 className="font-medium">Learning Style</h3>
                    <p className="text-sm text-muted-foreground">Personalized</p>
                  </Card>
                </div>
                
                <div className="pt-4 flex justify-center">
                  <Button 
                    size="lg"
                    onClick={handleNext}
                    className="px-8 bg-gradient-to-r from-purple-600 to-blue-600"
                  >
                    Continue to Dashboard
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100/30 via-white to-violet-100/30 flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-3xl">
          <div className="mb-8 flex justify-center">
            <img src="/assets/logo.svg" alt="PREPZR Logo" className="h-12" />
          </div>
          
          <Card className="p-8 shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <div className="flex space-x-2">
                {[1, 2, 3, 4].map((stepNumber) => (
                  <div
                    key={stepNumber}
                    className={`w-3 h-3 rounded-full ${
                      stepNumber === step
                        ? 'bg-primary'
                        : stepNumber < step
                        ? 'bg-primary/60'
                        : 'bg-gray-200 dark:bg-gray-700'
                    }`}
                  />
                ))}
              </div>
              <div className="text-sm text-muted-foreground">
                Step {step} of 4
              </div>
            </div>
            
            {renderStep()}
          </Card>
        </div>
      </div>
      
      <footer className="p-4 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} PREPZR. All rights reserved.
      </footer>
    </div>
  );
};

// Helper function to get subjects based on selected goal
function getSubjectsForGoal(goal: string): string[] {
  switch (goal) {
    case 'IIT-JEE':
      return ['Physics', 'Chemistry', 'Mathematics'];
    case 'NEET':
      return ['Physics', 'Chemistry', 'Biology'];
    case 'UPSC':
      return ['History', 'Geography', 'Polity', 'Economics', 'Science & Technology', 'Current Affairs'];
    case 'CAT':
      return ['Quantitative Aptitude', 'Verbal Ability', 'Data Interpretation', 'Logical Reasoning'];
    case 'GATE':
      return ['Engineering Mathematics', 'General Aptitude', 'Subject Specific'];
    case 'GMAT':
      return ['Quantitative Reasoning', 'Verbal Reasoning', 'Integrated Reasoning', 'Analytical Writing'];
    default:
      return ['Subject 1', 'Subject 2', 'Subject 3', 'Subject 4'];
  }
}

// Helper function to generate random pastel colors
function getRandomColor(): string {
  const colors = [
    '#8B5CF6', // Purple
    '#EC4899', // Pink
    '#10B981', // Green
    '#F59E0B', // Yellow
    '#2563EB', // Blue
    '#EF4444', // Red
    '#6366F1', // Indigo
    '#14B8A6', // Teal
    '#F97316', // Orange
    '#8B5CF6', // Purple
  ];
  
  return colors[Math.floor(Math.random() * colors.length)];
}

export default PostSignupFlow;
