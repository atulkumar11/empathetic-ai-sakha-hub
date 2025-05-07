
import { ReactNode } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";
import { 
  FileText, 
  GraduationCap, 
  Medal, 
  Brain, 
  BarChart3, 
  Award, 
  Trophy,
  BookOpen
} from "lucide-react";

interface ExamBadge {
  name: string;
  icon: ReactNode;
}

interface ExamBadgesProps {
  badges: ExamBadge[];
}

const ExamBadges = ({ badges }: ExamBadgesProps) => {
  // Create a badge list without the circular animation
  return (
    <div className="relative mt-6 mb-6">
      <motion.div 
        className="flex flex-wrap gap-2 relative z-30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        {badges.map((badge, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.1 * index, duration: 0.3 }}
            whileHover={{ scale: 1.05, y: -2 }}
          >
            <Badge className="bg-white text-violet-700 hover:bg-violet-50 border border-violet-200 shadow-sm py-1.5 px-3 flex items-center gap-1">
              {badge.icon}
              <span className="ml-1">{badge.name}</span>
              <motion.div
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ repeat: Infinity, repeatDelay: 3, duration: 0.6 }}
                className="text-yellow-500"
              >
                <Sparkles size={10} />
              </motion.div>
            </Badge>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

// Default exam badges
ExamBadges.defaultProps = {
  badges: [
    { name: "UPSC", icon: <FileText size={12} /> },
    { name: "JEE", icon: <GraduationCap size={12} /> },
    { name: "NEET", icon: <Medal size={12} /> },
    { name: "GMAT", icon: <Brain size={12} /> },
    { name: "CAT", icon: <BarChart3 size={12} /> },
    { name: "GATE", icon: <Award size={12} /> },
    { name: "SSC", icon: <FileText size={12} /> },
    { name: "Banking", icon: <Trophy size={12} /> },
    { name: "GRE", icon: <BookOpen size={12} /> }
  ]
};

export default ExamBadges;
