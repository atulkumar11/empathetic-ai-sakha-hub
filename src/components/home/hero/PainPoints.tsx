
import { motion } from "framer-motion";
import FactorIcons from "./pain-points/FactorIcons";
import PainPointsList from "./pain-points/PainPointsList";
import SolutionsList from "./pain-points/SolutionsList";
import SectionDivider from "./pain-points/SectionDivider";
import SectionHeading from "./pain-points/SectionHeading";
import { 
  containerVariants, 
  factorVariants, 
  itemVariants, 
  headingVariants 
} from "./pain-points/AnimationVariants";

interface PainPointsProps {
  painPoints: string[];
  solutions: string[];
}

const PainPoints = ({ painPoints, solutions }: PainPointsProps) => {  
  return (
    <motion.div 
      className="mb-8 bg-white/70 backdrop-blur-sm rounded-lg p-6 border border-violet-100 shadow-md relative overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
      whileHover={{ scale: 1.01 }}
      transition={{ type: "spring", stiffness: 100 }}
      animate="animate"
    >
      {/* Decorative background elements */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-violet-200/30 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-200/30 rounded-full blur-3xl"></div>
      
      {/* Ecosystem factors visualization */}
      <FactorIcons 
        containerVariants={containerVariants} 
        factorVariants={factorVariants} 
      />
      
      <SectionHeading headingVariants={headingVariants}>
        We understand your struggles:
      </SectionHeading>
      
      <PainPointsList 
        painPoints={painPoints}
        itemVariants={itemVariants}
        containerVariants={containerVariants}
      />
      
      <SectionDivider headingVariants={headingVariants} />
      
      <SectionHeading headingVariants={headingVariants}>
        How Sakha helps you:
      </SectionHeading>
      
      <SolutionsList 
        solutions={solutions}
        itemVariants={itemVariants}
        containerVariants={containerVariants}
      />
    </motion.div>
  );
};

// Default props
PainPoints.defaultProps = {
  painPoints: [
    "Overwhelming syllabus",
    "Time management issues",
    "Lack of personalized guidance",
    "Test anxiety",
    "Inconsistent progress tracking"
  ],
  solutions: [
    "Personalized study plans",
    "AI-powered tutoring",
    "Real-time progress tracking",
    "Mock tests with analysis",
    "Exam-specific strategies"
  ]
};

export default PainPoints;
