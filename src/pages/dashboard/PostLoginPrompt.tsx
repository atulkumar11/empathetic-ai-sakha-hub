
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, BookOpen, Calendar, CheckCircle, ClipboardCheck } from "lucide-react";
import { motion } from "framer-motion";
import PrepzrLogo from '@/components/common/PrepzrLogo';
import { useToast } from "@/hooks/use-toast";

const PostLoginPrompt = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const returnTo = searchParams.get('returnTo') || 'dashboard/student';
  const { toast } = useToast();
  
  const [lastActivity, setLastActivity] = useState<string | null>(null);
  const [pendingTask, setPendingTask] = useState<string | null>(null);
  
  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem('userData');
    
    if (userData) {
      try {
        const parsedData = JSON.parse(userData);
        
        // Get last activity
        if (parsedData.lastActivity) {
          setLastActivity(parsedData.lastActivity.description);
        }
        
        // Get pending tasks
        if (parsedData.pendingTasks && parsedData.pendingTasks.length > 0) {
          setPendingTask(parsedData.pendingTasks[0].title);
        }
        
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
    
    // Auto-redirect after 15 seconds if no action taken
    const timer = setTimeout(() => {
      navigate(`/${returnTo}`);
      toast({
        title: "Welcome back!",
        description: "You've been automatically redirected to your dashboard.",
      });
    }, 15000);
    
    return () => clearTimeout(timer);
  }, [navigate, returnTo, toast]);

  const goToTodaysPlan = () => {
    navigate("/dashboard/student/today");
    toast({
      title: "Today's Plan",
      description: "Let's focus on today's learning goals!"
    });
  };

  const goToDashboard = () => {
    navigate(`/${returnTo}`);
    toast({
      title: "Welcome Back",
      description: "Your dashboard is ready for today's learning activities."
    });
  };
  
  const continuePendingTask = () => {
    // In a real app, this would navigate to the specific task
    // For now, just go to today's plan
    navigate("/dashboard/student/today");
    toast({
      title: "Continuing Your Work",
      description: "Pick up right where you left off!"
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-purple-950/20 flex flex-col justify-center items-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full"
      >
        <div className="text-center mb-8">
          <PrepzrLogo width={120} height="auto" className="mx-auto" />
          <h1 className="mt-4 text-4xl font-display font-bold gradient-text">Welcome Back!</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Ready to continue your learning journey?</p>
        </div>
        
        <Card className="shadow-lg border-gray-200 dark:border-gray-800">
          <CardHeader>
            <CardTitle className="text-2xl">Where would you like to go?</CardTitle>
            <CardDescription>
              {lastActivity ? (
                `You last ${lastActivity}`
              ) : (
                "Choose where to continue your learning journey"
              )}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <Button 
              variant="default" 
              className="w-full justify-start gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md"
              onClick={goToTodaysPlan}
            >
              <Calendar className="h-5 w-5" />
              <span className="flex-1 text-left">Go to Today's Plan</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
            
            {pendingTask && (
              <Button 
                variant="outline" 
                className="w-full justify-start gap-3 border-blue-200 dark:border-blue-900 hover:border-blue-300 hover:bg-blue-50 dark:hover:bg-blue-950/50"
                onClick={continuePendingTask}
              >
                <ClipboardCheck className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <span className="flex-1 text-left">
                  <span className="font-medium">Continue:</span> {pendingTask}
                </span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            )}
            
            <Button 
              variant="outline" 
              className="w-full justify-start gap-3 border-purple-200 dark:border-purple-900 hover:border-purple-300 hover:bg-purple-50 dark:hover:bg-purple-950/50"
              onClick={() => navigate("/dashboard/student/concepts")}
            >
              <BookOpen className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              <span className="flex-1 text-left">Explore Concept Cards</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full justify-start gap-3"
              onClick={goToDashboard}
            >
              <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
              <span className="flex-1 text-left">Go to My Dashboard</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </CardContent>
          
          <CardFooter className="flex justify-center pt-2">
            <p className="text-sm text-muted-foreground">
              You'll be redirected to your dashboard shortly...
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default PostLoginPrompt;
