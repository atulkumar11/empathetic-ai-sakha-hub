
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { MoodType } from "@/types/user/base";

interface SplashScreenProps {
  onComplete: () => void;
  mood?: MoodType;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete, mood }) => {
  const [currentMood, setCurrentMood] = useState<MoodType | undefined>(mood);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [showButton, setShowButton] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationComplete(true);
    }, 2000);
    
    const buttonTimer = setTimeout(() => {
      setShowButton(true);
    }, 2500);
    
    return () => {
      clearTimeout(timer);
      clearTimeout(buttonTimer);
    };
  }, []);
  
  const greetingVariants = {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };
  
  const logoVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1, transition: { duration: 0.5 } },
  };
  
  const quoteVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.3 } },
  };
  
  // Map mood to specific quotes and messages
  const getMoodSpecificContent = () => {
    const defaultQuote = "Study hard and be awesome!";
    const defaultMessage = "Let's achieve something great today!";
    
    const moodContent = {
      motivated: {
        quote: "Success is the sum of small efforts, repeated day in and day out.",
        message: "You're motivated! Let's channel that energy into focused study."
      },
      happy: {
        quote: "A positive mindset brings positive results.",
        message: "Great to see you happy! Ready to learn something new?"
      },
      focused: {
        quote: "Discipline is the bridge between goals and accomplishment.",
        message: "You're in the zone! Let's make progress on important concepts."
      },
      neutral: {
        quote: "Small progress is still progress.",
        message: "Let's build some momentum with your studies today."
      },
      stressed: {
        quote: "Take a deep breath. You've got this.",
        message: "Let's break down your work into manageable chunks."
      },
      tired: {
        quote: "Rest if you must, but don't quit.",
        message: "Let's focus on review and light learning today."
      }
    };
    
    if (!currentMood || !Object.prototype.hasOwnProperty.call(moodContent, currentMood)) {
      return { quote: defaultQuote, message: defaultMessage };
    }
    
    return moodContent[currentMood as keyof typeof moodContent];
  };
  
  const { quote, message } = getMoodSpecificContent();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950 dark:to-indigo-900 flex items-center justify-center p-4">
      <motion.div 
        className="max-w-md w-full bg-white dark:bg-gray-900 rounded-xl shadow-xl overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="p-8 text-center">
          <motion.div 
            className="mb-6 flex justify-center"
            variants={logoVariants}
            initial="initial"
            animate="animate"
          >
            <img 
              src="/lovable-uploads/b3337c40-376b-4764-bee8-d425abf31bc8.png"
              alt="PREPZR Logo" 
              className="h-16 w-16"
            />
          </motion.div>
          
          <motion.div
            variants={greetingVariants}
            initial="initial"
            animate="animate"
          >
            <h1 className="text-2xl font-bold mb-2">Welcome to PREPZR</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Your AI-powered study companion
            </p>
          </motion.div>
          
          {animationComplete && (
            <motion.div 
              className="mb-6"
              variants={quoteVariants}
              initial="initial"
              animate="animate"
            >
              <blockquote className="italic text-gray-700 dark:text-gray-300 border-l-4 border-blue-500 pl-4 py-2 text-left">
                "{quote}"
              </blockquote>
              <p className="mt-4 text-gray-600 dark:text-gray-400 text-sm">
                {message}
              </p>
            </motion.div>
          )}
          
          {showButton && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Button 
                className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
                onClick={onComplete}
              >
                Continue to Dashboard <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default SplashScreen;
