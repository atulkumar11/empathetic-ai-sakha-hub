
import { motion } from 'framer-motion';
import { Sparkles, GraduationCap, BookOpen, Medal, Brain, FileText } from "lucide-react";

const ExamNamesBadge = () => {
  const badgeVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5 
      }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.2,
        duration: 0.5
      }
    })
  };

  const hoverVariants = {
    hover: {
      scale: 1.05,
      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
      transition: { duration: 0.2 }
    }
  };

  const floatVariants = {
    animate: (i: number) => ({
      y: [0, -5, 0],
      transition: {
        delay: i * 0.3,
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse" as const,
        ease: "easeInOut"
      }
    })
  };

  const examBadges = [
    { name: "UPSC", icon: <FileText size={14} className="text-orange-500" />, color: "from-orange-500 to-red-500" },
    { name: "NEET", icon: <Medal size={14} className="text-green-500" />, color: "from-green-500 to-teal-400" },
    { name: "IIT-JEE", icon: <GraduationCap size={14} className="text-blue-500" />, color: "from-blue-500 to-indigo-500" },
    { name: "CAT", icon: <Brain size={14} className="text-purple-500" />, color: "from-purple-500 to-pink-500" },
    { name: "GRE", icon: <BookOpen size={14} className="text-fuchsia-500" />, color: "from-fuchsia-500 to-pink-400" }
  ];

  return (
    <motion.div
      variants={badgeVariants}
      initial="hidden"
      animate="visible"
      className="max-w-lg mx-auto bg-white/80 dark:bg-gray-800/80 backdrop-blur rounded-full py-3 px-6 shadow-md"
    >
      <motion.div
        className="text-center mb-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
          Trusted by students preparing for:
        </span>
      </motion.div>
      
      <div className="flex flex-wrap justify-center items-center gap-3">
        {examBadges.map((badge, index) => (
          <motion.div
            key={index}
            custom={index}
            variants={textVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            variants={hoverVariants}
            custom={index}
            animate="animate"
            variants={floatVariants}
          >
            <motion.div className="font-bold text-lg px-3 py-1 rounded-full border-2 border-purple-200 dark:border-purple-900 hover:shadow-md transition-all duration-300 transform flex items-center gap-1 bg-gradient-to-r from-white to-purple-50 dark:from-gray-800 dark:to-gray-900">
              {badge.icon}
              <span className={`ml-1 bg-gradient-to-r ${badge.color} bg-clip-text text-transparent`}>
                {badge.name}
              </span>
              <motion.div
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ repeat: Infinity, repeatDelay: 3, duration: 0.6 }}
                className="text-yellow-500"
              >
                <Sparkles size={10} />
              </motion.div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ExamNamesBadge;
