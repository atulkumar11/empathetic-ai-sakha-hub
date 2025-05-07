
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, BookOpen, Shield, FileText, CircleUserRound, ArrowRightLeft } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const EcosystemAnimation: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [autoplayIndex, setAutoplayIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  
  const examCategories = [
    {
      id: 1,
      title: "Engineering Exams",
      description: "Prepare for top engineering entrance exams with AI-driven personalized study plans",
      icon: <GraduationCap size={28} />,
      exams: ["JEE Main", "JEE Advanced", "BITSAT", "VITEEE", "MET"],
      color: "from-blue-500 to-cyan-400",
      launchedExams: []
    },
    {
      id: 2,
      title: "Medical Exams",
      description: "Master medical concepts with adaptive learning paths tailored to your strengths and weaknesses",
      icon: <BookOpen size={28} />,
      exams: ["NEET-UG", "AIIMS", "JIPMER", "NEET-PG", "FMGE"],
      color: "from-green-500 to-teal-400",
      launchedExams: ["NEET-UG"],
      examDetails: {
        "NEET-UG": {
          scoringPattern: "+4/-1 scoring",
          timePerQuestion: "1.06 minutes per question"
        }
      }
    },
    {
      id: 3,
      title: "Civil Service Exams",
      description: "Comprehensive preparation for all stages of civil service examination with current affairs updates",
      icon: <Shield size={28} />,
      exams: ["UPSC CSE", "State PCS", "SSC CGL", "UPSC ESE", "UPSC CDS"],
      color: "from-orange-500 to-amber-400",
      launchedExams: []
    },
    {
      id: 4,
      title: "Management Exams",
      description: "Strategic preparation for management entrance tests with focus on analytical and verbal ability",
      icon: <FileText size={28} />,
      exams: ["CAT", "XAT", "SNAP", "NMAT", "CMAT"],
      color: "from-purple-500 to-violet-400",
      launchedExams: []
    },
    {
      id: 5,
      title: "Competitive Exams",
      description: "Stay ahead with pattern-focused preparation and regular mock tests for competitive exams",
      icon: <CircleUserRound size={28} />,
      exams: ["Banking", "SSC", "Railways", "Insurance", "Teaching"],
      color: "from-rose-500 to-pink-400",
      launchedExams: []
    },
    {
      id: 6,
      title: "International Exams",
      description: "Complete preparation for international standardized tests with focus on all test components",
      icon: <ArrowRightLeft size={28} />,
      exams: ["GRE", "GMAT", "TOEFL", "IELTS", "SAT"],
      color: "from-indigo-500 to-blue-400",
      launchedExams: []
    }
  ];

  // Handle autoplay rotation through categories
  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setAutoplayIndex((prev) => (prev + 1) % examCategories.length);
        setActiveCategory(((autoplayIndex + 1) % examCategories.length) + 1);
      }, 4000);
      
      return () => clearInterval(interval);
    }
  }, [autoplayIndex, isPaused, examCategories.length]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <TooltipProvider>
      <section className="py-16 md:py-24 overflow-hidden relative bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-24 right-0 w-96 h-96 bg-blue-200 rounded-full opacity-10 blur-3xl"></div>
          <div className="absolute top-1/3 -left-48 w-96 h-96 bg-purple-200 rounded-full opacity-10 blur-3xl"></div>
          <div className="hidden md:block absolute bottom-0 right-20 w-64 h-64 bg-green-200 rounded-full opacity-10 blur-3xl"></div>
          
          <svg className="absolute top-10 left-10 text-gray-200 dark:text-gray-800 opacity-40" width="60" height="60" viewBox="0 0 60 60" fill="none">
            <path d="M10 10L50 50" stroke="currentColor" strokeWidth="2" strokeLinecap="round"></path>
            <path d="M50 10L10 50" stroke="currentColor" strokeWidth="2" strokeLinecap="round"></path>
          </svg>
          
          <svg className="absolute bottom-10 right-10 text-gray-200 dark:text-gray-800 opacity-40" width="120" height="120" viewBox="0 0 120 120" fill="none">
            <circle cx="60" cy="60" r="40" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="6 10"></circle>
          </svg>
        </div>
        
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Complete <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Exam Ecosystem</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              One platform for all competitive exam preparation needs, designed to adapt to your goals and learning style
            </p>
          </motion.div>

          {/* Category Selection Pills */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {examCategories.map((category) => (
              <motion.button
                key={`btn-${category.id}`}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === category.id
                    ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                    : `bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:shadow border border-gray-100 dark:border-gray-700`
                }`}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  setActiveCategory(category.id);
                  setIsPaused(true);
                }}
              >
                <div className="flex items-center">
                  <span className="mr-2">{category.icon}</span>
                  {category.title}
                </div>
              </motion.button>
            ))}
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {examCategories.map((category) => {
              const isActive = activeCategory === category.id;
              const isMedicalCategory = category.id === 2; // Medical Exams category
              
              return (
                <motion.div
                  key={category.id}
                  variants={itemVariants}
                  whileHover={{ 
                    scale: 1.03, 
                    boxShadow: "0 20px 30px -10px rgba(0, 0, 0, 0.1)" 
                  }}
                  onHoverStart={() => {
                    setActiveCategory(category.id);
                    setIsPaused(true);
                  }}
                  onHoverEnd={() => setIsPaused(false)}
                  className={`relative bg-white dark:bg-gray-800 rounded-2xl shadow-md border ${
                    isActive ? 'border-purple-300 dark:border-purple-700 shadow-xl' : 'border-gray-100 dark:border-gray-700'
                  } overflow-hidden transition-all duration-300`}
                >
                  {/* Animated highlight effect for active card */}
                  {isActive && (
                    <motion.div 
                      className="absolute inset-0 bg-purple-50 dark:bg-purple-900 opacity-10"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                  
                  <div className={`h-2 bg-gradient-to-r ${category.color} ${isActive ? 'h-3' : ''} transition-all`}></div>
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div className={`p-3 rounded-full bg-gradient-to-r ${category.color} text-white mr-4 ${isActive ? 'animate-pulse' : ''}`}>
                        {category.icon}
                      </div>
                      <h3 className="text-xl font-bold">{category.title}</h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-5">
                      {category.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {category.exams.map((exam, index) => {
                        const isLaunched = category.launchedExams.includes(exam);
                        // Special animation for NEET-UG when it's active
                        const isNEETUG = exam === "NEET-UG" && isMedicalCategory;
                        const examDetails = category.examDetails?.[exam];
                        
                        return (
                          <motion.div
                            key={index}
                            className="relative"
                            initial={{ opacity: 0.7 }}
                            animate={{ 
                              opacity: isActive ? 1 : 0.7,
                              scale: isActive && isNEETUG && isLaunched ? 1.08 : 1
                            }}
                            transition={{ duration: 0.3 }}
                          >
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <div className="relative group">
                                  <motion.div
                                    className={`text-xs font-medium px-3 py-1 rounded-full flex items-center bg-gradient-to-r ${category.color} text-white opacity-75 hover:opacity-100 transition-opacity`}
                                    whileHover={{ scale: 1.05 }}
                                    animate={
                                      isNEETUG && isLaunched && isActive 
                                        ? { 
                                            scale: [1, 1.08, 1.05],
                                            boxShadow: ["0 0 0px rgba(0,0,0,0)", "0 0 15px rgba(72, 187, 120, 0.5)", "0 0 10px rgba(72, 187, 120, 0.3)"]
                                          } 
                                        : {}
                                    }
                                    transition={{ 
                                      duration: 1.5, 
                                      repeat: isNEETUG && isLaunched && isActive ? Infinity : 0, 
                                      repeatType: "reverse" 
                                    }}
                                  >
                                    {exam}
                                    
                                    {isLaunched && (
                                      <motion.div 
                                        className="ml-1.5 inline-flex items-center"
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: 'spring', stiffness: 500, damping: 23 }}
                                      >
                                        <motion.span 
                                          className="relative flex h-2 w-2"
                                          animate={isActive && isNEETUG ? {
                                            scale: [1, 1.2, 1],
                                          } : {}}
                                          transition={{
                                            duration: 1,
                                            repeat: isActive && isNEETUG ? Infinity : 0,
                                            repeatType: "reverse"
                                          }}
                                        >
                                          <span className={`${isActive && isNEETUG ? "animate-ping" : ""} absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75`}></span>
                                          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                        </motion.span>
                                      </motion.div>
                                    )}
                                  </motion.div>
                                </div>
                              </TooltipTrigger>
                              
                              <TooltipContent side="top" className={
                                isLaunched 
                                  ? "bg-green-50 text-green-700 border border-green-200" 
                                  : "bg-gray-50 text-gray-700 border border-gray-200"
                              }>
                                {isLaunched ? (
                                  examDetails ? (
                                    <div className="text-xs">
                                      <p className="font-medium">Available Now!</p>
                                      {examDetails.scoringPattern && <p>{examDetails.scoringPattern}</p>}
                                      {examDetails.timePerQuestion && <p>{examDetails.timePerQuestion}</p>}
                                    </div>
                                  ) : (
                                    "Available Now!"
                                  )
                                ) : (
                                  "Coming Soon"
                                )}
                              </TooltipContent>
                            </Tooltip>
                            
                            {/* Special popup for NEET-UG when medical category is active */}
                            {isNEETUG && isLaunched && isActive && (
                              <AnimatePresence>
                                <motion.div
                                  className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-green-500 to-teal-400 text-white text-xs px-3 py-1 rounded-md shadow-lg z-10"
                                  initial={{ opacity: 0, y: 10, scale: 0.8 }}
                                  animate={{ opacity: 1, y: 0, scale: 1 }}
                                  exit={{ opacity: 0, scale: 0.8 }}
                                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                >
                                  <div className="flex flex-col items-center">
                                    <div className="flex items-center">
                                      <span className="mr-1">🎉</span>
                                      LAUNCHED
                                    </div>
                                    <div className="text-[10px] mt-0.5">
                                      <p>+4/-1 scoring</p>
                                      <p>1.06 min/question</p>
                                    </div>
                                  </div>
                                  <motion.div 
                                    className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-green-500 rotate-45"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.1 }}
                                  />
                                </motion.div>
                              </AnimatePresence>
                            )}
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
          
          {/* Auto-rotation indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="mt-10 flex justify-center"
          >
            <div className="flex items-center space-x-2">
              {examCategories.map((cat, idx) => (
                <motion.div 
                  key={`dot-${idx}`}
                  className={`w-2 h-2 rounded-full ${activeCategory === cat.id ? 'bg-purple-500 w-4' : 'bg-gray-300 dark:bg-gray-600'}`}
                  animate={{ opacity: activeCategory === cat.id ? 1 : 0.5 }}
                  transition={{ duration: 0.3 }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </TooltipProvider>
  );
};

export default EcosystemAnimation;
