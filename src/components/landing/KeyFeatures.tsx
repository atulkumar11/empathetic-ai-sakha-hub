
import React from "react";
import { motion } from "framer-motion";
import { 
  Calendar, 
  BarChart2, 
  Activity, 
  BookOpen 
} from "lucide-react";

const features = [
  {
    icon: <Calendar className="h-8 w-8 text-indigo-500" />,
    title: "Build your own Smart Study Exam Plan",
    description: "Micro concepts, flashcards, revision techniques"
  },
  {
    icon: <BarChart2 className="h-8 w-8 text-purple-500" />,
    title: "Real-Time Performance Dashboard",
    description: "Peer comparisons, progress metrics for your learning style"
  },
  {
    icon: <Activity className="h-8 w-8 text-pink-500" />,
    title: "Mood & Wellness Tracker",
    description: "Confidence & stress boosters, influence meter"
  },
  {
    icon: <BookOpen className="h-8 w-8 text-blue-500" />,
    title: "One Platform, All Exams",
    description: "Complete preparation system for any competitive exam"
  }
];

const KeyFeatures: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6 } }
  };

  return (
    <section className="py-8">
      <motion.div
        className="container mx-auto px-4"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="rounded-lg bg-white p-6 shadow-lg transition-shadow hover:shadow-xl dark:bg-gray-800"
            >
              <div className="mb-4 rounded-full bg-indigo-50 p-3 inline-block dark:bg-indigo-900/30">
                {feature.icon}
              </div>
              <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default KeyFeatures;
