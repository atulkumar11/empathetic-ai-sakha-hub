
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { ArrowRight, Check, FileText, Calendar, Clock, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import PrepzrLogo from '@/components/common/PrepzrLogo';
import { UserProfileBase } from '@/types/user/base';

interface OnboardingFlowProps {
  userProfile: UserProfileBase;
  goalTitle: string;
  onComplete: () => void;
}

const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ userProfile, goalTitle, onComplete }) => {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  
  const steps = [
    {
      title: "Welcome to Prepzr!",
      description: "Let's set up your personalized study plan",
      content: (
        <div className="space-y-6 py-4">
          <div className="text-center mb-8">
            <PrepzrLogo width={80} className="mx-auto mb-4" />
            <h2 className="text-2xl font-bold">Welcome, {userProfile.name}!</h2>
            <p className="text-muted-foreground mt-2">
              We're excited to help you prepare for {goalTitle}
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                <Calendar className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Personalized Study Plan</h3>
                <p className="text-sm text-muted-foreground">
                  Get a day-by-day study schedule tailored to your needs
                </p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Concept Cards & Flashcards</h3>
                <p className="text-sm text-muted-foreground">
                  Master key concepts with our bite-sized learning modules
                </p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                <Star className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Progress Tracking</h3>
                <p className="text-sm text-muted-foreground">
                  Monitor your improvement and stay motivated
                </p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Your Learning Style",
      description: "Help us understand your preferences",
      content: (
        <div className="space-y-6 py-4">
          <div className="space-y-4">
            <div className="bg-primary/5 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Based on your onboarding responses:</h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-primary mr-2" />
                  <span>You're a <strong>visual-kinesthetic learner</strong></span>
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-primary mr-2" />
                  <span>Best study time: <strong>Morning to Afternoon</strong></span>
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-primary mr-2" />
                  <span>Optimal focus duration: <strong>30-45 minute sessions</strong></span>
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-primary mr-2" />
                  <span>Recommended break: <strong>10 minute breaks</strong></span>
                </li>
              </ul>
            </div>
            
            <p className="text-sm text-muted-foreground">
              Your study plan will be tailored to these preferences. You can always adjust these settings later in your profile.
            </p>
          </div>
        </div>
      )
    },
    {
      title: "Your Study Plan is Ready!",
      description: "Let's get started with your preparation",
      content: (
        <div className="space-y-6 py-4">
          <div className="text-center mb-6">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
              <Clock className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-xl font-bold mt-4">Your Study Plan is Ready!</h2>
            <p className="text-muted-foreground mt-2">
              We've created a personalized learning path for {goalTitle}
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-2">Today's Focus Areas:</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center justify-between">
                  <span>Physics: Newton's Laws</span>
                  <span className="text-muted-foreground">45 min</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>Chemistry: Periodic Table</span>
                  <span className="text-muted-foreground">30 min</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>Mathematics: Calculus</span>
                  <span className="text-muted-foreground">40 min</span>
                </li>
              </ul>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <span>Estimated study time today:</span>
              <span className="font-medium">2 hours 15 minutes</span>
            </div>
            
            <Separator />
            
            <p className="text-sm text-center">
              Ready to start your learning journey?
            </p>
          </div>
        </div>
      )
    }
  ];
  
  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      setLoading(true);
      
      // Simulate loading and then complete onboarding
      setTimeout(() => {
        setLoading(false);
        onComplete();
      }, 1500);
    }
  };
  
  const progress = ((step + 1) / steps.length) * 100;
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-violet-50 dark:from-blue-950/30 dark:to-violet-950/30 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>{steps[step].title}</CardTitle>
            <CardDescription>{steps[step].description}</CardDescription>
          </CardHeader>
          <CardContent>
            {steps[step].content}
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button 
              className="w-full" 
              onClick={handleNext}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="animate-spin mr-2">⏳</span>
                  Setting up your dashboard...
                </>
              ) : step < steps.length - 1 ? (
                <>
                  Continue
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              ) : (
                <>
                  Go to Dashboard
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
            <Progress value={progress} className="h-1" />
            <div className="text-xs text-center text-muted-foreground">
              Step {step + 1} of {steps.length}
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default OnboardingFlow;
