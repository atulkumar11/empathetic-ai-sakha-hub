
import { motion } from "framer-motion";
import { Clock } from "lucide-react";

interface PainPointsListProps {
  painPoints: string[];
  itemVariants: any;
  containerVariants: any;
}

const PainPointsList = ({ painPoints, itemVariants, containerVariants }: PainPointsListProps) => {
  return (
    <motion.ul className="space-y-3 mb-6" variants={containerVariants}>
      {painPoints.map((point, index) => (
        <motion.li 
          key={index}
          className="flex items-center gap-3 text-gray-700 group"
          variants={itemVariants}
          custom={index}
          whileHover="hover"
        >
          <motion.div 
            className="bg-red-100 p-1.5 rounded-full shadow-sm group-hover:bg-red-200 transition-colors"
            whileHover={{ rotate: [0, -10, 10, -10, 0] }}
            transition={{ duration: 0.5 }}
          >
            <Clock size={18} className="text-red-500" />
          </motion.div>
          <span className="font-medium">{point}</span>
        </motion.li>
      ))}
    </motion.ul>
  );
};

export default PainPointsList;
