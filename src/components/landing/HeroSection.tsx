
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import KpiStats from "../home/hero/feature-highlights/KpiStats";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ExamNamesBadge from "../home/hero/ExamNamesBadge";

const HeroSection: React.FC = () => {
  // Text animation variants
  const titleVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.05,
        delayChildren: 0.2
      } 
    }
  };
  
  const letterVariants = {
    hidden: { opacity: 0, y: 5 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.3
      } 
    }
  };
  
  // Premium animated title text
  const titleText = "India's 1st Emotionally Intelligent Study Partner";
  const titleLetters = titleText.split("");
  
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-purple-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-6 py-16 text-center md:py-20 lg:py-24">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white md:text-4xl lg:text-5xl xl:text-6xl">
          <motion.span 
            className="mb-2 block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            अब तैयारी करो अपने तरीके से…लेकिन SMARTLY – सिर्फ PREPZR के साथ!
          </motion.span>
          
          <motion.div
            className="mt-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-600"
            variants={titleVariants}
            initial="hidden"
            animate="visible"
          >
            {titleLetters.map((letter, index) => (
              <motion.span
                key={index}
                variants={letterVariants}
                className={`inline-block ${letter === " " ? "mx-1" : ""}`}
              >
                {letter}
              </motion.span>
            ))}
          </motion.div>
        </h1>
        
        <motion.p 
          className="mx-auto mb-8 max-w-3xl text-lg text-gray-600 dark:text-gray-300 md:text-xl lg:text-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          Tuned to Your Mood, Habits, Mind & Mission to{" "}
          <motion.span 
            className="relative font-bold"
            initial={{ color: "#9b87f5" }}
            animate={{ 
              color: ["#9b87f5", "#D946EF", "#8B5CF6", "#0EA5E9", "#9b87f5"],
            }}
            transition={{ 
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <span className="relative inline-block">
              Crack Exams.
              <motion.span 
                className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 w-full" 
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ 
                  delay: 0.8,
                  duration: 0.8,
                  ease: "easeInOut"
                }}
              />
            </span>
          </motion.span>
        </motion.p>
        
        <motion.div 
          className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.6 }}
        >
          <Button 
            className="bg-gradient-to-r from-purple-500 to-indigo-600 px-8 py-6 text-lg font-semibold text-white shadow-lg hover:from-purple-600 hover:to-indigo-700"
            onClick={() => {
              // Find the ExamReadinessAnalyzer component in the DOM and open it
              const event = new CustomEvent('open-exam-analyzer');
              window.dispatchEvent(event);
            }}
          >
            Test Your Exam Readiness
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button 
            variant="outline" 
            className="border-2 px-8 py-6 text-lg font-semibold shadow-lg"
            asChild
          >
            <Link to="/signup">
              7 Days Free Trial
            </Link>
          </Button>
        </motion.div>
        
        {/* Exam Names Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mt-10 mb-6"
        >
          <ExamNamesBadge />
        </motion.div>

        {/* Animated elements */}
        <motion.div 
          className="absolute -left-32 -top-32 h-64 w-64 rounded-full bg-purple-300 opacity-20 blur-3xl filter"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2]
          }}
          transition={{ 
            repeat: Infinity,
            duration: 8,
            ease: "easeInOut"
          }}
        ></motion.div>
        
        <motion.div 
          className="absolute -right-32 top-56 h-64 w-64 rounded-full bg-indigo-300 opacity-20 blur-3xl filter"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.25, 0.2]
          }}
          transition={{ 
            repeat: Infinity,
            duration: 10,
            ease: "easeInOut",
            delay: 2
          }}
        ></motion.div>
      </div>

      {/* KPI Stats moved right after the exam names */}
      <div className="mt-4 mb-16">
        <KpiStats />
      </div>
    </div>
  );
};

export default HeroSection;
