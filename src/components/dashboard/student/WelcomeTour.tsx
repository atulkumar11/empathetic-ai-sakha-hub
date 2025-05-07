
import React, { Fragment } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Steps, StepLabel } from "@/components/ui/steps";
import { Check, X, BookOpen, Clock, Calendar, LineChart, MessageSquare, User, Video, FileText } from "lucide-react";
import PrepzrLogo from "@/components/common/PrepzrLogo";

interface WelcomeTourProps {
  onSkipTour: () => void;
  onCompleteTour: () => void;
  isFirstTimeUser?: boolean;
  lastActivity?: { type: string; description: string } | null;
  suggestedNextAction?: string | null;
  loginCount?: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function WelcomeTour({
  onSkipTour,
  onCompleteTour,
  isFirstTimeUser = true,
  open,
  onOpenChange,
}: WelcomeTourProps) {
  const handleSkip = () => {
    onSkipTour();
  };

  const handleComplete = () => {
    onCompleteTour();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[650px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-center mb-4">
            <PrepzrLogo width={100} height={100} />
          </div>
          <DialogTitle className="text-2xl text-center">Welcome to PREPZR!</DialogTitle>
          <DialogDescription className="text-center">
            Your personalized study companion powered by AI
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <div className="mb-6 flex flex-col md:flex-row gap-4 p-4 bg-gradient-to-r from-blue-50 to-violet-50 border border-blue-100 rounded-lg">
            <img
              src="/lovable-uploads/ffb2594e-ee5e-424c-92ff-417777e347c9.png"
              alt="Amit Singh - Founder"
              className="w-24 h-24 object-cover rounded-full mx-auto md:mx-0 border-2 border-blue-200"
            />
            <div>
              <h3 className="font-medium text-blue-700 text-center md:text-left">A Message From Our Founder</h3>
              <p className="text-gray-700 text-sm mt-2 italic">
                "Hi, I'm Amit Singh, Founder of Prepzr. You've taken the first step toward mastering your exam journey.
                Prepzr isn't just another prep tool — it's your 24/7 personal coach, your daily motivator and your smart companion.
                We personalize everything — from study plans to concept clarity — based on your exam goals, mood and pace."
              </p>
              <p className="text-gray-700 text-sm mt-2 italic">
                "Let's stay focused. Let's stay consistent. Let's crack it — together."
              </p>
              <p className="text-blue-600 mt-2 text-sm font-medium text-right">— Amit Singh, Founder, Prepzr</p>
            </div>
          </div>

          <Separator className="my-4" />

          <h3 className="font-medium text-lg mb-3">What makes PREPZR special:</h3>
          <Steps>
            <Fragment>
              <StepLabel>
                <h4 className="font-medium">Personalized Study Plan</h4>
                <p className="text-sm text-muted-foreground">Automatically adapts to your learning style and progress</p>
              </StepLabel>
              <StepLabel>
                <h4 className="font-medium">AI-Powered Assistance</h4>
                <p className="text-sm text-muted-foreground">Get help with concepts and track your progress</p>
              </StepLabel>
              <StepLabel>
                <h4 className="font-medium">Mood-Adaptive Learning</h4>
                <p className="text-sm text-muted-foreground">Study plans that adjust to your current mental state</p>
              </StepLabel>
              <StepLabel>
                <h4 className="font-medium">Comprehensive Resources</h4>
                <p className="text-sm text-muted-foreground">Concept cards, flashcards, and practice exams in one place</p>
              </StepLabel>
            </Fragment>
          </Steps>
          
          <Separator className="my-6" />
          
          <h3 className="font-medium text-lg mb-4">Your Dashboard Features:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-100 text-blue-700 rounded-md">
                  <BookOpen size={20} />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Concept Cards</h4>
                  <p className="text-sm text-gray-600">Interactive learning materials with visuals and explanations</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-purple-100 text-purple-700 rounded-md">
                  <FileText size={20} />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Flashcards</h4>
                  <p className="text-sm text-gray-600">Quick review cards to test your memory and understanding</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-green-100 text-green-700 rounded-md">
                  <Calendar size={20} />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Today's Plan</h4>
                  <p className="text-sm text-gray-600">Your personalized daily study schedule and tasks</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-amber-100 text-amber-700 rounded-md">
                  <Clock size={20} />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Practice Exams</h4>
                  <p className="text-sm text-gray-600">Test your knowledge with timed mock exams</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-red-100 text-red-700 rounded-md">
                  <LineChart size={20} />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Progress Tracking</h4>
                  <p className="text-sm text-gray-600">Visual analytics of your study progress and performance</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-sky-100 text-sky-700 rounded-md">
                  <MessageSquare size={20} />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">AI Tutor</h4>
                  <p className="text-sm text-gray-600">24/7 assistance for your study questions and doubts</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
            <h4 className="font-medium text-blue-800 mb-2">How to start studying:</h4>
            <ol className="list-decimal list-inside space-y-2 text-sm text-blue-700">
              <li>Begin with <strong>Today's Plan</strong> to see what's scheduled for you</li>
              <li>Review <strong>Concept Cards</strong> to understand fundamental topics</li>
              <li>Practice with <strong>Flashcards</strong> to strengthen your memory</li>
              <li>Take <strong>Practice Exams</strong> to test your knowledge</li>
              <li>Use the <strong>AI Tutor</strong> whenever you have questions or need help</li>
            </ol>
          </div>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline" onClick={handleSkip} className="w-full sm:w-auto">
            <X className="mr-2 h-4 w-4" /> Skip Tour
          </Button>
          <Button onClick={handleComplete} className="w-full sm:w-auto">
            <Check className="mr-2 h-4 w-4" /> Let's Begin
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
