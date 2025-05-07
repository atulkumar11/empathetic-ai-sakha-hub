
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

interface SolutionsListProps {
  solutions: string[];
  itemVariants: any;
  containerVariants: any;
}

const SolutionsList = ({ solutions, itemVariants, containerVariants }: SolutionsListProps) => {
  return (
    <motion.ul className="space-y-3" variants={containerVariants}>
      {solutions.map((solution, index) => (
        <motion.li 
          key={index}
          className="flex items-center gap-3 text-gray-700 group"
          variants={itemVariants}
          custom={index}
          whileHover="hover"
        >
          <motion.div 
            className="bg-green-100 p-1.5 rounded-full shadow-sm group-hover:bg-green-200 transition-colors"
            whileHover={{ scale: 1.2 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <CheckCircle size={18} className="text-green-500" />
          </motion.div>
          <span className="font-medium">{solution}</span>
        </motion.li>
      ))}
    </motion.ul>
  );
};

export default SolutionsList;
