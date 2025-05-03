import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { adminService } from '@/services/adminService';
import { 
  Users, Brain, CheckCircle, BookOpen, 
  ScrollText, ClipboardList
} from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

// Define the stats based on the admin data structure
const defaultStats = [
  { 
    id: 1, 
    value: 10000, 
    label: "Students Helped", 
    prefix: "+", 
    suffix: "", 
    decimals: 0,
    icon: <Users className="text-purple-500" />,
    adminKey: "totalStudents"
  },
  { 
    id: 2, 
    value: 850, 
    label: "Concepts Mastered", 
    prefix: "Avg ", 
    suffix: "/Student", 
    decimals: 0,
    icon: <Brain className="text-indigo-500" />,
    adminKey: "averageConcepts"
  },
  { 
    id: 3, 
    value: 95, 
    label: "Success Rate", 
    prefix: "", 
    suffix: "%", 
    decimals: 0,
    icon: <CheckCircle className="text-green-500" />,
    adminKey: "successRate"
  },
  { 
    id: 5, 
    value: 2000000, 
    label: "Flashcards Reviewed", 
    prefix: "", 
    suffix: "+", 
    decimals: 0,
    icon: <ScrollText className="text-cyan-500" />,
    adminKey: "totalFlashcards"
  },
  { 
    id: 6, 
    value: 12000, 
    label: "Study Plans Delivered", 
    prefix: "", 
    suffix: "+", 
    decimals: 0,
    icon: <ClipboardList className="text-orange-500" />,
    adminKey: "totalStudyPlans"
  },
  { 
    id: 10, 
    value: 72, 
    label: "Feel Reduced Anxiety", 
    prefix: "", 
    suffix: "%", 
    decimals: 0,
    icon: <BookOpen className="text-fuchsia-500" />,
    adminKey: "verifiedMoodImprovement"
  }
];

export const KpiStats = () => {
  const [inView, setInView] = useState(false);
  const [stats, setStats] = useState(defaultStats);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.2,
      }
    );
    
    const element = document.getElementById('kpi-stats-section');
    if (element) {
      observer.observe(element);
    }
    
    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);
  
  // Fetch admin statistics when component mounts
  useEffect(() => {
    const fetchAdminStats = async () => {
      try {
        const adminStats = await adminService.getDashboardStats();
        
        if (adminStats) {
          // Update stats with values from admin dashboard if available
          setStats(prevStats => 
            prevStats.map(stat => {
              const adminValue = adminStats[stat.adminKey as keyof typeof adminStats];
              // Only update if admin value exists and is a number
              if (adminValue !== undefined && !isNaN(Number(adminValue))) {
                return { ...stat, value: Number(adminValue) };
              }
              return stat;
            })
          );
        }
      } catch (error) {
        console.error("Error fetching admin statistics:", error);
        // Keep using default values if there's an error
      }
    };

    fetchAdminStats();
  }, []);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.3,
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

  // Enhanced title animations for a premium feel
  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  // Text animation variants for each character
  const charVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.3
      }
    })
  };

  // Split the title into individual characters for animation
  const titleText = "Smart Data. Real Impact. Humanizing exam prep.";
  const titleChars = titleText.split("");

  return (
    <div 
      id="kpi-stats-section" 
      className="bg-gradient-to-r from-purple-50 via-white to-blue-50 dark:from-purple-900/20 dark:via-gray-900 dark:to-blue-900/20 py-8 px-4 rounded-2xl shadow-sm border border-purple-100/50 dark:border-purple-900/50"
    >
      <motion.div
        variants={titleVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="text-center mb-8"
      >
        <h2 className="text-2xl font-bold relative">
          {titleChars.map((char, i) => (
            <motion.span
              key={i}
              custom={i}
              variants={charVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className={char === "." ? "text-purple-600 font-bold" : "bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"}
            >
              {char}
            </motion.span>
          ))}
        </h2>
      </motion.div>
      
      <ScrollArea className="w-full max-w-7xl mx-auto h-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-2">
          {stats.map((stat) => (
            <motion.div 
              key={stat.id}
              variants={itemVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="flex flex-col items-center text-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700"
              whileHover={{ 
                y: -5, 
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                scale: 1.02,
                transition: { duration: 0.3 }
              }}
            >
              <motion.div 
                className="text-3xl mb-3 p-3 rounded-full bg-gray-50 dark:bg-gray-700"
                whileHover={{ scale: 1.2, rotate: [0, -5, 5, 0] }}
                transition={{ 
                  type: "spring", 
                  stiffness: 400,
                  damping: 10
                }}
                animate={{
                  boxShadow: ["0 0 0 rgba(129, 140, 248, 0)", "0 0 20px rgba(129, 140, 248, 0.5)", "0 0 0 rgba(129, 140, 248, 0)"]
                }}
                transition={{
                  repeat: Infinity,
                  duration: 3,
                }}
              >
                {stat.icon}
              </motion.div>
              <h3 className="text-sm text-gray-600 dark:text-gray-300 mb-1 font-medium">
                {stat.label}
              </h3>
              <motion.div 
                className="text-xl font-bold text-purple-600 dark:text-purple-400 flex items-center"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <span>{stat.prefix}</span>
                {inView ? (
                  <CountUp 
                    start={0} 
                    end={stat.value} 
                    duration={2.5} 
                    separator="," 
                    decimals={stat.decimals}
                    decimal="."
                    useEasing={true}
                  />
                ) : (
                  <span>0</span>
                )}
                <span>{stat.suffix}</span>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default KpiStats;
