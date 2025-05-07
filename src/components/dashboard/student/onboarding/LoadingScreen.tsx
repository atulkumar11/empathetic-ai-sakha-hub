
import { motion } from "framer-motion";
import { Lightbulb } from "lucide-react";

interface LoadingScreenProps {
  goalTitle: string;
  weakSubjects: string[];
}

const examInfo = {
  "IIT-JEE": {
    tips: [
      "Focus on NCERT for strong fundamentals",
      "Practice previous year papers regularly",
      "Master time management skills",
    ],
    stats: {
      avgStudyHours: "6-8",
      successRate: "80%",
      topperStrategy: "Consistent daily practice"
    }
  },
  "NEET": {
    tips: [
      "Biology needs special attention",
      "Understanding over memorization",
      "Regular revision is key",
    ],
    stats: {
      avgStudyHours: "7-9",
      successRate: "85%",
      topperStrategy: "Concept clarity first"
    }
  },
  "UPSC": {
    tips: [
      "Current affairs are crucial",
      "Make notes while studying",
      "Practice answer writing",
    ],
    stats: {
      avgStudyHours: "8-10",
      successRate: "75%",
      topperStrategy: "Systematic approach"
    }
  }
};

const LoadingScreen: React.FC<LoadingScreenProps> = ({ goalTitle, weakSubjects }) => {
  const info = examInfo[goalTitle as keyof typeof examInfo] || {
    tips: [],
    stats: { avgStudyHours: "6-8", successRate: "70%", topperStrategy: "Regular practice" }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-indigo-50 dark:from-purple-900/20 dark:via-gray-900 dark:to-indigo-900/20 p-4">
      <div className="max-w-2xl w-full space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8 border border-purple-100 dark:border-purple-800"
        >
          <div className="space-y-6">
            <div className="flex items-center justify-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-full flex items-center justify-center">
                <Lightbulb className="w-8 h-8 text-white" />
              </div>
            </div>

            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Preparing Your Smart Study Plan for {goalTitle}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                We're analyzing your profile and creating a personalized learning journey
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-purple-700 dark:text-purple-300">Success Tips</h3>
                <ul className="space-y-2">
                  {info.tips.map((tip, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.2 }}
                      className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-purple-500"></span>
                      {tip}
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-indigo-700 dark:text-indigo-300">Key Statistics</h3>
                <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <p>Avg. Study Hours: {info.stats.avgStudyHours}</p>
                  <p>Success Rate: {info.stats.successRate}</p>
                  <p>Topper Strategy: {info.stats.topperStrategy}</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoadingScreen;
