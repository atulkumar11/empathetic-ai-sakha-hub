
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, BookOpen, FileText, Calculator, ChartBar, CheckCircle, BarChart } from 'lucide-react';
import { useMediaQuery } from '@/hooks/useMediaQuery';

interface MethodologyPoint {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const ChampionMethodologySection = () => {
  const [activePoint, setActivePoint] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isMobile = useMediaQuery('(max-width: 768px)');

  const methodologyPoints: MethodologyPoint[] = [
    {
      id: 1,
      title: 'Student Assessment',
      description: 'Comprehensive evaluation of learning style, strengths, and improvement areas tailored to each student.',
      icon: <BookOpen size={24} />,
      color: 'from-blue-500 to-cyan-400'
    },
    {
      id: 2,
      title: 'Hyper Personalization',
      description: 'AI-driven content adaptation based on individual learning patterns, preferences, and progress.',
      icon: <Brain size={24} />,
      color: 'from-purple-500 to-violet-400'
    },
    {
      id: 3,
      title: 'Smart Study Plan',
      description: 'Dynamically generated study schedules that optimize time allocation and prioritize weak areas.',
      icon: <FileText size={24} />,
      color: 'from-green-500 to-teal-400'
    },
    {
      id: 4,
      title: 'Byte Size Concept Cards',
      description: 'Complex topics broken down into manageable, interconnected knowledge units for easier understanding.',
      icon: <Calculator size={24} />,
      color: 'from-orange-500 to-amber-400'
    },
    {
      id: 5,
      title: 'Interactive Flashcards',
      description: 'Memory-enhancing active recall tools that adapt to your retention patterns for better memorization.',
      icon: <ChartBar size={24} />,
      color: 'from-pink-500 to-rose-400'
    },
    {
      id: 6,
      title: 'Exam Preparation',
      description: 'Realistic practice tests and simulations that mirror actual exam conditions and question patterns.',
      icon: <CheckCircle size={24} />,
      color: 'from-indigo-500 to-blue-400'
    },
    {
      id: 7,
      title: 'Exam Readiness Score',
      description: 'Real-time analytics that measure your preparation level and predict performance for your target exam.',
      icon: <BarChart size={24} />,
      color: 'from-red-500 to-orange-400'
    }
  ];

  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = setInterval(() => {
        setActivePoint(prev => (prev + 1) % methodologyPoints.length);
      }, 3000);
    }
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPaused, methodologyPoints.length]);

  const handlePointHover = (index: number) => {
    setIsPaused(true);
    setActivePoint(index);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  const getNodeVariants = (index: number) => {
    const baseDelay = index * 0.1;
    const isActive = (index % methodologyPoints.length) === activePoint;
    
    return {
      pulse: {
        scale: [1, 1.1, 1],
        opacity: [0.7, 1, 0.7],
        transition: {
          repeat: Infinity,
          repeatType: "reverse" as const,
          duration: 2,
          delay: baseDelay
        }
      },
      highlight: {
        scale: isActive ? 1.2 : 1,
        opacity: isActive ? 1 : 0.7,
        boxShadow: isActive ? "0 0 15px rgba(147, 51, 234, 0.7)" : "0 0 5px rgba(147, 51, 234, 0.3)",
        transition: { duration: 0.5 }
      }
    };
  };

  const currentMethodology = methodologyPoints[activePoint];

  return (
    <section className="py-16 md:py-24 overflow-hidden relative bg-gradient-to-b from-purple-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-10">
          {/* Background circuit pattern */}
          <svg viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-purple-500">
            <g fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="400" cy="400" r="200" />
              <circle cx="400" cy="400" r="150" />
              <circle cx="400" cy="400" r="300" />
              <path d="M400,100 L400,700 M100,400 L700,400 M200,200 L600,600 M200,600 L600,200" />
              <path d="M400,100 C550,150 650,250 700,400 C650,550 550,650 400,700 C250,650 150,550 100,400 C150,250 250,150 400,100" />
            </g>
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Our <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Champion-Making</span> Methodology
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Our AI-powered system transforms preparation into performance through a seven-step methodology that adapts to your unique learning journey.
          </p>
        </motion.div>

        {/* Engine Visualization and Features */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-12 items-center">
          {/* AI Engine Visualization - Left Side on Desktop */}
          <motion.div 
            className="w-full lg:w-1/2 aspect-square relative"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative w-full h-full">
              {/* Central Brain */}
              <motion.div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
                animate={{
                  rotate: 360,
                  transition: { duration: 30, repeat: Infinity, ease: "linear" }
                }}
              >
                <div className="relative">
                  <motion.div
                    className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center"
                    animate={{
                      boxShadow: [
                        "0 0 10px rgba(147, 51, 234, 0.5)",
                        "0 0 20px rgba(147, 51, 234, 0.7)",
                        "0 0 10px rgba(147, 51, 234, 0.5)"
                      ]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  >
                    <Brain size={isMobile ? 48 : 64} className="text-white" />
                  </motion.div>
                </div>
              </motion.div>

              {/* Orbital Paths */}
              <motion.div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 md:w-80 md:h-80 rounded-full border border-purple-200 dark:border-purple-800"
                animate={{
                  rotate: 360,
                  transition: { duration: 20, repeat: Infinity, ease: "linear" }
                }}
              />
              
              <motion.div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 md:w-96 md:h-96 rounded-full border border-blue-200 dark:border-blue-800"
                animate={{
                  rotate: -360,
                  transition: { duration: 25, repeat: Infinity, ease: "linear" }
                }}
              />

              {/* Nodes */}
              {methodologyPoints.map((point, index) => {
                const angle = (index * (360 / methodologyPoints.length)) * (Math.PI / 180);
                const radius = isMobile ? 120 : 150;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;
                
                return (
                  <motion.div
                    key={point.id}
                    className={`absolute top-1/2 left-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-r ${point.color} flex items-center justify-center shadow-lg cursor-pointer`}
                    style={{
                      translateX: `calc(${x}px - 50%)`,
                      translateY: `calc(${y}px - 50%)`
                    }}
                    variants={getNodeVariants(index)}
                    animate={activePoint === index ? "highlight" : "pulse"}
                    whileHover={{ scale: 1.2, transition: { duration: 0.3 } }}
                    onClick={() => handlePointHover(index)}
                  >
                    {point.icon}
                  </motion.div>
                );
              })}

              {/* Connection lines from center to active node */}
              <svg className="absolute top-0 left-0 w-full h-full" style={{ overflow: 'visible' }}>
                {methodologyPoints.map((point, index) => {
                  const angle = (index * (360 / methodologyPoints.length)) * (Math.PI / 180);
                  const radius = isMobile ? 120 : 150;
                  const x = Math.cos(angle) * radius;
                  const y = Math.sin(angle) * radius;
                  const isActive = index === activePoint;
                  
                  return (
                    <motion.line
                      key={`line-${point.id}`}
                      x1="50%"
                      y1="50%"
                      x2={`calc(50% + ${x}px)`}
                      y2={`calc(50% + ${y}px)`}
                      stroke={`url(#gradient-${index})`}
                      strokeWidth={isActive ? 3 : 1}
                      strokeDasharray={isActive ? "0" : "5,5"}
                      initial={{ opacity: isActive ? 1 : 0.3 }}
                      animate={{ opacity: isActive ? 1 : 0.3 }}
                      transition={{ duration: 0.5 }}
                    />
                  );
                })}
                
                {/* Define gradients for lines */}
                <defs>
                  {methodologyPoints.map((point, index) => {
                    const colors = point.color.split(" ");
                    const fromColor = colors[0].replace("from-", "");
                    const toColor = colors[1].replace("to-", "");
                    
                    return (
                      <linearGradient key={`gradient-${index}`} id={`gradient-${index}`}>
                        <stop stopColor={`var(--${fromColor})`} offset="0%" />
                        <stop stopColor={`var(--${toColor})`} offset="100%" />
                      </linearGradient>
                    );
                  })}
                </defs>
              </svg>
            </div>
          </motion.div>

          {/* Right side: Feature Description */}
          <div className="w-full lg:w-1/2">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-purple-100 dark:border-purple-900 relative">
              {/* Processing indicator */}
              <motion.div 
                className="absolute top-0 right-0 mt-2 mr-2 flex items-center"
                animate={{
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2
                }}
              >
                <span className="h-2 w-2 bg-green-500 rounded-full mr-2"></span>
                <span className="text-xs text-green-500 font-medium">Processing</span>
              </motion.div>
              
              <div className="h-[300px] flex flex-col justify-center" onMouseEnter={() => setIsPaused(true)} onMouseLeave={handleMouseLeave}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activePoint}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="text-center"
                  >
                    <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-r ${currentMethodology.color} flex items-center justify-center mb-4`}>
                      {currentMethodology.icon}
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold mb-3">
                      {currentMethodology.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 max-w-md mx-auto">
                      {currentMethodology.description}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
              
              {/* Navigation dots */}
              <div className="flex justify-center mt-6 space-x-2">
                {methodologyPoints.map((point, index) => (
                  <button
                    key={point.id}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${index === activePoint ? 'bg-purple-600 scale-125' : 'bg-gray-300 dark:bg-gray-600'}`}
                    onClick={() => handlePointHover(index)}
                    aria-label={`View ${point.title}`}
                  />
                ))}
              </div>
            </div>
            
            <div className="mt-8 grid grid-cols-3 sm:grid-cols-4 gap-2 sm:gap-4">
              {methodologyPoints.map((point, index) => (
                <motion.button
                  key={point.id}
                  className={`p-2 sm:p-3 rounded-lg text-xs sm:text-sm border transition-all duration-300 flex flex-col items-center ${
                    index === activePoint 
                      ? `bg-gradient-to-r ${point.color} text-white border-transparent` 
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handlePointHover(index)}
                >
                  <span className="block">{point.icon}</span>
                  <span className="mt-1 line-clamp-1">{point.title}</span>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChampionMethodologySection;
