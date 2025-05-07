
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface SectionDividerProps {
  headingVariants: any;
}

const SectionDivider = ({ headingVariants }: SectionDividerProps) => {
  return (
    <motion.div
      className="flex justify-center my-4"
      variants={headingVariants}
    >
      <motion.div 
        className="p-2 rounded-full bg-gradient-to-r from-red-100 to-green-100 shadow-sm"
        animate={{ 
          rotate: 360,
          scale: [1, 1.2, 1],
        }}
        transition={{ 
          rotate: { repeat: Infinity, duration: 8, ease: "linear" },
          scale: { repeat: Infinity, duration: 2, ease: "easeInOut" }
        }}
      >
        <ArrowRight className="text-violet-500" size={24} />
      </motion.div>
    </motion.div>
  );
};

export default SectionDivider;
